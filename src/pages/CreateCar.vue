<template>
  <div class="w-full min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-8">
    <div class="w-full max-w-2xl mt-70">
      <div class="flex border-b border-gray-200">
        <button @click="activeTab = 'car'"
          :class="[activeTab === 'car' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'py-4 px-1 border-b-2 font-medium text-sm w-1/3']">
          Criar Carro
        </button>
        <button @click="activeTab = 'brand'"
          :class="[activeTab === 'brand' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'py-4 px-1 border-b-2 font-medium text-sm w-1/3']">
          Criar Marca
        </button>
        <button @click="activeTab = 'category'"
          :class="[activeTab === 'category' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'py-4 px-1 border-b-2 font-medium text-sm w-1/3']">
          Criar Categoria
        </button>
      </div>

      <div class="bg-white p-6 rounded-b-lg shadow-md mt-0">
        <form v-if="activeTab === 'car'" @submit.prevent="handleCreateCar">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Adicionar Novo Carro</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="car-nome" class="block text-sm font-medium text-gray-700">Nome do Modelo</label>
              <input v-model="newCar.nome" type="text" id="car-nome" class="mt-1 form-input text-black border rounded-sm" required>
            </div>
            <div>
              <label for="car-preco" class="block text-sm font-medium text-gray-700">Preço (R$)</label>
              <input v-model.number="newCar.preco" type="number" id="car-preco" class="mt-1 form-input text-black border rounded-sm" required>
            </div>
            <div class="md:col-span-2">
              <label for="car-descricao" class="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea v-model="newCar.descricao" id="car-descricao" rows="3" class="mt-1 form-input text-black border rounded-sm"></textarea>
            </div>
            <div>
              <label for="car-ano" class="block text-sm font-medium text-gray-700">Ano</label>
              <input v-model.number="newCar.ano" type="number" id="car-ano" class="mt-1 form-input text-black border rounded-sm" required>
            </div>
            <div>
              <label for="car-estoque" class="block text-sm font-medium text-gray-700">Estoque</label>
              <input v-model.number="newCar.estoque" type="number" id="car-estoque" class="mt-1 form-input text-black border rounded-sm" required>
            </div>
            <div class="md:col-span-2">
              <label for="car-imagem" class="block text-sm font-medium text-gray-700">Imagem do Carro</label>
              <input @change="handleCarImageUpload" type="file" id="car-imagem" class="mt-1 file-input text-black bg-gray-200 border rounded-sm">
            </div>
            <div>
              <label for="car-marca" class="block text-sm font-medium text-gray-700">Marca</label>
              <select v-model="newCar.marcaId" id="car-marca" class="mt-1 form-input text-black border rounded-sm" required>
                <option disabled value="">Selecione uma marca</option>
                <option v-for="brand in allBrands" :key="brand.id" :value="brand.id">{{ brand.nome }}</option>
              </select>
            </div>
            <div>
              <label for="car-categoria" class="block text-sm font-medium text-gray-700">Categoria</label>
              <select v-model="newCar.categoriaId" id="car-categoria" class="mt-1 form-input text-black border rounded-sm" required>
                <option disabled value="">Selecione uma categoria</option>
                <option v-for="cat in allCategories" :key="cat.id" :value="cat.id">{{ cat.nome }}</option>
              </select>
            </div>
          </div>
          <button type="submit" class="mt-8 w-full btn-primary bg-black" :disabled="loadingCar">
            {{ loadingCar ? 'Salvando...' : 'Salvar Carro' }}
          </button>
        </form>

        <form v-if="activeTab === 'brand'" @submit.prevent="handleCreateBrand">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Adicionar Nova Marca</h2>
          <div class="space-y-6">
            <div>
              <label for="brand-nome" class="block text-sm font-medium text-gray-700">Nome da Marca</label>
              <input v-model="newBrand.nome" type="text" id="brand-nome" class="mt-1 form-input text-black border rounded-sm" required>
            </div>
            <div>
              <label for="brand-imagem" class="block text-sm font-medium text-gray-700">Logo da Marca</label>
              <input @change="handleBrandImageUpload" type="file" id="brand-imagem" class="mt-1 file-input text-black border rounded-sm bg-gray-100">
            </div>
          </div>
          <button type="submit" class="mt-8 w-full btn-primary bg-black" :disabled="loadingBrand">
            {{ loadingBrand ? 'Salvando...' : 'Salvar Marca' }}
          </button>
        </form>

        <form v-if="activeTab === 'category'" @submit.prevent="handleCreateCategory">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Adicionar Nova Categoria</h2>
          <div class="space-y-6">
            <div>
              <label for="category-nome" class="block text-sm font-medium text-gray-700">Nome da Categoria</label>
              <input v-model="newCategory.nome" type="text" id="category-nome" class="mt-1 form-input text-black border rounded-sm" required>
            </div>
          </div>
          <button type="submit" class="mt-8 w-full btn-primary bg-black" :disabled="loadingCategory">
            {{ loadingCategory ? 'Salvando...' : 'Salvar Categoria' }}
          </button>
        </form>
      </div>
    </div>

    <div v-if="notification.show" :class="notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'" class="fixed top-5 right-5 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform">
      {{ notification.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import carService from '../services/carService.js';
import brandService from '../services/brandService.js';
import categoryService from '../services/categoryService.js';


const activeTab = ref('car');
const newCar = ref({
  nome: '',
  preco: 0,
  descricao: '',
  estoque: 0,
  ano: new Date().getFullYear(),
  categoriaId: '',
  marcaId: ''
});
const newBrand = ref({
  nome: '',
});
const newCategory = ref({
  nome: ''
});
const allBrands = ref([]);
const allCategories = ref([]);
const carImageFile = ref(null);
const brandImageFile = ref(null);
const loadingCar = ref(false);
const loadingBrand = ref(false);
const loadingCategory = ref(false);
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


const showNotification = (message, type = 'success') => {
  notification.value = { show: true, message, type };
  setTimeout(() => {
    notification.value.show = false;
  }, 3000);
};

const resetForm = (formRef) => {
  if (formRef === newCar) {
    newCar.value = { nome: '', preco: 0, descricao: '', estoque: 0, ano: new Date().getFullYear(), categoriaId: '', marcaId: '' };
    carImageFile.value = null;
    const carImageInput = document.getElementById('car-imagem');
    if (carImageInput) carImageInput.value = '';
  } else if (formRef === newBrand) {
    newBrand.value = { nome: '' };
    brandImageFile.value = null;
    const brandImageInput = document.getElementById('brand-imagem');
    if (brandImageInput) brandImageInput.value = '';
  } else {
    newCategory.value = { nome: '' };
  }
};

const handleCarImageUpload = (event) => {
  carImageFile.value = event.target.files[0];
};

const handleBrandImageUpload = (event) => {
  brandImageFile.value = event.target.files[0];
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
    formData.append('MarcaId', newCar.value.marcaId);
    formData.append('Imagem', carImageFile.value);
    await carService.create(formData);
    showNotification('Carro criado com sucesso!', 'success');
    resetForm(newCar);
  } catch (error) {
    showNotification('Erro ao criar carro: ' + (error.response?.data?.message || error.message), 'error');
    console.error('Erro ao criar carro:', error);
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
    console.error('Erro ao criar marca:', error);
  } finally {
    loadingBrand.value = false;
  }
};

const handleCreateCategory = async () => {
  loadingCategory.value = true;
  try {
    await categoryService.create(newCategory.value);
    showNotification('Categoria criada com sucesso!', 'success');
    resetForm(newCategory);
  } catch (error) {
    showNotification('Erro ao criar categoria.', 'error');
  } finally {
    loadingCategory.value = false;
  }
};
</script>