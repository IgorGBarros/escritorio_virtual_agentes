// src/services/LLMConfigParser.ts
import { LLMAgentConfiguration, LLMAgentDefinition, AgentRole, TeamStructure } from '../config/LLMAgentConfig';

export class LLMConfigParser {
  
  static parseFromLLMResponse(llmResponse: string): LLMAgentConfiguration {
    try {
      if (llmResponse.trim().startsWith('{')) {
        return JSON.parse(llmResponse);
      }
      
      return this.parseNaturalLanguage(llmResponse);
    } catch (error) {
      console.error('Erro ao parsear configuração LLM:', error);
      throw new Error('Configuração LLM inválida');
    }
  }
  
  private static parseNaturalLanguage(text: string): LLMAgentConfiguration {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    const config: LLMAgentConfiguration = {
      totalAgents: 0,
      agents: [],
      teamStructure: {
        leadership: 0,
        development: 0,
        operations: 0,
        quality: 0,
        design: 0
      },
      workflowRules: [],
      meetingSchedule: []
    };
    
    let currentSection = '';
    
    for (const line of lines) {
      if (line.toLowerCase().includes('agentes:') || line.toLowerCase().includes('team:')) {
        currentSection = 'agents';
        continue;
      }
      
      if (currentSection === 'agents') {
        const agentMatch = line.match(/(\d+)\s+(\w+)\s*-\s*(.+)/);
        if (agentMatch) {
          const [, count, role, description] = agentMatch;
          const agentCount = parseInt(count);
          
          for (let i = 0; i < agentCount; i++) {
            const agent = this.createAgentFromDescription(role as AgentRole, description, i);
            config.agents.push(agent);
          }
        }
      }
    }
    
    config.totalAgents = config.agents.length;
    this.updateTeamStructure(config);
    
    return config;
  }
  
  private static createAgentFromDescription(
    role: AgentRole, 
    description: string, 
    index: number
  ): LLMAgentDefinition {
    const names = this.getRandomNameForRole(role);
    
    return {
      id: `${role}-${String(index + 1).padStart(3, '0')}`,
      role,
      name: names[index % names.length],
      seniority: this.extractSeniorityFromDescription(description),
      skills: this.extractSkillsFromDescription(description, role),
      workload: Math.floor(Math.random() * 30) + 60,
      availability: 'available',
      assignedRoom: `${role}-room`,
      position: [
        Math.random() * 10 - 5,
        0,
        Math.random() * 10 - 5
      ] as [number, number, number],
      workstation: [
        Math.random() * 10 - 5,
        0,
        Math.random() * 10 - 5
      ] as [number, number, number],
      responsibilities: this.getResponsibilitiesForRole(role),
      // ✅ Propriedades obrigatórias adicionadas
      characterType: role,
      haloColor: this.getHaloColorForRole(role),
      baseColor: this.getBaseColorForRole(role),
      accessories: this.getAccessoriesForRole(role)
    };
  }
  
  private static extractSeniorityFromDescription(description: string): 'junior' | 'pleno' | 'senior' | 'lead' | 'principal' {
    const desc = description.toLowerCase();
    if (desc.includes('junior') || desc.includes('iniciante')) return 'junior';
    if (desc.includes('senior') || desc.includes('sênior')) return 'senior';
    if (desc.includes('lead') || desc.includes('líder')) return 'lead';
    if (desc.includes('principal') || desc.includes('arquiteto')) return 'principal';
    return 'pleno';
  }
  
  private static extractSkillsFromDescription(description: string, role: AgentRole): string[] {
    const skillMap: Record<AgentRole, string[]> = {
      'ceo': ['strategy', 'leadership', 'business', 'management'],
      'backend': ['python', 'django', 'postgresql', 'redis', 'api'],
      'frontend': ['react', 'typescript', 'css', 'javascript', 'ui'],
      'devops': ['docker', 'kubernetes', 'aws', 'ci/cd', 'monitoring'],
      'qa': ['testing', 'automation', 'selenium', 'quality'],
      'designer': ['figma', 'photoshop', 'ui/ux', 'design'],
      'pm': ['scrum', 'agile', 'planning', 'coordination'],
      'tech-lead': ['architecture', 'code-review', 'mentoring', 'technical-leadership'],
      'mobile': ['react-native', 'expo', 'ios', 'android', 'flutter'],
      'sysadmin': ['linux', 'networking', 'security', 'monitoring'],
      'creative': ['design', 'branding', 'content-creation', 'visual-arts'],
      'orchestrator': ['ai-coordination', 'workflow-automation', 'data-analysis', 'llm-integration']
    };
    
    return skillMap[role] || [];
  }
  
