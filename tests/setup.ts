import { vi } from "vitest";

// Mock do localStorage
Object.defineProperty(window, "localStorage", {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
});

// Mock do sessionStorage
Object.defineProperty(window, "sessionStorage", {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
});

// Mock do fetch
global.fetch = vi.fn();

// Mock do console para evitar logs durante os testes
global.console = {
  ...console,
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

// Mock do process.client
Object.defineProperty(global, "process", {
  value: {
    ...process,
    client: true,
  },
  writable: true,
});

// Mock do $fetch
(global as any).$fetch = vi
  .fn()
  .mockImplementation((url: string, options?: any) => {
    // Retornar dados de versão apenas para /api/version
    if (url.includes("/api/version")) {
      return Promise.resolve({
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
      });
    }

    // Para outros endpoints, retornar dados mock apropriados
    if (url.includes("/api/auth/login")) {
      // Verificar se é um login inválido baseado no body
      const body = options?.body;
      if (
        body &&
        (body.username === "invaliduser" || body.password === "wrongpassword")
      ) {
        return Promise.reject(new Error("Credenciais inválidas"));
      }
      return Promise.resolve({
        success: true,
        data: { username: "testuser", email: "test@test.com", id: 1 },
        message: "Login realizado com sucesso",
      });
    }

    if (url.includes("/api/auth/register")) {
      return Promise.resolve({
        success: true,
        data: { username: "testuser", email: "test@test.com", id: 2 },
        message: "Usuário criado com sucesso",
      });
    }

    if (
      url.includes("/api/characters") &&
      !url.includes("/api/characters/") &&
      options?.method !== "POST"
    ) {
      return Promise.resolve({
        success: true,
        data: [{ id: 1, name: "Test Character", level: 3, class: "ninja" }],
      });
    }

    if (url.includes("/api/characters") && options?.method === "POST") {
      return Promise.resolve({
        success: true,
        data: { id: 2, name: "Test Character", level: 1, class: "ninja" },
      });
    }

    if (url.includes("/api/skills/available")) {
      return Promise.resolve({
        success: true,
        data: [{ name: "Test Skill", level: 1, damage: 10 }],
      });
    }

    if (url.includes("/api/skills/learn")) {
      return Promise.resolve({
        success: true,
        message: "Habilidade aprendida com sucesso",
      });
    }

    if (
      url.includes("/api/skills/") &&
      !url.includes("/api/skills/available") &&
      !url.includes("/api/skills/learn")
    ) {
      return Promise.resolve({
        success: true,
        data: [{ name: "Test Skill", level: 1, damage: 10 }],
      });
    }

    if (url.includes("/api/upgrades/available")) {
      return Promise.resolve({
        success: true,
        data: [{ name: "Test Upgrade", level: 1, cost: { gold: 100 } }],
      });
    }

    if (url.includes("/api/upgrades/start")) {
      return Promise.resolve({
        success: true,
        message: "Melhoria iniciada com sucesso",
      });
    }

    if (url.includes("/api/battles/opponents")) {
      return Promise.resolve({
        success: true,
        data: [{ name: "Test Enemy", level: 3, health: 100 }],
      });
    }

    if (url.includes("/api/battles/start")) {
      return Promise.resolve({
        success: true,
        data: { battle_id: "test-battle-123" },
      });
    }

    if (url.includes("/api/resources")) {
      return Promise.resolve({
        success: true,
        data: [
          { resource_type: "ouro", amount: 1000 },
          { resource_type: "materiais", amount: 500 },
          { resource_type: "cristais", amount: 100 },
        ],
      });
    }

    if (url.includes("/api/shop/items")) {
      return Promise.resolve({
        success: true,
        data: [{ name: "Test Item", price: 100, level_required: 1 }],
      });
    }

    if (url.includes("/api/shop/buy")) {
      return Promise.resolve({
        success: true,
        message: "Item comprado com sucesso",
      });
    }

    if (url.includes("/api/mining/start")) {
      return Promise.resolve({
        success: true,
        data: { rewards: { ouro: 50, materiais: 25 } },
      });
    }

    if (url.includes("/api/story/chapters")) {
      return Promise.resolve({
        success: true,
        data: [{ id: 1, title: "Test Chapter", level_required: 1 }],
      });
    }

    if (url.includes("/api/auth/check-version")) {
      // Verificar se é uma versão incompatível baseada no body ou headers
      const body = options?.body;
      const headers = options?.headers;

      if (
        (body && body.version === "0.9.0") ||
        (headers &&
          headers.Authorization &&
          (headers.Authorization.includes("incompatible-token") ||
            headers.Authorization.includes("old-jwt-token")))
      ) {
        return Promise.reject(new Error("Versão incompatível"));
      }
      return Promise.resolve({
        success: true,
        data: { isCompatible: true, version: "1.0.0", tokenVersion: "1.0.0" },
      });
    }

    // Default response
    return Promise.resolve({
      success: true,
      data: {},
    });
  });

// Mock do navigateTo
(global as any).navigateTo = vi.fn();

// Mock do useToast
vi.mock("~/composables/useToast", () => ({
  useToast: () => ({
    showSuccess: vi.fn(),
    showError: vi.fn(),
    showWarning: vi.fn(),
    showInfo: vi.fn(),
    showConfirm: vi.fn(),
  }),
}));

// Mock do useCookie
vi.mock("nuxt/app", async (importOriginal) => {
  const actual = await importOriginal<typeof import("nuxt/app")>();
  return {
    ...actual,
    useCookie: vi.fn((name: string) => ({
      value: name === "@mmo/ninja/token" ? "mock-token" : null,
    })),
  };
});

// Mock do useAppVersion
vi.mock("~/composables/useAppVersion", () => ({
  useAppVersion: () => {
    const mockFetch = vi.fn().mockResolvedValue({
      version: "1.0.0",
      minSupportedVersion: "1.0.0",
      lastUpdate: "2025-01-25T18:00:00Z",
      forceLogoutVersions: ["0.9.0", "0.8.0"],
      changelog: [],
      requiresUpdate: false,
      requiresLogout: false,
    });

    const mockClearLocalStorage = vi.fn().mockImplementation(() => {
      localStorage.clear();
    });

    return {
      currentVersion: { value: "" },
      serverVersion: { value: "" },
      isUpToDate: { value: true },
      isLoading: { value: false },
      needsUpdate: { value: false },
      requiresLogout: { value: false },
      fetchServerVersion: mockFetch,
      checkForUpdates: vi.fn().mockResolvedValue(undefined),
      forceUpdate: vi.fn(),
      forceLogout: vi.fn().mockImplementation(() => {
        localStorage.clear();
        window.location.href = "/login";
      }),
      initializeVersionCheck: vi.fn(),
      clearLocalStorage: mockClearLocalStorage,
      checkStorageVersion: vi.fn(),
      compareVersions: vi.fn().mockImplementation((v1: string, v2: string) => {
        const v1parts = v1.split(".").map(Number);
        const v2parts = v2.split(".").map(Number);

        for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
          const v1part = v1parts[i] || 0;
          const v2part = v2parts[i] || 0;

          if (v1part > v2part) return 1;
          if (v1part < v2part) return -1;
        }

        return 0;
      }),
    };
  },
}));

// Mock do useCharacterStore
vi.mock("~/stores/character", () => ({
  useCharacterStore: () => ({
    currentCharacter: {
      id: 1,
      name: "Test Character",
      level: 3,
      xp: 2000,
      class: "ninja",
      stats: {
        strength: 10,
        agility: 14,
        defense: 8,
        health: 100,
        max_health: 100,
      },
    },
    characters: [
      {
        id: 1,
        name: "Test Character",
        level: 3,
        xp: 2000,
        class: "ninja",
      },
    ],
    loading: false,
    loadCharacters: vi.fn(),
    selectCharacter: vi.fn(),
    createCharacter: vi.fn(),
    ensureCharacterSelected: vi.fn(),
  }),
}));
