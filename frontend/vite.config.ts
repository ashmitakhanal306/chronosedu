import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // Client apps never talk to the DB directly - everything goes via the backend API.
    proxy: { '/api': 'http://localhost:8000' },
  },
});
