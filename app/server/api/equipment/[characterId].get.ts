import type { ApiResponse, Equipment } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/database";

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

    const characterId = getRouterParam(event, "characterId");

    if (!characterId) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem é obrigatório",
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
      .get(characterId, payload.id) as any;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Buscar equipamentos do personagem
    const equipment = db
      .prepare(
        `
      SELECT * FROM equipment 
      WHERE character_id = ? 
      ORDER BY equipment_type, created_at DESC
    `
      )
      .all(characterId) as Equipment[];

    // Parsear stats JSON
    const equipmentWithStats = equipment.map((eq: any) => ({
      ...eq,
      stats: JSON.parse(eq.stats_json),
    }));

    const response: ApiResponse<Equipment[]> = {
      success: true,
      data: equipmentWithStats,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
