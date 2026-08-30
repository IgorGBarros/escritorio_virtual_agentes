// src/components/3d/Scene/CharacterShowcase.tsx
import React from 'react';
import { PixelCharacter } from '../Character/PixelCharacter';
import { CharacterRole } from '../../../types/CharacterTypes';

export const CharacterShowcase: React.FC = () => {
  const characters: { role: CharacterRole; position: [number, number, number] }[] = [
    { role: 'tech-lead', position: [-12, 0, -6] },
    { role: 'frontend', position: [-6, 0, -6] },
    { role: 'backend', position: [0, 0, -6] },
    { role: 'creative', position: [6, 0, -6] },
    { role: 'tech-leader', position: [12, 0, -6] },
    { role: 'qa', position: [-12, 0, 0] },
    { role: 'mobile', position: [-6, 0, 0] },
    { role: 'sysadmin', position: [0, 0, 0] },
    { role: 'ceo', position: [6, 0, 0] },
    { role: 'orchestrator', position: [12, 0, 0] },
  ];

  return (
    <>
      {characters.map((char, index) => (
        <PixelCharacter
          key={index}
          role={char.role}
          position={char.position}
          onClick={() => console.log(`Clicked on ${char.role}`)}
        />
      ))}
    </>
  );
};