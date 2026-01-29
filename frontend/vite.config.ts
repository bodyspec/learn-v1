import react from '@vitejs/plugin-react'
import yaml from '@rollup/plugin-yaml'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    yaml(),
  ],
  envDir: '..',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@content': path.resolve(__dirname, '../content'),
    },
  },
  assetsInclude: ['**/*.md'],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.VITE_BACKEND_PORT || 8000}`,
        changeOrigin: true,
      },
    },
  },
})
