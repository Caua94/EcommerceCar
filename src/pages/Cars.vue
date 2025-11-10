<template>
  <div>
    <header class="relative h-[70vh] w-full flex items-center justify-center text-center text-white p-4 shadow-2xl">
      <div class="absolute inset-0 w-full h-full bg-black bg-opacity-50 z-10">
        <img src="../assets/imgs/mancar.jpg" alt="A woman driving a modern car" class="absolute inset-0 w-full h-full object-cover z-0">
      </div>
      <div class="relative z-20">
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight drop-shadow-md">Experience True Luxury</h1>
        <p class="mt-4 text-lg md:text-xl max-w-3xl mx-auto drop-shadow">Discover our curated collection of the world's most desirable automobiles.</p>
      </div>
    </header>

    <section class="py-4">
      <CarCarousel />
    </section>

    <header class="relative h-[40vh] w-full flex items-center justify-center text-center text-white p-4 shadow-2xl">
      <div class="absolute inset-0 w-full h-full bg-black bg-opacity-50 z-10">
        <img src="../assets/imgs/insideGoldCAr.jpg" alt="The golden interior of a luxury car" class="absolute inset-0 w-full h-full object-cover z-0">
      </div>
      <div class="relative z-20">
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight drop-shadow-md">Shop Your Dream Car</h1>
      </div>
    </header>
    
    <section class="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-black to-white from-5% via-10% to-15%">
      <div class="relative text-4xl text-white flex justify-between items-center m-10 border-b pb-4">
        <p>Models</p>
        <p>Filters</p>
      </div>
      
      <div v-if="error" class="text-center text-red-600">
        {{ error }}
      </div>
      
      <div v-else-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="n in 8" :key="n" class="bg-white rounded-lg shadow-md h-[400px]">
          <div class="w-full h-64 bg-gray-300 animate-pulse"></div>
          <div class="p-4 space-y-4">
            <div class="w-3/4 h-6 bg-gray-300 rounded animate-pulse"></div>
            <div class="w-1/2 h-8 bg-gray-300 rounded animate-pulse"></div>
            <div class="w-full h-10 bg-gray-400 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <CarCard v-for="car in carList" :key="car.id" :car="car" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CarCarousel from '../components/CardProductComponent.vue';
import CarCard from '../components/CardCarProductGrade.vue';
import carService from '../services/carService';

const carList = ref([]);
const loading = ref(true);
const error = ref(null);

const loadProductList = async () => {
  try {
    const response = await carService.getAll();
    const api_base = "http://localhost:5132";

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