// src/utils/animations/ContactAnimations.js

import { gsap } from "gsap";

export function animateContactEntrance() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".gsap-contact-title", { opacity: 0, y: -20, duration: 1.2 })
    .from(".gsap-contact-text", { opacity: 0, y: -20, duration: 1 }, "-=0.8")
    .from(
      ".gsap-contact-form",
      { opacity: 0, x: -50, stagger: 0.2, duration: 0.8 },
      "-=0.5"
    )
    .from(
      ".gsap-contact-button",
      { opacity: 0, scale: 0.8, duration: 0.8 },
      "-=0.4"
    );
}
