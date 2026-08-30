// src/components/3d/Character/AnimatedCharacter.tsx
import React from 'react';
import { useCharacterAnimation } from '../../../hooks/useCharacterAnimation';
import { AgentState } from '../../../hooks/useAgentStates';
import { CharacterRole } from '../../../types/character';

interface Props {
  role: CharacterRole;
  position: [number, number, number];
  initialState?: AgentState;
  onInteract?: (status: any) => void;
}

// ✅ CORREÇÃO: Tipagem explícita para o objeto de configurações
const roleColors: Record<CharacterRole, { halo: string; base: string; shirt: string; pants: string; name: string }> = {
    'ceo': { halo: '#FFD700', base: '#FFD700', shirt: '#000', pants: '#191970', name: 'CEO' },
    'backend': { halo: '#00FF00', base: '#00FF00', shirt: '#222', pants: '#444', name: 'Backend Dev' },
    'frontend': { halo: '#00FF00', base: '#00FF00', shirt: '#888', pants: '#333', name: 'Frontend Dev' },
    'devops': { halo: '#4169E1', base: '#4169E1', shirt: '#333', pants: '#556B2F', name: 'DevOps' },
    'qa': { halo: '#FFFF00', base: '#FFFF00', shirt: '#FFFF00', pants: '#0000FF', name: 'QA Tester' },
    'designer': { halo: '#FF00FF', base: '#FF00FF', shirt: '#008080', pants: '#000', name: 'Designer' },
    'pm': { halo: '#FFA500', base: '#FFA500', shirt: '#333', pants: '#555', name: 'Project Manager' },
    'tech-lead': {
        halo: '',
        base: '',
        shirt: '',
        pants: '',
        name: ''
    },
    mobile: {
        halo: '',
        base: '',
        shirt: '',
        pants: '',
        name: ''
    },
    sysadmin: {
        halo: '',
        base: '',
        shirt: '',
        pants: '',
        name: ''
    },
    creative: {
        halo: '',
        base: '',
        shirt: '',
        pants: '',
        name: ''
    },
    orchestrator: {
        halo: '',
        base: '',
        shirt: '',
        pants: '',
        name: ''
    }
};

export const AnimatedCharacter: React.FC<Props> = ({ 
  role, 
  position, 
  initialState = 'idle',
  onInteract 
}) => {
  const { groupRef, status, changeState, walkTo, startTask, blockAgent } = useCharacterAnimation(initialState);
  const colors = roleColors[role]; // ✅ Agora funciona sem erro de tipagem

  // Efeitos visuais baseados no estado
  const getStateVisuals = () => {
    switch (status.state) {
      case 'blocked':
        return {
          haloColor: '#FF0000',
          haloIntensity: 0.8,
          bodyColor: colors.shirt,
          showExclamation: true
        };
      case 'working':
        return {
          haloColor: colors.halo,
          haloIntensity: 0.6 + Math.sin(Date.now() * 0.01) * 0.2,
          bodyColor: colors.shirt,
          showProgress: true
        };
      case 'helping':
        return {
          haloColor: '#00FFFF',
          haloIntensity: 0.7,
          bodyColor: colors.shirt,
          showQuestion: true
        };
      default:
        return {
          haloColor: colors.halo,
          haloIntensity: 0.5,
          bodyColor: colors.shirt,
          showProgress: false
        };
    }
  };

  const visuals = getStateVisuals();

  const handleClick = () => {
    if (onInteract) {
      onInteract({
        role,
        status,
        actions: {
          changeState,
          walkTo,
          startTask,
          blockAgent
        }
      });
    }
  };

  return (
    <group position={position} onClick={handleClick}>
      {/* Base circular com cor do estado */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[0.6, 0.8, 32]} />
        <meshStandardMaterial 
          color={visuals.haloColor} 
          emissive={visuals.haloColor}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Halo animado */}
      <mesh position={[0, 3.0, 0]}>
        <torusGeometry args={[0.3, 0.03, 8, 16]} />
        <meshStandardMaterial 
          color={visuals.haloColor} 
          emissive={visuals.haloColor} 
          emissiveIntensity={visuals.haloIntensity} 
        />
      </mesh>

      {/* Corpo do personagem */}
      <group ref={groupRef}>
        {/* Pernas */}
        <mesh position={[-0.15, 0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.6]} />
          <meshStandardMaterial color={colors.pants} />
        </mesh>
        <mesh position={[0.15, 0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.6]} />
          <meshStandardMaterial color={colors.pants} />
        </mesh>
        
        {/* Sapatos */}
        <mesh position={[-0.15, 0.05, 0.1]}>
          <boxGeometry args={[0.15, 0.1, 0.2]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0.15, 0.05, 0.1]}>
          <boxGeometry args={[0.15, 0.1, 0.2]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Torso */}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[0.6, 1.2, 0.3]} />
          <meshStandardMaterial color={visuals.bodyColor} />
        </mesh>
        
        {/* Braços */}
        <mesh position={[-0.4, 1.2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.8]} />
          <meshStandardMaterial color={visuals.bodyColor} />
        </mesh>
        <mesh position={[0.4, 1.2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.8]} />
          <meshStandardMaterial color={visuals.bodyColor} />
        </mesh>
        
        {/* Cabeça */}
        <mesh position={[0, 2.2, 0]}>
          <sphereGeometry args={[0.25]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
        
        {/* Cabelo */}
        <mesh position={[0, 2.4, -0.1]}>
          <boxGeometry args={[0.5, 0.2, 0.3]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </group>

      {/* Indicadores visuais de estado */}
      {visuals.showExclamation && (
        <mesh position={[0, 3.5, 0]}>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.8} />
        </mesh>
      )}
      
      {visuals.showQuestion && (
        <mesh position={[0, 3.5, 0]}>
          <torusGeometry args={[0.1, 0.03, 8, 16]} />
          <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.6} />
        </mesh>
      )}

      {/* Barra de progresso da tarefa */}
      {visuals.showProgress && status.taskProgress !== undefined && (
        <group position={[0, 3.8, 0]}>
          {/* Fundo da barra */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1, 0.1, 0.05]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          {/* Progresso */}
          <mesh position={[(-0.5 + status.taskProgress * 0.5), 0, 0.03]}>
            <boxGeometry args={[status.taskProgress, 0.08, 0.03]} />
            <meshStandardMaterial 
              color="#00FF00" 
              emissive="#00FF00" 
              emissiveIntensity={0.4} 
            />
          </mesh>
        </group>
      )}
    </group>
  );
};