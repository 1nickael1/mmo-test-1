import type { ApiResponse, BattleRequest, NPC } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import { calculateCharacterStatsWithEquipment } from "../../utils/characterStats";
import db from "../../utils/databaseAdapter";

// NPCs disponíveis (mesmo do opponents.get.ts)
const NPC_OPPONENTS: Record<string, NPC> = {
  bandit_1: {
    id: "bandit_1",
    name: "Bandido Espacial",
    level: 1,
    stats: {
      strength: 6,
      agility: 5,
      defense: 4,
      health: 60,
      max_health: 60,
    },
    xp_reward: 100,
    gold_reward: 50,
    difficulty: "easy",
  },
  pirate_1: {
    id: "pirate_1",
    name: "Pirata Espacial",
    level: 2,
    stats: {
      strength: 8,
      agility: 6,
      defense: 5,
      health: 80,
      max_health: 80,
    },
    xp_reward: 150,
    gold_reward: 75,
    difficulty: "easy",
  },
  cyborg_1: {
    id: "cyborg_1",
    name: "Ciborgue Rebelde",
    level: 3,
    stats: {
      strength: 10,
      agility: 7,
      defense: 8,
      health: 100,
      max_health: 100,
    },
    xp_reward: 250,
    gold_reward: 120,
    difficulty: "medium",
  },
  alien_1: {
    id: "alien_1",
    name: "Alienígena Hostil",
    level: 4,
    stats: {
      strength: 12,
      agility: 9,
      defense: 7,
      health: 120,
      max_health: 120,
    },
    xp_reward: 300,
    gold_reward: 150,
    difficulty: "medium",
  },
  boss_1: {
    id: "boss_1",
    name: "Lorde das Sombras",
    level: 5,
    stats: {
      strength: 15,
      agility: 10,
      defense: 12,
      health: 200,
      max_health: 200,
    },
    xp_reward: 500,
    gold_reward: 300,
    difficulty: "hard",
  },
  boss_2: {
    id: "boss_2",
    name: "Imperador Espacial",
    level: 6,
    stats: {
      strength: 18,
      agility: 12,
      defense: 15,
      health: 250,
      max_health: 250,
    },
    xp_reward: 750,
    gold_reward: 500,
    difficulty: "hard",
  },
};

export default defineEventHandler(async (event) => {
  try {
    let token = extractTokenFromHeader(getHeader(event, "authorization"));

    if (!token) {
      token = getCookie(event, "token"); // Try to get token from cookie
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

    const body = await readBody<BattleRequest>(event);
    const { character_id, opponent_id } = body;

    if (!character_id || !opponent_id) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem e oponente são obrigatórios",
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

    // Verificar se o oponente existe
    const opponent = NPC_OPPONENTS[opponent_id];
    if (!opponent) {
      throw createError({
        statusCode: 404,
        message: "Oponente não encontrado",
      });
    }

    // Calcular stats do personagem incluindo equipamentos
    const { finalStats: characterStats } =
      calculateCharacterStatsWithEquipment(character_id);

    // Verificar se o personagem tem vida suficiente para batalhar
    if (characterStats.health <= 0) {
      throw createError({
        statusCode: 400,
        message: "Seu personagem está sem vida. Cure-se antes de batalhar.",
      });
    }

    // Criar dados da batalha
    const battleData = {
      character: {
        id: character.id,
        name: character.name,
        level: character.level,
        stats: characterStats,
      },
      opponent: {
        id: opponent.id,
        name: opponent.name,
        level: opponent.level,
        stats: opponent.stats,
      },
      battle_id: `battle_${Date.now()}_${character_id}_${opponent_id}`,
    };

    const response: ApiResponse<typeof battleData> = {
      success: true,
      data: battleData,
      message: "Batalha iniciada!",
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
