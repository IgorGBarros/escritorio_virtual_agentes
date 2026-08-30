// src/components/3d/Decoration/DetailedPlant.tsx
import React from 'react';

interface Props {
  position: [number, number, number];
  scale?: number;
}

export const DetailedPlant: React.FC<Props> = ({ position, scale = 1 }) => {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Vaso */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 0.6, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      
      {/* Bordas do vaso */}
      <mesh position={[0, 0.58, 0]}>
        <torusGeometry args={[0.28, 0.02, 8, 16]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Terra */}
      <mesh position={[0, 0.58, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.02]} />
        <meshStandardMaterial color="#4A4A4A" roughness={1} />
      </mesh>
      
      {/* Caule principal */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.02, 0.03, 1.2, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      
      {/* Folhas em diferentes alturas */}
      {[0.8, 1.1, 1.4, 1.7].map((height, levelIndex) => (
        <group key={levelIndex} position={[0, height, 0]}>
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const leafSize = 0.4 - levelIndex * 0.05;
            return (
              <mesh 
                key={i}
                position={[
                  Math.cos(rad) * (0.2 + levelIndex * 0.05), 
                  Math.sin(levelIndex * 0.5) * 0.1, 
                  Math.sin(rad) * (0.2 + levelIndex * 0.05)
                ]}
                rotation={[
                  Math.PI/6 + Math.sin(i) * 0.2, 
                  rad, 
                  Math.PI/8
                ]}
              >
                <boxGeometry args={[0.05, leafSize, 0.02]} />
                <meshStandardMaterial 
                  color={levelIndex < 2 ? "#32CD32" : "#228B22"} 
                  roughness={0.8}
                />
              </mesh>
            );
          })}
        </group>
      ))}
      
      {/* Flores pequenas (opcional) */}
      {[1.5, 1.8].map((height, i) => (
        <mesh key={i} position={[
          Math.cos(i * Math.PI) * 0.15, 
          height, 
          Math.sin(i * Math.PI) * 0.15
        ]}>
          <sphereGeometry args={[0.03, 8, 6]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#FF69B4" : "#FFD700"} 
            emissive={i % 2 === 0 ? "#FF1493" : "#FFA500"}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};