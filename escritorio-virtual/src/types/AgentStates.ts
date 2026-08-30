// src/types/AgentStates.ts
export type AgentState = 
  | 'idle'           // Parado, disponível
  | 'working'        // Executando tarefa
  | 'walking'        // Movendo-se
  | 'sitting'        // Sentado trabalhando
  | 'standing' 
  | 'blocked'        // Bloqueado, precisa ajuda
  | 'helping'        // Ajudando outro agente
  | 'meeting'        // Em reunião
  | 'thinking'       // Analisando/planejando
  | 'presenting'    // Apresentando
  | 'working';       // Trabalhando em tarefa específica  

export interface AgentStatus {
  state: AgentState;
  taskProgress?: number; // 0-1 para barra de progresso
  currentTask?: string;
  isAnimating: boolean;
  targetPosition?: [number, number, number];
  emotion?: 'happy' | 'focused' | 'stressed' | 'confused';
}

export interface AnimationConfig {
  duration: number;
  intensity: number;
  pattern: 'bounce' | 'sway' | 'pulse' | 'rotate';
}
