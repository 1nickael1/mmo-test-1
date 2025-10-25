import { useAppVersion } from "./useAppVersion";

export const useVersionInterceptor = () => {
  const { requiresLogout, forceLogout } = useAppVersion();

  // Interceptar respostas da API para verificar erros de versão
  const interceptApiResponse = (response: any) => {
    if (
      response?.statusCode === 401 &&
      (response?.message?.includes("versão incompatível") ||
        response?.message?.includes("versão muito antiga"))
    ) {
      (requiresLogout as any).value = true;

      // Forçar logout após um pequeno delay
      setTimeout(() => {
        forceLogout();
      }, 1000);

      return false; // Indica que a requisição deve ser interrompida
    }

    return true; // Continua normalmente
  };

  // Wrapper para $fetch que inclui verificação de versão
  const safeFetch = async (url: string, options: any = {}) => {
    try {
      const response = await $fetch(url, options);
      return response;
    } catch (error: any) {
      // Verificar se é um erro de versão
      if (!interceptApiResponse(error)) {
        throw new Error("Versão incompatível - redirecionando para login");
      }
      throw error;
    }
  };

  // Verificar versão antes de fazer requisições críticas
  const checkVersionBeforeRequest = async () => {
    if (requiresLogout.value) {
      forceLogout();
      return false;
    }
    return true;
  };

  return {
    interceptApiResponse,
    safeFetch,
    checkVersionBeforeRequest,
  };
};
