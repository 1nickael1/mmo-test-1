import { defineNuxtRouteMiddleware, navigateTo, useCookie } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie("token");

  const publicRoutes = ["/login", "/cadastro", "/"]; // rotas abertas
  const characterRoutes = ["/selecionar-personagem", "/criar-personagem"]; // rotas de personagem

  // Se estiver em rota pública
  if (publicRoutes.includes(to.path)) {
    // Se usuário tem token, redireciona para seleção de personagem
    if (token.value) {
      return navigateTo("/selecionar-personagem");
    }
    // Permitir acesso público se não tem token
    return;
  }

  // Se estiver em rota de personagem, permitir acesso se autenticado
  if (characterRoutes.includes(to.path)) {
    if (!token.value) {
      return navigateTo("/login");
    }
    return;
  }

  // Demais rotas exigem autenticação
  if (!token.value) {
    return navigateTo("/login");
  }
});
