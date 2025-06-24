import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
     proxy:{
      '/api':'http://localhost:3000'
     },
  },
  plugins: [react(), tailwindcss()],
})
