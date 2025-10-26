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
    // Public keys (exposed to client-side)
    public: {
      apiBase: "/api",
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
  },
});
