// src/utils/animations/AboutAnimations.js

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registra o plugin uma única vez, garantindo que ScrollTrigger funcione
gsap.registerPlugin(ScrollTrigger);

/**
 * Configura as animações de ScrollTrigger para a página "Sobre o Projeto".
 * @param {HTMLElement} heroElement - A referência reativa ao elemento hero (heroRef.value)
 */
export function setupAboutPageAnimations(heroElement) {
  if (!heroElement) return;

  // 1. Fixar a seção Hero (Hero Pinning)
  ScrollTrigger.create({
    trigger: heroElement,
    start: "top top",
    end: "bottom+=200%",
    pin: true,
    pinSpacing: false,
  });

  // 2. Animações de Revelação para cada bloco de storytelling
  gsap.utils.toArray(".storytelling-block").forEach((section) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%", // Inicia a animação quando o topo da seção entra no viewport
        end: "bottom top",
        toggleActions: "play none none none", // A animação só toca uma vez (play)
      },
    });

    // Anima o título (h2)
    tl.from(section.querySelector("h2"), {
      opacity: 0,
      y: 50,
      duration: 1,
    });

    // Anima o parágrafo (p)
    tl.from(section.querySelector("p"), {
      opacity: 0,
      y: 30,
      duration: 1,
    }, "<0.3"); // Começa 0.3s antes do fim da animação anterior

    // Anima as imagens (se existirem na seção)
    const images = section.querySelectorAll(".story-image");
    if (images.length) {
      tl.from(images, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        stagger: 0.2, // Escalonamento
        ease: "power3.out",
      }, "-=0.5"); // Começa 0.5s antes do fim da animação anterior (overlap)
    }
  });
}