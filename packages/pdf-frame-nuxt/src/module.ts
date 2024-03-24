import { defineNuxtModule, addComponent } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'pdf-frame',
    configKey: 'pdfFrame'
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup () {
    // const resolver = createResolver(import.meta.url)

    addComponent({
      name: 'pdfFrame', // name of the component to be used in vue templates
      filePath: '@i2d/pdf-frame-vue'
    })
  }
})
