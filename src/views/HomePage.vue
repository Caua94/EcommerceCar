<template>
  <main class="w-screen h-1/2 relative flex items-center justify-center overflow-hidden">
    <!-- Texto sobre o vídeo -->
    <div class="absolute z-50 text-white text-center">
      <h1 class="text-7xl font-bold mb-4">O luxo que realiza seu sonho.</h1>
      <p class="text-gray-200 text-3xl mb-4">Compre seu carro de luxo</p>
      <button class="px-24 py-6 bg-white text-black rounded-xl hover:bg-amber-300 transition">
        Shop Now
      </button>
    </div>

    <!-- Vídeo de fundo -->
    <video
      :key="currentVideo"
      :src="videos[currentVideo]"
      class=" top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-100 z-10"
      autoplay
      muted
      @ended="nextVideo"
    ></video>

    <!-- Bolinhas de navegação -->
    <div class="absolute bottom-4 flex space-x-3 z-50">
      <button
        v-for="(video, index) in videos"
        :key="'btn-' + index"
        @click="currentVideo = index"
        class="w-4 h-4 rounded-full border-2 transition-colors duration-300"
        :class="{
          'bg-white border-white': currentVideo === index,
          'bg-transparent border-white': currentVideo !== index
        }"
      ></button>
    </div>
  </main>

  <!-- Seção abaixo -->
  <section class="w-screen h-[600px] flex items-center justify-center">
    <p class="text-2xl mb-4">Featureds Sells</p>
    <div class>


    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      videos: [
        new URL('../assets/videos/carVideo1.mp4', import.meta.url).href,
        new URL('../assets/videos/carVideo2.mp4', import.meta.url).href,
        new URL('../assets/videos/carVideo3.mp4', import.meta.url).href
      ],
      currentVideo: 0
    };
  },
  methods: {
    nextVideo() {
      this.currentVideo = (this.currentVideo + 1) % this.videos.length;
    }
  }
};
</script>