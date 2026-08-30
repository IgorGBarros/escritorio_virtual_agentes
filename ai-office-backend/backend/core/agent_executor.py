# backend/core/agent_executor.py
from typing import Dict, Any, Optional
import json
from backend.memory.obsidian_memory import ObsidianMemory
from backend.services.llm_client import llm_client
from backend.utils.logger import logger

class AgentExecutor:
    """Executa tarefas usando LLM + memória do Obsidian"""
    
    def __init__(self, memory: ObsidianMemory):
        self.memory = memory
    
    async def execute_task(
        self,
        agent_id: str,
        task_brief: str,
        task_type: Optional[str] = None,
        tags: Optional[list[str]] = None
    ) -> Dict[str, Any]:
        """Executa uma tarefa completa: carrega contexto → monta prompt → chama LLM → processa resposta"""
        
        # 1. Carregar perfil do agente
        try:
            profile = self.memory.load_profile(agent_id)
        except FileNotFoundError:
            logger.error("Agent profile not found", agent_id=agent_id)
            return {"error": f"Agent {agent_id} not configured", "status": "failed"}
        
        # 2. Buscar caminhos relevantes (success/failure)
        relevant_paths = self.memory.get_relevant_paths(
            agent_id=agent_id,
            task_type=task_type or "general",
            tags=tags or []
        )
        
        # 3. Montar prompt com contexto
        system_prompt = profile.system_prompt
        context_block = self._build_context_block(relevant_paths)
        
        full_prompt = f"""{context_block}

# Tarefa Atual
{task_brief}

# Instruções de Resposta
- Responda em JSON válido com esta estrutura:
{{
  "plan": "breve descrição do plano",
  "steps": ["passo 1", "passo 2", "..."],
  "output": "resultado principal ou código",
  "files": [{{"path": "arquivo.py", "content": "código aqui"}}],
  "needs_review": true/false,
  "confidence": 0.0-1.0
}}
- Se não tiver certeza, defina needs_review: true
- Não invente arquivos que não foram solicitados
"""
        
        # 4. Chamar LLM com modo JSON
        try:
            logger.info("Calling LLM for task", agent_id=agent_id, task_type=task_type)
            raw_response = await llm_client.generate(
                prompt=full_prompt,
                system_prompt=system_prompt,
                json_mode=True
            )
            
            # 5. Parse da resposta JSON
            try:
                # Remover possível markdown code block
                if raw_response.startswith("```json"):
                    raw_response = raw_response.replace("```json", "").replace("```", "").strip()
                elif raw_response.startswith("```"):
                    raw_response = raw_response.replace("```", "").strip()
                
                result = json.loads(raw_response)
                logger.info("LLM response parsed", agent_id=agent_id, has_files=bool(result.get("files")))
                return {
                    "status": "success",
                    "result": result,
                    "agent_id": agent_id
                }
            except json.JSONDecodeError as e:
                logger.warning("Failed to parse JSON response", error=str(e), raw_response=raw_response[:200])
                # Fallback: retornar como texto
                return {
                    "status": "success",
                    "result": {"output": raw_response, "needs_review": True, "parse_error": str(e)},
                    "agent_id": agent_id
                }
                
        except ConnectionError as e:
            logger.error("LLM connection failed", error=str(e))
            return {"error": "LLM unavailable", "status": "failed", "details": str(e)}
        except Exception as e:
            logger.error("Task execution failed", error=str(e), exc_info=True)
            return {"error": f"Execution error: {str(e)}", "status": "failed"}
    
    def _build_context_block(self, paths: Dict[str, list]) -> str:
        """Constrói bloco de contexto com caminhos de sucesso/erro"""
        blocks = []
        
        if paths.get("success"):
            success_text = "\n\n".join([
                f"✅ Caminho validado ({p.id}):\n{p.context_prompt}"
                for p in paths["success"]
            ])
            blocks.append(f"# Caminhos de Sucesso (SIGA ESTES)\n{success_text}")
        
        if paths.get("failure"):
            failure_text = "\n\n".join([
                f"❌ Erro anterior ({p.id}):\n{p.content[:300]}..."
                for p in paths["failure"]
            ])
            blocks.append(f"# Erros para EVITAR\n{failure_text}")
        
        return "\n\n".join(blocks) if blocks else "# Sem histórico relevante para esta tarefa"