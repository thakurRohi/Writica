import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
     proxy:{
      '/api':'http://localhost:5000',
      '/vercel-api': {
        target: 'https://blogger-lbcd.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/vercel-api/, ''),
      },
     },
  },
  plugins: [react(), tailwindcss()],
})
