import { computed, readonly, ref } from "vue";

interface AppVersion {
  version: string;
  minSupportedVersion: string;
  lastUpdate: string;
  forceLogoutVersions: string[];
  changelog: Array<{
    version: string;
    date: string;
    changes: string[];
    breaking_changes?: string[];
  }>;
  requiresUpdate: boolean;
  requiresLogout: boolean;
}

const STORAGE_KEY = "@mmo/ninja/app_version";
const STORAGE_VERSION_KEY = "@mmo/ninja/app_storage_version";
const TOKEN_KEY = "@mmo/ninja/token";

export const useAppVersion = () => {
  const currentVersion = ref<string>("");
  const serverVersion = ref<string>("");
  const minSupportedVersion = ref<string>("");
  const forceLogoutVersions = ref<string[]>([]);
  const isLoading = ref(false);
  const needsUpdate = ref(false);
  const requiresLogout = ref(false);

  // Versão do localStorage (para detectar mudanças estruturais)
  const storageVersion = ref<string>("1.2.0");

  // Verificar se a versão do localStorage mudou
  const checkStorageVersion = () => {
    if (process.client) {
      const storedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
      if (!storedVersion || storedVersion !== storageVersion.value) {
        // Limpar localStorage se a versão mudou
        clearLocalStorage();
        localStorage.setItem(STORAGE_VERSION_KEY, storageVersion.value);
      }
    }
  };

  // Limpar localStorage completamente (versão segura)
  const clearLocalStorage = (preserveToken = false) => {
    if (process.client) {
      let tokenToPreserve = null;

      if (preserveToken) {
        // Salvar apenas o token se necessário
        tokenToPreserve = localStorage.getItem(TOKEN_KEY);
      }

      // Limpar tudo
      localStorage.clear();

      // Restaurar token se necessário
      if (preserveToken && tokenToPreserve) {
        localStorage.setItem(TOKEN_KEY, tokenToPreserve);
      }
    }
  };

  // Forçar logout e limpeza completa
  const forceLogout = () => {
    if (process.client) {
      // Limpar tudo, incluindo token
      clearLocalStorage(false);

      // Definir a nova storage version para evitar loop
      localStorage.setItem(STORAGE_VERSION_KEY, storageVersion.value);

      // Limpar selectedCharacterId para evitar redirecionamento automático
      localStorage.removeItem("@mmo/ninja/selectedCharacterId");

      // Redirecionar para login
      window.location.href = "/login";
    }
  };

  // Buscar versão do servidor
  const fetchServerVersion = async () => {
    isLoading.value = true;
    try {
      const response = await $fetch<{
        success: boolean;
        data: AppVersion;
      }>("/api/version");

      if (response.success) {
        serverVersion.value = response.data.version;
        return response.data;
      }
    } catch (error) {
    } finally {
      isLoading.value = false;
    }
    return null;
  };

  // Comparar versões (semantic versioning)
  const compareVersions = (version1: string, version2: string): number => {
    const v1parts = version1.split(".").map(Number);
    const v2parts = version2.split(".").map(Number);

    for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
      const v1part = v1parts[i] || 0;
      const v2part = v2parts[i] || 0;

      if (v1part > v2part) return 1;
      if (v1part < v2part) return -1;
    }

    return 0;
  };

  // Verificar se precisa atualizar
  const checkForUpdates = async () => {
    if (!process.client) return;

    try {
      // PRIMEIRO: Verificar se a storage version mudou (pode requerer logout)
      const storedStorageVersion = localStorage.getItem(STORAGE_VERSION_KEY);
      if (
        !storedStorageVersion ||
        storedStorageVersion !== storageVersion.value
      ) {
        // Storage version mudou - forçar logout para garantir compatibilidade
        requiresLogout.value = true;

        // Atualizar storage version ANTES do logout para evitar loop
        localStorage.setItem(STORAGE_VERSION_KEY, storageVersion.value);

        const { showError } = useToast();
        showError(
          "A estrutura da aplicação foi atualizada. Você será redirecionado para fazer login novamente."
        );

        setTimeout(() => {
          forceLogout();
        }, 3000);

        return;
      }

      const serverData = await fetchServerVersion();
      if (!serverData) return;

      // Atualizar dados do servidor
      serverVersion.value = serverData.version;
      minSupportedVersion.value = serverData.minSupportedVersion;
      forceLogoutVersions.value = serverData.forceLogoutVersions;

      const storedVersion = localStorage.getItem(STORAGE_KEY);
      currentVersion.value = storedVersion || "0.0.0";

      // Verificar se precisa de logout forçado (apenas para versões específicas)
      const needsForcedLogout = forceLogoutVersions.value.includes(
        currentVersion.value
      );

      if (needsForcedLogout) {
        requiresLogout.value = true;

        // Forçar logout imediatamente
        const { showError } = useToast();
        showError(
          "Sua versão da aplicação não é mais suportada. Você será redirecionado para fazer login novamente."
        );

        setTimeout(() => {
          forceLogout();
        }, 3000);

        return;
      }

      // Verificar se a versão atual é suportada
      const isVersionSupported =
        compareVersions(currentVersion.value, minSupportedVersion.value) >= 0;

      // Se não há versão armazenada, definir como a versão do servidor
      if (!storedVersion) {
        localStorage.setItem(STORAGE_KEY, serverData.version);
        currentVersion.value = serverData.version;
        return;
      }

      // Verificar se a versão atual é menor que a versão mínima suportada
      if (!isVersionSupported) {
        requiresLogout.value = true;

        // Forçar logout imediatamente
        const { showError } = useToast();
        showError(
          `Sua versão (${currentVersion.value}) não é mais suportada. Versão mínima: ${minSupportedVersion.value}. Você será redirecionado para fazer login novamente.`
        );

        setTimeout(() => {
          forceLogout();
        }, 3000);

        return;
      }

      // Se a versão armazenada é diferente da do servidor, atualizar silenciosamente
      if (storedVersion !== serverData.version) {
        // Verificar se é uma atualização compatível
        const isCompatibleUpdate =
          compareVersions(serverData.version, storedVersion) > 0;

        if (isCompatibleUpdate) {
          needsUpdate.value = true;
          localStorage.setItem(STORAGE_KEY, serverData.version);
          currentVersion.value = serverData.version;

          // Verificar se precisa limpar localStorage
          checkStorageVersion();

          // Mostrar notificação de atualização apenas se for uma mudança significativa
          const { showSuccess } = useToast();
          showSuccess(
            `Aplicação atualizada para versão ${serverData.version}!`
          );
        } else {
          // Versão mais antiga no servidor, manter a versão atual
        }
      }
    } catch (error) {
      // Em caso de erro, não forçar logout - apenas logar o erro
    }
  };

  // Forçar atualização (limpar tudo e recarregar)
  const forceUpdate = () => {
    if (process.client) {
      clearLocalStorage();
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  // Inicializar verificação de versão
  const initializeVersionCheck = async () => {
    if (process.client) {
      await checkForUpdates();
    }
  };

  // Computed para verificar se está atualizado
  const isUpToDate = computed(() => {
    return currentVersion.value === serverVersion.value && !needsUpdate.value;
  });

  return {
    currentVersion: readonly(currentVersion),
    serverVersion: readonly(serverVersion),
    minSupportedVersion: readonly(minSupportedVersion),
    forceLogoutVersions: readonly(forceLogoutVersions),
    isLoading: readonly(isLoading),
    needsUpdate: readonly(needsUpdate),
    requiresLogout: readonly(requiresLogout),
    isUpToDate,
    checkForUpdates,
    forceUpdate,
    forceLogout,
    initializeVersionCheck,
    clearLocalStorage,
    checkStorageVersion,
    compareVersions,
  };
};
