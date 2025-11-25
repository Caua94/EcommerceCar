<template>
  <div class="signup-page w-full h-screen flex justify-center items-center relative overflow-hidden playfair-display-sc-regular ">
    <video :src="backgroundVideo" class="absolute top-0 left-0 w-full h-full object-cover z-0" autoplay loop muted playsinline preload="auto"></video>
    <div class="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

    <div class="relative z-20 w-full max-w-2xl p-30  bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl space-y-6 border border-white/20 transform transition-transform duration-500 ease-in-out overflow-y-auto max-h-[110vh] mt-15 " ref="signupCard">
      
      <div class="text-center space-y-2">
        <h2 class="text-4xl font-bold text-white tracking-wide gsap-signup-title">Create Account</h2>
        <p class="text-gray-300 text-sm gsap-signup-text">Join us to start your journey.</p>
      </div>

      <form @submit.prevent="handleSignup" class="space-y-5">
        
        <div class="grid grid-cols-1 gap-5">
          <div class="gsap-signup-form">
            <label for="fullname" class="block text-gray-300 text-sm font-bold mb-2 ml-1">Full Name</label>
            <input type="text" id="fullname" v-model="fullName" required 
              class="w-full p-3 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors" 
              placeholder="Enter your full name" />
          </div>

          <div class="gsap-signup-form">
            <label for="email" class="block text-gray-300 text-sm font-bold mb-2 ml-1">Email Address</label>
            <input type="email" id="email" v-model="email" required 
              class="w-full p-3 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors" 
              placeholder="name@example.com" />
          </div>
        </div>

        <div class="border-t border-white/10 pt-4 mt-2">
            <p class="text-amber-400 text-sm font-bold mb-4 uppercase tracking-widest">Address</p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                <div class="gsap-signup-form md:col-span-1">
                    <label for="cep" class="block text-gray-300 text-sm font-bold mb-2 ml-1">CEP</label>
                    <input type="text" id="cep" v-model="cep" @blur="buscarCep" maxlength="9" required 
                      class="w-full p-3 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors" 
                      placeholder="00000-000" />
                </div>
                
                <div class="gsap-signup-form md:col-span-2">
                    <label for="number" class="block text-gray-300 text-sm font-bold mb-2 ml-1">Number</label>
                    <input type="number" id="number" v-model="number" required 
                      class="w-full p-3 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors" 
                      placeholder="123" />
                </div>
            </div>

            <div class="gsap-signup-form mb-5">
                <label for="road" class="block text-gray-400 text-sm font-bold mb-2 ml-1">Street / Road</label>
                <input type="text" id="road" v-model="road" readonly 
                  class="w-full p-3 text-gray-300 bg-white/5 border border-white/10 rounded-xl focus:outline-none cursor-not-allowed" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div class="gsap-signup-form">
                    <label for="neighborhood" class="block text-gray-400 text-sm font-bold mb-2 ml-1">Neighborhood</label>
                    <input type="text" id="neighborhood" v-model="neighborhood" readonly 
                      class="w-full p-3 text-gray-300 bg-white/5 border border-white/10 rounded-xl focus:outline-none cursor-not-allowed" />
                </div>
                <div class="gsap-signup-form">
                    <label for="city" class="block text-gray-400 text-sm font-bold mb-2 ml-1">City</label>
                    <input type="text" id="city" v-model="city" readonly 
                      class="w-full p-3 text-gray-300 bg-white/5 border border-white/10 rounded-xl focus:outline-none cursor-not-allowed" />
                </div>
                <div class="gsap-signup-form">
                    <label for="state" class="block text-gray-400 text-sm font-bold mb-2 ml-1">State</label>
                    <input type="text" id="state" v-model="state" readonly 
                      class="w-full p-3 text-gray-300 bg-white/5 border border-white/10 rounded-xl focus:outline-none cursor-not-allowed" />
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div class="gsap-signup-form">
                <label for="password" class="block text-gray-300 text-sm font-bold mb-2 ml-1">Password</label>
                <input type="password" id="password" v-model="password" required 
                  class="w-full p-3 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors" 
                  placeholder="••••••••" />
            </div>

            <div class="gsap-signup-form">
                <label for="confirmPassword" class="block text-gray-300 text-sm font-bold mb-2 ml-1">Confirm Password</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" required 
                  class="w-full p-3 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors" 
                  placeholder="••••••••" />
            </div>
        </div>

        <button type="submit" :disabled="loading" class="w-full py-3 bg-amber-500 text-white font-bold text-lg rounded-xl hover:bg-amber-600 transition-colors transform hover:scale-105 active:scale-95 duration-200 gsap-signup-button disabled:opacity-50 disabled:cursor-not-allowed mt-6">
          {{ loading ? 'Creating Account...' : 'Create Account' }}
        </button>
      </form>

      <p class="text-center text-gray-400 text-sm mt-4 gsap-signup-footer">
        Already have an account?
        <router-link to="/login" class="text-amber-400 hover:text-amber-500 font-semibold transition-colors">Log In</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import userService from '../services/userService.js';
import { animateSignupEntrance } from '../utils/animations/SignAnimations.js';

const router = useRouter();
const backgroundVideo = new URL('../assets/videos/Luxury_Car_Login_Page_Video.mp4', import.meta.url).href;


const fullName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);


const cep = ref('');
const road = ref('');
const number = ref('');
const neighborhood = ref('');
const city = ref('');
const state = ref('');


async function buscarCep() {
  const cleanCep = cep.value.replace(/\D/g, '');

  if (cleanCep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        road.value = data.logradouro;
        neighborhood.value = data.bairro;
        city.value = data.localidade;
        state.value = data.uf;
        document.getElementById('number').focus();
      } else {
        alert("CEP não encontrado.");
        limparEndereco();
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao consultar CEP.");
    }
  }
}

function limparEndereco() {
    road.value = '';
    neighborhood.value = '';
    city.value = '';
    state.value = '';
}


async function handleSignup() {
  if (password.value !== confirmPassword.value) {
    alert("As senhas não coincidem.");
    return;
  }

  loading.value = true;

  try {
    const userPayload = {
      Name: fullName.value,
      Email: email.value,
      Password: password.value,
      Role: 'User',
      Cep: cep.value.replace(/\D/g, ''),
      Road: road.value,
      Number: parseInt(number.value),
      Neighborhood: neighborhood.value,
      City: city.value,
      State: state.value
    };

    await userService.createUser(userPayload);
    
    alert("Conta criada com sucesso!");
    router.push('/login'); 

  } catch (error) {
    console.error("Erro detalhado:", error);
    let msg = "Erro desconhecido.";
    if (error.response) {
      msg = error.response.data?.message || JSON.stringify(error.response.data);
    } else if (error.request) {
      msg = "Erro de conexão com o servidor.";
    } else {
      msg = error.message;
    }
    alert(msg);
  } finally {
      loading.value = false;
  }
}

onMounted(() => {
  animateSignupEntrance();
});
</script>