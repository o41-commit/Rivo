import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),          // You need this for React
    tailwindcss(),
  ],
  base: './',         // ✅ critical for Vercel
  server: {
    port: 3000
  }
  
})