// src/utils/animations/LoginAnimations.js

import { gsap } from 'gsap';

/**
 * Cria e executa a timeline de animação de entrada para o formulário de Login.
 */
export function animateLoginEntrance() {
  // Configura a Timeline com padrões para animação de entrada suave
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Título: Fade-in e subida
  tl.from('.gsap-login-title', { opacity: 0, y: -20, duration: 1.2 })
    
    // 2. Texto descritivo: Fade-in e subida (começa 0.8s antes da anterior terminar)
    .from('.gsap-login-text', { opacity: 0, y: -20, duration: 1 }, "-=0.8")
    
    // 3. Campos do formulário: Slide-in da esquerda e stagger
    .from('.gsap-login-form', { opacity: 0, x: -50, stagger: 0.2, duration: 0.8 }, "-=0.5")
    
    // 4. Botão de Sign In: Fade-in e aumento de escala
    .from('.gsap-login-button', { opacity: 0, scale: 0.8, duration: 0.8 }, "-=0.4")
    
    // 5. Rodapé/Link Sign Up: Fade-in e subida
    .from('.gsap-login-footer', { opacity: 0, y: 20, duration: 0.6 }, "-=0.3");
}