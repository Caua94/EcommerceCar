import { gsap } from "gsap";

export function animateSignupEntrance() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".gsap-signup-title", { opacity: 0, y: -20, duration: 1.2 })

    .from(".gsap-signup-text", { opacity: 0, y: -20, duration: 1 }, "-=0.8")

    .from(
      ".gsap-signup-form",
      { opacity: 0, x: -50, stagger: 0.2, duration: 0.8 },
      "-=0.5"
    )

    .from(
      ".gsap-signup-button",
      { opacity: 0, scale: 0.8, duration: 0.8 },
      "-=0.4"
    )

    .from(".gsap-signup-footer", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3");
}
