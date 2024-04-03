
import type { ModuleOptions } from './module'


declare module '@nuxt/schema' {
  interface NuxtConfig { ['PdfFrameNuxt']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['PdfFrameNuxt']?: ModuleOptions }
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['PdfFrameNuxt']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['PdfFrameNuxt']?: ModuleOptions }
}


export type { ModuleOptions, default } from './module'
