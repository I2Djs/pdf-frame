import { defineNuxtModule, createResolver, addComponent } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "pdf-frame",
    configKey: "pdfFrame"
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup() {
    const resolver = createResolver(import.meta.url);
    addComponent({
      name: "pdfFrame",
      filePath: resolver.resolve("./runtime/components/pdf-frame")
    });
  }
});

export { module as default };
