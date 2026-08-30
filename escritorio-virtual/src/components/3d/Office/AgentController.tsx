// src/components/3d/Office/AgentController.tsx (VERSÃO ATUALIZADA)
import React, { useState, useCallback, useEffect } from 'react';
import { AnimatedAgent } from '../Character/AnimatedAgent';
import { AgentState } from '../../../hooks/useAgentStates';

export type AgentRole = 'ceo' | 'backend' | 'frontend' | 'devops' | 'qa' | 'designer' | 'pm';

interface Agent {
  id: string;
  role: AgentRole;
  position: [number, number, number];
  workstation: [number, number, number];
  state: AgentState;
  currentTask?: string;
}

export const AgentController: React.FC = () => {
  const [agents] = useState<Agent[]>([
    { 
      id: 'ceo-1', 
      role: 'ceo', 
      position: [-10, 0, -8], 
      workstation: [-10, 0, -9], 
      state: 'idle' 
    },
    { 
      id: 'backend-1', 
      role: 'backend', 
      position: [-6, 0, -1], 
      workstation: [-6, 0, -2], 
      state: 'idle' 
    },
    { 
      id: 'frontend-1', 
      role: 'frontend', 
      position: [2, 0, -1], 
      workstation: [2, 0, -2], 
      state: 'idle' 
    },
    { 
      id: 'devops-1', 
      role: 'devops', 
      position: [10, 0, -1], 
      workstation: [10, 0, -2], 
      state: 'idle' 
    },
    { 
      id: 'qa-1', 
      role: 'qa', 
      position: [8, 0, 8], 
      workstation: [8, 0, 7], 
      state: 'idle' 
    }
  ]);

  const handleAgentInteraction = useCallback((agentData: any) => {
    const { role, status, actions, config } = agentData;
    
    console.log(`🤖 Interagindo com ${config.name} (${role}) - Estado: ${status.state}`);
    
    // Lógica baseada nas regras do escritório
    switch (status.state) {
      case 'idle':
        const tasks = [
          'Implementando nova feature',
          'Corrigindo bugs críticos', 
          'Revisando código',
          'Atualizando documentação',
          'Testando integração'
        ];
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        actions.startTask(randomTask);
        
        setTimeout(() => {
          actions.goToWorkstation();
        }, 1000);
        break;
        
      case 'working':
        const newProgress = Math.min(1, (status.taskProgress || 0) + 0.25);
        actions.updateProgress(newProgress);
        
        if (newProgress >= 1) {
          console.log(`✅ ${config.name} completou: ${status.currentTask}`);
          actions.changeState('idle');
        } else if (Math.random() < 0.1) {
          actions.blockAgent('Precisa de ajuda técnica');
        }
        break;
        
      case 'blocked':
        console.log(`🚫 ${config.name} está bloqueado: ${status.currentTask}`);
        actions.changeState('helping');
        
        setTimeout(() => {
          actions.changeState('working');
          console.log(`💡 ${config.name} recebeu ajuda e voltou ao trabalho`);
        }, 3000);
        break;
        
      case 'standing': // ✅ CORREÇÃO: Adicionar case para 'standing'
        actions.changeState('sitting');
        break;
        
      case 'sitting':
        actions.changeState('working');
        break;
        
      case 'walking':
        actions.changeState('standing');
        break;
        
      case 'helping':
        actions.changeState('working');
        break;
        
      case 'thinking':
        actions.changeState('presenting');
        break;
        
      case 'presenting':
        actions.changeState('meeting');
        break;
        
      case 'meeting':
        actions.changeState('working');
        break;
        
      default:
        actions.changeState('idle');
    }
  }, []);

  // Simulação automática do sistema
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvent = Math.random();
      
      if (randomEvent < 0.05) {
        console.log('📅 Reunião iniciada automaticamente');
      } else if (randomEvent < 0.1) {
        console.log('💭 Agente entrou em modo thinking');
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {agents.map((agent) => (
        <AnimatedAgent
          key={agent.id}
          role={agent.role}
          position={agent.position}
          workstation={agent.workstation}
          initialState={agent.state}
          onInteract={handleAgentInteraction}
        />
      ))}
    </>
  );
};