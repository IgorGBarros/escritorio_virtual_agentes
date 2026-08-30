import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface Props {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export const ServerRack: React.FC<Props> = ({ position, rotation = [0, 0, 0] }) => {
  // ✅ CORREÇÃO: Tipar corretamente o array de refs
  const ledRefs = useRef<(Mesh | null)[]>([]);

  useFrame((state) => {
    // Animação das luzes LED
    ledRefs.current.forEach((led, i) => {
      if (led) {
        const time = state.clock.elapsedTime;
        const phase = i * 0.5;
        const intensity = (Math.sin(time * 2 + phase) + 1) / 2;
        (led.material as any).emissiveIntensity = 0.2 + intensity * 0.6;
      }
    });
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Estrutura principal */}
      <mesh castShadow>
        <boxGeometry args={[1, 3, 1]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Servidores individuais */}
      {Array.from({length: 8}, (_, i) => (
        <mesh 
          key={i} 
          position={[0, -1.2 + i * 0.3, 0.4]}
          castShadow
        >
          <boxGeometry args={[0.9, 0.2, 0.3]} />
          <meshStandardMaterial 
            color="#1A1A1A" 
            emissive="#00FF00" 
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      
      {/* LEDs indicadores - ✅ CORREÇÃO: Tipagem correta */}
      {Array.from({length: 8}, (_, i) => (
        <mesh 
          key={i} 
          ref={(el: Mesh | null) => {
            if (ledRefs.current) {
              ledRefs.current[i] = el;
            }
          }}
          position={[0.4, -1.2 + i * 0.3, 0.6]}
        >
          <sphereGeometry args={[0.02]} />
          <meshStandardMaterial 
            color="#00FF00" 
            emissive="#00FF00" 
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
      
      {/* Ventilação */}
      <mesh position={[0, 1.3, 0.4]}>
        <cylinderGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#666" />
      </mesh>
    </group>
  );
};