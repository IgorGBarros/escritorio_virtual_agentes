import React from 'react';

export const PixelOfficeChair: React.FC<{ position: [number, number, number]; rotation?: [number, number, number] }> = ({ position, rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* === CORES DA REFERÊNCIA === */}
      {/* Azul Principal: #4A90E2 */}
      {/* Azul Escuro (Sombra): #2980B9 */}
      {/* Cinza Escuro (Estrutura): #2C3E50 */}
      {/* Cinza Claro (Detalhe): #95A5A6 */}

      {/* --- BASE (5 Estrelas + Rodas) --- */}
      <group position={[0, 0.1, 0]}>
        {/* Centro da Base */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.1]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>

        {/* Pés e Rodas */}
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <group key={i} rotation={[0, rad, 0]} position={[0, 0, 0]}>
              {/* Braço da Estrela */}
              <mesh position={[0, 0, 0.3]}>
                <boxGeometry args={[0.1, 0.08, 0.6]} />
                <meshStandardMaterial color="#2C3E50" />
              </mesh>
              {/* Roda */}
              <mesh position={[0, -0.05, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.05, 8]} />
                <meshStandardMaterial color="#111" />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* --- COLUNA CENTRAL --- */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.4]} />
        <meshStandardMaterial color="#95A5A6" />
      </mesh>

      {/* --- ASSENTO (Azul Chunky) --- */}
      <group position={[0, 0.6, 0]}>
        {/* Almofada do Assento (Azul Principal) */}
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.15, 0.7]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
        {/* Borda/Frente do Assento (Azul Escuro) */}
        <mesh position={[0, -0.05, 0.32]}>
          <boxGeometry args={[0.72, 0.1, 0.05]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
      </group>

      {/* --- ENCOSTO (Tall Blue Backrest) --- */}
      <group position={[0, 1.3, -0.3]}>
        {/* Estrutura Traseira (Cinza Escuro - "Pixel Art Outline") */}
        <mesh castShadow>
          <boxGeometry args={[0.75, 0.9, 0.15]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
        {/* Almofada Frontal (Azul Principal) */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.65, 0.8, 0.1]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
      </group>

      {/* --- BRAÇOS (Armrests) --- */}
      {/* Braço Esquerdo */}
      <group position={[-0.45, 0.7, 0]}>
        {/* Apoio Azul */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[0.12, 0.08, 0.6]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
        {/* Barra Cinza */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.08, 0.4, 0.08]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
      </group>

      {/* Braço Direito */}
      <group position={[0.45, 0.7, 0]}>
        {/* Apoio Azul */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[0.12, 0.08, 0.6]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
        {/* Barra Cinza */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.08, 0.4, 0.08]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
      </group>
    </group>
  );
};