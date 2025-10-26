import type { ApiResponse, Character } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/database";

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    let token = extractTokenFromHeader(authHeader);
    // Fallback: usa cookie "token" se não houver Authorization header
    if (!token) {
      const cookieToken = getCookie(event, "@mmo/ninja/token");
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
    let characters = db
      .prepare(
        `
      SELECT * FROM characters 
      WHERE user_id = ? 
      ORDER BY created_at DESC
    `
      )
      .all(payload.id) as Character[];

    // Se não encontrou personagens, tentar migração automática
    if (characters.length === 0) {
      // Buscar personagens órfãos que podem pertencer ao usuário
      const orphanedCharacters = db
        .prepare(
          `
          SELECT * FROM characters 
          WHERE user_id IS NULL OR user_id = 0
          ORDER BY created_at DESC
        `
        )
        .all();

      if (orphanedCharacters.length > 0) {
        // Migrar todos os órfãos para o usuário atual
        for (const character of orphanedCharacters) {
          try {
            db.prepare(
              `
              UPDATE characters 
              SET user_id = ?, updated_at = CURRENT_TIMESTAMP
              WHERE id = ?
            `
            ).run(payload.id, character.id);
          } catch (error) {
            // Log de erro silencioso para produção
          }
        }

        // Buscar personagens novamente após migração
        characters = db
          .prepare(
            `
            SELECT * FROM characters 
            WHERE user_id = ? 
            ORDER BY created_at DESC
          `
          )
          .all(payload.id) as Character[];
      }
    }

    // Parsear stats JSON
    const charactersWithStats = characters.map((char: any) => ({
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
