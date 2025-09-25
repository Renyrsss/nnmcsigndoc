// src/admin/vite.config.js
import { defineConfig } from 'vite';

export default () =>
  defineConfig({
    server: {
      host: '0.0.0.0',
      port: 1340,
      allowedHosts: [
        'kdu.projects.nnmc.kz',
        'localhost'
      ],
    },
  });

