<template>
  <div
    class="bg-gray-300 rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 2 shadow-gray-500 playfair-display-sc-regular">
    <div class="relative w-full h-94 bg-gradient-to-b from-slate-900 to-neutral-500 from-60% via-70% to-100%">
      <img :src="car.image" :alt="car.title" class="w-full h-full object-cover" @error="handleImageError">
      <img v-if="car.brandLogo" :src="car.brandLogo" :alt="'Logo ' + car.title"
        class="absolute top-3 right-3 w-14 h-14 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-lg object-contain z-10">
    </div>
    <div class="p-4 space-y-2">
      <h3 class="text-2xl font-bold text-gray-800 truncate">{{ car.title }}</h3>
      <p class=" text-xl font-semibold text-gray-900">{{ car.price }}</p>
      <button @click="goToDetails"
        class="group relative overflow-hidden bg-black text-white hover:text-black  p-2 text-xl w-full font-bold rounded-xl  transition delay-100 duration-600 ease-in-out  ">
        <span
          class="absolute bottom-0 left-0 w-full h-0 bg-white transition-all duration-600 ease-out group-hover:h-full "></span>
        <span class="relative z-10">See More</span>
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