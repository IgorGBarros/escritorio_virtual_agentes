#!/usr/bin/env python3
"""scripts/init_vault.py - Gera estrutura inicial do Vault Obsidian"""
from pathlib import Path
import yaml
import json
from datetime import datetime

def create_vault_structure(vault_path: str = "./AI-Office-Vault"):
    vault = Path(vault_path)
    
    # Estrutura base
    for subdir in ["agents", "projects", "ceo", "shared"]:
        (vault / subdir).mkdir(parents=True, exist_ok=True)
    
    # Agentes baseados no seu LLMAgentConfig.ts
    agents = [
        ("ceo-001", "CEO", "strategy,leadership,vision", "principal", 3),
        ("tech-lead-001", "Tech Lead", "architecture,mentoring,code-review", "principal", 3),
        ("backend-001", "Backend Dev", "python,django,postgresql,microservices", "senior", 2),
        ("frontend-001", "Frontend Dev", "react,typescript,tailwind,three.js", "senior", 2),
        ("devops-001", "DevOps", "docker,kubernetes,aws,terraform,github-api", "senior", 2),
        ("qa-001", "QA Engineer", "testing,automation,cypress,jest", "pleno", 2),
        ("designer-001", "Product Designer", "figma,ui/ux,design-systems", "senior", 2),
        ("orchestrator-001", "AI Orchestrator", "workflow-automation,llm-integration", "principal", 3),
    ]
    
    for agent_id, name, skills, seniority, autonomy in agents:
        agent_dir = vault / "agents" / agent_id
        for sub in ["tasks/success", "tasks/failure", "tasks/snapshots", "adaptations", "paths/success", "paths/failure"]:
            (agent_dir / sub).mkdir(parents=True, exist_ok=True)
        
        # profile.md
        profile = {
            "role": name,
            "personality": "pragmático, orientado a resultados, comunica trade-offs",
            "soft_skills": {
                "comunicação_assertiva": 8,
                "tolerância_a_ambiguidade": 7,
                "mentorship": 6 if seniority in ["senior", "principal"] else 4
            },
            "autonomy_level": autonomy,
            "xp": 0,
            "skills": [s.strip() for s in skills.split(",")],
            "system_prompt": f"Você é {name} ({seniority}). Siga estritamente caminhos validados. Em dúvida, pare e peça revisão ao CEO."
        }
        
        profile_content = "---\n" + yaml.dump(profile, sort_keys=False, allow_unicode=True) + "---\n"
        (agent_dir / "profile.md").write_text(profile_content, encoding="utf-8")
        
        # path-index.json inicial
        index = {agent_id: {}}
        (agent_dir / "path-index.json").write_text(json.dumps(index, indent=2), encoding="utf-8")
    
    # CEO vision
    (vault / "ceo" / "vision.md").write_text(f"""---
created: {datetime.now().isoformat()}
---
# Visão do Produto
- Escritório virtual multiagente com aprendizado contínuo
- CEO como revisor e arquiteto de ideias
- Fluxo: Briefing → Execução 3D → Revisão → Git Auto
- Diferencial: Agentes evoluem via feedback, não fine-tuning

# Regras de Ouro
1. Nenhum commit sem aprovação explícita do CEO
2. Interrupção do CEO é prioridade absoluta
3. Contexto é preservado via snapshots + adaptação determinística
4. Tudo versionado no Vault (Git-friendly)

# Primeiros Projetos
- [ ] Setup inicial do backend FastAPI
- [ ] Integração WebSocket com frontend 3D
- [ ] Primeiros agentes: CEO + DevOps
""", encoding="utf-8")
    
    print(f"✅ Vault criado em: {vault.resolve()}")
    print(f"📁 {len(agents)} agentes inicializados")
    print("🔧 Próximo: Configure .env com GITHUB_PAT e LLM_API_KEY")

if __name__ == "__main__":
    create_vault_structure()