<template>
  <div class="flex flex-col min-h-screen bg-black ">
    <Cursor />

    <Navbar />

    <main class="flex-grow ">
      <router-view :key="$route.fullPath" />
    </main>

    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import Cursor from "./utils/cursor/Cursor.vue";

export default {
  components: {
    Navbar,
    Footer,
    Cursor
  }
};

</script>