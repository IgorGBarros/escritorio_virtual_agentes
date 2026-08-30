# backend/config.py
from pydantic_settings import BaseSettings
from pathlib import Path
from typing import Literal, Optional

class Settings(BaseSettings):
    # === Vault Obsidian ===
    VAULT_PATH: str = "./AI-Office-Vault"
    VAULT_SYNC_MODE: Literal["local", "git"] = "local"
    
    # === GitHub ===
    GITHUB_OWNER: Optional[str] = None
    GITHUB_REPO: Optional[str] = None
    GITHUB_PAT: Optional[str] = None
    
    # === LLM (Ollama) ===
    LLM_PROVIDER: Literal["ollama", "openai", "anthropic"] = "ollama"
    LLM_MODEL: str = "qwen2.5:7b-instruct"
    LLM_BASE_URL: str = "http://localhost:11434"
    LLM_TEMPERATURE: float = 0.2
    LLM_MAX_TOKENS: int = 2048
    # ✅ Campo opcional para compatibilidade com .env antigo
    LLM_API_KEY: Optional[str] = None  # Não usado com Ollama, mas evita erro de validação
    
    # === Server ===
    HOST: str = "127.0.0.1"
    PORT: int = 8000
    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000"]
    
    # === Logging ===
    LOG_LEVEL: Literal["DEBUG", "INFO", "WARNING", "ERROR"] = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = False
        # ✅ Permite campos extras no .env sem quebrar a validação
        extra = "ignore"

settings = Settings()