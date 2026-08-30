    // src/hooks/useCharacterAnimation.ts
import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { AgentState, AgentStatus } from '../types/AgentStates';


export const useCharacterAnimation = (initialState: AgentState = 'idle') => {
  const groupRef = useRef<Group>(null);
  const [status, setStatus] = useState<AgentStatus>({
    state: initialState,
    isAnimating: false,
    taskProgress: 0,
    emotion: 'happy'
  });
  
  const [animationTime, setAnimationTime] = useState(0);
  const [targetPosition, setTargetPosition] = useState<Vector3 | null>(null);
  const [walkSpeed] = useState(2);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    setAnimationTime(prev => prev + delta);
    
    // Animações baseadas no estado
    switch (status.state) {
      case 'idle':
        // Respiração suave
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        break;
        
      case 'working':
        // Movimento de digitação
        const typingBob = Math.sin(state.clock.elapsedTime * 8) * 0.01;
        groupRef.current.position.y = typingBob;
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 12) * 0.02;
        break;
        
      case 'walking':
        // Animação de caminhada
        if (targetPosition) {
          const currentPos = groupRef.current.position;
          const direction = new Vector3().subVectors(targetPosition, currentPos);
          
          if (direction.length() > 0.1) {
            direction.normalize().multiplyScalar(walkSpeed * delta);
            groupRef.current.position.add(direction);
            
            // Balanço da caminhada
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 6) * 0.1;
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 6) * 0.1;
            
            // Rotacionar para a direção do movimento
            groupRef.current.lookAt(targetPosition);
          } else {
            // Chegou ao destino
            setStatus(prev => ({ ...prev, state: 'idle' }));
            setTargetPosition(null);
          }
        }
        break;
        
      case 'sitting':
        // Posição sentada (mais baixo)
        groupRef.current.position.y = -0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.01;
        break;
        
      case 'blocked':
        // Movimento de confusão/frustração
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.2;
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 4) * 0.05;
        break;
        
      case 'helping':
        // Gestos de explicação
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.03;
        break;
        
      case 'meeting':
        // Postura ereta, atenção
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1) * 0.01;
        groupRef.current.rotation.y = 0; // Sempre olhando para frente
        break;
        
      case 'thinking':
        // Balanço pensativo
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.02;
        break;
        
      case 'presenting':
        // Gestos amplos
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
        groupRef.current.position.y = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
        break;
    }
  });

  // Métodos para controlar o personagem
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
      currentTask: options?.currentTask ?? prev.currentTask
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
    setStatus(prev => ({ ...prev, taskProgress: Math.max(0, Math.min(1, progress)) }));
  }, []);

  const blockAgent = useCallback((reason?: string) => {
    changeState('blocked', { currentTask: reason || 'Aguardando ajuda' });
  }, [changeState]);

  return {
    groupRef,
    status,
    changeState,
    walkTo,
    startTask,
    updateProgress,
    blockAgent
  };
};