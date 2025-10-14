// src/utils/animations/HomeAnimations.js

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function setupHomeAnimations() {
  gsap.from('.animate-text', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.3
  });

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

  gsap.from('.gsap-reveal-img', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '#brand',
      start: 'left 85%',
      toggleActions: 'play none none none',
      once: true
    }
  });
}