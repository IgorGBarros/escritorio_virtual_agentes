// src/components/3d/Character/RestrictedAgent.tsx
import React, { useEffect } from 'react';
import { AnimatedAgent, AgentRole } from './AnimatedAgent';
import { useMovementControl } from '../../../hooks/useMovementControl';
import { useAgentStates } from '../../../hooks/useAgentStates';
import { ROOM_BOUNDARIES } from '../../../config/RoomBoundaries';

interface Props {
  role: AgentRole;
  position: [number, number, number];
  workstation: [number, number, number]; // ✅ ADICIONADO
  onMovementBlocked?: (reason: string) => void; // ✅ ADICIONADO
  onInteract?: (agent: any) => void;
}

export const RestrictedAgent: React.FC<Props> = ({ 
  role, 
  position,
  workstation, // ✅ USAR PROP
  onMovementBlocked,
  onInteract 
}) => {
  const { movementState, isMovementAllowed, returnToRoom } = useMovementControl(role);
  const agentStates = useAgentStates('idle', workstation); // ✅ CORRIGIDO
  
  const handleInteract = () => {
    if (onInteract) {
      onInteract({
        role,
        movementState,
        roomInfo: ROOM_BOUNDARIES[role],
        actions: {
          ...agentStates,
          returnToRoom
        }
      });
    }
  };

  return (
    <AnimatedAgent
      role={role}
      position={position}
      workstation={workstation} // ✅ PASSAR PROP
      initialState="idle"
      onInteract={handleInteract}
    />
  );
};