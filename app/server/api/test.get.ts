export default defineEventHandler(async (event) => {
  return {
    message: "API funcionando!",
    timestamp: new Date().toISOString(),
  };
});
