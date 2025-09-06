<template>
  <main class="relative w-full h-full overflow-x-hidden">
    <section
      ref="heroRef"
      class="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <img
        src="../assets/imgs/womansInCar.jpg"
        alt="A woman in a luxury car, symbolizing freedom and elegance."
        class="absolute top-0 left-0 w-full h-full object-cover"
      />
      <h1 class="relative text-white text-6xl font-bold z-10 drop-shadow-lg">
        About the Project
      </h1>
    </section>

    <section
      class="storytelling-block relative h-screen flex items-center justify-center px-8 bg-stone-900 z-10 overflow-hidden"
    >
      <img
        :src="unimar"
        alt="UNIMAR university logo."
        class="story-image absolute h-48 w-auto object-contain rounded-lg opacity-0 left-1/4 -translate-x-1/2"
        style="top: 60%;"
      />
      <img
        :src="fc"
        alt="Faculty of Computer Science logo."
        class="story-image absolute h-48 w-48 object-contain rounded-lg opacity-0 left-3/4 -translate-x-1/2"
        style="top: 60%;"
      />

      <div class="max-w-3xl text-center relative z-10 space-y-4">
        <h2 class="text-5xl font-bold mb-6 text-white">Project Motivation</h2>
        <p class="text-2xl text-gray-100 leading-relaxed">
          This project was born from a challenge presented by a partner company of UNIMAR. The main goal was to demonstrate an e-commerce solution with full CRUD functionality.
        </p>
      </div>
    </section>

    <section
      class="storytelling-block relative h-screen flex items-center justify-center px-8 bg-stone-900 z-10 overflow-hidden"
    >
      <div class="max-w-3xl text-center relative z-10 space-y-4">
        <h2 class="text-5xl font-bold mb-6 text-white">Objective</h2>
        <p class="text-2xl text-gray-100 leading-relaxed">
          To showcase our proficiency in Vue, Tailwind, JavaScript, and C#.
        </p>
      </div>
    </section>

    <section
      class="storytelling-block relative h-screen flex items-center justify-center px-8 bg-stone-900 z-10 overflow-hidden"
    >
      <img
        :src="jhow"
        alt="A photo of Jhonata Canevare, a member of the back-end team."
        class="story-image absolute w-48 h-48 object-cover rounded-full opacity-0 left-1/4 -translate-x-1/2"
        style="top: 70%;"
      />
      <img
        :src="jhow"
        alt="A photo of a team member."
        class="story-image absolute w-48 h-48 object-cover rounded-full opacity-0 left-1/2 -translate-x-1/2"
        style="top: 70%;"
      />
      <img
        :src="jhow"
        alt="A photo of a team member."
        class="story-image absolute w-48 h-48 object-cover rounded-full opacity-0 left-3/4 -translate-x-1/2"
        style="top: 70%;"
      />

      <div class="max-w-3xl text-center relative z-10 space-y-4">
        <h2 class="text-5xl font-bold mb-6 text-white">Team</h2>
        <p class="text-2xl text-gray-100 leading-relaxed">
          Front-end: Cauã Reginato and Gui Oliveira.<br />
          Back-end: Jhonata Canevare and Giovani Ferreira.
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import unimar from "../assets/imgs/unimar.png";
import fc from "../assets/imgs/fc.png";
import jhow from "../assets/imgs/jhow.png";

gsap.registerPlugin(ScrollTrigger);

const heroRef = ref(null);

onMounted(() => {
  // Pin the hero section on scroll
  ScrollTrigger.create({
    trigger: heroRef.value,
    start: "top top",
    end: "bottom+=300%",
    pin: true,
    pinSpacing: false,
  });

  // Create a separate timeline for each storytelling block
  gsap.utils.toArray(".storytelling-block").forEach((section) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%", // Start the animation when the top of the section enters the viewport
        end: "bottom top",
        toggleActions: "play none none none",
      },
    });

    // Animate the heading (h2)
    tl.from(section.querySelector("h2"), {
      opacity: 0,
      y: 50,
      duration: 1,
    });

    // Animate the paragraph (p)
    tl.from(section.querySelector("p"), {
      opacity: 0,
      y: 30,
      duration: 1,
    }, "<0.3"); // Starts 0.3 seconds after the previous animation ends

    // Animate the images, if they exist in the section
    const images = section.querySelectorAll(".story-image");
    if (images.length) {
      tl.from(images, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        stagger: 0.2, // Animate each image with a 0.2s delay
        ease: "power3.out",
      }, "-=0.5"); // Starts 0.5 seconds before the previous animation ends (overlap effect)
    }
  });
});
</script>