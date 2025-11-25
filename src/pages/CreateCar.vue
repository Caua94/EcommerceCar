<template>
  <div class="login-page w-full min-h-screen flex justify-center items-center relative overflow-hidden p-4 sm:p-8 playfair-display-sc-regular">
    <video :src="backgroundVideo" class="absolute top-0 left-0 w-full h-full object-cover z-0" autoplay loop muted
      playsinline preload="auto"></video>
    <div class="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

    <div
      class="relative z-20 w-full max-w-4xl bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 transform transition-transform duration-500 ease-in-out mt-50">

      <transition 
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 transform -translate-y-2" 
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition ease-in duration-200" 
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform -translate-y-2">
        <div v-if="notification.show" :class="notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
          class="mb-4 text-white py-3 px-6 rounded-lg shadow-lg absolute -top-20 left-0 right-0 mx-auto w-11/12">
          {{ notification.message }}
        </div>
      </transition>

      <div class="flex border-b-2 border-white/20 gsap-login-form">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
          activeTab === tab.id ? 'border-amber-400 text-amber-400' : 'border-transparent text-gray-400 hover:text-amber-400 hover:border-gray-300',
          'py-4 px-1 border-b-2 font-medium text-sm w-1/3 transition duration-150 ease-in-out'
        ]">
          {{ tab.name }}
        </button>
      </div>

      <div class="p-6 md:p-8">

        <form v-if="activeTab === 'car'" @submit.prevent="handleCreateCar" class="space-y-6">
          <h2 class="text-3xl font-bold text-white mb-6 gsap-login-title">Adicionar Novo Carro</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label for="car-nome" class="block text-sm font-medium text-white">Nome do Modelo</label>
              <input v-model="newCar.Name" type="text" id="car-nome"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                required>
            </div>

            <div>
              <label for="car-preco" class="block text-sm font-medium text-white">Preço (R$)</label>
              <input v-model.number="newCar.Price" type="number" id="car-preco"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                required>
            </div>

            <div class="md:col-span-2">
              <label for="car-descricao" class="block text-sm font-medium text-white">Descrição</label>
              <textarea v-model="newCar.Description" id="car-descricao" rows="3"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"></textarea>
            </div>

            <div>
              <label for="car-ano" class="block text-sm font-medium text-white">Ano</label>
              <input v-model.number="newCar.Year" type="number" id="car-ano"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                required>
            </div>

            <div>
              <label for="car-estoque" class="block text-sm font-medium text-white">Estoque</label>
              <input v-model.number="newCar.Stock" type="number" id="car-estoque" min="0"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                required>
            </div>
            <div>
              <label for="car-nome" class="block text-sm font-medium text-white">Motor do modelo</label>
              <input v-model="newCar.Engine" type="text" id="car-nome"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                required>
            </div>

            <div>
              <label for="car-nome" class="block text-sm font-medium text-white">Velocidade-km/h</label>
              <input v-model="newCar.Speed" type="text" id="car-nome"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                required>
            </div>

            <div>
              <label for="car-marca" class="block text-sm font-medium text-white">Marca</label>
              <select v-model="newCar.BrandId" id="car-marca"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors appearance-none"
                required>
                <option disabled value="" class="bg-gray-900">Selecione uma marca</option>
                <option v-for="brand in allBrands" :key="brand.id" :value="brand.id" class="bg-gray-900 ">
                  {{ brand.name }}
                </option>
              </select>
            </div>

            <div>
              <label for="car-categoria" class="block text-sm font-medium text-white">Categoria</label>
              <select v-model="newCar.CategoryId" id="car-categoria"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors appearance-none"
                required>
                <option disabled value="" class="bg-gray-900">Selecione uma categoria</option>
                <option v-for="cat in allCategories" :key="cat.id" :value="cat.id" class="bg-gray-900">
                  {{ cat.name }}
                </option>
              </select>
            </div>
            
            <div class="md:col-span-2">
              <label for="car-imagem" class="block text-sm font-medium text-white mb-2">Imagem do Carro</label>
              <input @change="handleCarImageUpload" type="file" id="car-imagem"
                class="block w-full text-sm text-gray-300 border border-white/20 rounded-xl file:mr-4 file:py-3 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-500 focus:border-amber-500 focus:ring-amber-500"
                ref="carImageInputRef">
            </div>
            <div class="md:col-span-2">
              <label for="car-imagem" class="block text-sm font-medium text-white mb-2">Imagem do interior Carro</label>
              <input @change="handleCarImageInteriorUpload" type="file" id="car-imagem"
                class="block w-full text-sm text-gray-300 border border-white/20 rounded-xl file:mr-4 file:py-3 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-500 focus:border-amber-500 focus:ring-amber-500"
                ref="carImageInputRef">
            </div>
            <div class="md:col-span-2">
              <label for="car-imagem" class="block text-sm font-medium text-white mb-2">Imagem do motor Carro</label>
              <input @change="handleCarImageMotorUpload" type="file" id="car-imagem"
                class="block w-full text-sm text-gray-300 border border-white/20 rounded-xl file:mr-4 file:py-3 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-500 focus:border-amber-500 focus:ring-amber-500"
                ref="carImageInputRef">
            </div>
            <div class="md:col-span-2">
              <label for="car-video" class="block text-sm font-medium text-white mb-2">Video do Carro</label>
              <input @change="handleCarVideoUpload" type="file" id="car-imagem"
                class="block w-full text-sm text-gray-300 border border-white/20 rounded-xl file:mr-4 file:py-3 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-500 focus:border-amber-500 focus:ring-amber-500"
                ref="carImageInputRef">
            </div>
            <div class="md:col-span-2">
              <label for="car-3d" class="block text-sm font-medium text-white mb-2">Modelo 3d do carro menor que 10Mb</label>
              <input @change="handleCar3dUpload" type="file" id="car-3d"
                class="block w-full text-sm text-gray-300 border border-white/20 rounded-xl file:mr-4 file:py-3 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-500 focus:border-amber-500 focus:ring-amber-500"
                ref="carImageInputRef">
            </div>
          </div>

          <button type="submit"
            class="w-full py-4 mt-8 bg-amber-400 text-white font-bold text-lg rounded-xl hover:bg-amber-500 transition-colors transform hover:scale-105 active:scale-95 duration-200 gsap-login-button"
            :disabled="loadingCar">
            {{ loadingCar ? 'Salvando...' : 'Salvar Carro' }}
          </button>
        </form>

        <form v-if="activeTab === 'brand'" @submit.prevent="handleCreateBrand" class="space-y-6">
          <h2 class="text-3xl font-bold text-white mb-6 gsap-login-title">Adicionar Nova Marca</h2>
          
          <div>
            <label for="brand-nome" class="block text-sm font-medium text-white">Nome da Marca</label>
            <input v-model="newBrand.Name" type="text" id="brand-nome"
              class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
              required>
          </div>
          <div>
            <label for="brand-desc" class="block text-sm font-medium text-white">Brand Description</label>
            <input v-model="newBrand.Description" type="text" id="brand-desc"
              class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
              required>
          </div>

          <div>
            <label for="brand-imagem" class="block text-sm font-medium text-white mb-2">Logo da Marca</label>
            <input @change="handleBrandImageUpload" type="file" id="brand-imagem"
              class="block w-full text-sm text-gray-300 border border-white/20 rounded-xl file:mr-4 file:py-3 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-600 focus:border-amber-500 focus:ring-amber-500"
              ref="brandImageInputRef">
          </div>
          <div>
            <label for="bg-brand-imagem" class="block text-sm font-medium text-white mb-2">Brand Background</label>
            <input @change="handleBgBrandUpload" type="file" id="bg-brand-imagem"
              class="block w-full text-sm text-gray-300 border border-white/20 rounded-xl file:mr-4 file:py-3 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-600 focus:border-amber-500 focus:ring-amber-500"
              ref="brandImageInputRef">
          </div>
          <div>
            <label for="brand-banner" class="block text-sm font-medium text-white mb-2">Brand Banner</label>
            <input @change="handleLogoBrandUpload" type="file" id="brand-banner"
              class="block w-full text-sm text-gray-300 border border-white/20 rounded-xl file:mr-4 file:py-3 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-600 focus:border-amber-500 focus:ring-amber-500"
              ref="brandImageInputRef">
          </div>
          

          <button type="submit"
            class="w-full py-4 mt-8 bg-amber-400 text-white font-bold text-lg rounded-xl hover:bg-amber-600 transition-colors transform hover:scale-105 active:scale-95 duration-200 gsap-login-button"
            :disabled="loadingBrand">
            {{ loadingBrand ? 'Salvando...' : 'Salvar Marca' }}
          </button>
        </form>

        <form v-if="activeTab === 'category'" @submit.prevent="handleCreateCategory" class="space-y-6">
          <h2 class="text-3xl font-bold text-white mb-6 gsap-login-title">Adicionar Nova Categoria</h2>

          <div>
            <label for="category-nome" class="block text-sm font-medium text-white">Nome da Categoria</label>
            <input v-model="newCategory.Name" type="text" id="category-nome"
              class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
              required>
          </div>

          <button type="submit"
            class="w-full py-4 mt-8 bg-amber-400 text-white font-bold text-lg rounded-xl hover:bg-amber-500 transition-colors transform hover:scale-105 active:scale-95 duration-200 gsap-login-button"
            :disabled="loadingCategory">
            {{ loadingCategory ? 'Salvando...' : 'Salvar Categoria' }}
          </button>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import carService from '../services/carService.js';
