import { d as defineEventHandler, a as getHeader, g as getCookie, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../_/auth.mjs';
import { d as db } from '../../../_/databaseAdapter.mjs';
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

const start_post = defineEventHandler(async (event) => {
  try {
    let token = extractTokenFromHeader(getHeader(event, "authorization"));
    if (!token) {
      token = getCookie(event, "@mmo/ninja/token");
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
    const { character_id, mining_type } = body;
    if (!character_id || !mining_type) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem e tipo de minera\xE7\xE3o s\xE3o obrigat\xF3rios"
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
    const characterLevel = character.level;
    let rewards = {};
    if (mining_type === "materials") {
      const baseAmount = Math.floor(characterLevel / 5) + 1;
      const randomBonus = Math.floor(Math.random() * 3);
      rewards.materiais = Math.min(baseAmount + randomBonus, 8);
    } else if (mining_type === "crystals") {
      const baseAmount = Math.floor(characterLevel / 10) + 1;
      const randomBonus = Math.random() < 0.5 ? 1 : 0;
      rewards.cristais = Math.min(baseAmount + randomBonus, 3);
    }
    for (const [resourceType, amount] of Object.entries(rewards)) {
      if (amount && amount > 0) {
        const existingResource = db.prepare(
          `
            SELECT * FROM resources 
            WHERE character_id = ? AND resource_type = ?
          `
        ).get(character_id, resourceType);
        if (existingResource) {
          db.prepare(
            `
                UPDATE resources 
                SET amount = amount + ?, updated_at = CURRENT_TIMESTAMP
                WHERE character_id = ? AND resource_type = ?
              `
          ).run(amount, character_id, resourceType);
        } else {
          db.prepare(
            `
                INSERT INTO resources (character_id, resource_type, amount)
                VALUES (?, ?, ?)
              `
          ).run(character_id, resourceType, amount);
        }
      }
    }
    const response = {
      success: true,
      data: {
        rewards,
        mining_type
      },
      message: `Minera\xE7\xE3o de ${mining_type} conclu\xEDda!`
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { start_post as default };
//# sourceMappingURL=start.post.mjs.map
