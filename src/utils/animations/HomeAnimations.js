// src/utils/animations/HomeAnimations.js

import { gsap } from 'gsap';
// Certifique-se de importar o ScrollTrigger se for usá-lo!
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Opcional: Registre o plugin uma única vez
gsap.registerPlugin(ScrollTrigger);

/**
 * Configura todas as animações GSAP da página inicial, incluindo ScrollTrigger.
 */
export function setupHomeAnimations() {
  // Animação inicial de entrada de texto na seção Hero
  gsap.from('.animate-text', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.3
  });

  // Animação de revelação para seções no scroll (.gsap-reveal)
  gsap.utils.toArray('.gsap-reveal').forEach(section => {
    gsap.from(section, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true
      }
    });
  });

  // Animação de entrada lateral de texto (.gsap-reveal-text)
  gsap.utils.toArray('.gsap-reveal-text').forEach(text => {
    gsap.from(text, {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: text,
        start: 'top 90%',
        toggleActions: 'play none none none',
        once: true
      }
    });
  });

  // Animação em stagger para as imagens de marca (.gsap-reveal-img)
  gsap.from('.gsap-reveal-img', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '#brand',
      start: 'top 85%',
      toggleActions: 'play none none none',
      once: true
    }
  });
}