<template>
  <div class="login-page w-full h-screen flex justify-center items-center relative overflow-hidden playfair-display-sc-regular">
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
        
        <div class="gsap-login-form">
          <label for="email" class="block text-gray-300 text-sm font-bold mb-2 ml-1">
            Email Address or Username
          </label>
          <input type="email" id="email" v-model="email" required
            class="w-full p-3 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
            placeholder="name@example.com" />
        </div>

        <div class="gsap-login-form">
          <label for="password" class="block text-gray-300 text-sm font-bold mb-2 ml-1">
            Password
          </label>
          <input type="password" id="password" v-model="password" required
            class="w-full p-3 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
            placeholder="••••••••" />
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
import { ref, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router'; 
import authService from '../services/authService.js';
import { animateLoginEntrance } from '../utils/animations/LoginAnimations.js';
import { useLoader } from '../composables/useLoader.js';

const { isLoading } = useLoader();
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

            const decoded = parseJwt(tokenString);

            let finalName = response.data.name || response.data.Name;

            if (!finalName && decoded) {
                finalName = decoded.unique_name || decoded.name || decoded.sub;
            }

            if (!finalName) {
                finalName = email.value.split('@')[0];
            }

            localStorage.setItem('userName', finalName);

            const userRole = decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "User";
            localStorage.setItem('userRole', userRole);

            if (userRole === 'Admin') {
                window.location.href = '/createCar';
            } else {
                window.location.href = '/';
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

watch(isLoading, (val) => {
  if (!val) {
    nextTick(() => {
      animateLoginEntrance();
    });
  }
});
</script>