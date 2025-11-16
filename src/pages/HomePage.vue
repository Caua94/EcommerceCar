<template>
  <main class="w-screen h-[100vh] relative flex items-center justify-center overflow-hidden bg-black">
    <div class="absolute z-40 text-white text-center bottom-32 space-y-6 inset-x-0 px-4">
      <p class="text-gray-200 font-medium text-xl md:text-2xl animate-text">Luxury Cars</p>
      <h1 class="text-5xl md:text-7xl font-bold animate-text">Make Your Dream a Reality.</h1>
      <router-link to="/cars"
        class="text-2xl md:text-4xl hover:text-amber-300 hover:scale-105 flex items-center justify-center gap-4 transition-transform animate-text">
        <p>Shop Now</p>
        <ButtonArrow />
      </router-link>
    </div>
    <video :src="videos[currentVideoIndex]"
      class="top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out z-10"
      :class="{ 'opacity-0': isFading }" autoplay muted playsinline preload="auto" @ended="handleVideoEnd()"></video>
    <div class="absolute bottom-4 flex space-x-3 z-50">
      <button v-for="(video, index) in videos" :key="video" @click="changeVideo(index)"
        class="w-4 h-4 rounded-full border-2 transition-colors duration-300" :class="{
          'bg-white border-white': currentVideoIndex === index,
          'bg-transparent border-white': currentVideoIndex !== index,
        }" :aria-label="`Go to video ${index + 1}`"></button>
    </div>
  </main>

  <section
    class="w-screen h-full flex justify-center items-center flex-col text-black gsap-blur-in space-y-4 pt-12 md:pt-20 pb-12 md:pb-20 bg-gradient-to-b from-white via-white via-70% to-black">
    <p class="flex text-4xl md:text-6xl font-bold">Featured Listings</p>
    <p class="border-b border-black w-11/12 md:w-3/4"></p>
    <CardComponent />
  </section>

  <section
    class="w-screen h-[400px] md:h-[600px] flex justify-center items-center overflow-hidden shadow-4xl gsap-blur-in relative bg-black">

    <div class="absolute left-0 md:w-3/5 h-full bg-black rounded-r-full">
      <img src="../assets/imgs/moça.png" alt="Interior of a luxury car" class="w-full h-full object-cover rounded-r-full " />
    </div>

    <div
      class="w-full md:w-2/5 h-full bg-gradient-to-l from-black/90 to-black/10 text-white flex flex-col justify-center items-center absolute right-0 p-4 shadow-2xl space-y-2 md:space-y-4 bg-black g">

      <p class="text-5xl md:text-7xl font-dancing ">Drive Your Dream</p>
      <router-link to="/cars"
        class="text-2xl md:text-3xl hover:text-amber-300 hover:scale-105 flex items-center justify-center gap-4 transition-transform">
        <p>Shop Now</p>
        <ButtonArrow />
      </router-link>
    </div>
  </section>

  <div class="flex justify-center itens-center w-full bg-black border-b border-white pt-12 md:pt-20 gsap-blur-in">
    <h1 class="text-4xl md:text-6xl text-white bg-black font-boldter">Our Brands</h1>
  </div>

  <section id="brand" class="w-screen min-h-screen h-auto flex justify-center items-center bg-black py-10 md:py-20 gsap-blur-in">

    <div v-if="brandsError" class="text-center text-red-600">
      <p>Desculpe, não foi possível carregar as marcas.</p>
      <p>Por favor, tente novamente mais tarde.</p>
    </div>

    <div v-else-if="isLoadingBrands" class="grid grid-cols-1 md:grid-cols-2 gap-8 w-11/12 lg:w-3/4">
      <div v-for="n in 4" :key="n"
        class="w-full max-w-[600px] h-[500px] md:h-[700px] bg-gray-700 animate-pulse rounded-lg"></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 place-items-center gap-8 w-11/12 lg:w-3/4">

      <div v-for="brand in brands" :key="brand.id" class="w-full max-w-[600px] h-[500px] md:h-[700px] rounded-lg shadow-md 
                  hover:scale-105 transition-transform duration-300 ease-in-out 
                  gsap-blur-in relative overflow-hidden 
                  bg-cover bg-center grid place-items-center" :style="{ backgroundImage: 'url(' + buggImg + ')' }">

        <div class="absolute inset-0 bg-black/60 z-10 transition-colors duration-300 hover:bg-black/40">
        </div>

        <img :src="brand.imagemURL" :alt="`${brand.nome} logo`"
          class="relative z-20 object-contain w-24 h-24 md:w-32 md:h-22 px-4 md:px-8 bg-white rounded-full opacity-65" />

        <h1 class="text-white z-20 relative text-5xl md:text-7xl font-dancing capitalize">{{ brand.nome }}</h1>
        <p class="text-white z-20 relative text-xl md:text-2xl bottom-0">See More</p>

      </div>
    </div>
  </section>

  <div class="bg-black w-full h-auto py-12 md:py-24 flex justify-center items-center px-4 text-center">
    <h1 class="text-5xl md:text-8xl text-white capitalize font-dancing gsap-blur-in">More than a sale, a dream come
      true.</h1>
  </div>

  <div class="w-full h-full bg-black flex items-center justify-center p-6 md:p-20">

    <div class="relative w-full max-w-[450px] lg:max-w-[900px] h-auto aspect-square rounded-[100px] lg:rounded-[200px] overflow-hidden 
                hover:scale-105 transition-transform duration-300 ease-in-out 
                gsap-blur-in">

      <div class="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5 z-0 bg-cover bg-center"
        :style="{ backgroundImage: 'url(' + groupDev + ')' }">
      </div>

      <div class="absolute inset-0 bg-black/60 z-10 transition-colors duration-300 hover:bg-black/40"></div>

      <div class="relative z-20 text-white grid place-items-center h-full w-full p-8 text-center space-y-4">
        <h1 class="text-4xl md:text-6xl font-bold">What is DreamCar?</h1>
        <p class="text-xl md:text-3xl">An e-commerce project focused on luxury cars <br> created by 3 developers</p>
        <router-link to="/about" class="text-xl md:text-3xl text-amber-300 hover:underline hover:scale-105">Learn
          More</router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import ButtonArrow from '../utils/animations/ButtonArrow.vue';
