<template>
  <div class=" playfair-display-sc-regular">
    <header class="relative h-screen w-full flex items-center justify-center text-center text-white p-4 shadow-2xl ">
      <div class="absolute inset-0 w-full bg-black bg-opacity-50 z-10 ">
        <img v-if="currentBrand && currentBrand.logoBrandUrl" :src="currentBrand.logoBrandUrl" :alt="currentBrand.name"
          class="absolute inset-0 w-full h-full object-cover z-0 [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]">
        <div v-else class="absolute inset-0 w-full h-full bg-gray-900 z-0"></div>
      </div>

      <div class="absolute inset-0 bg-black/60 z-10 transition-colors duration-300"></div>

      <div class="relative z-20 grid place-items-center space-y-5 animate-text ">
        <h1 class="text-5xl md:text-9xl font-dancing">
          {{ currentBrand ? currentBrand.name : 'Carregando...' }}
        </h1>
        <a href="#carList">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-10 animate-bounce">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
          </svg>
        </a>
      </div>
    </header>

    <section v-if="currentBrand"
      class="w-full h-[400px] md:h-[600px] flex justify-center items-center overflow-hidden shadow-4xl  relative bg-black border-t border-b border-gray-500 mt-20 gsap-blur-in">

      <div class="absolute left-0 md:w-2/5 h-full">
        <img :src="currentBrand.bgBrandUrl" :alt="'Interior of ' + currentBrand.name"
          class="w-full h-full object-cover [mask-image:linear-gradient(to_right,black_70%,transparent_100%)]" />
      </div>

      <div
        class="w-full md:w-2/5 h-full bg-gradient-to-l from-black/90 to-black/10 text-white flex flex-col justify-center items-center absolute right-5 p-4 shadow-2xl space-y-2 md:space-y-4 bg-black">
        <h1 class="text-5xl md:text-8xl text-right playfair-display-sc-bold">What is {{ currentBrand.name }}?</h1>

        <p class="text-xl md:text-3xl text-right line-clamp-6">
          {{ currentBrand.description || `Descubra a excelência e o design inconfundível da ${currentBrand.name}.` }}
        </p>

        <a class="hover:scale-105 hover:text-blue-400 hover:underline" href="#">Learn More</a>
      </div>
    </section>

    <div
      class="relative h-[40vh] w-full flex items-center justify-center text-center text-white p-4 shadow-2xl gsap-blur-in">
      <div class="relative z-20">
        <h1 class="text-5xl md:text-7xl font-dancing capitalize">
          Realize your Dream, Shop Your {{ currentBrand ? currentBrand.name : 'Car' }}
        </h1>
      </div>
    </div>

    <section class="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-black">

      <div id="carList" class="relative  text-white flex justify-between items-center m-10 border-b pb-4">
        <p class="text-4xl">Models</p>

        <button @click="openProducts" class="hover:text-amber-300 transition-colors flex items-center gap-2"
          :aria-expanded="productsOpen ? 'true' : 'false'" aria-controls="products-drawer">
          <svg class="w-5 h-5 transition-transform scale-x-[-1]" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 6l6 4-6 4V6z" clip-rule="evenodd" />
          </svg>
          <p class="text-4xl">Filter</p>
        </button>

        <aside id="products-drawer" :class="[
          'fixed top-0 left-0 h-screen w-[30rem] max-w-[90vw] bg-stone-900 text-white z-[60] shadow-2xl',
          'transition-transform transform duration-700 ease-in-out',
          productsOpen ? 'translate-x-0' : '-translate-x-full'
        ]" tabindex="-1" ref="productsPanelRef" aria-label="Products Menu">

          <FilterComponent @close="productsOpen = false" :show-brands="false" />

        </aside>
      </div>

      <div v-if="error" class="text-center text-red-600">
        {{ error }}
      </div>

      <div v-else-if="isLoading && carList.length === 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="n in 4" :key="n" class="bg-white rounded-lg shadow-md h-[400px]">
          <div class="w-full h-64 bg-gray-300 animate-pulse"></div>
          <div class="p-4 space-y-4">
            <div class="w-3/4 h-6 bg-gray-300 rounded animate-pulse"></div>
            <div class="w-1/2 h-8 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <CarCard v-for="car in carList" :key="car.id" :car="car" />
      </div>

      <div v-if="!isLoading && carList.length === 0 && !error" class="text-center text-gray-400 mt-12">
        <p class="text-2xl">Nenhum modelo encontrado com estes filtros.</p>
      </div>

      <div class="text-center mt-12 flex items-center justify-center" v-if="hasMorePages">
        <button @click="loadMore" :disabled="isLoading"
          class="px-8 py-3 text-white font-bold rounded-lg shadow-lg transition-all hover:text-amber-300 hover:scale-105 disabled:opacity-50 disabled:cursor-wait grid place-items-center">
          {{ isLoading ? 'Carregando...' : 'Carregar Mais Modelos' }}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg>
        </button>
      </div>

      <div v-if="!hasMorePages && carList.length > 0 && !error" class="text-center text-gray-400 mt-12">
        <p>Fim dos resultados.</p>
      </div>

    </section>

  </div>
  
  <div v-if="isAdmin" class="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">

    <button @click.stop="goToUpdate"
      class="w-12 h-12 bg-amber-400 hover:bg-amber-500 hover:scale-110 active:scale-95 text-black rounded-full shadow-2xl shadow-black/50 transition-all duration-300 flex items-center justify-center border border-white/20">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
    </button>

    <button @click.stop="handleDelete"
      class="w-12 h-12 bg-red-600 hover:bg-red-700 hover:scale-110 active:scale-95 text-white rounded-full shadow-2xl shadow-black/50 transition-all duration-300 flex items-center justify-center border border-white/20">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { setupHomeAnimations } from '../utils/animations/HomeAnimations.js';
