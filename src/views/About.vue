<template>
  <main class="relative w-full h-full overflow-x-hidden">
    <!-- HERO / BANNER (pinned) -->
    <section
      ref="heroRef"
      class="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <img
        src="https://picsum.photos/id/1011/1920/1080"
        alt="Banner"
        class="absolute top-0 left-0 w-full h-full object-cover"
      />
      <h1 class="relative text-white text-6xl font-bold z-10 drop-shadow-lg">
        About the project
      </h1>
    </section>

    <!-- STORYTELLING SECTIONS -->
    <section
      v-for="(block, i) in blocks"
      :key="i"
      class="relative h-screen flex items-center justify-center px-8 bg-gray-200 z-10 overflow-hidden"
    >
      <!-- Imagens atrás do texto -->
      <img
        v-for="(img, idx) in block.images"
        :key="idx"
        :src="img.src"
        alt=""
        class="absolute w-48 h-48 object-cover rounded-lg opacity-0"
        :style="{ top: img.top, left: img.left }"
      />

      <!-- Texto -->
      <div class="max-w-3xl text-center relative z-10 space-y-4">
        <h2 class="text-4xl font-bold mb-6">{{ block.title }}</h2>
        <p class="text-lg text-gray-700 leading-relaxed">{{ block.text }}</p>
      </div>
    </section>
  </main>

</template>

<script setup>
import { ref, onMounted } from "vue"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import jhow from "../assets/imgs/jhow.png"
import unimar from "../assets/imgs/unimar.png"
import fc from "../assets/imgs/fc.png"

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref(null)

// Blocos de storytelling com posições fixas das imagens (Picsum Photos)
const blocks = [
  {
    title: "Motivo do projeto",
    text: "Este projeto veio como um desafio trazido por uma empresa parceira da UNIMAR, em que o desafio era mostrar um ecommerce com CRUD.",
    images: [
      { src: unimar, top: "30%", left: "20%",},
      { src: fc, top: "60%", left: "60%" },

    ],
  },
  {
    title: "Objetivo",
    text: "Conseguir mostrar nossa proficiência com Vue, Tailwind, Javascript e C#.",
   
  },
  {
    title: "Equipe",
    text: "Front-end: Cauã Reginato e Gui Oliveira. Back-end: Jhonata Canevare e Giovani Ferreira",
    images: [
      { src: jhow, top: "15%", left: "60%" },
      { src: jhow, top: "40%", left: "10%" },
      { src: jhow, top: "60%", left: "80%" },
      { src: jhow, top: "70%", left: "30%" },
    ],
  },
]

onMounted(() => {
  // PIN HERO
  ScrollTrigger.create({
    trigger: heroRef.value,
    start: "top top",
    end: "+=300%",
    pin: true,
    pinSpacing: false,
  })

  // Animação do texto e parágrafos + imagens
  gsap.utils.toArray("section").forEach((sec, i) => {
    if (i === 0) return // pular hero

    // h2
    gsap.from(sec.querySelector("h2"), {
      scrollTrigger: { trigger: sec, start: "top 80%" },
      opacity: 0,
      y: 50,
      duration: 1,
    })

    // p
    gsap.from(sec.querySelector("p"), {
      scrollTrigger: { trigger: sec, start: "top 75%" },
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
    })

    // imagens
    gsap.utils.toArray(sec.querySelectorAll("img.absolute")).forEach((img) => {
      gsap.fromTo(
        img,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: img, start: "top 85%", toggleActions: "play none none none" },
        }
      )
    })
  })
})
</script>
