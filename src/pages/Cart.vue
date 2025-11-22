<template>
  <div class="bg-black text-white w-full min-h-screen flex justify-center items-center relative overflow-hidden p-4 sm:p-8 space playfair-display-sc-regular">

    <div v-if="loading" class="text-xl">
      Carregando...
    </div>

    <div v-if="!loading && car"
      class="w-full max-w-6xl flex flex-col md:flex-row gap-8 md:gap-60 items-start mt-8 md:mt-0">

      <div class="w-full md:w-2/3 space-y-6 sm:space-y-10">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-200">Resumo da Compra</h2>
        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-10 items-center">
          <img :src="car.imagemUrl" :alt="car.nome"
            class="h-32 w-32 sm:h-40 sm:w-auto bg-gradient-to-b from-slate-900 to-neutral-500 from-60% via-70% to-100% rounded-lg border border-amber-500 object-cover">
          <div class="flex flex-col text-center sm:text-left">
            <h3 class="text-xl sm:text-2xl font-semibold">{{ car.name }}</h3>
            <p class="text-3xl sm:text-4xl font-light text-amber-500 mt-2"> R${{ car.price }}</p>
          </div>
        </div>
      </div>

      <div class="w-full md:w-1/2 flex flex-col justify-center items-start space-y-5">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-200 mb-6 border-b w-full">Pagamento</h2>
        <div>
          <h3 class="text-2xl sm:text-3xl font-bold text-gray-200 ">Total: R${{ car.price }}</h3>
          <p class="text-mg ">Sem taxa adicional</p>
        </div>

        <router-link to="/contact" class="text-lg sm:text-2xl hover:text-blue-400 ">Suport</router-link>

        <button @click="goToPayment" type="submit" :disabled="isSubmitting || !car"
          class="relative group overflow-hidden w-full bg-white hover:border-white border text-black text-lg sm:text-2xl font-bold py-4 sm:py-6 px-8 rounded-xl transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed hover:text-white">
          
          <span class="absolute bottom-0 left-0 w-full h-0 bg-black transition-all duration-600 ease-out group-hover:h-full"></span>
          <span class="relative z-10">{{ isSubmitting ? 'Processando...' : `Checkout payment` }}</span>
        </button>
        <div class="flex justify-center gap-2 mt-4 w-full">
          <img src="https://readymadeui.com/images/visa.webp" class="w-12" alt="card1" />
          <img src="https://readymadeui.com/images/american-express.webp" class="w-12" alt="card2" />
          <img src="https://readymadeui.com/images/master.webp" class="w-12" alt="card3" />
          <img src="../assets/imgs/pix.png" class="w-12" alt="card3" />
          <img src="../assets/imgs/boleto-simbolo-2.png" class="w-12" alt="card3" />
        </div>
      </div>

    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import carService from '../services/carService.js';

const props = defineProps({
  id: { type: String, required: true }
});

const router = useRouter();
const car = ref(null);
const loading = ref(true);
const error = ref(null);


const fetchCheckoutData = async () => {
  loading.value = true;
  try {
    const response = await carService.getById(props.id);
    const apiData = response.data;
    car.value = {
      ...apiData,
      nome: apiData.name || apiData.nome,
      preco: apiData.price || apiData.preco,
      imagemUrl: apiData.imageUrl
    };

  } catch (err) {
    console.error("Erro ao buscar dados do carro:", err);
    error.value = "Não foi possível carregar os dados do carro.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCheckoutData();
});

const goToPayment = () => {
  if (car.value) {
    router.push({
      name: 'pay-order',
      params: { id: car.value.id },
      state: { carData: JSON.parse(JSON.stringify(car.value)) } 
    });
  }
};
</script>