import CardComponent from '../components/CardComponent.vue';
import { setupHomeAnimations } from '../utils/animations/HomeAnimations.js';
import brandService from '../services/brandService.js';
import buggImg from '../assets/imgs/bugg.avif';
import groupDev from '../assets/imgs/mosaicoAlunos.png';

const videos = [
  new URL('../assets/videos/carVideo1.mp4', import.meta.url).href,
  new URL('../assets/videos/carVideo2.mp4', import.meta.url).href,
  new URL('../assets/videos/carVideo3.mp4', import.meta.url).href
];
const currentVideoIndex = ref(0);
const isFading = ref(false);

const changeVideo = async (index) => {
  if (index === currentVideoIndex.value) return;

  isFading.value = true;
  setTimeout(async () => {
    currentVideoIndex.value = index;
    await nextTick();
    isFading.value = false;
  }, 500);
};

const handleVideoEnd = () => {
  const nextIndex = (currentVideoIndex.value + 1) % videos.length;
  changeVideo(nextIndex);
};

const brands = ref([]);
const isLoadingBrands = ref(true);
const brandsError = ref(null);
const api_base = "http://localhost:5132";

const fetchBrands = async () => {
  try {
    const response = await brandService.getAll();
    brands.value = response.data.map(brand => ({
      ...brand,
      imagemURL: `${api_base}${brand.imagemURL}`
    }));
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    brandsError.value = 'An error occurred while loading the brands.';
  } finally {
    isLoadingBrands.value = false;
  }
};

onMounted(() => {
  setupHomeAnimations();
  fetchBrands();
});
</script>