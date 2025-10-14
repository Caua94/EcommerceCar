// src/utils/animations/AboutAnimations.js

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function setupAboutPageAnimations(heroElement) {
  if (!heroElement) return;

  ScrollTrigger.create({
    trigger: heroElement,
    start: "top top",
    end: "bottom+=200%",
    pin: true,
    pinSpacing: false,
  });

  gsap.utils.toArray(".storytelling-block").forEach((section) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom top",
        toggleActions: "play none none none",
      },
    });

    tl.from(section.querySelector("h2"), {
      opacity: 0,
      y: 50,
      duration: 1,
    });

    tl.from(section.querySelector("p"), {
      opacity: 0,
      y: 30,
      duration: 1,
    }, "<0.3");

    const images = section.querySelectorAll(".story-image");
    if (images.length) {
      tl.from(images, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }, "-=0.5");
    }
  });
}