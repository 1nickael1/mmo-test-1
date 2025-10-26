import type { ApiResponse, Resource } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import getDatabase from "../../utils/databaseAdapter";

export default defineEventHandler(async (event) => {
    const db = getDatabase();
  try {
    const authHeader = getHeader(event, "authorization");
    let token = extractTokenFromHeader(authHeader);
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
      .get(characterId, payload.id);

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

    // Garantir que todos os tipos de recursos existam
    const resourceTypes = ["ouro", "cristais", "materiais"];
    const existingTypes = resources.map((r) => r.resource_type);

    for (const type of resourceTypes) {
      if (!existingTypes.includes(type)) {
        db.prepare(
          `
          INSERT INTO resources (character_id, resource_type, amount)
          VALUES (?, ?, 0)
        `
        ).run(characterId, type as "ouro" | "cristais" | "materiais");
      }
    }

    // Buscar recursos atualizados
    const updatedResources = db
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
      data: updatedResources,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
