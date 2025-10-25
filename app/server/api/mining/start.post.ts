import type { ApiResponse } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/database";

export default defineEventHandler(async (event) => {
  try {
    let token = extractTokenFromHeader(getHeader(event, "authorization"));

    if (!token) {
      token = getCookie(event, "token"); // Try to get token from cookie
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
      mining_type: "materials" | "crystals";
    }>(event);

    const { character_id, mining_type } = body;

    if (!character_id || !mining_type) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem e tipo de mineração são obrigatórios",
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

    // Calcular recompensas baseadas no nível do personagem
    const characterLevel = character.level;
    let rewards: { materiais?: number; cristais?: number } = {};

    if (mining_type === "materials") {
      // Materiais: 1-5 baseado no nível
      const baseAmount = Math.floor(characterLevel / 5) + 1;
      const randomBonus = Math.floor(Math.random() * 3);
      rewards.materiais = Math.min(baseAmount + randomBonus, 8);
    } else if (mining_type === "crystals") {
      // Cristais: mais raros, 1-2 baseado no nível
      const baseAmount = Math.floor(characterLevel / 10) + 1;
      const randomBonus = Math.random() < 0.5 ? 1 : 0;
      rewards.cristais = Math.min(baseAmount + randomBonus, 3);
    }

    // Adicionar recursos ao personagem
    for (const [resourceType, amount] of Object.entries(rewards)) {
      if (amount && amount > 0) {
        const existingResource = db
          .prepare(
            `
            SELECT * FROM resources 
            WHERE character_id = ? AND resource_type = ?
          `
          )
          .get(character_id, resourceType);

        if (existingResource) {
          db.prepare(
            `
                UPDATE resources 
                SET amount = amount + ?, updated_at = CURRENT_TIMESTAMP
                WHERE character_id = ? AND resource_type = ?
              `
          ).run(amount, character_id, resourceType);
        } else {
          db.prepare(
            `
                INSERT INTO resources (character_id, resource_type, amount)
                VALUES (?, ?, ?)
              `
          ).run(character_id, resourceType, amount);
        }
      }
    }

    const response: ApiResponse<{
      rewards: typeof rewards;
      mining_type: string;
    }> = {
      success: true,
      data: {
        rewards,
        mining_type,
      },
      message: `Mineração de ${mining_type} concluída!`,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
