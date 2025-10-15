import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/gumzo/',
  build: {
    target: 'esnext',
    modulePreload: {
      polyfill: true
    }
  }
})
