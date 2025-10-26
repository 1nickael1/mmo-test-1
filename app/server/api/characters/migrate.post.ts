import type { ApiResponse } from "../../../types";
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

    // Buscar todos os personagens do usuário (incluindo os que podem ter sido "perdidos")
    const allCharacters = db
      .prepare(
        `
        SELECT * FROM characters 
        WHERE user_id = ? 
        ORDER BY created_at DESC
      `
      )
      .all(payload.id);

    // Verificar se há personagens órfãos (sem user_id correto)
    const orphanedCharacters = db
      .prepare(
        `
        SELECT * FROM characters 
        WHERE user_id IS NULL OR user_id = 0
        ORDER BY created_at DESC
      `
      )
      .all();

    // Se houver personagens órfãos, tentar associá-los ao usuário atual
    let migratedCount = 0;
    if (orphanedCharacters.length > 0) {
      for (const character of orphanedCharacters) {
        // Verificar se o personagem pode ser migrado (baseado em nome ou outras características)
        // Por enquanto, vamos migrar todos os órfãos para o usuário atual
        try {
          db.prepare(
            `
            UPDATE characters 
            SET user_id = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
          `
          ).run(payload.id, character.id);

          migratedCount++;
        } catch (error) {
          // Log de erro silencioso para produção
        }
      }
    }

    // Buscar personagens atualizados após migração
    const updatedCharacters = db
      .prepare(
        `
        SELECT * FROM characters 
        WHERE user_id = ? 
        ORDER BY created_at DESC
      `
      )
      .all(payload.id);

    // Parsear stats JSON
    const charactersWithStats = updatedCharacters.map((char: any) => ({
      ...char,
      stats: JSON.parse(
        char.stats_json ||
          '{"strength":5,"agility":5,"defense":5,"health":100,"max_health":100}'
      ),
    }));

    const response: ApiResponse<{
      characters: any[];
      migratedCount: number;
      message: string;
    }> = {
      success: true,
      data: {
        characters: charactersWithStats,
        migratedCount,
        message:
          migratedCount > 0
            ? `${migratedCount} personagem(s) migrado(s) com sucesso!`
            : "Nenhuma migração necessária. Todos os personagens estão acessíveis.",
      },
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor durante migração",
    });
  }
});
