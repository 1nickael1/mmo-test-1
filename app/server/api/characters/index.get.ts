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

    // Buscar personagens do usuário
    const characters = db
      .prepare(
        `
      SELECT * FROM characters 
      WHERE user_id = ? 
      ORDER BY created_at DESC
    `
      )
      .all(payload.userId) as Character[];

    // Parsear stats JSON
    const charactersWithStats = characters.map((char) => ({
      ...char,
      stats: JSON.parse(char.stats_json),
    }));

    const response: ApiResponse<Character[]> = {
      success: true,
      data: charactersWithStats,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
