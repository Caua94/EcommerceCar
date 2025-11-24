<template>
  <div class="w-full min-h-screen bg-black overflow-hidden">
  <header class="relative h-[70vh] w-full flex items-center justify-center text-center text-white p-4 bg-white">

    <div class="absolute inset-0 w-full h-full bg-white bg-opacity-50 z-10">

      <img src="../assets/imgs/carsPagebg.jpg" alt="A woman driving a modern car"
        class="absolute inset-0 w-full h-full object-cover z-0 [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]">

    </div>

    <div class="relative z-20 ">

      <h1
        class="text-5xl md:text-7xl font-bold tracking-tight drop-shadow-md playfair-display-sc-bold-italic animate-text">
        Experience True Luxury</h1>

      <p class="mt-4 text-lg md:text-xl max-w-3xl mx-auto drop-shadow animate-text playfair-display-sc-regular">Discover
        our curated collection of the world's

        most desirable automobiles.</p>

    </div>

  </header>



  <section class="py-4 bg-gradient-to-b from-white via-white via-70% to-black playfair-display-sc-regular">

    <CarCarousel />

  </section>



  <header
    class="relative h-92 w-full flex items-center justify-center text-center text-white p-4 shadow-2xl gsap-blur-in">

    <div class="relative z-20">

      <h1 class="text-5xl md:text-7xl font-dancing capitalize">Realize your Dream, Shop Your Dream Car</h1>

    </div>

  </header>



  <section class="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-black gsap-blur-in playfair-display-sc-regular">



    <div class="relative text-white flex justify-between items-center m-10 border-b pb-4 playfair-display-sc-regular">

      <p class="text-4xl">Models</p>



      <button @click="openProducts" class="hover:text-amber-300 transition-colors flex items-center gap-2"
        :aria-expanded="productsOpen ? 'true' : 'false'" aria-controls="products-drawer">

        <svg class="w-5 h-5 transition-transform scale-x-[-1]" viewBox="0 0 20 20" fill="currentColor">

          <path fill-rule="evenodd" d="M6 6l6 4-6 4V6z" clip-rule="evenodd" />

        </svg>

        <p class="text-4xl">Filters</p>

      </button>



      <aside id="products-drawer" :class="[

        'fixed top-0 left-0 h-screen w-[30rem] max-w-[90vw] bg-stone-900 text-white z-[60] shadow-2xl',

        'transition-transform transform duration-700 ease-in-out',

        productsOpen ? 'translate-x-0' : '-translate-x-full'

      ]" tabindex="-1" ref="productsPanelRef" aria-label="Products Menu">



        <FilterComponent @close="productsOpen = false" />



      </aside>

    </div>



    <div v-if="error" class="text-center text-red-600">

      {{ error }}

    </div>



    <div v-else-if="isLoading && carList.length === 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

      <div v-for="n in 8" :key="n" class="bg-white rounded-lg shadow-md h-[400px]">

        <div class="w-full h-64 bg-gray-300 animate-pulse"></div>

        <div class="p-4 space-y-4">

          <div class="w-3/4 h-6 bg-gray-300 rounded animate-pulse"></div>

          <div class="w-1/2 h-8 bg-gray-300 rounded animate-pulse"></div>

          <div class="w-full h-10 bg-gray-400 rounded animate-pulse"></div>

        </div>

      </div>

    </div>



    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 playfair-display-sc-regular">

      <CarCard v-for="car in carList" :key="car.id" :car="car" />

    </div>



    <div v-if="!isLoading && carList.length === 0 && !error"
      class="text-center text-gray-400 mt-12 text-xl playfair-display-sc-regular">

      <p>Nenhum carro encontrado com esses filtros.</p>

    </div>



    <div class="text-center mt-12 flex items-center justify-center playfair-display-sc-regular " v-if="hasMorePages">

      <button @click="loadMore" :disabled="isLoading"
        class="px-8 py-3 text-white font-bold rounded-lg shadow-lg transition-all hover:text-amber-300 hover:scale-105 disabled:opacity-50 disabled:cursor-wait grid place-items-center ">

        {{ isLoading ? 'Carregando...' : 'Carregar Mais Modelos' }}

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">

          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />

        </svg>

      </button>

    </div>



    <div v-if="!hasMorePages && carList.length > 0 && !error"
      class="text-center text-gray-400 mt-12 playfair-display-sc-regular">

      <p>Fim dos resultados.</p>

    </div>



  </section>


  </div>
