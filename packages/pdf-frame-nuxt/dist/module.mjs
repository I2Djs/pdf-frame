import { defineNuxtModule, addComponent } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "pdf-frame",
    configKey: "pdfFrame"
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options, nuxt) {
    addComponent({
      name: "pdfFrame",
      // name of the component to be used in vue templates
      filePath: "@i2d/pdf-frame-vue"
    });
  }
});

export { module as default };
