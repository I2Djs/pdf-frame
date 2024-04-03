import { defineNuxtModule, isNuxt3, createResolver, addComponent } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "pdf-frame",
    configKey: "PdfFrame",
    compatibility: {
      nuxt: "^3.0.0"
    }
  },
  hooks: {
    "vite:extendConfig": (config, { isClient }) => {
      if (isClient) {
        if (config?.vue?.template?.compilerOptions === void 0) {
          config.vue ??= {};
          config.vue.template ??= {};
          config.vue.template.compilerOptions ??= {};
        }
        config.vue.template.compilerOptions.isCustomElement = (tag) => tag.startsWith("i-");
      }
    }
  },
  defaults: {},
  async setup(options, nuxt) {
    if (!isNuxt3(nuxt)) {
      console.error("nuxt-pdf-frame compatible with Nuxt 3");
      return;
    }
    const resolver = createResolver(import.meta.url);
    addComponent({
      name: "pdfFrame",
      filePath: resolver.resolve("./runtime/components/pdf-frame")
    });
  }
});

export { module as default };
