import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build:{
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      formats: ["es", "cjs"],
      fileName: (format) => `i2d-client.${format}.js`
    },
    rollupOptions: {
      external: ['vue','i2djs'],
      output: {
        peresveModeules: true,
        exports: 'named'
      }
    }
  }
})
