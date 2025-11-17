
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

 
  gsap.utils.toArray('.gsap-blur-in').forEach(elem => {
  
    gsap.set(elem, { 
      opacity: 0, 
      filter: 'blur(12px)', 
      y: 10 
    });


    gsap.to(elem, {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elem,
        start: 'top 65%', 
        toggleActions: 'play none none none',
        once: true 
      }
    });
  });
}