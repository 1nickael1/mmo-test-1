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

const use_post = defineEventHandler(async (event) => {
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
    const { character_id, item_id } = body;
    if (!character_id || !item_id) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem e item s\xE3o obrigat\xF3rios"
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
    const item = db.prepare(
      `
      SELECT * FROM items 
      WHERE id = ? AND character_id = ?
    `
    ).get(item_id, character_id);
    if (!item) {
      throw createError({
        statusCode: 404,
        message: "Item n\xE3o encontrado"
      });
    }
    if (item.quantity <= 0) {
      throw createError({
        statusCode: 400,
        message: "Item n\xE3o dispon\xEDvel"
      });
    }
    const characterStats = JSON.parse(character.stats_json);
    let effectMessage = "";
    if (item.item_name.includes("Po\xE7\xE3o de Cura")) {
      let healAmount = 50;
      if (item.item_name.includes("Pequena")) {
        healAmount = 50;
      } else if (item.item_name.includes("M\xE9dia")) {
        healAmount = 100;
      } else if (item.item_name.includes("Grande")) {
        healAmount = 200;
      } else if (item.item_name.includes("Superior")) {
        healAmount = 400;
      } else if (item.item_name.includes("\xC9pica")) {
        healAmount = 800;
      } else if (item.item_name.includes("Lend\xE1ria")) {
        healAmount = 1500;
      } else if (item.item_name.includes("Divina")) {
        healAmount = 3e3;
      } else if (item.item_name.includes("Celestial")) {
        healAmount = 5e3;
      }
      characterStats.health = Math.min(
        characterStats.max_health,
        characterStats.health + healAmount
      );
      effectMessage = `Voc\xEA se curou em ${healAmount} pontos de vida!`;
    } else if (item.item_name.includes("Potion de For\xE7a")) {
      characterStats.health = Math.min(
        characterStats.max_health,
        characterStats.health + 30
      );
      effectMessage = `Voc\xEA se curou em 30 pontos de vida!`;
    } else {
      throw createError({
        statusCode: 400,
        message: "Item n\xE3o pode ser usado"
      });
    }
    db.prepare(
      `
      UPDATE characters 
      SET stats_json = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
    ).run(JSON.stringify(characterStats), character_id);
    if (item.quantity > 1) {
      db.prepare(
        `
        UPDATE items 
        SET quantity = quantity - 1, created_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `
      ).run(item_id);
    } else {
      db.prepare(`DELETE FROM items WHERE id = ?`).run(item_id);
    }
    const response = {
      success: true,
      data: {
        effect: effectMessage,
        new_health: characterStats.health,
        max_health: characterStats.max_health
      },
      message: "Item usado com sucesso!"
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { use_post as default };
//# sourceMappingURL=use.post.mjs.map
