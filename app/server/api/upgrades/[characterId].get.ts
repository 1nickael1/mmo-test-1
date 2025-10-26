import type { ApiResponse, Upgrade } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/database";

// Melhorias disponíveis
const AVAILABLE_UPGRADES = [
  // Melhorias de Stats
  {
    id: "strength_boost",
    name: "Treinamento de Força",
    type: "stat" as const,
    description: "Aumenta permanentemente a força do personagem",
    cost: { gold: 500, materials: 10 },
    max_level: 10,
    stat_boost: { strength: 2 },
  },
  {
    id: "agility_boost",
    name: "Treinamento de Agilidade",
    type: "stat" as const,
    description: "Aumenta permanentemente a agilidade do personagem",
    cost: { gold: 500, materials: 10 },
    max_level: 10,
    stat_boost: { agility: 2 },
  },
  {
    id: "defense_boost",
    name: "Treinamento de Defesa",
    type: "stat" as const,
    description: "Aumenta permanentemente a defesa do personagem",
    cost: { gold: 500, materials: 10 },
    max_level: 10,
    stat_boost: { defense: 2 },
  },
  {
    id: "health_boost",
    name: "Treinamento de Vitalidade",
    type: "stat" as const,
    description: "Aumenta permanentemente a vida máxima do personagem",
    cost: { gold: 500, materials: 10 },
    max_level: 10,
    stat_boost: { max_health: 20 },
  },

  // Melhorias de Base
  {
    id: "training_ground",
    name: "Campo de Treinamento",
    type: "building" as const,
    description: "Aumenta a eficiência do treinamento de habilidades",
    cost: { gold: 1000, materials: 50, crystals: 5 },
    max_level: 5,
    time_seconds: 300, // 5 minutos
  },
  {
    id: "resource_mine",
    name: "Mina de Recursos",
    type: "building" as const,
    description: "Gera recursos automaticamente",
    cost: { gold: 2000, materials: 100, crystals: 10 },
    max_level: 3,
    time_seconds: 600, // 10 minutos
  },
  {
    id: "energy_shield",
    name: "Escudo de Energia",
    type: "building" as const,
    description: "Protege a base de ataques inimigos",
    cost: { gold: 3000, materials: 150, crystals: 15 },
    max_level: 3,
    time_seconds: 900, // 15 minutos
  },
  {
    id: "research_lab",
    name: "Laboratório de Pesquisa",
    type: "building" as const,
    description: "Permite desenvolver tecnologias avançadas",
    cost: { gold: 5000, materials: 200, crystals: 25 },
    max_level: 2,
    time_seconds: 1800, // 30 minutos
  },
];

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    let token = extractTokenFromHeader(authHeader);
    if (!token) {
      const cookieToken = getCookie(event, "@mmo/ninja/token");
      token = cookieToken || null;
    }

    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Token de autenticação não fornecido",
      });
    }

    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        message: "Token inválido",
      });
    }

    const characterId = getRouterParam(event, "characterId");

    if (!characterId) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem é obrigatório",
      });
    }

    // Verificar se o personagem pertence ao usuário
    const character = db
      .prepare(
        `
      SELECT * FROM characters 
      WHERE id = ? AND user_id = ?
    `
      )
      .get(characterId, payload.id) as any;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Buscar recursos do personagem
    const resources = db
      .prepare(
        `
      SELECT * FROM resources 
      WHERE character_id = ?
    `
      )
      .all(characterId) as any[];

    const resourceMap = resources.reduce((acc, res) => {
      acc[res.resource_type] = res.amount;
      return acc;
    }, {} as Record<string, number>);

    // Buscar melhorias existentes
    const existingUpgrades = db
      .prepare(
        `
      SELECT * FROM upgrades 
      WHERE character_id = ?
    `
      )
      .all(characterId) as Upgrade[];

    const upgradeMap = existingUpgrades.reduce((acc, upgrade) => {
      acc[upgrade.upgrade_name] = upgrade;
      return acc;
    }, {} as Record<string, Upgrade>);

    // Preparar melhorias disponíveis
    const availableUpgrades = AVAILABLE_UPGRADES.map((upgrade) => {
      const existing = upgradeMap[upgrade.id];
      const currentLevel = existing ? existing.level : 0;
      const canUpgrade = currentLevel < upgrade.max_level;

      // Calcular custo baseado no nível atual
      const costMultiplier = Math.pow(1.5, currentLevel);
      const currentCost = {
        gold: Math.floor(upgrade.cost.gold * costMultiplier),
        materials: Math.floor((upgrade.cost.materials || 0) * costMultiplier),
        crystals: Math.floor((upgrade.cost.crystals || 0) * costMultiplier),
      };

      const canAfford =
        canUpgrade &&
        resourceMap.ouro >= currentCost.gold &&
        resourceMap.materiais >= currentCost.materials &&
        resourceMap.cristais >= currentCost.crystals;

      return {
        ...upgrade,
        current_level: currentLevel,
        can_upgrade: canUpgrade,
        can_afford: canAfford,
        current_cost: currentCost,
        is_completed: existing?.is_completed || false,
        time_remaining:
          existing && !existing.is_completed
            ? Math.max(
                0,
                new Date(existing.completed_at || 0).getTime() - Date.now()
              )
            : 0,
      };
    });

    const response: ApiResponse<typeof availableUpgrades> = {
      success: true,
      data: availableUpgrades,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
