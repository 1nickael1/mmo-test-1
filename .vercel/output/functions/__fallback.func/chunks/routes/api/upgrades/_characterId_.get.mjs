import { d as defineEventHandler, a as getHeader, g as getCookie, c as createError, f as getRouterParam } from '../../../nitro/nitro.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../_/auth.mjs';
import { g as getDatabase } from '../../../_/databaseAdapter.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'bcryptjs';
import 'jsonwebtoken';
import '@vercel/postgres';

const AVAILABLE_UPGRADES = [
  // Melhorias de Stats
  {
    id: "strength_boost",
    name: "Treinamento de For\xE7a",
    type: "stat",
    description: "Aumenta permanentemente a for\xE7a do personagem",
    cost: { gold: 500, materials: 10 },
    max_level: 10,
    stat_boost: { strength: 2 }
  },
  {
    id: "agility_boost",
    name: "Treinamento de Agilidade",
    type: "stat",
    description: "Aumenta permanentemente a agilidade do personagem",
    cost: { gold: 500, materials: 10 },
    max_level: 10,
    stat_boost: { agility: 2 }
  },
  {
    id: "defense_boost",
    name: "Treinamento de Defesa",
    type: "stat",
    description: "Aumenta permanentemente a defesa do personagem",
    cost: { gold: 500, materials: 10 },
    max_level: 10,
    stat_boost: { defense: 2 }
  },
  {
    id: "health_boost",
    name: "Treinamento de Vitalidade",
    type: "stat",
    description: "Aumenta permanentemente a vida m\xE1xima do personagem",
    cost: { gold: 500, materials: 10 },
    max_level: 10,
    stat_boost: { max_health: 20 }
  },
  // Melhorias de Base
  {
    id: "training_ground",
    name: "Campo de Treinamento",
    type: "building",
    description: "Aumenta a efici\xEAncia do treinamento de habilidades",
    cost: { gold: 1e3, materials: 50, crystals: 5 },
    max_level: 5,
    time_seconds: 300
    // 5 minutos
  },
  {
    id: "resource_mine",
    name: "Mina de Recursos",
    type: "building",
    description: "Gera recursos automaticamente",
    cost: { gold: 2e3, materials: 100, crystals: 10 },
    max_level: 3,
    time_seconds: 600
    // 10 minutos
  },
  {
    id: "energy_shield",
    name: "Escudo de Energia",
    type: "building",
    description: "Protege a base de ataques inimigos",
    cost: { gold: 3e3, materials: 150, crystals: 15 },
    max_level: 3,
    time_seconds: 900
    // 15 minutos
  },
  {
    id: "research_lab",
    name: "Laborat\xF3rio de Pesquisa",
    type: "building",
    description: "Permite desenvolver tecnologias avan\xE7adas",
    cost: { gold: 5e3, materials: 200, crystals: 25 },
    max_level: 2,
    time_seconds: 1800
    // 30 minutos
  }
];
const _characterId__get = defineEventHandler(async (event) => {
  const db = getDatabase();
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
        message: "Token de autentica\xE7\xE3o n\xE3o fornecido"
      });
    }
    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        message: "Token inv\xE1lido"
      });
    }
    const characterId = getRouterParam(event, "characterId");
    if (!characterId) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem \xE9 obrigat\xF3rio"
      });
    }
    const character = db.prepare(
      `
      SELECT * FROM characters 
      WHERE id = ? AND user_id = ?
    `
    ).get(characterId, payload.id);
    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem n\xE3o encontrado"
      });
    }
    const resources = db.prepare(
      `
      SELECT * FROM resources 
      WHERE character_id = ?
    `
    ).all(characterId);
    const resourceMap = resources.reduce((acc, res) => {
      acc[res.resource_type] = res.amount;
      return acc;
    }, {});
    const existingUpgrades = db.prepare(
      `
      SELECT * FROM upgrades 
      WHERE character_id = ?
    `
    ).all(characterId);
    const upgradeMap = existingUpgrades.reduce((acc, upgrade) => {
      acc[upgrade.upgrade_name] = upgrade;
      return acc;
    }, {});
    const availableUpgrades = AVAILABLE_UPGRADES.map((upgrade) => {
      const existing = upgradeMap[upgrade.id];
      const currentLevel = existing ? existing.level : 0;
      const canUpgrade = currentLevel < upgrade.max_level;
      const costMultiplier = Math.pow(1.5, currentLevel);
      const currentCost = {
        gold: Math.floor(upgrade.cost.gold * costMultiplier),
        materials: Math.floor((upgrade.cost.materials || 0) * costMultiplier),
        crystals: Math.floor((upgrade.cost.crystals || 0) * costMultiplier)
      };
      const canAfford = canUpgrade && resourceMap.ouro >= currentCost.gold && resourceMap.materiais >= currentCost.materials && resourceMap.cristais >= currentCost.crystals;
      return {
        ...upgrade,
        current_level: currentLevel,
        can_upgrade: canUpgrade,
        can_afford: canAfford,
        current_cost: currentCost,
        is_completed: (existing == null ? void 0 : existing.is_completed) || false,
        time_remaining: existing && !existing.is_completed ? Math.max(
          0,
          new Date(existing.completed_at || 0).getTime() - Date.now()
        ) : 0
      };
    });
    const response = {
      success: true,
      data: availableUpgrades
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { _characterId__get as default };
//# sourceMappingURL=_characterId_.get.mjs.map
