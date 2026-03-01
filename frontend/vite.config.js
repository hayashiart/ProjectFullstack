// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'   // ← tu dois déjà l'avoir normalement
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),          // ← Ajoute cette ligne
  ],
})