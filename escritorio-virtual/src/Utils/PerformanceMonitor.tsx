// src/components/3d/Utils/PerformanceMonitor.tsx
import React, { useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

interface PerformanceStats {
  fps: number;
  frameTime: number;
  triangles: number;
  calls: number;
}

export const PerformanceMonitor: React.FC = () => {
  const [stats, setStats] = useState<PerformanceStats>({
    fps: 0,
    frameTime: 0,
    triangles: 0,
    calls: 0
  });
  const [showStats, setShowStats] = useState(false);
  const { gl } = useThree();

  let frameCount = 0;
  let lastTime = performance.now();

  useFrame(() => {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      const frameTime = (currentTime - lastTime) / frameCount;
      
      setStats({
        fps,
        frameTime: Math.round(frameTime * 100) / 100,
        triangles: gl.info.render.triangles,
        calls: gl.info.render.calls
      });
      
      frameCount = 0;
      lastTime = currentTime;
    }
  });

  // Mostrar stats apenas em desenvolvimento
  useEffect(() => {
    setShowStats(process.env.NODE_ENV === 'development');
  }, []);

  if (!showStats) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontFamily: 'monospace',
      fontSize: '12px',
      zIndex: 1000
    }}>
      <div>FPS: {stats.fps}</div>
      <div>Frame: {stats.frameTime}ms</div>
      <div>Triangles: {stats.triangles}</div>
      <div>Draw Calls: {stats.calls}</div>
    </div>
  );
};