import brandService from '../services/brandService.js';
import categoryService from '../services/categoryService.js';
import { animateLoginEntrance } from '../utils/animations/LoginAnimations.js';
import { useLoader } from '../composables/useLoader.js';

const { isLoading } = useLoader();
const backgroundVideo = new URL('../assets/videos/Luxury_Car_Login_Page_Video.mp4', import.meta.url).href;

const activeTab = ref('car');
const tabs = ref([
  { id: 'car', name: 'Criar Carro' },
  { id: 'brand', name: 'Criar Marca' },
  { id: 'category', name: 'Criar Categoria' },
]);

const initialCarState = {
  Name: '',
  Price: 0,
  Description: '',
  Stock: 0,
  Year: new Date().getFullYear(),
  Engine: '',
  Speed: 0,
  CategoryId: '',
  BrandId: ''
};
const initialBrandState = { Name: '', Description: '' };
const initialCategoryState = { Name: '' };

const newCar = ref({ ...initialCarState });
const newBrand = ref({ ...initialBrandState });
const newCategory = ref({ ...initialCategoryState });
const allBrands = ref([]);
const allCategories = ref([]);
const loadingCar = ref(false);
const loadingBrand = ref(false);
const loadingCategory = ref(false);

const carVideoFile = ref(null);
const carImageInteriorFile = ref(null);
const carImageFile = ref(null);
const carImageMotorFile = ref(null);
const car3dFile = ref(null);
const BrandImageFile = ref(null);
const BgBrandFile = ref(null);
const LogoBrandFile = ref(null);

