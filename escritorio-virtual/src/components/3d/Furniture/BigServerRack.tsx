// src/components/3d/Furniture/BigServerRack.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial } from 'three';

interface Props {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export const BigServerRack: React.FC<Props> = ({ position, rotation = [0, 0, 0] }) => {
  const serverRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (serverRef.current) {
      const material = serverRef.current.material as MeshStandardMaterial;
      if (material && material.opacity !== undefined) {
        material.opacity = 0.9 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Rack principal */}
      <mesh castShadow>
        <boxGeometry args={[1, 3, 1]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Servidores individuais */}
      {Array.from({length: 8}, (_, i) => (
        <mesh 
          key={i} 
          ref={i === 0 ? serverRef : undefined}
          position={[0, -1.2 + i * 0.3, 0.4]}
        >
          <boxGeometry args={[0.9, 0.2, 0.3]} />
          <meshStandardMaterial 
            color="#1A1A1A" 
            emissive="#00FF00" 
            emissiveIntensity={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
      
      {/* LEDs indicadores */}
      {Array.from({length: 8}, (_, i) => (
        <mesh key={i} position={[0.4, -1.2 + i * 0.3, 0.6]}>
          <sphereGeometry args={[0.02]} />
          <meshStandardMaterial 
            color="#00FF00" 
            emissive="#00FF00" 
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};