// src/utils/animations/SignupAnimations.js

import { gsap } from 'gsap';

/**
 * Cria e executa a timeline de animação de entrada para o formulário de Cadastro (Sign Up).
 */
export function animateSignupEntrance() {
  // Configura a Timeline com padrões para animação de entrada suave
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Título: Fade-in e subida
  tl.from('.gsap-signup-title', { opacity: 0, y: -20, duration: 1.2 })
    
    // 2. Texto descritivo: Fade-in e subida (começa 0.8s antes da anterior terminar)
    .from('.gsap-signup-text', { opacity: 0, y: -20, duration: 1 }, "-=0.8")
    
    // 3. Campos do formulário: Slide-in da esquerda e stagger (para os 4 campos)
    .from('.gsap-signup-form', { opacity: 0, x: -50, stagger: 0.2, duration: 0.8 }, "-=0.5")
    
    // 4. Botão: Fade-in e aumento de escala
    .from('.gsap-signup-button', { opacity: 0, scale: 0.8, duration: 0.8 }, "-=0.4")
    
    // 5. Rodapé/Link Log In: Fade-in e subida
    .from('.gsap-signup-footer', { opacity: 0, y: 20, duration: 0.6 }, "-=0.3");
}