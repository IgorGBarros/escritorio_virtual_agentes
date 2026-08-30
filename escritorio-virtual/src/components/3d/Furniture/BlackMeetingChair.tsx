// src/components/3d/Furniture/BlackMeetingChair.tsx
import React from 'react';

interface Props {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export const BlackMeetingChair: React.FC<Props> = ({ position, rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Base com 4 pernas */}
      <group position={[0, 0.1, 0]}>
        {/* Pernas */}
        {[
          [-0.3, -0.3], [0.3, -0.3], 
          [-0.3, 0.3], [0.3, 0.3]
        ].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.2, z]}>
            <cylinderGeometry args={[0.02, 0.02, 0.4]} />
            <meshStandardMaterial color="#2C3E50" />
          </mesh>
        ))}
      </group>
      
      {/* Assento */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.8, 0.08, 0.8]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>
      
      {/* Encosto */}
      <mesh position={[0, 0.9, -0.35]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.08]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>
      
      {/* Braços */}
      {[-0.4, 0.4].map((x, i) => (
        <group key={i} position={[x, 0.7, 0]}>
          <mesh position={[0, 0, -0.2]}>
            <boxGeometry args={[0.06, 0.4, 0.06]} />
            <meshStandardMaterial color="#2C3E50" />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[0.08, 0.04, 0.4]} />
            <meshStandardMaterial color="#1A1A1A" />
          </mesh>
        </group>
      ))}
    </group>
  );
};