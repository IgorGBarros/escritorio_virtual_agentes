import React from 'react';

export const LargeConferenceTable: React.FC<{ position: [number, number, number]; rotation?: [number, number, number] }> = ({ position, rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Tampo Grande (Madeira Escura) */}
      <mesh position={[0, 0.76, 0]} castShadow>
        <boxGeometry args={[5, 0.15, 2.2]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      {/* Pés Robustos nas pontas */}
      {[[-2.2, 0.38, -0.8], [-2.2, 0.38, 0.8], [2.2, 0.38, -0.8], [2.2, 0.38, 0.8]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.3, 0.76, 0.3]} />
          <meshStandardMaterial color="#3E2723" />
        </mesh>
      ))}
      
      {/* Reforço Central (Viga embaixo da mesa) */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[4, 0.15, 0.2]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>
    </group>
  );
};