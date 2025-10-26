import { d as defineEventHandler, a as getHeader, g as getCookie, c as createError } from '../../nitro/nitro.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../_/auth.mjs';
import { g as getDatabase } from '../../_/databaseAdapter.mjs';
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

const index_get = defineEventHandler(async (event) => {
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
    let characters = db.prepare(
      `
      SELECT * FROM characters 
      WHERE user_id = ? 
      ORDER BY created_at DESC
    `
    ).all(payload.id);
    if (characters.length === 0) {
      const orphanedCharacters = db.prepare(
        `
          SELECT * FROM characters 
          WHERE user_id IS NULL OR user_id = 0
          ORDER BY created_at DESC
        `
      ).all();
      if (orphanedCharacters.length > 0) {
        for (const character of orphanedCharacters) {
          try {
            db.prepare(
              `
              UPDATE characters 
              SET user_id = ?, updated_at = CURRENT_TIMESTAMP
              WHERE id = ?
            `
            ).run(payload.id, character.id);
          } catch (error) {
          }
        }
        characters = db.prepare(
          `
            SELECT * FROM characters 
            WHERE user_id = ? 
            ORDER BY created_at DESC
          `
        ).all(payload.id);
      }
    }
    const charactersWithStats = characters.map((char) => ({
      ...char,
      stats: JSON.parse(char.stats_json)
    }));
    const response = {
      success: true,
      data: charactersWithStats
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
