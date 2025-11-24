<template>
  <main class="relative w-full h-full overflow-x-hidden playfair-display-sc-regular">
    <section ref="heroRef" class="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <video :src="car?.videoDemoUrl" class="h-screen object-cover z-0" autoplay loop muted playsinline
        preload="auto"></video>
    </section>
  </main>

  <img v-if="car && car.marca" :src="car.marca.imagemURL" :alt="'Logo ' + car.nome"
    class="fixed top-1/2 left-2 w-16 h-16 sm:left-3 sm:w-25 sm:h-25 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-lg object-contain z-50">

  <button @click="goToCheckout"
    class="fixed group  overflow-hidden bg-black hover:text-black text-white bottom-6 left-1/2 -translate-x-1/2 flex items-center opacity-90   font-semibold py-3 px-8 sm:py-4 sm:px-12 rounded-full shadow-lg z-30 hover:opacity-100 border border-white hover:border-black hover:scale-110">
    <span
      class="absolute bottom-0 left-0 w-full h-0 bg-white transition-all duration-800 ease-out group-hover:h-full"></span>
    <span class="relative z-10 playfair-display-sc-regular">Buy now</span>
  </button>

  <div v-if="car" class="w-full">

    <div
      class="storytelling-block relative grid grid-cols place-items-center justify-center px-4 sm:px-8 py-16 bg-gradient-to-b from-black to-gray-600 z-10 overflow-hidden text-white">

      <img :src="car.imagemUrl" class="h-full w-full" :alt="car.nome">

      <div class="max-w-3xl text-center relative z-10 space-y-4 mt-8 sm:mt-0">
        <h1 class="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 font-dancing">{{ car.nome }}</h1>
        <p class="text-lg sm:text-2xl leading-relaxed playfair-display-sc-regular">
          {{ car.descricao }}
        </p>
      </div>
    </div>
    


    <div
      class="storytelling-block relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 z-10 overflow-hidden bg-gradient-to-b from-gray-600 to-black playfair-display-sc-regular">

      <h2 class="text-7xl sm:text-7xl  text-white mb-8 sm:mb-10 max-w-3xl mx-auto text-center font-dancing">Details</h2>
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
      class="storytelling-block relative w-full flex flex-col items-center justify-center px-4 sm:px-8  z-10 overflow-hidden space-y-10 ">
      <h1 class="capitalize font-dancing text-4xl sm:text-7xl text-white mb-8 sm:mb-10 leading-relaxed">View your dream in 3D</h1>
      <div class="relative flex items-center justify-center z-10 w-[90%] sm:w-[90%] h-94 sm:h-full 
            
            bg-gradient-to-b from-white to-gray-400
            
           
            shadow-[inset_0_0_80px_60px_#000000]
            
            rounded-3xl 
            
            [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent),linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] 
            [mask-composite:intersect]">
        

        <model-viewer class="" v-if="car && car.model3d" id="motor-3d" :src="car.model3d" :alt="car.nome || 'Modelo 3D'"
          auto-rotate camera-controls ar shadow-intensity="1" style="width: 100%; height: 900px; background:none">
        </model-viewer>

        <div v-else class="text-white flex flex-col items-center">
          <span v-if="!car">Carregando modelo...</span>
          <span v-else>Visualização 3D indisponível para este modelo.</span>
        </div>
      </div>

    </div>

    <div
    
      class="storytelling-block relative h-screen w-full flex flex-col items-center justify-center  bg-black z-10 overflow-hidden pt-30 space-y-30">
      <h1 class="capitalize font-dancing text-4xl sm:text-7xl text-white ">Inside your Dreams</h1>
      <img :src="car.imagemInteriorUrl" class="h-full w-full object-cover" :alt="car.nome" />
    </div>


  </div>


  <div v-else class="h-screen w-full flex items-center justify-center bg-black text-white text-3xl">
    Carregando...
  </div>
</template>


<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
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
const api_base = "http://localhost:5132";

const resolveUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('https')) {
    return path;
  }
  return `${api_base}${path}`;
};

const fetchCarDetails = async () => {
  try {
    const response = await carService.getById(props.id);
    const apiData = response.data;

    const mappedCar = {
      ...apiData,
      nome: apiData.name || apiData.Name || apiData.nome,
      descricao: apiData.description || apiData.Description || apiData.descricao,
      velocidade: apiData.speed || apiData.Speed || apiData.velocidade,
      motor: apiData.engine || apiData.Engine || apiData.motor,
      ano: apiData.year || apiData.Year || apiData.ano,


      model3d: resolveUrl(apiData.model3DUrl || apiData.Model3DURL || apiData.Model3dUrl),


      imagemUrl: resolveUrl(apiData.imageUrl || apiData.ImageUrl || apiData.imagemUrl),
      imagemInteriorUrl: resolveUrl(apiData.innerImageUrl || apiData.InnerImageUrl || apiData.imagemInteriorUrl),
      imagemMotorUrl: resolveUrl(apiData.imageEngineUrl || apiData.ImageEngineUrl || apiData.imagemMotorUrl),
      videoDemoUrl: resolveUrl(apiData.videoDemoUrl || apiData.VideoDemoUrl),


      categoriaId: apiData.categoryId || apiData.CategoryId || apiData.categoriaId,
      marcaId: apiData.brandId || apiData.BrandId || apiData.marcaId
    };


    if (mappedCar.categoriaId) {
      try {
        const categoryResponse = await categoryService.getById(mappedCar.categoriaId);
        mappedCar.categoria = {
          nome: categoryResponse.data.name || categoryResponse.data.Name || categoryResponse.data.nome
        };
      } catch (catError) {
        console.error("Erro ao buscar categoria:", catError);
      }
    }


    if (mappedCar.marcaId) {
      try {
        const brandResponse = await brandService.getById(mappedCar.marcaId);
        const brandData = brandResponse.data;

        mappedCar.marca = {
          ...brandData,

          imagemURL: resolveUrl(brandData.imageUrl || brandData.ImageURL || brandData.imageURL || brandData.logoBrand)
        };
      } catch (brandError) {
        console.error("Erro ao buscar marca:", brandError);
      }
    }

    car.value = mappedCar;

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