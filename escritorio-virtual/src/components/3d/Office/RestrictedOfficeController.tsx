// src/components/3d/Office/RestrictedOfficeController.tsx
import React, { useState, useCallback } from 'react';
import { RestrictedAgent } from '../Character/RestrictedAgent';
import { MeetingSystem } from './MeetingSystem';
import { AgentRole } from '../Character/AnimatedAgent';
import { ROOM_BOUNDARIES } from '../../../config/RoomBoundaries';

export const RestrictedOfficeController: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  const agents: { role: AgentRole; position: [number, number, number]; workstation: [number, number, number] }[] = [
    { 
      role: 'ceo', 
      position: ROOM_BOUNDARIES.ceo.center,
      workstation: ROOM_BOUNDARIES.ceo.workstation // ✅ ADICIONADO
    },
    { 
      role: 'backend', 
      position: ROOM_BOUNDARIES.backend.center,
      workstation: ROOM_BOUNDARIES.backend.workstation
    },
    { role: 'frontend', position: ROOM_BOUNDARIES.frontend.center, workstation: ROOM_BOUNDARIES.frontend.workstation },
    { role: 'devops', position: ROOM_BOUNDARIES.devops.center, workstation: ROOM_BOUNDARIES.devops.workstation },
    { role: 'qa', position: ROOM_BOUNDARIES.qa.center, workstation: ROOM_BOUNDARIES.qa.workstation },
    { role: 'designer', position: ROOM_BOUNDARIES.designer.center, workstation: ROOM_BOUNDARIES.designer.workstation },
    { role: 'pm', position: ROOM_BOUNDARIES.pm.center, workstation: ROOM_BOUNDARIES.pm.workstation }
  ];

  const handleMovementBlocked = useCallback((reason: string) => {
    setNotifications(prev => [...prev.slice(-4), reason]); // Manter apenas 5 notificações
    console.warn(`🚫 Movimento bloqueado: ${reason}`);
  }, []);

  const handleAgentInteraction = useCallback((agentData: any) => {
    const { role, movementState, roomInfo } = agentData;
    
    console.log(`🤖 Interação com ${role}`);
    console.log(`🏠 Sala atual: ${roomInfo.roomName}`);
    console.log(`🚪 Pode sair: ${movementState.canLeaveRoom ? 'Sim' : 'Não'}`);
    console.log(`📋 Permissão: ${movementState.permission}`);

    // Exemplo de ações baseadas no papel
    switch (role) {
      case 'ceo':
        agentData.actions.grantFreeMovement?.();
        break;
      case 'pm':
        // PM pode agendar reuniões
        break;
      default:
        // Outros agentes ficam restritos às suas salas
        break;
    }
  }, []);

  return (
    <>
      {/* Agentes com restrições de movimento */}
      {agents.map((agent) => (
        <RestrictedAgent
          key={agent.role}
          role={agent.role}
          position={agent.position}
          workstation={agent.workstation} // ✅ PASSAR PROP
          onMovementBlocked={handleMovementBlocked}
          onInteract={handleAgentInteraction}
        />
      ))}

      {/* Sistema de reuniões */}
      <MeetingSystem
        agents={agents.map(a => a.role)}
        onMeetingScheduled={(meeting) => {
          console.log(`📅 Nova reunião: ${meeting.title}`);
        }}
      />

      {/* Painel de notificações */}
      <group position={[-15, 3, 0]}>
        <mesh>
          <boxGeometry args={[5, 4, 0.1]} />
          <meshStandardMaterial color="#1A1A1A" transparent opacity={0.8} />
        </mesh>
        {notifications.slice(-5).map((notification, index) => (
          <mesh key={index} position={[0, 1.5 - index * 0.6, 0.1]}>
            <boxGeometry args={[4.8, 0.5, 0.05]} />
            <meshStandardMaterial color="#FF4500" transparent opacity={0.7} />
          </mesh>
        ))}
      </group>
    </>
  );
};