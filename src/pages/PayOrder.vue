<template>
  <div class="bg-black text-white w-full min-h-screen flex justify-center items-center p-4 sm:p-8">

    <div v-if="loading" class="text-xl">
      Carregando...
    </div>

    <div v-if="!loading && car" class="w-full max-w-lg">
      
      <div class="text-center mb-6">
        <h2 class="text-3xl font-bold text-gray-200 mb-5">Pagamento</h2>
        <p class="text-lg text-gray-200">
          Você está pagando <span class="text-amber-500 font-bold">R$ {{ car.price }}</span> por
          <span class="text-gray-200 font-bold">{{ car.name }}</span>.
        </p>
      </div>
      
      <form @submit.prevent="handlePayment" class="space-y-6 bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-700">

        <div class="payment-methods flex gap-4 border-b border-gray-700 pb-4">
          <label class="flex items-center justify-center gap-2 cursor-pointer p-3 rounded-lg border-2 border-transparent w-full"
            :class="{ 'border-amber-500 bg-gray-700': paymentMethod === 'Card' }">
            <input type="radio" v-model="paymentMethod" value="Card" class="hidden"> Cartão
          </label>
          <label class="flex items-center justify-center gap-2 cursor-pointer p-3 rounded-lg border-2 border-transparent w-full"
            :class="{ 'border-amber-500 bg-gray-700': paymentMethod === 'Pix' }">
            <input type="radio" v-model="paymentMethod" value="Pix" class="hidden"> PIX
          </label>
          <label class="flex items-center justify-center gap-2 cursor-pointer p-3 rounded-lg border-2 border-transparent w-full"
            :class="{ 'border-amber-500 bg-gray-700': paymentMethod === 'Boleto' }">
            <input type="radio" v-model="paymentMethod" value="Boleto" class="hidden"> Boleto
          </label>
        </div>

        <div v-if="paymentMethod === 'Card'" class="payment-details space-y-4">
          <input v-model="cardDetails.CardNumber" placeholder="Número do Cartão" required
                 class="w-full bg-gray-800 text-white text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
          <input v-model="cardDetails.HolderName" placeholder="Nome no Cartão" required
                 class="w-full bg-gray-800 text-white text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
          <div class="flex gap-4">
            <input v-model="cardDetails.ExpirationDate" placeholder="MM/AA" required
                   class="w-1/2 bg-gray-800 text-white text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
            <input v-model="cardDetails.CVV" placeholder="CVV" required
                   class="w-1/2 bg-gray-800 text-white text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
          </div>
          <select v-model.number="cardDetails.Installments" required
                  class="w-full bg-gray-800 text-white text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
            <option class="bg-gray-800 text-white" value="1">1x sem juros</option>
            <option class="bg-gray-800 text-white" value="2">2x sem juros</option>
            <option class="bg-gray-800 text-white" value="3">3x sem juros</option>
          </select>
        </div>

        <div v-if="paymentMethod === 'Pix'" class="payment-details space-y-4">
          <select v-model="pixDetails.KeyType" required
                  class="w-full bg-gray-800 text-white text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
            <option class="bg-gray-800 text-white" value="">Selecione o tipo de chave</option>
            <option class="bg-gray-800 text-white" value="CPF">CPF</option>
            <option class="bg-gray-800 text-white" value="Email">Email</option>
            <option class="bg-gray-800 text-white" value="Phone">Telefone</option>
            <option class="bg-gray-800 text-white" value="Random">Chave Aleatória</option>
          </select>
          <input v-model="pixDetails.Key" placeholder="Sua chave PIX" required
                 class="w-full bg-gray-800 text-white text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
        </div>

        <div v-if="paymentMethod === 'Boleto'" class="payment-details space-y-4">
          <input v-model="boletoDetails.FullName" placeholder="Nome Completo" required
                 class="w-full bg-gray-800 text-white text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
          <input v-model="boletoDetails.CPF" placeholder="CPF" required
                 class="w-full bg-gray-800 text-white text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
          <input v-model="boletoDetails.Address" placeholder="Endereço Completo" required
                 class="w-full bg-gray-800 text-white text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
        </div>

        <button type="submit" :disabled="isSubmitting || !car"
          class="w-full bg-amber-600 hover:bg-gray-500 text-black hover:text-white text-lg font-bold py-3 px-6 rounded-lg transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed">
          {{ isSubmitting ? 'Processando...' : `Pagar` }}
        </button>
        <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import carService from '../services/carService.js';
import paymentService from '../services/paymentService.js';

const props = defineProps({
  id: { type: String, required: true }
});

const router = useRouter();

const car = ref(null);
const loading = ref(true);
const isSubmitting = ref(false);
const error = ref(null);
const paymentMethod = ref('Card'); 

const cardDetails = ref({
  CardNumber: '',
  HolderName: '',
  ExpirationDate: '',
  CVV: '',
  Installments: 1
});

const pixDetails = ref({
  KeyType: '',
  Key: ''
});

const boletoDetails = ref({
  FullName: '',
  CPF: '',
  Address: ''
});

onMounted(() => {

  if (history.state.carData) {
    console.log("Dados do carro recebidos via state.");
    car.value = history.state.carData;
    loading.value = false;
  } else {
 
    console.warn("State não encontrado. Buscando dados do carro na API.");
    fetchCarDataFallback();
  }
});


const fetchCarDataFallback = async () => {
  loading.value = true;
  try {
    const api_base = "http://localhost:5132";
    const response = await carService.getById(props.id);
    const carData = response.data;

    
    car.value = carData;

  } catch (err) {
    console.error("Erro ao buscar dados do carro:", err);
    error.value = "Não foi possível carregar os dados do carro.";
  } finally {
    loading.value = false;
  }
};



const handlePayment = async () => {
  if (!car.value) return;

  isSubmitting.value = true;
  error.value = null;

  const paymentRequestData = {
    
    userId: 'cfaa0d38-356a-4d6c-8a9d-c9d30560b4ef',
    amount: car.value.preco,
    currency: 'BRL',
    paymentMethod: paymentMethod.value,
    card: paymentMethod.value === 'Card' ? cardDetails.value : null,
    pix: paymentMethod.value === 'Pix' ? pixDetails.value : null,
    boleto: paymentMethod.value === 'Boleto' ? boletoDetails.value : null
  };
  if (paymentMethod.value === 'Card' && paymentRequestData.card) {
    paymentRequestData.card.Installments = parseInt(paymentRequestData.card.Installments, 10);
  }

  try {
    const response = await paymentService.processPayment(paymentRequestData);
    const paymentResponse = response.data;

    router.push({
      name: 'confirmation',
      params: { transactionId: paymentResponse.transactionId },
      state: { paymentData: paymentResponse }
    });

  } catch (err) {
    if (err.response && err.response.status === 402) {
      error.value = `Pagamento recusado: ${err.response.data}`;
    } else {
      error.value = 'Ocorreu um erro inesperado. Tente novamente.';
    }
    console.error(err);
  } finally {
    isSubmitting.value = false;
  }
};
</script>