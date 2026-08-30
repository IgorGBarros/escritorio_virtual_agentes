// src/components/3d/Character/AnimatedAgent.tsx
import React from 'react';
// ✅ IMPORTAR TIPOS CENTRALIZADOS
import { useAgentStates, AgentState } from '../../../hooks/useAgentStates';


// ✅ CORREÇÃO: Exportar o tipo AgentRole
export type AgentRole = 'ceo' | 'backend' | 'frontend' | 'devops' | 'qa' | 'designer' | 'pm';

interface Props {
  role: AgentRole;
  position: [number, number, number];
  workstation: [number, number, number];
  initialState?: AgentState;
  onInteract?: (agent: any) => void;
}

const roleConfig = {
  'ceo': { 
    halo: '#FFD700', 
    base: '#FFD700', 
    shirt: '#000080', 
    pants: '#191970',
    name: 'CEO'
  },
  'backend': { 
    halo: '#00FF00', 
    base: '#32CD32', 
    shirt: '#228B22', 
    pants: '#006400',
    name: 'Backend Dev'
  },
  'frontend': { 
    halo: '#FF6B35', 
    base: '#FF6B35', 
    shirt: '#FF4500', 
    pants: '#8B4513',
    name: 'Frontend Dev'
  },
  'devops': { 
    halo: '#4169E1', 
    base: '#4169E1', 
    shirt: '#1E90FF', 
    pants: '#000080',
    name: 'DevOps'
  },
  'qa': { 
    halo: '#FFD700', 
    base: '#FFFF00', 
    shirt: '#FFA500', 
    pants: '#FF8C00',
    name: 'QA Tester'
  },
  'designer': { 
    halo: '#FF1493', 
    base: '#FF69B4', 
    shirt: '#FF00FF', 
    pants: '#8B008B',
    name: 'Designer'
  },
  'pm': { 
    halo: '#9370DB', 
    base: '#9370DB', 
    shirt: '#8A2BE2', 
    pants: '#4B0082',
    name: 'Project Manager'
  }
};

