# api/websocket.py
from typing import Dict, Set
from fastapi import WebSocket, WebSocketDisconnect
from ..utils.logger import logger

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        self.agent_subscriptions: Dict[str, Set[str]] = {}  # agent_id -> set of connection_ids
    
    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        self.active_connections[client_id] = websocket
        logger.info("WebSocket connected", client_id=client_id)
    
    def disconnect(self, client_id: str):
        if client_id in self.active_connections:
            del self.active_connections[client_id]
        # Remove subscriptions
        for agent_subs in self.agent_subscriptions.values():
            agent_subs.discard(client_id)
        logger.info("WebSocket disconnected", client_id=client_id)
    
    def subscribe_agent(self, client_id: str, agent_id: str):
        if agent_id not in self.agent_subscriptions:
            self.agent_subscriptions[agent_id] = set()
        self.agent_subscriptions[agent_id].add(client_id)
        logger.debug("Client subscribed to agent", client_id=client_id, agent_id=agent_id)
    
    async def send_to_agent(self, agent_id: str, message: dict):
        """Envia mensagem para todos os clientes assinando o agente"""
        if agent_id not in self.agent_subscriptions:
            return
        
        disconnected = []
        for client_id in self.agent_subscriptions[agent_id]:
            if client_id in self.active_connections:
                try:
                    await self.active_connections[client_id].send_json(message)
                except WebSocketDisconnect:
                    disconnected.append(client_id)
            else:
                disconnected.append(client_id)
        
        # Limpa conexões desconectadas
        for client_id in disconnected:
            self.agent_subscriptions[agent_id].discard(client_id)
            if client_id in self.active_connections:
                del self.active_connections[client_id]
        
        logger.debug("Message sent to agent subscribers", agent_id=agent_id, recipients=len(self.agent_subscriptions.get(agent_id, [])))
    
    async def broadcast(self, message: dict, exclude: Set[str] = None):
        """Broadcast para todos os clientes"""
        exclude = exclude or set()
        disconnected = []
        
        for client_id, websocket in list(self.active_connections.items()):
            if client_id in exclude:
                continue
            try:
                await websocket.send_json(message)
            except WebSocketDisconnect:
                disconnected.append(client_id)
        
        for client_id in disconnected:
            self.disconnect(client_id)

manager = ConnectionManager()