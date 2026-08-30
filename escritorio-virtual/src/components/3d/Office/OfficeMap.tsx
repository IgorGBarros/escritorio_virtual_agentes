// src/components/3d/Office/OfficeMap.tsx
import React from 'react';
import { Workstation } from '../Furniture/Workstation';
import { PixelOfficeChair } from '../Furniture/PixelOfficeChair';
import { ServerRack } from '../Furniture/ServerRack';
import { LargeConferenceTable } from '../Furniture/LargeConferenceTable';
import { BlackMeetingChair } from '../Furniture/BlackMeetingChair';

export const OfficeMap: React.FC = () => {
  return (

    <group>
      {/* === PISO BASE GERAL COM TEXTURA PREMIUM === */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[40, 35]} />
        <meshStandardMaterial 
          color="#f5f5f5" 
          roughness={0.9} 
          metalness={0.1} 
        />
      </mesh>

      {/* === SISTEMA DE GRID MODERNO === */}
      {/* Linhas principais horizontais */}
      {[-15, -10, -5, 0, 5, 10, 15].map((z, i) => (
        <mesh key={`h-main-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, z]}>
          <planeGeometry args={[40, 0.15]} />
          <meshStandardMaterial color="#e0e0e0" />
        </mesh>
      ))}
      
      {/* Linhas principais verticais */}
      {[-18, -12, -6, 0, 6, 12, 18].map((x, i) => (
        <mesh key={`v-main-${i}`} rotation={[-Math.PI / 2, 0, Math.PI/2]} position={[x, -0.04, 0]}>
          <planeGeometry args={[35, 0.15]} />
          <meshStandardMaterial color="#e0e0e0" />
        </mesh>
      ))}

      {/* Linhas secundárias mais finas */}
      {Array.from({length: 15}, (_, i) => i * 2.5 - 17.5).map((z, i) => (
        <mesh key={`h-sec-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.035, z]}>
          <planeGeometry args={[40, 0.05]} />
          <meshStandardMaterial color="#eeeeee" />
        </mesh>
      ))}

      {/* === ILUMINAÇÃO AMBIENTE MELHORADA === */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[20, 20, 10]} 
        intensity={0.8} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-15, 15, -10]} intensity={0.3} />
      
      {/* Luzes pontuais para áreas específicas */}
      <pointLight position={[-12, 8, -10]} intensity={0.5} color="#FFD700" />
      <pointLight position={[6, 6, 0]} intensity={0.3} color="#87CEEB" />

      {/* ==================== SALA CEO PREMIUM (Topo Esquerda - Verde Executivo) ==================== */}
      <group position={[-12, 0, -10]}>
        {/* Piso executivo com padrão de mármore */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <planeGeometry args={[12, 10]} />
          <meshStandardMaterial 
            color="#98FB98" 
            roughness={0.3} 
            metalness={0.2} 
          />
        </mesh>
        
        {/* Bordas decorativas em ouro */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[5.8, 6, 64]} />
          <meshStandardMaterial 
            color="#FFD700" 
            emissive="#FFD700" 
            emissiveIntensity={0.2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* === PAREDES EXECUTIVAS COM DETALHES === */}
        {/* Parede traseira principal */}
        <mesh position={[0, 3, -5]}>
          <boxGeometry args={[12, 6, 0.3]} />
          <meshStandardMaterial color="#2F4F2F" roughness={0.6} />
        </mesh>
        
        {/* Painéis decorativos na parede */}
        {[-4, -2, 0, 2, 4].map((x, i) => (
          <mesh key={i} position={[x, 2.5, -4.85]}>
            <boxGeometry args={[1.5, 4, 0.1]} />
            <meshStandardMaterial color="#3A5F3A" />
          </mesh>
        ))}

        {/* Parede lateral esquerda com janela panorâmica */}
        <mesh position={[-6, 2.5, 0]}>
          <boxGeometry args={[0.3, 5, 8]} />
          <meshStandardMaterial color="#2F4F2F" />
        </mesh>
        
        {/* Janela panorâmica */}
        <mesh position={[-5.85, 3, 0]}>
          <boxGeometry args={[0.1, 3, 6]} />
          <meshStandardMaterial 
            color="#87CEEB" 
            transparent 
            opacity={0.6} 
            metalness={0.1}
            roughness={0.1}
          />
        </mesh>
        
        {/* Molduras da janela */}
        {[-2.8, -1.4, 0, 1.4, 2.8].map((z, i) => (
          <mesh key={i} position={[-5.8, 3, z]}>
            <boxGeometry args={[0.05, 3.2, 0.1]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        ))}

        {/* === LETREIRO CEO LUXUOSO === */}
        <group position={[0, 4.5, -4.8]}>
          {/* Base do letreiro */}
          <mesh>
            <boxGeometry args={[4, 1.5, 0.2]} />
            <meshStandardMaterial 
              color="#8B4513" 
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>
          
          {/* Placa dourada */}
          <mesh position={[0, 0, 0.15]}>
            <boxGeometry args={[3.6, 1.1, 0.05]} />
            <meshStandardMaterial 
              color="#FFD700" 
              emissive="#FFD700" 
              emissiveIntensity={0.4}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          
          {/* Iluminação LED superior */}
          {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
            <group key={i} position={[x, 0.9, 0.3]}>
              <mesh>
                <sphereGeometry args={[0.08]} />
                <meshStandardMaterial 
                  color="#FFFFFF" 
                  emissive="#FFFFFF" 
                  emissiveIntensity={1.2}
                />
              </mesh>
              <pointLight position={[0, 0, 0]} intensity={0.3} />
            </group>
          ))}
        </group>

        {/* === MESA EXECUTIVA ULTRA DETALHADA === */}
        <group position={[-2, 0, -2]}>
          {/* Tampo principal em madeira nobre */}
          <mesh position={[0, 0.85, 0]} castShadow>
            <boxGeometry args={[4, 0.12, 2.5]} />
            <meshStandardMaterial 
              color="#8B4513" 
              roughness={0.2} 
              metalness={0.1} 
            />
          </mesh>
          
          {/* Incrustações decorativas */}
          <mesh position={[0, 0.86, 0]}>
            <boxGeometry args={[3.8, 0.02, 2.3]} />
            <meshStandardMaterial color="#A0522D" />
          </mesh>
          
          {/* Bordas em ouro */}
          {[[-1.9, 0], [1.9, 0], [0, -1.15], [0, 1.15]].map(([x, z], i) => (
            <mesh 
              key={i} 
              position={[x, 0.87, z]} 
              rotation={i < 2 ? [0, 0, 0] : [0, Math.PI/2, 0]}
            >
              <boxGeometry args={[i < 2 ? 0.1 : 0.1, 0.03, i < 2 ? 2.5 : 4]} />
              <meshStandardMaterial 
                color="#FFD700" 
                metalness={0.9} 
                roughness={0.1}
              />
            </mesh>
          ))}

          {/* === GAVETAS EXECUTIVAS === */}
          {/* Gaveta esquerda */}
          <mesh position={[-1.8, 0.4, 0]} castShadow>
            <boxGeometry args={[0.8, 0.8, 2.3]} />
            <meshStandardMaterial color="#A0522D" roughness={0.6} />
          </mesh>
          
          {/* Puxadores dourados */}
          {[-0.3, 0.3].map((y, i) => (
            <group key={i} position={[-1.4, 0.4 + y, 1.1]}>
              <mesh>
                <cylinderGeometry args={[0.03, 0.03, 0.15]} />
                <meshStandardMaterial 
                  color="#FFD700" 
                  metalness={0.9} 
                  roughness={0.1}
                />
              </mesh>
              <mesh position={[0, 0, 0.08]}>
                <sphereGeometry args={[0.04]} />
                <meshStandardMaterial 
                  color="#FFD700" 
                  metalness={0.9} 
                  roughness={0.1}
                />
              </mesh>
            </group>
          ))}

          {/* Gaveta direita */}
          <mesh position={[1.8, 0.4, 0]} castShadow>
            <boxGeometry args={[0.8, 0.8, 2.3]} />
            <meshStandardMaterial color="#A0522D" roughness={0.6} />
          </mesh>
          
          {[-0.3, 0.3].map((y, i) => (
            <group key={i} position={[1.4, 0.4 + y, 1.1]}>
              <mesh>
                <cylinderGeometry args={[0.03, 0.03, 0.15]} />
                <meshStandardMaterial 
                  color="#FFD700" 
                  metalness={0.9} 
                  roughness={0.1}
                />
              </mesh>
              <mesh position={[0, 0, 0.08]}>
                <sphereGeometry args={[0.04]} />
                <meshStandardMaterial 
                  color="#FFD700" 
                  metalness={0.9} 
                  roughness={0.1}
                />
              </mesh>
            </group>
          ))}

          {/* === EQUIPAMENTOS DE ALTA TECNOLOGIA === */}
          {/* Monitor ultrawide curvo */}
          <group position={[0, 1.3, -0.8]}>
            <mesh castShadow>
              <boxGeometry args={[2.2, 1.4, 0.1]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            
            {/* Tela com curvatura simulada */}
            <mesh position={[0, 0, 0.05]} rotation={[0, 0.05, 0]}>
              <boxGeometry args={[2.15, 1.35, 0.02]} />
              <meshStandardMaterial 
                color="#001122" 
                emissive="#0066FF" 
                emissiveIntensity={0.3}
              />
            </mesh>
            
            {/* Suporte articulado */}
            <mesh position={[0, -0.5, -0.2]}>
              <cylinderGeometry args={[0.05, 0.05, 0.6]} />
              <meshStandardMaterial 
                color="#2F4F4F" 
                metalness={0.8} 
                roughness={0.2}
              />
            </mesh>
            
            {/* Base do suporte */}
            <mesh position={[0, -0.8, -0.1]}>
              <cylinderGeometry args={[0.2, 0.15, 0.1]} />
              <meshStandardMaterial 
                color="#2F4F4F" 
                metalness={0.8} 
                roughness={0.2}
              />
            </mesh>
          </group>

          {/* Laptop premium aberto */}
          <group position={[1.2, 0.9, 0.5]} rotation={[0, -0.4, 0]}>
            {/* Base do laptop */}
            <mesh>
              <boxGeometry args={[1.2, 0.05, 0.8]} />
              <meshStandardMaterial 
                color="#C0C0C0" 
                metalness={0.9} 
                roughness={0.1}
              />
            </mesh>
            
            {/* Tela */}
            <mesh position={[0, 0.4, -0.35]} rotation={[-0.3, 0, 0]}>
              <boxGeometry args={[1.18, 0.03, 0.75]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            
            <mesh position={[0, 0.4, -0.34]} rotation={[-0.3, 0, 0]}>
              <boxGeometry args={[1.1, 0.01, 0.7]} />
              <meshStandardMaterial 
                color="#000080" 
                emissive="#0099FF" 
                emissiveIntensity={0.2}
              />
            </mesh>
            
            {/* Teclado detalhado */}
            {Array.from({length: 60}, (_, i) => (
              <mesh 
                key={i} 
                position={[
                  -0.5 + (i % 12) * 0.08, 
                  0.03, 
                  -0.2 + Math.floor(i / 12) * 0.08
                ]}
              >
                <boxGeometry args={[0.06, 0.01, 0.06]} />
                <meshStandardMaterial color="#F0F0F0" />
              </mesh>
            ))}
          </group>

          {/* Sistema telefônico executivo */}
          <group position={[-1.2, 0.9, 0.8]}>
            {/* Base do telefone */}
            <mesh>
              <boxGeometry args={[0.4, 0.1, 0.25]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            
            {/* Tela LCD */}
            <mesh position={[0, 0.06, -0.08]}>
              <boxGeometry args={[0.25, 0.02, 0.08]} />
              <meshStandardMaterial 
                color="#000080" 
                emissive="#00FF00" 
                emissiveIntensity={0.4}
              />
            </mesh>
            
            {/* Botões */}
            {Array.from({length: 16}, (_, i) => (
              <mesh 
                key={i} 
                position={[
                  -0.15 + (i % 4) * 0.1, 
                  0.06, 
                  0.02 + Math.floor(i / 4) * 0.04
                ]}
              >
                <cylinderGeometry args={[0.015, 0.015, 0.01]} />
                <meshStandardMaterial color="#333333" />
              </mesh>
            ))}
            
            {/* Fone */}
            <mesh position={[0.15, 0.15, 0]} rotation={[0, 0, 0.3]}>
              <boxGeometry args={[0.05, 0.3, 0.05]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>

          {/* Capacete de segurança premium */}
          <group position={[0.8, 1.1, 1]}>
            <mesh castShadow>
              <sphereGeometry args={[0.18, 16, 12]} />
              <meshStandardMaterial 
                color="#FFD700" 
                roughness={0.3} 
                metalness={0.2}
              />
            </mesh>
            
            {/* Viseira */}
            <mesh position={[0, 0.05, 0.15]} rotation={[-0.2, 0, 0]}>
              <boxGeometry args={[0.3, 0.15, 0.02]} />
              <meshStandardMaterial 
                color="#000080" 
                transparent 
                opacity={0.7}
              />
            </mesh>
            
            {/* Logo da empresa */}
            <mesh position={[0, 0.1, 0.17]}>
              <boxGeometry args={[0.08, 0.08, 0.01]} />
              <meshStandardMaterial 
                color="#FFFFFF" 
                emissive="#FFFFFF" 
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>

          {/* Organizador executivo */}
          <group position={[-0.6, 0.9, 1.1]}>
            {/* Base de madeira */}
            <mesh>
              <boxGeometry args={[0.4, 0.15, 0.3]} />
              <meshStandardMaterial color="#8B4513" roughness={0.6} />
            </mesh>
            
            {/* Compartimentos */}
            {[[-0.15, 0.1], [0, 0.1], [0.15, 0.1], [-0.075, -0.05], [0.075, -0.05]].map(([x, z], i) => (
              <mesh key={i} position={[x, 0.1, z]}>
                <cylinderGeometry args={[0.06, 0.06, 0.2]} />
                <meshStandardMaterial color="#A0522D" />
              </mesh>
            ))}
            
            {/* Canetas e instrumentos */}
            {[[-0.15, 0.1], [0, 0.1], [0.15, 0.1]].map(([x, z], i) => (
              <mesh key={i} position={[x, 0.25, z]}>
                <cylinderGeometry args={[0.008, 0.008, 0.25]} />
                <meshStandardMaterial color={['#FF0000', '#0000FF', '#000000'][i]} />
              </mesh>
            ))}
            
            {/* Régua */}
            <mesh position={[-0.075, 0.18, -0.05]} rotation={[0, 0.3, 0]}>
              <boxGeometry args={[0.02, 0.005, 0.3]} />
              <meshStandardMaterial color="#FFFF00" />
            </mesh>
            
            {/* Estilete */}
            <mesh position={[0.075, 0.18, -0.05]}>
              <cylinderGeometry args={[0.01, 0.01, 0.15]} />
              <meshStandardMaterial color="#C0C0C0" metalness={0.8} />
            </mesh>
          </group>

          {/* Xícara de café premium */}
          <group position={[1, 0.9, -0.5]}>
            {/* Xícara de porcelana */}
            <mesh castShadow>
              <cylinderGeometry args={[0.08, 0.06, 0.12]} />
              <meshStandardMaterial 
                color="#FFFFFF" 
                roughness={0.1} 
                metalness={0.1}
              />
            </mesh>
            
            {/* Alça */}
            <mesh position={[0.09, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
              <torusGeometry args={[0.04, 0.015, 8, 16]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            
            {/* Café */}
            <mesh position={[0, 0.05, 0]}>
              <cylinderGeometry args={[0.075, 0.075, 0.02]} />
              <meshStandardMaterial color="#4A2C2A" />
            </mesh>
            
            {/* Vapor (simulado com pequenas esferas) */}
            {[0, 0.05, 0.1].map((y, i) => (
              <mesh key={i} position={[0.02, 0.15 + y, 0.02]} opacity={0.3 - i * 0.1}>
                <sphereGeometry args={[0.01]} />
                <meshStandardMaterial 
                  color="#FFFFFF" 
                  transparent 
                  opacity={0.3 - i * 0.1}
                />
              </mesh>
            ))}
            
            {/* Pires */}
            <mesh position={[0, -0.01, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.02]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
          </group>
        </group>

        {/* === CADEIRA EXECUTIVA PREMIUM === */}
        <group position={[-2, 0, 1.5]}>
          {/* Base com rodas premium */}
          <group position={[0, 0.12, 0]}>
            {/* Centro cromado */}
            <mesh>
              <cylinderGeometry args={[0.25, 0.25, 0.15]} />
              <meshStandardMaterial 
                color="#C0C0C0" 
                metalness={0.95} 
                roughness={0.05}
              />
            </mesh>
            
            {/* 5 braços com rodas */}
            {[0, 72, 144, 216, 288].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <group key={i} rotation={[0, rad, 0]}>
                  {/* Braço */}
                  <mesh position={[0, 0, 0.5]}>
                    <boxGeometry args={[0.1, 0.08, 1]} />
                    <meshStandardMaterial 
                      color="#2C3E50" 
                      metalness={0.8} 
                      roughness={0.2}
                    />
                  </mesh>
                  
                  {/* Roda com detalhes */}
                  <group position={[0, -0.06, 1]}>
                    <mesh rotation={[Math.PI/2, 0, 0]}>
                      <cylinderGeometry args={[0.08, 0.08, 0.06]} />
                      <meshStandardMaterial color="#1A1A1A" />
                    </mesh>
                    
                    {/* Aro da roda */}
                    <mesh rotation={[Math.PI/2, 0, 0]}>
                      <torusGeometry args={[0.08, 0.01, 8, 16]} />
                      <meshStandardMaterial 
                        color="#C0C0C0" 
                        metalness={0.9} 
                        roughness={0.1}
                      />
                    </mesh>
                  </group>
                </group>
              );
            })}
          </group>

          {/* Coluna pneumática premium */}
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.8]} />
            <meshStandardMaterial 
              color="#2C3E50" 
              metalness={0.9} 
              roughness={0.1}
            />
          </mesh>
          
          {/* Detalhes da coluna */}
          {[0.3, 0.1, -0.1, -0.3].map((y, i) => (
            <mesh key={i} position={[0, 0.6 + y, 0]}>
              <torusGeometry args={[0.08, 0.01, 8, 16]} />
              <meshStandardMaterial 
                color="#C0C0C0" 
                metalness={0.9} 
                roughness={0.1}
              />
            </mesh>
          ))}

          {/* Assento de couro premium */}
          <mesh position={[0, 1.05, 0]} castShadow>
            <boxGeometry args={[1, 0.25, 1]} />
            <meshStandardMaterial 
              color="#8B4513" 
              roughness={0.7} 
              metalness={0.1}
            />
          </mesh>
          
          {/* Padrão de costuras detalhado */}
          {[[-0.3, -0.3], [-0.3, 0.3], [0.3, -0.3], [0.3, 0.3], [0, 0]].map(([x, z], i) => (
            <mesh key={i} position={[x, 1.06, z]}>
              <cylinderGeometry args={[0.02, 0.02, 0.01]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
          ))}
          
          {/* Bordas acolchoadas */}
          {[[-0.5, 0], [0.5, 0], [0, -0.5], [0, 0.5]].map(([x, z], i) => (
            <mesh 
              key={i} 
              position={[x, 1.1, z]} 
              rotation={i < 2 ? [0, 0, Math.PI/2] : [0, 0, 0]}
            >
              <cylinderGeometry args={[0.05, 0.05, i < 2 ? 1 : 1]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
          ))}

          {/* Encosto ergonômico alto */}
          <mesh position={[0, 1.8, -0.45]} castShadow>
            <boxGeometry args={[1, 1.6, 0.25]} />
            <meshStandardMaterial 
              color="#8B4513" 
              roughness={0.7} 
              metalness={0.1}
            />
          </mesh>
          
          {/* Apoio lombar ajustável */}
          <mesh position={[0, 1.4, -0.4]}>
            <boxGeometry args={[0.7, 0.35, 0.15]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          
          {/* Apoio de cabeça */}
          <mesh position={[0, 2.4, -0.35]} castShadow>
            <boxGeometry args={[0.6, 0.4, 0.2]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>

          {/* Braços executivos ajustáveis */}
          {[-0.6, 0.6].map((x, i) => (
            <group key={i} position={[x, 1.2, 0]}>
              {/* Suporte vertical */}
              <mesh position={[0, 0, -0.3]}>
                <boxGeometry args={[0.08, 0.8, 0.08]} />
                <meshStandardMaterial 
                  color="#2C3E50" 
                  metalness={0.8} 
                  roughness={0.2}
                />
              </mesh>
              
              {/* Braço horizontal */}
              <mesh position={[0, 0.35, 0]}>
                <boxGeometry args={[0.15, 0.08, 0.5]} />
                <meshStandardMaterial 
                  color="#8B4513" 
                  roughness={0.7}
                />
              </mesh>
              
              {/* Almofada do braço */}
              <mesh position={[0, 0.39, 0]}>
                <boxGeometry args={[0.12, 0.04, 0.45]} />
                <meshStandardMaterial color="#654321" />
              </mesh>
              
              {/* Controles de ajuste */}
              <mesh position={[0, 0.2, -0.2]}>
                <cylinderGeometry args={[0.02, 0.02, 0.1]} />
                <meshStandardMaterial 
                  color="#C0C0C0" 
                  metalness={0.9} 
                  roughness={0.1}
                />
              </mesh>
            </group>
          ))}
        </group>

        {/* === SOFÁS EXECUTIVOS LUXUOSOS ===
        {/* === SOFÁS EXECUTIVOS MELHORADOS === */}
        {/* Sofá 1 com almofadas */}
        <group position={[2.5, 0, -2]}>
          <mesh position={[0, 0.5, 0]} castShadow>
            <boxGeometry args={[2.5, 0.8, 1]} />
            <meshStandardMaterial color="#8B4513" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.9, -0.4]} castShadow>
            <boxGeometry args={[2.5, 0.6, 0.2]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          {/* Almofadas decorativas */}
          {[-0.8, 0.8].map((x, i) => (
            <mesh key={i} position={[x, 0.95, 0]} castShadow>
              <boxGeometry args={[0.4, 0.4, 0.4]} />
              <meshStandardMaterial color="#D2B48C" />
            </mesh>
          ))}
          {/* Braços do sofá */}
          {[-1.25, 1.25].map((x, i) => (
            <mesh key={i} position={[x, 0.7, 0]} castShadow>
              <boxGeometry args={[0.2, 1, 1]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
          ))}
        </group>
        
        {/* Sofá 2 similar */}
        <group position={[2.5, 0, 1]}>
          <mesh position={[0, 0.5, 0]} castShadow>
            <boxGeometry args={[2.5, 0.8, 1]} />
            <meshStandardMaterial color="#8B4513" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.9, 0.4]} castShadow>
            <boxGeometry args={[2.5, 0.6, 0.2]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          {[-0.8, 0.8].map((x, i) => (
            <mesh key={i} position={[x, 0.95, 0]} castShadow>
              <boxGeometry args={[0.4, 0.4, 0.4]} />
              <meshStandardMaterial color="#D2B48C" />
            </mesh>
          ))}
          {[-1.25, 1.25].map((x, i) => (
            <mesh key={i} position={[x, 0.7, 0]} castShadow>
              <boxGeometry args={[0.2, 1, 1]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
          ))}
        </group>
        
        {/* === MONITORES NA PAREDE COM MOLDURAS === */}
        <mesh position={[-4.8, 2, -1]}>
          <boxGeometry args={[0.1, 1.5, 2]} />
          <meshStandardMaterial color="#000000" emissive="#00FF00" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[-4.75, 2, -1]}>
          <boxGeometry args={[0.05, 1.6, 2.1]} />
          <meshStandardMaterial color="#2F4F4F" />
        </mesh>
        
        <mesh position={[-2, 2, -3.8]}>
          <boxGeometry args={[2, 1.5, 0.1]} />
          <meshStandardMaterial color="#000000" emissive="#4169E1" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[-2, 2, -3.75]}>
          <boxGeometry args={[2.1, 1.6, 0.05]} />
          <meshStandardMaterial color="#2F4F4F" />
        </mesh>
        
        {/* === PLANTAS DECORATIVAS MELHORADAS === */}
        <group position={[4, 0, -3]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.3, 0.4, 0.6]} />
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </mesh>
          {/* Folhas individuais */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <mesh 
                key={i}
                position={[
                  Math.cos(rad) * 0.4, 
                  0.8 + Math.sin(i * 0.5) * 0.2, 
                  Math.sin(rad) * 0.4
                ]}
                rotation={[0, rad, Math.PI/6]}
              >
                <boxGeometry args={[0.05, 0.6, 0.02]} />
                <meshStandardMaterial color="#228B22" />
              </mesh>
            );
          })}
        </group>
        
        <group position={[-4, 0, 2]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.25, 0.35, 0.6]} />
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </mesh>
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <mesh 
                key={i}
                position={[
                  Math.cos(rad) * 0.3, 
                  0.7 + Math.sin(i * 0.7) * 0.15, 
                  Math.sin(rad) * 0.3
                ]}
                rotation={[0, rad, Math.PI/8]}
              >
                <boxGeometry args={[0.04, 0.5, 0.02]} />
                <meshStandardMaterial color="#32CD32" />
              </mesh>
            );
          })}
        </group>
        
        {/* === MESA DE CENTRO DETALHADA === */}
        <group position={[2.5, 0, -0.5]}>
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[1.5, 0.08, 0.8]} />
            <meshStandardMaterial color="#D2B48C" roughness={0.4} />
          </mesh>
          {/* Bordas decorativas */}
          <mesh position={[0, 0.42, 0]} castShadow>
            <boxGeometry args={[1.45, 0.04, 0.75]} />
            <meshStandardMaterial color="#F5DEB3" />
          </mesh>
          {/* Pés da mesa com detalhes */}
          {[[-0.6, -0.3], [0.6, -0.3], [-0.6, 0.3], [0.6, 0.3]].map(([x, z], i) => (
            <group key={i} position={[x, 0.2, z]}>
              <mesh>
                <boxGeometry args={[0.08, 0.4, 0.08]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              <mesh position={[0, 0.15, 0]}>
                <boxGeometry args={[0.1, 0.05, 0.1]} />
                <meshStandardMaterial color="#A0522D" />
              </mesh>
            </group>
          ))}
          
          {/* Objetos decorativos na mesa */}
          {/* Revista */}
          <mesh position={[-0.3, 0.45, 0.1]} rotation={[0, 0.3, 0]}>
            <boxGeometry args={[0.3, 0.01, 0.4]} />
            <meshStandardMaterial color="#FF6347" />
          </mesh>
          {/* Controle remoto */}
          <mesh position={[0.2, 0.45, -0.2]}>
            <boxGeometry args={[0.15, 0.02, 0.05]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
        </group>
        
        {/* === QUADRO DECORATIVO NA PAREDE === */}
        <mesh position={[2, 2.5, -3.8]}>
          <boxGeometry args={[1.5, 1, 0.05]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[2, 2.5, -3.75]}>
          <boxGeometry args={[1.4, 0.9, 0.02]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
      </group>

  // Substitua as seções Backend e Frontend no seu OfficeMap.tsx por estas versões detalhadas:

{/* ==================== BACKEND DEV PREMIUM (Meio Esquerda - Laranja) ==================== */}
<group position={[-9, 0, 0]}>
  {/* Piso laranja Backend */}
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
    <planeGeometry args={[8, 8]} />
    <meshStandardMaterial 
      color="#DEB887" 
      roughness={0.6} 
      metalness={0.1}
    />
  </mesh>
  
  {/* Padrão no piso */}
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
    <planeGeometry args={[7.8, 7.8]} />
    <meshStandardMaterial color="#CD853F" />
  </mesh>

  {/* === PAREDES PARCIAIS === */}
  {/* Parede traseira */}
  <mesh position={[0, 2, -4]}>
    <boxGeometry args={[8, 4, 0.3]} />
    <meshStandardMaterial color="#8B7355" />
  </mesh>
  
  {/* Divisória lateral direita (baixa) */}
  <mesh position={[4, 1.5, 0]}>
    <boxGeometry args={[0.2, 3, 6]} />
    <meshStandardMaterial color="#8B7355" />
  </mesh>

  {/* === LETREIRO "BACKEND DEV" === */}
  <group position={[0, 3.5, -3.85]}>
    <mesh>
      <boxGeometry args={[4, 0.8, 0.1]} />
      <meshStandardMaterial 
        color="#654321" 
        roughness={0.4}
      />
    </mesh>
    <mesh position={[0, 0, 0.06]}>
      <boxGeometry args={[3.8, 0.6, 0.02]} />
      <meshStandardMaterial 
        color="#DEB887" 
        emissive="#CD853F" 
        emissiveIntensity={0.4}
      />
    </mesh>
  </group>

  {/* === ESTAÇÃO BACKEND 1 === */}
  <group position={[-2.5, 0, -1.5]}>
    {/* Mesa em L */}
    <mesh position={[0, 0.8, 0]} castShadow>
      <boxGeometry args={[2, 0.1, 1.2]} />
      <meshStandardMaterial 
        color="#8B4513" 
        roughness={0.4} 
        metalness={0.1}
      />
    </mesh>
    
    {/* Extensão da mesa */}
    <mesh position={[1.2, 0.8, 0.8]} castShadow>
      <boxGeometry args={[0.8, 0.1, 0.8]} />
      <meshStandardMaterial color="#8B4513" />
    </mesh>
    
    {/* Pernas da mesa */}
    {[[-0.8, -0.5], [0.8, -0.5], [-0.8, 0.5], [0.8, 0.5]].map(([x, z], i) => (
      <mesh key={i} position={[x, 0.4, z]}>
        <boxGeometry args={[0.08, 0.8, 0.08]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    ))}

    {/* === MONITOR PRINCIPAL (Backend) === */}
    <group position={[0, 1.6, -0.4]}>
      <mesh castShadow>
        <boxGeometry args={[1.4, 0.9, 0.08]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      
      {/* Tela com código/gráficos */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[1.35, 0.85, 0.02]} />
        <meshStandardMaterial 
          color="#001122" 
          emissive="#00FF00" 
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Simulação de terminal/código */}
      {Array.from({length: 8}, (_, i) => (
        <mesh key={i} position={[-0.5 + Math.random() * 1, -0.3 + i * 0.08, 0.06]}>
          <boxGeometry args={[Math.random() * 0.8 + 0.2, 0.02, 0.005]} />
          <meshStandardMaterial 
            color="#00FF00" 
            emissive="#00FF00" 
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
      
      {/* Suporte do monitor */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3]} />
        <meshStandardMaterial 
          color="#333" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
    </group>

    {/* Monitor secundário */}
    <group position={[1.2, 1.4, 0.6]} rotation={[0, -0.3, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1, 0.7, 0.06]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.95, 0.65, 0.02]} />
        <meshStandardMaterial 
          color="#000033" 
          emissive="#0066FF" 
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Gráficos de performance */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.3 + i * 0.3, 0, 0.05]}>
          <boxGeometry args={[0.2, Math.random() * 0.4 + 0.1, 0.005]} />
          <meshStandardMaterial 
            color="#00AAFF" 
            emissive="#00AAFF" 
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>

    {/* === EQUIPAMENTOS === */}
    {/* Teclado mecânico */}
    <mesh position={[0, 0.82, 0.3]} castShadow>
      <boxGeometry args={[0.8, 0.03, 0.3]} />
      <meshStandardMaterial color="#1A1A1A" />
    </mesh>
    
    {/* Teclas */}
    {Array.from({length: 40}, (_, i) => (
      <mesh 
        key={i} 
        position={[
          -0.35 + (i % 10) * 0.07, 
          0.835, 
          0.2 + Math.floor(i / 10) * 0.05
        ]}
      >
        <boxGeometry args={[0.06, 0.01, 0.04]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    ))}
    
    {/* Mouse */}
    <mesh position={[0.6, 0.82, 0.4]} castShadow>
      <boxGeometry args={[0.1, 0.015, 0.15]} />
      <meshStandardMaterial color="#000" />
    </mesh>
    
    {/* Mousepad */}
    <mesh position={[0.6, 0.815, 0.4]}>
      <boxGeometry args={[0.3, 0.005, 0.25]} />
      <meshStandardMaterial color="#4169E1" />
    </mesh>
    
    {/* Notebook */}
    <group position={[-0.8, 0.82, 0.4]} rotation={[0, 0.2, 0]}>
      <mesh>
        <boxGeometry args={[0.8, 0.02, 0.6]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.3, -0.25]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.78, 0.02, 0.55]} />
        <meshStandardMaterial 
          color="#000080" 
          emissive="#00FFFF" 
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
    
    {/* Xícara de café */}
    <group position={[0.3, 0.82, -0.3]}>
      <mesh>
        <cylinderGeometry args={[0.05, 0.04, 0.08]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.06, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.025, 0.008, 8, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.02]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  </group>

  {/* === ESTAÇÃO BACKEND 2 === */}
  <group position={[2.5, 0, -1.5]}>
    {/* Mesa similar */}
    <mesh position={[0, 0.8, 0]} castShadow>
      <boxGeometry args={[2, 0.1, 1.2]} />
      <meshStandardMaterial color="#8B4513" />
    </mesh>
    
    {[[-0.8, -0.5], [0.8, -0.5], [-0.8, 0.5], [0.8, 0.5]].map(([x, z], i) => (
      <mesh key={i} position={[x, 0.4, z]}>
        <boxGeometry args={[0.08, 0.8, 0.08]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    ))}

    {/* Monitor com dashboard */}
    <group position={[0, 1.6, -0.4]}>
      <mesh castShadow>
        <boxGeometry args={[1.4, 0.9, 0.08]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[1.35, 0.85, 0.02]} />
        <meshStandardMaterial 
          color="#220011" 
          emissive="#FF0066" 
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Dashboard widgets */}
      {[[-0.4, 0.2], [0, 0.2], [0.4, 0.2], [-0.2, -0.2], [0.2, -0.2]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.06]}>
          <boxGeometry args={[0.25, 0.25, 0.005]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#FF0066" : "#00FF66"}
            emissive={i % 2 === 0 ? "#FF0066" : "#00FF66"}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>
    
    {/* Equipamentos similares */}
    <mesh position={[0, 0.82, 0.3]} castShadow>
      <boxGeometry args={[0.8, 0.03, 0.3]} />
      <meshStandardMaterial color="#1A1A1A" />
    </mesh>
    
    <mesh position={[0.6, 0.82, 0.4]} castShadow>
      <boxGeometry args={[0.1, 0.015, 0.15]} />
      <meshStandardMaterial color="#000" />
    </mesh>
  </group>

  {/* === CADEIRAS BACKEND === */}
  <group position={[-2.5, 0, 1]}>
    {/* Base com rodas */}
    <group position={[0, 0.12, 0]}>
      <mesh>
        <cylinderGeometry args={[0.25, 0.25, 0.15]} />
        <meshStandardMaterial 
          color="#654321" 
          metalness={0.7} 
          roughness={0.3}
        />
      </mesh>
      
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <group key={i} rotation={[0, rad, 0]}>
            <mesh position={[0, 0, 0.5]}>
              <boxGeometry args={[0.1, 0.08, 1]} />
              <meshStandardMaterial color="#8B4513" metalness={0.8} />
            </mesh>
            <mesh position={[0, -0.06, 1]} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.06]} />
              <meshStandardMaterial color="#DEB887" />
            </mesh>
          </group>
        );
      })}
    </group>
    
    {/* Coluna */}
    <mesh position={[0, 0.6, 0]}>
      <cylinderGeometry args={[0.06, 0.08, 0.8]} />
      <meshStandardMaterial color="#8B4513" metalness={0.8} />
    </mesh>
    
    {/* Assento */}
    <mesh position={[0, 1.05, 0]} castShadow>
      <boxGeometry args={[1, 0.25, 1]} />
      <meshStandardMaterial color="#654321" />
    </mesh>
    
    {/* Encosto */}
    <mesh position={[0, 1.8, -0.45]} castShadow>
      <boxGeometry args={[1, 1.6, 0.25]} />
      <meshStandardMaterial color="#654321" />
    </mesh>
    
    {/* Braços */}
    {[-0.6, 0.6].map((x, i) => (
      <group key={i} position={[x, 1.2, 0]}>
        <mesh position={[0, 0, -0.3]}>
          <boxGeometry args={[0.08, 0.8, 0.08]} />
          <meshStandardMaterial color="#8B4513" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.15, 0.08, 0.5]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>
    ))}
  </group>

  {/* Cadeira 2 */}
  <group position={[2.5, 0, 1]}>
    {/* Versão similar da cadeira 1 */}
    <group position={[0, 0.12, 0]}>
      <mesh>
        <cylinderGeometry args={[0.25, 0.25, 0.15]} />
        <meshStandardMaterial color="#654321" metalness={0.7} />
      </mesh>
      
      {[0, 120, 240].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <group key={i} rotation={[0, rad, 0]}>
            <mesh position={[0, 0, 0.4]}>
              <boxGeometry args={[0.08, 0.06, 0.8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[0, -0.05, 0.8]} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.04]} />
              <meshStandardMaterial color="#DEB887" />
            </mesh>
          </group>
        );
      })}
    </group>
    
    <mesh position={[0, 0.5, 0]}>
      <cylinderGeometry args={[0.05, 0.06, 0.6]} />
      <meshStandardMaterial color="#8B4513" metalness={0.8} />
    </mesh>
    
    <mesh position={[0, 0.9, 0]} castShadow>
      <boxGeometry args={[0.8, 0.2, 0.8]} />
      <meshStandardMaterial color="#654321" />
    </mesh>
    
    <mesh position={[0, 1.5, -0.35]} castShadow>
      <boxGeometry args={[0.8, 1.2, 0.2]} />
      <meshStandardMaterial color="#654321" />
    </mesh>
  </group>

  {/* === PLANTAS DECORATIVAS === */}
  <group position={[-3.5, 0, 3.5]}>
    <mesh position={[0, 0.3, 0]}>
      <cylinderGeometry args={[0.2, 0.25, 0.6]} />
      <meshStandardMaterial color="#8B4513" roughness={0.8} />
    </mesh>
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <mesh 
          key={i}
          position={[
            Math.cos(rad) * 0.25, 
            0.7 + Math.sin(i * 0.7) * 0.1, 
            Math.sin(rad) * 0.25
          ]}
          rotation={[0, rad, Math.PI/12]}
        >
          <boxGeometry args={[0.03, 0.4, 0.015]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
      );
    })}
  </group>

  <group position={[3.5, 0, 3.5]}>
    <mesh position={[0, 0.25, 0]}>
      <cylinderGeometry args={[0.18, 0.22, 0.5]} />
      <meshStandardMaterial color="#654321" roughness={0.8} />
    </mesh>
    {[0, 72, 144, 216, 288].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <mesh 
          key={i}
          position={[
            Math.cos(rad) * 0.2, 
            0.6 + Math.sin(i * 0.8) * 0.08, 
            Math.sin(rad) * 0.2
          ]}
          rotation={[0, rad, Math.PI/15]}
        >
          <boxGeometry args={[0.025, 0.35, 0.012]} />
          <meshStandardMaterial color="#32CD32" />
        </mesh>
      );
    })}
  </group>
