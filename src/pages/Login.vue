<template>
  <div class="login-page w-screen h-screen flex justify-center items-center relative overflow-hidden">
    <video :src="backgroundVideo" class="absolute top-0 left-0 w-full h-full object-cover z-0" autoplay loop muted
      playsinline preload="auto"></video>
    <div class="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

    <div class="relative z-20 w-full max-w-md p-8 bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl space-y-8 border border-white/20 transform transition-transform duration-500 ease-in-out"
      ref="loginCard">
      <div class="text-center space-y-2">
        <h2 class="text-5xl font-bold text-white tracking-wide gsap-login-title">Welcome Back</h2>
        <p class="text-gray-300 text-lg gsap-login-text">Sign in to explore your dream car.</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="relative gsap-login-form">
          <input type="email" id="email" v-model="email" required
            class="peer w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
            placeholder=" " />
          <label for="email"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 transform-gpu peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:-top-4 peer-focus:left-4 peer-focus:text-amber-400 peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-full">
            Email Address or Username
          </label>
        </div>

        <div class="relative gsap-login-form">
          <input type="password" id="password" v-model="password" required
            class="peer w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
            placeholder=" " />
          <label for="password"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 transform-gpu peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:-top-4 peer-focus:left-4 peer-focus:text-amber-400 peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-full">
            Password
          </label>
        </div>

        <div class="text-right gsap-login-form">
          <a href="#" class="text-sm text-gray-300 hover:text-amber-400 transition-colors">Forgot
            Password?</a>
        </div>

        <button type="submit"
          class="w-full py-4 bg-amber-500 text-white font-bold text-xl rounded-xl hover:bg-amber-600 transition-colors transform hover:scale-105 active:scale-95 duration-200 gsap-login-button">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <p class="text-center text-gray-400 text-sm mt-6 gsap-login-footer">
        Don't have an account?
        <router-link to="/sign" class="text-amber-400 hover:text-amber-500 font-semibold transition-colors">
          Sign Up
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import authService from '../services/authService.js';
import { animateLoginEntrance } from '../utils/animations/LoginAnimations.js';

const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);
const backgroundVideo = new URL('../assets/videos/Luxury_Car_Login_Page_Video.mp4', import.meta.url).href;

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

async function handleLogin() {
    loading.value = true;

    try {
        const response = await authService.login({
            Email: email.value,
            Password: password.value
        });

        const tokenData = response.data.token;
        const tokenString = tokenData.token || tokenData; 

        if (tokenString) {
            localStorage.setItem('authToken', tokenString);

            // Decodifica o token primeiro
            const decoded = parseJwt(tokenString);
            
            // 1. Tenta pegar o nome da resposta direta da API
            let finalName = response.data.name || response.data.Name;
            
            // 2. Se não veio, tenta pegar do Token (claim 'unique_name' ou 'sub')
            if (!finalName && decoded) {
                finalName = decoded.unique_name || decoded.name || decoded.sub;
            }

            // 3. Se ainda não achou, usa o começo do email digitado como fallback
            if (!finalName) {
                finalName = email.value.split('@')[0];
            }

            localStorage.setItem('userName', finalName);

            // Role
            const userRole = decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "User";
            localStorage.setItem('userRole', userRole);

            if (userRole === 'Admin') {
                router.push('/createCar');
            } else {
                router.push('/');
            }
        } else {
            alert("Token inválido recebido do servidor.");
        }

    } catch (error) {
        console.error(error);
        const msg = error.response?.data?.message || "Email ou senha incorretos.";
        alert(msg);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    animateLoginEntrance();
});
</script>