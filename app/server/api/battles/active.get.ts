import type { ActiveBattle, ApiResponse } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/database";

export default defineEventHandler(async (event) => {
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

    const characterId = getQuery(event).character_id as string;

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

    // Buscar batalha ativa
    const activeBattle = db
      .prepare(
        `
      SELECT * FROM active_battles 
      WHERE character_id = ?
    `
      )
      .get(characterId) as any;

    if (!activeBattle) {
      const response: ApiResponse<null> = {
        success: true,
        data: null,
        message: "Nenhuma batalha ativa encontrada",
      };
      return response;
    }

    // Parsear dados JSON
    const battleData: ActiveBattle = {
      ...activeBattle,
      opponent_data: JSON.parse(activeBattle.opponent_data),
      battle_data: activeBattle.battle_data
        ? JSON.parse(activeBattle.battle_data)
        : null,
    };

    const response: ApiResponse<ActiveBattle> = {
      success: true,
      data: battleData,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
