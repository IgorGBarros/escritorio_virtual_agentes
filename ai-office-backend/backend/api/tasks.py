# backend/api/tasks.py
from fastapi import APIRouter, HTTPException, Depends
from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime

from backend.core.task_manager import TaskManager, Task
from backend.memory.obsidian_memory import ObsidianMemory
from backend.api.websocket import manager
from backend.utils.logger import logger

router = APIRouter(prefix="/api/tasks", tags=["tasks"])

# Dependencies
def get_memory() -> ObsidianMemory:
    return ObsidianMemory()

from backend.core.task_manager import TaskManager

def get_task_manager() -> TaskManager:
    """Retorna o singleton do TaskManager"""
    return TaskManager.get_instance()
# Request/Response Models
class CreateTaskRequest(BaseModel):
    agent_id: str
    brief: str
    task_type: Optional[str] = None

class ExecuteTaskResponse(BaseModel):
    status: str
    task_id: str
    result: Optional[dict] = None
    error: Optional[str] = None

# Endpoints
@router.post("/", response_model=Task)
async def create_task(
    req: CreateTaskRequest,
    task_manager: TaskManager = Depends(get_task_manager)
):
    """Cria uma nova tarefa para um agente"""
    task = await task_manager.create_task(
        agent_id=req.agent_id,
        brief=req.brief,
        task_type=req.task_type
    )
    
    # Notifica frontend via WebSocket
    await manager.send_to_agent(req.agent_id, {
        "type": "task:created",
        "task": task.model_dump()
    })
    
    logger.info("Task created", task_id=task.id, agent_id=req.agent_id)
    return task

@router.get("/{task_id}", response_model=Task)
async def get_task(
    task_id: str,
    task_manager: TaskManager = Depends(get_task_manager)
):
    """Obtém detalhes de uma tarefa"""
    task = task_manager.get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.post("/{task_id}/progress")
async def update_progress(
    task_id: str,
    progress: float,
    task_manager: TaskManager = Depends(get_task_manager)
):
    """Atualiza progresso da tarefa (0.0 a 1.0)"""
    success = await task_manager.update_progress(task_id, progress)
    if not success:
        raise HTTPException(status_code=400, detail="Cannot update progress")
    
    task = task_manager.get_task(task_id)
    await manager.send_to_agent(task.agent_id, {
        "type": "task:progress",
        "task_id": task_id,
        "progress": progress
    })
    return {"status": "updated", "progress": progress}
# No FINAL de backend/api/tasks.py (depois de todos os outros endpoints):

@router.post("/{task_id}/execute", response_model=ExecuteTaskResponse)
async def execute_task_with_llm(
    task_id: str,
    task_manager: TaskManager = Depends(get_task_manager)
):
    """Executa uma tarefa usando LLM + memória Obsidian"""
    task = task_manager.get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.status not in ["CREATED", "ASSIGNED", "ADAPTED"]:
        raise HTTPException(status_code=400, detail=f"Task cannot be executed in status: {task.status}")
    
    task.status = "IN_PROGRESS"
    task.updated_at = datetime.now().isoformat()
    
    await manager.send_to_agent(task.agent_id, {
        "type": "task:started",
        "task_id": task_id,
        "agent_id": task.agent_id
    })
    
    from backend.core.agent_executor import AgentExecutor
    memory = ObsidianMemory()
    executor = AgentExecutor(memory)
    
    result = await executor.execute_task(
        agent_id=task.agent_id,
        task_brief=task.brief,
        task_type=task.task_type
    )
    
    if result.get("status") == "success":
        await task_manager.update_progress(task_id, 1.0)
        task.status = "AWAITING_REVIEW"
        
        await manager.send_to_agent(task.agent_id, {
            "type": "task:completed",
            "task_id": task_id,
            "result": result["result"],
            "needs_review": result["result"].get("needs_review", True)
        })
        
        return ExecuteTaskResponse(status="completed", task_id=task_id, result=result["result"])
    else:
        task.status = "BLOCKED"
        await manager.send_to_agent(task.agent_id, {
            "type": "task:failed",
            "task_id": task_id,
            "error": result.get("error")
        })
        raise HTTPException(status_code=500, detail=result.get("error", "LLM execution failed"))
    
@router.get("/debug/list-all")
async def debug_list_all_tasks(task_manager: TaskManager = Depends(get_task_manager)):
    """Endpoint de debug: lista todas as tarefas em memória"""
    all_tasks = list(task_manager._tasks.values())
    return {
        "total_tasks": len(all_tasks),
        "task_ids": [t.id for t in all_tasks],
        "tasks": [t.model_dump() for t in all_tasks]
    }