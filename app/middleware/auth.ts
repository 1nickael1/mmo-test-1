import { defineNuxtRouteMiddleware, navigateTo, useCookie } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie("@mmo/ninja/token");

  // Rotas que não precisam de autenticação
  const publicRoutes = ["/login", "/cadastro", "/", "/admin"];

  if (publicRoutes.includes(to.path)) {
    return;
  }

  // Se não há token, redireciona para login
  if (!token.value) {
    return navigateTo("/login");
  }

  // Para simplificar, apenas verificar se há token
  // A validação completa será feita nas APIs
  return;
});
