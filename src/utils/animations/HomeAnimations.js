// src/utils/animations/HomeAnimations.js

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function setupHomeAnimations() {
  // 1. Animação do texto do Header (como estava antes)
  gsap.from('.animate-text', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.3
  });

  // 2. NOVA Animação "Blur-In" para as seções
  // Vamos aplicar isso a qualquer elemento com a classe 'gsap-blur-in'
  gsap.utils.toArray('.gsap-blur-in').forEach(elem => {
    // Define o estado inicial (invisível e embaçado)
    gsap.set(elem, { 
      opacity: 0, 
      filter: 'blur(12px)', 
      y: 10 // Um leve movimento de subida
    });

    // Cria a animação com ScrollTrigger
    gsap.to(elem, {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elem,
        start: 'top 85%', // Começa quando 85% do topo do elemento entra na tela
        toggleActions: 'play none none none',
        once: true // A animação ocorre apenas uma vez
      }
    });
  });
}