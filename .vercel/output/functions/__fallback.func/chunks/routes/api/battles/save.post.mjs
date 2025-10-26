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

const save_post = defineEventHandler(async (event) => {
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
    const body = await readBody(event);
    const {
      character_id,
      battle_type,
      opponent_data,
      character_health,
      opponent_health,
      battle_turn,
      battle_data
    } = body;
    if (!character_id || !battle_type || !opponent_data || character_health === void 0 || opponent_health === void 0) {
      throw createError({
        statusCode: 400,
        message: "Dados da batalha s\xE3o obrigat\xF3rios"
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
    const existingBattle = db.prepare(
      `
      SELECT * FROM active_battles 
      WHERE character_id = ?
    `
    ).get(character_id);
    if (existingBattle) {
      db.prepare(
        `
        UPDATE active_battles 
        SET battle_type = ?, opponent_data = ?, character_health = ?, 
            opponent_health = ?, battle_turn = ?, battle_data = ?, 
            updated_at = CURRENT_TIMESTAMP
        WHERE character_id = ?
      `
      ).run(
        battle_type,
        JSON.stringify(opponent_data),
        character_health,
        opponent_health,
        battle_turn,
        JSON.stringify(battle_data || {}),
        character_id
      );
    } else {
      db.prepare(
        `
        INSERT INTO active_battles (character_id, battle_type, opponent_data, 
                                  character_health, opponent_health, battle_turn, battle_data)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `
      ).run(
        character_id,
        battle_type,
        JSON.stringify(opponent_data),
        character_health,
        opponent_health,
        battle_turn,
        JSON.stringify(battle_data || {})
      );
    }
    const response = {
      success: true,
      data: { saved: true },
      message: "Batalha salva com sucesso!"
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { save_post as default };
//# sourceMappingURL=save.post.mjs.map
