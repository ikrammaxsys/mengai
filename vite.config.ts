import { defineConfig } from 'vite';

export default defineConfig({
  root: 'client',
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Permit ngrok free subdomains without pinning to one temporary tunnel URL.
    allowedHosts: ['.ngrok-free.dev'],
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3002',
        changeOrigin: true,
      },
      '/voice-token': {
        target: 'http://127.0.0.1:3002',
        changeOrigin: true,
      },
      '/ws': {
        target: 'ws://127.0.0.1:3002',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  build: { outDir: '../dist', emptyOutDir: true },
});
