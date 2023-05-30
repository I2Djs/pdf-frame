
export default defineNuxtConfig({
  modules: ['../src/module'],
  ssr: false,
  myModule: {},
  vue: {
        compilerOptions: {
          // treat any tag that starts with ion- as custom elements
          isCustomElement: tag => tag.startsWith('i-')
        }
    }
})
