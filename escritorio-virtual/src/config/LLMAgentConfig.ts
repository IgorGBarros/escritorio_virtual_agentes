// src/config/LLMAgentConfig.ts
export type AgentRole = 'ceo' | 'backend' | 'frontend' | 'devops' | 'qa' | 'designer' | 'pm' | 'tech-lead' | 'mobile' | 'sysadmin' | 'creative' | 'orchestrator';

export interface TeamStructure {
  leadership: number;
  development: number;
  operations: number;
  quality: number;
  design: number;
}

export interface LLMAgentDefinition {
  id: string;
  role: AgentRole;
  name: string;
  seniority: 'junior' | 'pleno' | 'senior' | 'lead' | 'principal';
  skills: string[];
  workload: number;
  availability: 'available' | 'busy' | 'meeting' | 'blocked';
  assignedRoom: string;
  position: [number, number, number];
  workstation: [number, number, number];
  responsibilities: string[];
  // Propriedades específicas para o sistema de personagens
  characterType: AgentRole;
  haloColor: string;
  baseColor: string;
  accessories: string[];
}

export interface LLMAgentConfiguration {
  totalAgents: number;
  teamStructure: TeamStructure;
  agents: LLMAgentDefinition[];
  workflowRules: WorkflowRule[];
  meetingSchedule: MeetingConfiguration[];
}

export interface WorkflowRule {
  id: string;
  trigger: string;
  condition: string;
  action: string;
  involvedRoles: AgentRole[];
}

export interface MeetingConfiguration {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  duration: number;
  participants: AgentRole[];
  room: string;
}

