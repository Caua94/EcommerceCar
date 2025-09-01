<template>
  <button @mouseenter="startLoading" @mouseleave="resetLoading"
    class="relative flex items-center justify-center w-14 h-14 rounded-full  text-white hover:text-amber-300 transition cursor-pointer">
    <!-- Círculo de Loading -->
    <svg class="absolute w-full h-full transform rotate-[-90deg]" viewBox="0 0 36 36">
      <!-- Fundo -->
      <path class="text-transparent" stroke="currentColor" stroke-width="3" fill="none" d="M18 2
           a 16 16 0 1 1 0 32
           a 16 16 0 1 1 0 -32" />
      <!-- Loading -->
      <path class="text-amber-300 transition-all duration-300 ease-linear" stroke="currentColor" stroke-width="3"
        fill="none" stroke-linecap="round" :stroke-dasharray="circumference" :stroke-dashoffset="progress" d="M18 2
           a 16 16 0 1 1 0 32
           a 16 16 0 1 1 0 -32" />
    </svg>

    <!-- Ícone seta -->
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 relative z-10" fill="none" viewBox="0 0 24 24"
      stroke="currentColor" stroke-width="2" :class="colorArrow">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  size: { type: Number, default: 100 },       // tamanho do círculo (stroke-dasharray base)
  speed: { type: Number, default: 20 },       // velocidade do preenchimento
  color: { type: String, default: "text-amber-300" }, // cor do círculo de loading
  colorArrow: { type: String, default: "text-white" }, // cor da seta
})

const circumference = props.size
const progress = ref(circumference)

let interval = null

function startLoading() {
  resetLoading()
  let val = circumference
  interval = setInterval(() => {
    if (val > 0) {
      val -= 2
      progress.value = val
    }
  }, props.speed)
}

function resetLoading() {
  clearInterval(interval)
  progress.value = circumference
}
</script>
