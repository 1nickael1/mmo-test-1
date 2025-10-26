import type { ApiResponse, Resource } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import getDatabase from "../../utils/databaseAdapter";

export default defineEventHandler(async (event) => {
    const db = getDatabase();
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

    const characterId = getQuery(event).character_id;

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

    // Buscar recursos do personagem
    const resources = db
      .prepare(
        `
      SELECT * FROM resources 
      WHERE character_id = ? 
      ORDER BY resource_type
    `
      )
      .all(characterId) as Resource[];

    const response: ApiResponse<Resource[]> = {
      success: true,
      data: resources,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
