// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "app",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@vueuse/nuxt", "@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
    {
      path: "~/components/ui",
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    // Private keys (only available on server-side)
    jwtSecret: process.env.JWT_SECRET || "your-secret-key",
    databaseUrl: process.env.DATABASE_URL,
    // Public keys (exposed to client-side)
    public: {
      apiBase: "/api",
      nodeEnv: process.env.NODE_ENV || "development",
    },
  },
  build: {
    transpile: ["vue-sonner"],
  },
  typescript: {
    strict: false,
    typeCheck: false,
  },
  nitro: {
    experimental: {
      wasm: true,
    },
    // Configurações específicas para Vercel
    preset: "vercel",
  },
});
