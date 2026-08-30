# test_ws.py
import asyncio
import websockets
import json

async def test_websocket():
    uri = "ws://127.0.0.1:8000/ws?client_id=ceo-001"
    async with websockets.connect(uri) as ws:
        print("✅ Conectado ao WebSocket")
        
        # Assinar atualizações de um agente
        await ws.send(json.dumps({
            "type": "subscribe:agent",
            "agent_id": "backend-001"
        }))
        
        # Aguardar confirmação
        response = await ws.recv()
        print(f"📨 Server: {response}")
        
        # Simular atualização de progresso (como se viesse do agente)
        await ws.send(json.dumps({
            "type": "agent:update",
            "agent_id": "backend-001",
            "progress": 0.45
        }))
        print("📤 Enviado: progress update")
        
        # Manter conectado por 10s para ver broadcasts
        await asyncio.sleep(10)
        print("🔌 Desconectando...")

if __name__ == "__main__":
    asyncio.run(test_websocket())