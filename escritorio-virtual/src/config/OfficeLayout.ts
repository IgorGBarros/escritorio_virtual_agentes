// src/config/OfficeLayout.ts
import { AgentRole } from '../components/3d/Character/AnimatedAgent';

export interface WorkspaceConfig {
  role: AgentRole;
  room: {
    position: [number, number, number];
    color: string;
    name: string;
  };
  workstation: {
    position: [number, number, number];
    rotation: [number, number, number];
  };
  chair: {
    position: [number, number, number];
    rotation: [number, number, number];
  };
  spawnPosition: [number, number, number];
}

export const OFFICE_LAYOUT: Record<AgentRole, WorkspaceConfig> = {
  'ceo': {
    role: 'ceo',
    room: {
      position: [-12, 0, -10],
      color: '#90EE90',
      name: 'Sala do CEO'
    },
    workstation: {
      position: [-1, 0, -1],
      rotation: [0, 0, 0]
    },
    chair: {
      position: [-1, 0, 0.5],
      rotation: [0, Math.PI, 0]
    },
    spawnPosition: [-10, 0, -8]
  },
  'backend': {
    role: 'backend',
    room: {
      position: [-10, 0, -2],
      color: '#DEB887',
      name: 'Backend Development'
    },
    workstation: {
      position: [-2, 0, -1],
      rotation: [0, 0, 0]
    },
    chair: {
      position: [-2, 0, 0.5],
      rotation: [0, Math.PI, 0]
    },
    spawnPosition: [-8, 0, -1]
  },
  'frontend': {
    role: 'frontend',
    room: {
      position: [-2, 0, -2],
      color: '#F4A460',
      name: 'Frontend Development'
    },
    workstation: {
      position: [-2, 0, -1],
      rotation: [0, 0, 0]
    },
    chair: {
      position: [-2, 0, 0.5],
      rotation: [0, Math.PI, 0]
    },
    spawnPosition: [0, 0, -1]
  },
  'devops': {
    role: 'devops',
    room: {
      position: [10, 0, 3],
      color: '#B0C4DE',
      name: 'DevOps & Infrastructure'
    },
    workstation: {
      position: [-2, 0, 2],
      rotation: [0, 0, 0]
    },
    chair: {
      position: [-2, 0, 3.5],
      rotation: [0, 0, 0]
    },
    spawnPosition: [8, 0, 1]
  },
  'qa': {
    role: 'qa',
    room: {
      position: [6, 0, 9],
      color: '#FFB6C1',
      name: 'Quality Assurance'
    },
    workstation: {
      position: [-2, 0, -1],
      rotation: [0, 0, 0]
    },
    chair: {
      position: [-2, 0, 0.5],
      rotation: [0, Math.PI, 0]
    },
    spawnPosition: [4, 0, 7]
  },
  'designer': {
    role: 'designer',
    room: {
      position: [-10, 0, 8],
      color: '#ADD8E6',
      name: 'Design Studio'
    },
    workstation: {
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    },
    chair: {
      position: [0, 0, 1.5],
      rotation: [0, 0, 0]
    },
    spawnPosition: [-8, 0, 6]
  },
  'pm': {
    role: 'pm',
    room: {
      position: [10, 0, -10],
      color: '#B0C4DE',
      name: 'Project Management'
    },
    workstation: {
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    },
    chair: {
      position: [0, 0, 1.5],
      rotation: [0, 0, 0]
    },
    spawnPosition: [8, 0, -8]
  }
};

// Função para obter configuração do workspace
export const getWorkspaceConfig = (role: AgentRole): WorkspaceConfig => {
  return OFFICE_LAYOUT[role];
};

// Função para calcular posição absoluta da cadeira
export const getAbsoluteChairPosition = (role: AgentRole): [number, number, number] => {
  const config = getWorkspaceConfig(role);
  return [
    config.room.position[0] + config.chair.position[0],
    config.room.position[1] + config.chair.position[1],
    config.room.position[2] + config.chair.position[2]
  ];
};

// Função para calcular posição absoluta da mesa
export const getAbsoluteWorkstationPosition = (role: AgentRole): [number, number, number] => {
  const config = getWorkspaceConfig(role);
  return [
    config.room.position[0] + config.workstation.position[0],
    config.room.position[1] + config.workstation.position[1],
    config.room.position[2] + config.workstation.position[2]
  ];
};