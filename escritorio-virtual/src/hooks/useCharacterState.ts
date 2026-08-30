// src/hooks/useCharacterState.ts
import { useState, useCallback } from 'react';
import { LLMAgentConfiguration, LLMAgentDefinition } from '../config/LLMAgentConfig';

export const useCharacterState = () => {
  const [config, setConfig] = useState<LLMAgentConfiguration>({
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
  });

  const simulateScenario = useCallback((scenario: 'startup' | 'enterprise' | 'agency') => {
    const scenarios: Record<string, LLMAgentConfiguration> = {
      startup: {
        totalAgents: 5,
        teamStructure: {
          leadership: 1,
          development: 3,
          operations: 1,
          quality: 0,
          design: 0
        },
        agents: [
          {
            id: 'ceo-001',
            role: 'ceo',
            name: 'Sarah Johnson',
            seniority: 'senior',
            skills: ['strategy', 'leadership', 'business'],
            workload: 80,
            position: [0, 0, 0],
            workstation: [0, 0, -1],
            // ✅ Propriedades obrigatórias adicionadas
            availability: 'available',
            assignedRoom: 'ceo-office',
            responsibilities: ['strategic planning', 'team leadership'],
            characterType: 'ceo',
            haloColor: '#FFD700',
            baseColor: '#FFD700',
            accessories: ['suit', 'briefcase']
          },
          {
            id: 'backend-001',
            role: 'backend',
            name: 'David Kim',
            seniority: 'senior',
            skills: ['python', 'django', 'postgresql'],
            workload: 75,
            position: [2, 0, 0],
            workstation: [2, 0, -1],
            availability: 'available',
            assignedRoom: 'dev-room',
            responsibilities: ['api development', 'database design'],
            characterType: 'backend',
            haloColor: '#4CAF50',
            baseColor: '#4CAF50',
            accessories: ['laptop', 'coffee']
          },
          {
            id: 'frontend-001',
            role: 'frontend',
            name: 'Lisa Rodriguez',
            seniority: 'pleno',
            skills: ['react', 'typescript', 'css'],
            workload: 70,
            position: [4, 0, 0],
            workstation: [4, 0, -1],
            availability: 'available',
            assignedRoom: 'dev-room',
            responsibilities: ['ui development', 'component library'],
            characterType: 'frontend',
            haloColor: '#FF6B35',
            baseColor: '#FF6B35',
            accessories: ['keyboard-rgb', 'stylus']
          }
        ],
        workflowRules: [],
        meetingSchedule: []
      },
      enterprise: {
        totalAgents: 8,
        teamStructure: {
          leadership: 2,
          development: 4,
          operations: 1,
          quality: 1,
          design: 0
        },
        agents: [
          // Implementar agentes enterprise...
        ],
        workflowRules: [],
        meetingSchedule: []
      },
      agency: {
        totalAgents: 6,
        teamStructure: {
          leadership: 2,
          development: 2,
          operations: 0,
          quality: 0,
          design: 2
        },
        agents: [
          // Implementar agentes agency...
        ],
        workflowRules: [],
        meetingSchedule: []
      }
    };

    setConfig(scenarios[scenario]);
    return Promise.resolve(scenarios[scenario]);
  }, []);

  return { config, simulateScenario };
};