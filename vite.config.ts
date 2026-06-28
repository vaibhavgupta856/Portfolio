import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ command }) => ({
  // Vercel serves from domain root; GitHub Pages uses /Portfolio/
  base: process.env.VERCEL ? '/' : command === 'build' ? '/Portfolio/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['@rive-app/canvas', '@rive-app/react-canvas'],
  },
}))
