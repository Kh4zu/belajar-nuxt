// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  imports: {
    dirs: ['stores']
  },

  runtimeConfig: {
    // Database configuration
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || 5432,
    dbName: process.env.DB_NAME || 'belajar_nuxt',
    dbUser: process.env.DB_USER || 'postgres',
    dbPassword: process.env.DB_PASSWORD || 'password',
    
    // Public config
    public: {
      appName: 'Greenomi'
    }
  }
})