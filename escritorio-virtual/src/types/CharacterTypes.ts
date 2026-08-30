// src/types/CharacterTypes.ts
export type CharacterRole = 
  | 'tech-lead'      // Capacete + prancheta (laranja)
  | 'frontend'       // Teclado RGB + mouse (verde)
  | 'backend'        // Teclado + café (verde)
  | 'creative'       // Violão + laptop (rosa)
  | 'tech-leader'    // Badge + tablet (dourado)
  | 'qa'             // Lupa + bugs (amarelo)
  | 'mobile'         // Smartphone + apps (ciano)
  | 'sysadmin'       // Servidor + nuvem (branco)
  | 'ceo'            // Badge CEO + maleta (branco)
  | 'orchestrator';  // Dois tablets (ciano)

export interface CharacterConfig {
  haloColor: string;
  baseColor: string;
  shirtColor: string;
  pantsColor: string;
  name: string;
  accessories: string[];
}