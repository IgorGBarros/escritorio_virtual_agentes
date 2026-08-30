// src/components/3d/Lighting/OfficeLighting.tsx
import React, { useRef } from 'react';
import { DirectionalLight, SpotLight } from 'three';

export const OfficeLighting: React.FC = () => {
  const dirLightRef = useRef<DirectionalLight>(null);
  const spotLightRef = useRef<SpotLight>(null);

  return (
    <>
      {/* Luz ambiente suave */}
      <ambientLight intensity={0.4} color="#F5F5DC" />
      
      {/* Luz direcional principal (sol/janela) */}
      <directionalLight
        ref={dirLightRef}
        position={[20, 20, 10]}
        intensity={1.2}
        color="#FFFACD"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />
      
      {/* Luzes pontuais nas estações */}
      {[
        [-10, 5, -10] as [number, number, number], // CEO
        [-6, 4, 0] as [number, number, number],    // Backend
        [0, 4, 0] as [number, number, number],     // Frontend
        [10, 4, 0] as [number, number, number],    // DevOps
      ].map((pos, i) => (
        <pointLight
          key={i}
          position={pos}
          intensity={0.8}
          color="#FFFFFF"
          distance={15}
          decay={2}
          castShadow
        />
      ))}
      
      {/* Spot light para área específica */}
      <spotLight
        ref={spotLightRef}
        position={[0, 8, -10]}
        angle={Math.PI / 4}
        penumbra={0.5}
        intensity={1.5}
        color="#FFFFE0"
        castShadow
      />
      
      {/* Luzes de teto (fluorescentes simuladas) */}
      {[
        [-10, 6, -5] as [number, number, number],
        [0, 6, -5] as [number, number, number],
        [10, 6, -5] as [number, number, number],
        [-10, 6, 5] as [number, number, number],
        [0, 6, 5] as [number, number, number],
        [10, 6, 5] as [number, number, number],
      ].map((pos, i) => (
        <pointLight
          key={i}
          position={pos}
          intensity={0.6}
          color="#F0F8FF"
          distance={8}
          decay={1}
        />
      ))}
    </>
  );
};