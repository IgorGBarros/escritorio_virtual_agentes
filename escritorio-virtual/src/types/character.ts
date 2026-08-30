// src/types/types.ts

export type CharacterRole = 
  | 'ceo' 
  | 'backend' 
  | 'frontend' 
  | 'devops' 
  | 'qa' 
  | 'designer' 
  | 'pm' 
  | 'tech-lead'    // ✅ Padronizado
  | 'mobile' 
  | 'sysadmin' 
  | 'creative' 
  | 'orchestrator';

export interface CharacterConfig {
  role: CharacterRole;
  name: string;
  position: [number, number, number];
  workstation: [number, number, number];
  color: string;
  isActive?: boolean;
  accessories?: string[];
}

export interface OfficePosition {
  x: number;
  y: number;
  z: number;
}

export interface WorkstationProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

export interface TaskInfo {
  id: string;
  name: string;
  progress: number;
  assignedTo: CharacterRole;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
}