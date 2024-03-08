import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/elements/aw-payment-widget/aw-payment-widget.ts',
      formats: ['es'],
      fileName: (format) => `aw-payment-widget.${format}.js`,
    },
    rollupOptions: {
     
    },
  },
})