const carImageInputRef = ref(null);
const brandImageInputRef = ref(null);
const bgBrandInputRef = ref(null);
const logoBrandInputRef = ref(null);
const carImageInteriorInputRef = ref(null);
const carImageMotorInputRef = ref(null);
const carVideoInputRef = ref(null);

const notification = ref({
  show: false,
  message: '',
  type: 'success'
});

onMounted(async () => {
  try {
    const brandsResponse = await brandService.getAll();
    allBrands.value = brandsResponse.data;
    const categoriesResponse = await categoryService.getAll();
    allCategories.value = categoriesResponse.data;
  } catch (error) {
    showNotification('Falha ao carregar dados de Marcas/Categorias.', 'error');
  }
});

watch(isLoading, (val) => {
  if (!val) {
    nextTick(() => {
      animateLoginEntrance();
    });
  }
});

const showNotification = (message, type = 'success') => {
  notification.value = { show: true, message, type };
  setTimeout(() => {
    notification.value.show = false;
  }, 3000);
};

const handleCarImageUpload = (event) => { carImageFile.value = event.target.files[0]; };
const handleBrandImageUpload = (event) => { BrandImageFile.value = event.target.files[0]; };
const handleBgBrandUpload = (event) => { BgBrandFile.value = event.target.files[0]; };
const handleLogoBrandUpload = (event) => { LogoBrandFile.value = event.target.files[0]; };
const handleCarImageInteriorUpload = (event) => { carImageInteriorFile.value = event.target.files[0]; };
const handleCarImageMotorUpload = (event) => { carImageMotorFile.value = event.target.files[0]; };
const handleCarVideoUpload = (event) => { carVideoFile.value = event.target.files[0]; };
const handleCar3dUpload = (event) => {car3dFile.value = event.target.files[0]; };