</group>

{/* ==================== FRONTEND DEV PREMIUM (Centro - Laranja Escuro) ==================== */}
<group position={[-1, 0, 0]}>
  {/* Piso laranja Frontend */}
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
    <planeGeometry args={[8, 8]} />
    <meshStandardMaterial 
      color="#F4A460" 
      roughness={0.6} 
      metalness={0.1}
    />
  </mesh>
  
  {/* Padrão no piso */}
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
    <planeGeometry args={[7.8, 7.8]} />
    <meshStandardMaterial color="#D2691E" />
  </mesh>

  {/* === PAREDES PARCIAIS === */}
  {/* Parede traseira */}
  <mesh position={[0, 2, -4]}>
    <boxGeometry args={[8, 4, 0.3]} />
    <meshStandardMaterial color="#A0522D" />
  </mesh>
  
  {/* Divisória lateral esquerda (baixa) */}
  <mesh position={[-4, 1.5, 0]}>
    <boxGeometry args={[0.2, 3, 6]} />
    <meshStandardMaterial color="#A0522D" />
  </mesh>

  {/* === LETREIRO "FRONTEND DEV" === */}
  <group position={[0, 3.5, -3.85]}>
    <mesh>
      <boxGeometry args={[4.5, 0.8, 0.1]} />
      <meshStandardMaterial 
        color="#8B4513" 
        roughness={0.4}
      />
    </mesh>
    <mesh position={[0, 0, 0.06]}>
      <boxGeometry args={[4.3, 0.6, 0.02]} />
      <meshStandardMaterial 
        color="#F4A460" 
        emissive="#D2691E" 
        emissiveIntensity={0.4}
      />
    </mesh>
  </group>

  {/* === ESTAÇÃO FRONTEND 1 === */}
  <group position={[-2.5, 0, -1.5]}>
    {/* Mesa em L */}
    <mesh position={[0, 0.8, 0]} castShadow>
      <boxGeometry args={[2, 0.1, 1.2]} />
      <meshStandardMaterial 
        color="#D2691E" 
        roughness={0.4} 
        metalness={0.1}
      />
    </mesh>
    
    {/* Extensão da mesa */}
    <mesh position={[1.2, 0.8, 0.8]} castShadow>
      <boxGeometry args={[0.8, 0.1, 0.8]} />
      <meshStandardMaterial color="#D2691E" />
    </mesh>
    
    {/* Pernas da mesa */}
    {[[-0.8, -0.5], [0.8, -0.5], [-0.8, 0.5], [0.8, 0.5]].map(([x, z], i) => (
      <mesh key={i} position={[x, 0.4, z]}>
        <boxGeometry args={[0.08, 0.8, 0.08]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    ))}

    {/* === MONITOR PRINCIPAL (Frontend - Design) === */}
    <group position={[0, 1.6, -0.4]}>
      <mesh castShadow>
        <boxGeometry args={[1.6, 1, 0.08]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      
      {/* Tela com design/UI */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[1.55, 0.95, 0.02]} />
        <meshStandardMaterial 
          color="#001122" 
          emissive="#FF6B35" 
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Simulação de interface/mockups */}
      {[
        [-0.5, 0.3, '#FF6B35'], [-0.1, 0.3, '#4CAF50'], [0.3, 0.3, '#2196F3'],
        [-0.5, 0, '#9C27B0'], [-0.1, 0, '#FF9800'], [0.3, 0, '#F44336'],
        [-0.5, -0.3, '#00BCD4'], [-0.1, -0.3, '#8BC34A'], [0.3, -0.3, '#E91E63']
      ].map(([x, y, color], i) => (
        <mesh key={i} position={[x as number, y as number, 0.06]}>
          <boxGeometry args={[0.3, 0.2, 0.005]} />
          <meshStandardMaterial 
            color={color as string}
            emissive={color as string}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
      
      {/* Suporte do monitor */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3]} />
        <meshStandardMaterial 
          color="#333" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
    </group>

    {/* Monitor secundário - Paleta de cores */}
    <group position={[1.2, 1.4, 0.6]} rotation={[0, -0.3, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1, 0.7, 0.06]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.95, 0.65, 0.02]} />
        <meshStandardMaterial 
          color="#000033" 
          emissive="#9370DB" 
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Paleta de cores */}
      {[
        [-0.3, 0.2, '#FF0000'], [-0.1, 0.2, '#00FF00'], [0.1, 0.2, '#0000FF'], [0.3, 0.2, '#FFFF00'],
        [-0.3, 0, '#FF00FF'], [-0.1, 0, '#00FFFF'], [0.1, 0, '#FFA500'], [0.3, 0, '#800080'],
        [-0.3, -0.2, '#FFC0CB'], [-0.1, -0.2, '#A52A2A'], [0.1, -0.2, '#008000'], [0.3, -0.2, '#000080']
      ].map(([x, y, color], i) => (
        <mesh key={i} position={[x as number, y as number, 0.05]}>
          <boxGeometry args={[0.15, 0.15, 0.005]} />
          <meshStandardMaterial 
            color={color as string}
            emissive={color as string}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>

    {/* === EQUIPAMENTOS FRONTEND === */}
    {/* Teclado RGB */}
    <mesh position={[0, 0.82, 0.3]} castShadow>
      <boxGeometry args={[0.9, 0.03, 0.35]} />
      <meshStandardMaterial color="#1A1A1A" />
    </mesh>
    
    {/* Teclas RGB */}
    {Array.from({length: 50}, (_, i) => (
      <mesh 
        key={i} 
        position={[
          -0.4 + (i % 10) * 0.08, 
          0.835, 
          0.15 + Math.floor(i / 10) * 0.05
        ]}
      >
        <boxGeometry args={[0.07, 0.01, 0.04]} />
        <meshStandardMaterial 
          color="#333"
          emissive={`hsl(${(i * 17) % 360}, 70%, 50%)`}
          emissiveIntensity={0.2}
        />
      </mesh>
    ))}
    
    {/* Mouse design */}
    <mesh position={[0.6, 0.82, 0.4]} castShadow>
      <boxGeometry args={[0.12, 0.02, 0.18]} />
      <meshStandardMaterial 
        color="#FF6B35" 
        emissive="#FF6B35" 
        emissiveIntensity={0.1}
      />
    </mesh>
    
    {/* Mousepad design */}
    <mesh position={[0.6, 0.815, 0.4]}>
      <boxGeometry args={[0.35, 0.005, 0.28]} />
      <meshStandardMaterial 
        color="#9370DB"
        emissive="#9370DB"
        emissiveIntensity={0.1}
      />
    </mesh>
    
    {/* Tablet gráfico */}
    <group position={[-0.8, 0.82, 0.4]} rotation={[0, 0.1, 0]}>
      <mesh>
        <boxGeometry args={[0.6, 0.02, 0.4]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.3, -0.2]} rotation={[-0.2, 0, 0]}>  
        <boxGeometry args={[0.58, 0.02, 0.38]} />
        <meshStandardMaterial 
          color="#000080" 
          emissive="#00FFFF" 
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>  
</group>



{/* ==================== REUNIÃO GRANDE (Centro - Madeira Premium) ==================== */}
<group position={[0, 0, -8]}>
  {/* Piso de madeira premium */}
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
    <planeGeometry args={[12, 8]} />
    <meshStandardMaterial 
      color="#D2B48C" 
      roughness={0.6} 
      metalness={0.1}
    />
  </mesh>
  
  {/* Padrão de madeira no piso */}
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
    <planeGeometry args={[11.8, 7.8]} />
    <meshStandardMaterial color="#C19A6B" />
  </mesh>

  {/* === PAREDES PARCIAIS === */}
  {/* Parede traseira */}
  <mesh position={[0, 2.5, -4]}>
    <boxGeometry args={[12, 5, 0.3]} />
    <meshStandardMaterial color="#8B7355" roughness={0.7} />
  </mesh>
  
  {/* Parede lateral esquerda (parcial) */}
  <mesh position={[-6, 2, 0]}>
    <boxGeometry args={[0.3, 4, 6]} />
    <meshStandardMaterial color="#8B7355" />
  </mesh>
  
  {/* Parede lateral direita (parcial) */}
  <mesh position={[6, 2, 0]}>
    <boxGeometry args={[0.3, 4, 6]} />
    <meshStandardMaterial color="#8B7355" />
  </mesh>

  {/* === LETREIRO "REUNIÃO GRANDE" === */}
  <group position={[0, 4.2, -3.85]}>
    <mesh>
      <boxGeometry args={[4.5, 1, 0.1]} />
      <meshStandardMaterial 
        color="#654321" 
        roughness={0.4}
      />
    </mesh>
    <mesh position={[0, 0, 0.06]}>
      <boxGeometry args={[4.3, 0.8, 0.02]} />
      <meshStandardMaterial 
        color="#F5DEB3" 
        emissive="#DEB887" 
        emissiveIntensity={0.3}
      />
    </mesh>
  </group>

  {/* === MESA DE CONFERÊNCIA GRANDE === */}
  <group position={[0, 0, 0]}>
    {/* Tampo da mesa */}
    <mesh position={[0, 0.8, 0]} castShadow>
      <boxGeometry args={[8, 0.12, 3.5]} />
      <meshStandardMaterial 
        color="#8B4513" 
        roughness={0.3} 
        metalness={0.1}
      />
    </mesh>
    
    {/* Bordas da mesa */}
    <mesh position={[0, 0.81, 0]}>
      <boxGeometry args={[7.9, 0.05, 3.4]} />
      <meshStandardMaterial color="#A0522D" />
    </mesh>
    
    {/* Pernas da mesa (6 pernas para mesa grande) */}
    {[
      [-3.5, -1.5], [-3.5, 1.5], 
      [0, -1.5], [0, 1.5], 
      [3.5, -1.5], [3.5, 1.5]
    ].map(([x, z], i) => (
      <mesh key={i} position={[x, 0.4, z]}>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshStandardMaterial 
          color="#654321" 
          roughness={0.6}
        />
      </mesh>
    ))}
    
    {/* Sistema de cabos integrado */}
    <mesh position={[0, 0.75, 0]}>
      <boxGeometry args={[1, 0.1, 0.3]} />
      <meshStandardMaterial color="#2F4F4F" metalness={0.8} />
    </mesh>
    
    {/* Tomadas na mesa */}
    {[-2, 0, 2].map((x, i) => (
      <mesh key={i} position={[x, 0.82, 0]}>
        <boxGeometry args={[0.2, 0.02, 0.15]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>
    ))}
  </group>

  {/* === CADEIRAS AO REDOR (12 CADEIRAS) === */}
  {/* Lado norte (4 cadeiras) */}
  <BlackMeetingChair position={[-3, 0, -2.5]} rotation={[0, 0, 0]} />
  <BlackMeetingChair position={[-1, 0, -2.5]} rotation={[0, 0, 0]} />
  <BlackMeetingChair position={[1, 0, -2.5]} rotation={[0, 0, 0]} />
  <BlackMeetingChair position={[3, 0, -2.5]} rotation={[0, 0, 0]} />
  
  {/* Lado sul (4 cadeiras) */}
  <BlackMeetingChair position={[-3, 0, 2.5]} rotation={[0, Math.PI, 0]} />
  <BlackMeetingChair position={[-1, 0, 2.5]} rotation={[0, Math.PI, 0]} />
  <BlackMeetingChair position={[1, 0, 2.5]} rotation={[0, Math.PI, 0]} />
  <BlackMeetingChair position={[3, 0, 2.5]} rotation={[0, Math.PI, 0]} />
  
  {/* Lados leste e oeste (2 cadeiras cada) */}
  <BlackMeetingChair position={[-4.5, 0, -0.8]} rotation={[0, Math.PI / 2, 0]} />
  <BlackMeetingChair position={[-4.5, 0, 0.8]} rotation={[0, Math.PI / 2, 0]} />
  <BlackMeetingChair position={[4.5, 0, -0.8]} rotation={[0, -Math.PI / 2, 0]} />
  <BlackMeetingChair position={[4.5, 0, 0.8]} rotation={[0, -Math.PI / 2, 0]} />

  {/* === MONITORES NAS PAREDES === */}
  {/* Monitor principal na parede traseira */}
  <group position={[0, 2.5, -3.8]}>
    <mesh>
      <boxGeometry args={[3.5, 2, 0.1]} />
      <meshStandardMaterial color="#000" />
    </mesh>
    <mesh position={[0, 0, 0.06]}>
      <boxGeometry args={[3.4, 1.9, 0.02]} />
      <meshStandardMaterial 
        color="#001122" 
        emissive="#0066FF" 
        emissiveIntensity={0.4}
      />
    </mesh>
    {/* Moldura do monitor */}
    <mesh position={[0, 0, 0.07]}>
      <boxGeometry args={[3.6, 2.1, 0.05]} />
      <meshStandardMaterial color="#2F4F4F" />
    </mesh>
  </group>
  
  {/* Monitores laterais */}
  <group position={[-5.8, 2, -1]}>
    <mesh>
      <boxGeometry args={[0.1, 1.5, 2.5]} />
      <meshStandardMaterial color="#000" />
    </mesh>
    <mesh position={[0.06, 0, 0]}>
      <boxGeometry args={[0.02, 1.4, 2.4]} />
      <meshStandardMaterial 
        color="#220011" 
        emissive="#FF0066" 
        emissiveIntensity={0.3}
      />
    </mesh>
  </group>
  
  <group position={[5.8, 2, 1]}>
    <mesh>
      <boxGeometry args={[0.1, 1.5, 2.5]} />
      <meshStandardMaterial color="#000" />
    </mesh>
    <mesh position={[-0.06, 0, 0]}>
      <boxGeometry args={[0.02, 1.4, 2.4]} />
      <meshStandardMaterial 
        color="#001100" 
        emissive="#00FF44" 
        emissiveIntensity={0.3}
      />
    </mesh>
  </group>

  {/* === PLANTAS DECORATIVAS === */}
  <group position={[-5, 0, 3]}>
    <mesh position={[0, 0.4, 0]}>
      <cylinderGeometry args={[0.3, 0.35, 0.8]} />
      <meshStandardMaterial color="#8B4513" roughness={0.8} />
    </mesh>
    {/* Folhas da planta */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <mesh 
          key={i}
          position={[
            Math.cos(rad) * 0.4, 
            0.9 + Math.sin(i * 0.6) * 0.15, 
            Math.sin(rad) * 0.4
          ]}
          rotation={[0, rad, Math.PI/8]}
        >
          <boxGeometry args={[0.05, 0.6, 0.02]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
      );
    })}
  </group>
  
  <group position={[5, 0, -3]}>
    <mesh position={[0, 0.4, 0]}>
      <cylinderGeometry args={[0.25, 0.3, 0.8]} />
      <meshStandardMaterial color="#8B4513" roughness={0.8} />
    </mesh>
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <mesh 
          key={i}
          position={[
            Math.cos(rad) * 0.3, 
            0.8 + Math.sin(i * 0.8) * 0.1, 
            Math.sin(rad) * 0.3
          ]}
          rotation={[0, rad, Math.PI/10]}
        >
          <boxGeometry args={[0.04, 0.5, 0.02]} />
          <meshStandardMaterial color="#32CD32" />
        </mesh>
      );
    })}
  </group>

  {/* === SISTEMA DE ILUMINAÇÃO === */}
  <pointLight position={[0, 4, 0]} intensity={0.8} color="#FFFACD" />
  <pointLight position={[-3, 3, -2]} intensity={0.4} color="#F5DEB3" />
  <pointLight position={[3, 3, 2]} intensity={0.4} color="#F5DEB3" />
