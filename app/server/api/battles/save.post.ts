import type { ApiResponse } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import getDatabase from "../../utils/databaseAdapter";

export default defineEventHandler(async (event) => {
    const db = getDatabase();
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

    const body = await readBody<{
      character_id: number;
      battle_type: "normal" | "story";
      opponent_data: any;
      character_health: number;
      opponent_health: number;
      battle_turn: number;
      battle_data?: any;
    }>(event);

    const {
      character_id,
      battle_type,
      opponent_data,
      character_health,
      opponent_health,
      battle_turn,
      battle_data,
    } = body;

    if (
      !character_id ||
      !battle_type ||
      !opponent_data ||
      character_health === undefined ||
      opponent_health === undefined
    ) {
      throw createError({
        statusCode: 400,
        message: "Dados da batalha são obrigatórios",
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
      .get(character_id, payload.id) as any;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Verificar se já existe uma batalha ativa para este personagem
    const existingBattle = db
      .prepare(
        `
      SELECT * FROM active_battles 
      WHERE character_id = ?
    `
      )
      .get(character_id) as any;

    if (existingBattle) {
      // Atualizar batalha existente
      db.prepare(
        `
        UPDATE active_battles 
        SET battle_type = ?, opponent_data = ?, character_health = ?, 
            opponent_health = ?, battle_turn = ?, battle_data = ?, 
            updated_at = CURRENT_TIMESTAMP
        WHERE character_id = ?
      `
      ).run(
        battle_type,
        JSON.stringify(opponent_data),
        character_health,
        opponent_health,
        battle_turn,
        JSON.stringify(battle_data || {}),
        character_id
      );
    } else {
      // Criar nova batalha ativa
      db.prepare(
        `
        INSERT INTO active_battles (character_id, battle_type, opponent_data, 
                                  character_health, opponent_health, battle_turn, battle_data)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `
      ).run(
        character_id,
        battle_type,
        JSON.stringify(opponent_data),
        character_health,
        opponent_health,
        battle_turn,
        JSON.stringify(battle_data || {})
      );
    }

    const response: ApiResponse<{ saved: boolean }> = {
      success: true,
      data: { saved: true },
      message: "Batalha salva com sucesso!",
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
