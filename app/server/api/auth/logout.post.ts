export default defineEventHandler(async (event) => {
  // Remover cookie de autenticação
  deleteCookie(event, "token");

  return {
    success: true,
    message: "Logout realizado com sucesso",
  };
});
