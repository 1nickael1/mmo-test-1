import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock do banco de dados
const mockDb = {
  prepare: vi.fn(() => ({
    get: vi.fn(),
    all: vi.fn(),
    run: vi.fn(),
  })),
};

// Mock dos utilitários
vi.mock("~/server/utils/database", () => ({
  default: mockDb,
}));

vi.mock("~/server/utils/auth", () => ({
  extractTokenFromHeader: vi.fn(() => "mock-token"),
  verifyToken: vi.fn(() => ({ userId: 1, username: "test" })),
  generateToken: vi.fn(() => "mock-jwt-token"),
  verifyPassword: vi.fn(() => true),
  hashPassword: vi.fn(() => "hashed-password"),
}));

describe("APIs do Sistema", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("API de Versão", () => {
    it("deve retornar informações de versão corretas", async () => {
      // Mock da resposta esperada
      const expectedResponse = {
        success: true,
        data: {
          version: "1.0.0",
          minSupportedVersion: "1.0.0",
          lastUpdate: expect.any(String),
          forceLogoutVersions: [],
          changelog: expect.any(Array),
          requiresUpdate: false,
          requiresLogout: false,
        },
      };

      // Simular chamada da API
      const response = await $fetch("/api/version");

      expect(response).toMatchObject(expectedResponse);
      expect(response.data?.version).toBe("1.0.0");
      expect(response.data?.changelog).toBeInstanceOf(Array);
    });
  });

  describe("API de Autenticação", () => {
    it("deve fazer login com credenciais válidas", async () => {
      const loginData = {
        username: "testuser",
        password: "password123",
      };

      // Mock do usuário no banco
      mockDb.prepare().get.mockReturnValue({
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password_hash: "hashed-password",
        created_at: "2025-01-25T00:00:00Z",
        updated_at: "2025-01-25T00:00:00Z",
      });

      const response = await $fetch("/api/auth/login", {
        method: "POST",
        body: loginData,
      });

      expect(response.success).toBe(true);
      expect(response.data?.username).toBe("testuser");
      expect(response.message).toBe("Login realizado com sucesso");
    });

    it("deve rejeitar login com credenciais inválidas", async () => {
      const loginData = {
        username: "invaliduser",
        password: "wrongpassword",
      };

      // Mock de usuário não encontrado
      mockDb.prepare().get.mockReturnValue(null);

      await expect(
        $fetch("/api/auth/login", {
          method: "POST",
          body: loginData,
        })
      ).rejects.toThrow();
    });

    it("deve registrar novo usuário", async () => {
      const registerData = {
        username: "newuser",
        email: "new@example.com",
        password: "password123",
      };

      // Mock de usuário não existente
      mockDb.prepare().get.mockReturnValue(null);
      // Mock de inserção bem-sucedida
      mockDb.prepare().run.mockReturnValue({ lastInsertRowid: 2 });
      // Mock do usuário criado
      mockDb.prepare().get.mockReturnValue({
        id: 2,
        username: "newuser",
        email: "new@example.com",
        created_at: "2025-01-25T00:00:00Z",
        updated_at: "2025-01-25T00:00:00Z",
      });

      const response = await $fetch("/api/auth/register", {
        method: "POST",
        body: registerData,
      });

      expect(response.success).toBe(true);
      expect(response.data.username).toBe("testuser");
      expect(response.message).toBe("Usuário criado com sucesso");
    });
  });

  describe("API de Personagens", () => {
    it("deve listar personagens do usuário", async () => {
      const mockCharacters = [
        {
          id: 1,
          name: "Test Character",
          class: "ninja",
          level: 3,
          xp: 2000,
          stats_json:
            '{"strength":10,"agility":14,"defense":8,"health":100,"max_health":100}',
          created_at: "2025-01-25T00:00:00Z",
          updated_at: "2025-01-25T00:00:00Z",
        },
      ];

      mockDb.prepare().all.mockReturnValue(mockCharacters);

      const response = await $fetch("/api/characters");

      expect(response.success).toBe(true);
      expect(response.data).toHaveLength(1);
      expect(response.data[0].name).toBe("Test Character");
    });

    it("deve criar novo personagem", async () => {
      const characterData = {
        name: "New Character",
        class: "ninja",
      };

      // Mock de inserção bem-sucedida
      mockDb.prepare().run.mockReturnValue({ lastInsertRowid: 2 });
      // Mock do personagem criado
      mockDb.prepare().get.mockReturnValue({
        id: 2,
        name: "New Character",
        class: "ninja",
        level: 1,
        xp: 0,
        stats_json:
          '{"strength":5,"agility":5,"defense":5,"health":100,"max_health":100}',
        created_at: "2025-01-25T00:00:00Z",
        updated_at: "2025-01-25T00:00:00Z",
      });

      const response = await $fetch("/api/characters", {
        method: "POST",
        body: characterData,
      });

      expect(response.success).toBe(true);
      expect(response.data?.name).toBe("Test Character");
    });
  });

  describe("API de Habilidades", () => {
    it("deve retornar habilidades disponíveis", async () => {
      const mockSkills = [
        {
          name: "Kunai Throw",
          level: 1,
          description: "Lança kunais no inimigo",
          damage: 20,
          cooldown_seconds: 1,
          level_required: 1,
          cost: 100,
          xp_required: 100,
          can_learn: true,
        },
      ];

      // Mock da resposta da API
      const response = {
        success: true,
        data: mockSkills,
      };

      // Simular chamada
      const result = await $fetch("/api/skills/available?class=ninja&level=3");

      expect(result.success).toBe(true);
      expect(result.data).toBeInstanceOf(Array);
    });

    it("deve aprender habilidade com recursos suficientes", async () => {
      const skillData = {
        skill_name: "Kunai Throw",
        character_id: 1,
      };

      // Mock de recursos suficientes
      mockDb.prepare().get.mockReturnValue({ amount: 200 }); // Ouro suficiente
      // Mock de habilidade não aprendida
      mockDb.prepare().get.mockReturnValue(null);
      // Mock de inserção bem-sucedida
      mockDb.prepare().run.mockReturnValue({ lastInsertRowid: 1 });

      const response = await $fetch("/api/skills/learn", {
        method: "POST",
        body: skillData,
      });

      expect(response.success).toBe(true);
      expect(response.message).toBe("Habilidade aprendida com sucesso");
    });
  });

  describe("API de Melhorias", () => {
    it("deve retornar melhorias disponíveis", async () => {
      const mockUpgrades = [
        {
          id: "1",
          name: "Treinamento de Força",
          description: "Aumenta permanentemente a força do personagem",
          level: 1,
          max_level: 10,
          cost: { gold: 100, time_seconds: 30 },
          can_afford: true,
          can_upgrade: true,
        },
      ];

      // Mock de recursos
      mockDb.prepare().all.mockReturnValue([
        { resource_type: "ouro", amount: 200 },
        { resource_type: "materiais", amount: 50 },
        { resource_type: "cristais", amount: 10 },
      ]);

      const response = await $fetch("/api/upgrades/available?characterId=1");

      expect(response.success).toBe(true);
      expect(response.data).toBeInstanceOf(Array);
    });

    it("deve iniciar melhoria com recursos suficientes", async () => {
      const upgradeData = {
        upgrade_id: 1,
        character_id: 1,
      };

      // Mock de recursos suficientes
      mockDb.prepare().get.mockReturnValue({ amount: 200 });
      // Mock de melhoria não em progresso
      mockDb.prepare().get.mockReturnValue(null);
      // Mock de inserção bem-sucedida
      mockDb.prepare().run.mockReturnValue({ lastInsertRowid: 1 });

      const response = await $fetch("/api/upgrades/start", {
        method: "POST",
        body: upgradeData,
      });

      expect(response.success).toBe(true);
      expect(response.message).toBe("Melhoria iniciada com sucesso");
    });
  });

  describe("API de Batalhas", () => {
    it("deve retornar oponentes disponíveis", async () => {
      const mockOpponents = [
        {
          id: 1,
          name: "Ninja Inimigo",
          level: 3,
          stats: {
            strength: 8,
            agility: 12,
            defense: 6,
            health: 80,
            max_health: 80,
          },
          xp_reward: 300,
          gold_reward: 150,
        },
      ];

      const response = await $fetch("/api/battles/opponents?level=3");

      expect(response.success).toBe(true);
      expect(response.data).toBeInstanceOf(Array);
    });

    it("deve iniciar batalha", async () => {
      const battleData = {
        opponent_id: 1,
        character_id: 1,
      };

      // Mock de inserção bem-sucedida
      mockDb.prepare().run.mockReturnValue({ lastInsertRowid: 1 });

      const response = await $fetch("/api/battles/start", {
        method: "POST",
        body: battleData,
      });

      expect(response.success).toBe(true);
      expect(response.data.battle_id).toBeDefined();
    });
  });

  describe("API de Recursos", () => {
    it("deve retornar recursos do personagem", async () => {
      const mockResources = [
        { resource_type: "ouro", amount: 500 },
        { resource_type: "materiais", amount: 100 },
        { resource_type: "cristais", amount: 50 },
      ];

      mockDb.prepare().all.mockReturnValue(mockResources);

      const response = await $fetch("/api/resources/1");

      expect(response.success).toBe(true);
      expect(response.data).toHaveLength(3);
      expect(response.data[0].resource_type).toBe("ouro");
    });
  });

  describe("API de Loja", () => {
    it("deve retornar itens da loja", async () => {
      const mockItems = [
        {
          id: 1,
          name: "Espada de Ferro",
          description: "Uma espada básica de ferro",
          price: 100,
          level_required: 1,
          can_buy: true,
        },
      ];

      const response = await $fetch("/api/shop/items?level=3");

      expect(response.success).toBe(true);
      expect(response.data).toBeInstanceOf(Array);
    });

    it("deve comprar item com ouro suficiente", async () => {
      const purchaseData = {
        item_id: 1,
        character_id: 1,
      };

      // Mock de recursos suficientes
      mockDb.prepare().get.mockReturnValue({ amount: 200 });
      // Mock de item disponível
      mockDb.prepare().get.mockReturnValue({
        id: 1,
        name: "Espada de Ferro",
        price: 100,
        level_required: 1,
      });
      // Mock de atualização bem-sucedida
      mockDb.prepare().run.mockReturnValue({ changes: 1 });

      const response = await $fetch("/api/shop/buy", {
        method: "POST",
        body: purchaseData,
      });

      expect(response.success).toBe(true);
      expect(response.message).toBe("Item comprado com sucesso");
    });
  });
});
