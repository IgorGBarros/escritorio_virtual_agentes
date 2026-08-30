// src/hooks/useMovementControl.ts
import { useState, useCallback } from 'react';
import { AgentRole } from '../components/3d/Character/AnimatedAgent';
import { ROOM_BOUNDARIES, isWithinRoomBoundaries, getConstrainedPosition } from '../config/RoomBoundaries';

export type MovementPermission = 'restricted' | 'meeting-allowed' | 'free';

export interface MovementState {
  role: AgentRole;
  currentRoom: string;
  permission: MovementPermission;
  canLeaveRoom: boolean;
  meetingInvite?: {
    meetingId: string;
    location: [number, number, number];
    participants: AgentRole[];
  };
}

export const useMovementControl = (role: AgentRole) => {
  const [movementState, setMovementState] = useState<MovementState>({
    role,
    currentRoom: ROOM_BOUNDARIES[role].roomName,
    permission: 'restricted',
    canLeaveRoom: false
  });

  // Verificar se o movimento é permitido
  const isMovementAllowed = useCallback((
    targetPosition: [number, number, number]
  ): { allowed: boolean; constrainedPosition: [number, number, number]; reason?: string } => {
    
    // Se tem permissão livre (CEO ou reunião)
    if (movementState.permission === 'free') {
      return { allowed: true, constrainedPosition: targetPosition };
    }
    
    // Se foi convocado para reunião
    if (movementState.permission === 'meeting-allowed' && movementState.meetingInvite) {
      const meetingLocation = movementState.meetingInvite.location;
      const distanceToMeeting = Math.sqrt(
        Math.pow(targetPosition[0] - meetingLocation[0], 2) +
        Math.pow(targetPosition[2] - meetingLocation[2], 2)
      );
      
      // Permitir movimento se estiver indo para a reunião (raio de 8 unidades)
      if (distanceToMeeting <= 8) {
        return { allowed: true, constrainedPosition: targetPosition };
      }
    }
    
    // Verificar se está dentro dos limites da própria sala
    if (isWithinRoomBoundaries(role, targetPosition)) {
      return { allowed: true, constrainedPosition: targetPosition };
    }
    
    // Restringir à sala - retornar posição mais próxima dentro dos limites
    const constrainedPosition = getConstrainedPosition(role, targetPosition);
    return { 
      allowed: false, 
      constrainedPosition, 
      reason: `${role} deve permanecer na ${ROOM_BOUNDARIES[role].roomName}` 
    };
  }, [role, movementState]);

  // Convocar para reunião
  const inviteToMeeting = useCallback((
    meetingId: string,
    location: [number, number, number],
    participants: AgentRole[]
  ) => {
    setMovementState(prev => ({
      ...prev,
      permission: 'meeting-allowed',
      canLeaveRoom: true,
      meetingInvite: {
        meetingId,
        location,
        participants
      }
    }));
    
    console.log(`📧 ${role} foi convocado para reunião: ${meetingId}`);
  }, [role]);

  // Finalizar reunião - voltar para a sala
  const endMeeting = useCallback(() => {
    setMovementState(prev => ({
      ...prev,
      permission: 'restricted',
      canLeaveRoom: false,
      meetingInvite: undefined
    }));
    
    console.log(`🏠 ${role} voltou para ${ROOM_BOUNDARIES[role].roomName}`);
  }, [role]);

  // Dar permissão livre (apenas para CEO)
  const grantFreeMovement = useCallback(() => {
    if (role === 'ceo') {
      setMovementState(prev => ({
        ...prev,
        permission: 'free',
        canLeaveRoom: true
      }));
    }
  }, [role]);

  // Voltar para a sala
  const returnToRoom = useCallback(() => {
    const roomCenter = ROOM_BOUNDARIES[role].center;
    setMovementState(prev => ({
      ...prev,
      permission: 'restricted',
      canLeaveRoom: false,
      meetingInvite: undefined
    }));
    
    return roomCenter;
  }, [role]);

  return {
    movementState,
    isMovementAllowed,
    inviteToMeeting,
    endMeeting,
    grantFreeMovement,
    returnToRoom
  };
};