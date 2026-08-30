// src/components/3d/Materials/AdvancedMaterials.tsx
import React from 'react';
import { useTexture } from '@react-three/drei';
import { Vector2 } from 'three';

export const WoodMaterial = () => {
  // Usando cores sólidas em vez de texturas para simplicidade
  return (
    <meshStandardMaterial
      color="#8B4513"
      roughness={0.8}
      metalness={0.1}
    />
  );
};

export const MetalMaterial = () => (
  <meshStandardMaterial
    color="#C0C0C0"
    metalness={0.9}
    roughness={0.1}
  />
);

export const FabricMaterial = () => (
  <meshStandardMaterial
    color="#4A4A4A"
    roughness={0.9}
    metalness={0.0}
    normalScale={new Vector2(0.5, 0.5)}
  />
);