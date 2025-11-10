<template>
  <main class="relative w-full h-full overflow-x-hidden">
    <section ref="heroRef" class="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      <video :src="car?.videoDemoUrl" class=" h-screen object-cover z-0" autoplay loop muted playsinline
        preload="auto"></video>
    </section>

  </main>
  <img v-if="car && car.marca" :src="car.marca.imagemURL" :alt="'Logo ' + car.nome"
    class="fixed top-1/2 left-3 w-25 h-25 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-lg object-contain z-50">
  <button @click="goToCheckout"
    class="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center opacity-90 bg-black hover:bg-amber-800 text-white font-semibold py-4 px-12 rounded-full shadow-lg z-30 hover:opacity-100 border border-amber-500 hover:scale-110">
    <span class="">Buy now</span>
  </button>

  <div v-if="car">
    <div
      class="storytelling-block relative grid grid-cols place-items-center justify-center px-8 bg-gradient-to-b from-black to-gray-600 z-10 overflow-hidden text-white">

      <img :src="car.imagemUrl" class="h-full w-full" :alt="car.nome">

      <div class="max-w-3xl text-center relative z-10 space-y-4">
        <h2 class="text-5xl font-bold mb-6 ">{{ car.nome }}</h2>
        <p class="text-2xl leading-relaxed ">
          {{ car.descricao }}
        </p>
      </div>
    </div>
    <div
      class="storytelling-block relative h-screen flex flex-col items-center justify-center p-5 z-10 overflow-hidden bg-gradient-to-b from-gray-600 to-black">

      <h2 class="text-5xl font-bold text-white mb-10 max-w-3xl mx-auto">Details</h2>
      <img class="h-96 mb-8 m-10" :src="car.imagemMotorUrl">
      <div class="w-full text-center relative z-10">
        <div class="flex w-full justify-evenly text-4xl border-t border-b border-white p-2 px-5">
          <p class="text-gray-100 leading-relaxed">
            Speed: {{ car.velocidade }}Km/h
          </p>
          <p class="text-gray-100">|</p>
          <p v-if="car.categoria" class=" text-gray-100 leading-relaxed">
            Categoria: {{ car.categoria.nome }}
          </p>
          <p v-else class="text-gray-100 leading-relaxed">Categoria: N/A</p>
          <p class="text-gray-100">|</p>
          <p class=" text-gray-100 leading-relaxed">
            Engine: {{ car.motor }}
          </p>
          <p class="text-gray-100">|</p>
          <p class=" text-gray-100 leading-relaxed">
            Ano: {{ car.ano }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="storytelling-block relative h-screen w-screen flex items-center justify-center px-8 bg-stone-900 z-10 overflow-hidden">

      <img :src="car.imagemInteriorUrl" class="h-full w-full" :alt="car.nome" />
    </div>

  </div>
  <div v-else class="h-screen w-screen flex items-center justify-center bg-black text-white text-3xl">
    Carregando...
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { setupAboutPageAnimations } from "../utils/animations/AboutAnimations.js";
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

const fetchCarDetails = async () => {
  try {
    const api_base = "http://localhost:5132";

    // 1. Busca o carro
    const response = await carService.getById(props.id);
    const carData = response.data;
    console.log("DADOS INICIAIS DO CARRO:", carData);

    // 2. Busca a categoria (SE o ID existir)
    if (carData.categoriaId) {
      try {
        const categoryResponse = await categoryService.getById(carData.categoriaId);
        carData.categoria = categoryResponse.data; // <-- ATRIBUI O OBJETO DA CATEGORIA
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

    // ... (Seu código que prefixa as URLs do carro) ...
    // ... (Mova o código de prefixo de URL para depois de ter os dados)
    if (carData.imagemUrl) carData.imagemUrl = `${api_base}${carData.imagemUrl}`;
    if (carData.imagemInteriorUrl) carData.imagemInteriorUrl = `${api_base}${carData.imagemInteriorUrl}`;
    if (carData.imagemMotorUrl) carData.imagemMotorUrl = `${api_base}${carData.imagemMotorUrl}`;
    if (carData.videoDemoUrl) carData.videoDemoUrl = `${api_base}${carData.videoDemoUrl}`;

    // 5. Salva o objeto 'carData' (agora completo) no ref
    car.value = carData;
    console.log("DADOS FINAIS (COM CATEGORIA):", car.value);

  } catch (error) {
    console.error("Erro ao buscar detalhes do carro:", error);
  }
};

const goToCheckout = () => {
  if (car.value) {
   
    router.push({ name: 'Cart', params: { id: car.value.id } });
  }
};

const backgroundVideo = new URL('../assets/videos/Ferrari_Demonstration_Video_Recreation.mp4', import.meta.url).href;
const heroRef = ref(null);

onMounted(() => {
  fetchCarDetails(); 
  setupAboutPageAnimations(heroRef.value);
});

</script>