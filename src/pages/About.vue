<template>
  <main class="relative w-full h-full overflow-x-hidden playfair-display-sc-regular">
    <section
      ref="heroRef"
      class="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
    
      <img src="../assets/imgs/womansInCar.jpg" alt="" class="object-cover object-center z-0 absolute">
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

import { setupAboutPageAnimations } from "../utils/animations/AboutAnimations.js"; 


import unimar from "../assets/imgs/unimar.png";
import fc from "../assets/imgs/fc.png";
import jhow from "../assets/imgs/jhow.png";


const heroRef = ref(null);

onMounted(() => {

  setupAboutPageAnimations(heroRef.value);
});
</script>