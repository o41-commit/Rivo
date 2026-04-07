import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),          // needed for React JSX
    tailwindcss(),
  ],
  base: './',         // critical: makes assets load correctly on Vercel
})