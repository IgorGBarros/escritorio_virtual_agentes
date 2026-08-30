import React from 'react';

export const ErgonomicChair: React.FC<{ position: [number, number, number]; rotation?: [number, number, number] }> = ({ position, rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Material base escuro */}
      <meshStandardMaterial color="#2d3748" roughness={0.5} />

      {/* Base (5 pernas) */}
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <mesh key={i} position={[0, 0.1, 0]} rotation={[0, (deg * Math.PI) / 180, Math.PI / 6]}>
          <capsuleGeometry args={[0.03, 0.5, 4, 8]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
      ))}
      
      {/* Rodinhas */}
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <mesh key={`w-${i}`} position={[Math.sin((deg * Math.PI) / 180) * 0.4, 0.05, Math.cos((deg * Math.PI) / 180) * 0.4]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color="#1a202c" />
        </mesh>
      ))}

      {/* Eixo Central */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Assento */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.6, 0.1, 0.6]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Encosto */}
      <mesh position={[0, 1.1, -0.25]} castShadow>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>

      {/* Braços (Inverted U shape) */}
      <group position={[0, 0.8, 0]}>
        <mesh position={[-0.35, 0, 0]}><boxGeometry args={[0.05, 0.4, 0.05]} /><meshStandardMaterial color="#4a5568" /></mesh>
        <mesh position={[0.35, 0, 0]}><boxGeometry args={[0.05, 0.4, 0.05]} /><meshStandardMaterial color="#4a5568" /></mesh>
        <mesh position={[0, 0.2, 0]}><boxGeometry args={[0.75, 0.05, 0.05]} /><meshStandardMaterial color="#4a5568" /></mesh>
      </group>
    </group>
  );
};