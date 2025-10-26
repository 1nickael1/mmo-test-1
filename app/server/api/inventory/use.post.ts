import type { ApiResponse } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/databaseAdapter";

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
      item_id: number;
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

    // Buscar o item
    const item = db
      .prepare(
        `
      SELECT * FROM items 
      WHERE id = ? AND character_id = ?
    `
      )
      .get(item_id, character_id) as any;

    if (!item) {
      throw createError({
        statusCode: 404,
        message: "Item não encontrado",
      });
    }

    if (item.quantity <= 0) {
      throw createError({
        statusCode: 400,
        message: "Item não disponível",
      });
    }

    // Aplicar efeito do item
    const characterStats = JSON.parse(character.stats_json);
    let effectMessage = "";

    // Verificar se é uma poção de cura
    if (item.item_name.includes("Poção de Cura")) {
      let healAmount = 50; // Padrão

      // Determinar quantidade de cura baseada no nome
      if (item.item_name.includes("Pequena")) {
        healAmount = 50;
      } else if (item.item_name.includes("Média")) {
        healAmount = 100;
      } else if (item.item_name.includes("Grande")) {
        healAmount = 200;
      } else if (item.item_name.includes("Superior")) {
        healAmount = 400;
      } else if (item.item_name.includes("Épica")) {
        healAmount = 800;
      } else if (item.item_name.includes("Lendária")) {
        healAmount = 1500;
      } else if (item.item_name.includes("Divina")) {
        healAmount = 3000;
      } else if (item.item_name.includes("Celestial")) {
        healAmount = 5000;
      }

      characterStats.health = Math.min(
        characterStats.max_health,
        characterStats.health + healAmount
      );

      effectMessage = `Você se curou em ${healAmount} pontos de vida!`;
    } else if (item.item_name.includes("Potion de Força")) {
      // Efeito temporário - por simplicidade, vamos apenas curar
      characterStats.health = Math.min(
        characterStats.max_health,
        characterStats.health + 30
      );
      effectMessage = `Você se curou em 30 pontos de vida!`;
    } else {
      throw createError({
        statusCode: 400,
        message: "Item não pode ser usado",
      });
    }

    // Atualizar stats do personagem
    db.prepare(
      `
      UPDATE characters 
      SET stats_json = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
    ).run(JSON.stringify(characterStats), character_id);

    // Reduzir quantidade do item
    if (item.quantity > 1) {
      db.prepare(
        `
        UPDATE items 
        SET quantity = quantity - 1, created_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `
      ).run(item_id);
    } else {
      // Remover item se quantidade for 1
      db.prepare(`DELETE FROM items WHERE id = ?`).run(item_id);
    }

    const response: ApiResponse<{
      effect: string;
      new_health: number;
      max_health: number;
    }> = {
      success: true,
      data: {
        effect: effectMessage,
        new_health: characterStats.health,
        max_health: characterStats.max_health,
      },
      message: "Item usado com sucesso!",
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
