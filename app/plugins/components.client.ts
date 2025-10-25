import { defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin(() => {
  // Este plugin garante que os componentes sejam carregados no lado do cliente
  // Os componentes shadcn-vue são auto-importados pelo Nuxt
});
