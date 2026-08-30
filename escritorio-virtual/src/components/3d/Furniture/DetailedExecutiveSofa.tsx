// src/components/3d/Furniture/DetailedExecutiveSofa.tsx
import React from 'react';
import { useTexture } from '@react-three/drei';

interface Props {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export const DetailedExecutiveSofa: React.FC<Props> = ({ 
  position, 
  rotation = [0, 0, 0] 
}) => {
  // Carrega texturas realistas
  const [
    leatherColorMap,
    leatherNormalMap,
    leatherRoughnessMap,
    fabricColorMap,
    woodColorMap
  ] = useTexture([
    '/textures/materials/leather-executive-color.jpg',
    '/textures/materials/leather-executive-normal.jpg', 
    '/textures/materials/leather-executive-roughness.jpg',
    '/textures/materials/fabric-luxury-color.jpg',
    '/textures/materials/wood-mahogany-color.jpg'
  ]);

  return (
    <group position={position} rotation={rotation}>
      {/* === ESTRUTURA PRINCIPAL === */}
      {/* Base do sofá */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[2.8, 0.6, 1.2]} />
        <meshStandardMaterial 
          map={leatherColorMap}
          normalMap={leatherNormalMap}
          roughnessMap={leatherRoughnessMap}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Encosto principal */}
      <mesh position={[0, 1, -0.5]} castShadow>
        <boxGeometry args={[2.8, 1.2, 0.2]} />
        <meshStandardMaterial 
          map={leatherColorMap}
          normalMap={leatherNormalMap}
          roughnessMap={leatherRoughnessMap}
          roughness={0.8}
        />
      </mesh>

      {/* === BRAÇOS DETALHADOS === */}
      {/* Braço esquerdo */}
      <group position={[-1.4, 0.7, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.3, 1, 1.2]} />
          <meshStandardMaterial 
            map={leatherColorMap}
            normalMap={leatherNormalMap}
            roughness={0.8}
          />
        </mesh>
        {/* Detalhe acolchoado do braço */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.25, 0.6, 1.1]} />
          <meshStandardMaterial color="#654321" roughness={0.9} />
        </mesh>
      </group>
      
      {/* Braço direito */}
      <group position={[1.4, 0.7, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.3, 1, 1.2]} />
          <meshStandardMaterial 
            map={leatherColorMap}
            normalMap={leatherNormalMap}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.25, 0.6, 1.1]} />
          <meshStandardMaterial color="#654321" roughness={0.9} />
        </mesh>
      </group>

      {/* === ALMOFADAS EXECUTIVAS === */}
      {/* Almofada principal */}
      <mesh position={[0, 0.7, 0.1]} castShadow>
        <boxGeometry args={[2.4, 0.2, 1]} />
        <meshStandardMaterial 
          map={fabricColorMap}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>
      
      {/* Almofadas decorativas */}
      {[-0.8, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0.85, 0]} castShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial 
            color="#D2B48C"
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* === DETALHES PREMIUM === */}
      {/* Costuras decorativas */}
      {[[-1.2, 0.6], [0, 0.6], [1.2, 0.6]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.61]}>
          <boxGeometry args={[0.05, 0.8, 0.01]} />
          <meshStandardMaterial color="#4A4A4A" />
        </mesh>
      ))}
      
      {/* Botões capitonê */}
      {[[-0.6, 0.6], [0.6, 0.6], [-0.6, 1.2], [0.6, 1.2]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, -0.49]}>
          <sphereGeometry args={[0.03]} />
          <meshStandardMaterial 
            color="#2F2F2F"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* === ESTRUTURA DE MADEIRA === */}
      {/* Base de madeira */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[3, 0.1, 1.4]} />
        <meshStandardMaterial 
          map={woodColorMap}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
      
      {/* Pés de madeira torneados */}
      {[[-1.3, -0.1, -0.5], [1.3, -0.1, -0.5], [-1.3, -0.1, 0.5], [1.3, -0.1, 0.5]].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.08, 0.2]} />
            <meshStandardMaterial 
              map={woodColorMap}
              roughness={0.4}
              metalness={0.2}
            />
          </mesh>
          {/* Detalhes torneados */}
          {[0.05, 0, -0.05].map((y, j) => (
            <mesh key={j} position={[0, y, 0]}>
              <torusGeometry args={[0.06, 0.01, 8, 16]} />
              <meshStandardMaterial 
                map={woodColorMap}
                roughness={0.3}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* === ELEMENTOS DECORATIVOS === */}
      {/* Tachas douradas */}
      {Array.from({length: 12}, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <mesh 
            key={i} 
            position={[
              Math.cos(angle) * 1.35, 
              0.6, 
              Math.sin(angle) * 0.55
            ]}
          >
            <cylinderGeometry args={[0.02, 0.02, 0.01]} />
            <meshStandardMaterial 
              color="#FFD700"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
};