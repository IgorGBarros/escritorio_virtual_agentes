# test_minimal.py
import asyncio, httpx

async def test():
    async with httpx.AsyncClient() as client:
        # Health
        r = await client.get("http://127.0.0.1:8000/health")
        print(f"Health: {r.json()}")
        
        # Criar tarefa
        r = await client.post(
            "http://127.0.0.1:8000/api/tasks/",
            json={"agent_id": "backend-001", "brief": "Teste", "task_type": "general"}
        )
        print(f"Create task: {r.status_code} - {r.text[:200]}")

asyncio.run(test())