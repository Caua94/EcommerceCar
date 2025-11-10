<template>
  <div class="login-page w-full min-h-screen flex justify-center items-center relative overflow-hidden p-4 sm:p-8">
    <video :src="backgroundVideo" class="absolute top-0 left-0 w-full h-full object-cover z-0" autoplay loop muted
      playsinline preload="auto"></video>
    <div class="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

    <div
      class="relative z-20 w-full max-w-4xl  bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 transform transition-transform duration-500 ease-in-out mt-20">

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
              <input v-model="newCar.nome" type="text" id="car-nome"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                required>
            </div>

            <div>
              <label for="car-preco" class="block text-sm font-medium text-white">Preço (R$)</label>
              <input v-model.number="newCar.preco" type="number" id="car-preco"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                required>
            </div>

            <div class="md:col-span-2">
              <label for="car-descricao" class="block text-sm font-medium text-white">Descrição</label>
              <textarea v-model="newCar.descricao" id="car-descricao" rows="3"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"></textarea>
            </div>

            <div>
              <label for="car-ano" class="block text-sm font-medium text-white">Ano</label>
              <input v-model.number="newCar.ano" type="number" id="car-ano"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                required>
            </div>

            <div>
              <label for="car-estoque" class="block text-sm font-medium text-white">Estoque</label>
              <input v-model.number="newCar.estoque" type="number" id="car-estoque" min="0"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                required>
            </div>
            <div>
              <label for="car-nome" class="block text-sm font-medium text-white">Motor do modelo</label>
              <input v-model="newCar.motor" type="text" id="car-nome"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                required>
            </div>

            <div>
              <label for="car-nome" class="block text-sm font-medium text-white">Velocidade-km/h</label>
              <input v-model="newCar.velocidade" type="text" id="car-nome"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                required>
            </div>

            <div>
              <label for="car-marca" class="block text-sm font-medium text-white">Marca</label>
              <select v-model="newCar.marcaId" id="car-marca"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors appearance-none"
                required>
                <option disabled value="" class="bg-gray-900">Selecione uma marca</option>
                <option v-for="brand in allBrands" :key="brand.id" :value="brand.id" class="bg-gray-900">
                  {{ brand.nome }}
                </option>
              </select>
            </div>

            <div>
              <label for="car-categoria" class="block text-sm font-medium text-white">Categoria</label>
              <select v-model="newCar.categoriaId" id="car-categoria"
                class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors appearance-none"
                required>
                <option disabled value="" class="bg-gray-900">Selecione uma categoria</option>
                <option v-for="cat in allCategories" :key="cat.id" :value="cat.id" class="bg-gray-900">
                  {{ cat.nome }}
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
              <label for="car-imagem" class="block text-sm font-medium text-white mb-2">Video do Carro</label>
              <input @change="handleCarVideoUpload" type="file" id="car-imagem"
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
            <input v-model="newBrand.nome" type="text" id="brand-nome"
              class="mt-1 block w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
              required>
          </div>

          <div>
            <label for="brand-imagem" class="block text-sm font-medium text-white mb-2">Logo da Marca</label>
            <input @change="handleBrandImageUpload" type="file" id="brand-imagem"
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
            <input v-model="newCategory.nome" type="text" id="category-nome"
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
import { ref, onMounted } from 'vue';
import carService from '../services/carService.js';
import brandService from '../services/brandService.js';
import categoryService from '../services/categoryService.js';


import { animateLoginEntrance } from '../utils/animations/LoginAnimations.js';
const backgroundVideo = new URL('../assets/videos/Luxury_Car_Login_Page_Video.mp4', import.meta.url).href;


const activeTab = ref('car');
const tabs = ref([
  { id: 'car', name: 'Criar Carro' },
  { id: 'brand', name: 'Criar Marca' },
  { id: 'category', name: 'Criar Categoria' },
]);


const initialCarState = {
  nome: '',
  preco: 0,
  descricao: '',
  estoque: 0,
  ano: new Date().getFullYear(),
  motor: '',
  velocidade: '',
  categoriaId: '',
  marcaId: ''
};
const initialBrandState = { nome: '' };
const initialCategoryState = { nome: '' };


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
const brandImageFile = ref(null);
const carImageMotorFile = ref(null);

const carImageInputRef = ref(null);
const brandImageInputRef = ref(null);
const carImageInteriorInputRef = ref(null); 
const carImageMotorInputRef = ref(null);
const carVideoInputRef = ref(null); 


const notification = ref({
  show: false,
  message: '',
  type: 'success'
});

