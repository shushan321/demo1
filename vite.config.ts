import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/demo1/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
