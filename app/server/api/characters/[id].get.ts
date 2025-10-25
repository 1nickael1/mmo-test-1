import type { ApiResponse, Character } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/database";

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    let token = extractTokenFromHeader(authHeader);
    // Fallback: usa cookie "token" se não houver Authorization header
    if (!token) {
      const cookieToken = getCookie(event, "token");
      token = cookieToken || null;
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

    const characterId = getRouterParam(event, "id");
    if (!characterId) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem é obrigatório",
      });
    }

    // Buscar personagem específico
    const character = db
      .prepare(
        `
      SELECT * FROM characters 
      WHERE id = ? AND user_id = ?
    `
      )
      .get(characterId, payload.id) as Character;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Parsear stats JSON
    const characterWithStats = {
      ...character,
      stats: JSON.parse(character.stats_json),
    };

    const response: ApiResponse<Character> = {
      success: true,
      data: characterWithStats,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