</group>

{/* ==================== REUNIÃO MÉDIA (Topo Direita - Azul Claro) ==================== */}
<group position={[10, 0, -8]}>
  {/* Piso azul claro */}
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
    <planeGeometry args={[8, 8]} />
    <meshStandardMaterial 
      color="#B0C4DE" 
      roughness={0.5} 
      metalness={0.2}
    />
  </mesh>
  
  {/* Padrão no piso */}
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
    <ringGeometry args={[3.5, 3.8, 32]} />
    <meshStandardMaterial color="#87CEEB" />
  </mesh>

  {/* === PAREDES PARCIAIS === */}
  {/* Parede traseira */}
  <mesh position={[0, 2, -4]}>
    <boxGeometry args={[8, 4, 0.3]} />
    <meshStandardMaterial color="#4682B4" />
  </mesh>
  
  {/* Parede lateral direita */}
  <mesh position={[4, 2, 0]}>
    <boxGeometry args={[0.3, 4, 6]} />
    <meshStandardMaterial color="#4682B4" />
  </mesh>

  {/* === LETREIRO "REUNIÃO MÉDIA" === */}
  <group position={[0, 3.8, -3.85]}>
    <mesh>
      <boxGeometry args={[3.5, 0.8, 0.1]} />
      <meshStandardMaterial color="#2F4F4F" />
    </mesh>
    <mesh position={[0, 0, 0.06]}>
      <boxGeometry args={[3.3, 0.6, 0.02]} />
      <meshStandardMaterial 
        color="#87CEEB" 
        emissive="#87CEEB" 
        emissiveIntensity={0.4}
      />
    </mesh>
  </group>

  {/* === MESA OVAL CENTRAL === */}
  <group position={[0, 0, 0]}>
    {/* Tampo oval */}
    <mesh position={[0, 0.75, 0]} castShadow>
      <cylinderGeometry args={[2.5, 2.5, 0.12, 32]} />
      <meshStandardMaterial 
        color="#8B4513" 
        roughness={0.4} 
        metalness={0.1}
      />
    </mesh>
    
    {/* Borda decorativa */}
    <mesh position={[0, 0.76, 0]}>
      <cylinderGeometry args={[2.4, 2.4, 0.05, 32]} />
      <meshStandardMaterial color="#A0522D" />
    </mesh>
    
    {/* Base central da mesa */}
    <mesh position={[0, 0.375, 0]}>
      <cylinderGeometry args={[0.8, 1.2, 0.75]} />
      <meshStandardMaterial 
        color="#654321" 
        roughness={0.6}
      />
    </mesh>
    
    {/* Sistema de cabos central */}
    <mesh position={[0, 0.77, 0]}>
      <cylinderGeometry args={[0.3, 0.3, 0.02]} />
      <meshStandardMaterial color="#2F4F4F" metalness={0.8} />
    </mesh>
    
    {/* Tomadas distribuídas */}
    {[0, 90, 180, 270].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <mesh 
          key={i} 
          position={[Math.cos(rad) * 1.8, 0.78, Math.sin(rad) * 1.8]}
        >
          <boxGeometry args={[0.15, 0.02, 0.1]} />
          <meshStandardMaterial color="#1A1A1A" />
        </mesh>
      );
    })}
  </group>

  {/* === CADEIRAS CORRIGIDAS (8 CADEIRAS) === */}
  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
    const rad = (angle * Math.PI) / 180;
    return (
      <BlackMeetingChair
        key={i}
        position={[Math.cos(rad) * 3.8, 0, Math.sin(rad) * 3.8]}
        rotation={[0, rad, 0]} // ✅ Orientação correta para o centro
      />
    );
  })}


  {/* === MONITOR NA PAREDE === */}
  <group position={[0, 2.5, -3.8]}>
    <mesh>
      <boxGeometry args={[2.5, 1.5, 0.1]} />
      <meshStandardMaterial color="#000" />
    </mesh>
    <mesh position={[0, 0, 0.06]}>
      <boxGeometry args={[2.4, 1.4, 0.02]} />
      <meshStandardMaterial 
        color="#000033" 
        emissive="#6666FF" 
        emissiveIntensity={0.3}
      />
    </mesh>
  </group>

  {/* === QUADROS INFORMATIVOS === */}
  {[-2.5, 2.5].map((x, i) => (
    <group key={i} position={[x, 2, -3.8]}>
      <mesh>
        <boxGeometry args={[1.2, 1, 0.05]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[1.1, 0.9, 0.02]} />
        <meshStandardMaterial 
          color="#F0F0F0"
          emissive={i === 0 ? "#FFE4B5" : "#E6E6FA"}
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  ))}

  {/* === PLANTA DECORATIVA === */}
  <group position={[3.5, 0, 3.5]}>
    <mesh position={[0, 0.3, 0]}>
      <cylinderGeometry args={[0.25, 0.3, 0.6]} />
      <meshStandardMaterial color="#4682B4" roughness={0.6} />
    </mesh>
    {[0, 72, 144, 216, 288].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <mesh 
          key={i}
          position={[
            Math.cos(rad) * 0.25, 
            0.7 + Math.sin(i * 0.9) * 0.1, 
            Math.sin(rad) * 0.25
          ]}
          rotation={[0, rad, Math.PI/12]}
        >
          <boxGeometry args={[0.03, 0.4, 0.015]} />
          <meshStandardMaterial color="#4169E1" />
        </mesh>
      );
    })}
  </group>

  {/* === PROJETOR NO TETO === */}
  <mesh position={[0, 3.5, -1]} castShadow>
    <boxGeometry args={[0.6, 0.3, 0.8]} />
    <meshStandardMaterial color="#2F2F2F" metalness={0.7} />
  </mesh>
  
  {/* Lente do projetor */}
  <mesh position={[0, 3.35, -0.6]}>
    <cylinderGeometry args={[0.1, 0.1, 0.05]} />
    <meshStandardMaterial 
      color="#000080" 
      emissive="#0066FF" 
      emissiveIntensity={0.6}
    />
  </mesh>

  {/* === ILUMINAÇÃO ESPECÍFICA === */}
  <pointLight position={[0, 4, 0]} intensity={0.6} color="#B0E0E6" />
  <pointLight position={[0, 3, -1]} intensity={0.3} color="#FFFFFF" />
