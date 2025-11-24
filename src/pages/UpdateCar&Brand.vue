<template>
  <div class="login-page w-full min-h-screen flex justify-center items-center relative overflow-hidden p-4 sm:p-8 playfair-display-sc-regular">
    <video :src="backgroundVideo" class="absolute top-0 left-0 w-full h-full object-cover z-0" autoplay loop muted playsinline preload="auto"></video>
    <div class="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

    <div class="relative z-20 w-full max-w-4xl bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 transform transition-transform duration-500 ease-in-out mt-50">

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

        <form v-if="activeTab === 'car'" @submit.prevent="handleUpdateCar" class="space-y-6">
          <div class="flex justify-between items-center mb-6">
             <h2 class="text-3xl font-bold text-white gsap-login-title">Editar Carro</h2>
             <button type="button" @click="router.back()" class="text-gray-300 hover:text-white underline">Voltar</button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label for="car-nome" class="block text-sm font-medium text-white">Nome do Modelo</label>
              <input v-model="currentCar.Name" type="text" id="car-nome"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                required>
            </div>

            <div>
              <label for="car-preco" class="block text-sm font-medium text-white">Preço (R$)</label>
              <input v-model.number="currentCar.Price" type="number" id="car-preco"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                required>
            </div>

            <div class="md:col-span-2">
              <label for="car-descricao" class="block text-sm font-medium text-white">Descrição</label>
              <textarea v-model="currentCar.Description" id="car-descricao" rows="3"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"></textarea>
            </div>

            <div>
              <label for="car-ano" class="block text-sm font-medium text-white">Ano</label>
              <input v-model.number="currentCar.Year" type="number" id="car-ano"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                required>
            </div>

            <div>
              <label for="car-estoque" class="block text-sm font-medium text-white">Estoque</label>
              <input v-model.number="currentCar.Stock" type="number" id="car-estoque" min="0"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                required>
            </div>
            <div>
              <label for="car-nome" class="block text-sm font-medium text-white">Motor do modelo</label>
              <input v-model="currentCar.Engine" type="text" id="car-nome"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                required>
            </div>

            <div>
              <label for="car-nome" class="block text-sm font-medium text-white">Velocidade-km/h</label>
              <input v-model="currentCar.Speed" type="text" id="car-nome"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                required>
            </div>

            <div>
              <label for="car-marca" class="block text-sm font-medium text-white">Marca</label>
              <select v-model="currentCar.BrandId" id="car-marca"
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
              <select v-model="currentCar.CategoryId" id="car-categoria"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors appearance-none"
                required>
                <option disabled value="" class="bg-gray-900">Selecione uma categoria</option>
                <option v-for="cat in allCategories" :key="cat.id" :value="cat.id" class="bg-gray-900">
                  {{ cat.name }}
                </option>
              </select>
            </div>
            
            <div class="md:col-span-2">
              <label for="car-imagem" class="block text-sm font-medium text-white mb-2">Imagem do Carro (Deixe vazio para manter a atual)</label>
              <input @change="handleCarImageUpload" type="file" id="car-imagem"
                class="block w-full text-sm text-gray-300 border border-white/20 rounded-xl file:mr-4 file:py-3 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-500 focus:border-amber-500 focus:ring-amber-500"
                ref="carImageInputRef">
            </div>
            <div class="md:col-span-2">
              <label for="car-imagem-int" class="block text-sm font-medium text-white mb-2">Imagem do interior (Deixe vazio para manter a atual)</label>
              <input @change="handleCarImageInteriorUpload" type="file" id="car-imagem-int"
                class="block w-full text-sm text-gray-300 border border-white/20 rounded-xl file:mr-4 file:py-3 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-500 focus:border-amber-500 focus:ring-amber-500"
                ref="carImageInteriorInputRef">
            </div>
            <div class="md:col-span-2">
              <label for="car-imagem-mot" class="block text-sm font-medium text-white mb-2">Imagem do motor (Deixe vazio para manter a atual)</label>
              <input @change="handleCarImageMotorUpload" type="file" id="car-imagem-mot"
                class="block w-full text-sm text-gray-300 border border-white/20 rounded-xl file:mr-4 file:py-3 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-500 focus:border-amber-500 focus:ring-amber-500"
                ref="carImageMotorInputRef">
            </div>
            <div class="md:col-span-2">
              <label for="car-video" class="block text-sm font-medium text-white mb-2">Video do Carro (Deixe vazio para manter o atual)</label>
              <input @change="handleCarVideoUpload" type="file" id="car-video"
                class="block w-full text-sm text-gray-300 border border-white/20 rounded-xl file:mr-4 file:py-3 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-500 focus:border-amber-500 focus:ring-amber-500"
                ref="carVideoInputRef">
            </div>
            <div class="md:col-span-2">
              <label for="car-3d" class="block text-sm font-medium text-white mb-2">Modelo 3d do carro (Deixe vazio para manter o atual)</label>
              <input @change="handleCar3dUpload" type="file" id="car-3d"
                class="block w-full text-sm text-gray-300 border border-white/20 rounded-xl file:mr-4 file:py-3 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-500 focus:border-amber-500 focus:ring-amber-500"
                ref="car3dRef">
            </div>
          </div>

          <button type="submit"
            class="w-full py-4 mt-8 bg-amber-400 text-white font-bold text-lg rounded-xl hover:bg-amber-500 transition-colors transform hover:scale-105 active:scale-95 duration-200 gsap-login-button"
            :disabled="loadingCar">
            {{ loadingCar ? 'Atualizando...' : 'Atualizar Carro' }}
          </button>
        </form>

        <form v-if="activeTab === 'brand'" @submit.prevent="handleCreateBrand" class="space-y-6">
          <h2 class="text-3xl font-bold text-white mb-6 gsap-login-title">Adicionar Nova Marca</h2>
          <p class="text-gray-400 text-sm mb-4">Esta aba cria uma nova marca. Para editar uma marca existente, use o painel de marcas.</p>
          
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
              ref="bgBrandInputRef">
          </div>
          <div>
            <label for="brand-banner" class="block text-sm font-medium text-white mb-2">Brand Banner</label>
            <input @change="handleLogoBrandUpload" type="file" id="brand-banner"
              class="block w-full text-sm text-gray-300 border border-white/20 rounded-xl file:mr-4 file:py-3 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-600 focus:border-amber-500 focus:ring-amber-500"
              ref="logoBrandInputRef">
          </div>
          

          <button type="submit"
            class="w-full py-4 mt-8 bg-amber-400 text-white font-bold text-lg rounded-xl hover:bg-amber-600 transition-colors transform hover:scale-105 active:scale-95 duration-200 gsap-login-button"
            :disabled="loadingBrand">
            {{ loadingBrand ? 'Salvando...' : 'Salvar Marca' }}
          </button>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import carService from '../services/carService.js';
