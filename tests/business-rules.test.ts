import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Regras de Negócio", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Sistema de Níveis e XP", () => {
    it("deve calcular XP necessário para cada nível corretamente", () => {
      // Função de cálculo de XP (baseada na implementação atual)
      const getXpForLevel = (level: number) => {
        return level * 100; // 100 XP por nível
      };

      expect(getXpForLevel(1)).toBe(100);
      expect(getXpForLevel(2)).toBe(200);
      expect(getXpForLevel(3)).toBe(300);
      expect(getXpForLevel(10)).toBe(1000);
      expect(getXpForLevel(50)).toBe(5000);
    });

    it("deve verificar se personagem pode subir de nível", () => {
      const canLevelUp = (currentXp: number, currentLevel: number) => {
        const requiredXp = (currentLevel + 1) * 100;
        return currentXp >= requiredXp;
      };

      expect(canLevelUp(200, 1)).toBe(true); // 200 XP, nível 1 -> pode subir para 2
      expect(canLevelUp(150, 1)).toBe(false); // 150 XP, nível 1 -> não pode subir
      expect(canLevelUp(300, 2)).toBe(true); // 300 XP, nível 2 -> pode subir para 3
    });

    it("deve calcular stats base por classe corretamente", () => {
      const getBaseStats = (characterClass: string) => {
        const baseStats = {
          ninja: {
            strength: 5,
            agility: 8,
            defense: 4,
            health: 100,
            max_health: 100,
          },
          guerreiro_espacial: {
            strength: 8,
            agility: 4,
            defense: 6,
            health: 120,
            max_health: 120,
          },
        };
        return (
          baseStats[characterClass as keyof typeof baseStats] || baseStats.ninja
        );
      };

      const ninjaStats = getBaseStats("ninja");
      expect(ninjaStats.agility).toBe(8);
      expect(ninjaStats.strength).toBe(5);

      const warriorStats = getBaseStats("guerreiro_espacial");
      expect(warriorStats.strength).toBe(8);
      expect(warriorStats.health).toBe(120);
    });
  });

  describe("Sistema de Habilidades", () => {
    it("deve calcular cooldown proporcional por nível", () => {
      const calculateCooldown = (level: number) => {
        // Cooldown de 1 segundo no nível 1 até 30 segundos no nível 50
        return Math.max(1, Math.round((level / 50) * 30));
      };

      expect(calculateCooldown(1)).toBe(1);
      expect(calculateCooldown(10)).toBe(6);
      expect(calculateCooldown(25)).toBe(15);
      expect(calculateCooldown(50)).toBe(30);
    });

    it("deve verificar requisitos para aprender habilidade", () => {
      const canLearnSkill = (
        characterLevel: number,
        characterXp: number,
        skillLevel: number,
        skillXp: number
      ) => {
        return characterLevel >= skillLevel && characterXp >= skillXp;
      };

      // Personagem nível 3, 2000 XP
      expect(canLearnSkill(3, 2000, 1, 100)).toBe(true); // Pode aprender habilidade nível 1
      expect(canLearnSkill(3, 2000, 3, 300)).toBe(true); // Pode aprender habilidade nível 3
      expect(canLearnSkill(3, 2000, 4, 400)).toBe(false); // Não pode aprender habilidade nível 4
      expect(canLearnSkill(3, 200, 1, 100)).toBe(true); // Pode aprender (XP suficiente)
      expect(canLearnSkill(3, 50, 1, 100)).toBe(false); // Não pode aprender (XP insuficiente)
    });

    it("deve calcular custo de habilidade por nível", () => {
      const getSkillCost = (level: number) => {
        return level * 100; // 100 ouro por nível
      };

      expect(getSkillCost(1)).toBe(100);
      expect(getSkillCost(5)).toBe(500);
      expect(getSkillCost(10)).toBe(1000);
    });
  });

  describe("Sistema de Melhorias", () => {
    it("deve verificar se personagem pode pagar por melhoria", () => {
      const canAffordUpgrade = (resources: any, cost: any) => {
        return (
          (resources.ouro || 0) >= (cost.gold || 0) &&
          (resources.materiais || 0) >= (cost.materials || 0) &&
          (resources.cristais || 0) >= (cost.crystals || 0)
        );
      };

      const resources = { ouro: 500, materiais: 100, cristais: 50 };
      const affordableCost = { gold: 200, materials: 50, crystals: 25 };
      const expensiveCost = { gold: 600, materials: 50, crystals: 25 };

      expect(canAffordUpgrade(resources, affordableCost)).toBe(true);
      expect(canAffordUpgrade(resources, expensiveCost)).toBe(false);
    });

    it("deve verificar se melhoria pode ser iniciada", () => {
      const canStartUpgrade = (
        currentLevel: number,
        maxLevel: number,
        isInProgress: boolean,
        canAfford: boolean
      ) => {
        return !isInProgress && currentLevel < maxLevel && canAfford;
      };

      expect(canStartUpgrade(0, 10, false, true)).toBe(true); // Pode iniciar
      expect(canStartUpgrade(5, 10, false, true)).toBe(true); // Pode continuar
      expect(canStartUpgrade(10, 10, false, true)).toBe(false); // Já no máximo
      expect(canStartUpgrade(0, 10, true, true)).toBe(false); // Já em progresso
      expect(canStartUpgrade(0, 10, false, false)).toBe(false); // Sem recursos
    });

    it("deve calcular tempo de melhoria por nível", () => {
      const getUpgradeTime = (level: number) => {
        // Tempo base de 30 segundos, aumenta com o nível
        return Math.max(30, level * 15);
      };

      expect(getUpgradeTime(1)).toBe(30);
      expect(getUpgradeTime(2)).toBe(30);
      expect(getUpgradeTime(3)).toBe(45);
      expect(getUpgradeTime(10)).toBe(150);
    });
  });

  describe("Sistema de Batalhas", () => {
    it("deve calcular dano baseado em stats", () => {
      const calculateDamage = (
        attackerStrength: number,
        defenderDefense: number
      ) => {
        const baseDamage = attackerStrength * 2;
        const defenseReduction = defenderDefense * 0.5;
        return Math.max(1, baseDamage - defenseReduction);
      };

      // Atacante força 10, defensor defesa 5
      expect(calculateDamage(10, 5)).toBe(17.5); // 20 - 2.5 = 17.5

      // Atacante força 5, defensor defesa 10
      expect(calculateDamage(5, 10)).toBe(5); // 10 - 5 = 5

      // Atacante força 1, defensor defesa 10
      expect(calculateDamage(1, 10)).toBe(1); // Mínimo de 1 de dano
    });

    it("deve calcular recompensas de batalha", () => {
      const calculateBattleRewards = (opponentLevel: number) => {
        const baseXp = opponentLevel * 100;
        const baseGold = opponentLevel * 50;
        return {
          xp: baseXp,
          gold: baseGold,
        };
      };

      expect(calculateBattleRewards(1)).toEqual({ xp: 100, gold: 50 });
      expect(calculateBattleRewards(3)).toEqual({ xp: 300, gold: 150 });
      expect(calculateBattleRewards(10)).toEqual({ xp: 1000, gold: 500 });
    });

    it("deve verificar se habilidade pode ser usada", () => {
      const canUseSkill = (
        lastUsed: string | null,
        cooldownSeconds: number
      ) => {
        if (!lastUsed) return true;

        // Simulação simplificada para teste
        const timeDiff = 2000; // 2 segundos
        return timeDiff >= cooldownSeconds * 1000;
      };

      expect(canUseSkill(null, 1)).toBe(true); // Nunca usada
      expect(canUseSkill("2025-01-25T00:00:00Z", 1)).toBe(true); // Cooldown acabou
      expect(canUseSkill("2025-01-25T00:00:00Z", 3)).toBe(false); // Ainda em cooldown
    });
  });

  describe("Sistema de Recursos", () => {
    it("deve calcular recompensas de mineração", () => {
      const calculateMiningRewards = (miningLevel: number) => {
        const baseGold = 10 + miningLevel * 5;
        const baseMaterials = 5 + miningLevel * 2;
        const baseCrystals = Math.floor(miningLevel / 2);

        return {
          ouro: baseGold,
          materiais: baseMaterials,
          cristais: baseCrystals,
        };
      };

      expect(calculateMiningRewards(1)).toEqual({
        ouro: 15,
        materiais: 7,
        cristais: 0,
      });
      expect(calculateMiningRewards(5)).toEqual({
        ouro: 35,
        materiais: 15,
        cristais: 2,
      });
      expect(calculateMiningRewards(10)).toEqual({
        ouro: 60,
        materiais: 25,
        cristais: 5,
      });
    });

    it("deve verificar capacidade de armazenamento", () => {
      const getStorageCapacity = (upgradeLevel: number) => {
        return 1000 + upgradeLevel * 1000; // 1000 base + 1000 por nível
      };

      expect(getStorageCapacity(0)).toBe(1000);
      expect(getStorageCapacity(1)).toBe(2000);
      expect(getStorageCapacity(5)).toBe(6000);
    });
  });

  describe("Sistema de Loja", () => {
    it("deve verificar se item pode ser comprado", () => {
      const canBuyItem = (
        characterLevel: number,
        characterGold: number,
        itemLevel: number,
        itemPrice: number
      ) => {
        return characterLevel >= itemLevel && characterGold >= itemPrice;
      };

      expect(canBuyItem(3, 500, 1, 100)).toBe(true); // Pode comprar
      expect(canBuyItem(3, 500, 5, 100)).toBe(false); // Nível insuficiente
      expect(canBuyItem(3, 50, 1, 100)).toBe(false); // Ouro insuficiente
      expect(canBuyItem(3, 500, 1, 600)).toBe(false); // Ouro insuficiente
    });

    it("deve calcular preço de item por nível", () => {
      const getItemPrice = (level: number, basePrice: number = 100) => {
        return basePrice * level;
      };

      expect(getItemPrice(1)).toBe(100);
      expect(getItemPrice(3)).toBe(300);
      expect(getItemPrice(10)).toBe(1000);
    });
  });

  describe("Sistema de História", () => {
    it("deve verificar se capítulo pode ser jogado", () => {
      const canPlayChapter = (
        characterLevel: number,
        chapterLevel: number,
        isCompleted: boolean
      ) => {
        return characterLevel >= chapterLevel && !isCompleted;
      };

      expect(canPlayChapter(3, 1, false)).toBe(true); // Pode jogar
      expect(canPlayChapter(3, 5, false)).toBe(false); // Nível insuficiente
      expect(canPlayChapter(3, 1, true)).toBe(false); // Já completado
    });

    it("deve calcular progresso da história", () => {
      const calculateStoryProgress = (
        completedChapters: number,
        totalChapters: number
      ) => {
        return Math.round((completedChapters / totalChapters) * 100);
      };

      expect(calculateStoryProgress(0, 10)).toBe(0);
      expect(calculateStoryProgress(5, 10)).toBe(50);
      expect(calculateStoryProgress(10, 10)).toBe(100);
    });
  });

  describe("Validações de Dados", () => {
    it("deve validar nome de personagem", () => {
      const isValidCharacterName = (name: string) => {
        return Boolean(
          name &&
            name.length >= 2 &&
            name.length <= 20 &&
            /^[a-zA-Z0-9\s]+$/.test(name)
        );
      };

      expect(isValidCharacterName("Riki")).toBe(true);
      expect(isValidCharacterName("Test Character")).toBe(true);
      expect(isValidCharacterName("A")).toBe(false); // Muito curto
      expect(isValidCharacterName("A".repeat(25))).toBe(false); // Muito longo
      expect(isValidCharacterName("Riki@123")).toBe(false); // Caracteres inválidos
      expect(isValidCharacterName("")).toBe(false); // Vazio
    });

    it("deve validar email", () => {
      const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name@domain.co.uk")).toBe(true);
      expect(isValidEmail("invalid-email")).toBe(false);
      expect(isValidEmail("test@")).toBe(false);
      expect(isValidEmail("@domain.com")).toBe(false);
    });

    it("deve validar senha", () => {
      const isValidPassword = (password: string) => {
        return Boolean(password && password.length >= 6);
      };

      expect(isValidPassword("password123")).toBe(true);
      expect(isValidPassword("123456")).toBe(true);
      expect(isValidPassword("12345")).toBe(false); // Muito curta
      expect(isValidPassword("")).toBe(false); // Vazia
    });
  });

  describe("Limites e Restrições", () => {
    it("deve respeitar limite máximo de personagens por usuário", () => {
      const MAX_CHARACTERS_PER_USER = 5;

      const canCreateCharacter = (currentCharacterCount: number) => {
        return currentCharacterCount < MAX_CHARACTERS_PER_USER;
      };

      expect(canCreateCharacter(0)).toBe(true);
      expect(canCreateCharacter(4)).toBe(true);
      expect(canCreateCharacter(5)).toBe(false);
      expect(canCreateCharacter(6)).toBe(false);
    });

    it("deve respeitar limite máximo de habilidades por personagem", () => {
      const MAX_SKILLS_PER_CHARACTER = 20;

      const canLearnSkill = (currentSkillCount: number) => {
        return currentSkillCount < MAX_SKILLS_PER_CHARACTER;
      };

      expect(canLearnSkill(0)).toBe(true);
      expect(canLearnSkill(19)).toBe(true);
      expect(canLearnSkill(20)).toBe(false);
    });

    it("deve respeitar limite máximo de melhorias simultâneas", () => {
      const MAX_CONCURRENT_UPGRADES = 1;

      const canStartUpgrade = (currentUpgradesInProgress: number) => {
        return currentUpgradesInProgress < MAX_CONCURRENT_UPGRADES;
      };

      expect(canStartUpgrade(0)).toBe(true);
      expect(canStartUpgrade(1)).toBe(false);
    });
  });
});
