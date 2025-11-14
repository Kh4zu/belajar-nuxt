// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'
import tsconfigPaths from 'vite-tsconfig-paths'

// Konfigurasi Nuxt 3 aman tanpa assets
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss', // TailwindCSS otomatis aktif
    '@pinia/nuxt'           // Pinia store
  ],

  // Vite config supaya alias @/ bisa dipakai tanpa error
  vite: {
    plugins: [tsconfigPaths()]
  },

  // Tidak perlu menambahkan 'css' kalau tidak ada folder assets
  // css: [],
})
