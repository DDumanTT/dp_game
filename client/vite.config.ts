import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3001,
    watch: {
      usePolling: true,
    }
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared')
    }
  }
});
