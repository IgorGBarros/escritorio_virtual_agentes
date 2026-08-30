# api/ceo.py
from fastapi import APIRouter, HTTPException, Depends, WebSocket
from pydantic import BaseModel
from typing import Any, Dict, Optional

from ..core.task_manager import TaskManager
from ..services.git_service import GitService, GitFile
from ..memory.obsidian_memory import ObsidianMemory
from ..api.websocket import manager
from ..utils.logger import logger

router = APIRouter(prefix="/api/ceo", tags=["ceo"])

def get_memory() -> ObsidianMemory:
    return ObsidianMemory()

def get_task_manager(memory: ObsidianMemory = Depends(get_memory)) -> TaskManager:
    return TaskManager(memory)

def get_git_service() -> GitService:
    return GitService()

class CEOInterruptRequest(BaseModel):
    task_id: str
    instructions: str

class CEOAdaptRequest(BaseModel):
    task_id: str
    new_brief: str

class CEOApproveRequest(BaseModel):
    task_id: str
    output: Dict[str, Any]
    trigger_git: bool = True

@router.post("/interrupt")
async def interrupt_task(
    req: CEOInterruptRequest,
    task_manager: TaskManager = Depends(get_task_manager)
):
    result = await task_manager.interrupt_task(req.task_id, req.instructions)
    if "error" in result:
        raise HTTPException(status_code=result.get("status", 400), detail=result["error"])
    
    task = task_manager.get_task(req.task_id)
    await manager.send_to_agent(task.agent_id, {
        "type": "task:paused",
        "task_id": req.task_id,
        "snapshot_version": result["snapshot_version"]
    })
    return result

@router.post("/adapt")
async def adapt_task(
    req: CEOAdaptRequest,
    task_manager: TaskManager = Depends(get_task_manager)
):
    result = await task_manager.adapt_and_resume(req.task_id, req.new_brief)
    if "error" in result:
        raise HTTPException(status_code=result.get("status", 400), detail=result["error"])
    
    task = task_manager.get_task(req.task_id)
    await manager.send_to_agent(task.agent_id, {
        "type": "task:adapted",
        "task_id": req.task_id,
        "version": result["version"]
    })
    return result

@router.post("/approve")
async def approve_task(
    req: CEOApproveRequest,
    task_manager: TaskManager = Depends(get_task_manager),
    git_service: GitService = Depends(get_git_service)
):
    result = await task_manager.approve_and_trigger_git(req.task_id, req.output)
    if "error" in result:
        raise HTTPException(status_code=result.get("status", 400), detail=result["error"])
    
    task = task_manager.get_task(req.task_id)
    
    # Se tem trigger de Git, executa
    if result.get("git_trigger") and req.trigger_git:
        try:
            files = [GitFile(**f) for f in result["files"]]
            git_result = await git_service.commit_and_create_pr(
                branch=result["branch"],
                files=files,
                commit_msg=result["commit_msg"],
                task_id=req.task_id
            )
            result["git"] = git_result
            
            # Atualiza frontend com PR
            await manager.send_to_agent(task.agent_id, {
                "type": "git:committed",
                "task_id": req.task_id,
                "pr_url": git_result["pr_url"],
                "branch": git_result["branch"]
            })
        except Exception as e:
            logger.error("Git operation failed", task_id=req.task_id, error=str(e))
            result["git_error"] = str(e)
    
    await manager.send_to_agent(task.agent_id, {
        "type": "task:approved",
        "task_id": req.task_id,
        "status": result["status"]
    })
    
    return result