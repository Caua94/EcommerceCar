<template>
  <div>

    <nav :class="[

      'fixed top-0 w-full z-50 transition-all duration-300 h-22 playfair-display-sc-regular',

      isScrolled ? 'bg-stone-800/90 text-white shadow-md backdrop-blur-sm' : 'bg-transparent text-white'

    ]">

      <div class="max-w-7xl px-6 py-4 flex items-center h-full justify-between md:justify-start">

        <div class="absolute left-10 w-24 h-24">

          <img src="../assets/imgs/Logo.png" alt="Company Logo" class="w-full h-full object-contain" />

        </div>

        <ul class="hidden md:flex ml-50 gap-15 font-bold text-2xl items-center">

          <router-link class="hover:text-amber-300 transition-colors" to="/">Home</router-link>

          <li>

            <button @click="openProducts" class="hover:text-amber-300 transition-colors flex items-center gap-2"
              :aria-expanded="productsOpen ? 'true' : 'false'" aria-controls="products-drawer">

              Cars

              <svg class="w-5 h-5 transition-transform" viewBox="0 0 20 20" fill="currentColor">

                <path fill-rule="evenodd" d="M6 6l6 4-6 4V6z" clip-rule="evenodd" />

              </svg>

            </button>

          </li>

          <router-link class="hover:text-amber-300 transition-colors" to="/about">About</router-link>



          <router-link class="hover:text-amber-300 transition-colors" to="/contact">Contact</router-link>

          <router-link v-if="isAdmin" class="hover:text-amber-300 transition-colors"
            to="/createCar">Create</router-link>

          <div class="absolute right-10 flex items-center gap-6">

            <div v-if="currentUser" class="flex items-center gap-4">
              <span v-if="isAdmin" class="text-amber-400 font-semibold capitalize text-lg">Admin, {{ currentUser }}</span>
              <span v-else class="text-amber-400 font-semibold capitalize text-lg">Shop your dream, {{ currentUser }}</span>
              <button @click.prevent="handleLogout"
                class="hover:text-red-400 transition-colors border border-white/30 hover:border-red-400 rounded-full px-4 py-1 text-sm">
                Logout
              </button>
            </div>

            <router-link v-else class="hover:text-amber-300 transition-colors hover:border rounded-full p-2"
              to="/login">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-8">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </router-link>

          </div>



        </ul>

        <button @click="openMobileNav"
          class="md:hidden rounded-lg text-white hover:bg-stone-800 transition-colors ml-auto"
          aria-label="Open Navigation Menu">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </nav>

    <aside id="mobile-nav-drawer " :class="[
      'fixed top-0 left-0 h-screen w-[30rem] max-w-[90vw] bg-stone-900 text-white z-[60] shadow-2xl',
      'transition-transform transform duration-700 ease-in-out playfair-display-sc-regular',
      mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
    ]" tabindex="-1" ref="mobileNavRef" style="overflow-y: auto;">
      <div class="p-6 flex items-center justify-between border-b border-stone-700">
        <h3 class="text-5xl font-semibold">Menu</h3>
        <button @click="closeMobileNav" class="p-2 rounded hover:bg-stone-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav class="p-6">
        <ul class="space-y-2 text-3xl">
          <li v-if="currentUser">
            <div class="px-3 py-2 text-amber-400 capitalize">Shop your dream, {{ currentUser }}</div>
            <button @click.prevent="handleLogout(); closeMobileNav()"
              class="block w-full text-left px-3 py-2 rounded hover:bg-red-900/30 text-red-400">Logout</button>
          </li>
          <li v-else>
            <router-link @click="closeMobileNav" class="block px-3 py-2 rounded hover:bg-stone-800"
              to="/login">Login</router-link>
          </li>
          <li><router-link @click="closeMobileNav" class="block px-3 py-2 rounded hover:bg-stone-800"
              to="/">Home</router-link></li>


          <li><router-link @click="closeMobileNav" class="block px-3 py-2 rounded hover:bg-stone-800"
              to="/about">About</router-link></li>
          <li><router-link @click="closeMobileNav" class="block px-3 py-2 rounded hover:bg-stone-800" to="/cars">All
              Products</router-link></li>
          <li><router-link @click="closeMobileNav" class="block px-3 py-2 rounded hover:bg-stone-800"
              to="/contact">Contact</router-link></li>
          <li v-if="isAdmin"><router-link @click="closeMobileNav" class="block px-3 py-2 rounded hover:bg-stone-800"
              to="/createCar">Create</router-link></li>
        </ul>
      </nav>
    </aside>

    <aside id="products-drawer " :class="[
      'fixed top-0 left-0 h-screen w-[30rem] max-w-[90vw] bg-stone-900 text-white z-[60] shadow-2xl',
      'transition-transform transform duration-700 ease-in-out playfair-display-sc-regular',
      productsOpen ? 'translate-x-0' : '-translate-x-full'
    ]" tabindex="-1" ref="productsPanelRef">
      <div class="p-6 flex items-center justify-between border-b border-stone-700">
        <h3 class="text-5xl font-semibold">Cars</h3>
        <button @click="closeProducts" class="p-2 rounded hover:bg-stone-800">
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
                <router-link :to="`/carsPerBrand/${brand.id}`" class="block py-1 hover:text-amber-300">{{ brand.name
                }}</router-link>
              </li>
              
            </ul>
          </li>
          <li class="relative group">
  <div class="flex justify-between items-center px-3 py-2 rounded hover:bg-stone-800 cursor-pointer">
    Categories
    <svg class="w-5 h-5 transition-transform group-hover:rotate-90" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M6 6l6 4-6 4V6z" clip-rule="evenodd" />
    </svg>
  </div>
  
  <ul class="fixed left-full top-0 w-[30rem] h-screen bg-stone-900 shadow-lg p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
    <div class="p-4 flex font-semibold items-center justify-between text-4xl uppercase tracking-wide text-stone-400 mb-4 border-b border-stone-700">
      Categories
    </div>

    <li v-if="categories.length === 0">
      <a class="block py-1 text-stone-400">Carregando...</a>
    </li>

    <li v-for="category in categories" :key="category.id" class="flex items-center justify-between group/item hover:bg-stone-800 rounded px-2 transition-colors">
      
      <router-link 
        :to="{ path: '/cars', query: { CategoryId: category.id } }" 
        @click="closeProducts"
        class="flex-1 py-2 hover:text-amber-300 block"
      >
        {{ category.name }}
      </router-link>

      <button 
        v-if="isAdmin" 
        @click.prevent="handleDeleteCategory(category.id)"
        class="p-2 text-stone-500 hover:text-red-500 transition-colors"
        title="Excluir Categoria"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>

    </li>
  </ul>
