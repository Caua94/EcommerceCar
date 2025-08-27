<template>
    <div>
        <nav :class="[
            'fixed top-0 w-full z-50 transition-all duration-300 h-20 ',
            isScrolled ? 'bg-transparent text-black'  : ' bg-black text-white shadow-md'
        ]">
            <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 class="text-2xl font-bold ">MinhaLogo</h1>

                <!-- Links Desktop -->
                <ul class="hidden md:flex gap-6  font-medium">
                    <li><a href="#home" class=" hover:text-amber-300 transition">Home</a></li>
                    <li><a href="#sobre" class=" hover:text-amber-300 transition">Sobre</a></li>
                    <li><a href="#servicos" class=" hover:text-amber-300 transition">Serviços</a></li>
                    <li><a href="#contato" class=" hover:text-amber-300 transition">Contato</a></li>
                </ul>

                <!-- Botão Mobile -->
                <button class="md:hidden " @click="menuOpen = !menuOpen">
                    ☰
                </button>
            </div>

            <!-- Menu Mobile -->
            <div v-if="menuOpen"
                class="md:hidden bg-white shadow-md px-6 py-4 flex flex-col space-y-4font-medium">
                <a href="#home" @click="menuOpen = false">Home</a>
                <a href="#sobre" @click="menuOpen = false">Sobre</a>
                <a href="#servicos" @click="menuOpen = false">Serviços</a>
                <a href="#contato" @click="menuOpen = false">Contato</a>
            </div>
        </nav>


    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isScrolled = ref(false);
const menuOpen = ref(false);

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>