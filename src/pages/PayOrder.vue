<template>
  <div class="bg-black text-white w-full min-h-screen flex justify-center items-center p-4 sm:p-8 playfair-display-sc-regular">

    <div v-if="loading" class="text-xl">
      Carregando...
    </div>

    <div v-if="!loading && car" class="w-full max-w-lg mt-20">
      
      <div class="text-center mb-6">
        <h2 class="text-3xl font-bold text-gray-200 mb-5">Pagamento</h2>
        <p class="text-lg text-gray-200">
          <span v-if="user" class="block text-sm text-gray-400 mb-2">Cliente: {{ user.name }}</span>
          Você está pagando <span class="text-amber-500 font-bold">R$ {{ car.price }}</span> por
          <span class="text-gray-200 font-bold">{{ car.name }}</span>.
        </p>
      </div>
      
      <form @submit.prevent="handlePayment" class="space-y-6 bg-black p-8 rounded-lg shadow-xl border border-gray-200">

        <div class="payment-methods flex gap-4 border-b border-gray-200 pb-4">
          <label class="flex items-center justify-center gap-2 cursor-pointer p-3 rounded-lg border-2 border-transparent w-full"
            :class="{ ' bg-gray-200 text-black': paymentMethod === 'Card' }">
            <input type="radio" v-model="paymentMethod" value="Card" class="hidden"> Cartão
          </label>
          <label class="flex items-center justify-center gap-2 cursor-pointer p-3 rounded-lg border-2 border-transparent w-full"
            :class="{ ' bg-gray-200 text-black': paymentMethod === 'Pix' }">
            <input type="radio" v-model="paymentMethod" value="Pix" class="hidden"> PIX
          </label>
          <label class="flex items-center justify-center gap-2 cursor-pointer p-3 rounded-lg border-2 border-transparent w-full"
            :class="{ ' bg-gray-200 text-black': paymentMethod === 'Boleto' }">
            <input type="radio" v-model="paymentMethod" value="Boleto" class="hidden"> Boleto
          </label>
        </div>

        <div v-if="paymentMethod === 'Card'" class="payment-details space-y-4 text-black">
          <input v-model="cardDetails.CardNumber" placeholder="Número do Cartão" required
                 class="w-full bg-white  text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
          <input v-model="cardDetails.HolderName" placeholder="Nome no Cartão" required
                 class="w-full bg-white  text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
          <div class="flex gap-4">
            <input v-model="cardDetails.ExpirationDate" placeholder="MM/AA" required
                   class="w-1/2 bg-white  text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
            <input v-model="cardDetails.CVV" placeholder="CVV" required
                   class="w-1/2 bg-white  text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
          </div>
          <select v-model.number="cardDetails.Installments" required
                  class="w-full bg-white  text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
            <option class="bg-white " value="1">1x sem juros</option>
            <option class="bg-white " value="2">2x sem juros</option>
            <option class="bg-white " value="3">3x sem juros</option>
          </select>
        </div>

        <div v-if="paymentMethod === 'Pix'" class="payment-details space-y-4">
          <select v-model="pixDetails.KeyType" required
                  class="w-full bg-white text-black text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
            <option class="bg-white text-black" value="">Selecione o tipo de chave</option>
            <option class="bg-white text-black" value="CPF">CPF</option>
            <option class="bg-white text-black" value="Email">Email</option>
            <option class="bg-white text-black" value="Phone">Telefone</option>
            <option class="bg-white text-black" value="Random">Chave Aleatória</option>
          </select>
          <input v-model="pixDetails.Key" placeholder="Sua chave PIX" required
                 class="w-full bg-white text-black text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
        </div>

        <div v-if="paymentMethod === 'Boleto'" class="payment-details space-y-4">
          <input v-model="boletoDetails.FullName" placeholder="Nome Completo" required
                 class="w-full bg-white text-black text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
          <input v-model="boletoDetails.CPF" placeholder="CPF" required
                 class="w-full bg-white text-black text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
          <input v-model="boletoDetails.Address" placeholder="Endereço Completo" required
                 class="w-full bg-white text-black text-base p-3 rounded-lg border border-gray-700 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
        </div>

        <button type="submit" :disabled="isSubmitting || !car"
          class="relative group overflow-hidden w-full bg-white  text-black hover:text-white hover:border-white border text-lg font-bold py-3 px-6 rounded-lg transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed">
           <span class="absolute bottom-0 left-0 w-full h-0 bg-black transition-all duration-600 ease-out group-hover:h-full"></span>
         <span class="relative z-10">{{ isSubmitting ? 'Processando...' : `Pagar` }}</span> 
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
import userService from '../services/userService.js'; 

const props = defineProps({
  id: { type: String, required: true }
});

const router = useRouter();

const car = ref(null);
const user = ref(null); 
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


const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

const getUserEmailFromToken = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return null;

  const decoded = parseJwt(token);
  if (!decoded) return null;
 
  return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ||
    decoded.email ||
    decoded.unique_name;
};


const fetchUserData = async () => {
  try {
    const email = getUserEmailFromToken();
    if (!email) {
       console.warn("Usuário não logado");
       return; 
    }
    const response = await userService.getByEmail(email);
    user.value = response.data;
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
  }
};

onMounted(async () => {
 
  await fetchUserData();

  if (history.state.carData) {
    console.log("Dados do carro recebidos via state.");
    car.value = history.state.carData;
    loading.value = false;
  } else {
    console.warn("State não encontrado. Buscando dados do carro na API.");
    await fetchCarDataFallback();
  }
});

const fetchCarDataFallback = async () => {
  loading.value = true;
  try {
    const api_base = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : "http://localhost:5132"
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
  
  
  if (!user.value) {
      error.value = "Erro: Usuário não identificado. Faça login novamente.";
      return;
  }

  isSubmitting.value = true;
  error.value = null;

  const paymentRequestData = {
   
    userId: user.value.id, 
    amount: car.value.price,
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