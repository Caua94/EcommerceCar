<template>
  <main class="relative w-full overflow-x-hidden bg-black text-white playfair-display-sc-regular">
    
    <section ref="heroRef" class="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img src="../assets/imgs/womansInCar.jpg" alt="Woman in Luxury Car" class="w-full h-full object-cover opacity-80">
        <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black"></div>
      </div>

      <div class="relative z-10 text-center space-y-4 p-4">
        <h1 class="text-6xl md:text-9xl font-bold drop-shadow-2xl animate-text-reveal font-dancing text-amber-500">
          The Project
        </h1>
        <p class="text-xl md:text-3xl text-gray-300 tracking-wider playfair-display-sc-regular-italic">
          Where Developers Meet Elegance
        </p>
        <div class="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
      </div>
    </section>

    <section class="storytelling-block relative min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-20 bg-stone-900 z-10 overflow-hidden border-t border-white/10">
      
      <div class="w-full md:w-1/2 z-20 space-y-8 text-left">
        <div class="space-y-2">
          <span class="text-amber-500 text-sm tracking-[0.2em] uppercase playfair-display-sc-black">The Origin</span>
          <h2 class="text-5xl md:text-7xl text-white leading-tight font-dancing">
            Academic Excellence <br /> & Industry Innovation
          </h2>
        </div>
        
        <p class="text-lg md:text-xl text-gray-300 leading-relaxed border-l-4 border-amber-500 pl-6 playfair-display-sc-regular">
          This project was born from a challenge proposed by <strong class="text-white playfair-display-sc-bold">Unimar</strong> in partnership with technology sector leaders. The goal transcends the classroom: to create a Full-Stack E-commerce solution that combines robust performance with high-end design.
        </p>
        
        <p class="text-gray-400 text-base playfair-display-sc-regular">
          We focused on solving real market pain points by implementing a scalable and secure architecture, demonstrating complete mastery of the software development life cycle.
        </p>
      </div>

      <div class="w-full md:w-1/2 relative h-[50vh] flex items-center justify-center mt-10 md:mt-0 z-20">
        <div class="relative w-full h-full flex items-center justify-center">
            <div class="absolute w-64 h-64 bg-amber-500/20 rounded-full blur-[100px]"></div>
            
            <img :src="unimar" alt="UNIMAR" 
              class="story-image w-40 md:w-64 object-contain transition-all duration-700 absolute right-10 md:right-[20%]" />
            
            <img :src="fc" alt="Computer Science" 
              class="story-image w-32 md:w-56 object-contain transition-all duration-700 absolute left-10 md:left-[20%] top-[60%]" />
        </div>
      </div>
    </section>

    <section class="storytelling-block relative min-h-screen flex flex-col items-center justify-center px-6 bg-black z-10 overflow-hidden border-t border-white/10">
      
      <div class="max-w-4xl text-center relative z-10 space-y-6 mb-16">
        <span class="text-amber-500 text-sm tracking-[0.2em] uppercase playfair-display-sc-black">Our Mission</span>
        <h2 class="text-5xl md:text-7xl text-white font-dancing">Technical Mastery</h2>
        <p class="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto playfair-display-sc-regular">
          To orchestrate a symphony between Front-end and Back-end, utilizing the most modern technologies in the market to deliver a fluid and intuitive user experience (UX).
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl px-4">
        <div class="tech-card bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl text-center hover:bg-white/10 transition-colors duration-300 group">
          <h3 class="text-2xl text-amber-400 mb-2 playfair-display-sc-bold">Vue.js 3</h3>
          <p class="text-sm text-gray-400 playfair-display-sc-regular-italic">Reactivity & Composition API</p>
        </div>
        <div class="tech-card bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl text-center hover:bg-white/10 transition-colors duration-300 group">
          <h3 class="text-2xl text-amber-400 mb-2 playfair-display-sc-bold">Tailwind CSS</h3>
          <p class="text-sm text-gray-400 playfair-display-sc-regular-italic">Rapid & Modern UI Design</p>
        </div>
        <div class="tech-card bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl text-center hover:bg-white/10 transition-colors duration-300 group">
          <h3 class="text-2xl text-amber-400 mb-2 playfair-display-sc-bold">C# .NET</h3>
          <p class="text-sm text-gray-400 playfair-display-sc-regular-italic">Robust & Secure API</p>
        </div>
        <div class="tech-card bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl text-center hover:bg-white/10 transition-colors duration-300 group">
          <h3 class="text-2xl text-amber-400 mb-2 playfair-display-sc-bold">SQL Server</h3>
          <p class="text-sm text-gray-400 playfair-display-sc-regular-italic">Data Integrity & Speed</p>
        </div>
      </div>
    </section>

    <section class="storytelling-block relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-stone-900 z-10 overflow-hidden border-t border-white/10">
      
      <div class="text-center mb-16 space-y-4">
        <h2 class="text-5xl md:text-8xl text-white font-dancing">DreamCar</h2>
        <p class="text-gray-400 tracking-widest text-sm playfair-display-sc-black">DEVELOPER INSIDE YOUR DREAMS</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 w-full max-w-7xl">
        
        <div class="story-image group relative flex flex-col items-center">
          <div class="w-48 h-48 md:w-64 md:h-64 rounded-full p-1 border-2 border-amber-500/50 group-hover:border-amber-400 transition-colors duration-500 overflow-hidden">
             <img :src="cauaImg" alt="Cauã Reginato" class="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" />
          </div>
          <div class="mt-6 text-center space-y-2">
            <h3 class="text-2xl text-white playfair-display-sc-bold">Cauã Reginato</h3>
            <p class="text-amber-400 text-sm tracking-wide playfair-display-sc-bold-italic">FRONT-END & UI/UX</p>
            <p class="text-gray-500 text-xs max-w-xs mx-auto playfair-display-sc-regular">Responsible for visual architecture, interactivity, and user experience using Vue and GSAP.</p>
            
            <div class="flex gap-4 justify-center mt-4">
              <a href="https://www.instagram.com/caua94_rd/following/" target="_blank" class="text-gray-400 hover:text-amber-400 transition-all hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.linkedin.com/in/cauazin94/" target="_blank" class="text-gray-400 hover:text-amber-400 transition-all hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://github.com/Caua94" target="_blank" class="text-gray-400 hover:text-amber-400 transition-all hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            </div>
          </div>
        </div>

        <div class="story-image group relative flex flex-col items-center">
          <div class="w-48 h-48 md:w-64 md:h-64 rounded-full p-1 border-2 border-amber-500/50 group-hover:border-amber-400 transition-colors duration-500 overflow-hidden">
            <img :src="jhowImg" alt="Jhonata Canevare" class="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" />
          </div>
          <div class="mt-6 text-center space-y-2">
            <h3 class="text-2xl text-white playfair-display-sc-bold">Jhonata Canevare</h3>
            <p class="text-amber-400 text-sm tracking-wide playfair-display-sc-bold-italic">BACK-END ARCHITECT</p>
            <p class="text-gray-500 text-xs max-w-xs mx-auto playfair-display-sc-regular">Junior in C#, RESTful API construction, and complex business logic.</p>

            <div class="flex gap-4 justify-center mt-4">
              <a href="https://www.instagram.com/0jhonataa/" target="_blank" class="text-gray-400 hover:text-amber-400 transition-all hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.linkedin.com/in/jhonata-gabriel-canevare-4aa40b263/" target="_blank" class="text-gray-400 hover:text-amber-400 transition-all hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://github.com/ojhonata" target="_blank" class="text-gray-400 hover:text-amber-400 transition-all hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            </div>
          </div>
        </div>

        <div class="story-image group relative flex flex-col items-center">
          <div class="w-48 h-48 md:w-64 md:h-64 rounded-full p-1 border-2 border-amber-500/50 group-hover:border-amber-400 transition-colors duration-500 overflow-hidden">
            <img :src="giovaniImg" alt="Giovani Ferreira" class="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" />
          </div>
          <div class="mt-6 text-center space-y-2">
            <h3 class="text-2xl text-white playfair-display-sc-bold">Giovani Ferreira</h3>
            <p class="text-amber-400 text-sm tracking-wide playfair-display-sc-bold-italic">BACK-END ARCHITECT ASSIST.</p>
            <p class="text-gray-500 text-xs max-w-xs mx-auto playfair-display-sc-regular">Coding in c# and assistence.</p>

            <div class="flex gap-4 justify-center mt-4">
              <a href="https://www.instagram.com/ferreiragiovanni01/" target="_blank" class="text-gray-400 hover:text-amber-400 transition-all hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.linkedin.com/in/giovanni-ferreira01/?trk=contact-info" target="_blank" class="text-gray-400 hover:text-amber-400 transition-all hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" target="_blank" class="text-gray-400 hover:text-amber-400 transition-all hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { setupAboutPageAnimations } from "../utils/animations/AboutAnimations.js"; 


import unimar from "../assets/imgs/unimar.png";
import fc from "../assets/imgs/fc.png";
import jhowImg from "../assets/imgs/jhow.png";
import cauaImg from "../assets/imgs/caua.png"
import giovaniImg from "../assets/imgs/giovanni.png"

const heroRef = ref(null);

onMounted(() => {
  setupAboutPageAnimations(heroRef.value);
});
</script>

<style scoped>
.text-amber-400, .text-amber-500 {
  text-shadow: 0px 0px 15px rgba(251, 191, 36, 0.4);
}
</style>