# main.py
# =============================================================================
# ⚠️ IMPORTANTE: Este bloco DEVE ser a primeira coisa no arquivo (antes de qualquer import)
# =============================================================================
import sys
from pathlib import Path

# Adiciona a raiz do projeto ao PYTHONPATH para imports absolutos funcionarem
# Isso resolve: "ImportError: attempted relative import with no known parent package"
project_root = Path(__file__).resolve().parent
if str(project_root) not in sys.path:
    sys.path.insert(0, str(project_root))
# =============================================================================

# ✅ Imports ABSOLUTOS (com "backend.") - NUNCA use "." aqui
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio

from backend.config import settings # pyright: ignore[reportMissingImports]
from backend.api.tasks import router as tasks_router # pyright: ignore[reportMissingImports]
from backend.api.ceo import router as ceo_router # pyright: ignore[reportMissingImports]
from backend.api.websocket import manager # pyright: ignore[reportMissingImports]
from backend.utils.logger import logger # pyright: ignore[reportMissingImports]

# =============================================================================

app = FastAPI(
    title="AI Office Backend",
    description="Orquestrador de agentes com memória Obsidian + Git automation",
    version="0.1.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(tasks_router)
app.include_router(ceo_router)

@app.get("/health")
async def health():
    return {"status": "ok", "vault": settings.VAULT_PATH}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    client_id = websocket.query_params.get("client_id", "default")
    
    await manager.connect(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_json()
            msg_type = data.get("type")
            
            if msg_type == "subscribe:agent":
                agent_id = data.get("agent_id")
                if agent_id:
                    manager.subscribe_agent(client_id, agent_id)
                    await websocket.send_json({"type": "subscribed", "agent_id": agent_id})
            
            elif msg_type == "ceo:action":
                action = data.get("action")
                if action == "interrupt":
                    await manager.send_to_agent(data.get("agent_id"), {
                        "type": "ceo:ack",
                        "action": "interrupt_received"
                    })
            
            elif msg_type == "agent:update":
                await manager.broadcast({
                    "type": "agent:progress",
                    "agent_id": data.get("agent_id"),
                    "progress": data.get("progress")
                }, exclude={client_id})
                
    except WebSocketDisconnect:
        manager.disconnect(client_id)
    except Exception as e:
        logger.error("WebSocket error", client_id=client_id, error=str(e))
        manager.disconnect(client_id)

@app.on_event("startup")
async def startup():
    logger.info("AI Office Backend starting", 
                vault=settings.VAULT_PATH, 
                github_configured=bool(settings.GITHUB_PAT),
                llm_provider=settings.LLM_PROVIDER)

@app.on_event("shutdown")
async def shutdown():
    logger.info("AI Office Backend shutting down")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=settings.PORT, reload=False)  # 🔧 reload=False para evitar bug no Windows