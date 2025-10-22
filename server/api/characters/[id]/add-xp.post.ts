import type { ApiResponse, Character } from "../../../../types";
import { extractTokenFromHeader, verifyToken } from "../../../utils/auth";
import db from "../../../utils/database";

// Função para calcular XP necessário para o próximo nível (curva balanceada até nível 50)
function calculateXpForNextLevel(level: number): number {
  if (level <= 10) {
    // Níveis 1-10: crescimento linear suave
    return 1000 + (level - 1) * 500;
  } else if (level <= 20) {
    // Níveis 11-20: crescimento exponencial moderado
    return Math.floor(5500 + Math.pow(level - 10, 1.8) * 1000);
  } else if (level <= 30) {
    // Níveis 21-30: crescimento exponencial mais acentuado
    return Math.floor(15000 + Math.pow(level - 20, 2.2) * 2000);
  } else if (level <= 40) {
    // Níveis 31-40: crescimento exponencial forte
    return Math.floor(50000 + Math.pow(level - 30, 2.5) * 5000);
  } else {
    // Níveis 41-50: crescimento exponencial muito forte
    return Math.floor(150000 + Math.pow(level - 40, 3) * 10000);
  }
}

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    const token = extractTokenFromHeader(authHeader);

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

    const characterId = getRouterParam(event, "id");
    const body = await readBody<{ xp: number }>(event);
    const { xp } = body;

    if (!characterId || !xp) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem e XP são obrigatórios",
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
      .get(characterId, payload.userId) as Character;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Adicionar XP
    const newXp = character.xp + xp;
    const stats = JSON.parse(character.stats_json);

    // Verificar level up
    let newLevel = character.level;
    let newStats = stats;

    while (newXp >= calculateXpForNextLevel(newLevel)) {
      newLevel++;
      newStats = {
        ...newStats,
        strength: newStats.strength + 1,
        agility: newStats.agility + 1,
        defense: newStats.defense + 1,
        health: newStats.health + 10,
        max_health: newStats.max_health + 10,
      };
    }

    // Atualizar personagem no banco
    db.prepare(
      `
      UPDATE characters 
      SET xp = ?, level = ?, stats_json = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
    ).run(newXp, newLevel, JSON.stringify(newStats), characterId);

    // Buscar personagem atualizado
    const updatedCharacter = db
      .prepare("SELECT * FROM characters WHERE id = ?")
      .get(characterId) as Character;

    const response: ApiResponse<Character> = {
      success: true,
      data: {
        ...updatedCharacter,
        stats: newStats,
      },
      message:
        newLevel > character.level
          ? `Level up! Agora você é nível ${newLevel}`
          : "XP adicionado com sucesso",
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
