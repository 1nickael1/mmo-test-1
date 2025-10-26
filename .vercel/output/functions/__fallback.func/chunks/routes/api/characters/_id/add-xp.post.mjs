import { d as defineEventHandler, f as getRouterParam, r as readBody, c as createError, g as getCookie } from '../../../../nitro/nitro.mjs';
import { v as verifyToken } from '../../../../_/auth.mjs';
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

const addXp_post = defineEventHandler(async (event) => {
  const db = getDatabase();
  try {
    const characterId = getRouterParam(event, "id");
    const body = await readBody(event);
    const { xp } = body;
    if (!characterId || !xp || xp <= 0) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem e XP v\xE1lido s\xE3o obrigat\xF3rios"
      });
    }
    const token = getCookie(event, "@mmo/ninja/token");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Token de autentica\xE7\xE3o n\xE3o encontrado"
      });
    }
    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        message: "Token inv\xE1lido"
      });
    }
    const character = db.prepare("SELECT * FROM characters WHERE id = ? AND user_id = ?").get(characterId, payload.id);
    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem n\xE3o encontrado"
      });
    }
    const getXpForLevel = (level) => {
      if (level <= 10) {
        return 1e3 + (level - 1) * 500;
      } else if (level <= 20) {
        return Math.floor(5500 + Math.pow(level - 10, 1.8) * 1e3);
      } else if (level <= 30) {
        return Math.floor(15e3 + Math.pow(level - 20, 2.2) * 2e3);
      } else if (level <= 40) {
        return Math.floor(5e4 + Math.pow(level - 30, 2.5) * 5e3);
      } else {
        return Math.floor(15e4 + Math.pow(level - 40, 3) * 1e4);
      }
    };
    const newXp = character.xp + xp;
    let newLevel = character.level;
    let levelUps = 0;
    while (newLevel < 50 && newXp >= getXpForLevel(newLevel)) {
      newLevel++;
      levelUps++;
    }
    let newStats = JSON.parse(character.stats_json);
    if (levelUps > 0) {
      newStats.strength += levelUps;
      newStats.agility += levelUps;
      newStats.defense += levelUps;
      newStats.health += levelUps * 10;
      newStats.max_health += levelUps * 10;
      newStats.health = newStats.max_health;
    }
    const updateStmt = db.prepare(`
      UPDATE characters 
      SET xp = ?, level = ?, stats_json = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    updateStmt.run(newXp, newLevel, JSON.stringify(newStats), characterId);
    const updatedCharacter = db.prepare("SELECT * FROM characters WHERE id = ?").get(characterId);
    const characterData = {
      id: updatedCharacter.id,
      user_id: updatedCharacter.user_id,
      name: updatedCharacter.name,
      class: updatedCharacter.class,
      level: updatedCharacter.level,
      xp: updatedCharacter.xp,
      stats: newStats,
      created_at: updatedCharacter.created_at,
      updated_at: updatedCharacter.updated_at
    };
    const response = {
      success: true,
      data: characterData,
      message: levelUps > 0 ? `Parab\xE9ns! Voc\xEA subiu ${levelUps} n\xEDvel(is)!` : "XP adicionado com sucesso!"
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { addXp_post as default };
//# sourceMappingURL=add-xp.post.mjs.map
