export default defineEventHandler(async (event) => {
    const db = getDatabase();
  return {
    message: "API funcionando!",
    timestamp: new Date().toISOString(),
  };
});
