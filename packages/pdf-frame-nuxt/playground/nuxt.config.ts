export default defineNuxtConfig({
  modules: ['../src/module'],
  ssr: false,
  myModule: {},
  vue: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('i-')
        }
    }
})
