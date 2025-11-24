import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'




// https://vite.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
        compilerOptions: {
          // Trate qualquer tag que comece com model-viewer como elemento customizado
          isCustomElement: (tag) => tag === 'model-viewer'
        }
      }
  }),
    tailwindcss()
  ],
  
})
