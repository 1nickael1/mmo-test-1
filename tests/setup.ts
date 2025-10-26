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
        data: {
          username: body?.username || "testuser",
          email: "test@test.com",
          id: 1,
          token: "mock-jwt-token",
        },
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
      const query = options?.query || {};

      // Se não há parâmetros obrigatórios, rejeitar
      if (!query.level || !query.class) {
        return Promise.reject(
          new Error("Parâmetros obrigatórios não fornecidos")
        );
      }

      const level = parseInt(query.level) || 1;
      const characterClass = query.class || "ninja";

      // Itens base para todas as classes
      const baseItems = [
        {
          id: "pocao_vida_basica",
          name: "Poção de Vida Básica",
          type: "potion",
          price: 25,
          level_required: 1,
          description: "Restaura 50 pontos de vida",
          category: "Consumíveis",
          can_buy: level >= 1,
        },
        {
          id: "espada_basica",
          name: "Espada Básica",
          type: "equipment",
          price: 100,
          level_required: 1,
          stats: { strength: 5, damage: 10 },
          description: "Espada simples para iniciantes",
          category: "Armas",
          can_buy: level >= 1,
        },
      ];

      // Itens específicos por classe
      const classItems: Record<string, any[]> = {
        ninja: [
          {
            id: "shuriken_basico",
            name: "Shuriken Básico",
            type: "equipment",
            price: 80,
            level_required: 1,
            stats: { agility: 8, damage: 12 },
            description: "Arma de arremesso ninja básica",
            category: "Armas Ninja",
            can_buy: level >= 1,
          },
          {
            id: "uniforme_ninja",
            name: "Uniforme Ninja",
            type: "equipment",
            price: 120,
            level_required: 1,
            stats: { agility: 10, stealth: 5 },
            description: "Roupa tradicional ninja para furtividade",
            category: "Armaduras Ninja",
            can_buy: level >= 1,
          },
        ],
        guerreiro_espacial: [
          {
            id: "rifle_plasma",
            name: "Rifle de Plasma",
            type: "equipment",
            price: 150,
            level_required: 1,
            stats: { strength: 12, damage: 20 },
            description: "Arma de energia para combate espacial",
            category: "Armas Espaciais",
            can_buy: level >= 1,
          },
          {
            id: "armadura_espacial_basica",
            name: "Armadura Espacial Básica",
            type: "equipment",
            price: 200,
            level_required: 1,
            stats: { defense: 15, radiation_resistance: 20 },
            description: "Proteção básica contra ambiente espacial",
            category: "Armaduras Espaciais",
            can_buy: level >= 1,
          },
        ],
        mago_elemental: [
          {
            id: "cajado_elemental",
            name: "Cajado Elemental",
            type: "equipment",
            price: 100,
            level_required: 1,
            stats: { intelligence: 15, magic_power: 20 },
            description: "Cajado que amplifica magias elementais",
            category: "Armas Mágicas",
            can_buy: level >= 1,
          },
          {
            id: "tunica_mago",
            name: "Túnica de Mago",
            type: "equipment",
            price: 130,
            level_required: 1,
            stats: { intelligence: 12, mana: 30 },
            description: "Túnica que aumenta poder mágico",
            category: "Armaduras Mágicas",
            can_buy: level >= 1,
          },
        ],
        arqueiro_elfo: [
          {
            id: "arco_elfico",
            name: "Arco Élfico",
            type: "equipment",
            price: 90,
            level_required: 1,
            stats: { agility: 12, accuracy: 15 },
            description: "Arco tradicional élfico de alta precisão",
            category: "Armas Élficas",
            can_buy: level >= 1,
          },
          {
            id: "armadura_elfica",
            name: "Armadura Élfica",
            type: "equipment",
            price: 140,
            level_required: 1,
            stats: { agility: 10, nature_resistance: 15 },
            description: "Armadura leve e ágil dos elfos",
            category: "Armaduras Élficas",
            can_buy: level >= 1,
          },
        ],
        paladino_sagrado: [
          {
            id: "espada_sagrada",
            name: "Espada Sagrada",
            type: "equipment",
            price: 110,
            level_required: 1,
            stats: { strength: 10, holy_damage: 15 },
            description: "Espada abençoada com poder divino",
            category: "Armas Sagradas",
            can_buy: level >= 1,
          },
          {
            id: "armadura_sagrada",
            name: "Armadura Sagrada",
            type: "equipment",
            price: 160,
            level_required: 1,
            stats: { defense: 12, holy_resistance: 20 },
            description: "Armadura abençoada pelos deuses",
            category: "Armaduras Sagradas",
            can_buy: level >= 1,
          },
        ],
        ladrao_sombrio: [
          {
            id: "adaga_sombria",
            name: "Adaga Sombria",
            type: "equipment",
            price: 85,
            level_required: 1,
            stats: { agility: 10, stealth: 12 },
            description: "Adaga afiada para ataques furtivos",
            category: "Armas Sombrias",
            can_buy: level >= 1,
          },
          {
            id: "armadura_sombria",
            name: "Armadura Sombria",
            type: "equipment",
            price: 125,
            level_required: 1,
            stats: { stealth: 15, agility: 8 },
            description: "Armadura que favorece furtividade",
            category: "Armaduras Sombrias",
            can_buy: level >= 1,
          },
        ],
      };

      // Adicionar itens de níveis superiores se necessário
      const allItems = [...baseItems];
      if (classItems[characterClass]) {
        allItems.push(...classItems[characterClass]);
      }

      // Adicionar alguns itens de níveis superiores (não compráveis)
      if (level >= 3) {
        allItems.push({
          id: "item_nivel_3",
          name: "Item Nível 3",
          type: "equipment",
          price: 300,
          level_required: 3,
          stats: { strength: 15 },
          description: "Item de nível 3",
          category: "Teste",
          can_buy: level >= 3,
        });
      }

      if (level >= 5) {
        allItems.push({
          id: "item_nivel_5",
          name: "Item Nível 5",
          type: "equipment",
          price: 500,
          level_required: 5,
          stats: { strength: 25 },
          description: "Item de nível 5",
          category: "Teste",
          can_buy: level >= 5,
        });
      }

      // Sempre adicionar alguns itens de nível superior para teste de can_buy
      allItems.push({
        id: "item_nivel_superior",
        name: "Item Nível Superior",
        type: "equipment",
        price: 1000,
        level_required: level + 2,
        stats: { strength: 50 },
        description: "Item de nível superior",
        category: "Teste",
        can_buy: false,
      });

      return Promise.resolve({
        success: true,
        data: allItems,
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
