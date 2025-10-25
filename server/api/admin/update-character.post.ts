import type { ApiResponse } from "../../../types";
import { verifyRootToken } from "../../utils/adminAuth";
import db from "../../utils/database";

export default defineEventHandler(async (event) => {
  try {
    console.log("=== ADMIN UPDATE CHARACTER ENDPOINT ===");

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
      level?: number;
      xp?: number;
      stats?: {
        health?: number;
        max_health?: number;
        strength?: number;
        agility?: number;
        defense?: number;
      };
    }>(event);

    console.log("Request body:", body);

    const { character_id, level, xp, stats } = body;

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

    // Preparar dados para atualização
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    if (level !== undefined) {
      updateFields.push("level = ?");
      updateValues.push(level);
    }

    if (xp !== undefined) {
      updateFields.push("xp = ?");
      updateValues.push(xp);
    }

    if (stats) {
      const currentStats = JSON.parse(character.stats_json || "{}");
      const newStats = { ...currentStats, ...stats };
      updateFields.push("stats_json = ?");
      updateValues.push(JSON.stringify(newStats));
    }

    if (updateFields.length === 0) {
      throw createError({
        statusCode: 400,
        message: "Nenhum campo para atualizar foi fornecido",
      });
    }

    // Executar atualização
    updateValues.push(character_id);
    const updateQuery = `UPDATE characters SET ${updateFields.join(
      ", "
    )} WHERE id = ?`;

    const result = db.prepare(updateQuery).run(...updateValues);

    console.log("Character updated:", character_id);
    console.log("Rows affected:", result.changes);

    // Buscar personagem atualizado
    const updatedCharacter = db
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
        u.username as user_username
      FROM characters c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `
      )
      .get(character_id) as any;

    const response: ApiResponse<{
      character: any;
    }> = {
      success: true,
      data: {
        character: updatedCharacter,
      },
      message: `Personagem ${character.name} atualizado com sucesso`,
    };

    return response;
  } catch (error: any) {
    console.error("Error updating character:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
