import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [sveltekit()],

  build: {
    minify: "terser",
    terserOptions: {
      mangle: false,
      sourceMap: true,
      compress: false,
      keep_classnames: /AbortSignal/,
      keep_fnames: /AbortSignal/,
      output: {
        comments: false
      }
    }
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
