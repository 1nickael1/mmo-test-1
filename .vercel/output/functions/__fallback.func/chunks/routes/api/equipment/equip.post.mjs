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

const equip_post = defineEventHandler(async (event) => {
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
    const { character_id, equipment_id } = body;
    if (!character_id || !equipment_id) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem e equipamento s\xE3o obrigat\xF3rios"
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
    const equipment = db.prepare(
      `
      SELECT * FROM equipment 
      WHERE id = ? AND character_id = ?
    `
    ).get(equipment_id, character_id);
    if (!equipment) {
      throw createError({
        statusCode: 404,
        message: "Equipamento n\xE3o encontrado"
      });
    }
    if (equipment.equipped) {
      db.prepare(
        `
        UPDATE equipment 
        SET equipped = FALSE 
        WHERE id = ?
      `
      ).run(equipment_id);
      const response2 = {
        success: true,
        data: { equipped: false },
        message: `${equipment.equipment_name} desequipado com sucesso!`
      };
      return response2;
    }
    if (equipment.equipment_type === "weapon" || equipment.equipment_type === "armor") {
      db.prepare(
        `
        UPDATE equipment 
        SET equipped = FALSE 
        WHERE character_id = ? AND equipment_type = ? AND id != ?
      `
      ).run(character_id, equipment.equipment_type, equipment_id);
    }
    db.prepare(
      `
      UPDATE equipment 
      SET equipped = TRUE 
      WHERE id = ?
    `
    ).run(equipment_id);
    const response = {
      success: true,
      data: { equipped: true },
      message: `${equipment.equipment_name} equipado com sucesso!`
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { equip_post as default };
//# sourceMappingURL=equip.post.mjs.map
