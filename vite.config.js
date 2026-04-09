import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/sel-community-anti/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        outcomes: resolve(__dirname, 'outcomes.html')
      }
    }
  }
})