import brandService from '../services/brandService.js';
import categoryService from '../services/categoryService.js';
import { animateLoginEntrance } from '../utils/animations/LoginAnimations.js';

const router = useRouter();
const route = useRoute();
const backgroundVideo = new URL('../assets/videos/Luxury_Car_Login_Page_Video.mp4', import.meta.url).href;

const activeTab = ref('car');
const tabs = ref([
  { id: 'car', name: 'Editar Carro' },
  { id: 'brand', name: 'Criar Marca' },
]);

const currentCar = ref({
  Name: '',
  Price: 0,
  Description: '',
  Stock: 0,
  Year: new Date().getFullYear(),
  Engine: '',
  Speed: 0,
  CategoryId: '',
  BrandId: ''
});

const newBrand = ref({ Name: '', Description: '' });
const allBrands = ref([]);
const allCategories = ref([]);

const loadingCar = ref(false);
const loadingBrand = ref(false);

const carVideoFile = ref(null);
const carImageInteriorFile = ref(null);
const carImageFile = ref(null);
const carImageMotorFile = ref(null);
const car3dFile = ref(null);

const BrandImageFile = ref(null);
const BgBrandFile = ref(null);
const LogoBrandFile = ref(null);

const carImageInputRef = ref(null);
const carImageInteriorInputRef = ref(null);
const carImageMotorInputRef = ref(null);
const carVideoInputRef = ref(null);
const car3dRef = ref(null);

