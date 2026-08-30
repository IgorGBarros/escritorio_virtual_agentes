# 🏢 Dashboard do Escritório Virtual

## 🔴 Tarefas em Andamento
```dataview
TABLE agent_id AS "Agente", task_type AS "Tipo", status AS "Status"
FROM "agents"
WHERE contains(file.path, "/tasks/") AND status = "IN_PROGRESS"
SORT file.name DESC
```

## 🟡 Aguardando Revisão
```dataview
TABLE agent_id AS "Agente", updated_at AS "Atualizado"
FROM "agents"
WHERE contains(file.path, "/tasks/") AND status = "AWAITING_REVIEW"
SORT updated_at DESC
```

## ✅ Tarefas Concluídas
```dataview
TABLE agent_id AS "Agente", updated_at AS "Data"
FROM "agents"
WHERE contains(file.path, "/tasks/") AND status = "APPROVED"
SORT updated_at DESC
LIMIT 5
```

## 📂 Agentes Cadastrados
```dataview
TABLE role AS "Cargo", xp AS "XP"
FROM "agents"
WHERE file.name != "index"
SORT xp DESC
```