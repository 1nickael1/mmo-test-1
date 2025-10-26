import { d as defineEventHandler, a as getHeader, g as getCookie, c as createError, e as getQuery } from '../../../nitro/nitro.mjs';
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

const active_get = defineEventHandler(async (event) => {
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
    const characterId = getQuery(event).character_id;
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
    const activeBattle = db.prepare(
      `
      SELECT * FROM active_battles 
      WHERE character_id = ?
    `
    ).get(characterId);
    if (!activeBattle) {
      const response2 = {
        success: true,
        data: null,
        message: "Nenhuma batalha ativa encontrada"
      };
      return response2;
    }
    const battleData = {
      ...activeBattle,
      opponent_data: JSON.parse(activeBattle.opponent_data),
      battle_data: activeBattle.battle_data ? JSON.parse(activeBattle.battle_data) : null
    };
    const response = {
      success: true,
      data: battleData
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { active_get as default };
//# sourceMappingURL=active.get.mjs.map
