# memory/obsidian_memory.py
from pathlib import Path
from typing import Optional, List, Dict, Literal
from pydantic import BaseModel, Field, field_validator
import yaml
import json
from datetime import datetime
import asyncio

from ..config import settings
from ..utils.logger import logger

TaskStatus = Literal[
    'CREATED', 'ASSIGNED', 'IN_PROGRESS', 'PAUSED_CEO', 
    'AWAITING_REVIEW', 'APPROVED', 'REJECTED', 'ADAPTED', 'GIT_PUSHED'
]

class AgentProfile(BaseModel):
    role: str
    personality: str
    soft_skills: Dict[str, int]
    autonomy_level: int = Field(ge=1, le=3)
    xp: int = 0
    skills: List[str] = []
    system_prompt: str
    
    @field_validator('soft_skills')
    def validate_skills(cls, v):
        return {k: min(10, max(0, val)) for k, val in v.items()}

class TaskPath(BaseModel):
    id: str
    task_type: str
    tags: List[str]
    outcome: Literal['success', 'failure']
    steps: List[str]
    context_prompt: str
    pitfalls_avoided: Optional[List[str]] = []
    created_at: str = Field(default_factory=lambda: datetime.now().isoformat())

class ObsidianMemory:
    def __init__(self, vault_path: Optional[str] = None):
        self.vault = Path(vault_path or settings.VAULT_PATH)
        self.vault.mkdir(parents=True, exist_ok=True)
        self._index_cache: Dict[str, Dict] = {}
        logger.info("ObsidianMemory initialized", vault_path=str(self.vault))
    
    def _agent_path(self, agent_id: str) -> Path:
        return self.vault / "agents" / agent_id
    
    def load_profile(self, agent_id: str) -> AgentProfile:
        profile_path = self._agent_path(agent_id) / "profile.md"
        if not profile_path.exists():
            logger.error("Profile not found", agent_id=agent_id)
            raise FileNotFoundError(f"Profile not found: {profile_path}")
        
        content = profile_path.read_text(encoding="utf-8")
        if content.startswith("---"):
            parts = content.split("---", 2)
            if len(parts) >= 2:
                meta = yaml.safe_load(parts[1])
                return AgentProfile(**meta)
        raise ValueError(f"Invalid profile format: {profile_path}")
    
    def get_relevant_paths(
        self, 
        agent_id: str, 
        task_type: str, 
        tags: List[str],
        max_success: int = 2,
        max_failure: int = 1
    ) -> Dict[str, List[TaskPath]]:
        """Retorna caminhos relevantes sem ler histórico inteiro"""
        index = self._load_index(agent_id)
        category = index.get(agent_id, {}).get(task_type, {})
        
        def load_paths(folder: str, ids: List[str], limit: int) -> List[TaskPath]:
            paths = []
            for task_id in ids[-limit:]:
                file_path = self._agent_path(agent_id) / "paths" / folder / f"{task_id}.md"
                if file_path.exists():
                    try:
                        content = file_path.read_text(encoding="utf-8")
                        if content.startswith("---"):
                            parts = content.split("---", 2)
                            if len(parts) >= 2:
                                meta = yaml.safe_load(parts[1])
                                paths.append(TaskPath(**meta, id=task_id))
                    except Exception as e:
                        logger.warning("Failed to load path", task_id=task_id, error=str(e))
            return paths
        
        result = {
            "success": load_paths("success", category.get("success", []), max_success),
            "failure": load_paths("failure", category.get("failure", []), max_failure)
        }
        logger.debug("Retrieved relevant paths", agent_id=agent_id, task_type=task_type, counts={k: len(v) for k, v in result.items()})
        return result
    
    def save_task_result(
        self,
        agent_id: str,
        task_id: str,
        output: str,
        status: TaskStatus,
        ceo_feedback: Optional[str] = None,
        files: Optional[List[Dict[str, str]]] = None,
        task_type: Optional[str] = None
    ):
        """Salva resultado e atualiza index automaticamente"""
        agent_dir = self._agent_path(agent_id)
        
        # Determina pasta
        if status in ["APPROVED", "REJECTED"]:
            folder = "success" if status == "APPROVED" else "failure"
            dest_dir = agent_dir / "paths" / folder
        else:
            folder = "tasks"
            dest_dir = agent_dir / "tasks"
        
        dest_dir.mkdir(parents=True, exist_ok=True)
        file_path = dest_dir / f"{task_id}.md"
        
        # Frontmatter
        frontmatter = {
            "id": task_id,
            "status": status,
            "updated_at": datetime.now().isoformat(),
            "tags": ["auto-generated"] + ([task_type] if task_type else [])
        }
        if ceo_feedback:
            frontmatter["ceo_feedback"] = ceo_feedback
        if files:
            frontmatter["files_modified"] = [f["path"] for f in files]
        
        content = "---\n" + yaml.dump(frontmatter, sort_keys=False) + "---\n" + output
        file_path.write_text(content, encoding="utf-8")
        
        # Atualiza index se for success/failure
        if status in ["APPROVED", "REJECTED"]:
            self._update_path_index(agent_id, task_id, folder, task_type)
        
        logger.info("Task result saved", task_id=task_id, status=status, agent_id=agent_id)
    
    def _update_path_index(self, agent_id: str, task_id: str, outcome: str, task_type: Optional[str] = None):
        """Atualiza path-index.json de forma atômica"""
        index_path = self._agent_path(agent_id) / "path-index.json"
        index = self._load_index(agent_id)
        
        # Extrai task_type do ID se não fornecido
        if not task_type:
            parts = task_id.split("-")
            task_type = parts[2] if len(parts) > 2 else "general"
        
        if agent_id not in index:
            index[agent_id] = {}
        if task_type not in index[agent_id]:
            index[agent_id][task_type] = {"success": [], "failure": [], "keywords": []}
        
        if task_id not in index[agent_id][task_type][outcome]:
            index[agent_id][task_type][outcome].append(task_id)
            # Mantém apenas últimos 20
            index[agent_id][task_type][outcome] = index[agent_id][task_type][outcome][-20:]
        
        # Escrita atômica
        temp_path = index_path.with_suffix(".tmp")
        temp_path.write_text(json.dumps(index, indent=2), encoding="utf-8")
        temp_path.rename(index_path)
        
        # Atualiza cache
        self._index_cache[agent_id] = index.get(agent_id, {})
        logger.debug("Path index updated", agent_id=agent_id, task_id=task_id, outcome=outcome)
    
    def _load_index(self, agent_id: str) -> Dict:
        """Carrega index com cache"""
        if agent_id in self._index_cache:
            return {agent_id: self._index_cache[agent_id]}
        
        index_path = self._agent_path(agent_id) / "path-index.json"
        if index_path.exists():
            try:
                index = json.loads(index_path.read_text(encoding="utf-8"))
                self._index_cache[agent_id] = index.get(agent_id, {})
                return index
            except Exception as e:
                logger.warning("Failed to load index", agent_id=agent_id, error=str(e))
        
        return {agent_id: {}}
    
    def save_snapshot(self, agent_id: str, task_id: str, context: str, version: int):
        """Salva snapshot atômico antes de interrupção"""
        snapshot_dir = self._agent_path(agent_id) / "tasks" / "snapshots"
        snapshot_dir.mkdir(parents=True, exist_ok=True)
        
        snapshot_path = snapshot_dir / f"{task_id}_v{version}_snapshot.md"
        frontmatter = {
            "task_id": task_id,
            "version": version,
            "saved_at": datetime.now().isoformat(),
            "type": "snapshot"
        }
        content = "---\n" + yaml.dump(frontmatter, sort_keys=False) + "---\n" + context
        snapshot_path.write_text(content, encoding="utf-8")
        logger.info("Snapshot saved", task_id=task_id, version=version, agent_id=agent_id)
    
    def load_snapshot(self, agent_id: str, task_id: str, version: int) -> Optional[str]:
        """Carrega snapshot para adaptação"""
        snapshot_path = self._agent_path(agent_id) / "tasks" / "snapshots" / f"{task_id}_v{version}_snapshot.md"
        if snapshot_path.exists():
            content = snapshot_path.read_text(encoding="utf-8")
            if content.startswith("---"):
                parts = content.split("---", 2)
                if len(parts) >= 3:
                    return parts[2].strip()
        return None