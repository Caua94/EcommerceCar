<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden group transform hover:-translate-y-2 transition-all duration-300 border-2 border-blue-900">
    <div class="relative w-full h-64 bg-gradient-to-b from-slate-900 to-neutral-500 from-60% via-70% to-100%">
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
        class="absolute top-3 left-3 w-14 h-14 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-lg object-contain z-10"
      >
    </div>
    <div class="p-4">
      <h3 class="text-lg font-bold text-gray-800 truncate">{{ car.title }}</h3>
      <p class="mt-2 text-xl font-semibold text-gray-900">{{ car.price }}</p>
      <button class="mt-4 w-full bg-slate-900 text-white py-2 rounded-lg font-semibold hover:bg-yellow-900 transition-colors border-3 border-blue-400 drop-shadow-[0_0_3px_#00ffff]">
        Ver Mais
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  car: {
    type: Object,
    required: true
  }
});

const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/400x300/e2e8f0/475569?text=Imagem';
};
</script>