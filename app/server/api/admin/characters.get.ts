import type { ApiResponse } from "../../../types";
import { verifyRootToken } from "../../utils/adminAuth";
import getDatabase from "../../utils/databaseAdapter";

export default defineEventHandler(async (event) => {
    const db = getDatabase();
  try {
    // Verificar token administrativo
    let adminToken = getCookie(event, "admin_token");

    if (!adminToken) {
      const authHeader = getHeader(event, "authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        adminToken = authHeader.substring(7);
      }
    }

    if (!adminToken) {
      throw createError({
        statusCode: 401,
        message: "Token administrativo não fornecido",
      });
    }

    const adminPayload = verifyRootToken(adminToken);
    if (!adminPayload) {
      throw createError({
        statusCode: 401,
        message: "Token administrativo inválido",
      });
    }

    // Buscar todos os personagens com informações do usuário
    const characters = db
      .prepare(
        `
      SELECT 
        c.id,
        c.name,
        c.class,
        c.level,
        c.xp,
        c.stats_json,
        c.created_at,
        u.username as user_username,
        u.email as user_email
      FROM characters c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.created_at DESC
    `
      )
      .all() as any[];

    const response: ApiResponse<{
      characters: any[];
    }> = {
      success: true,
      data: {
        characters,
      },
      message: `${characters.length} personagens encontrados`,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
