// src/components/3d/Scene/VirtualOffice.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { OfficeMap } from '../Office/OfficeMap';
import { DynamicOfficeController } from '../Office/DynamicOfficeController'; // ✅ Novo controlador
import { CharacterShowcase } from './CharacterShowcase';

export const VirtualOffice: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a2e' }}>
      <Canvas
        camera={{ position: [15, 15, 15], fov: 50 }}
        shadows
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
      >
        <CharacterShowcase />
        {/* Iluminação */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1.5} 
          castShadow 
        />
        
        {/* Ambiente */}
        <Environment preset="city" />
        
        {/* Sombras */}
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
        
        {/* Escritório */}
        <OfficeMap />
        
        {/* Sistema dinâmico de agentes controlado por LLM */}
        <DynamicOfficeController />
      </Canvas>
      
      {/* Interface de informações */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '14px',
        maxWidth: '350px'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#FFD700' }}>🤖 Escritório Configurado por LLM</h3>
        <p style={{ margin: '5px 0' }}>🎛️ Clique nos botões 3D para mudar cenários</p>
        <p style={{ margin: '5px 0' }}>👥 Startup | Enterprise | Agency</p>
        <p style={{ margin: '5px 0' }}>🔄 Configuração dinâmica de agentes</p>
        <p style={{ margin: '5px 0' }}>📊 Clique nos personagens para ver detalhes</p>
      </div>
    </div>
  );
};