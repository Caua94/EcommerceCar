<template>
  <div class="w-full min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
    
    <!-- Mensagem de Carregamento -->
    <div v-if="loading" class="text-2xl font-semibold text-gray-700">
      Carregando carros...
    </div>

    <!-- Mensagem de Erro -->
    <div v-else-if="error" class="text-center">
      <p class="text-2xl font-bold text-red-600">Ocorreu um erro!</p>
      <p class="text-lg text-gray-600">{{ error }}</p>
    </div>

    <!-- Conteúdo Principal (Carrossel) -->
    <div v-else-if="cars.length > 0" class="w-full max-w-6xl flex items-center justify-center gap-4">
      
      <!-- BOTÃO PREV ATUALIZADO -->
      <button 
        @click="prevPage" 
        :disabled="currentPage === 0"
        class="p-4 bg-black backdrop-blur-md border border-white/30 rounded-full shadow-xl hover:bg-black/50 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 disabled:opacity-40 disabled:shadow-lg disabled:cursor-not-allowed group"
        aria-label="Previous Car"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div ref="cardRef" class="w-full max-w-4xl backdrop-blur-sm rounded-3xl p-2">
        
        <div v-if="currentCar" :key="currentCar.id" class="w-full flex flex-col items-center gap-2">
          
          <div class="w-24 h-24">
            <!-- NOTA: A API não fornece um logo da marca, estamos usando um placeholder -->
            <img :src="currentCar.brandLogo" :alt="`${currentCar.title} logo`" class="w-full h-full object-contain">
          </div>

          <div>
            <p class="text-6xl md:text-8xl font-bold uppercase text-gray-600 text-center tracking-tight">{{ currentCar.title }}</p>
          </div>

          <div class="w-full max-w-3xl my-2">
            <img :src="currentCar.image" :alt="currentCar.title" class="w-full h-auto object-contain drop-shadow-xl" onerror="this.onerror=null;this.src='https://placehold.co/800x600/e2e8f0/475569?text=Imagem+Indisponível';">
          </div>
          
          <div class="flex gap-10 text-3xl md:text-4xl text-gray-700 font-semibold">
            <!-- Mapeamos o Preço e o Ano para estes campos -->
            <p>{{ currentCar.price }}</p>
            <p>{{ currentCar.year }}</p>
          </div>
          
          <div class="mt-4">
            <button class="bg-yellow-700 h-24 w-[500px] text-2xl font-bold text-white shadow-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 active:scale-95">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <!-- BOTÃO NEXT ATUALIZADO -->
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages - 1"
        class="p-4 bg-black backdrop-blur-md border border-white/30 rounded-full shadow-xl hover:bg-black/50 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 disabled:opacity-40 disabled:shadow-lg disabled:cursor-not-allowed group"
        aria-label="Next Car"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import gsap from 'gsap';
// 1. Importar o nosso serviço de API de carros
import carService from '../services/carService'; 

// --- DATA ---
// A lista de carros agora começa vazia e será preenchida pela API
const cars = ref([]);
const loading = ref(true);
const error = ref(null);

// --- LÓGICA DA API ---
const loadCars = async () => {
  try {
    const response = await carService.getAll();
    // 2. Mapear os dados da API para o formato que o seu template espera
    cars.value = response.data.map(apiCar => ({
      id: apiCar.id, // Assumindo que a API retorna um ID
      brandLogo: new URL('../assets/imgs/nissan.png', import.meta.url).href, // Placeholder
      title: apiCar.nome,
      image: apiCar.imagemUrl,
      price: apiCar.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      year: `Ano ${apiCar.ano}`,
    }));
  } catch (err) {
    console.error("Falha ao buscar carros da API:", err);
    error.value = "Não foi possível carregar a lista de carros. Tente novamente mais tarde.";
  } finally {
    loading.value = false;
  }
};

// 3. Chamar a função para carregar os dados quando o componente for montado
onMounted(loadCars);


// --- PAGINATION & ANIMATION REFS ---
const cardRef = ref(null); 
const currentPage = ref(0);
const itemsPerPage = 1;

// --- COMPUTED PROPERTIES ---
const totalPages = computed(() => Math.ceil(cars.value.length / itemsPerPage));
const currentCar = computed(() => cars.value[currentPage.value]);

// --- NAVIGATION & ANIMATION LOGIC (Nenhuma alteração necessária aqui) ---
const animateAndChangePage = (direction) => {
  if (!cardRef.value) return;

  const slideOutX = direction === 'next' ? -50 : 50;
  const slideInX = direction === 'next' ? 50 : -50;

  const tl = gsap.timeline({
    onComplete: () => {
      if (direction === 'next') {
        currentPage.value++;
      } else {
        currentPage.value--;
      }
      gsap.fromTo(cardRef.value, 
        { xPercent: slideInX, opacity: 0 }, 
        { xPercent: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    }
  });

  tl.to(cardRef.value, {
    xPercent: slideOutX,
    opacity: 0,
    duration: 0.4,
    ease: 'power3.in'
  });
};

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    animateAndChangePage('next');
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    animateAndChangePage('prev');
  }
};
</script>

<style scoped>
/* Scoped styles can be added here if needed */
</style>

