<template>
  <div>
    <!-- NAVBAR -->
    <nav
      :class="[
        'fixed top-0 w-full z-50 transition-all duration-300 h-30',
        isScrolled ? 'bg-stone-800 text-white shadow-md' : 'bg-transparent text-white'
      ]"
    >
      <div class="max-w-7xl mx-60 px-6 py-4 flex items-center h-full">
        <img src="../assets/imgs/Logo.png" class="absolute left-10 w-24 h-24" />

        <ul class="hidden md:flex gap-15 font-bold text-2xl items-center">
          <router-link class="hover:text-amber-300 transition-colors" to="/">Home</router-link>

          <!-- Products abre o painel lateral -->
          <li>
            <button
              @click="openProducts"
              class="hover:text-amber-300 transition-colors flex items-center gap-2"
              aria-expanded="productsOpen ? 'true' : 'false'"
              aria-controls="products-drawer"
            >
              Products
              
            </button>
          </li>

          <li><a href="#brand" class="hover:text-amber-300 transition-colors">Brands</a></li>
          <router-link class="hover:text-amber-300 transition-colors" to="/about">About</router-link>
          <li><a href="#contato" class="hover:text-amber-300 transition-colors">Contact</a></li>
        </ul>
      </div>
    </nav>

    <!-- PAINEL LATERAL DE PRODUCTS (off-canvas esquerda) -->
    <aside
      :id="'products-drawer'"
      :class="[
        'fixed top-0 left-0 h-screen w-[30rem] max-w-[90vw] bg-stone-900 text-white z-[60] shadow-2xl',
        'transition-transform transform duration-700 ease-in-out',
        productsOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
      tabindex="-1"
      ref="productsPanelRef"
      aria-label="Menu de produtos"
    >
      <!-- Cabeçalho -->
      <div class="p-6 flex items-center justify-between border-b border-stone-700">
        <h3 class="text-5xl font-semibold">Products</h3>
        <button @click="closeProducts" class="p-2 rounded hover:bg-stone-800" aria-label="Fechar Products">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Conteúdo com dropdown lateral -->
      <nav class="p-6 space-y-4">
        <div class="text-4xl uppercase tracking-wide text-stone-400">Categorias</div>
        <ul class="space-y-2 text-3xl relative">
          
          <!-- Brands -->
          <li class="relative group">
            <div class="flex justify-between items-center px-3 py-2 rounded hover:bg-stone-800 cursor-pointer">
              Brands
              <svg class="w-5 h-5 transition-transform group-hover:rotate-90" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 6l6 4-6 4V6z" clip-rule="evenodd" />
              </svg>
            </div>
            <!-- Submenu lateral -->
            <ul
              class="absolute top-0 left-full bg-stone-800 shadow-lg rounded p-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
            >
              <li><a href="#bmw" class="block py-1 hover:text-amber-300">BMW</a></li>
              <li><a href="#audi" class="block py-1 hover:text-amber-300">Audi</a></li>
              <li><a href="#toyota" class="block py-1 hover:text-amber-300">Toyota</a></li>
            </ul>
          </li>
            <li class="relative group">
            <div class="flex justify-between items-center px-3 py-2 rounded hover:bg-stone-800 cursor-pointer">
              Modelos
              <svg class="w-5 h-5 transition-transform group-hover:rotate-90" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 6l6 4-6 4V6z" clip-rule="evenodd" />
              </svg>
            </div>
            <!-- Submenu lateral -->
            <ul
              class="absolute top-0 left-full bg-stone-800 shadow-lg rounded p-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
            >
              <li><a href="#bmw" class="block py-1 hover:text-amber-300">BMW</a></li>
              <li><a href="#audi" class="block py-1 hover:text-amber-300">Audi</a></li>
              <li><a href="#toyota" class="block py-1 hover:text-amber-300">Toyota</a></li>
            </ul>
          </li>
          <div class="text-4xl uppercase tracking-wide text-stone-400">Destaques</div>
          <!-- News -->
          <li class="relative group">
            <div class="flex justify-between items-center px-3 py-2 rounded hover:bg-stone-800 cursor-pointer">
              News
              <svg class="w-5 h-5 transition-transform group-hover:rotate-90" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 6l6 4-6 4V6z" clip-rule="evenodd" />
              </svg>
            </div>
            <!-- Submenu lateral -->
            <ul
              class="absolute top-0 left-full bg-stone-800 shadow-lg rounded p-4 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
            >
              <li><a href="#launches" class="block py-1 hover:text-amber-300">Últimos lançamentos</a></li>
              <li><a href="#reviews" class="block py-1 hover:text-amber-300">Reviews</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- OVERLAY -->
    <div
      v-if="overlayOpen"
      class="fixed inset-0 bg-black/50 z-40"
      @click="closeAll"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from "vue";

const isScrolled = ref(true);
const menuOpen = ref(false);
const productsOpen = ref(false);
const productsPanelRef = ref(null);

let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY <= 50 || currentScrollY < lastScrollY) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
  lastScrollY = currentScrollY;
};

const openProducts = async () => {
  productsOpen.value = true;
  menuOpen.value = false;
  await nextTick();
  productsPanelRef.value?.focus?.();
};

const closeProducts = () => { productsOpen.value = false; };
const closeAll = () => { productsOpen.value = false; menuOpen.value = false; };

const handleKeydown = (e) => {
  if (e.key === "Escape") closeAll();
};

const overlayOpen = computed(() => productsOpen.value || menuOpen.value);

watch(overlayOpen, (open) => {
  const cls = "overflow-hidden";
  if (open) document.body.classList.add(cls);
  else document.body.classList.remove(cls);
});

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("keydown", handleKeydown);
});
</script>