const handleCreateCar = async () => {
  loadingCar.value = true;
  if (!newCar.value.Name || !carImageFile.value || !newCar.value.BrandId || !newCar.value.CategoryId) {
    showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
    loadingCar.value = false;
    return;
  }
  try {
    const formData = new FormData();
    formData.append('Name', newCar.value.Name);
    formData.append('Price', newCar.value.Price);
    formData.append('Description', newCar.value.Description);
    formData.append('Stock', newCar.value.Stock);
    formData.append('Year', newCar.value.Year);
    formData.append('CategoryId', newCar.value.CategoryId);
    formData.append('Engine', newCar.value.Engine);
    formData.append('Speed', newCar.value.Speed);
    formData.append('BrandId', newCar.value.BrandId);

    if (carImageFile.value) formData.append('Image', carImageFile.value);
    if (carImageInteriorFile.value) formData.append('InnerImage', carImageInteriorFile.value);
    if (carImageMotorFile.value) formData.append('ImageEngine', carImageMotorFile.value);
    if (carVideoFile.value) formData.append('VideoDemoUrl', carVideoFile.value);
    if (car3dFile.value) formData.append('Model3DUrl', car3dFile.value);

    await carService.create(formData);
    showNotification('Carro criado com sucesso!', 'success');
    
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    showNotification('Erro ao criar carro: ' + (error.response?.data?.message || error.message), 'error');
  } finally {
    loadingCar.value = false;
  }
};

const handleCreateBrand = async () => {
  loadingBrand.value = true;
  if (!newBrand.value.Name || !BrandImageFile.value) {
    showNotification('Por favor, preencha o nome e a imagem principal.', 'error');
    loadingBrand.value = false;
    return;
  }
  try {
    const formData = new FormData();
    formData.append('Name', newBrand.value.Name);
    formData.append('Description', newBrand.value.Description || '');


    if (BrandImageFile.value) {
      formData.append('Image', BrandImageFile.value); 
    }
    if (BgBrandFile.value) {
      formData.append('BgBrand', BgBrandFile.value); 
    }
    if (LogoBrandFile.value) {
      formData.append('LogoBrand', LogoBrandFile.value); 
    }
    

    await brandService.create(formData);
    showNotification('Marca criada com sucesso!', 'success');
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    showNotification('Erro ao criar marca: ' + (error.response?.data?.message || error.message), 'error');
  } finally {
    loadingBrand.value = false;
  }
};

const handleCreateCategory = async () => {
  loadingCategory.value = true;
  if (!newCategory.value.Name) {
     showNotification('Por favor, preencha o nome da categoria.', 'error');
     loadingCategory.value = false;
     return;
  }
  try {
    await categoryService.create({ Name: newCategory.value.Name });
    showNotification('Categoria criada com sucesso!', 'success');
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    showNotification('Erro ao criar categoria: ' + (error.response?.data?.message || error.message), 'error');
  } finally {
    loadingCategory.value = false;
  }
};
</script>