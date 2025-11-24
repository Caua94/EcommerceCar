<template>

  <div
    class="bg-black text-white w-full min-h-screen flex justify-center items-center relative overflow-hidden p-4 sm:p-8 space playfair-display-sc-regular">



    <div v-if="loading" class="text-xl">

      Carregando...

    </div>



    <div v-if="!loading && car"
      class="w-full max-w-6xl flex flex-col md:flex-row gap-8 md:gap-60 items-start mt-8 md:mt-0">



      <div class="w-full md:w-2/3 space-y-6 sm:space-y-10">

        <h2 class="text-3xl sm:text-4xl font-bold text-gray-200">Resumo da Compra</h2>

        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-10 items-center">

          <img :src="car.imageUrl" :alt="car.nome"
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
        <div v-if="user" class="border-t border-gray-700 pt-6 w-full">
            <div class="flex justify-between items-end mb-4">
                <h3 class="text-xl font-bold text-gray-300">Delivery</h3>
                <span class="text-sm text-amber-500 border border-amber-500 px-2 py-1 rounded">Verified Customer</span>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2  gap-14 text-gray-400 bg-white/5 p-6 rounded-xl border border-white/5">
                <div>
                    <p class="text-sm uppercase text-gray-500 mb-1 font-bold tracking-wider">Customer Details</p>
                    <p class="text-white font-medium text-xl">{{ user.name }}</p>
                    <p class="text-sm text-gray-300">{{ user.email }}</p>
                </div>
                <div>
                    <p class="text-sm uppercase text-gray-500 mb-1 font-bold tracking-wider">Shipping Address</p>
                    <p class="text-white">{{ user.road }}, {{ user.number }}</p>
                    <p class="text-lg">{{ user.neighborhood }}</p>
                    <p class="text-lg">{{ user.city }} - {{ user.state }}</p>
                    <p class="text-lg text-amber-500/80 mt-1">CEP: {{ user.cep }}</p>
                </div>
            </div>
        </div>



        <router-link to="/contact" class="text-lg sm:text-2xl hover:text-blue-400 ">Suport</router-link>



        <button @click="goToPayment" type="submit" :disabled="isSubmitting || !car"
          class="relative group overflow-hidden w-full bg-white hover:border-white border text-black text-lg sm:text-2xl font-bold py-4 sm:py-6 px-8 rounded-xl transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed hover:text-white">



          <span
            class="absolute bottom-0 left-0 w-full h-0 bg-black transition-all duration-600 ease-out group-hover:h-full"></span>

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
import userService from '../services/userService.js';

const props = defineProps({
  id: { type: String, required: true } 
});

const router = useRouter();
const car = ref(null);
const user = ref(null);
const loading = ref(true);
const isSubmitting = ref(false);


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

const fetchCheckoutData = async () => {
  loading.value = true;


  const userEmail = getUserEmailFromToken();

  if (!userEmail) {
    alert("Please Login to shop your dream");
    router.push('/login');
    return;
  }

  try {
   
    const [carResponse, userResponse] = await Promise.all([
      carService.getById(props.id),
      userService.getByEmail(userEmail)
    ]);

  
    const carData = carResponse.data;
    car.value = {
      id: carData.id,
      name: carData.name || carData.nome,
      price: carData.price || carData.preco,
      year: carData.year || carData.ano,
      engine: carData.engine,
      imageUrl: carData.imageUrl || carData.imagemUrl
    };


    const userData = userResponse.data;
    user.value = {
      id: userData.id,
      name: userData.name || userData.nome,
      email: userData.email,
      
      cep: userData.cep || userData.CEP,
      number: userData.number || userData.numero,
      road: userData.road || userData.rua || userData.logradouro,
      neighborhood: userData.neighborhood || userData.bairro,
      city: userData.city || userData.cidade,
      state: userData.state || userData.estado
    };

  } catch (err) {
    console.error("Error fetching data:", err);
    if (err.response && err.response.status === 404) {
      alert("User data not found for this account.");
    }
  } finally {
    loading.value = false;
  }
};

const goToPayment = () => {
  if (car.value && user.value) {
    
    router.push({
      name: 'pay-order',
      params: { id: car.value.id },
      state: {
        carData: JSON.parse(JSON.stringify(car.value)),
        userData: JSON.parse(JSON.stringify(user.value))
      }
    });
  }
};

onMounted(() => {
  fetchCheckoutData();
});
</script>