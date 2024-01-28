import { defineConfig } from "vite";
import {dirname, resolve} from "path" ;

export default defineConfig({
  root: "./src",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        form: resolve(__dirname, "src/form/form.html"),
      },
    },
    emptyOutDir: true,
  },
});
