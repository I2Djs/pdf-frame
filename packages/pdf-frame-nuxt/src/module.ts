import { defineNuxtModule, addComponent, createResolver } from '@nuxt/kit'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'pdf-frame',
    configKey: 'pdfFrame'
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup () {
    const resolver = createResolver(import.meta.url)
    addComponent({
      name: 'pdfFrame',
      filePath: resolver.resolve('./runtime/components/pdf-frame')
    })
  }
})
