# backend/core/task_manager.py
from enum import Enum
from typing import Optional, Dict, List, Any
from pydantic import BaseModel, Field
from datetime import datetime
import asyncio
import json

from backend.memory.obsidian_memory import ObsidianMemory, TaskStatus
from backend.config import settings
from backend.utils.logger import logger

class Task(BaseModel):
    id: str
    agent_id: str
    brief: str
    status: TaskStatus = "CREATED"
    progress: float = 0.0
    current_files: List[str] = []
    version: int = 1
    created_at: str = Field(default_factory=lambda: datetime.now().isoformat())
    updated_at: Optional[str] = None
    task_type: Optional[str] = None

class TaskManager:
    """Gerenciador de tarefas com estado em memória + singleton"""
    
    # 🔧 Variável de classe compartilhada (singleton)
    _shared_instance: Optional["TaskManager"] = None
    _shared_memory: Optional[ObsidianMemory] = None
    
    def __init__(self, memory: Optional[ObsidianMemory] = None):
        # Usa memória compartilhada se já existir
        self.memory = memory or TaskManager._shared_memory or ObsidianMemory()
        if TaskManager._shared_memory is None:
            TaskManager._shared_memory = self.memory
        
        # 🔧 Usa o dict compartilhado se já existir
        if not hasattr(TaskManager, '_shared_tasks'):
            TaskManager._shared_tasks = {}
        self._tasks = TaskManager._shared_tasks
        
        self._locks: Dict[str, asyncio.Lock] = {}
        logger.info("TaskManager initialized (singleton mode)")
    
    @classmethod
    def get_instance(cls, memory: Optional[ObsidianMemory] = None) -> "TaskManager":
        """Retorna a instância singleton (chamar em vez de TaskManager())"""
        if cls._shared_instance is None:
            cls._shared_instance = TaskManager(memory)
        return cls._shared_instance
    
    @classmethod
    def reset(cls):
        """Reseta o singleton (apenas para testes)"""
        cls._shared_instance = None
        cls._shared_memory = None
        if hasattr(cls, '_shared_tasks'):
            cls._shared_tasks.clear()
        logger.info("TaskManager singleton reset")
    
    def _get_lock(self, task_id: str) -> asyncio.Lock:
        if task_id not in self._locks:
            self._locks[task_id] = asyncio.Lock()
        return self._locks[task_id]
    
    async def create_task(self, agent_id: str, brief: str, task_type: Optional[str] = None) -> Task:
        """Cria nova tarefa e armazena no estado compartilhado"""
        task_id = f"TASK-{datetime.now().strftime('%Y%m%d')}-{len(self._tasks)+1:03d}"
        task = Task(id=task_id, agent_id=agent_id, brief=brief, task_type=task_type)
        
        self._tasks[task_id] = task
        logger.info("Task created", task_id=task_id, agent_id=agent_id, total_tasks=len(self._tasks))
        return task
    
    def get_task(self, task_id: str) -> Optional[Task]:
        """Obtém tarefa do estado compartilhado"""
        task = self._tasks.get(task_id)
        if task:
            logger.debug("Task retrieved", task_id=task_id, status=task.status)
        else:
            logger.warning("Task not found", task_id=task_id, available_ids=list(self._tasks.keys())[:5])
        return task
    
    async def interrupt_task(self, task_id: str, ceo_instructions: str) -> Dict[str, Any]:
        async with self._get_lock(task_id):
            task = self.get_task(task_id)
            if not task:
                return {"error": "Task not found", "status": 404}
            
            if task.status not in ["IN_PROGRESS", "ASSIGNED"]:
                return {"error": f"Cannot interrupt task in status: {task.status}", "status": 400}
            
            context = json.dumps({
                "brief": task.brief, "progress": task.progress,
                "files": task.current_files, "status": task.status
            }, indent=2, ensure_ascii=False)
            
            self.memory.save_snapshot(task.agent_id, task_id, context, task.version)
            
            task.status = "PAUSED_CEO"
            task.version += 1
            task.updated_at = datetime.now().isoformat()
            
            return {
                "status": "paused", "task_id": task_id,
                "snapshot_version": task.version - 1, "agent_id": task.agent_id
            }
    
    async def adapt_and_resume(self, task_id: str, new_brief: str) -> Dict[str, Any]:
        async with self._get_lock(task_id):
            task = self.get_task(task_id)
            if not task or task.status != "PAUSED_CEO":
                return {"error": "Invalid state for adaptation", "status": 400}
            
            snapshot_content = self.memory.load_snapshot(task.agent_id, task_id, task.version - 1)
            if not snapshot_content:
                return {"error": "Snapshot not found", "status": 404}
            
            adapted_prompt = f"""# Contexto Original (Snapshot v{task.version - 1})
{snapshot_content}

# Nova Diretriz do CEO
{new_brief}

# Instrução de Adaptação
Continue a partir do progresso anterior. Não descarte código funcional.
Ajuste apenas o necessário para alinhar com a nova diretriz.
"""
            
            self.memory.save_task_result(
                agent_id=task.agent_id,
                task_id=f"{task_id}_adapted_v{task.version}",
                output=adapted_prompt,
                status="ADAPTED",
                task_type=task.task_type
            )
            
            task.brief = new_brief
            task.status = "ADAPTED"
            task.updated_at = datetime.now().isoformat()
            
            return {"status": "adapted", "task_id": task_id, "version": task.version}
    
    async def approve_and_trigger_git(self, task_id: str, approved_output: Dict) -> Dict[str, Any]:
        async with self._get_lock(task_id):
            task = self.get_task(task_id)
            if not task:
                return {"error": "Task not found", "status": 404}
            
            self.memory.save_task_result(
                agent_id=task.agent_id, task_id=task_id,
                output=json.dumps(approved_output, indent=2, ensure_ascii=False),
                status="APPROVED", ceo_feedback="Aprovado pelo CEO",
                files=approved_output.get("files", []), task_type=task.task_type
            )
            
            task.status = "APPROVED"
            task.updated_at = datetime.now().isoformat()
            
            if approved_output.get("files"):
                return {
                    "status": "approved", "git_trigger": True,
                    "files": approved_output["files"],
                    "branch": f"feat/{task_id}",
                    "commit_msg": f"feat({task.task_type or 'task'}): {task.brief[:50]}"
                }
            return {"status": "approved", "git_trigger": False}
    
    async def update_progress(self, task_id: str, progress: float) -> bool:
        task = self.get_task(task_id)
        if task and task.status == "IN_PROGRESS":
            task.progress = min(1.0, max(0.0, progress))
            task.updated_at = datetime.now().isoformat()
            return True
        return False
    
    def list_agent_tasks(self, agent_id: str, status_filter: Optional[TaskStatus] = None) -> List[Task]:
        tasks = [t for t in self._tasks.values() if t.agent_id == agent_id]
        if status_filter:
            tasks = [t for t in tasks if t.status == status_filter]
        return tasks