export default defineNuxtPlugin(() => {
  const { interceptError } = useTokenInterceptor();

  // Interceptar $fetch globalmente
  const originalFetch = globalThis.$fetch;

  globalThis.$fetch = async (...args: any[]) => {
    try {
      const response = await originalFetch(...args);
      return response;
    } catch (error: any) {
      // Interceptar erro antes de relançar
      interceptError(error);
      throw error;
    }
  };

  // Interceptar fetch do navegador também
  if (process.client) {
    const originalFetch = window.fetch;

    window.fetch = async (...args: any[]) => {
      try {
        const response = await originalFetch(...args);

        // Verificar se a resposta é de erro 401
        if (response.status === 401) {
          const clonedResponse = response.clone();
          try {
            const errorData = await clonedResponse.json();
            if (errorData.message === "Token inválido") {
              const { handleTokenError } = useTokenInterceptor();
              handleTokenError({ statusCode: 401, message: "Token inválido" });
            }
          } catch {
            // Se não conseguir fazer parse do JSON, ainda assim verificar se é 401
            if (response.status === 401) {
              const { handleTokenError } = useTokenInterceptor();
              handleTokenError({ statusCode: 401, message: "Token inválido" });
            }
          }
        }

        return response;
      } catch (error) {
        throw error;
      }
    };
  }
});
