<template>
  <!-- Container do card -->
  <div class="mx-auto w-full max-w-6xl min-h-[400px] text-black overflow-hidden">
    <!-- Transição que troca o conteúdo inteiro do card -->
    <Transition name="crossfade" mode="out-in">
      <div :key="currentIndex" class="flex">
        <!-- Coluna esquerda -->
        <div class="w-1/2 p-8 flex flex-col">
          <!-- Bloco de texto centralizado verticalmente -->
          <div class="flex-1 flex flex-col justify-center gap-4">
            <p class="text-4xl font-bold text-black mb-4">
              {{ currentCard.description }}
            </p>
            <h1 class="text-3xl font-semibold">
              {{ currentCard.title }}
            </h1>
          </div>

          <!-- Botão fixo na parte inferior da coluna -->
          <router-link
            to="/shop"
            class="self-start mt-auto text-4xl hover:text-amber-300 hover:scale-105 flex items-center gap-4 transition-transform"
          >
            <span>Shop now</span>
            <ButtomArrow colorArrow="text-black" />
          </router-link>
        </div>

        <!-- Coluna direita (imagem) -->
        <div class="w-1/2">
          <img
            :src="currentCard.image"
            class="w-full h-full object-cover block"
            :alt="`Imagem do carro - ${currentCard.title}`"
          />
        </div>
      </div>
    </Transition>
  </div>

  <!-- Bullets -->
  <div class="mt-4 flex justify-center gap-3">
    <button
      v-for="(c, idx) in cards"
      :key="'bullet-' + idx"
      @click="goTo(idx)"
      class="w-3.5 h-3.5 rounded-full border-2 transition-colors duration-300"
      :class="{
        'bg-black border-black': currentIndex === idx,
        'bg-transparent border-black': currentIndex !== idx
      }"
      :aria-label="`Ir para card ${idx + 1}`"
      :aria-current="currentIndex === idx ? 'true' : 'false'"
    ></button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ButtomArrow from './ButtomArrow.vue'
import jhowImg from '../assets/imgs/jhow.png' // troque por outras imagens se desejar

// ▶️ 3 cards (exemplo). Substitua pelos seus dados/imagens.
const cards = [
  {
    title: 'Nome carro 1',
    description:
      'Descrição do modelo 1. Motor potente, acabamento premium e tecnologia de ponta.',
    image: jhowImg
  },
  {
    title: 'Nome carro 2',
    description:
      'Descrição do modelo 2. Conforto excepcional, segurança avançada e design arrojado.',
    image: jhowImg // Substitua por outra imagem
  },
  {
    title: 'Nome carro 3',
    description:
      'Descrição do modelo 3. Performance esportiva e conectividade inteligente.',
    image: jhowImg // Substitua por outra imagem
  }
]

const currentIndex = ref(0)
const currentCard = computed(() => cards[currentIndex.value])

// ===== Autoplay (10 segundos) =====
const INTERVAL_MS = 10000
let autoplayId = null

function next() {
  currentIndex.value = (currentIndex.value + 1) % cards.length
}

function startAutoplay() {
  stopAutoplay()
  autoplayId = setInterval(next, INTERVAL_MS)
}

function stopAutoplay() {
  if (autoplayId) {
    clearInterval(autoplayId)
    autoplayId = null
  }
}

function goTo(index) {
  currentIndex.value = index
  startAutoplay()
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>

.crossfade-enter-active,
.crossfade-leave-active {
  transition: opacity 450ms ease, transform 450ms ease;
}
.crossfade-enter-from,
.crossfade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>