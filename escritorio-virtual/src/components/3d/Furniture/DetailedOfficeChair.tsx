// src/components/3d/Furniture/DetailedOfficeChair.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface Props {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export const DetailedOfficeChair: React.FC<Props> = ({ 
  position, 
  rotation = [0, 0, 0] 
}) => {
  const chairRef = useRef<Mesh>(null);

  // Animação sutil de balanço
  useFrame((state) => {
    if (chairRef.current) {
      chairRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Base estrelada com 5 pontas */}
      <group position={[0, 0.1, 0]}>
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <mesh 
              key={i} 
              position={[Math.cos(rad) * 0.4, 0, Math.sin(rad) * 0.4]}
              rotation={[0, rad, 0]}
            >
              <boxGeometry args={[0.6, 0.05, 0.08]} />
              <meshStandardMaterial color="#2C2C2C" metalness={0.8} roughness={0.2} />
            </mesh>
          );
        })}
      </group>

      {/* Rodas nas pontas */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <mesh 
            key={`wheel-${i}`} 
            position={[Math.cos(rad) * 0.4, 0.05, Math.sin(rad) * 0.4]}
          >
            <cylinderGeometry args={[0.04, 0.04, 0.03]} />
            <meshStandardMaterial color="#1A1A1A" />
          </mesh>
        );
      })}

      {/* Pistão central */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 0.4]} />
        <meshStandardMaterial color="#333" metalness={0.9} />
      </mesh>

      {/* Assento com almofada */}
      <mesh ref={chairRef} position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.28, 0.08]} />
        <meshStandardMaterial color="#1E3A8A" roughness={0.8} />
      </mesh>

      {/* Costuras do assento */}
      <mesh position={[0, 0.59, 0]}>
        <torusGeometry args={[0.2, 0.005, 8, 32]} />
        <meshStandardMaterial color="#0F172A" />
      </mesh>

      {/* Encosto */}
      <mesh position={[0, 0.9, -0.15]} castShadow>
        <boxGeometry args={[0.4, 0.6, 0.08]} />
        <meshStandardMaterial color="#1E3A8A" roughness={0.8} />
      </mesh>

      {/* Apoio de braço esquerdo */}
      <mesh position={[-0.22, 0.75, -0.05]}>
        <boxGeometry args={[0.06, 0.3, 0.2]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>

      {/* Apoio de braço direito */}
      <mesh position={[0.22, 0.75, -0.05]}>
        <boxGeometry args={[0.06, 0.3, 0.2]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>
    </group>
  );
};