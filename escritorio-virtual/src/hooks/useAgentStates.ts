// src/hooks/useAgentStates.ts
import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
// ✅ IMPORTAR TIPOS CENTRALIZADOS
import { AgentState, AgentStatus } from '../types/AgentTypes';

export type { AgentState, AgentStatus }; // Re-exportar para compatibilidade

export const useAgentStates = (
  initialState: AgentState = 'idle',
  workstationPos: [number, number, number] = [0, 0, 0]
) => {
  const groupRef = useRef<Group>(null);
  const [status, setStatus] = useState<AgentStatus>({
    state: initialState,
    taskProgress: 0,
    currentTask: '',
    isAnimating: false,
    workstation: workstationPos,
    energy: 100,
    isSeated: false
  });
  
  const [targetPosition, setTargetPosition] = useState<Vector3 | null>(null);
  const walkSpeed = 2;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // ✅ ANIMAÇÕES PARA TODOS OS ESTADOS
    switch (status.state) {
      case 'idle':
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        break;
        
      case 'working':
        // ✅ ANIMAÇÃO PARA WORKING
        const typingBob = Math.sin(state.clock.elapsedTime * 8) * 0.008;
        groupRef.current.position.y = typingBob;
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 12) * 0.015;
        groupRef.current.rotation.y = 0;
        break;
        
      case 'walking':
        if (targetPosition) {
          const currentPos = groupRef.current.position;
          const direction = new Vector3().subVectors(targetPosition, currentPos);
          
          if (direction.length() > 0.1) {
            direction.normalize().multiplyScalar(walkSpeed * delta);
            groupRef.current.position.add(direction);
            
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 6) * 0.08;
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 6) * 0.08;
          } else {
            setStatus(prev => ({ ...prev, state: 'idle', isAnimating: false }));
            setTargetPosition(null);
          }
        }
        break;
        
      case 'sitting':
        groupRef.current.position.y = -0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.01;
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 8) * 0.015;
        groupRef.current.rotation.y = 0;
        break;
        
      case 'standing':
        // ✅ ANIMAÇÃO PARA STANDING
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
        groupRef.current.rotation.y = 0;
        break;
        
      case 'blocked':
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 4) * 0.3;
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 5) * 0.06;
        break;
        
      case 'helping':
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2.5) * 0.15;
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.04;
        break;
        
      case 'meeting':
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1) * 0.01;
        groupRef.current.rotation.y = 0;
        break;
        
      case 'thinking':
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.4;
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.03;
        break;
        
      case 'presenting':
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.8) * 0.2;
        groupRef.current.position.y = 0.1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.08;
        break;
    }
    
    // Diminuir energia quando trabalhando
    if ((status.state === 'working' || status.state === 'sitting') && status.energy > 0) {
      setStatus(prev => ({
        ...prev,
        energy: Math.max(0, prev.energy - delta * 1.5)
      }));
    }
  });

  // Métodos de controle
  const changeState = useCallback((newState: AgentState, options?: {
    targetPosition?: [number, number, number];
    taskProgress?: number;
    currentTask?: string;
  }) => {
    setStatus(prev => ({
      ...prev,
      state: newState,
      isAnimating: true,
      taskProgress: options?.taskProgress ?? prev.taskProgress,
      currentTask: options?.currentTask ?? prev.currentTask,
      isSeated: newState === 'sitting'
    }));
    
    if (options?.targetPosition) {
      setTargetPosition(new Vector3(...options.targetPosition));
    }
  }, []);

  const walkTo = useCallback((position: [number, number, number]) => {
    changeState('walking', { targetPosition: position });
  }, [changeState]);

  const startTask = useCallback((taskName: string) => {
    changeState('working', { currentTask: taskName, taskProgress: 0 });
  }, [changeState]);

  const updateProgress = useCallback((progress: number) => {
    setStatus(prev => ({ 
      ...prev, 
      taskProgress: Math.max(0, Math.min(1, progress)) 
    }));
  }, []);

  const blockAgent = useCallback((reason: string = 'Aguardando ajuda') => {
    changeState('blocked', { currentTask: reason });
  }, [changeState]);

  const goToWorkstation = useCallback(() => {
    changeState('walking', { targetPosition: status.workstation });
    setTimeout(() => {
      changeState('standing');
    }, 2000);
  }, [status.workstation, changeState]);

  const sitInChair = useCallback(() => {
    changeState('sitting');
  }, [changeState]);

  const standUp = useCallback(() => {
    changeState('standing');
  }, [changeState]);

  const restoreEnergy = useCallback(() => {
    setStatus(prev => ({ ...prev, energy: 100 }));
  }, []);

  return {
    groupRef,
    status,
    changeState,
    walkTo,
    startTask,
    updateProgress,
    blockAgent,
    goToWorkstation,
    sitInChair,
    standUp,
    restoreEnergy
  };
};