// src/config/RoomBoundaries.ts
import { AgentRole } from '../components/3d/Character/AnimatedAgent';

export interface RoomBoundary {
  role: AgentRole;
  roomName: string;
  center: [number, number, number];
  boundaries: {
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
  };
  workstation: [number, number, number];
  chair: [number, number, number];
  allowedAreas: string[]; // Áreas que pode visitar quando convocado
}

export const ROOM_BOUNDARIES: Record<AgentRole, RoomBoundary> = {
  'ceo': {
    role: 'ceo',
    roomName: 'Sala do CEO',
    center: [-12, 0, -10],
    boundaries: {
      minX: -17,
      maxX: -7,
      minZ: -14,
      maxZ: -6
    },
    workstation: [-13, 0, -11],
    chair: [-13, 0, -9],
    allowedAreas: ['meeting-room', 'all-rooms'] // CEO pode ir a qualquer lugar
  },
  
  'backend': {
    role: 'backend',
    roomName: 'Backend Development',
    center: [-8, 0, 0],
    boundaries: {
      minX: -12,
      maxX: -4,
      minZ: -3,
      maxZ: 3
    },
    workstation: [-9, 0, -1],
    chair: [-9, 0, 1],
    allowedAreas: ['meeting-room', 'frontend-room'] // Pode colaborar com frontend
  },
  
  'frontend': {
    role: 'frontend',
    roomName: 'Frontend Development',
    center: [-1, 0, 0],
    boundaries: {
      minX: -4,
      maxX: 2,
      minZ: -3,
      maxZ: 3
    },
    workstation: [-2, 0, -1],
    chair: [-2, 0, 1],
    allowedAreas: ['meeting-room', 'backend-room', 'designer-room']
  },
  
  'devops': {
    role: 'devops',
    roomName: 'DevOps & Infrastructure',
    center: [6, 0, 0],
    boundaries: {
      minX: 3,
      maxX: 9,
      minZ: -3,
      maxZ: 3
    },
    workstation: [5, 0, -1],
    chair: [5, 0, 1],
    allowedAreas: ['meeting-room', 'backend-room']
  },
  
  'qa': {
    role: 'qa',
    roomName: 'Quality Assurance',
    center: [6, 0, 8],
    boundaries: {
      minX: 3,
      maxX: 9,
      minZ: 5,
      maxZ: 11
    },
    workstation: [5, 0, 7],
    chair: [5, 0, 9],
    allowedAreas: ['meeting-room', 'all-dev-rooms']
  },
  
  'designer': {
    role: 'designer',
    roomName: 'Design Studio',
    center: [-8, 0, 8],
    boundaries: {
      minX: -12,
      maxX: -4,
      minZ: 5,
      maxZ: 11
    },
    workstation: [-9, 0, 7],
    chair: [-9, 0, 9],
    allowedAreas: ['meeting-room', 'frontend-room']
  },
  
  'pm': {
    role: 'pm',
    roomName: 'Project Management',
    center: [0, 0, -8],
    boundaries: {
      minX: -5,
      maxX: 5,
      minZ: -11,
      maxZ: -5
    },
    workstation: [-1, 0, -9],
    chair: [-1, 0, -7],
    allowedAreas: ['meeting-room', 'ceo-room', 'all-rooms']
  }
};

// Função para verificar se uma posição está dentro dos limites da sala
export const isWithinRoomBoundaries = (
  role: AgentRole, 
  position: [number, number, number]
): boolean => {
  const room = ROOM_BOUNDARIES[role];
  const [x, , z] = position;
  
  return (
    x >= room.boundaries.minX &&
    x <= room.boundaries.maxX &&
    z >= room.boundaries.minZ &&
    z <= room.boundaries.maxZ
  );
};

// Função para obter posição mais próxima dentro dos limites
export const getConstrainedPosition = (
  role: AgentRole, 
  targetPosition: [number, number, number]
): [number, number, number] => {
  const room = ROOM_BOUNDARIES[role];
  const [x, y, z] = targetPosition;
  
  const constrainedX = Math.max(
    room.boundaries.minX, 
    Math.min(room.boundaries.maxX, x)
  );
  
  const constrainedZ = Math.max(
    room.boundaries.minZ, 
    Math.min(room.boundaries.maxZ, z)
  );
  
  return [constrainedX, y, constrainedZ];
};