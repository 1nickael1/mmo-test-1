import type { ApiResponse } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/database";
import { findShopItemById } from "../../utils/shopItems";

export default defineEventHandler(async (event) => {
  try {
    let token = extractTokenFromHeader(getHeader(event, "authorization"));

    if (!token) {
      token = getCookie(event, "@mmo/ninja/token"); // Try to get token from cookie
    }

    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Token de autenticação não fornecido",
      });
    }

    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        message: "Token inválido",
      });
    }

    const body = await readBody<{
      character_id: number;
      item_id: string;
    }>(event);

    const { character_id, item_id } = body;

    if (!character_id || !item_id) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem e item são obrigatórios",
      });
    }

    // Verificar se o personagem pertence ao usuário
    const character = db
      .prepare(
        `
      SELECT * FROM characters 
      WHERE id = ? AND user_id = ?
    `
      )
      .get(character_id, payload.id) as any;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Buscar o item na loja usando a função compartilhada
    const shopItem = findShopItemById(
      item_id,
      character.level,
      character.class
    );
    if (!shopItem) {
      throw createError({
        statusCode: 404,
        message: "Item não encontrado na loja",
      });
    }

    // Verificar se o personagem tem nível suficiente
    if (character.level < shopItem.level_required) {
      throw createError({
        statusCode: 400,
        message: `Nível ${shopItem.level_required} necessário para comprar este item`,
      });
    }

    // Verificar se tem ouro suficiente
    const goldResource = db
      .prepare(
        `
      SELECT * FROM resources 
      WHERE character_id = ? AND resource_type = 'ouro'
    `
      )
      .get(character_id) as any;

    const currentGold = goldResource ? goldResource.amount : 0;
    if (currentGold < shopItem.price) {
      throw createError({
        statusCode: 400,
        message: "Ouro insuficiente",
      });
    }

    // Deduzir ouro
    if (goldResource) {
      db.prepare(
        `
        UPDATE resources 
        SET amount = amount - ?, updated_at = CURRENT_TIMESTAMP
        WHERE character_id = ? AND resource_type = 'ouro'
      `
      ).run(shopItem.price, character_id);
    }

    // Adicionar item ao inventário ou equipamento
    if (shopItem.type === "potion") {
      // Verificar se já existe no inventário
      const existingItem = db
        .prepare(
          `
        SELECT * FROM items 
        WHERE character_id = ? AND item_name = ?
      `
        )
        .get(character_id, shopItem.name);

      if (existingItem) {
        // Incrementar quantidade
        db.prepare(
          `
          UPDATE items 
          SET quantity = quantity + 1, created_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `
        ).run((existingItem as any).id);
      } else {
        // Criar novo item
        db.prepare(
          `
          INSERT INTO items (character_id, item_name, item_type, quantity, stats_json)
          VALUES (?, ?, 'potion', 1, ?)
        `
        ).run(character_id, shopItem.name, JSON.stringify({}));
      }
    } else if (shopItem.type === "equipment") {
      // Adicionar equipamento
      db.prepare(
        `
        INSERT INTO equipment (character_id, equipment_name, equipment_type, equipped, stats_json)
        VALUES (?, ?, ?, FALSE, ?)
      `
      ).run(
        character_id,
        shopItem.name,
        shopItem.category.includes("Arma") &&
          !shopItem.category.includes("Armadura")
          ? "weapon"
          : shopItem.category.includes("Armadura") ||
            shopItem.category.includes("Armaduras")
          ? "armor"
          : "accessory",
        JSON.stringify(shopItem.stats || {})
      );
    }

    const response: ApiResponse<{
      item_name: string;
      price: number;
      remaining_gold: number;
    }> = {
      success: true,
      data: {
        item_name: shopItem.name,
        price: shopItem.price,
        remaining_gold: currentGold - shopItem.price,
      },
      message: `${shopItem.name} comprado com sucesso!`,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
