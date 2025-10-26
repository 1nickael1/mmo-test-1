import { d as defineEventHandler, g as getCookie, a as getHeader, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
import { v as verifyRootToken } from '../../../_/adminAuth.mjs';
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

const updateCharacter_post = defineEventHandler(async (event) => {
  const db = getDatabase();
  try {
    let adminToken = getCookie(event, "admin_token");
    if (!adminToken) {
      const authHeader = getHeader(event, "authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        adminToken = authHeader.substring(7);
      }
    }
    if (!adminToken) {
      throw createError({
        statusCode: 401,
        message: "Token administrativo n\xE3o fornecido"
      });
    }
    const adminPayload = verifyRootToken(adminToken);
    if (!adminPayload) {
      throw createError({
        statusCode: 401,
        message: "Token administrativo inv\xE1lido"
      });
    }
    const body = await readBody(event);
    const { character_id, level, xp, stats } = body;
    if (!character_id) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem \xE9 obrigat\xF3rio"
      });
    }
    const character = db.prepare(
      `
      SELECT * FROM characters 
      WHERE id = ?
    `
    ).get(character_id);
    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem n\xE3o encontrado"
      });
    }
    const updateFields = [];
    const updateValues = [];
    if (level !== void 0) {
      updateFields.push("level = ?");
      updateValues.push(level);
    }
    if (xp !== void 0) {
      updateFields.push("xp = ?");
      updateValues.push(xp);
    }
    if (stats) {
      const currentStats = JSON.parse(character.stats_json || "{}");
      const newStats = { ...currentStats, ...stats };
      updateFields.push("stats_json = ?");
      updateValues.push(JSON.stringify(newStats));
    }
    if (updateFields.length === 0) {
      throw createError({
        statusCode: 400,
        message: "Nenhum campo para atualizar foi fornecido"
      });
    }
    updateValues.push(character_id);
    const updateQuery = `UPDATE characters SET ${updateFields.join(
      ", "
    )} WHERE id = ?`;
    const result = db.prepare(updateQuery).run(...updateValues);
    const updatedCharacter = db.prepare(
      `
      SELECT 
        c.id,
        c.name,
        c.class,
        c.level,
        c.xp,
        c.stats_json,
        c.created_at,
        u.username as user_username
      FROM characters c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `
    ).get(character_id);
    const response = {
      success: true,
      data: {
        character: updatedCharacter
      },
      message: `Personagem ${character.name} atualizado com sucesso`
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { updateCharacter_post as default };
//# sourceMappingURL=update-character.post.mjs.map