// Configuração expandida baseada nas imagens de referência
export const DEFAULT_LLM_CONFIG: LLMAgentConfiguration = {
  totalAgents: 12,
  teamStructure: {
    leadership: 3, // CEO, PM, Tech Leader
    development: 5, // Backend, Frontend, Mobile, Creative, Tech Lead
    operations: 2, // DevOps, SysAdmin
    quality: 1, // QA
    design: 1  // Designer
  },
  agents: [
    {
      id: 'ceo-001',
      role: 'ceo',
      name: 'Alex Thompson',
      seniority: 'principal',
      skills: ['strategy', 'leadership', 'business', 'vision'],
      workload: 85,
      availability: 'available',
      assignedRoom: 'ceo-office',
      position: [-12, 0, -10],
      workstation: [-13, 0, -11],
      responsibilities: ['strategic planning', 'team leadership', 'investor relations', 'company vision'],
      characterType: 'ceo',
      haloColor: '#FFD700',
      baseColor: '#FFFFFF',
      accessories: ['ceo-badge', 'briefcase', 'golden-watch']
    },
    {
      id: 'tech-lead-001',
      role: 'tech-lead',
      name: 'Marcus Rodriguez',
      seniority: 'principal',
      skills: ['architecture', 'mentoring', 'code-review', 'system-design'],
      workload: 90,
      availability: 'available',
      assignedRoom: 'tech-lead-office',
      position: [-10, 0, -8],
      workstation: [-11, 0, -9],
      responsibilities: ['technical architecture', 'code standards', 'team mentoring', 'technical decisions'],
      characterType: 'tech-lead',
      haloColor: '#FFA500',
      baseColor: '#FFA500',
      accessories: ['helmet', 'clipboard', 'wrench']
    },
    {
      id: 'backend-001',
      role: 'backend',
      name: 'Sarah Chen',
      seniority: 'senior',
      skills: ['python', 'django', 'postgresql', 'redis', 'microservices'],
      workload: 75,
      availability: 'available',
      assignedRoom: 'backend-dev',
      position: [-8, 0, 0],
      workstation: [-9, 0, -1],
      responsibilities: ['api development', 'database design', 'system architecture', 'performance optimization'],
      characterType: 'backend',
      haloColor: '#00FF00',
      baseColor: '#00FF00',
      accessories: ['keyboard', 'coffee-stack', 'server-icon']
    },
    {
      id: 'backend-002',
      role: 'backend',
      name: 'João Silva',
      seniority: 'pleno',
      skills: ['node.js', 'express', 'mongodb', 'docker'],
      workload: 70,
      availability: 'available',
      assignedRoom: 'backend-dev',
      position: [-6, 0, 0],
      workstation: [-7, 0, -1],
      responsibilities: ['api integration', 'database optimization', 'testing'],
      characterType: 'backend',
      haloColor: '#00FF00',
      baseColor: '#00FF00',
      accessories: ['keyboard', 'coffee-mug', 'database-icon']
    },
    {
      id: 'frontend-001',
      role: 'frontend',
      name: 'Emma Davis',
      seniority: 'senior',
      skills: ['react', 'typescript', 'tailwind', 'vite', 'three.js'],
      workload: 80,
      availability: 'available',
      assignedRoom: 'frontend-dev',
      position: [-1, 0, 0],
      workstation: [-2, 0, -1],
      responsibilities: ['ui development', 'component library', 'user experience', '3d interfaces'],
      characterType: 'frontend',
      haloColor: '#FF6B35',
      baseColor: '#FF6B35',
      accessories: ['keyboard-rgb', 'mouse', 'design-tablet']
    },
    {
      id: 'frontend-002',
      role: 'frontend',
      name: 'Lucas Oliveira',
      seniority: 'pleno',
      skills: ['vue.js', 'nuxt', 'css', 'figma'],
      workload: 65,
      availability: 'available',
      assignedRoom: 'frontend-dev',
      position: [1, 0, 0],
      workstation: [0, 0, -1],
      responsibilities: ['responsive design', 'animations', 'prototyping'],
      characterType: 'frontend',
      haloColor: '#FF6B35',
      baseColor: '#FF6B35',
      accessories: ['keyboard-rgb', 'stylus', 'color-palette']
    },
    {
      id: 'devops-001',
      role: 'devops',
      name: 'David Kim',
      seniority: 'senior',
      skills: ['docker', 'kubernetes', 'aws', 'terraform', 'jenkins'],
      workload: 80,
      availability: 'available',
      assignedRoom: 'devops-center',
      position: [6, 0, 0],
      workstation: [5, 0, -1],
      responsibilities: ['infrastructure', 'ci/cd', 'monitoring', 'security'],
      characterType: 'sysadmin',
      haloColor: '#FFFFFF',
      baseColor: '#FFFFFF',
      accessories: ['server', 'cloud', 'ci-cd-badge']
    },
    {
      id: 'qa-001',
      role: 'qa',
      name: 'Lisa Rodriguez',
      seniority: 'pleno',
      skills: ['testing', 'automation', 'cypress', 'jest', 'selenium'],
      workload: 65,
      availability: 'available',
      assignedRoom: 'qa-lab',
      position: [6, 0, 8],
      workstation: [5, 0, 7],
      responsibilities: ['test automation', 'quality assurance', 'bug tracking', 'test planning'],
      characterType: 'qa',
      haloColor: '#FFFF00',
      baseColor: '#FFFF00',
      accessories: ['magnifier', 'bug-list', 'checklist']
    },
    {
      id: 'designer-001',
      role: 'designer',
      name: 'Isabella Lee',
      seniority: 'senior',
      skills: ['figma', 'photoshop', 'ui/ux', 'design-systems', 'user-research'],
      workload: 70,
      availability: 'available',
      assignedRoom: 'design-studio',
      position: [-8, 0, 8],
      workstation: [-9, 0, 7],
      responsibilities: ['ui design', 'user research', 'prototyping', 'design systems'],
      characterType: 'creative',
      haloColor: '#FF1493',
      baseColor: '#FF69B4',
      accessories: ['guitar', 'laptop', 'color-wheel']
    },
    {
      id: 'pm-001',
      role: 'pm',
      name: 'Robert Johnson',
      seniority: 'senior',
      skills: ['scrum', 'agile', 'planning', 'coordination', 'stakeholder-management'],
      workload: 80,
      availability: 'available',
      assignedRoom: 'pm-office',
      position: [0, 0, -8],
      workstation: [-1, 0, -9],
      responsibilities: ['project planning', 'team coordination', 'stakeholder management', 'sprint planning'],
      characterType: 'tech-lead', // ✅ Corrigido
      haloColor: '#9370DB',
      baseColor: '#9370DB',
      accessories: ['badge', 'tablet-charts', 'calendar']
    },
    {
      id: 'mobile-001',
      role: 'mobile',
      name: 'Ana Santos',
      seniority: 'pleno',
      skills: ['react-native', 'expo', 'ios', 'android', 'flutter'],
      workload: 75,
      availability: 'available',
      assignedRoom: 'mobile-dev',
      position: [8, 0, 8],
      workstation: [7, 0, 7],
      responsibilities: ['mobile development', 'app store deployment', 'cross-platform', 'mobile ui'],
      characterType: 'mobile',
      haloColor: '#00FFFF',
      baseColor: '#00FFFF',
      accessories: ['smartphone', 'app-store-icon', 'play-store-icon']
    },
    {
      id: 'orchestrator-001',
      role: 'orchestrator',
      name: 'Dr. Elena Vasquez',
      seniority: 'principal',
      skills: ['ai-orchestration', 'llm-integration', 'workflow-automation', 'data-analysis'],
      workload: 85,
      availability: 'available',
      assignedRoom: 'orchestration-center',
      position: [0, 0, 8],
      workstation: [-1, 0, 7],
      responsibilities: ['ai coordination', 'workflow optimization', 'data insights', 'automation'],
      characterType: 'orchestrator',
      haloColor: '#00FF7F',
      baseColor: '#00FF7F',
      accessories: ['dual-tablets', 'ai-chip', 'network-graph']
    }
  ],
  workflowRules: [
    {
      id: 'daily-standup',
      trigger: 'time',
      condition: 'daily at 9:00',
      action: 'start meeting',
      involvedRoles: ['backend', 'frontend', 'qa', 'mobile']
    },
    {
      id: 'code-review',
      trigger: 'pull-request',
      condition: 'new PR created',
      action: 'assign reviewer',
      involvedRoles: ['tech-lead', 'backend', 'frontend']
    },
    {
      id: 'deployment-approval',
      trigger: 'deployment-request',
      condition: 'production deployment',
      action: 'require approval',
      involvedRoles: ['devops', 'tech-lead', 'ceo']
    },
    {
      id: 'bug-triage',
      trigger: 'bug-report',
      condition: 'critical bug',
      action: 'immediate attention',
      involvedRoles: ['qa', 'backend', 'frontend', 'tech-lead']
    }
  ],
  meetingSchedule: [
    {
      id: 'daily-standup',
      name: 'Daily Standup',
      frequency: 'daily',
      duration: 15,
      participants: ['backend', 'frontend', 'qa', 'mobile', 'tech-lead'],
      room: 'main-conference'
    },
    {
      id: 'sprint-planning',
      name: 'Sprint Planning',
      frequency: 'weekly',
      duration: 120,
      participants: ['ceo', 'pm', 'tech-lead', 'backend', 'frontend', 'qa', 'designer'],
      room: 'main-conference'
    },
    {
      id: 'architecture-review',
      name: 'Architecture Review',
      frequency: 'weekly',
      duration: 60,
      participants: ['tech-lead', 'backend', 'devops', 'ceo'],
      room: 'ceo-office'
    },
    {
      id: 'design-sync',
      name: 'Design Sync',
      frequency: 'weekly',
      duration: 45,
      participants: ['designer', 'frontend', 'pm'],
      room: 'design-studio'
    },
    {
      id: 'retrospective',
      name: 'Sprint Retrospective',
      frequency: 'weekly',
      duration: 60,
      participants: ['pm', 'backend', 'frontend', 'qa', 'mobile', 'tech-lead'],
      room: 'main-conference'
    }
  ]
};

