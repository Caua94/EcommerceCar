<template>
  <div class="contact-page w-screen h-screen flex relative overflow-hidden playfair-display-sc-regular">
    <div
      class="w-1/2 h-full bg-cover bg-center hidden md:block"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    ></div>

    <div
      class="w-full md:w-1/2 h-full flex items-center justify-center p-8 relative z-10 bg-black/90 backdrop-blur-md"
    >
      <div 
        class="relative w-full max-w-md p-8 space-y-8 transform transition-transform duration-500 ease-in-out"
        ref="contactCard"
      >
        <div class="text-center space-y-2">
          <h2 class="text-5xl font-bold text-white tracking-wide gsap-contact-title">Get in Touch</h2>
          <p class="text-gray-300 text-lg gsap-contact-text">We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.</p>
        </div>

        <form @submit.prevent="handleFormSubmit" class="space-y-6">
          <div class="relative gsap-contact-form">
            <input
              type="text"
              id="name"
              v-model="form.name"
              required
              class="peer w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
              placeholder=" "
            />
            <label
              for="name"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 transform-gpu peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:-top-4 peer-focus:left-4 peer-focus:text-amber-400 peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-full"
            >
              Your Name
            </label>
          </div>

          <div class="relative gsap-contact-form">
            <input
              type="email"
              id="email"
              v-model="form.email"
              required
              class="peer w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
              placeholder=" "
            />
            <label
              for="email"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 transform-gpu peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:-top-4 peer-focus:left-4 peer-focus:text-amber-400 peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-full"
            >
              Email Address
            </label>
          </div>

          <div class="relative gsap-contact-form">
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              required
              class="peer w-full p-4 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
              placeholder=" "
            ></textarea>
            <label
              for="message"
              class="absolute left-4 top-6 text-gray-400 transition-all duration-300 transform-gpu peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:-top-4 peer-focus:left-4 peer-focus:text-amber-400 peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-full"
            >
              Your Message
            </label>
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="group relative overflow-hidden bg-white hover:text-white text-black w-full py-4  font-bold text-xl rounded-xl  transform hover:scale-105 active:scale-95 duration-200 gsap-contact-button disabled:bg-gray-500 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            <span class="absolute bottom-0 left-0 w-full h-0 bg-gray-800 transition-all duration-600 ease-out group-hover:h-full"></span>
            <span class="relative z-10" v-if="!isSubmitting">Send Message</span>
            <span v-else>Sending...</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import { animateContactEntrance } from '../utils/animations/ContactAnimations'; 


const form = ref({
  name: '',
  email: '',
  message: '',
});

const isSubmitting = ref(false);
const backgroundImage = new URL('../assets/imgs/carContact.png', import.meta.url).href;


async function handleFormSubmit() {
  isSubmitting.value = true;
  try {

    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form submitted:', form.value);
    alert('Message sent successfully!');

    form.value.name = '';
    form.value.email = '';
    form.value.message = '';
  } catch (error) {
    console.error('Submission failed:', error);
    alert('Failed to send message. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
}

onMounted(() => {
  animateContactEntrance();
});
</script>

