<template>
  <div>
    <nav :class="[
      'fixed top-0 w-full z-50 transition-all duration-300 h-26',
      isScrolled ? 'bg-stone-800/90 text-white shadow-md backdrop-blur-sm' : 'bg-transparent text-white'
    ]">
      <div class="max-w-7xl px-6 py-4 flex items-center h-full justify-between md:justify-start">
        <router-link to="/" class="absolute left-10 w-24 h-24">
          <img src="../assets/imgs/Logo.png" alt="Company Logo" class="w-full h-full object-contain" />
        </router-link>
        <ul class="hidden md:flex ml-50 gap-15 font-bold text-2xl items-center">
          <router-link class="hover:text-amber-300 transition-colors" to="/">Home</router-link>
          <li>
            <button @click="openProducts" class="hover:text-amber-300 transition-colors flex items-center gap-2"
              :aria-expanded="productsOpen ? 'true' : 'false'" aria-controls="products-drawer">
              Products
              <svg class="w-5 h-5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 6l6 4-6 4V6z" clip-rule="evenodd" />
              </svg>
            </button>
          </li>
          <router-link class="hover:text-amber-300 transition-colors" to="/about">About</router-link>
          <router-link class="hover:text-amber-300 transition-colors" to="/login">Login</router-link>
          <router-link class="hover:text-amber-300 transition-colors" to="/contact">Contact</router-link>
          <router-link class="hover:text-amber-300 transition-colors" to="/createCar">Create</router-link>

        </ul>
        <button @click="openMobileNav" class="md:hidden rounded-lg text-white hover:bg-stone-800 transition-colors"
          aria-label="Open Navigation Menu" :aria-expanded="mobileNavOpen ? 'true' : 'false'"
          aria-controls="mobile-nav-drawer">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </nav>
    <aside id="mobile-nav-drawer" :class="[
      'fixed top-0 left-0 h-screen w-[30rem] max-w-[90vw] bg-stone-900 text-white z-[60] shadow-2xl',
      'transition-transform transform duration-700 ease-in-out',
      mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
    ]" tabindex="-1" ref="mobileNavRef" aria-label="Mobile Navigation Menu" style="overflow-y: auto;">
      <div class="p-6 flex items-center justify-between border-b border-stone-700">
        <h3 class="text-5xl font-semibold">Menu</h3>
        <button @click="closeMobileNav" class="p-2 rounded hover:bg-stone-800" aria-label="Close Menu">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav class="p-6">
        <ul class="space-y-2 text-3xl">
          <li><router-link @click="closeMobileNav" class="block px-3 py-2 rounded hover:bg-stone-800"
              to="/">Home</router-link></li>
          <li><router-link @click="closeMobileNav" class="block px-3 py-2 rounded hover:bg-stone-800"
              to="/about">About</router-link></li>
          <li><router-link @click="closeMobileNav" class="block px-3 py-2 rounded hover:bg-stone-800" to="/cars">All
              Products</router-link></li>
          <li><router-link @click="closeMobileNav" class="block px-3 py-2 rounded hover:bg-stone-800"
              to="/contact">Contact</router-link></li>
          <li><router-link @click="closeMobileNav" class="block px-3 py-2 rounded hover:bg-stone-800"
              to="/createCar">Create</router-link></li>
        </ul>
      </nav>
    </aside>

    <aside id="products-drawer" :class="[
      'fixed top-0 left-0 h-screen w-[30rem] max-w-[90vw] bg-stone-900 text-white z-[60] shadow-2xl',
      'transition-transform transform duration-700 ease-in-out',
      productsOpen ? 'translate-x-0' : '-translate-x-full'
    ]" tabindex="-1" ref="productsPanelRef" aria-label="Products Menu">
      <div class="p-6 flex items-center justify-between border-b border-stone-700">
        <h3 class="text-5xl font-semibold">Products</h3>
        <button @click="closeProducts" class="p-2 rounded hover:bg-stone-800" aria-label="Close Menu">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav class="p-6 space-y-4 relative">
        <div class="text-4xl uppercase tracking-wide text-stone-400">Categories</div>
        <ul class="space-y-2 text-3xl">
          <router-link class="flex justify-between items-center px-3 py-2 rounded hover:bg-stone-800 cursor-pointer"
            to="/cars">All</router-link>

          <li class="relative group">
            <div class="flex justify-between items-center px-3 py-2 rounded hover:bg-stone-800 cursor-pointer">
              Brands
              <svg class="w-5 h-5 transition-transform group-hover:rotate-90" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 6l6 4-6 4V6z" clip-rule="evenodd" />
              </svg>
            </div>
            <ul
              class="fixed left-full top-0 w-[30rem] h-screen bg-stone-900 shadow-lg p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div
                class="p-4 flex font-semibold items-center justify-between text-4xl uppercase tracking-wide text-stone-400 mb-4 border-b border-stone-700">
                Brands</div>
              <li v-if="brands.length === 0"><a class="block py-1 text-stone-400">Carregando...</a></li>
              <li v-for="brand in brands" :key="brand.id">
                <router-link :to="`/shop/brand/${brand.nome}`" class="block py-1 hover:text-amber-300">{{ brand.nome
                }}</router-link>
              </li>
            </ul>
          </li>

          <li class="relative group">
            <div class="flex justify-between items-center px-3 py-2 rounded hover:bg-stone-800 cursor-pointer">
              Models
              <svg class="w-5 h-5 transition-transform group-hover:rotate-90" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 6l6 4-6 4V6z" clip-rule="evenodd" />
              </svg>
            </div>
            <ul
              class="fixed left-full top-0 w-[30rem] h-screen bg-stone-900 shadow-lg p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div
                class="p-4 flex font-semibold items-center justify-between text-4xl uppercase tracking-wide text-stone-400 mb-4 border-b border-stone-700">
                Models</div>
              <li v-if="categories.length === 0"><a class="block py-1 text-stone-400">Carregando...</a></li>
              <li v-for="category in categories" :key="category.id">
                <router-link :to="`/shop/category/${category.nome}`" class="block py-1 hover:text-amber-300">{{
                  category.nome }}</router-link>
              </li>
            </ul>
          </li>
        </ul>

        <div class="text-4xl uppercase tracking-wide text-stone-400">Highlights</div>
        <ul class="space-y-2 text-3xl">
        </ul>
      </nav>
    </aside>

    <div v-if="overlayOpen" class="fixed inset-0 bg-black/50 z-40" @click="closeAll"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from "vue";