export const AnimatedAgent: React.FC<Props> = ({ 
  role, 
  position, 
  workstation, // ✅ USAR PROP
  initialState = 'idle',
  onInteract 
}) => {
  const { 
    groupRef, 
    status, 
    changeState, 
    walkTo, 
    startTask, 
    blockAgent,
    goToWorkstation,
    sitInChair,
    standUp,
    restoreEnergy
  } = useAgentStates(initialState, workstation);
  
  const config = roleConfig[role];

  // ✅ FUNÇÃO COMPLETA COM TODOS OS ESTADOS
  const getStateVisuals = () => {
    switch (status.state) {
      case 'blocked':
        return {
          haloColor: '#FF0000',
          haloIntensity: 0.9,
          showExclamation: true,
          baseOpacity: 0.8
        };
      case 'sitting':
        return {
          haloColor: config.halo,
          haloIntensity: 0.8 + Math.sin(Date.now() * 0.008) * 0.2,
          showProgress: true,
          baseOpacity: 1,
          showSittingIcon: true
        };
      case 'standing':
        return {
          haloColor: config.halo,
          haloIntensity: 0.6,
          baseOpacity: 1,
          showStandingIcon: true
        };
      case 'walking':
        return {
          haloColor: '#FFFF00',
          haloIntensity: 0.7,
          showWalking: true,
          baseOpacity: 0.9
        };
      case 'helping':
        return {
          haloColor: '#00FFFF',
          haloIntensity: 0.8,
          showQuestion: true,
          baseOpacity: 1
        };
      case 'thinking':
        return {
          haloColor: '#FFFF00',
          haloIntensity: 0.7,
          showThinking: true,
          baseOpacity: 0.9
        };
      case 'presenting':
        return {
          haloColor: '#00FF00',
          haloIntensity: 1.0,
          showStar: true,
          baseOpacity: 1
        };
      case 'meeting':
        return {
          haloColor: '#9370DB',
          haloIntensity: 0.8,
          showMeeting: true,
          baseOpacity: 1
        };
      case 'idle':
        return {
          haloColor: config.halo,
          haloIntensity: 0.4,
          baseOpacity: 0.7
        };
      case 'working': // ✅ CORREÇÃO: Estado working funcionando
        return {
          haloColor: config.halo,
          haloIntensity: 0.7,
          showProgress: true,
          baseOpacity: 1
        };
      default:
        return {
          haloColor: config.halo,
          haloIntensity: 0.5,
          baseOpacity: 0.8
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
          blockAgent,
          goToWorkstation,
          sitInChair,
          standUp,
          restoreEnergy
        },
        config
      });
    }
  };

  return (
    <group position={position} onClick={handleClick}>
      {/* Base circular */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[0.6, 0.9, 32]} />
        <meshStandardMaterial 
          color={visuals.haloColor} 
          emissive={visuals.haloColor}
          emissiveIntensity={0.3}
          transparent
          opacity={visuals.baseOpacity}
        />
      </mesh>
      
      {/* Halo animado */}
      <mesh position={[0, 3.2, 0]}>
        <torusGeometry args={[0.35, 0.04, 8, 16]} />
        <meshStandardMaterial 
          color={visuals.haloColor} 
          emissive={visuals.haloColor} 
          emissiveIntensity={visuals.haloIntensity} 
        />
      </mesh>

      {/* Corpo do agente */}
      <group ref={groupRef}>
        {/* Pernas ajustadas */}
        <mesh position={[-0.15, status.isSeated ? 0.25 : 0.35, 0]}>
          <cylinderGeometry args={[0.08, 0.08, status.isSeated ? 0.5 : 0.7]} />
          <meshStandardMaterial color={config.pants} />
        </mesh>
        <mesh position={[0.15, status.isSeated ? 0.25 : 0.35, 0]}>
          <cylinderGeometry args={[0.08, 0.08, status.isSeated ? 0.5 : 0.7]} />
          <meshStandardMaterial color={config.pants} />
        </mesh>
        
        {/* Sapatos */}
        <mesh position={[-0.15, 0.05, 0.08]}>
          <boxGeometry args={[0.12, 0.08, 0.16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0.15, 0.05, 0.08]}>
          <boxGeometry args={[0.12, 0.08, 0.16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Torso ajustado */}
        <mesh position={[0, status.isSeated ? 1.1 : 1.3, 0]}>
          <boxGeometry args={[0.7, 1.4, 0.35]} />
          <meshStandardMaterial color={config.shirt} />
        </mesh>
        
        {/* Braços ajustados */}
        <mesh position={[-0.45, status.isSeated ? 1.1 : 1.3, status.isSeated ? 0.2 : 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.9]} />
          <meshStandardMaterial color={config.shirt} />
        </mesh>
        <mesh position={[0.45, status.isSeated ? 1.1 : 1.3, status.isSeated ? 0.2 : 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.9]} />
          <meshStandardMaterial color={config.shirt} />
        </mesh>
        
        {/* Cabeça ajustada */}
        <mesh position={[0, status.isSeated ? 2.1 : 2.3, 0]}>
          <sphereGeometry args={[0.28]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
        
        {/* Cabelo ajustado */}
        <mesh position={[0, status.isSeated ? 2.3 : 2.5, -0.1]}>
          <boxGeometry args={[0.5, 0.25, 0.35]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>

      {/* ✅ INDICADORES VISUAIS COMPLETOS */}
      {visuals.showExclamation && (
        <group position={[0, 3.8, 0]}>
          <mesh>
            <boxGeometry args={[0.08, 0.4, 0.08]} />
            <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <sphereGeometry args={[0.06]} />
            <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.8} />
          </mesh>
        </group>
      )}

      {visuals.showSittingIcon && (
        <mesh position={[0, 3.8, 0]}>
          <boxGeometry args={[0.3, 0.15, 0.05]} />
          <meshStandardMaterial color="#4169E1" emissive="#4169E1" emissiveIntensity={0.6} />
        </mesh>
      )}

      {visuals.showStandingIcon && (
        <mesh position={[0, 3.8, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.3]} />
          <meshStandardMaterial color="#32CD32" emissive="#32CD32" emissiveIntensity={0.6} />
        </mesh>
      )}

      {visuals.showWalking && (
        <group position={[0, 3.8, 0]}>
          {[0, 0.1, 0.2].map((x, i) => (
            <mesh key={i} position={[x - 0.1, 0, 0]}>
              <sphereGeometry args={[0.03]} />
              <meshStandardMaterial 
                color="#FFFF00" 
                emissive="#FFFF00" 
                emissiveIntensity={0.8 - i * 0.2} 
              />
            </mesh>
          ))}
        </group>
      )}
      
      {/* Barra de progresso */}
      {visuals.showProgress && status.taskProgress !== undefined && (
        <group position={[0, 4.2, 0]}>
          <mesh>
            <boxGeometry args={[1.2, 0.08, 0.04]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          <mesh position={[(-0.6 + status.taskProgress * 0.6), 0, 0.02]}>
            <boxGeometry args={[status.taskProgress * 1.2, 0.06, 0.02]} />
            <meshStandardMaterial 
              color="#00FF00" 
              emissive="#00FF00" 
              emissiveIntensity={0.5} 
            />
          </mesh>
        </group>
      )}

      {/* Barra de energia */}
      <group position={[0.8, 2, 0]}>
        <mesh>
          <boxGeometry args={[0.06, 1, 0.06]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[0, (-0.5 + status.energy * 0.01), 0.03]}>
          <boxGeometry args={[0.04, status.energy * 0.01, 0.04]} />
          <meshStandardMaterial 
            color={status.energy > 50 ? "#00FF00" : status.energy > 20 ? "#FFFF00" : "#FF0000"} 
            emissive={status.energy > 50 ? "#00FF00" : status.energy > 20 ? "#FFFF00" : "#FF0000"}
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Label do nome */}
      <mesh position={[0, 4.5, 0]}>
        <boxGeometry args={[1.5, 0.2, 0.02]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.7} />
      </mesh>
    </group>
  );
};