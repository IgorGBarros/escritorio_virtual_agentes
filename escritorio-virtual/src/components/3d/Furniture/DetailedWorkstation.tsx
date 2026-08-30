// src/components/3d/Furniture/DetailedWorkstation.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

interface Props {
  position: [number, number, number];
}

export const DetailedWorkstation: React.FC<Props> = ({ position }) => {
  const screenRef = useRef<any>(null);

  // Animação da tela (simulando código)
  useFrame((state) => {
    if (screenRef.current) {
      const intensity = 0.1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      screenRef.current.material.emissiveIntensity = intensity;
    }
  });

  return (
    <group position={position}>
      {/* Mesa */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[1.8, 0.05, 0.9]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Pernas da mesa */}
      {[[-0.8, 0.375, -0.4], [0.8, 0.375, -0.4], [-0.8, 0.375, 0.4], [0.8, 0.375, 0.4]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.08, 0.75, 0.08]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      ))}

      {/* Monitor */}
      <mesh position={[0, 1.2, -0.3]} castShadow>
        <boxGeometry args={[0.6, 0.4, 0.05]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>

      {/* Tela do monitor */}
      <mesh ref={screenRef} position={[0, 1.2, -0.27]}>
        <boxGeometry args={[0.55, 0.35, 0.01]} />
        <meshStandardMaterial 
          color="#000080" 
          emissive="#00FF00" 
          emissiveIntensity={0.1} 
        />
      </mesh>

      {/* Base do monitor */}
      <mesh position={[0, 0.82, -0.25]}>
        <cylinderGeometry args={[0.08, 0.12, 0.15]} />
        <meshStandardMaterial color="#2C2C2C" metalness={0.8} />
      </mesh>

      {/* Teclado */}
      <mesh position={[0, 0.78, 0.1]} castShadow>
        <boxGeometry args={[0.45, 0.02, 0.15]} />
        <meshStandardMaterial color="#E5E5E5" />
      </mesh>

      {/* Teclas individuais (amostra) */}
      {Array.from({length: 15}, (_, i) => (
        <mesh 
          key={i} 
          position={[-0.18 + (i % 5) * 0.09, 0.79, 0.05 + Math.floor(i / 5) * 0.03]}
        >
          <boxGeometry args={[0.08, 0.005, 0.025]} />
          <meshStandardMaterial color="#F8F8F8" />
        </mesh>
      ))}

      {/* Mouse */}
      <mesh position={[0.3, 0.78, 0.15]}>
        <boxGeometry args={[0.06, 0.015, 0.1]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>

      {/* Mousepad */}
      <mesh position={[0.3, 0.775, 0.15]}>
        <boxGeometry args={[0.2, 0.002, 0.25]} />
        <meshStandardMaterial color="#1E40AF" />
      </mesh>

      {/* Cabos */}
      <mesh position={[0.1, 0.77, -0.4]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.008, 0.008, 0.3]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Xícara de café */}
      <mesh position={[-0.4, 0.8, 0.2]} castShadow>
        <cylinderGeometry args={[0.04, 0.035, 0.08]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Café dentro da xícara */}
      <mesh position={[-0.4, 0.82, 0.2]}>
        <cylinderGeometry args={[0.035, 0.035, 0.02]} />
        <meshStandardMaterial color="#4A2C2A" />
      </mesh>
    </group>
  );
};