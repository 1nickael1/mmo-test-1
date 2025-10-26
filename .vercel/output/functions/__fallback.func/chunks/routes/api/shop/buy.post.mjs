import { d as defineEventHandler, a as getHeader, g as getCookie, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../_/auth.mjs';
import { d as db } from '../../../_/databaseAdapter.mjs';
import { f as findShopItemById } from '../../../_/shopItems.mjs';
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

const buy_post = defineEventHandler(async (event) => {
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
    const shopItem = findShopItemById(
      item_id,
      character.level,
      character.class
    );
    if (!shopItem) {
      throw createError({
        statusCode: 404,
        message: "Item n\xE3o encontrado na loja"
      });
    }
    if (character.level < shopItem.level_required) {
      throw createError({
        statusCode: 400,
        message: `N\xEDvel ${shopItem.level_required} necess\xE1rio para comprar este item`
      });
    }
    const goldResource = db.prepare(
      `
      SELECT * FROM resources 
      WHERE character_id = ? AND resource_type = 'ouro'
    `
    ).get(character_id);
    const currentGold = goldResource ? goldResource.amount : 0;
    if (currentGold < shopItem.price) {
      throw createError({
        statusCode: 400,
        message: "Ouro insuficiente"
      });
    }
    if (goldResource) {
      db.prepare(
        `
        UPDATE resources 
        SET amount = amount - ?, updated_at = CURRENT_TIMESTAMP
        WHERE character_id = ? AND resource_type = 'ouro'
      `
      ).run(shopItem.price, character_id);
    }
    if (shopItem.type === "potion") {
      const existingItem = db.prepare(
        `
        SELECT * FROM items 
        WHERE character_id = ? AND item_name = ?
      `
      ).get(character_id, shopItem.name);
      if (existingItem) {
        db.prepare(
          `
          UPDATE items 
          SET quantity = quantity + 1, created_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `
        ).run(existingItem.id);
      } else {
        db.prepare(
          `
          INSERT INTO items (character_id, item_name, item_type, quantity, stats_json)
          VALUES (?, ?, 'potion', 1, ?)
        `
        ).run(character_id, shopItem.name, JSON.stringify({}));
      }
    } else if (shopItem.type === "equipment") {
      db.prepare(
        `
        INSERT INTO equipment (character_id, equipment_name, equipment_type, equipped, stats_json)
        VALUES (?, ?, ?, FALSE, ?)
      `
      ).run(
        character_id,
        shopItem.name,
        shopItem.category.includes("Arma") && !shopItem.category.includes("Armadura") ? "weapon" : shopItem.category.includes("Armadura") || shopItem.category.includes("Armaduras") ? "armor" : "accessory",
        JSON.stringify(shopItem.stats || {})
      );
    }
    const response = {
      success: true,
      data: {
        item_name: shopItem.name,
        price: shopItem.price,
        remaining_gold: currentGold - shopItem.price
      },
      message: `${shopItem.name} comprado com sucesso!`
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { buy_post as default };
//# sourceMappingURL=buy.post.mjs.map
