import { gsap } from "gsap";

export function animateLoginEntrance() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".gsap-login-title", { opacity: 0, y: -20, duration: 1.2 })

    .from(".gsap-login-text", { opacity: 0, y: -20, duration: 1 }, "-=0.8")

    .from(
      ".gsap-login-form",
      { opacity: 0, x: -50, stagger: 0.2, duration: 0.8 },
      "-=0.5"
    )

    .from(
      ".gsap-login-button",
      { opacity: 0, scale: 0.8, duration: 0.8 },
      "-=0.4"
    )

    .from(".gsap-login-footer", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3");
}
