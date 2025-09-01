<template>
  <main class="w-screen h-[100vh] relative flex items-center justify-center overflow-hidden">
    <!-- Camada de texto sobre o vídeo -->
    <div class="absolute z-40 text-white text-center bottom-32 space-y-6 inset-x-0">
      <p class="text-gray-200 font-medium text-2xl">Luxuous cars</p>
      <h1 class="text-7xl font-bold">Make a dream come true.</h1>

      <router-link
        to="/shop"
        class="text-4xl hover:text-amber-300 hover:scale-105 flex items-center justify-center gap-4 transition-transform"
      >
        <p>Shop now</p>
        <ButtomArrow />
      </router-link>
    </div>

    <!-- Vídeo com transição de opacidade -->
    <video
      :src="videos[currentVideo]"
      class="top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out z-10"
      :class="{ 'opacity-0': isFading }"
      autoplay
      muted
      playsinline
      preload="auto"
      @ended="startFade()"
    ></video>

    <!-- Botões (bullets) para trocar o vídeo -->
    <div class="absolute bottom-4 flex space-x-3 z-50">
      <button
        v-for="(video, index) in videos"
        :key="'btn-' + index"
        @click="startFade(index)"
        class="w-4 h-4 rounded-full border-2 transition-colors duration-300"
        :class="{
          'bg-white border-white': currentVideo === index,
          'bg-transparent border-white': currentVideo !== index
        }"
        :aria-label="`Ir para vídeo ${index + 1}`"
      ></button>
    </div>
  </main>

  <!-- Featured Sells -->
  <section class="w-screen h-[1000px] flex justify-center items-center flex-col text-black scroll-reveal fade-in">
    <p class="flex text-4xl font-semibold mb-8 ">Featured Sells</p>
    <cardComponent/>

  </section>

  <!-- Seção com imagem e gradiente -->
  <section
    class="w-screen h-[600px] flex justify-center items-center overflow-hidden shadow-2xl scroll-reveal fade-in"
  >
    <div>
      <img src="../assets/imgs/carInternPub.jpg" alt="Interior de um carro de luxo"/>
    </div>

    <div 
      class="w-3/5 h-full bg-gradient-to-l from-black/90 to-black/10 text-white flex flex-col justify-center items-center absolute right-0 p-4 shadow-2xl space-y-4"
    >
      <p class="text-7xl">Buy Your Dreams</p>

      <router-link
        to="/shop"
        class="text-4xl hover:text-amber-300 hover:scale-105 flex items-center justify-center gap-4 transition-transform"
      >
        <p>Shop now</p>
        <ButtomArrow />
      </router-link>
    </div>
  </section>

  <!-- Marcas -->
  <section id="brand" class="w-screen h-[600px] flex justify-center bg-gradient-to-b from-gray-400/90 to-white ">
    <div class="grid grid-cols-5 place-items-center w-3/4 rounded-[500px] m-10 gap-4">
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform scroll-reveal fade-in" src="../assets/imgs/nissan.png" alt="Marca Nissan 1" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform scroll-reveal fade-in" src="../assets/imgs/nissan.png" alt="Marca Nissan 2" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform scroll-reveal fade-in" src="../assets/imgs/nissan.png" alt="Marca Nissan 3" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform scroll-reveal fade-in" src="../assets/imgs/nissan.png" alt="Marca Nissan 4" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform scroll-reveal fade-in" src="../assets/imgs/nissan.png" alt="Marca Nissan 5" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform scroll-reveal fade-in" src="../assets/imgs/nissan.png" alt="Marca Nissan 6" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform scroll-reveal fade-in" src="../assets/imgs/nissan.png" alt="Marca Nissan 7" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform scroll-reveal fade-in" src="../assets/imgs/nissan.png" alt="Marca Nissan 8" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform scroll-reveal fade-in" src="../assets/imgs/nissan.png" alt="Marca Nissan 9" />
      <img class="w-24 h-24 m-4 hover:scale-105 transition-transform scroll-reveal fade-in" src="../assets/imgs/nissan.png" alt="Marca Nissan 10" />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import ButtomArrow from '../components/ButtomArrow.vue'
import cardComponent from '../components/cardComponent.vue'

// Fontes de vídeo (Vite/ESM)
const videos = [
  new URL('../assets/videos/carVideo1.mp4', import.meta.url).href,
  new URL('../assets/videos/carVideo2.mp4', import.meta.url).href,
  new URL('../assets/videos/carVideo3.mp4', import.meta.url).href
]

const currentVideo = ref(0)
const isFading = ref(false)

function startFade(index = null) {
  isFading.value = true

  setTimeout(async () => {
    if (index !== null) {
      currentVideo.value = index
    } else {
      currentVideo.value = (currentVideo.value + 1) % videos.length
    }

    await nextTick()
    isFading.value = false
  }, 500)
}

onMounted(() => {
  // Uso com CDN: a lib fica disponível em window.ScrollReveal
  const sr = window.ScrollReveal ? window.ScrollReveal() : null

  if (!sr) {
    // Evita quebrar caso a CDN não tenha carregado
    console.warn('ScrollReveal não encontrado. Verifique a inclusão da CDN no index.html.')
    return
  }

  sr.reveal('.scroll-reveal', {
    delay: 200,
    distance: '50px',
    opacity: 0,
    duration: 1000,
    easing: 'ease-out',
    interval: 100,
    reset: false // Coloque true se quiser animar novamente quando o elemento voltar à viewport
  })
})
</script>

<style scoped>
/* Estilos locais opcionais */
</style>
