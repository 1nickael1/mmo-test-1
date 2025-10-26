import { d as defineEventHandler, a as getHeader, g as getCookie, c as createError } from '../../../nitro/nitro.mjs';
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

const migrate_post = defineEventHandler(async (event) => {
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
    const allCharacters = db.prepare(
      `
        SELECT * FROM characters 
        WHERE user_id = ? 
        ORDER BY created_at DESC
      `
    ).all(payload.id);
    const orphanedCharacters = db.prepare(
      `
        SELECT * FROM characters 
        WHERE user_id IS NULL OR user_id = 0
        ORDER BY created_at DESC
      `
    ).all();
    let migratedCount = 0;
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
          migratedCount++;
        } catch (error) {
        }
      }
    }
    const updatedCharacters = db.prepare(
      `
        SELECT * FROM characters 
        WHERE user_id = ? 
        ORDER BY created_at DESC
      `
    ).all(payload.id);
    const charactersWithStats = updatedCharacters.map((char) => ({
      ...char,
      stats: JSON.parse(
        char.stats_json || '{"strength":5,"agility":5,"defense":5,"health":100,"max_health":100}'
      )
    }));
    const response = {
      success: true,
      data: {
        characters: charactersWithStats,
        migratedCount,
        message: migratedCount > 0 ? `${migratedCount} personagem(s) migrado(s) com sucesso!` : "Nenhuma migra\xE7\xE3o necess\xE1ria. Todos os personagens est\xE3o acess\xEDveis."
      }
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor durante migra\xE7\xE3o"
    });
  }
});

export { migrate_post as default };
//# sourceMappingURL=migrate.post.mjs.map
