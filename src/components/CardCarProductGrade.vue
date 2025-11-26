<template>
  <div class="bg-gray-300 rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 shadow-gray-500 playfair-display-sc-regular">
    <div class="relative w-full h-94 bg-gradient-to-b from-slate-900 to-neutral-500 from-60% via-70% to-100% md:p-5">
      <img :src="car.image" :alt="car.title" class="w-full h-full object-contain rounded-xl" @error="handleImageError">
      
      <img v-if="car.brandLogo" :src="car.brandLogo" :alt="'Logo ' + car.title"
        class="absolute top-3 right-3 w-14 h-14 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-lg object-contain z-10">
      
      <div v-if="isAdmin" class="absolute top-3 left-3 flex gap-2 z-30">
        <button @click.stop="goToUpdate"
          class="w-10 h-10 bg-amber-400 hover:bg-amber-500 backdrop-blur-sm p-2 rounded-full shadow-lg transition-colors flex items-center justify-center text-black">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </button>

        <button @click.stop="handleDelete"
          class="w-10 h-10 bg-red-600/90 hover:bg-red-700 backdrop-blur-sm p-2 rounded-full shadow-lg transition-colors flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>

    </div>
    <div class="p-4 space-y-2">
      <h3 class="text-2xl md:text-3xl font-bold text-gray-800 truncate">{{ car.title }}</h3>
      <p class=" text-lg md:text-xl font-semibold text-gray-900">{{ car.price }}</p>
      <button @click="goToDetails"
        class="group relative overflow-hidden bg-black text-white hover:text-black p-2 text-xl w-full font-bold rounded-xl transition delay-100 duration-600 ease-in-out">
        <span
          class="absolute bottom-0 left-0 w-full h-0 bg-white transition-all duration-600 ease-out group-hover:h-full"></span>
        <span class="relative z-10">See More</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import carService from '../services/carService.js';

const router = useRouter();
const isAdmin = ref(false);
const emit = defineEmits(['itemDeleted']);

const props = defineProps({
  car: {
    type: Object,
    required: true
  }
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

const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/400x300/e2e8f0/475569?text=Imagem';
};

const goToDetails = () => {
  router.push({
    name: 'seeMore',
    params: { id: props.car.id }
  });
};

const goToUpdate = () => {
  router.push({ 
    name: 'update',
    params: { id: props.car.id } 
  });
};

const handleDelete = async () => {
  const carId = props.car.id || props.car.Id;

  if (confirm(`Tem certeza que deseja deletar o carro "${props.car.title}"?`)) {
    try {
      await carService.delete(props.car.id);
      alert('Carro deletado com sucesso!');
      emit('itemDeleted', props.car.id);
    } catch (error) {
      console.error(error);
      alert('Erro ao deletar o carro. Verifique suas permissões.');
    }
  }
};

onMounted(() => {
  checkLoginStatus();
});
</script>