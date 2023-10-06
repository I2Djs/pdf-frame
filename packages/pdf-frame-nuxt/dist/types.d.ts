
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['pdfFrame']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['pdfFrame']?: ModuleOptions }
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['pdfFrame']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['pdfFrame']?: ModuleOptions }
}


export { ModuleOptions, default } from './module'
