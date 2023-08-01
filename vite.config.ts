import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [sveltekit()],

  build: {
    minify: false,
    // terserOptions: {
    //   mangle: true,
    //   sourceMap: true,
    //   keep_classnames: /AbortSignal/,
    //   keep_fnames: /AbortSignal/
    // }
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