// Função auxiliar para obter agentes por papel
export const getAgentsByRole = (role: AgentRole): LLMAgentDefinition[] => {
  return DEFAULT_LLM_CONFIG.agents.filter(agent => agent.role === role);
};

// Função auxiliar para obter agentes por senioridade
export const getAgentsBySeniority = (seniority: string): LLMAgentDefinition[] => {
  return DEFAULT_LLM_CONFIG.agents.filter(agent => agent.seniority === seniority);
};

// Função auxiliar para obter agentes disponíveis
export const getAvailableAgents = (): LLMAgentDefinition[] => {
  return DEFAULT_LLM_CONFIG.agents.filter(agent => agent.availability === 'available');
};

// Configurações de cenários pré-definidos
export const SCENARIO_CONFIGS = {
  startup: {
    ...DEFAULT_LLM_CONFIG,
    totalAgents: 6,
    agents: DEFAULT_LLM_CONFIG.agents.slice(0, 6)
  },
  enterprise: {
    ...DEFAULT_LLM_CONFIG,
    totalAgents: 12,
    agents: DEFAULT_LLM_CONFIG.agents
  },
  agency: {
    ...DEFAULT_LLM_CONFIG,
    totalAgents: 8,
    agents: DEFAULT_LLM_CONFIG.agents.filter(agent => 
      ['frontend', 'backend', 'designer', 'pm', 'ceo', 'qa', 'mobile', 'creative'].includes(agent.role)
    )
  }
};