  private static getRandomNameForRole(role: AgentRole): string[] {
    const nameMap: Record<AgentRole, string[]> = {
      'ceo': ['Alex Thompson', 'Sarah Johnson', 'Michael Chen'],
      'backend': ['David Kim', 'Maria Santos', 'John Wilson'],
      'frontend': ['Lisa Rodriguez', 'Carlos Silva', 'Emma Davis'],
      'devops': ['Robert Zhang', 'Ana Oliveira', 'James Brown'],
      'qa': ['Sophie Martin', 'Lucas Garcia', 'Nina Patel'],
      'designer': ['Isabella Lee', 'Ryan Murphy', 'Zoe Chang'],
      'pm': ['Marcus Johnson', 'Elena Rossi', 'Kevin Park'],
      'tech-lead': ['Dr. Alan Foster', 'Rachel Kim', 'Thomas Anderson'],
      'mobile': ['Ana Santos', 'Diego Martinez', 'Priya Sharma'],
      'sysadmin': ['Igor Petrov', 'Linda Chang', 'Hassan Ali'],
      'creative': ['Sofia Rossi', 'Jake Miller', 'Maya Patel'],
      'orchestrator': ['Dr. Elena Vasquez', 'Marcus AI', 'Zara Chen']
    };
    
    return nameMap[role] || ['Agent Smith'];
  }
  
  private static getResponsibilitiesForRole(role: AgentRole): string[] {
    const responsibilityMap: Record<AgentRole, string[]> = {
      'ceo': ['strategic planning', 'team leadership', 'business development'],
      'backend': ['api development', 'database design', 'system architecture'],
      'frontend': ['ui development', 'component library', 'user experience'],
      'devops': ['infrastructure', 'deployment', 'monitoring'],
      'qa': ['test automation', 'quality assurance', 'bug tracking'],
      'designer': ['ui design', 'user research', 'prototyping'],
      'pm': ['project planning', 'team coordination', 'stakeholder management'],
      'tech-lead': ['technical architecture', 'code reviews', 'team mentoring'],
      'mobile': ['mobile development', 'app store deployment', 'cross-platform'],
      'sysadmin': ['system administration', 'network security', 'server maintenance'],
      'creative': ['creative direction', 'brand design', 'content strategy'],
      'orchestrator': ['ai coordination', 'workflow optimization', 'data insights']
    };
    
    return responsibilityMap[role] || [];
  }

  // ✅ Métodos auxiliares para propriedades obrigatórias
  private static getHaloColorForRole(role: AgentRole): string {
    const colors: Record<AgentRole, string> = {
      'ceo': '#FFD700',
      'backend': '#4CAF50',
      'frontend': '#FF6B35',
      'devops': '#FFFFFF',
      'qa': '#FFFF00',
      'designer': '#FF69B4',
      'pm': '#9370DB',
      'tech-lead': '#FF4500',
      'mobile': '#00FFFF',
      'sysadmin': '#C0C0C0',
      'creative': '#FF1493',
      'orchestrator': '#00FF7F'
    };
    return colors[role];
  }

  private static getBaseColorForRole(role: AgentRole): string {
    return this.getHaloColorForRole(role);
  }

  private static getAccessoriesForRole(role: AgentRole): string[] {
    const accessories: Record<AgentRole, string[]> = {
      'ceo': ['suit', 'briefcase', 'executive-badge'],
      'backend': ['laptop', 'coffee', 'code-editor'],
      'frontend': ['keyboard-rgb', 'stylus', 'color-palette'],
      'devops': ['server', 'cloud', 'ci-cd-badge'],
      'qa': ['magnifier', 'bug-list', 'checklist'],
      'designer': ['guitar', 'laptop', 'color-wheel'],
      'pm': ['badge', 'tablet-charts', 'calendar'],
      'tech-lead': ['architect-badge', 'code-review', 'mentoring-icon'],
      'mobile': ['smartphone', 'app-store-icon', 'play-store-icon'],
      'sysadmin': ['terminal', 'server-rack', 'network-cable'],
      'creative': ['paintbrush', 'camera', 'inspiration-board'],
      'orchestrator': ['dual-tablets', 'ai-chip', 'network-graph']
    };
    return accessories[role];
  }
  
  private static updateTeamStructure(config: LLMAgentConfiguration): void {
    config.teamStructure.leadership = config.agents.filter((agent: LLMAgentDefinition) => 
      ['ceo', 'pm', 'tech-lead'].includes(agent.role)
    ).length;
    
    config.teamStructure.development = config.agents.filter((agent: LLMAgentDefinition) => 
      ['backend', 'frontend', 'mobile'].includes(agent.role)
    ).length;
    
    config.teamStructure.operations = config.agents.filter((agent: LLMAgentDefinition) => 
      ['devops', 'sysadmin'].includes(agent.role)
    ).length;
    
    config.teamStructure.quality = config.agents.filter((agent: LLMAgentDefinition) => 
      agent.role === 'qa'
    ).length;
    
    config.teamStructure.design = config.agents.filter((agent: LLMAgentDefinition) => 
      ['designer', 'creative'].includes(agent.role)
    ).length;
  }
  
  static validateConfiguration(config: LLMAgentConfiguration): boolean {
    if (!config.agents || config.agents.length === 0) {
      throw new Error('Configuração deve ter pelo menos 1 agente');
    }
    
    if (config.totalAgents !== config.agents.length) {
      console.warn('Total de agentes não confere com array de agentes');
    }
    
    return true;
  }
}