import brandService from '../services/brandService.js';
import categoryService from '../services/categoryService.js';

const isScrolled = ref(true);
const productsOpen = ref(false);
const mobileNavOpen = ref(false); // <-- NOVO ESTADO para o menu mobile
const productsPanelRef = ref(null);
const mobileNavRef = ref(null); // <-- NOVO Ref para o menu mobile

let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

const brands = ref([]);
const categories = ref([]);

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  isScrolled.value = currentScrollY < lastScrollY || currentScrollY <= 50;
  lastScrollY = currentScrollY;
};

// Funções para o painel de PRODUTOS (desktop)
const openProducts = async () => {
  productsOpen.value = true;
  await nextTick();
  productsPanelRef.value?.focus();
};
const closeProducts = () => {
  productsOpen.value = false;
};

// Funções para o painel de NAVEGAÇÃO (mobile)
const openMobileNav = async () => {
  mobileNavOpen.value = true;
  await nextTick();
  mobileNavRef.value?.focus();
};
const closeMobileNav = () => {
  mobileNavOpen.value = false;
};

// Função "fechar tudo" atualizada
const closeAll = () => {
  productsOpen.value = false;
  mobileNavOpen.value = false;
};

const handleKeydown = (e) => {
  if (e.key === "Escape") closeAll();
};

// Overlay agora aparece se QUALQUER painel estiver aberto
const overlayOpen = computed(() => productsOpen.value || mobileNavOpen.value);

watch(overlayOpen, (open) => {
  const cls = "overflow-hidden";
  if (open) document.body.classList.add(cls);
  else document.body.classList.remove(cls);
});

const loadPanelData = async () => {
  try {
    const [brandsResponse, categoriesResponse] = await Promise.all([
      brandService.getAll(),
      categoryService.getAll()
    ]);
    brands.value = brandsResponse.data;
    categories.value = categoriesResponse.data;
  } catch (error) {
    console.error("Falha ao carregar dados do painel:", error);
  }
};

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("keydown", handleKeydown);
  loadPanelData();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("keydown", handleKeydown);
});
</script>