onMounted(async () => {
a
  animateLoginEntrance();


  try {
    const brandsResponse = await brandService.getAll();
    allBrands.value = brandsResponse.data;
    const categoriesResponse = await categoryService.getAll();
    allCategories.value = categoriesResponse.data;
  } catch (error) {
    showNotification('Falha ao carregar dados de Marcas/Categorias.', 'error');
  }
});


const showNotification = (message, type = 'success') => {
  notification.value = { show: true, message, type };
  setTimeout(() => {
    notification.value.show = false;
  }, 3000);
};

const resetForm = (formRef) => {
  if (formRef === newCar) {
    newCar.value = { ...initialCarState };
    carImageFile.value = null;
    carImageInteriorFile.value = null; 
    carImageMotorFile.value = null; 
    carVideoFile.value = null;


    if (carImageInputRef.value) carImageInputRef.value.value = '';
    if (carImageInteriorInputRef.value) carImageInteriorInputRef.value.value = ''; 
    if (carImageMotorInputRef.value) carImageMotorInputRef.value.value = ''; 
    if (carVideoInputRef.value) carVideoInputRef.value.value = ''; 



  } else if (formRef === newBrand) {
    newBrand.value = { ...initialBrandState };
    brandImageFile.value = null;
    if (brandImageInputRef.value) brandImageInputRef.value.value = '';
  } else {
    newCategory.value = { ...initialCategoryState };
  }
};



const handleCarImageUpload = (event) => {
  carImageFile.value = event.target.files[0];
};

const handleBrandImageUpload = (event) => {
  brandImageFile.value = event.target.files[0];
};

const handleCarImageInteriorUpload = (event) => {
  carImageInteriorFile.value = event.target.files[0];
};

const handleCarImageMotorUpload = (event) => {
  carImageMotorFile.value = event.target.files[0];
};


const handleCarVideoUpload = (event) => {
  carVideoFile.value = event.target.files[0];
};


const handleCreateCar = async () => {
  loadingCar.value = true;
  if (!newCar.value.nome || !carImageFile.value || !newCar.value.marcaId || !newCar.value.categoriaId) {
    showNotification('Por favor, preencha todos os campos obrigatórios (Nome, Imagem, Marca e Categoria).', 'error');
    loadingCar.value = false;
    return;
  }
  try {
    const formData = new FormData();
    formData.append('Nome', newCar.value.nome);
    formData.append('Preco', newCar.value.preco);
    formData.append('Descricao', newCar.value.descricao);
    formData.append('Estoque', newCar.value.estoque);
    formData.append('Ano', newCar.value.ano);
    formData.append('CategoriaId', newCar.value.categoriaId);
    formData.append('Motor', newCar.value.motor); 
    formData.append('Velocidade', newCar.value.velocidade); 
    formData.append('MarcaId', newCar.value.marcaId);
    formData.append('Imagem', carImageFile.value);

    if (carImageFile.value) {
      formData.append('Imagem', carImageFile.value);
    }
    if (carImageInteriorFile.value) { 
      formData.append('ImagemInterior', carImageInteriorFile.value);
    }
    if (carImageMotorFile.value) { 
      formData.append('ImagemMotor', carImageMotorFile.value);
    }
    if (carVideoFile.value) { 
     
      formData.append('VideoDemoUrl', carVideoFile.value);
    }
    
    await carService.create(formData);
    showNotification('Carro criado com sucesso!', 'success');
    resetForm(newCar);
  } catch (error) {
    showNotification('Erro ao criar carro: ' + (error.response?.data?.message || error.message), 'error');
  } finally {
    loadingCar.value = false;
  }
};

const handleCreateBrand = async () => {
  loadingBrand.value = true;
  if (!newBrand.value.nome || !brandImageFile.value) {
    showNotification('Por favor, preencha o nome e selecione uma imagem para a marca.', 'error');
    loadingBrand.value = false;
    return;
  }
  try {
    const formData = new FormData();
    formData.append('Nome', newBrand.value.nome);
    formData.append('Imagem', brandImageFile.value);
    
    await brandService.create(formData);
    showNotification('Marca criada com sucesso!', 'success');
    resetForm(newBrand);
  } catch (error) {
    showNotification('Erro ao criar marca: ' + (error.response?.data?.message || error.message), 'error');
  } finally {
    loadingBrand.value = false;
  }
};

const handleCreateCategory = async () => {
  loadingCategory.value = true;
  if (!newCategory.value.nome) {
     showNotification('Por favor, preencha o nome da categoria.', 'error');
     loadingCategory.value = false;
     return;
  }
  try {
    await categoryService.create(newCategory.value);
    showNotification('Categoria criada com sucesso!', 'success');
    resetForm(newCategory);
  } catch (error) {
    showNotification('Erro ao criar categoria: ' + (error.response?.data?.message || error.message), 'error');
  } finally {
    loadingCategory.value = false;
  }
};
</script>