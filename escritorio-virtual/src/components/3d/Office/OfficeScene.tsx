// src/components/3d/Scene/OfficeScene.tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows,
  Stats,
  Loader
} from '@react-three/drei';
import { OfficeLighting } from '../Lighting/OfficeLighting';
import { OfficeMap } from '../Office/OfficeMap';

export const OfficeScene: React.FC = () => (
  <>
    <Canvas
      camera={{ 
        position: [15, 15, 15], 
        fov: 50,
        near: 0.1,
        far: 1000
      }}
      shadows
      gl={{ 
        antialias: true,
        alpha: false,
        powerPreference: "high-performance"
      }}
    >
      <Suspense fallback={null}>
        {/* Iluminação */}
        <OfficeLighting />
        
        {/* Ambiente HDR */}
        <Environment preset="city" />
        
        {/* Sombras de contato suaves */}
        <ContactShadows
          position={[0, -0.1, 0]}
          opacity={0.4}
          scale={50}
          blur={2.5}
          far={4}
        />
        
        {/* Controles */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2.2}
        />
        
        {/* Cena principal */}
        <OfficeMap />
        
        {/* Stats para debug */}
        <Stats />
      </Suspense>
    </Canvas>
    
    <Loader />
  </>
);