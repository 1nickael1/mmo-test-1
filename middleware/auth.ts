import { defineNuxtRouteMiddleware, navigateTo, useCookie } from "nuxt/app";

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token");

  // Rotas que não precisam de autenticação
  const publicRoutes = ["/login", "/cadastro", "/"];

  if (publicRoutes.includes(to.path)) {
    return;
  }

  // Se não há token, redireciona para login
  if (!token.value) {
    return navigateTo("/login");
  }
});
