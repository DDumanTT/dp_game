/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3001,
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../shared"),
    },
  },
  test: {
    // exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
    // environment: "jsdom",
  },
});
