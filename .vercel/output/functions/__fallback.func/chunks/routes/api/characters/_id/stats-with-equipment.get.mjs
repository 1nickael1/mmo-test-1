import { d as defineEventHandler, a as getHeader, c as createError, f as getRouterParam } from '../../../../nitro/nitro.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../../_/auth.mjs';
import { g as getDatabase } from '../../../../_/databaseAdapter.mjs';
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

const statsWithEquipment_get = defineEventHandler(async (event) => {
  const db = getDatabase();
  try {
    const authHeader = getHeader(event, "authorization");
    const token = extractTokenFromHeader(authHeader);
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
    const characterId = getRouterParam(event, "id");
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
    const equippedItems = db.prepare(
      `
      SELECT * FROM equipment 
      WHERE character_id = ? AND equipped = TRUE
    `
    ).all(characterId);
    const baseStats = JSON.parse(character.stats_json);
    const equipmentBonuses = {
      strength: 0,
      agility: 0,
      defense: 0,
      health: 0,
      damage: 0
    };
    equippedItems.forEach((item) => {
      const itemStats = JSON.parse(item.stats_json || "{}");
      equipmentBonuses.strength += itemStats.strength || 0;
      equipmentBonuses.agility += itemStats.agility || 0;
      equipmentBonuses.defense += itemStats.defense || 0;
      equipmentBonuses.health += itemStats.health || 0;
      equipmentBonuses.damage += itemStats.damage || 0;
    });
    const finalStats = {
      strength: baseStats.strength + equipmentBonuses.strength,
      agility: baseStats.agility + equipmentBonuses.agility,
      defense: baseStats.defense + equipmentBonuses.defense,
      health: baseStats.health + equipmentBonuses.health,
      max_health: baseStats.max_health + equipmentBonuses.health
    };
    const response = {
      success: true,
      data: {
        base_stats: baseStats,
        equipment_bonuses: equipmentBonuses,
        final_stats: finalStats,
        equipped_items: equippedItems
      },
      message: "Stats calculados com sucesso!"
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { statsWithEquipment_get as default };
//# sourceMappingURL=stats-with-equipment.get.mjs.map
