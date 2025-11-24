<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import { setupHomeAnimations } from '../utils/animations/HomeAnimations.js';
import FilterComponent from '../components/FilterComponent.vue';
import CarCarousel from '../components/CardComponent.vue';
import CarCard from '../components/CardCarProductGrade.vue';
import carService from '../services/carService.js';

const route = useRoute();

const isAdmin = ref(false);
const carList = ref([]);
const error = ref(null);
const isLoading = ref(true);
const hasMorePages = ref(true);

// --- MUDANÇA AQUI ---
// Agora ele pega a URL do Render (Environment Variable). 
// Se não achar (no seu PC), usa o localhost.
// Nota: Removi o "/api" do final aqui porque geralmente as imagens estão na raiz, 
// mas verifique se suas imagens precisam de /api antes.
// Se a imagem quebrar no Render, mude para: import.meta.env.VITE_API_URL
const api_base = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : "http://localhost:5132";
// --------------------

const productsOpen = ref(false);
const productsPanelRef = ref(null);

const filters = ref({
  Name: null,
  PriceMin: null,
  PriceMax: null,
  YearMin: null,
  YearMax: null,
  CategoryId: null,
  BrandId: null,
  PageNumber: 1,
  PageSize: 3
});

const resolveUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('https')) {
    return path;
  }
  // Garante que não fique com barra dupla // ou sem barra
  const baseUrl = api_base.endsWith('/') ? api_base.slice(0, -1) : api_base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}${cleanPath}`;
};

const checkLoginStatus = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    const role = localStorage.getItem('userRole');
    isAdmin.value = (role === 'Admin' || role === 'admin');
  } else {
    isAdmin.value = false;
  }
};

const mapApiProduct = (apiProduct) => {
  const brandImgPath = apiProduct.brand?.imageURL || apiProduct.brand?.imageUrl || apiProduct.marca?.imagemURL;
  const carImgPath = apiProduct.imageUrl || apiProduct.imageURL || apiProduct.imagemUrl;

  return {
    id: apiProduct.id,
    brandLogo: resolveUrl(brandImgPath),
    title: apiProduct.name || apiProduct.nome,
    image: resolveUrl(carImgPath),
    price: (apiProduct.price || apiProduct.preco)?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    year: `Ano ${apiProduct.year || apiProduct.ano}`,
  };
};

const syncFiltersWithUrl = () => {
  const q = route.query;

  filters.value = {
    Name: q.Name || null,
    PriceMin: q.PriceMin ? Number(q.PriceMin) : null,
    PriceMax: q.PriceMax ? Number(q.PriceMax) : null,
    YearMin: q.YearMin ? Number(q.YearMin) : null,
    YearMax: q.YearMax ? Number(q.YearMax) : null,
    BrandId: q.BrandId || null,
    CategoryId: q.CategoryId || null,
    PageNumber: 1,
    PageSize: 3
  };
};

const fetchInitialCars = async () => {
  isLoading.value = true;
  hasMorePages.value = true;
  error.value = null;

  try {
    const response = await carService.filterCars(filters.value);
    const pageData = response.data;
    const carsArray = pageData.items || pageData.Items || [];

    carList.value = carsArray.map(mapApiProduct);

    if (carsArray.length < filters.value.PageSize) {
      hasMorePages.value = false;
    }
  } catch (err) {
    console.error(err);
    error.value = "Não foi possível carregar os modelos.";
  } finally {
    isLoading.value = false;
  }
};

const loadMore = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  filters.value.PageNumber++;

  try {
    const response = await carService.filterCars(filters.value);
    const pageData = response.data;
    const newCarsArray = pageData.items || pageData.Items || [];

    if (newCarsArray.length > 0) {
      const newCarsMapped = newCarsArray.map(mapApiProduct);
      carList.value = [...carList.value, ...newCarsMapped];
    }

    if (newCarsArray.length < filters.value.PageSize) {
      hasMorePages.value = false;
    }
  } catch (err) {
    console.error(err);
    hasMorePages.value = false;
  } finally {
    isLoading.value = false;
  }
};

const openProducts = async () => {
  productsOpen.value = true;
  await nextTick();
  if (productsPanelRef.value) {
    productsPanelRef.value.focus();
  }
};

watch(
  () => route.query,
  (newQuery, oldQuery) => {
    if (JSON.stringify(newQuery) === JSON.stringify(oldQuery)) return;
    syncFiltersWithUrl();
    fetchInitialCars();
  }
);

onMounted(() => {
  checkLoginStatus();
  syncFiltersWithUrl();
  fetchInitialCars();

  requestAnimationFrame(() => {
    setupHomeAnimations();
  });
});
</script>