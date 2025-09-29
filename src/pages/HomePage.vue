<template>
  <main class="w-screen h-[100vh] relative flex items-center justify-center overflow-hidden">
    <div class="absolute z-40 text-white text-center bottom-32 space-y-6 inset-x-0">
      <p class="text-gray-200 font-medium text-2xl animate-text">Luxury Cars</p>
      <h1 class="text-7xl font-bold animate-text">Make Your Dream a Reality.</h1>

      <router-link
        to="/shop"
        class="text-4xl hover:text-amber-300 hover:scale-105 flex items-center justify-center gap-4 transition-transform animate-text"
      >
        <p>Shop Now</p>
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
        :aria-label="`Go to video ${index + 1}`"
      ></button>
    </div>
  </main>

  <section class="w-screen h-auto flex justify-center items-center flex-col text-black gsap-reveal space-y-4 mb-12">
    <p class="flex text-6xl font-bold pt-15">Featured Listings</p>
    <p class="border-b border-black w-full"></p>
    <cardComponent/>
  </section>

  <section
    class="w-screen h-[600px] flex justify-center items-center overflow-hidden shadow-2xl gsap-reveal"
  >
    <div>
      <img src="../assets/imgs/carInternPub.jpg" alt="Interior of a luxury car"/>
    </div>

    <div 
      class="w-3/5 h-full bg-gradient-to-l from-black/90 to-black/10 text-white flex flex-col justify-center items-center absolute right-0 p-4 shadow-2xl space-y-4"
    >
      <p class="text-7xl gsap-reveal-text">Drive Your Dream</p>

      <router-link
        to="/shop"
        class="text-4xl hover:text-amber-300 hover:scale-105 flex items-center justify-center gap-4 transition-transform gsap-reveal-text"
      >
        <p>Shop Now</p>
        <ButtomArrow />
      </router-link>
    </div>
  </section>

  <section id="brand" class="w-screen h-[600px] flex justify-center bg-gradient-to-b from-gray-400/90 to-white ">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center w-3/4 rounded-[500px] m-5 gap-4">
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Nissan brand logo 1" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Nissan brand logo 2" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Nissan brand logo 3" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Nissan brand logo 4" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Nissan brand logo 5" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Nissan brand logo 6" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Nissan brand logo 7" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Nissan brand logo 8" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Nissan brand logo 9" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform gsap-reveal-img" src="../assets/imgs/nissan.png" alt="Nissan brand logo 10" />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import ButtomArrow from '../components/ButtomArrow.vue';
import cardComponent from '../components/cardComponent.vue';

// 1. Remova as importações e o registro do GSAP/ScrollTrigger daqui.
// Eles agora estão no arquivo HomeAnimations.js.
import { setupHomeAnimations } from '../utils/animations/HomeAnimations.js'; // <-- Novo Import!

// Video sources (Mantenha toda a lógica não-GSAP aqui)
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
    currentVideo.value = index !== null ? index : (currentVideo.value + 1) % videos.length;
    await nextTick();
    isFading.value = false;
  }, 500);
}

// 2. A função setupAnimations foi removida, restando apenas a chamada no onMounted.
onMounted(() => {
  setupHomeAnimations(); // <-- Chama a função importada
});
</script>

<style scoped>
/* Optional local styles */
</style>