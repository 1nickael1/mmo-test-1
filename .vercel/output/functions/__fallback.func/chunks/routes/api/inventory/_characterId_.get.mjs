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

const _characterId__get = defineEventHandler(async (event) => {
  const db = getDatabase();
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
    const items = db.prepare(
      `
      SELECT * FROM items 
      WHERE character_id = ? 
      ORDER BY item_type, item_name
    `
    ).all(characterId);
    const response = {
      success: true,
      data: items
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
