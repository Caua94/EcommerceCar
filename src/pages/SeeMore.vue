<template>
  <main class="relative w-full h-full overflow-x-hidden">
    <section ref="heroRef" class="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      <video :src="car?.videoDemoUrl" class="h-screen object-cover z-0" autoplay loop muted playsinline
        preload="auto"></video>
    </section>
  </main>

  <img v-if="car && car.marca" :src="car.marca.imagemURL" :alt="'Logo ' + car.nome"
    class="fixed top-1/2 left-2 w-16 h-16 sm:left-3 sm:w-25 sm:h-25 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-lg object-contain z-50">

  <button @click="goToCheckout"
    class="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center opacity-90 bg-black hover:bg-amber-800 text-white font-semibold py-3 px-8 sm:py-4 sm:px-12 rounded-full shadow-lg z-30 hover:opacity-100 border border-amber-500 hover:scale-110">
    <span class="">Buy now</span>
  </button>

  <div v-if="car">
    <div
      class="storytelling-block relative grid grid-cols place-items-center justify-center px-4 sm:px-8 py-16 bg-gradient-to-b from-black to-gray-600 z-10 overflow-hidden text-white">

      <img :src="car.imagemUrl" class="h-full w-full" :alt="car.nome">

      <div class="max-w-3xl text-center relative z-10 space-y-4 mt-8 sm:mt-0">
        <h2 class="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">{{ car.nome }}</h2>
        <p class="text-lg sm:text-2xl leading-relaxed">
          {{ car.descricao }}
        </p>
      </div>
    </div>

    <div
      class="storytelling-block relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 z-10 overflow-hidden bg-gradient-to-b from-gray-600 to-black">

      <h2 class="text-3xl sm:text-5xl font-bold text-white mb-8 sm:mb-10 max-w-3xl mx-auto text-center">Details</h2>
      <img class="h-64 sm:h-96 mb-8" :src="car.imagemMotorUrl">
      <div class="w-full text-center relative z-10">
        <div
          class="flex flex-col md:flex-row w-full justify-evenly text-2xl md:text-4xl border-t border-b border-white p-2 px-5">
          <p class="text-gray-100 leading-relaxed py-2 md:py-0">
            Speed: {{ car.velocidade }}Km/h
          </p>
          <p class="text-gray-100 hidden md:block">|</p>
          <p v-if="car.categoria" class="text-gray-100 leading-relaxed py-2 md:py-0">
            Categoria: {{ car.categoria.nome }}
          </p>
          <p v-else class="text-gray-100 leading-relaxed py-2 md:py-0">Categoria: N/A</p>
          <p class="text-gray-100 hidden md:block">|</p>
          <p class="text-gray-100 leading-relaxed py-2 md:py-0">
            Engine: {{ car.motor }}
          </p>
          <p class="text-gray-100 hidden md:block">|</p>
          <p class="text-gray-100 leading-relaxed py-2 md:py-0">
            Ano: {{ car.ano }}
          </p>
        </div>
      </div>
    </div>

    <div
      class="storytelling-block relative h-screen w-screen flex items-center justify-center px-4 sm:px-8 bg-stone-900 z-10 overflow-hidden">
      <img :src="car.imagemInteriorUrl" class="h-full w-full object-cover" :alt="car.nome" />
    </div>

  </div>

  <div v-else class="h-screen w-screen flex items-center justify-center bg-black text-white text-3xl">
    Carregando...
  </div>
</template>

<script setup>

import { ref, onMounted, nextTick } from "vue";
import { setupAboutPageAnimations } from "../utils/animations/seeMoreAnimations.js";
import carService from '../services/carService.js';

import categoryService from "../services/categoryService.js";
import brandService from "../services/brandService.js";
import { useRouter } from 'vue-router';


const props = defineProps({
  id: {
    type: String,
    required: true
  }
});


const car = ref(null);
const router = useRouter();
const heroRef = ref(null);

const fetchCarDetails = async () => {
  try {
    const api_base = "http://localhost:5132";


    const response = await carService.getById(props.id);
    const carData = response.data;


    if (carData.categoriaId) {
      try {
        const categoryResponse = await categoryService.getById(carData.categoriaId);
        carData.categoria = categoryResponse.data;
      } catch (catError) {
        console.error("Erro ao buscar categoria:", catError);
      }
    }

    if (carData.marcaId) {
      try {
        const brandResponse = await brandService.getById(carData.marcaId);
        carData.marca = brandResponse.data;
        if (carData.marca && carData.marca.imagemURL) {
          carData.marca.imagemURL = `${api_base}${carData.marca.imagemURL}`;
        }
      } catch (brandError) {
        console.error("Erro ao buscar marca:", brandError);
      }
    }

    if (carData.imagemUrl) carData.imagemUrl = `${api_base}${carData.imagemUrl}`;
    if (carData.imagemInteriorUrl) carData.imagemInteriorUrl = `${api_base}${carData.imagemInteriorUrl}`;
    if (carData.imagemMotorUrl) carData.imagemMotorUrl = `${api_base}${carData.imagemMotorUrl}`;
    if (carData.videoDemoUrl) carData.videoDemoUrl = `${api_base}${carData.videoDemoUrl}`;


    car.value = carData;


    await nextTick();


    setupAboutPageAnimations(heroRef.value);

  } catch (error) {
    console.error("Erro ao buscar detalhes do carro:", error);
  }
};

const goToCheckout = () => {
  if (car.value) {
    router.push({ name: 'Cart', params: { id: car.value.id } });
  }
};



onMounted(() => {

  fetchCarDetails();
});

</script>