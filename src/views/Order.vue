<template>
  <div class="bg-black text-white min-h-screen font-sans">
    
    <section class="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <img
        :src="currentHeroImage"
        alt="Carro de Luxo"
        class="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 ease-in-out"
        ref="heroImage"
      />
      
      <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
      
      <div class="relative z-20 text-center p-8">
        <h1
          class="text-4xl sm:text-6xl md:text-8xl font-thin tracking-wide mb-4 opacity-0 -translate-y-8"
          ref="heroTitle"
        >
          {{ car.name }}
        </h1>
        <p
          class="text-base sm:text-xl md:text-2xl font-light mb-10 opacity-0 -translate-y-8"
          ref="heroSubtitle"
        >
          {{ car.tagline }}
        </p>
        <button
          class="group border border-white text-sm sm:text-lg font-light py-3 px-8 transition-colors duration-300 hover:bg-white hover:text-black opacity-0"
          ref="heroButton"
        >
          Explore o Modelo
        </button>
      </div>
    </section>

    <section class="container mx-auto py-20 px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center" ref="detailsSection">
        <div
          v-for="(detail, index) in car.details"
          :key="index"
          class="opacity-0 translate-y-10 car-detail"
        >
          <div class="text-5xl mb-4 font-light">{{ detail.icon }}</div>
          <h3 class="text-xl font-medium mb-2">{{ detail.title }}</h3>
          <p class="text-sm text-gray-400">{{ detail.description }}</p>
        </div>
      </div>
    </section>
    
    <section class="bg-gray-900 py-20 px-8">
      <div class="container mx-auto">
        <h2 class="text-3xl font-thin text-center mb-16 opacity-0" ref="specsTitle">
          Performance em Números
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12" ref="specsSection">
          <div
            v-for="(spec, index) in car.specs"
            :key="index"
            class="text-center opacity-0 translate-y-10 car-spec"
          >
            <p class="text-6xl font-light mb-2 text-white">{{ spec.value }}</p>
            <p class="text-sm font-light text-gray-400 uppercase tracking-widest">{{ spec.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto py-20 px-8 text-center">
      <h2 class="text-3xl font-thin mb-8">Personalize Sua Cor</h2>
      <div class="flex justify-center space-x-4">
        <div
          v-for="color in car.colors"
          :key="color.name"
          @click="selectColor(color.image, color.name)"
          class="w-12 h-12 rounded-full border-2 border-transparent transition-all duration-300 cursor-pointer"
          :class="{'ring-2 ring-white ring-offset-4 ring-offset-black': currentColor === color.name}"
          :style="{ backgroundColor: color.hex }"
        ></div>
      </div>
    </section>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

// Dados do carro (exemplo)
const car = {
  name: 'Odin X-1',
  tagline: 'Onde o luxo encontra a performance.',
  details: [
    { icon: '🧬', title: 'DNA Inovador', description: 'Design esculpido pelo vento, refletindo nossa herança de inovação e engenharia.' },
    { icon: '✨', title: 'Conforto Exclusivo', description: 'Materiais nobres e tecnologia de ponta para uma experiência de condução inigualável.' },
    { icon: '🚀', title: 'Potência Absoluta', description: 'Motor de alta performance, entregando uma aceleração de tirar o fôlego.' },
  ],
  specs: [
    { label: '0-100 km/h', value: '3.2s' },
    { label: 'Potência', value: '750 HP' },
    { label: 'Velocidade Máxima', value: '330 km/h' },
    { label: 'Torque', value: '850 Nm' },
  ],
  colors: [
    { name: 'cinza-escuro', hex: '#2c2c2c', image: 'https://images.unsplash.com/photo-1542362567-b1a03e1c37c2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'vermelho', hex: '#8b0000', image: 'https://images.unsplash.com/photo-1538356391456-e63d39589d98?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'branco-perola', hex: '#e8e8e8', image: 'https://images.unsplash.com/photo-1549399587-873b88b4975f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ]
};

// Referências de elementos para o GSAP
const heroTitle = ref(null);
const heroSubtitle = ref(null);
const heroButton = ref(null);
const heroImage = ref(null);
const detailsSection = ref(null);
const specsTitle = ref(null);
const specsSection = ref(null);

// Estado para a imagem do hero e a cor selecionada
const currentHeroImage = ref(car.colors[0].image);
const currentColor = ref(car.colors[0].name);

const selectColor = (image, colorName) => {
  gsap.to(heroImage.value, { opacity: 0, duration: 0.3, onComplete: () => {
    currentHeroImage.value = image;
    gsap.to(heroImage.value, { opacity: 1, duration: 0.3 });
  }});
  currentColor.value = colorName;
};

// Animações com GSAP
onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from(heroImage.value, { scale: 1.1, duration: 1.5 })
    .from([heroTitle.value, heroSubtitle.value, heroButton.value], {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 1,
    }, '-=1.2');

  // Animação para as seções de detalhes e especificações
  // Usamos um seletor de classe para animar todos os elementos com a mesma classe
  gsap.to('.car-detail', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: detailsSection.value,
      start: 'top 80%', // Inicia a animação quando o topo da seção de detalhes entra 80% na viewport
    },
  });

  gsap.to('.car-spec', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: specsSection.value,
      start: 'top 80%',
    },
  });

  gsap.to(specsTitle.value, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: specsTitle.value,
      start: 'top 90%',
    },
  });

});
</script>

<style scoped>
/*
  Tailwind CSS não necessita de blocos de estilo.
  Todas as classes de estilo são aplicadas diretamente no template.
*/
</style>