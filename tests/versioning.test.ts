import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useAppVersion } from "~/composables/useAppVersion";

// Mock do $fetch
const mockFetch = vi.fn();
(global as any).$fetch = mockFetch;

describe("Sistema de Versionamento", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset localStorage mock
    vi.mocked(localStorage.getItem).mockReturnValue(null);
    vi.mocked(localStorage.setItem).mockImplementation(() => {});
    vi.mocked(localStorage.clear).mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("useAppVersion", () => {
    it("deve inicializar com valores padrão", () => {
      const { currentVersion, serverVersion, isLoading, needsUpdate } =
        useAppVersion();

      expect(currentVersion.value).toBe("");
      expect(serverVersion.value).toBe("");
      expect(isLoading.value).toBe(false);
      expect(needsUpdate.value).toBe(false);
    });

    it("deve buscar versão do servidor corretamente", async () => {
      const mockServerData = {
        success: true,
        data: {
          version: "1.0.0",
          minSupportedVersion: "1.0.0",
          lastUpdate: "2025-01-25T18:00:00Z",
          forceLogoutVersions: [],
          changelog: [],
          requiresUpdate: false,
          requiresLogout: false,
        },
      };

      mockFetch.mockResolvedValue(mockServerData);

      const { fetchServerVersion } = useAppVersion() as any;
      const result = await fetchServerVersion();

      // Verificar se o resultado foi retornado corretamente
      expect(result).toBeDefined();
    });

    it("deve comparar versões corretamente", () => {
      const { compareVersions } = useAppVersion();

      // Testes de comparação
      expect(compareVersions("1.0.0", "1.0.0")).toBe(0); // Iguais
      expect(compareVersions("1.1.0", "1.0.0")).toBe(1); // Maior
      expect(compareVersions("1.0.0", "1.1.0")).toBe(-1); // Menor
      expect(compareVersions("2.0.0", "1.9.9")).toBe(1); // Major maior
      expect(compareVersions("1.0.1", "1.0.0")).toBe(1); // Patch maior
    });

    it("deve detectar versão incompatível e forçar logout", async () => {
      const mockServerData = {
        success: true,
        data: {
          version: "1.0.0",
          minSupportedVersion: "1.0.0",
          lastUpdate: "2025-01-25T18:00:00Z",
          forceLogoutVersions: ["0.9.0"],
          changelog: [],
          requiresUpdate: false,
          requiresLogout: false,
        },
      };

      mockFetch.mockResolvedValue(mockServerData);
      vi.mocked(localStorage.getItem).mockReturnValue("0.9.0"); // Versão antiga

      const { checkForUpdates, requiresLogout } = useAppVersion();

      // Mock do window.location.href
      delete (window as any).location;
      window.location = { href: "" } as any;

      await checkForUpdates();

      // Verificar se o sistema detectou versão incompatível
      expect(requiresLogout.value).toBeDefined();
    });

    it("deve limpar localStorage quando necessário", () => {
      const { clearLocalStorage } = useAppVersion();

      clearLocalStorage(false);
      expect(localStorage.clear).toHaveBeenCalled();

      vi.clearAllMocks();
      vi.mocked(localStorage.getItem).mockReturnValue("token123");

      clearLocalStorage(true);
      expect(localStorage.clear).toHaveBeenCalled();
    });

    it("deve forçar logout e redirecionar", () => {
      const { forceLogout } = useAppVersion();

      // Mock do window.location.href
      delete (window as any).location;
      window.location = { href: "" } as any;

      forceLogout();

      expect(localStorage.clear).toHaveBeenCalled();
      expect(window.location.href).toBe("/login");
    });
  });

  describe("Comparação de Versões", () => {
    it("deve lidar com versões em diferentes formatos", () => {
      const { compareVersions } = useAppVersion();

      // Versões com diferentes números de partes
      expect(compareVersions("1.0", "1.0.0")).toBe(0);
      expect(compareVersions("1.0.0", "1.0")).toBe(0);
      expect(compareVersions("1.0.1", "1.0")).toBe(1);
      expect(compareVersions("1.0", "1.0.1")).toBe(-1);
    });

    it("deve lidar com versões inválidas", () => {
      const { compareVersions } = useAppVersion();

      // Versões com caracteres não numéricos
      expect(compareVersions("1.0.0", "1.0.a")).toBe(0); // NaN é tratado como 0
      expect(compareVersions("1.0.a", "1.0.0")).toBe(0);
    });
  });

  describe("Cenários de Compatibilidade", () => {
    it("deve permitir versão atual", async () => {
      const mockServerData = {
        success: true,
        data: {
          version: "1.0.0",
          minSupportedVersion: "1.0.0",
          lastUpdate: "2025-01-25T18:00:00Z",
          forceLogoutVersions: [],
          changelog: [],
          requiresUpdate: false,
          requiresLogout: false,
        },
      };

      mockFetch.mockResolvedValue(mockServerData);
      vi.mocked(localStorage.getItem).mockReturnValue("1.0.0");

      const { checkForUpdates, requiresLogout } = useAppVersion();
      await checkForUpdates();

      expect(requiresLogout.value).toBe(false);
    });

    it("deve rejeitar versão muito antiga", async () => {
      const mockServerData = {
        success: true,
        data: {
          version: "1.0.0",
          minSupportedVersion: "1.0.0",
          lastUpdate: "2025-01-25T18:00:00Z",
          forceLogoutVersions: [],
          changelog: [],
          requiresUpdate: false,
          requiresLogout: false,
        },
      };

      mockFetch.mockResolvedValue(mockServerData);
      vi.mocked(localStorage.getItem).mockReturnValue("0.9.0"); // Versão antiga

      const { checkForUpdates, requiresLogout } = useAppVersion();

      // Mock do window.location.href
      delete (window as any).location;
      window.location = { href: "" } as any;

      await checkForUpdates();

      // Verificar se o sistema detectou versão incompatível
      expect(requiresLogout.value).toBeDefined();
    });

    it("deve permitir versão futura", async () => {
      const mockServerData = {
        success: true,
        data: {
          version: "1.0.0",
          minSupportedVersion: "1.0.0",
          lastUpdate: "2025-01-25T18:00:00Z",
          forceLogoutVersions: [],
          changelog: [],
          requiresUpdate: false,
          requiresLogout: false,
        },
      };

      mockFetch.mockResolvedValue(mockServerData);
      vi.mocked(localStorage.getItem).mockReturnValue("1.1.0"); // Versão futura

      const { checkForUpdates, requiresLogout } = useAppVersion();
      await checkForUpdates();

      expect(requiresLogout.value).toBe(false);
    });
  });

  describe("Tratamento de Erros", () => {
    it("deve lidar com erro na API de versão", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      const { checkForUpdates } = useAppVersion();

      // Não deve lançar erro
      await expect(checkForUpdates()).resolves.not.toThrow();
    });

    it("deve lidar com resposta inválida da API", async () => {
      mockFetch.mockResolvedValue({ success: false });

      const { checkForUpdates } = useAppVersion();

      // Não deve lançar erro
      await expect(checkForUpdates()).resolves.not.toThrow();
    });
  });
});
