import React from 'react';

export const Workstation: React.FC<{ position: [number, number, number]; rotation?: [number, number, number] }> = ({ position, rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Tampo da Mesa (Madeira) */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color="#C4A484" />
      </mesh>

      {/* Pernas da Mesa */}
      {[[-0.9, 0.375, -0.4], [0.9, 0.375, -0.4], [-0.9, 0.375, 0.4], [0.9, 0.375, 0.4]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.08, 0.75, 0.08]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      ))}

      {/* Monitor */}
      <group position={[0, 1.3, -0.3]}>
        {/* Base do Monitor */}
        <mesh position={[0, -0.4, 0.2]}><boxGeometry args={[0.3, 0.05, 0.1]} /><meshStandardMaterial color="#2d3748" /></mesh>
        <mesh position={[0, -0.2, 0.2]}><boxGeometry args={[0.05, 0.4, 0.05]} /><meshStandardMaterial color="#2d3748" /></mesh>
        
        {/* Tela */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.2, 0.7, 0.05]} />
          <meshStandardMaterial color="#1a202c" />
        </mesh>
        {/* Brilho da Tela (Emissivo) */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.1, 0.6]} />
          <meshStandardMaterial color="#4299e1" emissive="#4299e1" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Teclado */}
      <mesh position={[0, 0.82, 0.1]} castShadow>
        <boxGeometry args={[0.6, 0.02, 0.2]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>

      {/* Mouse */}
      <mesh position={[0.5, 0.82, 0.2]} castShadow>
        <boxGeometry args={[0.08, 0.02, 0.12]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
    </group>
  );
};