</group>


{/* ==================== SALA DEVOPS PREMIUM (Centro Direita - Azul Tech) ==================== */}
<group position={[8, 0, 0]}>
  {/* Piso técnico elevado com padrão de grade */}
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
    <planeGeometry args={[8, 8]} />
    <meshStandardMaterial 
      color="#E6F3FF" 
      roughness={0.1} 
      metalness={0.3}
    />
  </mesh>
  
  {/* Padrão de grade no piso técnico */}
  {Array.from({length: 9}, (_, i) => (
    <mesh key={`grid-h-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -4 + i]}>
      <planeGeometry args={[8, 0.05]} />
      <meshStandardMaterial color="#B8D4F0" />
    </mesh>
  ))}
  {Array.from({length: 9}, (_, i) => (
    <mesh key={`grid-v-${i}`} rotation={[-Math.PI / 2, 0, Math.PI/2]} position={[-4 + i, 0.02, 0]}>
      <planeGeometry args={[8, 0.05]} />
      <meshStandardMaterial color="#B8D4F0" />
    </mesh>
  ))}

  {/* === PAREDES TÉCNICAS === */}
  {/* Parede lateral esquerda */}
  <mesh position={[-4, 2.5, 0]}>
    <boxGeometry args={[0.3, 5, 8]} />
    <meshStandardMaterial color="#2C5282" />
  </mesh>
  
  {/* Parede traseira */}
  <mesh position={[0, 2.5, -4]}>
    <boxGeometry args={[8, 5, 0.3]} />
    <meshStandardMaterial color="#2C5282" />
  </mesh>

  {/* === LETREIRO DEVOPS ILUMINADO === */}
  <group position={[0, 4.2, -3.85]}>
    <mesh>
      <boxGeometry args={[3, 1, 0.1]} />
      <meshStandardMaterial 
        color="#1A365D" 
        roughness={0.4}
      />
    </mesh>
    <mesh position={[0, 0, 0.06]}>
      <boxGeometry args={[2.8, 0.8, 0.02]} />
      <meshStandardMaterial 
        color="#00D4FF" 
        emissive="#00D4FF" 
        emissiveIntensity={0.5}
      />
    </mesh>
    {/* Luzes LED do letreiro */}
    {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
      <mesh key={i} position={[x, -0.6, 0.08]}>
        <sphereGeometry args={[0.04]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          emissive="#FFFFFF" 
          emissiveIntensity={0.8}
        />
      </mesh>
    ))}
  </group>

  {/* === RACKS DE SERVIDORES ULTRA DETALHADOS === */}
  {/* Rack Principal 1 */}
  <group position={[-2.5, 0, -2]}>
    {/* Estrutura do rack */}
    <mesh position={[0, 1.8, 0]} castShadow>
      <boxGeometry args={[0.8, 3.6, 1.2]} />
      <meshStandardMaterial 
        color="#1A1A1A" 
        metalness={0.8} 
        roughness={0.2}
      />
    </mesh>
    
    {/* Porta frontal de vidro */}
    <mesh position={[0, 1.8, 0.61]}>
      <boxGeometry args={[0.75, 3.5, 0.02]} />
      <meshStandardMaterial 
        color="#87CEEB" 
        transparent 
        opacity={0.3}
        metalness={0.1}
        roughness={0.1}
      />
    </mesh>
    
    {/* Moldura da porta */}
    <mesh position={[0, 1.8, 0.62]}>
      <boxGeometry args={[0.77, 3.52, 0.01]} />
      <meshStandardMaterial color="#333" />
    </mesh>
    
    {/* 20 Unidades de servidor (2U cada) */}
    {Array.from({length: 20}, (_, i) => (
      <group key={i} position={[0, 0.2 + (i * 0.18), 0]}>
        {/* Chassi do servidor */}
        <mesh position={[0, 0, 0.3]} castShadow>
          <boxGeometry args={[0.7, 0.15, 1]} />
          <meshStandardMaterial color="#2F4F4F" />
        </mesh>
        
        {/* Painel frontal */}
        <mesh position={[0, 0, 0.81]}>
          <boxGeometry args={[0.68, 0.13, 0.01]} />
          <meshStandardMaterial color="#4A4A4A" />
        </mesh>
        
        {/* LEDs de status (Verde, Amarelo, Vermelho) */}
        <mesh position={[-0.25, 0, 0.82]}>
          <sphereGeometry args={[0.015]} />
          <meshStandardMaterial 
            color="#00FF00" 
            emissive="#00FF00" 
            emissiveIntensity={0.6}
          />
        </mesh>
        <mesh position={[-0.2, 0, 0.82]}>
          <sphereGeometry args={[0.015]} />
          <meshStandardMaterial 
            color="#FFFF00" 
            emissive="#FFFF00" 
            emissiveIntensity={Math.sin(Date.now() * 0.01 + i) > 0 ? 0.6 : 0.1}
          />
        </mesh>
        <mesh position={[-0.15, 0, 0.82]}>
          <sphereGeometry args={[0.015]} />
          <meshStandardMaterial 
            color="#FF0000" 
            emissive="#FF0000" 
            emissiveIntensity={i % 7 === 0 ? 0.6 : 0.1}
          />
        </mesh>
        
        {/* Display LCD */}
        <mesh position={[0, 0, 0.82]}>
          <boxGeometry args={[0.2, 0.06, 0.005]} />
          <meshStandardMaterial 
            color="#000080" 
            emissive="#00FFFF" 
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Slots de ventilação */}
        {Array.from({length: 12}, (_, j) => (
          <mesh key={j} position={[0.15 + j * 0.03, 0, 0.82]}>
            <boxGeometry args={[0.015, 0.1, 0.002]} />
            <meshStandardMaterial color="#666" />
          </mesh>
        ))}
        
        {/* Conectores ethernet traseiros */}
        {Array.from({length: 4}, (_, j) => (
          <mesh key={j} position={[-0.2 + j * 0.1, 0, -0.49]}>
            <boxGeometry args={[0.08, 0.04, 0.02]} />
            <meshStandardMaterial color="#FFD700" metalness={0.8} />
          </mesh>
        ))}
      </group>
    ))}
    
    {/* Sistema de ventilação superior */}
    <group position={[0, 3.4, 0.4]}>
      {/* Ventiladores */}
      {[-0.2, 0.2].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.12, 0.12, 0.08]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          {/* Pás do ventilador */}
          {[0, 120, 240].map((angle, j) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <mesh 
                key={j} 
                position={[Math.cos(rad) * 0.06, 0, Math.sin(rad) * 0.06]}
                rotation={[0, rad + Date.now() * 0.01, 0]}
              >
                <boxGeometry args={[0.02, 0.04, 0.1]} />
                <meshStandardMaterial color="#666" />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  </group>

  {/* Rack Principal 2 */}
  <group position={[-0.5, 0, -2]}>
    {/* Estrutura similar ao Rack 1 */}
    <mesh position={[0, 1.8, 0]} castShadow>
      <boxGeometry args={[0.8, 3.6, 1.2]} />
      <meshStandardMaterial 
        color="#1A1A1A" 
        metalness={0.8} 
        roughness={0.2}
      />
    </mesh>
    
    <mesh position={[0, 1.8, 0.61]}>
      <boxGeometry args={[0.75, 3.5, 0.02]} />
      <meshStandardMaterial 
        color="#87CEEB" 
        transparent 
        opacity={0.3}
      />
    </mesh>
    
    {/* 18 Servidores com configuração diferente */}
    {Array.from({length: 18}, (_, i) => (
      <group key={i} position={[0, 0.3 + (i * 0.2), 0]}>
        <mesh position={[0, 0, 0.3]} castShadow>
          <boxGeometry args={[0.7, 0.17, 1]} />
          <meshStandardMaterial color="#2F4F4F" />
        </mesh>
        
        <mesh position={[0, 0, 0.81]}>
          <boxGeometry args={[0.68, 0.15, 0.01]} />
          <meshStandardMaterial color="#4A4A4A" />
        </mesh>
        
        {/* LEDs diferentes para variação */}
        {[-0.25, -0.2, -0.15].map((x, j) => (
          <mesh key={j} position={[x, 0, 0.82]}>
            <sphereGeometry args={[0.015]} />
            <meshStandardMaterial 
              color={j === 0 ? "#00FF00" : j === 1 ? "#0000FF" : "#FF00FF"} 
              emissive={j === 0 ? "#00FF00" : j === 1 ? "#0000FF" : "#FF00FF"} 
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>
    ))}
  </group>

  {/* Rack de Rede/Switch */}
  <group position={[1.5, 0, -2]}>
    <mesh position={[0, 1, 0]} castShadow>
      <boxGeometry args={[0.8, 2, 1.2]} />
      <meshStandardMaterial color="#1A1A1A" />
    </mesh>
    
    {/* Switches de rede */}
    {Array.from({length: 8}, (_, i) => (
      <group key={i} position={[0, 0.2 + (i * 0.22), 0]}>
        <mesh position={[0, 0, 0.3]}>
          <boxGeometry args={[0.7, 0.18, 1]} />
          <meshStandardMaterial color="#1E3A8A" />
        </mesh>
        
        {/* Painel frontal com portas */}
        <mesh position={[0, 0, 0.81]}>
          <boxGeometry args={[0.68, 0.16, 0.01]} />
          <meshStandardMaterial color="#2563EB" />
        </mesh>
        
        {/* Portas ethernet (24 portas) */}
        {Array.from({length: 24}, (_, j) => (
          <mesh key={j} position={[
            -0.3 + (j % 12) * 0.05, 
            j < 12 ? 0.04 : -0.04, 
            0.82
          ]}>
            <boxGeometry args={[0.04, 0.025, 0.01]} />
            <meshStandardMaterial 
              color="#FFD700" 
              metalness={0.8}
              emissive={Math.random() > 0.7 ? "#00FF00" : "#000000"}
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>
    ))}
  </group>

  {/* === ESTAÇÃO DE MONITORAMENTO PRINCIPAL === */}
  <group position={[2.5, 0, 1.5]}>
    {/* Mesa de controle em formato L */}
    <mesh position={[0, 0.8, 0]} castShadow>
      <boxGeometry args={[2.5, 0.1, 1.5]} />
      <meshStandardMaterial 
        color="#1F2937" 
        roughness={0.3} 
        metalness={0.7}
      />
    </mesh>
    
    {/* Extensão da mesa */}
    <mesh position={[-1, 0.8, -1]} castShadow>
      <boxGeometry args={[1, 0.1, 1]} />
      <meshStandardMaterial 
        color="#1F2937" 
        roughness={0.3} 
        metalness={0.7}
      />
    </mesh>
    
    {/* === ARRAY DE 6 MONITORES === */}
    {/* Fileira superior */}
    {[-0.8, 0, 0.8].map((x, i) => (
      <group key={`top-${i}`} position={[x, 2.2, -0.5]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.45, 0.08]} />
          <meshStandardMaterial color="#000" />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.65, 0.4, 0.02]} />
          <meshStandardMaterial 
            color={i === 0 ? "#001122" : i === 1 ? "#220011" : "#112200"} 
            emissive={i === 0 ? "#00AAFF" : i === 1 ? "#FF0066" : "#00FF44"} 
            emissiveIntensity={0.4}
          />
        </mesh>
        {/* Suporte do monitor */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.4]} />
          <meshStandardMaterial color="#333" metalness={0.8} />
        </mesh>
      </group>
    ))}
    
    {/* Fileira inferior */}
    {[-0.8, 0, 0.8].map((x, i) => (
      <group key={`bottom-${i}`} position={[x, 1.6, -0.5]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.45, 0.08]} />
          <meshStandardMaterial color="#000" />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.65, 0.4, 0.02]} />
          <meshStandardMaterial 
            color="#001100" 
            emissive={i === 0 ? "#FFFF00" : i === 1 ? "#FF6600" : "#6600FF"} 
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.4]} />
          <meshStandardMaterial color="#333" metalness={0.8} />
        </mesh>
      </group>
    ))}
    
    {/* === EQUIPAMENTOS DE CONTROLE === */}
    {/* Teclado mecânico */}
    <group position={[0, 0.85, 0.4]}>
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.04, 0.35]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>
      {/* Teclas RGB */}
      {Array.from({length: 60}, (_, i) => (
        <mesh 
          key={i} 
          position={[
            -0.4 + (i % 15) * 0.055, 
            0.025, 
            -0.12 + Math.floor(i / 15) * 0.06
          ]}
        >
          <boxGeometry args={[0.05, 0.015, 0.05]} />
          <meshStandardMaterial 
            color="#2A2A2A"
            emissive={`hsl(${(i * 17) % 360}, 70%, 50%)`}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
    
    {/* Mouse gaming */}
    <mesh position={[0.6, 0.82, 0.3]} castShadow>
      <boxGeometry args={[0.12, 0.02, 0.2]} />
      <meshStandardMaterial 
        color="#000" 
        emissive="#FF0000" 
        emissiveIntensity={0.1}
      />
    </mesh>
    
    {/* Mousepad RGB */}
    <mesh position={[0.6, 0.81, 0.3]}>
      <boxGeometry args={[0.4, 0.01, 0.3]} />
      <meshStandardMaterial 
        color="#1A1A1A"
        emissive="#00FFFF"
        emissiveIntensity={0.1}
      />
    </mesh>
    
    {/* Tablet de controle */}
    <mesh position={[-0.8, 0.82, 0.2]} rotation={[0, 0.3, 0]} castShadow>
      <boxGeometry args={[0.25, 0.02, 0.35]} />
      <meshStandardMaterial 
        color="#2A2A2A"
        emissive="#0066FF"
        emissiveIntensity={0.2}
      />
    </mesh>
    
    {/* Fones de ouvido profissionais */}
    <group position={[-0.3, 1.1, 0.6]}>
      <mesh>
        <torusGeometry args={[0.12, 0.02, 8, 16]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>
      {/* Fones */}
      {[-0.12, 0.12].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <sphereGeometry args={[0.06]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      ))}
    </group>
  </group>

  {/* === CADEIRA ERGONÔMICA DEVOPS === */}
  <group position={[2.5, 0, 2.8]}>
    {/* Base com rodas premium */}
    <group position={[0, 0.12, 0]}>
      <mesh>
        <cylinderGeometry args={[0.25, 0.25, 0.15]} />
        <meshStandardMaterial 
          color="#1A1A1A" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <group key={i} rotation={[0, rad, 0]}>
            <mesh position={[0, 0, 0.5]}>
              <boxGeometry args={[0.1, 0.08, 1]} />
              <meshStandardMaterial color="#333" metalness={0.8} />
            </mesh>
            <mesh position={[0, -0.06, 1]} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.06]} />
              <meshStandardMaterial color="#FF6600" />
            </mesh>
          </group>
        );
      })}
    </group>
    
    {/* Coluna pneumática */}
    <mesh position={[0, 0.6, 0]}>
      <cylinderGeometry args={[0.06, 0.08, 0.8]} />
      <meshStandardMaterial color="#333" metalness={0.8} />
    </mesh>
    
    {/* Assento gaming */}
    <mesh position={[0, 1.05, 0]} castShadow>
      <boxGeometry args={[1, 0.25, 1]} />
      <meshStandardMaterial color="#1A1A1A" />
    </mesh>
    
    {/* Detalhes do assento */}
    <mesh position={[0, 1.06, 0]}>
      <boxGeometry args={[0.9, 0.02, 0.9]} />
      <meshStandardMaterial color="#FF6600" />
    </mesh>
    
    {/* Encosto alto */}
    <mesh position={[0, 1.8, -0.45]} castShadow>
      <boxGeometry args={[1, 1.6, 0.25]} />
      <meshStandardMaterial color="#1A1A1A" />
    </mesh>
    
    {/* Detalhes do encosto */}
    <mesh position={[0, 1.8, -0.4]}>
      <boxGeometry args={[0.9, 1.5, 0.02]} />
      <meshStandardMaterial color="#FF6600" />
    </mesh>
    
    {/* Braços ajustáveis */}
    {[-0.6, 0.6].map((x, i) => (
      <group key={i} position={[x, 1.2, 0]}>
        <mesh position={[0, 0, -0.3]}>
          <boxGeometry args={[0.08, 0.8, 0.08]} />
          <meshStandardMaterial color="#333" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.15, 0.08, 0.5]} />
          <meshStandardMaterial color="#1A1A1A" />
        </mesh>
        <mesh position={[0, 0.39, 0]}>
          <boxGeometry args={[0.12, 0.04, 0.45]} />
          <meshStandardMaterial color="#FF6600" />
        </mesh>
      </group>
    ))}
  </group>

  {/* === SISTEMA DE REFRIGERAÇÃO === */}
  <group position={[-3, 0, 2]}>
    {/* Unidade de ar condicionado */}
    <mesh position={[0, 1.5, 0]} castShadow>
      <boxGeometry args={[1.5, 3, 1]} />
      <meshStandardMaterial color="#E5E7EB" />
    </mesh>
    
    {/* Painel de controle */}
    <mesh position={[0, 2, 0.51]}>
      <boxGeometry args={[0.8, 0.6, 0.02]} />
      <meshStandardMaterial 
        color="#1F2937"
        emissive="#00FF00"
        emissiveIntensity={0.2}
      />
    </mesh>
    
    {/* Ventiladores de refrigeração */}
    {[-0.3, 0.3].map((x, i) => (
      <group key={i} position={[x, 1, 0.52]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.1]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        {/* Pás rotativas */}
        {[0, 90, 180, 270].map((angle, j) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <mesh 
              key={j} 
              position={[Math.cos(rad) * 0.1, 0, Math.sin(rad) * 0.1]}
              rotation={[0, rad + Date.now() * 0.02, 0]}
            >
              <boxGeometry args={[0.02, 0.05, 0.15]} />
              <meshStandardMaterial color="#6B7280" />
            </mesh>
          );
        })}
      </group>
    ))}
  </group>

  {/* === QUADRO DE DISTRIBUIÇÃO ELÉTRICA === */}
  <group position={[-3.8, 2, 0]}>
    <mesh>
      <boxGeometry args={[0.1, 2, 1.5]} />
      <meshStandardMaterial color="#374151" />
    </mesh>
    
    {/* Disjuntores */}
    {Array.from({length: 12}, (_, i) => (
      <mesh key={i} position={[0.06, 0.8 - (i % 6) * 0.25, -0.6 + Math.floor(i / 6) * 1.2]}>
        <boxGeometry args={[0.02, 0.15, 0.1]} />
        <meshStandardMaterial 
          color={i % 3 === 0 ? "#EF4444" : "#10B981"}
          emissive={i % 3 === 0 ? "#EF4444" : "#10B981"}
          emissiveIntensity={0.2}
        />
      </mesh>
    ))}
  </group>

  {/* === CABOS E INFRAESTRUTURA === */}
  {/* Calhas de cabos no teto */}
  <group position={[0, 4.8, 0]}>
    {[-2, 0, 2].map((x, i) => (
      <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.2, 0.2, 8]} />
        <meshStandardMaterial color="#6B7280" metalness={0.7} />
      </mesh>
    ))}
  </group>
  
  {/* Cabos de rede descendo dos racks */}
  {[-2.5, -0.5, 1.5].map((x, i) => (
    <group key={i} position={[x, 2, -2]}>
      {Array.from({length: 8}, (_, j) => (
        <mesh key={j} position={[j * 0.05 - 0.175, -j * 0.1, 0]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.01, 0.01, 1 + j * 0.1]} />
          <meshStandardMaterial color={`hsl(${j * 45}, 70%, 50%)`} />
        </mesh>
      ))}
    </group>
  ))}

  {/* === PLANTAS TÉCNICAS === */}
  <group position={[3.5, 0, -3.5]}>
    <mesh position={[0, 0.3, 0]}>
      <cylinderGeometry args={[0.2, 0.25, 0.6]} />
      <meshStandardMaterial color="#374151" metalness={0.3} />
    </mesh>
    {/* Planta resistente a ambiente técnico */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <mesh 
          key={i}
          position={[
            Math.cos(rad) * 0.25, 
            0.7 + Math.sin(i * 0.8) * 0.1, 
            Math.sin(rad) * 0.25
          ]}
          rotation={[0, rad, Math.PI/12]}
        >
          <boxGeometry args={[0.03, 0.4, 0.015]} />
          <meshStandardMaterial color="#059669" />
        </mesh>
      );
    })}
  </group>

    {/* === EXTINTOR DE INCÊNDIO === */}
    <group position={[-3.8, 1, -3.8]}>
      <mesh>
        <cylinderGeometry args={[0.15, 0.15, 1.2]} />
        <meshStandardMaterial color="#DC2626" />
      </mesh>
      <mesh position={[ 0, 0.6, 0]}>  
        <boxGeometry args={[0.3, 0.6, 0.3]} />
        <meshStandardMaterial color="#B91C1C" />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.4, 0.2, 0.4]} />
        <meshStandardMaterial color="#DC2626" />
      </mesh>
    </group>
  </group>



{/* ==================== SALA DE CONTROLE PREMIUM (Baixo Esquerda - Azul Tech) ==================== */}
<group position={[-10, 0, 8]}>
  {/* Piso técnico azul com padrão */}
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
    <planeGeometry args={[8, 8]} />
    <meshStandardMaterial 
      color="#ADD8E6" 
      roughness={0.3} 
      metalness={0.4}
    />
  </mesh>
  
  {/* Padrão técnico no piso */}
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
    <planeGeometry args={[7.8, 7.8]} />
    <meshStandardMaterial color="#87CEEB" />
  </mesh>

  {/* === PAREDES TÉCNICAS === */}
  {/* Parede traseira principal */}
  <mesh position={[0, 2.5, -4]}>
    <boxGeometry args={[8, 5, 0.3]} />
    <meshStandardMaterial color="#4682B4" roughness={0.6} />
  </mesh>
  
  {/* Parede lateral esquerda */}
  <mesh position={[-4, 2, 0]}>
    <boxGeometry args={[0.3, 4, 6]} />
    <meshStandardMaterial color="#4682B4" />
  </mesh>
  
  {/* Parede lateral direita (parcial) */}
  <mesh position={[4, 2, 2]}>
    <boxGeometry args={[0.3, 4, 4]} />
    <meshStandardMaterial color="#4682B4" />
  </mesh>

  {/* === LETREIRO "SALA DE CONTROLE" === */}
  <group position={[0, 4.2, -3.85]}>
    <mesh>
      <boxGeometry args={[5, 1, 0.1]} />
      <meshStandardMaterial 
        color="#2F4F4F" 
        roughness={0.4}
      />
    </mesh>
    <mesh position={[0, 0, 0.06]}>
      <boxGeometry args={[4.8, 0.8, 0.02]} />
      <meshStandardMaterial 
        color="#00FFFF" 
        emissive="#00FFFF" 
        emissiveIntensity={0.5}
      />
    </mesh>
    {/* Luzes LED do letreiro */}
    {[-2, -1, 0, 1, 2].map((x, i) => (
      <mesh key={i} position={[x, -0.6, 0.08]}>
        <sphereGeometry args={[0.04]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          emissive="#FFFFFF" 
          emissiveIntensity={0.8}
        />
      </mesh>
    ))}
  </group>

  {/* === CONSOLE DE CONTROLE EM U === */}
  <group position={[0, 0, 0]}>
    {/* Seção central do console */}
    <mesh position={[0, 0.8, -1.5]} castShadow>
      <boxGeometry args={[4, 0.15, 1.2]} />
      <meshStandardMaterial 
        color="#2F4F4F" 
        roughness={0.3} 
        metalness={0.7}
      />
    </mesh>
    
    {/* Braço esquerdo do console */}
    <mesh position={[-2.5, 0.8, -0.5]} castShadow>
      <boxGeometry args={[1.5, 0.15, 1]} />
      <meshStandardMaterial 
        color="#2F4F4F" 
        roughness={0.3} 
        metalness={0.7}
      />
    </mesh>
    
    {/* Braço direito do console */}
    <mesh position={[2.5, 0.8, -0.5]} castShadow>
      <boxGeometry args={[1.5, 0.15, 1]} />
      <meshStandardMaterial 
        color="#2F4F4F" 
        roughness={0.3} 
        metalness={0.7}
      />
    </mesh>
    
    {/* Painel de controle integrado */}
    <mesh position={[0, 0.82, -1.5]}>
      <boxGeometry args={[3.8, 0.02, 1]} />
      <meshStandardMaterial 
        color="#1A1A1A"
        emissive="#00FF00"
        emissiveIntensity={0.2}
      />
    </mesh>
    
    {/* Botões de controle */}
    {Array.from({length: 20}, (_, i) => (
      <mesh 
        key={i} 
        position={[
          -1.8 + (i % 5) * 0.9, 
          0.84, 
          -1.8 + Math.floor(i / 5) * 0.3
        ]}
      >
        <cylinderGeometry args={[0.04, 0.04, 0.02]} />
        <meshStandardMaterial 
          color={i % 3 === 0 ? "#FF0000" : i % 3 === 1 ? "#00FF00" : "#0000FF"}
          emissive={i % 3 === 0 ? "#FF0000" : i % 3 === 1 ? "#00FF00" : "#0000FF"}
          emissiveIntensity={0.4}
        />
      </mesh>
    ))}
  </group>

  {/* === WALL DE MONITORES (Parede Traseira) === */}
  {/* Fileira superior de monitores */}
  {[-2.5, -0.8, 0.8, 2.5].map((x, i) => (
    <group key={`top-${i}`} position={[x, 3, -3.8]}>
      <mesh>
        <boxGeometry args={[1.4, 1, 0.1]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[1.35, 0.95, 0.02]} />
        <meshStandardMaterial 
          color="#001122" 
          emissive={i === 0 ? "#00FF00" : i === 1 ? "#FF0000" : i === 2 ? "#0000FF" : "#FFFF00"} 
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* Moldura do monitor */}
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[1.5, 1.1, 0.05]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  ))}
  
  {/* Fileira inferior de monitores */}
  {[-2.5, -0.8, 0.8, 2.5].map((x, i) => (
    <group key={`bottom-${i}`} position={[x, 1.8, -3.8]}>
      <mesh>
        <boxGeometry args={[1.4, 1, 0.1]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[1.35, 0.95, 0.02]} />
        <meshStandardMaterial 
          color="#220011" 
          emissive={i === 0 ? "#FF6600" : i === 1 ? "#00FFFF" : i === 2 ? "#FF00FF" : "#00FF44"} 
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[1.5, 1.1, 0.05]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  ))}

  {/* === MONITOR PRINCIPAL CENTRAL === */}
  <group position={[0, 2.5, -3.8]}>
    <mesh>
      <boxGeometry args={[2.5, 1.8, 0.12]} />
      <meshStandardMaterial color="#000" />
    </mesh>
    <mesh position={[0, 0, 0.07]}>
      <boxGeometry args={[2.4, 1.7, 0.02]} />
      <meshStandardMaterial 
        color="#000033" 
        emissive="#00AAFF" 
        emissiveIntensity={0.5}
      />
    </mesh>
    {/* Moldura premium */}
    <mesh position={[0, 0, 0.08]}>
      <boxGeometry args={[2.6, 1.9, 0.08]} />
      <meshStandardMaterial 
        color="#FFD700" 
        metalness={0.9} 
        roughness={0.1}
      />
    </mesh>
  </group>

  {/* === MONITORES LATERAIS === */}
  {/* Monitor lateral esquerdo */}
  <group position={[-3.8, 2, -1]}>
    <mesh>
      <boxGeometry args={[0.1, 1.2, 1.8]} />
      <meshStandardMaterial color="#000" />
    </mesh>
    <mesh position={[0.06, 0, 0]}>
      <boxGeometry args={[0.02, 1.1, 1.7]} />
      <meshStandardMaterial 
        color="#001100" 
        emissive="#00FF44" 
        emissiveIntensity={0.3}
      />
    </mesh>
  </group>
  
  {/* Monitor lateral direito */}
  <group position={[3.8, 2, 1]}>
    <mesh>
      <boxGeometry args={[0.1, 1.2, 1.8]} />
      <meshStandardMaterial color="#000" />
    </mesh>
    <mesh position={[-0.06, 0, 0]}>
      <boxGeometry args={[0.02, 1.1, 1.7]} />
      <meshStandardMaterial 
        color="#110000" 
        emissive="#FF4444" 
        emissiveIntensity={0.3}
      />
    </mesh>
  </group>

  {/* === ESTAÇÕES DE OPERAÇÃO === */}
  {/* Estação operador principal */}
  <group position={[0, 0, 0.5]}>
    {/* Teclado principal */}
    <mesh position={[0, 0.82, 0]} castShadow>
      <boxGeometry args={[0.8, 0.03, 0.3]} />
      <meshStandardMaterial color="#1A1A1A" />
    </mesh>
    
    {/* Teclas */}
    {Array.from({length: 40}, (_, i) => (
      <mesh 
        key={i} 
        position={[
          -0.35 + (i % 10) * 0.07, 
          0.835, 
          -0.1 + Math.floor(i / 10) * 0.05
        ]}
      >
        <boxGeometry args={[0.06, 0.01, 0.04]} />
        <meshStandardMaterial 
          color="#333"
          emissive="#0066FF"
          emissiveIntensity={0.1}
        />
      </mesh>
    ))}
    
    {/* Mouse */}
    <mesh position={[0.5, 0.82, 0.2]} castShadow>
      <boxGeometry args={[0.1, 0.015, 0.15]} />
      <meshStandardMaterial 
        color="#000" 
        emissive="#FF0000" 
        emissiveIntensity={0.1}
      />
    </mesh>
    
    {/* Mousepad */}
    <mesh position={[0.5, 0.815, 0.2]}>
      <boxGeometry args={[0.3, 0.005, 0.25]} />
      <meshStandardMaterial color="#0066FF" />
    </mesh>
  </group>
  
  {/* Estações laterais */}
  {[-2.5, 2.5].map((x, i) => (
    <group key={i} position={[x, 0, -0.5]}>
      <mesh position={[0, 0.82, 0]} castShadow>
        <boxGeometry args={[0.6, 0.03, 0.25]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>
      
      {/* Teclado compacto */}
      {Array.from({length: 20}, (_, j) => (
        <mesh 
          key={j} 
          position={[
            -0.25 + (j % 5) * 0.1, 
            0.835, 
            -0.08 + Math.floor(j / 5) * 0.04
          ]}
        >
          <boxGeometry args={[0.08, 0.01, 0.03]} />
          <meshStandardMaterial 
            color="#444"
            emissive="#00FF00"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  ))}

  {/* === CADEIRAS TÉCNICAS === */}
  {/* Cadeira principal */}
  <group position={[0, 0, 2]}>
    {/* Base com rodas */}
    <group position={[0, 0.12, 0]}>
      <mesh>
        <cylinderGeometry args={[0.25, 0.25, 0.15]} />
        <meshStandardMaterial 
          color="#2F4F4F" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <group key={i} rotation={[0, rad, 0]}>
            <mesh position={[0, 0, 0.5]}>
              <boxGeometry args={[0.1, 0.08, 1]} />
              <meshStandardMaterial color="#4682B4" metalness={0.8} />
            </mesh>
            <mesh position={[0, -0.06, 1]} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.06]} />
              <meshStandardMaterial color="#00FFFF" />
            </mesh>
          </group>
        );
      })}
    </group>
    
    {/* Coluna pneumática */}
    <mesh position={[0, 0.6, 0]}>
      <cylinderGeometry args={[0.06, 0.08, 0.8]} />
      <meshStandardMaterial 
        color="#4682B4" 
        metalness={0.8} 
        roughness={0.2}
      />
    </mesh>
    
    {/* Assento técnico */}
    <mesh position={[0, 1.05, 0]} castShadow>
      <boxGeometry args={[1, 0.25, 1]} />
      <meshStandardMaterial color="#2F4F4F" />
    </mesh>
    
    {/* Detalhes do assento */}
    <mesh position={[0, 1.06, 0]}>
      <boxGeometry args={[0.9, 0.02, 0.9]} />
      <meshStandardMaterial color="#00FFFF" />
    </mesh>
    
    {/* Encosto alto */}
    <mesh position={[0, 1.8, -0.45]} castShadow>
      <boxGeometry args={[1, 1.6, 0.25]} />
      <meshStandardMaterial color="#2F4F4F" />
    </mesh>
    
    {/* Logo técnico no encosto */}
    <mesh position={[0, 1.8, -0.4]}>
      <boxGeometry args={[0.3, 0.3, 0.02]} />
      <meshStandardMaterial 
        color="#00FFFF" 
        emissive="#00FFFF" 
        emissiveIntensity={0.3}
      />
    </mesh>
    
    {/* Braços ajustáveis */}
    {[-0.6, 0.6].map((x, i) => (
      <group key={i} position={[x, 1.2, 0]}>
        <mesh position={[0, 0, -0.3]}>
          <boxGeometry args={[0.08, 0.8, 0.08]} />
          <meshStandardMaterial color="#4682B4" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.15, 0.08, 0.5]} />
          <meshStandardMaterial color="#2F4F4F" />
        </mesh>
        <mesh position={[0, 0.39, 0]}>
          <boxGeometry args={[0.12, 0.04, 0.45]} />
          <meshStandardMaterial color="#00FFFF" />
        </mesh>
      </group>
    ))}
  </group>

  {/* Cadeiras laterais */}
  {[-2.5, 2.5].map((x, i) => (
    <group key={i} position={[x, 0, 1.5]}>
      {/* Versão simplificada da cadeira principal */}
      <group position={[0, 0.12, 0]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.12]} />
          <meshStandardMaterial color="#4682B4" metalness={0.7} />
        </mesh>
        
        {[0, 120, 240].map((angle, j) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <group key={j} rotation={[0, rad, 0]}>
              <mesh position={[0, 0, 0.4]}>
                <boxGeometry args={[0.08, 0.06, 0.8]} />
                <meshStandardMaterial color="#4682B4" />
              </mesh>
              <mesh position={[0, -0.05, 0.8]} rotation={[Math.PI/2, 0, 0]}>
                <cylinderGeometry args={[0.06, 0.06, 0.04]} />
                <meshStandardMaterial color="#00FFFF" />
              </mesh>
            </group>
          );
        })}
      </group>
      
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.6]} />
        <meshStandardMaterial color="#4682B4" metalness={0.8} />
      </mesh>
      
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[0.8, 0.2, 0.8]} />
        <meshStandardMaterial color="#2F4F4F" />
      </mesh>
      
      <mesh position={[0, 1.5, -0.35]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.2]} />
        <meshStandardMaterial color="#2F4F4F" />
      </mesh>
    </group>
  ))}

  {/* === EQUIPAMENTOS TÉCNICOS === */}
  {/* Servidor de monitoramento */}
  <group position={[3, 0, -3]}>
    <mesh position={[0, 1, 0]} castShadow>
      <boxGeometry args={[0.8, 2, 0.6]} />
      <meshStandardMaterial color="#1A1A1A" />
    </mesh>
    
    {/* LEDs de status */}
    {Array.from({length: 8}, (_, i) => (
      <mesh key={i} position={[0, 0.3 + i * 0.2, 0.31]}>
        <sphereGeometry args={[0.02]} />
        <meshStandardMaterial 
          color={i % 2 === 0 ? "#00FF00" : "#FF0000"}
          emissive={i % 2 === 0 ? "#00FF00" : "#FF0000"}
          emissiveIntensity={0.6}
        />
      </mesh>
    ))}
    
    {/* Ventilador */}
    <group position={[0, 1.8, 0.31]}>
      <mesh>
        <cylinderGeometry args={[0.15, 0.15, 0.05]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Pás do ventilador */}
      {[0, 90, 180, 270].map((angle, j) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <mesh 
            key={j} 
            position={[Math.cos(rad) * 0.08, 0, Math.sin(rad) * 0.08]}
            rotation={[0, rad + Date.now() * 0.01, 0]}
          >
            <boxGeometry args={[0.02, 0.03, 0.12]} />
            <meshStandardMaterial color="#666" />
          </mesh>
        );
      })}
    </group>
  </group>

  {/* === SISTEMA DE REFRIGERAÇÃO === */}
  <group position={[-3, 0, 3]}>
    <mesh position={[0, 1.2, 0]} castShadow>
      <boxGeometry args={[1, 2.4, 0.8]} />
      <meshStandardMaterial color="#E5E7EB" />
    </mesh>
    
    {/* Painel de controle da refrigeração */}
    <mesh position={[0, 1.5, 0.41]}>
      <boxGeometry args={[0.6, 0.4, 0.02]} />
      <meshStandardMaterial 
        color="#00FFFF"
        emissive="#00FFFF"
        emissiveIntensity={0.3}
      />
    </mesh>
    
    {/* Ventiladores de refrigeração */}
    {[-0.2, 0.2].map((x, i) => (
      <group key={i} position={[x, 0.8, 0.42]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.08]} />
          <meshStandardMaterial color="#4682B4" />
        </mesh>
        {[0, 120, 240].map((angle, j) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <mesh 
              key={j} 
              position={[Math.cos(rad) * 0.08, 0, Math.sin(rad) * 0.08]}
              rotation={[0, rad + Date.now() * 0.015, 0]}
            >
              <boxGeometry args={[0.015, 0.04, 0.1]} />
              <meshStandardMaterial color="#87CEEB" />
            </mesh>
          );
        })}
      </group>
    ))}
  </group>

  {/* === PLANTA TÉCNICA === */}
  <group position={[3.5, 0, 3.5]}>
    <mesh position={[0, 0.3, 0]}>
      <cylinderGeometry args={[0.2, 0.25, 0.6]} />
      <meshStandardMaterial 
        color="#4682B4" 
        metalness={0.3} 
        roughness={0.7}
      />
    </mesh>
    {/* Planta resistente a ambiente técnico */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <mesh 
          key={i}
          position={[
            Math.cos(rad) * 0.22, 
            0.7 + Math.sin(i * 0.8) * 0.1, 
            Math.sin(rad) * 0.22
          ]}
          rotation={[0, rad, Math.PI/12]}
        >
          <boxGeometry args={[0.025, 0.35, 0.012]} />
          <meshStandardMaterial color="#00FF88" />
        </mesh>
      );
    })}
  </group>

  {/* === ILUMINAÇÃO TÉCNICA === */}
  <pointLight position={[0, 4, 0]} intensity={0.8} color="#87CEEB" />
  <pointLight position={[-2, 3, -2]} intensity={0.4} color="#00FFFF" />
  <pointLight position={[2, 3, 2]} intensity={0.4} color="#4682B4" />
  
  {/* Luzes de emergência */}
  {[[-3.5, 3.5, -3.5], [3.5, 3.5, 3.5]].map(([x, y, z], i) => (
    <group key={i} position={[x, y, z]}>
      <mesh>
        <boxGeometry args={[0.3, 0.15, 0.2]} />
        <meshStandardMaterial 
          color="#FF0000"
          emissive="#FF0000"
          emissiveIntensity={0.2}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={0.2} color="#FF0000" />
    </group>
  ))}
</group>
{/* ==================== SALA DE DESIGNER PREMIUM (Posição Personalizada - Rosa Criativo) ==================== */}
    <group position={[6, 0, 8]}>
      {/* Piso rosa criativo com padrão */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial 
          color="#FFB6C1" 
          roughness={0.6} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Padrão decorativo no piso */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[3.5, 3.8, 32]} />
        <meshStandardMaterial color="#FF69B4" />
      </mesh>

      {/* === PAREDES CRIATIVAS === */}
      {/* Parede traseira */}
      <mesh position={[0, 2.5, -4]}>
        <boxGeometry args={[8, 5, 0.3]} />
        <meshStandardMaterial color="#DDA0DD" />
      </mesh>
      
      {/* Parede lateral esquerda */}
      <mesh position={[-4, 2.5, 0]}>
        <boxGeometry args={[0.3, 5, 8]} />
        <meshStandardMaterial color="#DDA0DD" />
      </mesh>

      {/* === LETREIRO DESIGNER ILUMINADO === */}
      <group position={[0, 4.2, -3.85]}>
        <mesh>
          <boxGeometry args={[4, 1.2, 0.1]} />
          <meshStandardMaterial 
            color="#8A2BE2" 
            roughness={0.4}
          />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[3.8, 1, 0.02]} />
          <meshStandardMaterial 
            color="#FF1493" 
            emissive="#FF1493" 
            emissiveIntensity={0.5}
          />
        </mesh>
        {/* Luzes LED do letreiro */}
        {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
          <mesh key={i} position={[x, -0.7, 0.08]}>
            <sphereGeometry args={[0.04]} />
            <meshStandardMaterial 
              color="#FFFFFF" 
              emissive="#FFFFFF" 
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* === ESTAÇÃO DE DESIGN PRINCIPAL === */}
      <group position={[-1.5, 0, -1]}>
        {/* Mesa em formato L */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[2.5, 0.1, 1.8]} />
          <meshStandardMaterial 
            color="#F5F5DC" 
            roughness={0.4} 
            metalness={0.1}
          />
        </mesh>
        
        {/* Extensão da mesa */}
        <mesh position={[1.5, 0.8, 1]} castShadow>
          <boxGeometry args={[1.5, 0.1, 1.2]} />
          <meshStandardMaterial 
            color="#F5F5DC" 
            roughness={0.4} 
            metalness={0.1}
          />
        </mesh>

        {/* === MONITOR PRINCIPAL PARA DESIGN === */}
        <group position={[0, 1.8, -0.7]}>
          <mesh castShadow>
            <boxGeometry args={[1.8, 1.2, 0.08]} />
            <meshStandardMaterial color="#000" />
          </mesh>
          
          {/* Tela com paleta de cores */}
          <mesh position={[0, 0, 0.05]}>
            <boxGeometry args={[1.75, 1.15, 0.02]} />
            <meshStandardMaterial 
              color="#2A2A2A" 
              emissive="#FF6B35" 
              emissiveIntensity={0.3}
            />
          </mesh>
          
          {/* Simulação de paleta de cores na tela */}
          {[
            [-0.6, 0.3, '#FF0000'], [-0.3, 0.3, '#00FF00'], [0, 0.3, '#0000FF'],
            [0.3, 0.3, '#FFFF00'], [0.6, 0.3, '#FF00FF'], 
            [-0.6, 0, '#FFA500'], [-0.3, 0, '#800080'], [0, 0, '#008080'],
            [0.3, 0, '#FFC0CB'], [0.6, 0, '#A52A2A']
          ].map(([x, y, color], i) => (
            <mesh key={i} position={[x as number, y as number, 0.06]}>
              <boxGeometry args={[0.2, 0.2, 0.01]} />
              <meshStandardMaterial 
                color={color as string}
                emissive={color as string}
                emissiveIntensity={0.4}
              />
            </mesh>
          ))}
          
          {/* Suporte do monitor */}
          <mesh position={[0, -0.7, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.5]} />
            <meshStandardMaterial 
              color="#333" 
              metalness={0.8} 
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* === MESA DIGITALIZADORA (TABLET GRÁFICO) === */}
        <group position={[0.5, 0.82, 0.3]}>
          {/* Base da mesa digitalizadora */}
          <mesh castShadow>
            <boxGeometry args={[0.8, 0.02, 0.6]} />
            <meshStandardMaterial 
              color="#2A2A2A" 
              roughness={0.3} 
              metalness={0.7}
            />
          </mesh>
          
          {/* Área ativa (tela) */}
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[0.7, 0.005, 0.5]} />
            <meshStandardMaterial 
              color="#1A1A1A"
              emissive="#00FFFF"
              emissiveIntensity={0.1}
            />
          </mesh>
          
          {/* Botões laterais */}
          {Array.from({length: 8}, (_, i) => (
            <mesh key={i} position={[-0.35, 0.015, -0.2 + i * 0.05]}>
              <cylinderGeometry args={[0.015, 0.015, 0.01]} />
              <meshStandardMaterial color="#444" />
            </mesh>
          ))}
          
          {/* Caneta stylus */}
          <mesh position={[0.2, 0.03, 0.1]} rotation={[0, 0, 0.3]}>
            <cylinderGeometry args={[0.008, 0.008, 0.25]} />
            <meshStandardMaterial 
              color="#C0C0C0" 
              metalness={0.8} 
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* === MONITOR SECUNDÁRIO === */}
        <group position={[1.8, 1.6, 0.8]} rotation={[0, -0.3, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.4, 0.9, 0.08]} />
            <meshStandardMaterial color="#000" />
          </mesh>
          
          <mesh position={[0, 0, 0.05]}>
            <boxGeometry args={[1.35, 0.85, 0.02]} />
            <meshStandardMaterial 
              color="#001122" 
              emissive="#9370DB" 
              emissiveIntensity={0.3}
            />
          </mesh>
          
          {/* Suporte */}
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.4]} />
            <meshStandardMaterial color="#333" metalness={0.8} />
          </mesh>
        </group>

        {/* === TECLADO E MOUSE ESPECIALIZADOS === */}
        {/* Teclado mecânico para designers */}
        <group position={[-0.5, 0.85, 0.5]}>
          <mesh castShadow>
            <boxGeometry args={[0.9, 0.04, 0.35]} />
            <meshStandardMaterial color="#1A1A1A" />
          </mesh>
          
          {/* Teclas RGB */}
          {Array.from({length: 50}, (_, i) => (
            <mesh 
              key={i} 
              position={[
                -0.4 + (i % 10) * 0.08, 
                0.025, 
                -0.12 + Math.floor(i / 10) * 0.06
              ]}
            >
              <boxGeometry args={[0.06, 0.015, 0.05]} />
              <meshStandardMaterial 
                color="#2A2A2A"
                emissive={`hsl(${(i * 25) % 360}, 80%, 60%)`}
                emissiveIntensity={0.3}
              />
            </mesh>
          ))}
        </group>
        
        {/* Mouse de precisão */}
        <mesh position={[-0.8, 0.82, 0.2]} castShadow>
          <boxGeometry args={[0.12, 0.02, 0.18]} />
          <meshStandardMaterial 
            color="#FF1493" 
            emissive="#FF1493" 
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>

      {/* === ESTAÇÃO DE IMPRESSÃO === */}
      <group position={[2.5, 0, -2.5]}>
        {/* Mesa para impressoras */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[2, 0.1, 1.5]} />
          <meshStandardMaterial color="#8B4513" roughness={0.6} />
        </mesh>
        
        {/* Pernas da mesa */}
        {[[-0.8, -0.4], [0.8, -0.4], [-0.8, 0.4], [0.8, 0.4]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.3, z]}>
            <boxGeometry args={[0.08, 0.6, 0.08]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
        ))}

        {/* Impressora A3 */}
        <group position={[-0.5, 0.8, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.2, 0.4, 0.8]} />
            <meshStandardMaterial color="#E5E5E5" />
          </mesh>
          
          {/* Painel de controle */}
          <mesh position={[0.4, 0.25, 0.35]}>
            <boxGeometry args={[0.3, 0.15, 0.05]} />
            <meshStandardMaterial 
              color="#000080" 
              emissive="#00FFFF" 
              emissiveIntensity={0.3}
            />
          </mesh>
          
          {/* Bandeja de papel */}
          <mesh position={[0, -0.15, -0.3]}>
            <boxGeometry args={[1.1, 0.1, 0.3]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          
          {/* LEDs de status */}
          {[-0.2, 0, 0.2].map((x, i) => (
            <mesh key={i} position={[x, 0.25, 0.41]}>
              <sphereGeometry args={[0.02]} />
              <meshStandardMaterial 
                color={i === 0 ? "#00FF00" : i === 1 ? "#FFFF00" : "#FF0000"}
                emissive={i === 0 ? "#00FF00" : i === 1 ? "#FFFF00" : "#FF0000"}
                emissiveIntensity={0.6}
              />
            </mesh>
          ))}
        </group>

        {/* Impressora de fotos pequena */}
        <group position={[0.7, 0.75, 0.3]}>
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.3, 0.4]} />
            <meshStandardMaterial color="#2A2A2A" />
          </mesh>
          
          <mesh position={[0, 0.2, 0.15]}>
            <boxGeometry args={[0.4, 0.1, 0.1]} />
            <meshStandardMaterial 
              color="#FF1493" 
              emissive="#FF1493" 
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>
      </group>

      {/* === BIBLIOTECA DE MATERIAIS === */}
      <group position={[-3.5, 0, 1]}>
        {/* Estante alta */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[0.4, 3, 1.5]} />
          <meshStandardMaterial color="#8B4513" roughness={0.7} />
        </mesh>
        
        {/* Prateleiras */}
        {[0.5, 1, 1.5, 2, 2.5].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[0.38, 0.05, 1.48]} />
            <meshStandardMaterial color="#A0522D" />
          </mesh>
        ))}
        
        {/* Amostras de papel e materiais */}
        {Array.from({length: 15}, (_, i) => (
          <mesh 
            key={i} 
            position={[
              -0.15, 
              0.6 + (i % 5) * 0.5, 
              -0.6 + Math.floor(i / 5) * 0.6
            ]}
          >
            <boxGeometry args={[0.25, 0.4, 0.03]} />
            <meshStandardMaterial 
              color={`hsl(${i * 24}, 70%, ${50 + i * 3}%)`}
              roughness={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* === CADEIRA DE DESIGNER ERGONÔMICA === */}
      <group position={[-1.5, 0, 1.5]}>
        {/* Base com rodas coloridas */}
        <group position={[0, 0.12, 0]}>
          <mesh>
            <cylinderGeometry args={[0.25, 0.25, 0.15]} />
            <meshStandardMaterial 
              color="#FF69B4" 
              metalness={0.7} 
              roughness={0.3}
            />
          </mesh>
          
          {[0, 72, 144, 216, 288].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <group key={i} rotation={[0, rad, 0]}>
                <mesh position={[0, 0, 0.5]}>
                  <boxGeometry args={[0.1, 0.08, 1]} />
                  <meshStandardMaterial color="#FF1493" metalness={0.8} />
                </mesh>
                <mesh position={[0, -0.06, 1]} rotation={[Math.PI/2, 0, 0]}>
                  <cylinderGeometry args={[0.08, 0.08, 0.06]} />
                  <meshStandardMaterial color="#9370DB" />
                </mesh>
              </group>
            );
          })}
        </group>
        
        {/* Coluna pneumática */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.8]} />
          <meshStandardMaterial 
            color="#FF1493" 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>
        
        {/* Assento criativo */}
        <mesh position={[0, 1.05, 0]} castShadow>
          <boxGeometry args={[1, 0.25, 1]} />
          <meshStandardMaterial color="#FF69B4" />
        </mesh>
        
        {/* Padrão do assento */}
        <mesh position={[0, 1.06, 0]}>
          <boxGeometry args={[0.9, 0.02, 0.9]} />
          <meshStandardMaterial color="#FF1493" />
        </mesh>
        
        {/* Encosto alto */}
        <mesh position={[0, 1.8, -0.45]} castShadow>
          <boxGeometry args={[1, 1.6, 0.25]} />
          <meshStandardMaterial color="#FF69B4" />
        </mesh>
        
        {/* Design do encosto */}
        <mesh position={[0, 1.8, -0.4]}>
          <boxGeometry args={[0.9, 1.5, 0.02]} />
          <meshStandardMaterial color="#FF1493" />
        </mesh>
        
        {/* Braços ajustáveis */}
        {[-0.6, 0.6].map((x, i) => (
          <group key={i} position={[x, 1.2, 0]}>
            <mesh position={[0, 0, -0.3]}>
              <boxGeometry args={[0.08, 0.8, 0.08]} />
              <meshStandardMaterial color="#FF1493" metalness={0.8} />
            </mesh>
            <mesh position={[0, 0.35, 0]}>
              <boxGeometry args={[0.15, 0.08, 0.5]} />
              <meshStandardMaterial color="#FF69B4" />
            </mesh>
            <mesh position={[0, 0.39, 0]}>
              <boxGeometry args={[0.12, 0.04, 0.45]} />
              <meshStandardMaterial color="#FF1493" />
            </mesh>
          </group>
        ))}
      </group>

      {/* === QUADROS E PORTFOLIOS NA PAREDE === */}
      {/* Quadro grande com trabalhos */}
      <group position={[0, 2.5, -3.8]}>
        <mesh>
          <boxGeometry args={[2.5, 1.8, 0.05]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[2.4, 1.7, 0.02]} />
          <meshStandardMaterial 
            color="#FFFFFF"
            emissive="#FF6B35"
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>
      
      {/* Quadros menores */}
      {[-2.5, 2.5].map((x, i) => (
        <group key={i} position={[x, 2, -3.8]}>
          <mesh>
            <boxGeometry args={[1.2, 1, 0.05]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <boxGeometry args={[1.1, 0.9, 0.02]} />
            <meshStandardMaterial 
              color="#F0F0F0"
              emissive={i === 0 ? "#9370DB" : "#FF1493"}
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>
      ))}

      {/* === PLANTAS CRIATIVAS === */}
      <group position={[3.5, 0, 2.5]}>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.25, 0.3, 0.8]} />
          <meshStandardMaterial 
            color="#FF69B4" 
            roughness={0.6} 
            metalness={0.2}
          />
        </mesh>
        {/* Planta colorida */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <mesh 
              key={i}
              position={[
                Math.cos(rad) * 0.3, 
                0.9 + Math.sin(i * 0.7) * 0.15, 
                Math.sin(rad) * 0.3
              ]}
              rotation={[0, rad, Math.PI/8]}
            >
              <boxGeometry args={[0.04, 0.5, 0.02]} />
              <meshStandardMaterial 
                color={`hsl(${i * 45}, 80%, 60%)`}
                emissive={`hsl(${i * 45}, 80%, 60%)`}
                emissiveIntensity={0.2}
              />
            </mesh>
          );
        })}
      </group>

      {/* === MESA DE MATERIAIS E AMOSTRAS === */}
      <group position={[1, 0, 2]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[1.5, 0.08, 1]} />
          <meshStandardMaterial color="#D2B48C" />
        </mesh>
        
        {/* Pés da mesa */}
        {[[-0.6, -0.4], [0.6, -0.4], [-0.6, 0.4], [0.6, 0.4]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.2, z]}>
            <boxGeometry args={[0.08, 0.4, 0.08]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        ))}
        
        {/* Amostras de cor espalhadas */}
        {Array.from({length: 12}, (_, i) => (
          <mesh 
            key={i} 
            position={[
              -0.6 + Math.random() * 1.2, 
              0.45, 
              -0.4 + Math.random() * 0.8
            ]}
            rotation={[0, Math.random() * Math.PI, 0]}
          >
            <boxGeometry args={[0.15, 0.01, 0.2]} />
            <meshStandardMaterial 
              color={`hsl(${i * 30}, 80%, 60%)`}
              emissive={`hsl(${i * 30}, 80%, 60%)`}
              emissiveIntensity={0.1}
            />
          </mesh>
        ))}
      </group>

      {/* === LIXEIRA DE DESIGN === */}
      <mesh position={[3, 0.3, -1]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.6]} />
        <meshStandardMaterial color="#FF1493" />
      </mesh>

      {/* === ILUMINAÇÃO ESPECIAL === */}
      <pointLight position={[0, 6, 0]} intensity={0.8} color="#FF69B4" />
      <pointLight position={[-2, 4, -2]} intensity={0.5} color="#9370DB" />
      <pointLight position={[2, 4, 2]} intensity={0.5} color="#FF1493" />
    </group>

      {/* ==================== PLANTAS DECORATIVAS ==================== */}
      {[[-5, 0, -5], [3, 0, -5], [-5, 0, 5], [3, 0, 5]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.5, pos[2]]} castShadow>
          <cylinderGeometry args={[0.3, 0.4, 1]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
      ))}
    </group>
    </group>
  );
};