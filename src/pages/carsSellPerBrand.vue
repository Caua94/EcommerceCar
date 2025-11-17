<template>
  <div>
    <header class="relative h-screen w-full flex items-center justify-center text-center text-white p-4 shadow-2xl">
      <div class="absolute inset-0 w-full  bg-black bg-opacity-50 z-10">
        <img src="../assets/imgs//lamboBanner.jpg" alt="A woman driving a modern car"
          class="absolute inset-0 w-full h-full object-cover z-0">
      </div>
      <div class="absolute inset-0 bg-black/60 z-10 transition-colors duration-300 "></div>
      <div class="relative z-20 grid place-items-center space-y-5">
        <h1 class="text-5xl md:text-9xl font-dancing">Lamborghini</h1>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-10 animate-bounce">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
        </svg>


      </div>

    </header>

    <section
    class="w-screen h-[400px] md:h-[600px] flex justify-center items-center overflow-hidden shadow-4xl gsap-blur-in relative bg-black border-t border-b border-gray-500">

    <div class="absolute left-0 md:w-3/5 h-full ">
      <img src="../assets/imgs/logolambo.png" alt="Interior of a luxury car" class="w-full h-full object-cover " />
    </div>

    <div
      class="w-full md:w-2/5 h-full bg-gradient-to-l from-black/90 to-black/10 text-white flex flex-col justify-center items-center absolute right-5 p-4 shadow-2xl space-y-2 md:space-y-4 bg-black ">
      <h1 class="text-5xl md:text-8xl text-right">What is Lamborghini?</h1>
      <p class="text-xl md:text-3xl text-right">Lamborghini is an Italian manufacturer of luxury sports cars and SUVs, known for its distinctive design and high performance. Founded in 1963, the brand is a symbol of "driving beyond limits," with a visionary goal to "be the leader of the unexpected" and "reinvent the norm".</p>
      <a class="hover:scale-105 hover:text-blue-400 hover:underline" href="">Learn More</a>
    </div>
  </section>




    <div class="relative h-[40vh] w-full flex items-center justify-center text-center text-white p-4 shadow-2xl">
      <div class="relative z-20">
        <h1 class="text-5xl md:text-7xl font-dancing capitalize">Realize your Dream, Shop Your Lamborghini</h1>
      </div>
    </div>

    <section class="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-black">
      <div class="relative text-4xl text-white flex justify-between items-center m-10 border-b pb-4">
        <p>Models</p>
        <p>Filters</p>
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

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        <CarCard v-for="car in carList" :key="car.id" :car="car" />
      </div>

      <div class="text-center mt-12 flex items-center justify-center" v-if="hasMorePages">
        <button @click="loadMore" :disabled="isLoading"
          class="px-8 py-3  text-white font-bold rounded-lg shadow-lg transition-all
                 hover:text-amber-300 hover:scale-105 disabled:opacity-50 disabled:cursor-wait grid place-items-center ">
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CarCarousel from '../components/CardComponent.vue';
import CarCard from '../components/CardCarProductGrade.vue';
import carService from '../services/carService'; 


const carList = ref([]);
const error = ref(null);


const isLoading = ref(true); 
const currentPage = ref(1);
const pageQuantity = ref(3); 
const hasMorePages = ref(true);


const api_base = "http://localhost:5132";


const mapApiProduct = (apiProduct) => {
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
};


const fetchInitialCars = async () => {
  isLoading.value = true;
  currentPage.value = 1;
  hasMorePages.value = true; 

  try {

    const response = await carService.getCars(currentPage.value, pageQuantity.value);

    carList.value = response.data.map(mapApiProduct);


    if (response.data.length < pageQuantity.value) {
      hasMorePages.value = false;
    }

  } catch (err) {
    console.error("Falha ao buscar a lista de produtos:", err);
    error.value = "Não foi possível carregar os modelos.";
  } finally {
    isLoading.value = false;
  }
};


const loadMore = async () => {
  if (isLoading.value) return; 

  isLoading.value = true;
  currentPage.value++;

  try {

    const response = await carService.getCars(currentPage.value, pageQuantity.value);

    if (response.data.length > 0) {
      const newCars = response.data.map(mapApiProduct);


      carList.value = [...carList.value, ...newCars];
    }


    if (response.data.length < pageQuantity.value) {
      hasMorePages.value = false;
    }

  } catch (err) {
    console.error("Falha ao carregar mais produtos:", err);
    
    hasMorePages.value = false;
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchInitialCars);
</script>