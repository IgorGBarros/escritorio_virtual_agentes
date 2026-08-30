// src/components/3d/Office/DynamicOfficeController.tsx
import React, { useState, useEffect } from 'react';
import { LLMAgentDefinition, AgentRole } from '../../../config/LLMAgentConfig';
import { useLLMConfiguration } from '../../../hooks/useLLMConfiguration';

// ✅ Mapeamento completo de cores para todos os roles
const ROLE_COLORS: Record<AgentRole, { color: string }> = {
  ceo: { color: '#FFD700' },
  backend: { color: '#4CAF50' },
  frontend: { color: '#FF6B35' },
  devops: { color: '#FFFFFF' },
  qa: { color: '#FFFF00' },
  designer: { color: '#FF69B4' },
  pm: { color: '#9370DB' },
  'tech-lead': { color: '#FF4500' },
  mobile: { color: '#00FFFF' },
  sysadmin: { color: '#C0C0C0' },
  creative: { color: '#FF1493' },
  orchestrator: { color: '#00FF7F' }
};

// ✅ Componente tipado corretamente
const SimpleAgent: React.FC<{
  agent: LLMAgentDefinition;
  onInteract: (agent: LLMAgentDefinition) => void;
}> = ({ agent, onInteract }) => {
  return (
    <group position={agent.position} onClick={() => onInteract(agent)}>
      {/* Halo */}
      <mesh position={[0, 3, 0]}>
        <torusGeometry args={[0.3, 0.05, 8, 16]} />
        <meshStandardMaterial 
          color={ROLE_COLORS[agent.role].color} 
          emissive={ROLE_COLORS[agent.role].color} 
          emissiveIntensity={0.6} 
        />
      </mesh>

      {/* Corpo */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.6, 1.5, 0.3]} />
        <meshStandardMaterial color={ROLE_COLORS[agent.role].color} />
      </mesh>
      
      {/* Cabeça */}
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.25]} />
        <meshStandardMaterial color="#FFDBAC" />
      </mesh>
    </group>
  );
};

export const DynamicOfficeController: React.FC = () => {
  const { config, simulateLLMResponse } = useLLMConfiguration();
  const [selectedScenario, setSelectedScenario] = useState<'startup' | 'enterprise' | 'agency'>('startup');

  useEffect(() => {
    simulateLLMResponse('startup');
  }, [simulateLLMResponse]);

  // ✅ Tipagem explícita do parâmetro
  const handleAgentInteraction = (agent: LLMAgentDefinition) => {
    console.log(`🤖 Interação com ${agent.name} (${agent.role})`);
    console.log(`📊 Skills: ${agent.skills.join(', ')}`);
    console.log(`⚡ Workload: ${agent.workload}%`);
    console.log(`📋 Status: ${agent.availability}`);
  };

  return (
    <>
      {/* Renderizar agentes */}
      {config.agents.map((agent) => (
        <SimpleAgent
          key={agent.id}
          agent={agent}
          onInteract={handleAgentInteraction}
        />
      ))}

      {/* Painel de informações */}
      <group position={[-15, 4, 0]}>
        <mesh>
          <boxGeometry args={[6, 5, 0.1]} />
          <meshStandardMaterial color="#1A1A1A" transparent opacity={0.8} />
        </mesh>
        
        <mesh position={[0, 1.5, 0.1]}>
          <boxGeometry args={[5.5, 0.8, 0.05]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
      </group>
    </>
  );
};