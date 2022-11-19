/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "jsdom",
  },
});
