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

const _id__get = defineEventHandler(async (event) => {
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
    const characterWithStats = {
      ...character,
      stats: JSON.parse(character.stats_json)
    };
    const response = {
      success: true,
      data: characterWithStats
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
