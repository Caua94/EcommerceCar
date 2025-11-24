<template>
  <Transition
    enter-active-class="transition-opacity duration-500 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-700 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isLoading" 
         class="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black">
      
      <div class="relative w-32 h-32 md:w-48 md:h-48 animate-pulse-slow">
        <img src="../assets/imgs/Logo.png" alt="C94 Logo" 
             class="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
      </div>

      <div class="mt-8 w-48 h-0.5 bg-gray-800 rounded-full overflow-hidden">
        <div class="h-full bg-amber-400 animate-loading-bar"></div>
      </div>

    </div>
  </Transition>
</template>

<script setup>
import { useLoader } from '../composables/useLoader';

// Conecta com o estado global que criamos
const { isLoading } = useLoader();
</script>

<style scoped>
/* Animação personalizada para a barra */
@keyframes loading-bar {
  0% { width: 0%; margin-left: 0; }
  50% { width: 100%; margin-left: 0; }
  100% { width: 0%; margin-left: 100%; }
}

.animate-loading-bar {
  animation: loading-bar 1.5s infinite ease-in-out;
}

/* Pulso suave para o logo */
.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(0.95); }
}
</style>