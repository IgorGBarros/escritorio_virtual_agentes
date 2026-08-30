// src/components/3d/Office/MeetingSystem.tsx
import React, { useState, useCallback } from 'react';
import { AgentRole } from '../Character/AnimatedAgent';
import { useMovementControl } from '../../../hooks/useMovementControl';

interface Meeting {
  id: string;
  title: string;
  location: [number, number, number];
  participants: AgentRole[];
  duration: number; // em segundos
  status: 'scheduled' | 'active' | 'completed';
}

interface Props {
  agents: AgentRole[];
  onMeetingScheduled?: (meeting: Meeting) => void;
}

export const MeetingSystem: React.FC<Props> = ({ agents, onMeetingScheduled }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [activeMeeting, setActiveMeeting] = useState<Meeting | null>(null);

  // Locais de reunião disponíveis
  const meetingRooms = {
    'main-conference': { position: [0, 0, -8] as [number, number, number], name: 'Sala de Reunião Principal' },
    'ceo-office': { position: [-12, 0, -10] as [number, number, number], name: 'Escritório do CEO' },
    'small-meeting': { position: [10, 0, -10] as [number, number, number], name: 'Sala de Reunião Pequena' }
  };

  // Criar nova reunião
  const scheduleMeeting = useCallback((
    title: string,
    participants: AgentRole[],
    roomKey: keyof typeof meetingRooms,
    duration: number = 300 // 5 minutos padrão
  ) => {
    const meeting: Meeting = {
      id: `meeting-${Date.now()}`,
      title,
      location: meetingRooms[roomKey].position,
      participants,
      duration,
      status: 'scheduled'
    };

    setMeetings(prev => [...prev, meeting]);
    
    if (onMeetingScheduled) {
      onMeetingScheduled(meeting);
    }

    console.log(`📅 Reunião agendada: ${title}`);
    console.log(`👥 Participantes: ${participants.join(', ')}`);
    console.log(`📍 Local: ${meetingRooms[roomKey].name}`);

    return meeting;
  }, [onMeetingScheduled]);

  // Iniciar reunião
  const startMeeting = useCallback((meetingId: string) => {
    const meeting = meetings.find(m => m.id === meetingId);
    if (!meeting) return;

    setMeetings(prev => 
      prev.map(m => 
        m.id === meetingId 
          ? { ...m, status: 'active' }
          : m
      )
    );

    setActiveMeeting(meeting);

    // Convocar todos os participantes
    meeting.participants.forEach(role => {
      // Aqui você chamaria o hook de movimento de cada agente
      console.log(`📧 Convocando ${role} para ${meeting.title}`);
    });

    // Auto-finalizar após a duração
    setTimeout(() => {
      endMeeting(meetingId);
    }, meeting.duration * 1000);

  }, [meetings]);

  // Finalizar reunião
  const endMeeting = useCallback((meetingId: string) => {
    setMeetings(prev => 
      prev.map(m => 
        m.id === meetingId 
          ? { ...m, status: 'completed' }
          : m
      )
    );

    setActiveMeeting(null);

    const meeting = meetings.find(m => m.id === meetingId);
    if (meeting) {
      console.log(`✅ Reunião finalizada: ${meeting.title}`);
      console.log(`🏠 Participantes retornando às suas salas`);
    }
  }, [meetings]);

  // Reuniões pré-definidas
  const quickMeetings = [
    {
      title: 'Daily Standup',
      participants: ['backend', 'frontend', 'qa'] as AgentRole[],
      room: 'main-conference' as keyof typeof meetingRooms
    },
    {
      title: 'Sprint Planning',
      participants: ['ceo', 'pm', 'backend', 'frontend'] as AgentRole[],
      room: 'main-conference' as keyof typeof meetingRooms
    },
    {
      title: 'Reunião Executiva',
      participants: ['ceo', 'pm'] as AgentRole[],
      room: 'ceo-office' as keyof typeof meetingRooms
    },
    {
      title: 'Code Review',
      participants: ['backend', 'frontend'] as AgentRole[],
      room: 'small-meeting' as keyof typeof meetingRooms
    }
  ];

  return (
    <group>
      {/* Visualização das salas de reunião */}
      {Object.entries(meetingRooms).map(([key, room]) => (
        <group key={key} position={room.position}>
          {/* Indicador da sala de reunião */}
          <mesh position={[0, 4, 0]}>
            <boxGeometry args={[3, 0.5, 0.1]} />
            <meshStandardMaterial 
              color={activeMeeting?.location === room.position ? "#00FF00" : "#4169E1"}
              emissive={activeMeeting?.location === room.position ? "#00FF00" : "#4169E1"}
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      ))}

      {/* Interface de controle (seria um painel UI real) */}
      <group position={[15, 2, 0]}>
        <mesh>
          <boxGeometry args={[4, 6, 0.1]} />
          <meshStandardMaterial color="#2F4F4F" />
        </mesh>
        
        {/* Botões virtuais para reuniões rápidas */}
        {quickMeetings.map((meeting, index) => (
          <mesh 
            key={index}
            position={[0, 2 - index * 1, 0.1]}
            onClick={() => {
              const newMeeting = scheduleMeeting(
                meeting.title, 
                meeting.participants, 
                meeting.room
              );
              setTimeout(() => startMeeting(newMeeting.id), 1000);
            }}
          >
            <boxGeometry args={[3.5, 0.8, 0.1]} />
            <meshStandardMaterial 
              color="#4169E1" 
              emissive="#4169E1" 
              emissiveIntensity={0.2} 
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};