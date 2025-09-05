<template>
  <main class="w-screen h-[100vh] relative flex items-center justify-center overflow-hidden">
    <div class="absolute z-40 text-white text-center bottom-32 space-y-6 inset-x-0">
      <p class="text-gray-200 font-medium text-2xl animate-text">Luxuous cars</p>
      <h1 class="text-7xl font-bold animate-text">Make a dream come true.</h1>

      <router-link
        to="/shop"
        class="text-4xl hover:text-amber-300 hover:scale-105 flex items-center justify-center gap-4 transition-transform animate-text"
      >
        <p>Shop now</p>
        <ButtomArrow />
      </router-link>
    </div>

    <video
      :src="videos[currentVideo]"
      class="top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out z-10"
      :class="{ 'opacity-0': isFading }"
      autoplay
      muted
      playsinline
      preload="auto"
      @ended="startFade()"
    ></video>

    <div class="absolute bottom-4 flex space-x-3 z-50">
      <button
        v-for="(video, index) in videos"
        :key="'btn-' + index"
        @click="startFade(index)"
        class="w-4 h-4 rounded-full border-2 transition-colors duration-300"
        :class="{
          'bg-white border-white': currentVideo === index,
          'bg-transparent border-white': currentVideo !== index
        }"
        :aria-label="`Ir para vídeo ${index + 1}`"
      ></button>
    </div>
  </main>

  <section class="w-screen h-[1000px] flex justify-center items-center flex-col text-black gsap-reveal">
    <p class="flex text-4xl font-semibold mb-8 ">Featured Sells</p>
    <cardComponent/>
  </section>

  <section
    class="w-screen h-[600px] flex justify-center items-center overflow-hidden shadow-2xl gsap-reveal"
  >
    <div>
      <img src="../assets/imgs/carInternPub.jpg" alt="Interior de um carro de luxo"/>
    </div>

    <div 
      class="w-3/5 h-full bg-gradient-to-l from-black/90 to-black/10 text-white flex flex-col justify-center items-center absolute right-0 p-4 shadow-2xl space-y-4"
    >
      <p class="text-7xl gsap-reveal-text">Buy Your Dreams</p>

      <router-link
        to="/shop"
        class="text-4xl hover:text-amber-300 hover:scale-105 flex items-center justify-center gap-4 transition-transform gsap-reveal-text"
      >
        <p>Shop now</p>
        <ButtomArrow />
      </router-link>
    </div>
  </section>

  <section id="brand" class="w-screen h-[600px] flex justify-center bg-gradient-to-b from-gray-400/90 to-white ">
    <div class="grid grid-cols-5 place-items-center w-3/4 rounded-[500px] m-10 gap-4">
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Marca Nissan 1" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Marca Nissan 2" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Marca Nissan 3" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Marca Nissan 4" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Marca Nissan 5" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Marca Nissan 6" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Marca Nissan 7" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Marca Nissan 8" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Marca Nissan 9" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Marca Nissan 10" />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import ButtomArrow from '../components/ButtomArrow.vue';
import cardComponent from '../components/cardComponent.vue';

// 1. Importar GSAP e ScrollTrigger
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 2. Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Fontes de vídeo (Vite/ESM)
const videos = [
  new URL('../assets/videos/carVideo1.mp4', import.meta.url).href,
  new URL('../assets/videos/carVideo2.mp4', import.meta.url).href,
  new URL('../assets/videos/carVideo3.mp4', import.meta.url).href
];

const currentVideo = ref(0);
const isFading = ref(false);

function startFade(index = null) {
  isFading.value = true;

  setTimeout(async () => {
    if (index !== null) {
      currentVideo.value = index;
    } else {
      currentVideo.value = (currentVideo.value + 1) % videos.length;
    }

    await nextTick();
    isFading.value = false;
  }, 500);
}

onMounted(() => {
  // Animação para o texto na primeira seção
  gsap.from('.animate-text', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.3
  });

  // Animação para as seções "Featured Sells" e "Buy Your Dreams"
  gsap.utils.toArray('.gsap-reveal').forEach(section => {
    gsap.from(section, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%', // Inicia a animação quando o topo da seção estiver 80% abaixo do topo da viewport
        toggleActions: 'play none none none' // Ação de animação: play on enter
      }
    });
  });

  // Animação para os textos dentro da seção "Buy Your Dreams"
  gsap.from('.gsap-reveal-text', {
    x: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.3,
    scrollTrigger: {
      trigger: '.gsap-reveal',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  // Animação para as imagens de marcas com intervalo
  gsap.utils.toArray('.gsap-reveal-img').forEach(img => {
    gsap.from(img, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: img,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });
  });
});
</script>

<style scoped>
/* Estilos locais opcionais */
</style>