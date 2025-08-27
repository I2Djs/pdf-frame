import { createResolver, defineNuxtModule, addComponent } from '@nuxt/kit';

const { resolve } = createResolver(import.meta.url);
const module = defineNuxtModule({
  meta: {
    name: "pdf-frame",
    configKey: "PdfFrame",
    compatibility: {
      nuxt: ">=3.0.0"
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
  async setup() {
    addComponent({
      name: "pdfFrame",
      filePath: resolve("./runtime/components/pdf-frame")
    });
  }
});

export { module as default };
