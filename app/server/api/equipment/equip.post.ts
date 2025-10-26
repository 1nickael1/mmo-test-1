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
      equipment_id: number;
    }>(event);

    const { character_id, equipment_id } = body;

    if (!character_id || !equipment_id) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem e equipamento são obrigatórios",
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

    // Buscar o equipamento
    const equipment = db
      .prepare(
        `
      SELECT * FROM equipment 
      WHERE id = ? AND character_id = ?
    `
      )
      .get(equipment_id, character_id) as any;

    if (!equipment) {
      throw createError({
        statusCode: 404,
        message: "Equipamento não encontrado",
      });
    }

    // Se o equipamento já está equipado, desequipar
    if (equipment.equipped) {
      db.prepare(
        `
        UPDATE equipment 
        SET equipped = FALSE 
        WHERE id = ?
      `
      ).run(equipment_id);

      const response: ApiResponse<{ equipped: boolean }> = {
        success: true,
        data: { equipped: false },
        message: `${equipment.equipment_name} desequipado com sucesso!`,
      };

      return response;
    }

    // Desequipar outros equipamentos do mesmo tipo (apenas para weapon e armor)
    if (
      equipment.equipment_type === "weapon" ||
      equipment.equipment_type === "armor"
    ) {
      db.prepare(
        `
        UPDATE equipment 
        SET equipped = FALSE 
        WHERE character_id = ? AND equipment_type = ? AND id != ?
      `
      ).run(character_id, equipment.equipment_type, equipment_id);
    }
    // Para accessories, não desequipar outros (permitir múltiplos acessórios)

    // Equipar o novo equipamento
    db.prepare(
      `
      UPDATE equipment 
      SET equipped = TRUE 
      WHERE id = ?
    `
    ).run(equipment_id);

    const response: ApiResponse<{ equipped: boolean }> = {
      success: true,
      data: { equipped: true },
      message: `${equipment.equipment_name} equipado com sucesso!`,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