</li>
        </ul>
        
      </nav>
    </aside>

    <div v-if="overlayOpen" class="fixed inset-0 bg-black/50 z-40" @click="closeAll"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from "vue";
import { useRouter } from 'vue-router';
import brandService from '../services/brandService.js';
import categoryService from '../services/categoryService.js';
import authService from '../services/authService.js';

const router = useRouter();
const isScrolled = ref(true);
const productsOpen = ref(false);
const mobileNavOpen = ref(false);
const productsPanelRef = ref(null);
const mobileNavRef = ref(null);
const brands = ref([]);
const categories = ref([]);
const currentUser = ref(null);
const isAdmin = ref(false);

let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

const checkLoginStatus = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    const savedName = localStorage.getItem('userName');
    if (savedName && savedName !== "undefined") {
      currentUser.value = savedName;
    } else {
      currentUser.value = "User";
    }


    const role = localStorage.getItem('userRole');

    if (role === 'Admin' || role === 'admin') {
      isAdmin.value = true;
    } else {
      isAdmin.value = false;
    }

  } else {
    currentUser.value = null;
    isAdmin.value = false;
  }
};

const handleLogout = () => {
  if (authService.logout) {
    authService.logout();
  }
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  currentUser.value = null;
  isAdmin.value = false;
  window.location.href = '/login';
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  isScrolled.value = currentScrollY < lastScrollY || currentScrollY <= 50;
  lastScrollY = currentScrollY;
};

const openProducts = async () => { productsOpen.value = true; await nextTick(); productsPanelRef.value?.focus(); };
const closeProducts = () => { productsOpen.value = false; };
const openMobileNav = async () => { mobileNavOpen.value = true; await nextTick(); mobileNavRef.value?.focus(); };
const closeMobileNav = () => { mobileNavOpen.value = false; };
const closeAll = () => { productsOpen.value = false; mobileNavOpen.value = false; };
const handleKeydown = (e) => { if (e.key === "Escape") closeAll(); };
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

const handleDeleteCategory = async (id) => {
  if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;

  try {
    
    await categoryService.delete(id); 
   
    await loadPanelData(); 
    alert("Categoria removida com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar categoria:", error);
    alert("Não foi possível deletar a categoria.");
  }
};

onMounted(() => {
  checkLoginStatus();
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