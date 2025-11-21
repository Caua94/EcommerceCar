<template>
  <div class="h-full w-full flex flex-col bg-stone-900 text-white">
    
    <div class="p-6 flex items-center justify-between border-b border-stone-700">
      <h3 class="text-5xl font-semibold">Filters</h3>
      <button @click="$emit('close')" class="p-2 rounded hover:bg-stone-800 transition-colors" aria-label="Close Menu">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="p-6 space-y-8 relative flex-1 overflow-y-auto custom-scrollbar">
      
      <div class="space-y-2">
        <label class="text-sm uppercase tracking-wider text-stone-400 font-bold">Search</label>
        <input v-model="filters.Name" type="text" placeholder="Ex: Aventador..." 
          class="w-full bg-stone-800 border border-stone-700 rounded p-3 text-white focus:border-amber-500 focus:outline-none transition-colors" />
      </div>

      <div class="space-y-2">
        <label class="text-sm uppercase tracking-wider text-stone-400 font-bold">Price Range</label>
        <div class="flex gap-4">
          <input v-model.number="filters.PriceMin" type="number" placeholder="Min" 
            class="w-1/2 bg-stone-800 border border-stone-700 rounded p-3 text-white focus:border-amber-500 focus:outline-none" />
          <input v-model.number="filters.PriceMax" type="number" placeholder="Max" 
            class="w-1/2 bg-stone-800 border border-stone-700 rounded p-3 text-white focus:border-amber-500 focus:outline-none" />
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-sm uppercase tracking-wider text-stone-400 font-bold">Year Range</label>
        <div class="flex gap-4">
          <input v-model.number="filters.YearMin" type="number" placeholder="Min" 
            class="w-1/2 bg-stone-800 border border-stone-700 rounded p-3 text-white focus:border-amber-500 focus:outline-none" />
          <input v-model.number="filters.YearMax" type="number" placeholder="Max" 
            class="w-1/2 bg-stone-800 border border-stone-700 rounded p-3 text-white focus:border-amber-500 focus:outline-none" />
        </div>
      </div>

      <hr class="border-stone-700" />

      <div v-if="showBrands" class="space-y-2">
        <div class="flex justify-between items-center cursor-pointer" @click="toggleSection('brands')">
          <label class="text-xl uppercase tracking-wider text-stone-400 font-bold cursor-pointer">Brands</label>
          <svg :class="{'rotate-180': openSections.brands}" class="w-5 h-5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        <div v-show="openSections.brands" class="grid grid-cols-2 gap-2 mt-2">
          <button v-for="brand in brands" :key="brand.id" @click="selectBrand(brand.id)"
            :class="['p-2 rounded text-sm text-left transition-all border', filters.BrandId === brand.id ? 'bg-amber-600 border-amber-600 text-white font-bold' : 'bg-stone-800 border-transparent hover:border-stone-600 text-gray-300']">
            {{ brand.name }}
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <div class="flex justify-between items-center cursor-pointer" @click="toggleSection('categories')">
          <label class="text-xl uppercase tracking-wider text-stone-400 font-bold cursor-pointer">Categories</label>
          <svg :class="{'rotate-180': openSections.categories}" class="w-5 h-5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div v-show="openSections.categories" class="grid grid-cols-2 gap-2 mt-2">
          <button v-for="category in categories" :key="category.id" @click="selectCategory(category.id)"
            :class="['p-2 rounded text-sm text-left transition-all border', filters.CategoryId === category.id ? 'bg-amber-600 border-amber-600 text-white font-bold' : 'bg-stone-800 border-transparent hover:border-stone-600 text-gray-300']">
            {{ category.name }}
          </button>
        </div>
      </div>

    </div>

    <div class="p-6 border-t border-stone-700 bg-stone-900 space-y-3">
      <button @click="applyFilters" 
        class="w-full py-4 bg-white text-black font-bold text-xl uppercase tracking-widest hover:bg-amber-400 transition-colors rounded">
        Apply Filters
      </button>
      
      <button @click="clearFilters" 
        class="w-full py-2 text-stone-500 hover:text-white text-sm uppercase tracking-wide transition-colors">
        Clear All
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import brandService from '../services/brandService';
import categoryService from '../services/categoryService';

const emit = defineEmits(['close']);
const router = useRouter();
const route = useRoute();

const props = defineProps({
  showBrands: {
    type: Boolean,
    default: true
  }
});

const brands = ref([]);
const categories = ref([]);

const openSections = reactive({
  brands: true,
  categories: true
});

const filters = ref({
  Name: '',
  PriceMin: null,
  PriceMax: null,
  YearMin: null,
  YearMax: null,
  BrandId: null,
  CategoryId: null
});

const toggleSection = (section) => {
  openSections[section] = !openSections[section];
};

const selectBrand = (id) => {
  filters.value.BrandId = filters.value.BrandId === id ? null : id;
};

const selectCategory = (id) => {
  filters.value.CategoryId = filters.value.CategoryId === id ? null : id;
};

const fetchData = async () => {
  try {
    if (props.showBrands) {
      const brandRes = await brandService.getAll();
      brands.value = brandRes.data;
    }
    const catRes = await categoryService.getAll();
    categories.value = catRes.data;
  } catch (error) {
    console.error(error);
  }
};

const applyFilters = () => {
  const query = {};
  for (const key in filters.value) {
    if (filters.value[key] !== null && filters.value[key] !== '') {
      query[key] = filters.value[key];
    }
  }

  if (!props.showBrands) {
    router.push({ query: query });
  } else {
    router.push({ path: '/cars', query: query });
  }
  
  emit('close');
};

const clearFilters = () => {
  filters.value = {
    Name: '',
    PriceMin: null,
    PriceMax: null,
    YearMin: null,
    YearMax: null,
    BrandId: null,
    CategoryId: null
  };
};

onMounted(() => {
  fetchData();
  
  const q = route.query;
  filters.value.Name = q.Name || '';
  filters.value.PriceMin = q.PriceMin || null;
  filters.value.PriceMax = q.PriceMax || null;
  filters.value.YearMin = q.YearMin || null;
  filters.value.YearMax = q.YearMax || null;
  filters.value.CategoryId = q.CategoryId || null;
  if(props.showBrands) filters.value.BrandId = q.BrandId || null;
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #1c1917; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #44403c; 
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #57534e; 
}
</style>