</template>



<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import { setupHomeAnimations } from '../utils/animations/HomeAnimations.js';
import FilterComponent from '../components/FilterComponent.vue';
import CarCarousel from '../components/CardComponent.vue';
import CarCard from '../components/CardCarProductGrade.vue';
import carService from '../services/carService.js';

const route = useRoute();

const isAdmin = ref(false);
const carList = ref([]);
const error = ref(null);
const isLoading = ref(true);
const hasMorePages = ref(true);
const api_base = "http://localhost:5132";
const productsOpen = ref(false);
const productsPanelRef = ref(null);

const filters = ref({
  Name: null,
  PriceMin: null,
  PriceMax: null,
  YearMin: null,
  YearMax: null,
  CategoryId: null,
  BrandId: null,
  PageNumber: 1,
  PageSize: 3
});

const resolveUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('https')) {
    return path;
  }
  return `${api_base}${path}`;
};

const checkLoginStatus = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    const role = localStorage.getItem('userRole');
    isAdmin.value = (role === 'Admin' || role === 'admin');
  } else {
    isAdmin.value = false;
  }
};

const mapApiProduct = (apiProduct) => {
  const brandImgPath = apiProduct.brand?.imageURL || apiProduct.brand?.imageUrl || apiProduct.marca?.imagemURL;
  const carImgPath = apiProduct.imageUrl || apiProduct.imageURL || apiProduct.imagemUrl;

  return {
    id: apiProduct.id,
    brandLogo: resolveUrl(brandImgPath),
    title: apiProduct.name || apiProduct.nome,
    image: resolveUrl(carImgPath),
    price: (apiProduct.price || apiProduct.preco)?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    year: `Ano ${apiProduct.year || apiProduct.ano}`,
  };
};

const syncFiltersWithUrl = () => {
  const q = route.query;

  filters.value = {
    Name: q.Name || null,
    PriceMin: q.PriceMin ? Number(q.PriceMin) : null,
    PriceMax: q.PriceMax ? Number(q.PriceMax) : null,
    YearMin: q.YearMin ? Number(q.YearMin) : null,
    YearMax: q.YearMax ? Number(q.YearMax) : null,
    BrandId: q.BrandId || null,
    CategoryId: q.CategoryId || null,
    PageNumber: 1,
    PageSize: 3
  };
};

const fetchInitialCars = async () => {
  isLoading.value = true;
  hasMorePages.value = true;
  error.value = null;

  try {
    const response = await carService.filterCars(filters.value);
    const pageData = response.data;
    const carsArray = pageData.items || pageData.Items || [];

    carList.value = carsArray.map(mapApiProduct);

    if (carsArray.length < filters.value.PageSize) {
      hasMorePages.value = false;
    }
  } catch (err) {
    console.error(err);
    error.value = "Não foi possível carregar os modelos.";
  } finally {
    isLoading.value = false;
  }
};

const loadMore = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  filters.value.PageNumber++;

  try {
    const response = await carService.filterCars(filters.value);
    const pageData = response.data;
    const newCarsArray = pageData.items || pageData.Items || [];

    if (newCarsArray.length > 0) {
      const newCarsMapped = newCarsArray.map(mapApiProduct);
      carList.value = [...carList.value, ...newCarsMapped];
    }

    if (newCarsArray.length < filters.value.PageSize) {
      hasMorePages.value = false;
    }
  } catch (err) {
    console.error(err);
    hasMorePages.value = false;
  } finally {
    isLoading.value = false;
  }
};

const openProducts = async () => {
  productsOpen.value = true;
  await nextTick();
  if (productsPanelRef.value) {
    productsPanelRef.value.focus();
  }
};

watch(
  () => route.query,
  (newQuery, oldQuery) => {
    if (JSON.stringify(newQuery) === JSON.stringify(oldQuery)) return;
    syncFiltersWithUrl();
    fetchInitialCars();
  }
);

onMounted(() => {
  checkLoginStatus();
  syncFiltersWithUrl();
  fetchInitialCars();

  requestAnimationFrame(() => {
    setupHomeAnimations();
  });
});
</script>