import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  build:{
    lib: {
      entry: resolve(__dirname, './src/components/index.js'),
      formats: ["es", "cjs"],
      fileName: (format) => `pdf-frame.${format}.js`
    },
    rollupOptions: {
      external: ['vue','i2djs', '@vue/runtime-core'],
      output: {
        peresveModeules: true,
        exports: 'named'
      }
    }
  }
})
