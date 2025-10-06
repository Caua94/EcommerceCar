<template>
  <div class="">
    <header class="relative h-[70vh] w-full flex items-center justify-center text-center text-white p-4 shadow-2xl">
      <div class="absolute inset-0 w-full h-full bg-black bg-opacity-50 z-10">
        <img src="../assets/imgs/mancar.jpg" alt="A woman driving a modern car"
          class="absolute inset-0 w-full h-full object-cover z-0">
      </div>

      <div class="relative z-20">
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight drop-shadow-md">
          Experience True Luxury
        </h1>
        <p class="mt-4 text-lg md:text-xl max-w-3xl mx-auto drop-shadow">
          Discover our curated collection of the world's most desirable automobiles.
        </p>
      </div>
    </header>

    <section class="py-4">
      <CarCarousel />
    </section>

    <header class="relative h-[40vh] w-full flex items-center justify-center text-center text-white p-4 shadow-2xl">
      <div class="absolute inset-0 w-full h-full bg-black bg-opacity-50 z-10">
        <img src="../assets/imgs/insideGoldCAr.jpg" alt="The golden interior of a luxury car"
          class="absolute inset-0 w-full h-full object-cover z-0">
      </div>

      <div class="relative z-20">
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight drop-shadow-md">
          Shop Your Dream Car
        </h1>
      </div>
    </header>


    <section
      class="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-black to-white from-5% via-10% to-15%">
      <section class="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative text-4xl text-white flex justify-between items-center m-10 border-b pb-4">
          <p>Models</p>
          <p>Filters</p>
        </div>
      </section>
      <div v-if="loading" class="text-center text-2xl font-semibold text-gray-700">
        Carregando modelos...
      </div>
      <div v-else-if="error" class="text-center text-red-600">
        {{ error }}
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="car in carList" :key="car.id"
          class="bg-white rounded-lg shadow-md overflow-hidden group transform hover:-translate-y-2 transition-all duration-300 border-2 border-blue-900 ">

          <div class="relative w-full h-64 bg-gradient-to-b from-slate-900 to-neutral-500 from-60% via-70% to-100%">
            <img :src="car.image" :alt="car.title" class="w-full h-full object-cover"
              onerror="this.onerror=null;this.src='https://placehold.co/400x300/e2e8f0/475569?text=Imagem';">
            <img v-if="car.brandLogo" :src="car.brandLogo" :alt="'Logo ' + car.title"
              class="absolute top-3 left-3 w-14 h-14 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-lg object-contain z-10">
          </div>

          <div class="p-4">
            <h3 class="text-lg font-bold text-gray-800 truncate">{{ car.title }}</h3>
            <p class="mt-2 text-xl font-semibold text-gray-900">
              {{ car.price }}
            </p>
            <button
              class="mt-4 w-full bg-slate-900 text-white py-2 rounded-lg font-semibold hover:bg-yellow-900 transition-colors border-3 border-blue-400 drop-shadow-[0_0_3px_#00ffff]">
              Ver Mais
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CarCarousel from '../components/CardProductComponent.vue';
import carService from '../services/carService';

// Refs para a lista de produtos
const carList = ref([]);
const loading = ref(true);
const error = ref(null);

// Função para carregar apenas a lista de produtos para esta página
const loadProductList = async () => {
  try {
    const response = await carService.getAll();
    const api_base = "https://localhost:7108";

    carList.value = response.data.map(apiProduct => {
      const brandLogoUrl = (apiProduct.marca && apiProduct.marca.imagemURL)
        ? `${api_base}${apiProduct.marca.imagemURL}`
        : '';

      const productImageUrl = apiProduct.imagemUrl
        ? `${api_base}${apiProduct.imagemUrl}`
        : '';

      return {
        id: apiProduct.id,
        brandLogo: brandLogoUrl,
        title: apiProduct.nome,
        image: productImageUrl,
        price: apiProduct.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        year: `Ano ${apiProduct.ano}`,
      };
    });

  } catch (err) {
    console.error("Falha ao buscar a lista de produtos:", err);
    error.value = "Não foi possível carregar os modelos.";
  } finally {
    loading.value = false;
  }
};

onMounted(loadProductList);
</script>