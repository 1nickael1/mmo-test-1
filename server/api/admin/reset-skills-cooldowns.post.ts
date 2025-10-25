import type { ApiResponse } from "../../../types";
import { verifyRootToken } from "../../utils/adminAuth";
import db from "../../utils/database";

export default defineEventHandler(async (event) => {
  try {
    console.log("=== ADMIN RESET SKILLS COOLDOWN ENDPOINT ===");

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

    console.log("Admin authenticated:", adminPayload.username);

    const body = await readBody<{
      character_id: number;
    }>(event);

    console.log("Request body:", body);

    const { character_id } = body;

    if (!character_id) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem é obrigatório",
      });
    }

    // Verificar se o personagem existe
    const character = db
      .prepare(
        `
      SELECT * FROM characters 
      WHERE id = ?
    `
      )
      .get(character_id) as any;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Resetar cooldowns de todas as habilidades do personagem
    const result = db
      .prepare(
        `
      UPDATE skills 
      SET last_used = NULL
      WHERE character_id = ?
    `
      )
      .run(character_id);

    console.log("Skills cooldowns reset for character:", character_id);
    console.log("Rows affected:", result.changes);

    // Buscar habilidades atualizadas para retornar
    const updatedSkills = db
      .prepare(
        `
      SELECT skill_name, cooldown_seconds, last_used 
      FROM skills 
      WHERE character_id = ?
    `
      )
      .all(character_id) as any[];

    const response: ApiResponse<{
      character_id: number;
      character_name: string;
      skills_reset: number;
      skills: any[];
    }> = {
      success: true,
      data: {
        character_id: character_id,
        character_name: character.name,
        skills_reset: result.changes || 0,
        skills: updatedSkills,
      },
      message: `Cooldowns de ${
        result.changes || 0
      } habilidades foram resetados para o personagem ${character.name}`,
    };

    return response;
  } catch (error: any) {
    console.error("Error resetting skills cooldowns:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
