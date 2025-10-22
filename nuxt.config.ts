// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineNuxtConfig({
  srcDir: "app",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@vueuse/nuxt"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss(), tsconfigPaths()],
  },
  components: [
    { path: "components", pathPrefix: false },
    { path: "components/ui", pathPrefix: false },
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
});
