import { useLogout } from "./useLogout";
import { useToast } from "./useToast";

export const useTokenInterceptor = () => {
  const { showError } = useToast();
  const { logoutOnTokenError } = useLogout();

  const handleTokenError = async (error: any) => {
    // Verificar se é erro de token inválido
    if (
      error?.data?.message === "Token inválido" ||
      error?.message === "Token inválido" ||
      error?.statusMessage === "Token inválido" ||
      error?.statusCode === 401
    ) {
      // Mostrar mensagem de erro
      showError("Sessão expirada. Redirecionando para login...");

      // Fazer logout automático
      await logoutOnTokenError(error);
    }
  };

  const interceptResponse = (response: any) => {
    // Se a resposta contém erro, verificar se é de token
    if (response?.error || response?.statusCode >= 400) {
      handleTokenError(response);
    }
    return response;
  };

  const interceptError = (error: any) => {
    handleTokenError(error);
    throw error;
  };

  return {
    handleTokenError,
    interceptResponse,
    interceptError,
  };
};
