import { defineNuxtModule, createResolver, addComponent } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "i2d-client",
    configKey: "i2dClient"
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup() {
    const resolver = createResolver(import.meta.url);
    addComponent({
      name: "i2dClient",
      filePath: resolver.resolve("./runtime/components/i2d-client")
    });
  }
});

export { module as default };
