
import type { ModuleOptions } from './module'


declare module '@nuxt/schema' {
  interface NuxtConfig { ['pdfFrame']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['pdfFrame']?: ModuleOptions }
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['pdfFrame']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['pdfFrame']?: ModuleOptions }
}


export type { ModuleOptions, default } from './module'
