// src/react-app-env.d.ts
/// <reference types="react-scripts" />
import { ThreeElements } from '@react-three/fiber'

declare global {
  namespace JSX {
    // Estende os elementos JSX nativos com todos os elementos 3D do R3F
    interface IntrinsicElements extends ThreeElements {}
  }
}