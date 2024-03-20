import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src", // Ruta relativa al directorio raíz del proyecto
    },
  },
  build: {
    lib: {
      entry: "src/elements/aw-payment-widget/aw-payment-widget.ts",
      formats: ["es"],
      fileName: (format) => `aw-payment-widget.${format}.js`,
    },
    rollupOptions: {
      external: ["/^lit/", "react"],
    },
  },
});
