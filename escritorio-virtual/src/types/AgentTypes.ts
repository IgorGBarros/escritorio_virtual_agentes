// src/types/AgentTypes.ts
export type AgentRole = 'ceo' | 'backend' | 'frontend' | 'devops' | 'qa' | 'designer' | 'pm';

// ✅ DEFINIÇÃO ÚNICA E COMPLETA DE AgentState
export type AgentState = 
  | 'idle'           // Parado, disponível
  | 'working'        // Executando tarefa (ADICIONADO)
  | 'walking'        // Movendo-se
  | 'sitting'        // Sentado trabalhando
  | 'standing'       // Em pé na mesa (ADICIONADO)
  | 'blocked'        // Bloqueado
  | 'helping'        // Ajudando
  | 'meeting'        // Em reunião
  | 'thinking'       // Pensando
  | 'presenting';    // Apresentando

export interface AgentStatus {
  state: AgentState;
  taskProgress: number;
  currentTask: string;
  isAnimating: boolean;
  targetPosition?: [number, number, number];
  workstation: [number, number, number];
  energy: number;
  isSeated: boolean;
}