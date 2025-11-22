<template>
  <div class="signup-page w-screen h-screen flex justify-center items-center relative overflow-hidden playfair-display-sc-regular">
    <video :src="backgroundVideo" class="absolute top-0 left-0 w-full h-full object-cover z-0" autoplay loop muted
      playsinline preload="auto"></video>
    <div class="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

    <div
      class="relative z-20 w-full max-w-md p-8 bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl space-y-8 border border-white/20 transform transition-transform duration-500 ease-in-out"
      ref="signupCard">
      <div class="text-center space-y-2">
        <h2 class="text-5xl font-bold text-white tracking-wide gsap-signup-title">Join Us</h2>
        <p class="text-gray-300 text-lg gsap-signup-text">Create your account to start your journey.</p>
      </div>

      <form @submit.prevent="handleSignup" class="space-y-6">
        <div class="relative gsap-signup-form">
          <input type="text" id="fullname" v-model="fullName" required
            class="peer w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
            placeholder=" " />
          <label for="fullname"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 transform-gpu peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:-top-4 peer-focus:left-4 peer-focus:text-amber-400 peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-full">
            Full Name
          </label>
        </div>

        <div class="relative gsap-signup-form">
          <input type="email" id="email" v-model="email" required
            class="peer w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
            placeholder=" " />
          <label for="email"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 transform-gpu peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:-top-4 peer-focus:left-4 peer-focus:text-amber-400 peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-full">
            Email Address
          </label>
        </div>

        <div class="relative gsap-signup-form">
          <input type="password" id="password" v-model="password" required
            class="peer w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
            placeholder=" " />
          <label for="password"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 transform-gpu peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:-top-4 peer-focus:left-4 peer-focus:text-amber-400 peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-full">
            Password
          </label>
        </div>

        <div class="relative gsap-signup-form">
          <input type="password" id="confirmPassword" v-model="confirmPassword" required
            class="peer w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
            placeholder=" " />
          <label for="confirmPassword"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 transform-gpu peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:-top-4 peer-focus:left-4 peer-focus:text-amber-400 peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-full">
            Confirm Password
          </label>
        </div>

        <button type="submit"
          class="w-full py-4 bg-amber-500 text-white font-bold text-xl rounded-xl hover:bg-amber-600 transition-colors transform hover:scale-105 active:scale-95 duration-200 gsap-signup-button">
          Create Account
        </button>
      </form>

      <p class="text-center text-gray-400 text-sm mt-6 gsap-signup-footer">
        Already have an account?
        <router-link to="/login" class="text-amber-400 hover:text-amber-500 font-semibold transition-colors">
          Log In
        </router-link>
      </p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import para redirecionar após cadastro
import userService from '../services/userService.js'; // Import do serviço que cria a conta
import { animateSignupEntrance } from '../utils/animations/SignAnimations.js';

const router = useRouter();

// Variáveis do Formulário
const fullName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');


const loading = ref(false);
const backgroundVideo = new URL('../assets/videos/Luxury_Car_Login_Page_Video.mp4', import.meta.url).href;

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
      Role: 'User'
    };

   
    await userService.createUser(userPayload);

   
    alert("Conta criada com sucesso!");
    router.push('/login'); 

  } catch (error) {
    console.error("Erro detalhado:", error);

   
    let msg = "Erro desconhecido.";

    if (error.response) {
    
      msg = error.response.data?.message || error.response.data || JSON.stringify(error.response.data);
    } else if (error.request) {
     
      msg = "Erro de conexão com o servidor (Verifique se a API está rodando ou CORS).";
    } else {
      msg = error.message;
    }

    alert(msg);
  }
}

onMounted(() => {
  animateSignupEntrance();
});
</script>
