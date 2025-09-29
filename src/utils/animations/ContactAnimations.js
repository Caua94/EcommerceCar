// src/utils/animations/ContactAnimations.js

import { gsap } from 'gsap';

/**
 * Cria e executa a timeline de animação de entrada para a página de contato.
 */
export function animateContactEntrance() {
  // Configura a Timeline com padrões
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Animação do Título
  tl.from('.gsap-contact-title', { opacity: 0, y: -20, duration: 1.2 })
    
    // 2. Animação do Texto Descritivo (começa antes da anterior terminar)
    .from('.gsap-contact-text', { opacity: 0, y: -20, duration: 1 }, "-=0.8")
    
    // 3. Animação de entrada dos campos do formulário (com stagger/escalonamento)
    .from('.gsap-contact-form', { opacity: 0, x: -50, stagger: 0.2, duration: 0.8 }, "-=0.5")
    
    // 4. Animação do botão (com escala)
    .from('.gsap-contact-button', { opacity: 0, scale: 0.8, duration: 0.8 }, "-=0.4");
  
  // A função simplesmente cria e executa a animação.
}