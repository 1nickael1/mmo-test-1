export default defineNuxtPlugin(async () => {
  const { initializeVersionCheck, requiresLogout } = useAppVersion();

  // Inicializar verificação de versão quando a aplicação carregar
  // Apenas se não estiver em uma página de login/cadastro
  if (process.client) {
    const currentPath = window.location.pathname;
    const isAuthPage = ["/login", "/cadastro"].includes(currentPath);

    if (!isAuthPage) {
      await initializeVersionCheck();
    }
  }

  // Verificar periodicamente se a versão ainda é compatível
  // Apenas se não estiver em logout forçado
  if (process.client) {
    setInterval(async () => {
      if (!requiresLogout.value) {
        const currentPath = window.location.pathname;
        const isAuthPage = ["/login", "/cadastro"].includes(currentPath);

        // Não verificar em páginas de autenticação
        if (!isAuthPage) {
          await initializeVersionCheck();
        }
      }
    }, 60000); // Verificar a cada 60 segundos (menos agressivo)
  }
});
