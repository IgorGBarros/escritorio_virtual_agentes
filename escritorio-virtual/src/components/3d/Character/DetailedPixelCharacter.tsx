// src/components/3d/Character/DetailedPixelCharacter.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface Props {
  type: 'ceo' | 'backend' | 'frontend' | 'devops' | 'qa' | 'designer' | 'pm' | 'tech-lead' | 'mobile';
  position: [number, number, number];
  onInteract: () => void;
}

export const DetailedPixelCharacter: React.FC<Props> = ({ type, position, onInteract }) => {
  const groupRef = useRef<any>(null);
  const haloRef = useRef<Mesh>(null);

  // Configurações por tipo
  const configs = {
    ceo: {
      bodyColor: '#FFD700',
      haloColor: '#FFD700',
      accessories: ['suit', 'briefcase', 'crown'],
      name: 'CEO'
    },
    backend: {
      bodyColor: '#4CAF50',
      haloColor: '#4CAF50',
      accessories: ['laptop', 'coffee', 'hoodie'],
      name: 'Backend Dev'
    },
    frontend: {
      bodyColor: '#FF6B35',
      haloColor: '#FF6B35',
      accessories: ['stylus', 'color-palette', 'glasses'],
      name: 'Frontend Dev'
    },
    devops: {
      bodyColor: '#87CEEB',
      haloColor: '#87CEEB',
      accessories: ['server', 'cloud', 'terminal'],
      name: 'DevOps'
    },
    qa: {
      bodyColor: '#FFFF00',
      haloColor: '#FFFF00',
      accessories: ['magnifier', 'bug', 'checklist'],
      name: 'QA Tester'
    },
    designer: {
      bodyColor: '#FF69B4',
      haloColor: '#FF69B4',
      accessories: ['paintbrush', 'tablet', 'beret'],
      name: 'Designer'
    },
    pm: {
      bodyColor: '#9370DB',
      haloColor: '#9370DB',
      accessories: ['clipboard', 'calendar', 'tie'],
      name: 'Project Manager'
    },
    'tech-lead': {
      bodyColor: '#FF4500',
      haloColor: '#FF4500',
      accessories: ['badge', 'blueprint', 'glasses'],
      name: 'Tech Lead'
    },
    mobile: {
      bodyColor: '#00FFFF',
      haloColor: '#00FFFF',
      accessories: ['smartphone', 'tablet', 'headphones'],
      name: 'Mobile Dev'
    }
  };

  const config = configs[type];

  // Animação do halo
  useFrame((state) => {
    if (haloRef.current) {
      haloRef.current.rotation.y += 0.02;
      haloRef.current.position.y = 3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onInteract}>
      {/* === CORPO PRINCIPAL === */}
      {/* Torso */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[0.8, 1.6, 0.4]} />
        <meshStandardMaterial color={config.bodyColor} />
      </mesh>
      
      {/* Cabeça */}
      <mesh position={[0, 2.7, 0]} castShadow>
        <sphereGeometry args={[0.35]} />
        <meshStandardMaterial color="#FFDBAC" />
      </mesh>

      {/* === BRAÇOS === */}
      {/* Braço esquerdo */}
      <mesh position={[-0.6, 1.8, 0]} castShadow>
        <boxGeometry args={[0.25, 1, 0.25]} />
        <meshStandardMaterial color={config.bodyColor} />
      </mesh>
      
      {/* Braço direito */}
      <mesh position={[0.6, 1.8, 0]} castShadow>
        <boxGeometry args={[0.25, 1, 0.25]} />
        <meshStandardMaterial color={config.bodyColor} />
      </mesh>

      {/* === MÃOS === */}
      <mesh position={[-0.6, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#FFDBAC" />
      </mesh>
      
      <mesh position={[0.6, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#FFDBAC" />
      </mesh>

      {/* === PERNAS === */}
      {/* Perna esquerda */}
      <mesh position={[-0.25, 0.6, 0]} castShadow>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#000080" />
      </mesh>
      
      {/* Perna direita */}
      <mesh position={[0.25, 0.6, 0]} castShadow>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#000080" />
      </mesh>

      {/* === PÉS === */}
      <mesh position={[-0.25, 0.05, 0.1]} castShadow>
        <boxGeometry args={[0.35, 0.1, 0.5]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      <mesh position={[0.25, 0.05, 0.1]} castShadow>
        <boxGeometry args={[0.35, 0.1, 0.5]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* === HALO IDENTIFICADOR === */}
      <mesh ref={haloRef} position={[0, 3.2, 0]}>
        <torusGeometry args={[0.4, 0.06, 8, 16]} />
        <meshStandardMaterial 
          color={config.haloColor} 
          emissive={config.haloColor} 
          emissiveIntensity={0.6} 
        />
      </mesh>

      {/* === ACESSÓRIOS ESPECÍFICOS POR TIPO === */}
      {/* CEO - Coroa */}
      {type === 'ceo' && (
        <group position={[0, 3.1, 0]}>
          <mesh>
            <cylinderGeometry args={[0.4, 0.35, 0.2]} />
            <meshStandardMaterial 
              color="#FFD700" 
              metalness={0.9} 
              roughness={0.1}
            />
          </mesh>
          {/* Pontas da coroa */}
          {[0, 72, 144, 216, 288].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <mesh 
                key={i} 
                position={[Math.cos(rad) * 0.35, 0.15, Math.sin(rad) * 0.35]}
              >
                <boxGeometry args={[0.05, 0.3, 0.05]} />
                <meshStandardMaterial color="#FFD700" metalness={0.9} />
              </mesh>
            );
          })}
        </group>
      )}

      {/* Backend - Laptop na mão */}
      {type === 'backend' && (
        <group position={[-0.6, 1.4, 0]} rotation={[0, 0, Math.PI/4]}>
          <mesh>
            <boxGeometry args={[0.4, 0.02, 0.3]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.15, -0.1]} rotation={[-0.3, 0, 0]}>
            <boxGeometry args={[0.38, 0.02, 0.25]} />
            <meshStandardMaterial 
              color="#000080" 
              emissive="#00FF00" 
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      )}

      {/* Frontend - Stylus e Tablet */}
      {type === 'frontend' && (
        <group>
          {/* Tablet na mão esquerda */}
          <mesh position={[-0.6, 1.4, 0]} rotation={[0, 0, Math.PI/6]}>
            <boxGeometry args={[0.3, 0.02, 0.4]} />
            <meshStandardMaterial 
              color="#1A1A1A"
              emissive="#FF6B35"
              emissiveIntensity={0.2}
            />
          </mesh>
          {/* Stylus na mão direita */}
          <mesh position={[0.6, 1.4, 0]} rotation={[0, 0, -Math.PI/4]}>
            <cylinderGeometry args={[0.01, 0.01, 0.25]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.8} />
          </mesh>
        </group>
      )}

      {/* DevOps - Mini servidor */}
      {type === 'devops' && (
        <group position={[0.6, 1.4, 0]}>
          <mesh>
            <boxGeometry args={[0.2, 0.3, 0.15]} />
            <meshStandardMaterial color="#1A1A1A" />
          </mesh>
          {/* LEDs do servidor */}
          {[0.05, 0, -0.05].map((y, i) => (
            <mesh key={i} position={[0.11, y, 0]}>
              <sphereGeometry args={[0.01]} />
              <meshStandardMaterial 
                color="#00FF00" 
                emissive="#00FF00" 
                emissiveIntensity={0.8}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* QA - Lupa */}
      {type === 'qa' && (
        <group position={[0.6, 1.6, 0]} rotation={[0, 0, -Math.PI/6]}>
          {/* Cabo da lupa */}
          <mesh>
            <cylinderGeometry args={[0.02, 0.02, 0.3]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          {/* Lente */}
          <mesh position={[0, 0.2, 0]}>
            <torusGeometry args={[0.08, 0.02, 8, 16]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.01]} />
            <meshStandardMaterial 
              color="#87CEEB" 
              transparent 
              opacity={0.7}
            />
          </mesh>
        </group>
      )}

      {/* Designer - Pincel */}
      {type === 'designer' && (
        <group position={[0.6, 1.5, 0]} rotation={[0, 0, -Math.PI/4]}>
          {/* Cabo do pincel */}
          <mesh>
            <cylinderGeometry args={[0.015, 0.015, 0.25]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          {/* Cerdas */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.02, 0.01, 0.08]} />
            <meshStandardMaterial color="#4A4A4A" />
          </mesh>
          {/* Tinta na ponta */}
          <mesh position={[0, 0.19, 0]}>
            <sphereGeometry args={[0.015]} />
            <meshStandardMaterial color="#FF69B4" />
          </mesh>
        </group>
      )}

      {/* PM - Prancheta */}
      {type === 'pm' && (
        <group position={[-0.6, 1.4, 0]} rotation={[0, 0, Math.PI/8]}>
          <mesh>
            <boxGeometry args={[0.3, 0.02, 0.4]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.28, 0.01, 0.38]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          {/* Linhas do papel */}
          {[-0.1, -0.05, 0, 0.05, 0.1].map((y, i) => (
            <mesh key={i} position={[0, 0.025, y]}>
              <boxGeometry args={[0.25, 0.005, 0.01]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          ))}
        </group>
      )}

      {/* Tech Lead - Óculos */}
      {type === 'tech-lead' && (
        <group position={[0, 2.7, 0.3]}>
          {/* Armação */}
          <mesh>
            <torusGeometry args={[0.12, 0.02, 8, 16]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          <mesh position={[0.25, 0, 0]}>
            <torusGeometry args={[0.12, 0.02, 8, 16]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          {/* Ponte */}
          <mesh position={[0.125, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.05]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          {/* Lentes */}
          <mesh>
            <cylinderGeometry args={[0.12, 0.12, 0.01]} />
            <meshStandardMaterial 
              color="#87CEEB" 
              transparent 
              opacity={0.3}
            />
          </mesh>
          <mesh position={[0.25, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.01]} />
            <meshStandardMaterial 
              color="#87CEEB" 
              transparent 
              opacity={0.3}
            />
          </mesh>
        </group>
      )}

      {/* Mobile - Smartphone */}
      {type === 'mobile' && (
        <group position={[0.6, 1.5, 0]} rotation={[0, 0, -Math.PI/8]}>
          <mesh>
            <boxGeometry args={[0.15, 0.02, 0.25]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          <mesh position={[0, 0.015, 0]}>
            <boxGeometry args={[0.14, 0.005, 0.24]} />
            <meshStandardMaterial 
              color="#00FFFF" 
              emissive="#00FFFF" 
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      )}

      {/* === ROSTO DETALHADO === */}
      {/* Olhos */}
      <mesh position={[-0.12, 2.75, 0.3]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.12, 2.75, 0.3]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Nariz */}
      <mesh position={[0, 2.65, 0.32]}>
        <boxGeometry args={[0.04, 0.08, 0.04]} />
        <meshStandardMaterial color="#FFDBAC" />
      </mesh>

      {/* Boca */}
      <mesh position={[0, 2.55, 0.32]}>
        <boxGeometry args={[0.12, 0.03, 0.02]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>

      {/* === ETIQUETA DE NOME === */}
      <group position={[0, 3.8, 0]}>
        <mesh>
          <boxGeometry args={[1, 0.3, 0.02]} />
          <meshStandardMaterial 
            color="#FFFFFF" 
            transparent 
            opacity={0.9}
          />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.95, 0.25, 0.01]} />
          <meshStandardMaterial color={config.bodyColor} />
        </mesh>
      </group>
    </group>
  );
};