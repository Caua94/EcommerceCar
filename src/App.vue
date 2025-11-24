<template>
  <div class="flex flex-col min-h-screen bg-black">
    
    <LoadingScreen /> 
    
    <Cursor />

    <Navbar />

    <main class="flex-grow">
      <router-view :key="$route.fullPath" />
    </main>

    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import Cursor from "./utils/cursor/Cursor.vue";
import LoadingScreen from "./components/LoadingScreen.vue";

export default {
  components: {
    Navbar,
    Footer,
    Cursor,
    LoadingScreen
  }
};
</script>