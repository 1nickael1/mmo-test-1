export default defineEventHandler(async (event) => {
    const db = getDatabase();
  throw createError({
    statusCode: 403,
    message:
      "Esta funcionalidade está disponível apenas no dashboard administrativo. Acesse /admin para usar esta funcionalidade.",
  });
});
