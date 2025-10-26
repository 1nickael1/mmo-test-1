import type { ApiResponse } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/databaseAdapter";

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    let token = extractTokenFromHeader(authHeader);
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

    const body = await readBody<{ character_id: number }>(event);
    const { character_id } = body;

    if (!character_id) {
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
      .get(character_id, payload.userId) as any;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Buscar melhorias de regeneração do personagem
    const regenerationUpgrades = db
      .prepare(
        `
      SELECT * FROM upgrades 
      WHERE character_id = ? AND upgrade_name LIKE 'regeneration_%' AND is_completed = TRUE
    `
      )
      .all(character_id) as any[];

    // Calcular pontos de regeneração base (10) + melhorias
    let regenerationPoints = 10;
    regenerationUpgrades.forEach((upgrade) => {
      regenerationPoints += upgrade.level * 2; // Cada nível adiciona 2 pontos
    });

    // Aplicar regeneração
    const characterStats = JSON.parse(character.stats_json);
    const newHealth = Math.min(
      characterStats.max_health,
      characterStats.health + regenerationPoints
    );

    // Atualizar vida do personagem
    const newStats = { ...characterStats, health: newHealth };
    db.prepare(
      `
      UPDATE characters 
      SET stats_json = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
    ).run(JSON.stringify(newStats), character_id);

    const response: ApiResponse<{
      health_gained: number;
      current_health: number;
      max_health: number;
    }> = {
      success: true,
      data: {
        health_gained: newHealth - characterStats.health,
        current_health: newHealth,
        max_health: characterStats.max_health,
      },
      message: `Vida regenerada em ${regenerationPoints} pontos!`,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
