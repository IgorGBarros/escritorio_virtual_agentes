# backend/services/llm_client.py
"""Cliente assíncrono para Ollama API (Qwen, Llama, etc.)"""
from typing import Optional, List, Dict, Any, AsyncGenerator
import httpx
import json
from backend.config import settings
from backend.utils.logger import logger

class LLMClient:
    """Cliente para comunicação com Ollama"""
    
    def __init__(self, base_url: Optional[str] = None, model: Optional[str] = None):
        # Configurações com fallback
        self.base_url = base_url or settings.LLM_BASE_URL or "http://localhost:11434"
        
        # 🔧 Força modelo Ollama se provider for ollama
        if settings.LLM_PROVIDER == "ollama":
            self.model = model or "qwen2.5:7b-instruct"
        else:
            self.model = model or settings.LLM_MODEL
        
        self.temperature = getattr(settings, 'LLM_TEMPERATURE', 0.2)
        self.max_tokens = getattr(settings, 'LLM_MAX_TOKENS', 2048)
        self.api_url = f"{self.base_url.rstrip('/')}/api"
        
        logger.info("LLMClient initialized", 
                    provider=settings.LLM_PROVIDER, 
                    model=self.model, 
                    base_url=self.base_url)
    
    async def _check_connection(self) -> bool:
        """Verifica se Ollama está respondendo"""
        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                resp = await client.get(f"{self.base_url}/api/tags")
                return resp.status_code == 200
        except Exception as e:
            logger.error("Ollama connection check failed", error=str(e))
            return False
    
    async def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        json_mode: bool = False
    ) -> str:
        """
        Gera resposta de texto do LLM via Ollama API
        
        Args:
            prompt: Mensagem do usuário
            system_prompt: Instruções de sistema (opcional)
            temperature: Criatividade (0.0 a 1.0)
            max_tokens: Limite de tokens na resposta
            json_mode: Se True, força resposta em JSON válido
        
        Returns:
            str: Resposta gerada pelo modelo
        """
        # Verifica conexão
        if not await self._check_connection():
            raise ConnectionError(f"Ollama não está respondendo em {self.base_url}")
        
        # Monta mensagens
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})
        
        # Prepara payload
        payload = {
            "model": self.model,
            "messages": messages,
            "stream": False,
            "options": {
                "temperature": temperature if temperature is not None else self.temperature,
                "num_predict": max_tokens if max_tokens is not None else self.max_tokens,
            }
        }
        
        # Modo JSON para respostas estruturadas
        if json_mode:
            payload["format"] = "json"
            payload["options"]["temperature"] = 0.1  # Mais determinístico
        
        logger.debug("Calling Ollama", 
                     model=self.model, 
                     prompt_length=len(prompt),
                     json_mode=json_mode)
        
        # Faz requisição
        async with httpx.AsyncClient(timeout=120.0) as client:
            try:
                resp = await client.post(
                    f"{self.api_url}/chat",
                    json=payload,
                    headers={"Content-Type": "application/json"}
                )
                resp.raise_for_status()
                result = resp.json()
                
                # Extrai conteúdo da resposta
                content = result.get("message", {}).get("content", "")
                
                logger.debug("Ollama response received", 
                             content_length=len(content),
                             done=result.get("done", False))
                
                return content.strip()
                
            except httpx.HTTPStatusError as e:
                error_body = e.response.text
                logger.error("Ollama API error", 
                             status=e.response.status_code, 
                             error=error_body[:500])
                raise RuntimeError(f"Ollama error ({e.response.status_code}): {error_body}")
                
            except httpx.RequestError as e:
                logger.error("Ollama request failed", error=str(e))
                raise ConnectionError(f"Não foi possível conectar ao Ollama: {e}")
                
            except Exception as e:
                logger.error("Unexpected error calling Ollama", error=str(e), exc_info=True)
                raise RuntimeError(f"Erro inesperado: {e}")
    
    async def generate_stream(
        self,
        prompt: str,
        system_prompt: Optional[str] = None
    ) -> AsyncGenerator[str, None]:
        """
        Gera resposta em streaming (token por token) para UI em tempo real
        """
        if not await self._check_connection():
            raise ConnectionError("Ollama não está respondendo")
        
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})
        
        payload = {
            "model": self.model,
            "messages": messages,
            "stream": True,
            "options": {
                "temperature": self.temperature,
                "num_predict": self.max_tokens,
            }
        }
        
        async with httpx.AsyncClient(timeout=120.0) as client:
            async with client.stream("POST", f"{self.api_url}/chat", json=payload) as resp:
                resp.raise_for_status()
                async for line in resp.aiter_lines():
                    if line.strip():
                        try:
                            chunk = json.loads(line)
                            if "message" in chunk and "content" in chunk["message"]:
                                yield chunk["message"]["content"]
                        except json.JSONDecodeError:
                            continue

# =============================================================================
# 🔧 Instância global singleton para reutilizar conexão HTTP
# =============================================================================
_llm_instance: Optional[LLMClient] = None

def get_llm_client() -> LLMClient:
    """Retorna instância singleton do LLMClient"""
    global _llm_instance
    if _llm_instance is None:
        _llm_instance = LLMClient()
    return _llm_instance

# Alias para compatibilidade
llm_client = get_llm_client()