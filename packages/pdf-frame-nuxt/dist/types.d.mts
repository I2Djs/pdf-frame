
import type { ModuleOptions } from './module.js'


declare module '@nuxt/schema' {
  interface NuxtConfig { ['PdfFrame']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['PdfFrame']?: ModuleOptions }
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['PdfFrame']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['PdfFrame']?: ModuleOptions }
}


export type { ModuleOptions, default } from './module.js'
