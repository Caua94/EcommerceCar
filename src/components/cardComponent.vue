<template>
  <div class="w-full min-h-screen flex flex-col items-center justify-center p-4 py-8 overflow-hidden">
    
    <div v-if="loading" class="text-2xl font-semibold text-gray-700">
      Carregando carros...
    </div>

    <div v-else-if="error" class="text-center">
      <p class="text-2xl font-bold text-red-600">Ocorreu um erro!</p>
      <p class="text-lg text-gray-600">{{ error }}</p>
    </div>

    <div v-else-if="cars.length > 0" class="w-full max-w-6xl flex items-center justify-center gap-2 md:gap-4">
      
      <button 
        @click="prevPage" 
        :disabled="currentPage === 0"
        class="p-2 md:p-4 bg-black backdrop-blur-md border border-white/30 rounded-full shadow-xl hover:bg-black/50 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 disabled:opacity-40 disabled:shadow-lg disabled:cursor-not-allowed group"
        aria-label="Previous Car"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8 text-white transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div ref="cardRef" class="w-full max-w-4xl sm rounded-3xl p-2">
        
        <div v-if="currentCar" :key="currentCar.id" class="w-full flex flex-col items-center gap-2">
          
          <div class="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
            <img :src="currentCar.brandLogo" :alt="`${currentCar.title} logo`" class="w-full h-full object-contain">
          </div>

          <div>
            <p class="text-5xl md:text-7xl lg:text-8xl font-dancing capitalize text-gray-600 text-center tracking-tight">{{ currentCar.title }}</p>
          </div>

          <div class="w-full max-w-3xl my-2">
            <img :src="currentCar.image" :alt="currentCar.title" class="w-full h-auto object-contain drop-shadow-xl" onerror="this.onerror=null;this.src='https://placehold.co/800x600/e2e8f0/475569?text=Imagem+Indisponível';">
          </div>
          
          <div class="flex gap-6 md:gap-10 text-2xl md:text-3xl lg:text-4xl text-gray-200 font-semibold">
            <p>{{ currentCar.price }}</p>
            <p>{{ currentCar.year }}</p>
          </div>
          
          
          <div class="mt-4 w-full flex justify-center">
            <button @click="goToDetails"  class="h-16 md:h-20 lg:h-24 w-full max-w-xs md:max-w-md lg:w-[500px] 
                           text-lg md:text-2xl 
                           bg-yellow-700 font-bold text-white shadow-lg 
                           hover:bg-amber-600 transition-all duration-300 
                           transform hover:scale-105 active:scale-95 rounded-lg">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages - 1"
        class="p-2 md:p-4 bg-black backdrop-blur-md border border-white/30 rounded-full shadow-xl hover:bg-black/50 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 disabled:opacity-40 disabled:shadow-lg disabled:cursor-not-allowed group"
        aria-label="Next Car"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8 text-white transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import gsap from 'gsap';
import carService from '../services/carService'; 
import { useRouter } from 'vue-router';


const cars = ref([]);
const loading = ref(true);
const error = ref(null);
const api_base = "http://localhost:5132";

const router = useRouter();



const goToDetails = () => {
  
  if (currentCar.value) {
    router.push({ 
      name: 'seeMore', 
      params: { id: currentCar.value.id } 
    });
  }
}



const resolveUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('https')) {
    return path;
  }
  return `${api_base}${path}`;
};

const loadCars = async () => {
  try {
    const response = await carService.getAll();
    
    cars.value = response.data.map(apiCar => {
      const brandImgPath = apiCar.brand.imageURL ;
      const carImgPath = apiCar.imageUrl || apiCar.image || apiCar.ImageUrl;

      return {
        id: apiCar.id,
        brandLogo: resolveUrl(brandImgPath),
        title: apiCar.name,
        image: resolveUrl(carImgPath),
        price: apiCar.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || 'R$ 0,00',
        year: `Ano ${apiCar.year}`,
        speed: apiCar.speed,
        engine: apiCar.engine
      };
    });

  } catch (err) {
    console.error("Falha ao buscar carros da API:", err);
    error.value = "Não foi possível carregar a lista de carros.";
  } finally {
    loading.value = false;
  }
};

onMounted(loadCars);

const cardRef = ref(null); 
const currentPage = ref(0);
const itemsPerPage = 1;

const totalPages = computed(() => Math.ceil(cars.value.length / itemsPerPage));
const currentCar = computed(() => cars.value[currentPage.value]);

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
