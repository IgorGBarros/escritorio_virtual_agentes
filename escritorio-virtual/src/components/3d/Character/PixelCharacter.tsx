// src/components/3d/Character/PixelCharacter.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { CharacterRole, CharacterConfig } from '../../../types/CharacterTypes';

const characterConfigs: Record<CharacterRole, CharacterConfig> = {
  'tech-lead': {
    haloColor: '#FFA500',
    baseColor: '#FFA500', 
    shirtColor: '#333333',
    pantsColor: '#555555',
    name: 'Tech Lead',
    accessories: ['helmet', 'clipboard']
  },
  'frontend': {
    haloColor: '#00FF00',
    baseColor: '#00FF00',
    shirtColor: '#888888', 
    pantsColor: '#333333',
    name: 'Frontend Dev',
    accessories: ['keyboard-rgb', 'mouse']
  },
  'backend': {
    haloColor: '#00FF00',
    baseColor: '#00FF00',
    shirtColor: '#222222',
    pantsColor: '#444444', 
    name: 'Backend Dev',
    accessories: ['keyboard', 'coffee-stack']
  },
  'creative': {
    haloColor: '#FF69B4',
    baseColor: '#FF69B4',
    shirtColor: '#008080',
    pantsColor: '#000000',
    name: 'Creative',
    accessories: ['guitar', 'laptop']
  },
  'tech-leader': {
    haloColor: '#FFD700',
    baseColor: '#FFD700',
    shirtColor: '#87CEEB',
    pantsColor: '#808080',
    name: 'Tech Leader', 
    accessories: ['badge', 'tablet-charts']
  },
  'qa': {
    haloColor: '#FFFF00',
    baseColor: '#FFFF00',
    shirtColor: '#FFFF00',
    pantsColor: '#0000FF',
    name: 'QA Tester',
    accessories: ['magnifier', 'bug-list']
  },
  'mobile': {
    haloColor: '#00FFFF',
    baseColor: '#00FFFF',
    shirtColor: '#FF69B4',
    pantsColor: '#000080',
    name: 'Mobile Dev',
    accessories: ['smartphone', 'app-icons']
  },
  'sysadmin': {
    haloColor: '#FFFFFF',
    baseColor: '#FFFFFF',
    shirtColor: '#333333',
    pantsColor: '#556B2F',
    name: 'SysAdmin',
    accessories: ['server', 'cloud', 'ci-cd']
  },
  'ceo': {
    haloColor: '#FFD700',
    baseColor: '#FFFFFF',
    shirtColor: '#000000',
    pantsColor: '#191970',
    name: 'CEO',
    accessories: ['ceo-badge', 'briefcase']
  },
  'orchestrator': {
    haloColor: '#00FF7F',
    baseColor: '#00FF7F',
    shirtColor: '#008080',
    pantsColor: '#000000',
    name: 'Orchestrator',
    accessories: ['dual-tablets']
  }
};

interface Props {
  role: CharacterRole;
  position: [number, number, number];
  onClick?: () => void;
}

