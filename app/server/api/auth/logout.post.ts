export default defineEventHandler(async (event) => {
    const db = getDatabase();
  // Remover cookie de autenticação
  deleteCookie(event, "@mmo/ninja/token");

  return {
    success: true,
    message: "Logout realizado com sucesso",
  };
});
