import { $fetch } from 'ofetch'
import { baseURL } from '#build/paths.mjs'
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  })
}