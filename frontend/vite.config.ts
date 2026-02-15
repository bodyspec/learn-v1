/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import yaml from '@rollup/plugin-yaml';
import fs from 'node:fs';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import { fileURLToPath } from 'node:url';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const contentAssetsDir = path.resolve(dirname, '../content/assets');

function serveContentAssets(): Plugin {
  return {
    name: 'serve-content-assets',
    configureServer(server) {
      server.middlewares.use('/content/assets', (req, res, next) => {
        const filePath = path.join(contentAssetsDir, decodeURIComponent(req.url || ''));
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath).toLowerCase();
          const mimeTypes: Record<string, string> = {
            '.svg': 'image/svg+xml',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.webp': 'image/webp',
            '.gif': 'image/gif',
          };
          res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
          fs.createReadStream(filePath).pipe(res);
        } else {
          next();
        }
      });
    },
    closeBundle() {
      const outDir = path.resolve(dirname, 'dist/content/assets');
      if (fs.existsSync(contentAssetsDir)) {
        fs.cpSync(contentAssetsDir, outDir, { recursive: true });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), yaml(), serveContentAssets()],
  envDir: '..',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@content': path.resolve(__dirname, '../content')
    }
  },
  assetsInclude: ['**/*.md'],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2022', // needed for top-level await in polyfills.ts
  },
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.VITE_BACKEND_PORT || 8000}`,
        changeOrigin: true
      }
    }
  },
  test: {
    environment: 'jsdom',
    include: ['src/__tests__/**/*.test.{ts,tsx}'],
    setupFiles: ['src/__tests__/setup.ts'],
  }
});