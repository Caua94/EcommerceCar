<template>
  <footer class="bg-black text-white pt-16 pb-8 border-t border-white/10 playfair-display-sc-regular">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      
      <div class="space-y-4">
        <h3 class="text-3xl font-bold font-dancing text-amber-500">DreamCar</h3>
        <p class="text-sm text-white/60 leading-relaxed">
          Redefining the standard of luxury. We provide not just cars, but a lifestyle of elegance and performance.
        </p>
      </div>

      <div>
        <h4 class="text-lg font-bold mb-6 text-white border-b border-amber-500/30 pb-2 inline-block">Explore</h4>
        <ul class="space-y-3 text-sm text-white/70">
          <li>
            <router-link to="/" class="hover:text-amber-400 transition-colors duration-300 flex items-center gap-2">
              <span>&rsaquo;</span> Home
            </router-link>
          </li>
          <li>
            <router-link to="/cars" class="hover:text-amber-400 transition-colors duration-300 flex items-center gap-2">
              <span>&rsaquo;</span> Cars
            </router-link>
          </li>
          <li>
            <router-link to="/about" class="hover:text-amber-400 transition-colors duration-300 flex items-center gap-2">
              <span>&rsaquo;</span> About Us
            </router-link>
          </li>
          <li>
            <router-link to="/contact" class="hover:text-amber-400 transition-colors duration-300 flex items-center gap-2">
              <span>&rsaquo;</span> Contact
            </router-link>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="text-lg font-bold mb-6 text-white border-b border-amber-500/30 pb-2 inline-block">Contact</h4>
        <ul class="space-y-4 text-sm text-white/70">
          <li class="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-amber-500 shrink-0">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span>Av. Higino Muzzy Filho, 1001<br>Marília - SP, Brazil</span>
          </li>
          <li class="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-amber-500 shrink-0">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            <span>contact@dreamcar.com</span>
          </li>
          <li class="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-amber-500 shrink-0">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <span>+55 (14) 99999-9999</span>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="text-lg font-bold mb-6 text-white border-b border-amber-500/30 pb-2 inline-block">Follow Us</h4>
        <p class="text-sm text-white/60 mb-4">Stay connected for the latest arrivals.</p>
        <div class="flex gap-4">
          <a href="#" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-300 group">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:scale-110 transition-transform"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-300 group">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:scale-110 transition-transform"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-300 group">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:scale-110 transition-transform"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
      <p>&copy; {{ new Date().getFullYear() }} DreamCar. All rights reserved.</p>
      <div class="flex gap-4 mt-2 md:mt-0">
        <a href="#" class="hover:text-amber-500 transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-amber-500 transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
</template>