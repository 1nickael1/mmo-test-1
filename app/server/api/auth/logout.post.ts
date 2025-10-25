export default defineEventHandler(async (event) => {
  // Remover cookie de autenticação
  deleteCookie(event, "@mmo/ninja/token");

  return {
    success: true,
    message: "Logout realizado com sucesso",
  };
});
