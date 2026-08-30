import React from 'react';

export const MeetingTable: React.FC<{ position: [number, number, number]; rotation?: [number, number, number] }> = ({ position, rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Tampo Grande */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[4, 0.15, 2]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>

      {/* Pés Centrais Robustos */}
      <mesh position={[0, 0.375, 0]} castShadow>
        <boxGeometry args={[3, 0.75, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Base dos Pés */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[3.2, 0.1, 1.5]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
};