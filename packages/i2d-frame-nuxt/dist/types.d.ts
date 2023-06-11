
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['i2dClient']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['i2dClient']?: ModuleOptions }
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['i2dClient']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['i2dClient']?: ModuleOptions }
}


export { ModuleOptions, default } from './module'
