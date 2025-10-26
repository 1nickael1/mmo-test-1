export const useLogout = () => {
  const logout = async (showMessage = true) => {
    try {
      // Tentar fazer logout no servidor
      await $fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      // Ignorar erros do servidor, continuar com limpeza local
      console.warn("Erro ao fazer logout no servidor:", error);
    }

    // Limpar dados locais
    const token = useCookie("@mmo/ninja/token");
    const selectedCharacterId = useCookie("@mmo/ninja/selectedCharacterId");
    const appVersion = useCookie("@mmo/ninja/app_version");

    token.value = null;
    selectedCharacterId.value = null;
    appVersion.value = null;

    // Limpar localStorage
    if (process.client) {
      localStorage.removeItem("@mmo/ninja/token");
      localStorage.removeItem("@mmo/ninja/selectedCharacterId");
      localStorage.removeItem("@mmo/ninja/app_version");
      localStorage.removeItem("@mmo/ninja/currentCharacter");
    }

    // Mostrar mensagem se solicitado
    if (showMessage) {
      const { showSuccess } = useToast();
      showSuccess("Logout realizado com sucesso!");
    }

    // Redirecionar para login
    await navigateTo("/login");
  };

  const logoutOnTokenError = async (error: any) => {
    // Verificar se é erro de token inválido
    if (
      error?.data?.message === "Token inválido" ||
      error?.message === "Token inválido" ||
      error?.statusMessage === "Token inválido" ||
      error?.statusCode === 401
    ) {
      await logout(false); // Não mostrar mensagem de sucesso
    }
  };

  return {
    logout,
    logoutOnTokenError,
  };
};