export const PixelCharacter: React.FC<Props> = ({ role, position, onClick }) => {
  const groupRef = useRef<Group>(null);
  const config = characterConfigs[role];

  // Animação de respiração e halo flutuante
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  // Renderizar acessórios específicos por profissão
  const renderAccessories = () => {
    switch (role) {
      case 'tech-lead':
        return (
          <group>
            {/* Capacete dourado */}
            <mesh position={[0, 2.6, 0]}>
              <boxGeometry args={[0.5, 0.2, 0.5]} />
              <meshStandardMaterial color="#FFD700" />
            </mesh>
            {/* Prancheta */}
            <mesh position={[-0.6, 1.2, 0.2]} rotation={[0, 0, 0.3]}>
              <boxGeometry args={[0.3, 0.4, 0.05]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Caneta */}
            <mesh position={[-0.5, 1.4, 0.25]} rotation={[0, 0, 0.5]}>
              <cylinderGeometry args={[0.01, 0.01, 0.15]} />
              <meshStandardMaterial color="#0000FF" />
            </mesh>
          </group>
        );

      case 'frontend':
        return (
          <group>
            {/* Teclado RGB */}
            <mesh position={[0.6, 1.2, 0.2]}>
              <boxGeometry args={[0.4, 0.05, 0.2]} />
              <meshStandardMaterial 
                color="#333333" 
                emissive="#00FF00" 
                emissiveIntensity={0.3} 
              />
            </mesh>
            {/* Mouse */}
            <mesh position={[0.9, 1.15, 0.2]}>
              <boxGeometry args={[0.1, 0.05, 0.15]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>
        );

      case 'backend':
        return (
          <group>
            {/* Teclado normal */}
            <mesh position={[0.6, 1.2, 0.2]}>
              <boxGeometry args={[0.4, 0.05, 0.2]} />
              <meshStandardMaterial color="#555555" />
            </mesh>
            {/* Stack de 3 xícaras de café */}
            {[0, 1, 2].map(i => (
              <mesh key={i} position={[0.8, 1.1 + (i * 0.15), 0.4]}>
                <cylinderGeometry args={[0.08, 0.06, 0.12]} />
                <meshStandardMaterial 
                  color={i === 0 ? "#8B4513" : i === 1 ? "#654321" : "#D2B48C"} 
                />
              </mesh>
            ))}
          </group>
        );

      case 'creative':
        return (
          <group>
            {/* Violão */}
            <mesh position={[-0.6, 1.5, 0.2]} rotation={[0, 0, 0.3]}>
              <boxGeometry args={[0.15, 0.6, 0.08]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Laptop */}
            <mesh position={[0.6, 1.4, 0.2]} rotation={[0, 0, -0.2]}>
              <boxGeometry args={[0.3, 0.4, 0.05]} />
              <meshStandardMaterial color="#C0C0C0" />
            </mesh>
          </group>
        );

      case 'tech-leader':
        return (
          <group>
            {/* Badge "TECH LEADER" */}
            <mesh position={[0.3, 1.8, 0.2]}>
              <boxGeometry args={[0.25, 0.1, 0.02]} />
              <meshStandardMaterial color="#000080" />
            </mesh>
            {/* Tablet com gráficos */}
            <mesh position={[0.6, 1.5, 0.2]}>
              <boxGeometry args={[0.3, 0.4, 0.05]} />
              <meshStandardMaterial 
                color="#00CED1" 
                emissive="#00CED1" 
                emissiveIntensity={0.2} 
              />
            </mesh>
          </group>
        );

      case 'qa':
        return (
          <group>
            {/* Lupa */}
            <mesh position={[-0.5, 1.2, 0.3]} rotation={[0, 0, 0.5]}>
              <torusGeometry args={[0.15, 0.03, 8, 16]} />
              <meshStandardMaterial color="#C0C0C0" />
            </mesh>
            {/* Lista de bugs */}
            <mesh position={[0.5, 1.5, 0.2]}>
              <boxGeometry args={[0.3, 0.4, 0.05]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Bugs vermelhos na lista */}
            <mesh position={[0.5, 1.6, 0.25]}>
              <sphereGeometry args={[0.03]} />
              <meshStandardMaterial color="#FF0000" />
            </mesh>
            <mesh position={[0.6, 1.4, 0.25]}>
              <sphereGeometry args={[0.03]} />
              <meshStandardMaterial color="#FF0000" />
            </mesh>
          </group>
        );

      case 'mobile':
        return (
          <group>
            {/* Smartphone */}
            <mesh position={[0.6, 1.5, 0.2]}>
              <boxGeometry args={[0.2, 0.4, 0.05]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            {/* App Store icon */}
            <mesh position={[0.9, 1.7, 0.2]}>
              <boxGeometry args={[0.1, 0.1, 0.02]} />
              <meshStandardMaterial color="#0000FF" />
            </mesh>
            {/* Play Store icon */}
            <mesh position={[0.9, 1.4, 0.2]}>
              <boxGeometry args={[0.1, 0.1, 0.02]} />
              <meshStandardMaterial color="#00FF00" />
            </mesh>
          </group>
        );

      case 'sysadmin':
        return (
          <group>
            {/* Servidor */}
            <mesh position={[0.8, 1.5, 0]}>
              <boxGeometry args={[0.2, 0.4, 0.15]} />
              <meshStandardMaterial color="#696969" />
            </mesh>
            {/* Nuvem */}
            <mesh position={[0.8, 2.2, 0]}>
              <sphereGeometry args={[0.15]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Ícone CI/CD (círculo com seta) */}
            <mesh position={[0.8, 1.0, 0]} rotation={[0, 0, 1]}>
              <torusGeometry args={[0.1, 0.03, 8, 16]} />
              <meshStandardMaterial color="#00FF00" />
            </mesh>
          </group>
        );

      case 'ceo':
        return (
          <group>
            {/* Badge CEO dourado */}
            <mesh position={[0.3, 1.8, 0.2]}>
              <cylinderGeometry args={[0.1, 0.1, 0.02]} />
              <meshStandardMaterial color="#FFD700" />
            </mesh>
            {/* Maleta executiva */}
            <mesh position={[0.6, 0.5, 0.2]}>
              <boxGeometry args={[0.3, 0.2, 0.1]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>
        );

      case 'orchestrator':
        return (
          <group>
            {/* Tablet esquerdo com grafos */}
            <mesh position={[-0.6, 1.5, 0.2]}>
              <boxGeometry args={[0.3, 0.4, 0.05]} />
              <meshStandardMaterial 
                color="#00FF7F" 
                emissive="#00FF7F" 
                emissiveIntensity={0.2} 
              />
            </mesh>
            {/* Tablet direito com grafos */}
            <mesh position={[0.6, 1.5, 0.2]}>
              <boxGeometry args={[0.3, 0.4, 0.05]} />
              <meshStandardMaterial 
                color="#00FF7F" 
                emissive="#00FF7F" 
                emissiveIntensity={0.2} 
              />
            </mesh>
          </group>
        );

      default:
        return null;
    }
  };

  return (
    <group position={position} onClick={onClick}>
      {/* Base circular colorida */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[0.6, 0.8, 32]} />
        <meshStandardMaterial color={config.baseColor} />
      </mesh>
      
      {/* Halo flutuante animado */}
      <mesh position={[0, 3.0, 0]}>
        <torusGeometry args={[0.3, 0.03, 8, 16]} />
        <meshStandardMaterial 
          color={config.haloColor} 
          emissive={config.haloColor} 
          emissiveIntensity={0.5} 
        />
      </mesh>

      {/* Corpo do personagem */}
      <group ref={groupRef}>
        {/* Pernas */}
        <mesh position={[-0.15, 0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.6]} />
          <meshStandardMaterial color={config.pantsColor} />
        </mesh>
        <mesh position={[0.15, 0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.6]} />
          <meshStandardMaterial color={config.pantsColor} />
        </mesh>
        
        {/* Sapatos */}
        <mesh position={[-0.15, 0.05, 0.1]}>
          <boxGeometry args={[0.15, 0.1, 0.2]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0.15, 0.05, 0.1]}>
          <boxGeometry args={[0.15, 0.1, 0.2]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Torso */}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[0.6, 1.2, 0.3]} />
          <meshStandardMaterial color={config.shirtColor} />
        </mesh>
        
        {/* Braços */}
        <mesh position={[-0.4, 1.2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.8]} />
          <meshStandardMaterial color={config.shirtColor} />
        </mesh>
        <mesh position={[0.4, 1.2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.8]} />
          <meshStandardMaterial color={config.shirtColor} />
        </mesh>
        
        {/* Cabeça */}
        <mesh position={[0, 2.2, 0]}>
          <sphereGeometry args={[0.25]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
        
        {/* Cabelo */}
        <mesh position={[0, 2.4, -0.1]}>
          <boxGeometry args={[0.5, 0.2, 0.3]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </group>

      {/* Acessórios específicos da profissão */}
      {renderAccessories()}

      {/* Label com nome da profissão */}
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[1.5, 0.3, 0.05]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.7} />
      </mesh>
    </group>
  );
};