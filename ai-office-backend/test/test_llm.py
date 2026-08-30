# test_llm.py
"""Teste completo: Health → Criar Tarefa → Executar com LLM (Ollama)"""
import asyncio
import httpx
import json

async def main():
    BASE_URL = "http://127.0.0.1:8000"
    
    async with httpx.AsyncClient(timeout=120.0) as client:
        
        # 🔹 1. Health Check
        print("🔍 [1/3] Health check...")
        resp = await client.get(f"{BASE_URL}/health")
        print(f"   ✅ {resp.json()}\n")
        
        # 🔹 2. Criar Tarefa
        print("📝 [2/3] Criando tarefa...")
        task_payload = {
            "agent_id": "backend-001",
            "brief": "Explique em 1 frase o que é Python",
            "task_type": "general"
        }
        
        task_resp = await client.post(
            f"{BASE_URL}/api/tasks/",
            json=task_payload  # httpx serializa corretamente
        )
        
        if task_resp.status_code != 200:
            print(f"   ❌ Erro {task_resp.status_code}: {task_resp.text}")
            return
        
        task = task_resp.json()
        task_id = task.get("id")
        print(f"   ✅ Tarefa criada: {task_id}")
        print(f"   📋 Status: {task.get('status')}\n")
        
        # 🔹 3. Executar com LLM (Ollama + Qwen)
        print(f"🤖 [3/3] Executando {task_id} com Qwen 7B...")
        print("   ⏳ Aguardando resposta do LLM (pode levar 10-30s)...")
        
        exec_resp = await client.post(
            f"{BASE_URL}/api/tasks/{task_id}/execute",
            json={}  # Body vazio é OK
        )
        
        if exec_resp.status_code == 200:
            result = exec_resp.json()
            print(f"   ✅ Execução concluída!")
            print(f"\n   📄 Resposta do agente:")
            print(f"   {'─' * 60}")
            output = result.get("result", {}).get("output", "N/A")
            # Imprime com quebra de linha preservada
            for line in output.split("\n")[:10]:  # Primeiras 10 linhas
                print(f"   {line}")
            if output.count("\n") > 10:
                print(f"   ... ({output.count('\n') - 10} linhas omitidas)")
            print(f"   {'─' * 60}\n")
            
            # Mostra se precisa de revisão
            needs_review = result.get("result", {}).get("needs_review", True)
            if needs_review:
                print("   ⚠️  Resposta marcada para revisão do CEO")
            else:
                print("   ✅ Resposta auto-aprovada")
                
        else:
            print(f"   ❌ Erro {exec_resp.status_code}")
            print(f"   💬 Detalhes: {exec_resp.text[:500]}")
            
            # Dica de debug
            if exec_resp.status_code == 404:
                print("\n   🔍 Dica: Verifique se o endpoint /api/tasks/{{id}}/execute está registrado")
                print(f"   🔗 Acesse: {BASE_URL}/docs para ver a lista de rotas")
            elif exec_resp.status_code == 500:
                print("\n   🔍 Dica: Verifique se o Ollama está rodando: ollama list")

if __name__ == "__main__":
    print("🚀 Iniciando teste AI Office + Ollama\n")
    print("=" * 70)
    asyncio.run(main())
    print("=" * 70)
    print("\n✅ Teste finalizado!")