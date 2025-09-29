<template>
  <div class="">
    <!-- CABEÇALHO -->
    <header class="relative h-[70vh] w-full flex items-center justify-center text-center text-white p-4 shadow-2xl">
      <div class="absolute inset-0 w-full h-full bg-black bg-opacity-50 z-10"><img src="../assets/imgs/mancar.jpg" alt="A woman driving a modern car"
           class="absolute inset-0 w-full h-full object-cover z-0"></div>
      

      <div class="relative z-20">
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight drop-shadow-md">
          Experience True Luxury
        </h1>
        <p class="mt-4 text-lg md:text-xl max-w-3xl mx-auto drop-shadow">
          Discover our curated collection of the world's most desirable automobiles.
        </p>
      </div>
    </header>

    <!-- SECÇÃO DO CARROSSEL -->
    <section class="py-4">
      <!-- Aqui utilizamos o seu componente de carrossel já existente -->
      <CarCarousel />
    </section>

    <!-- CABEÇALHO -->
    <header class="relative h-[40vh] w-full flex items-center justify-center text-center text-white p-4 shadow-2xl">
      <div class="absolute inset-0 w-full h-full bg-black bg-opacity-50 z-10"><img src="../assets/imgs/insideGoldCAr.jpg" alt="A woman driving a modern car"
           class="absolute inset-0 w-full h-full object-cover z-0"></div>
      

      <div class="relative z-20">
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight drop-shadow-md">
          Shop Your Dream Car
        </h1>
      </div>
    </header>

    <!-- SECÇÃO DE MODELOS E FILTROS -->
    <section class="w-full  mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative text-4xl text-black flex justify-between items-center m-10 border-b pb-4">
        <p>Models</p>
        <p>Filters</p>
      </div>
    </section>

    <!-- NOVA LISTA DE PRODUTOS DA API -->
    <section class="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Estado de Carregamento -->
      <div v-if="loading" class="text-center text-2xl font-semibold text-gray-700">
        Carregando modelos...
      </div>
      <!-- Estado de Erro -->
      <div v-else-if="error" class="text-center text-red-600">
        {{ error }}
      </div>
      <!-- Lista de Produtos -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="car in carList" :key="car.id" class="bg-white rounded-lg shadow-md overflow-hidden group transform hover:-translate-y-2 transition-all duration-300">
          <div class="w-full h-92 bg-gray-200">
            <img :src="car.imagemUrl" :alt="car.nome" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='https://placehold.co/400x300/e2e8f0/475569?text=Imagem';">
          </div>
          <div class="p-4">
            <h3 class="text-lg font-bold text-gray-800 truncate">{{ car.nome }}</h3>
            <p class="mt-2 text-xl font-semibold text-gray-900">
              {{ car.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
            </p>
            <button class="mt-4 w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors">
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
// Importamos o seu componente de carrossel. O nome aqui deve corresponder ao que está no seu template.
// Se o seu ficheiro se chama CarCarousel.vue, o nome do componente é CarCarousel.
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
    // Preenche a lista com os dados da API
    carList.value = response.data;
  } catch (err) {
    console.error("Falha ao buscar a lista de produtos:", err);
    error.value = "Não foi possível carregar os modelos.";
  } finally {
    loading.value = false;
  }
};

// Quando a página é montada, busca a lista de produtos
onMounted(loadProductList);
</script>