const brandImageInputRef = ref(null);
const bgBrandInputRef = ref(null);
const logoBrandInputRef = ref(null);

const notification = ref({
  show: false,
  message: '',
  type: 'success'
});

const checkAdmin = () => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    if (!token || (role !== 'Admin' && role !== 'admin')) {
        router.push('/');
    }
}

onMounted(async () => {
  checkAdmin();
  animateLoginEntrance();
  try {
    const brandsResponse = await brandService.getAll();
    allBrands.value = brandsResponse.data;
    const categoriesResponse = await categoryService.getAll();
    allCategories.value = categoriesResponse.data;

    const carId = route.params.id;
    if (carId) {
        const carResponse = await carService.getById(carId);
        const data = carResponse.data;
        
        currentCar.value = {
            Name: data.name || data.Name,
            Price: data.price || data.Price,
            Description: data.description || data.Description,
            Stock: data.stock || data.Stock,
            Year: data.year || data.Year,
            Engine: data.engine || data.Engine,
            Speed: data.speed || data.Speed,
            BrandId: data.brandId || data.BrandId,
            CategoryId: data.categoryId || data.CategoryId
        };
    }
  } catch (error) {
    showNotification('Erro ao carregar dados.', 'error');
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
const handleCar3dUpload = (event) => { car3dFile.value = event.target.files[0]; };

const handleUpdateCar = async () => {
  loadingCar.value = true;
  try {
    const formData = new FormData();
    formData.append('Id', route.params.id);
    formData.append('Name', currentCar.value.Name);
    formData.append('Price', currentCar.value.Price);
    formData.append('Description', currentCar.value.Description);
    formData.append('Stock', currentCar.value.Stock);
    formData.append('Year', currentCar.value.Year);
    formData.append('CategoryId', currentCar.value.CategoryId);
    formData.append('Engine', currentCar.value.Engine);
    formData.append('Speed', currentCar.value.Speed);
    formData.append('BrandId', currentCar.value.BrandId);

    if (carImageFile.value) formData.append('Image', carImageFile.value);
    if (carImageInteriorFile.value) formData.append('InnerImage', carImageInteriorFile.value);
    if (carImageMotorFile.value) formData.append('ImageEngine', carImageMotorFile.value);
    if (carVideoFile.value) formData.append('VideoDemoUrl', carVideoFile.value);
    if (car3dFile.value) formData.append('Model3DUrl', car3dFile.value);

    await carService.update(route.params.id, formData);
    showNotification('Carro atualizado com sucesso!', 'success');
    
    setTimeout(() => {
        router.push('/cars'); 
    }, 1500);

  } catch (error) {
    showNotification('Erro ao atualizar: ' + (error.response?.data?.message || error.message), 'error');
  } finally {
    loadingCar.value = false;
  }
};

const handleCreateBrand = async () => {
  loadingBrand.value = true;
  if (!newBrand.value.Name || !BrandImageFile.value) {
    showNotification('Preencha nome e imagem.', 'error');
    loadingBrand.value = false;
    return;
  }
  try {
    const formData = new FormData();
    formData.append('Name', newBrand.value.Name);
    formData.append('Description', newBrand.value.Description || '');

    if (BrandImageFile.value) formData.append('Image', BrandImageFile.value);
    if (BgBrandFile.value) formData.append('BgBrand', BgBrandFile.value);
    if (LogoBrandFile.value) formData.append('LogoBrand', LogoBrandFile.value);

    await brandService.create(formData);
    showNotification('Marca criada!', 'success');
    newBrand.value = { Name: '', Description: '' };
    
    // Atualiza a lista de marcas no select
    const brandsResponse = await brandService.getAll();
    allBrands.value = brandsResponse.data;

  } catch (error) {
    showNotification('Erro ao criar marca.', 'error');
  } finally {
    loadingBrand.value = false;
  }
};
</script>