<template>
  <div class="bg-white rounded-lg shadow-xl overflow-hidden group transform hover:-translate-y-2 transition-all duration-300 2 shadow-white">
    <div class="relative w-full h-94 bg-gradient-to-b from-slate-900 to-neutral-500 from-60% via-70% to-100%">
      <img 
        :src="car.image" 
        :alt="car.title" 
        class="w-full h-full object-cover"
        @error="handleImageError"
      >
      <img 
        v-if="car.brandLogo" 
        :src="car.brandLogo" 
        :alt="'Logo ' + car.title"
        class="absolute top-3 right-3 w-14 h-14 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-lg object-contain z-10"
      >
    </div>
    <div class="p-4 space-y-2">
      <h3 class="text-2xl font-bold text-gray-800 truncate">{{ car.title }}</h3>
      <p class=" text-xl font-semibold text-gray-900">{{ car.price }}</p>
      <button 
        @click="goToDetails" 
        class="p-2 text-xl w-full bg-black text-white font-bold rounded-xl hover:bg-gray-300 hover:text-black transition delay-100 duration-300 ease-in-out  ">
        Ver Mais
      </button>
    </div>
  </div>
</template>
 c
<script setup>

import { useRouter } from 'vue-router';


const router = useRouter();


const props = defineProps({
  car: {
    type: Object,
    required: true
  }
});

const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/400x300/e2e8f0/475569?text=Imagem';
};


const goToDetails = () => {

  router.push({ 
    name: 'seeMore', 
    params: { id: props.car.id } 
  });
};
</script>