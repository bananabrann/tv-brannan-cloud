import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [sveltekit()],

  esbuild: {
    keepNames: true
  },

  optimizeDeps: {
    esbuildOptions: {
      keepNames: true
    }
  },

  build: {
    minify: "esbuild"
  },

  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"]
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/variables.scss" as *;'
      }
    }
  }
});
