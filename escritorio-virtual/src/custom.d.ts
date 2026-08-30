// src/custom.d.ts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // 🔦 Luzes
      ambientLight: any;
      directionalLight: any;
      spotLight: any;
      pointLight: any;
      
      // 🔷 Geometrias
      boxGeometry: any;
      sphereGeometry: any;
      cylinderGeometry: any;
      planeGeometry: any;
      ringGeometry: any;
      torusGeometry: any;
      capsuleGeometry: any;
      
      // 🎨 Materiais
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      meshPhysicalMaterial: any;
      
      // 🧱 Elementos 3D
      mesh: any;
      group: any;
      primitive: any;
    }
  }
}

export {};