import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/AI-Prompts/cozy-paws/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
