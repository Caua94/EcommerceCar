// src/utils/animations/AboutAnimations.js

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function setupAboutPageAnimations(heroElement) {
  if (!heroElement) return;

  ScrollTrigger.create({
    trigger: heroElement,
    start: "top top",
    end: "+=100%", 
    pin: true,
    pinSpacing: false,
    
  });

  const blocks = gsap.utils.toArray(".storytelling-block");

  if (blocks[0]) {
    const firstBlock = blocks[0];
    const firstImage = firstBlock.querySelector("img");
    const firstContent = firstBlock.querySelector(".max-w-3xl"); // O <div> que segura o H2 e o P

    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: firstBlock,
        start: "top 60%", 
        end: "top 40%",
        scrub: 8
        
      },
    });

    if (firstImage) {
      tl1.from(firstImage, {
        xPercent: -200, 
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        
      });
    }


    if (firstContent) {
      tl1.from(firstContent.children, {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1
      },
        "-=1" 
      );
    }
  }


  if (blocks.length > 1) {
    blocks.slice(1).forEach((section) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "top 40%",
          scrub: 1, 
        },
      });


      const children = section.children;
      if (children.length) {
        tl.from(children, {
          filter: "blur(15px)", 
          opacity: 0,
          y: 10,
          stagger: 0.2,
          duration: 1,
          ease: "power2.out"
        });
      }
    });
  }
}