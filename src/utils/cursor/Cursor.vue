<template>
  <div 
    ref="cursorRef"
    class="fixed top-0 left-0 w-8 h-8 border border-amber-500 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out hidden md:block"
    :style="cursorStyle"
  ></div>

  <div 
    class="fixed top-0 left-0 w-2 h-2 bg-amber-500 rounded-full pointer-events-none z-[9999] hidden md:block"
    :style="dotStyle"
  ></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const mouseX = ref(0);
const mouseY = ref(0);
const cursorX = ref(0);
const cursorY = ref(0);

const dotStyle = ref({});
const cursorStyle = ref({});

const onMouseMove = (e) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
  
  
  dotStyle.value = {
    transform: `translate(${e.clientX - 4}px, ${e.clientY - 4}px)` 
  };
};

const animateCursor = () => {
  
  const speed = 0.15; 
  
  cursorX.value += (mouseX.value - cursorX.value) * speed;
  cursorY.value += (mouseY.value - cursorY.value) * speed;
  
  cursorStyle.value = {
    transform: `translate(${cursorX.value - 16}px, ${cursorY.value - 16}px)` 
  };

  requestAnimationFrame(animateCursor);
};

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove);
  animateCursor();
});

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove);
});
</script>

<style scoped>

 :global(body) {

  cursor: none;
} 

</style>