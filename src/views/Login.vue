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
                    Sign In
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
import gsap from 'gsap';

// Form state
const email = ref('');
const password = ref('');
const backgroundVideo = new URL('../assets/videos/Luxury_Car_Login_Page_Video.mp4', import.meta.url).href; // Reusing a video from the home page

function handleLogin() {
    // Handle login logic here
    console.log('Login attempt with:', { email: email.value, password: password.value });
}

onMounted(() => {
    // GSAP animations for a smooth, attractive entry
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.gsap-login-title', { opacity: 0, y: -20, duration: 1.2 })
        .from('.gsap-login-text', { opacity: 0, y: -20, duration: 1 }, "-=0.8")
        .from('.gsap-login-form', { opacity: 0, x: -50, stagger: 0.2, duration: 0.8 }, "-=0.5")
        .from('.gsap-login-button', { opacity: 0, scale: 0.8, duration: 0.8 }, "-=0.4")
        .from('.gsap-login-footer', { opacity: 0, y: 20, duration: 0.6 }, "-=0.3");
});
</script>

<style scoped>
/* Scoped styles can be added here if needed, but Tailwind handles most of the styling */
</style>