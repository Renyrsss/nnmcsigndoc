import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: [
      'kdu.projects.nnmc.kz',
      'localhost'
    ],
    host: '0.0.0.0', // чтобы принимал внешние соединения
    port: 1340       // или твой dev порт
  }
});
