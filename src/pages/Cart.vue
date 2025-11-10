<template>
    <div class="bg-black text-white w-full min-h-screen flex justify-center relative overflow-hidden p-4 sm:p-8 space">

        <div v-if="loading" class="text-xl">
            Carregando...
        </div>

        <div v-if="!loading && car" class="w-full max-w-6xl flex flex-col md:flex-row gap-8 md:gap-16 items-center">

            <div class="space-y-10 left-1/7 absolute ">
                <h2 class="text-4xl font-bold text-gray-200">Resumo da Compra</h2>
                <div class="flex space-x-10 items-center">
                    <img :src="car.imagemUrl" :alt="car.nome"
                        class="h-50 bg-gradient-to-b from-slate-900 to-neutral-500 from-60% via-70% to-100% rounded-lg border border-amber-500 object-cover">
                    <div class="flex flex-col">
                        <h3 class="text-2xl font-semibold">{{ car.nome }}</h3>
                        <p class="text-4xl font-light text-amber-500 mt-2"> R${{ car.preco }}</p>
                    </div>
                </div>

            </div>

            <div class="absolute right-1/7 flex flex-col justify-center itens-start space-y-5">
                <h2 class="text-3xl font-bold text-gray-200 mb-6 border-b">Pagamento</h2>
                <div>
                    <h3 class="text-3xl font-bold text-gray-200 ">Total: R${{ car.preco }}</h3>
                    <p class="text-mg ">Sem taxa adicional</p>
                </div>

                <router-link to="/contact" class="text-2xl hover:text-blue-400 ">Suport</router-link>



                <button @click="goToPayment" type="submit" :disabled="isSubmitting || !car"
                    class="w-full bg-white hover:bg-amber-700 text-black text-2xl font-bold py-6 px-42 rounded-xl transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed">
                    {{ isSubmitting ? 'Processando...' : `Checkout payment` }}
                </button>
                <div class="flex justify-center gap-2 mt-4">
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

onMounted(() => {
  fetchCheckoutData();
});


const fetchCheckoutData = async () => {
  loading.value = true;
  try {
    const api_base = "http://localhost:5132";
    const response = await carService.getById(props.id);
    const carData = response.data;

    if (carData.imagemUrl) {
      carData.imagemUrl = `${api_base}${carData.imagemUrl}`;
    }
    car.value = carData;
  } catch (err) {
    console.error("Erro ao buscar dados do carro:", err);
    error.value = "Não foi possível carregar os dados do carro.";
  } finally {
    loading.value = false;
  }
};


const goToPayment = () => {
  if (car.value) {
   
    router.push({ 
      name: 'pay-order', 
      params: { id: car.value.id },
      
      state: { carData: car.value } 
    });
  }
};
</script>