import CarCard from '../components/CardCarProductGrade.vue';
import FilterComponent from '../components/FilterComponent.vue';
import carService from '../services/carService.js';
import brandService from '../services/brandService.js';

const route = useRoute();
const router = useRouter();

const isAdmin = ref(false);
const carList = ref([]);
const currentBrand = ref(null);
const error = ref(null);
const isLoading = ref(true);
const hasMorePages = ref(true);

// --- AJUSTE PARA O RENDER ---
// Pega a URL do ambiente. Se tiver "/api" no final, remove (para pegar imagens na raiz)
const api_base = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : "http://localhost:5132";
// ----------------------------

const productsOpen = ref(false);
const productsPanelRef = ref(null);

const filters = ref({
  BrandId: null,
  Name: null,
  PriceMin: null,
  PriceMax: null,
  YearMin: null,
  YearMax: null,
  CategoryId: null,
  PageNumber: 1,
  PageSize: 3
});

const checkLoginStatus = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    const role = localStorage.getItem('userRole');
    isAdmin.value = (role === 'Admin' || role === 'admin');
  } else {
    isAdmin.value = false;
  }
};

const goToUpdate = () => {
  if (currentBrand.value) {
    router.push({ 
      name: 'update', 
      params: { id: currentBrand.value.id } 
    });
  }
};

const handleDelete = async () => {
  if (!currentBrand.value) return;

  if (confirm(`Tem certeza que deseja deletar a marca "${currentBrand.value.name}"?`)) {
    try {
      await brandService.delete(currentBrand.value.id);
      alert('Marca deletada com sucesso!');
      router.push('/'); 
    } catch (error) {
      console.error(error);
      alert('Erro ao deletar a marca. Verifique se existem carros vinculados.');
    }
  }
};

// --- AJUSTE DE SEGURANÇA NA URL ---
const resolveUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('https')) {
    return path;
  }
  
  // Garante a formatação correta da URL da imagem
  const baseUrl = api_base.endsWith('/') ? api_base.slice(0, -1) : api_base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}${cleanPath}`;
};
// ----------------------------------

const mapApiProduct = (apiProduct) => {
  const brandImg = apiProduct.brand?.imageUrl || apiProduct.brand?.imageURL || apiProduct.marca?.imagemURL;
  const carImg = apiProduct.imageUrl || apiProduct.imagemUrl;

  return {
    id: apiProduct.id,
    brandLogo: resolveUrl(brandImg),
    title: apiProduct.name || apiProduct.nome,
    image: resolveUrl(carImg),
    price: (apiProduct.price || apiProduct.preco)?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    year: `Ano ${apiProduct.year || apiProduct.ano}`,
  };
};

const syncFiltersWithUrl = () => {
  const q = route.query;
  filters.value = {
    BrandId: route.params.id,
    Name: q.Name || null,
    PriceMin: q.PriceMin ? Number(q.PriceMin) : null,
    PriceMax: q.PriceMax ? Number(q.PriceMax) : null,
    YearMin: q.YearMin ? Number(q.YearMin) : null,
    YearMax: q.YearMax ? Number(q.YearMax) : null,
    CategoryId: q.CategoryId || null,
    PageNumber: 1,
    PageSize: 3
  };
};

const fetchData = async () => {
  isLoading.value = true;
  hasMorePages.value = true;
  const activeBrandId = filters.value.BrandId;

  try {
    if (!currentBrand.value || currentBrand.value.id !== activeBrandId) {
      const brandResponse = await brandService.getById(activeBrandId);
      const bData = brandResponse.data;

      currentBrand.value = {
        id: bData.id,
        name: bData.name,
        description: bData.description,
        imageUrl: resolveUrl(bData.imageUrl || bData.imageURL),
        bgBrandUrl: resolveUrl(bData.bgBrand),
        logoBrandUrl: resolveUrl(bData.logoBrand)
      };
    }

    const carResponse = await carService.filterCars(filters.value);
    const pageData = carResponse.data;
    const carsArray = pageData.items || pageData.Items || [];

    carList.value = carsArray.map(mapApiProduct);

    if (carsArray.length < filters.value.PageSize) {
      hasMorePages.value = false;
    }

  } catch (err) {
    console.error(err);
    error.value = "Não foi possível carregar os dados.";
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
      const newCars = newCarsArray.map(mapApiProduct);
      carList.value = [...carList.value, ...newCars];
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
  () => {
    syncFiltersWithUrl();
    fetchData();
    productsOpen.value = false;
  }
);

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      currentBrand.value = null;
      syncFiltersWithUrl();
      fetchData();
      window.scrollTo(0, 0);
    }
  }
);

onMounted(() => {
  checkLoginStatus();
  setupHomeAnimations();
  syncFiltersWithUrl();
  fetchData();
});
</script>