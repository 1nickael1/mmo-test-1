import { d as defineEventHandler, a as getHeader, g as getCookie, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
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

const regenerateHealth_post = defineEventHandler(async (event) => {
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
    const body = await readBody(event);
    const { character_id } = body;
    if (!character_id) {
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
    ).get(character_id, payload.id);
    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem n\xE3o encontrado"
      });
    }
    const regenerationUpgrades = db.prepare(
      `
      SELECT * FROM upgrades 
      WHERE character_id = ? AND upgrade_name LIKE 'regeneration_%' AND is_completed = TRUE
    `
    ).all(character_id);
    let regenerationPoints = 10;
    regenerationUpgrades.forEach((upgrade) => {
      regenerationPoints += upgrade.level * 2;
    });
    const characterStats = JSON.parse(character.stats_json);
    const newHealth = Math.min(
      characterStats.max_health,
      characterStats.health + regenerationPoints
    );
    const newStats = { ...characterStats, health: newHealth };
    db.prepare(
      `
      UPDATE characters 
      SET stats_json = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
    ).run(JSON.stringify(newStats), character_id);
    const response = {
      success: true,
      data: {
        health_gained: newHealth - characterStats.health,
        current_health: newHealth,
        max_health: characterStats.max_health
      },
      message: `Vida regenerada em ${regenerationPoints} pontos!`
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { regenerateHealth_post as default };
//# sourceMappingURL=regenerate-health.post.mjs.map
