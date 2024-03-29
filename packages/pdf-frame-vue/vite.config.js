import { defineConfig } from 'vite'
// import { nodePolyfills } from 'vite-plugin-node-polyfills'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('i-')
        }
      }
    })],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  build:{
    lib: {
      entry: resolve(__dirname, './src/components/index.js'),
      formats: ["es", "cjs"],
      name: 'pdf-frame',
      fileName: 'pdf-frame'
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
