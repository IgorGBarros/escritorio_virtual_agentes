import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface Props {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export const AnimatedServerRack: React.FC<Props> = ({ position, rotation = [0, 0, 0] }) => {
  // ✅ CORREÇÃO: Tipar corretamente o array de refs
  const lightsRef = useRef<(Mesh | null)[]>([]);
  const fanRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    // Animação das luzes LED
    lightsRef.current.forEach((light, i) => {
      if (light) {
        const time = state.clock.elapsedTime;
        const intensity = (Math.sin(time * 3 + i * 0.5) + 1) / 2;
        (light.material as any).emissiveIntensity = 0.3 + intensity * 0.7;
      }
    });
    
    // Rotação do ventilador
    if (fanRef.current) {
      fanRef.current.rotation.z += 0.3;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Estrutura principal */}
      <mesh castShadow>
        <boxGeometry args={[1.5, 3, 1]} />
        <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Moldura frontal */}
      <mesh position={[0, 0, 0.51]}>
        <boxGeometry args={[1.48, 2.98, 0.02]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Porta de vidro */}
      <mesh position={[0, 0, 0.52]}>
        <boxGeometry args={[1.3, 2.7, 0.01]} />
        <meshStandardMaterial 
          color="#87CEEB" 
          transparent 
          opacity={0.3} 
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>
      
      {/* Servidores individuais */}
      {Array.from({length: 8}, (_, i) => (
        <group key={i} position={[0, -1.2 + (i * 0.35), 0]}>
          {/* Unidade do servidor */}
          <mesh position={[0, 0, 0.2]} castShadow>
            <boxGeometry args={[1.3, 0.25, 0.8]} />
            <meshStandardMaterial color="#2F4F4F" />
          </mesh>
          
          {/* Painel frontal */}
          <mesh position={[0, 0, 0.61]}>
            <boxGeometry args={[1.28, 0.23, 0.01]} />
            <meshStandardMaterial color="#4A4A4A" />
          </mesh>
          
          {/* LEDs indicadores - ✅ CORREÇÃO: Tipagem correta */}
          <mesh 
            ref={(el: Mesh | null) => {
              if (lightsRef.current) {
                lightsRef.current[i * 3] = el;
              }
            }} 
            position={[-0.5, 0, 0.62]}
          >
            <sphereGeometry args={[0.02]} />
            <meshStandardMaterial 
              color="#00FF00" 
              emissive="#00FF00" 
              emissiveIntensity={0.5}
            />
          </mesh>
          
          <mesh 
            ref={(el: Mesh | null) => {
              if (lightsRef.current) {
                lightsRef.current[i * 3 + 1] = el;
              }
            }} 
            position={[-0.4, 0, 0.62]}
          >
            <sphereGeometry args={[0.02]} />
            <meshStandardMaterial 
              color="#FF0000" 
              emissive="#FF0000" 
              emissiveIntensity={0.5}
            />
          </mesh>
          
          <mesh 
            ref={(el: Mesh | null) => {
              if (lightsRef.current) {
                lightsRef.current[i * 3 + 2] = el;
              }
            }} 
            position={[-0.3, 0, 0.62]}
          >
            <sphereGeometry args={[0.02]} />
            <meshStandardMaterial 
              color="#0000FF" 
              emissive="#0000FF" 
              emissiveIntensity={0.5}
            />
          </mesh>
          
          {/* Slots de ventilação */}
          {Array.from({length: 8}, (_, j) => (
            <mesh key={j} position={[0.3 + j * 0.08, 0, 0.62]}>
              <boxGeometry args={[0.02, 0.15, 0.005]} />
              <meshStandardMaterial color="#666" />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* Ventilador superior */}
      <group position={[0, 1.4, 0.4]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.05]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh ref={fanRef}>
          {[0, 120, 240].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <mesh 
                key={i} 
                position={[Math.cos(rad) * 0.08, 0, Math.sin(rad) * 0.08]}
                rotation={[0, rad, 0]}
              >
                <boxGeometry args={[0.02, 0.03, 0.12]} />
                <meshStandardMaterial color="#666" />
              </mesh>
            );
          })}
        </mesh>
      </group>
      
      {/* Etiquetas */}
      <mesh position={[0, 1.3, 0.52]}>
        <boxGeometry args={[0.8, 0.15, 0.005]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
};