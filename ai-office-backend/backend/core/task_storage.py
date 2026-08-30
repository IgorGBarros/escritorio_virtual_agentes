# backend/core/task_storage.py (novo arquivo)
from asyncio import Task
import sqlite3
from pathlib import Path
from typing import Optional, List
import json

class TaskStorage:
    def __init__(self, db_path: str = "./tasks.db"):
        self.db_path = Path(db_path)
        self._init_db()
    
    def _init_db(self):
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS tasks (
                    id TEXT PRIMARY KEY,
                    agent_id TEXT,
                    brief TEXT,
                    status TEXT,
                    progress REAL,
                    task_type TEXT,
                    version INTEGER,
                    created_at TEXT,
                    updated_at TEXT,
                    data TEXT  -- JSON para campos extras
                )
            """)
    
    def save(self, task: "Task"):
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                INSERT OR REPLACE INTO tasks 
                (id, agent_id, brief, status, progress, task_type, version, created_at, updated_at, data)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                task.id, task.agent_id, task.brief, task.status,
                task.progress, task.task_type, task.version,
                task.created_at, task.updated_at, json.dumps(task.model_dump(exclude={
                    'id','agent_id','brief','status','progress','task_type','version','created_at','updated_at'
                }))
            ))
    
    def get(self, task_id: str) -> Optional["Task"]:
        from backend.core.task_manager import Task
        with sqlite3.connect(self.db_path) as conn:
            row = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
            if not row:
                return None
            data = json.loads(row[9]) if row[9] else {}
            return Task(
                id=row[0], agent_id=row[1], brief=row[2], status=row[3],
                progress=row[4], task_type=row[5], version=row[6],
                created_at=row[7], updated_at=row[8], **data
            )