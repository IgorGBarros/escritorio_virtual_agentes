// src/types/three-fiber.d.ts
import '@react-three/fiber'

declare module '@react-three/fiber' {
  interface ThreeElements {
    // 🔦 Luzes
    ambientLight: { intensity?: number; color?: string | number }
    directionalLight: { 
      position?: [number, number, number]; 
      intensity?: number; 
      color?: string | number;
      castShadow?: boolean;
    }
    pointLight: { position?: [number, number, number]; intensity?: number }
    spotLight: { position?: [number, number, number]; intensity?: number; angle?: number }
    
    // 📐 Geometrias
    boxGeometry: { args?: [number, number, number] }
    sphereGeometry: { args?: [number, number?, number?] }
    cylinderGeometry: { args?: [number, number, number, number] }
    planeGeometry: { args?: [number, number] }
    ringGeometry: { args?: [number, number, number] }
    torusGeometry: { args?: [number, number, number, number] }
    
    // 🎨 Materiais
    meshStandardMaterial: { 
      color?: string | number; 
      emissive?: string | number; 
      emissiveIntensity?: number;
      transparent?: boolean;
      opacity?: number;
    }
    meshBasicMaterial: { color?: string | number }
    meshPhysicalMaterial: { color?: string | number }
    
    // 🧱 Elementos 3D Base
    mesh: { 
      castShadow?: boolean; 
      receiveShadow?: boolean; 
      position?: [number, number, number]; 
      rotation?: [number, number, number];
      onClick?: () => void;
    }
    group: { 
      position?: [number, number, number]; 
      rotation?: [number, number, number]; 
      onClick?: () => void;
    }
    primitive: { object: any }
  }
}