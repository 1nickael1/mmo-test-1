import type { ApiResponse } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import { calculateCharacterStatsWithEquipment } from "../../utils/characterStats";
import db from "../../utils/database";

interface StoryOpponent {
  id: string;
  name: string;
  level: number;
  stats: {
    strength: number;
    agility: number;
    defense: number;
    health: number;
    max_health: number;
  };
  xp_reward: number;
  gold_reward: number;
  difficulty: string;
}

// Oponentes específicos para cada capítulo da história
const STORY_OPPONENTS: Record<number, StoryOpponent> = {
  1: {
    id: "bandido_espacial_1",
    name: "Bandido Espacial",
    level: 1,
    stats: {
      strength: 8,
      agility: 6,
      defense: 4,
      health: 50,
      max_health: 50,
    },
    xp_reward: 50,
    gold_reward: 25,
    difficulty: "easy",
  },
  2: {
    id: "pirata_espacial_2",
    name: "Pirata Espacial",
    level: 2,
    stats: {
      strength: 12,
      agility: 8,
      defense: 6,
      health: 70,
      max_health: 70,
    },
    xp_reward: 80,
    gold_reward: 40,
    difficulty: "easy",
  },
  3: {
    id: "ciborgue_rebelde_3",
    name: "Ciborgue Rebelde",
    level: 3,
    stats: {
      strength: 16,
      agility: 10,
      defense: 8,
      health: 90,
      max_health: 90,
    },
    xp_reward: 120,
    gold_reward: 60,
    difficulty: "medium",
  },
  4: {
    id: "alienigena_hostil_4",
    name: "Alienígena Hostil",
    level: 4,
    stats: {
      strength: 20,
      agility: 12,
      defense: 10,
      health: 110,
      max_health: 110,
    },
    xp_reward: 150,
    gold_reward: 75,
    difficulty: "medium",
  },
  5: {
    id: "ninja_renegado_5",
    name: "Ninja Renegado",
    level: 5,
    stats: {
      strength: 25,
      agility: 18,
      defense: 12,
      health: 130,
      max_health: 130,
    },
    xp_reward: 300,
    gold_reward: 200,
    difficulty: "hard",
  },
  // Adicionar mais capítulos conforme necessário
  6: {
    id: "guerreiro_espacial_6",
    name: "Guerreiro Espacial",
    level: 6,
    stats: {
      strength: 30,
      agility: 15,
      defense: 15,
      health: 150,
      max_health: 150,
    },
    xp_reward: 200,
    gold_reward: 100,
    difficulty: "medium",
  },
  7: {
    id: "assassino_sombrio_7",
    name: "Assassino Sombrio",
    level: 7,
    stats: {
      strength: 35,
      agility: 25,
      defense: 18,
      health: 170,
      max_health: 170,
    },
    xp_reward: 250,
    gold_reward: 125,
    difficulty: "hard",
  },
  8: {
    id: "mago_elemental_8",
    name: "Mago Elemental",
    level: 8,
    stats: {
      strength: 40,
      agility: 20,
      defense: 20,
      health: 190,
      max_health: 190,
    },
    xp_reward: 280,
    gold_reward: 140,
    difficulty: "hard",
  },
  9: {
    id: "dragão_espacial_9",
    name: "Dragão Espacial",
    level: 9,
    stats: {
      strength: 45,
      agility: 22,
      defense: 25,
      health: 220,
      max_health: 220,
    },
    xp_reward: 320,
    gold_reward: 160,
    difficulty: "hard",
  },
  10: {
    id: "senhor_das_trevas_10",
    name: "Senhor das Trevas",
    level: 10,
    stats: {
      strength: 60,
      agility: 30,
      defense: 35,
      health: 300,
      max_health: 300,
    },
    xp_reward: 500,
    gold_reward: 400,
    difficulty: "boss",
  },
};

export default defineEventHandler(async (event) => {
  try {
    let token = extractTokenFromHeader(getHeader(event, "authorization"));

    if (!token) {
      token = getCookie(event, "@mmo/ninja/token");
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
      chapter: number;
    }>(event);

    const { character_id, chapter } = body;

    if (!character_id || !chapter) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem e capítulo são obrigatórios",
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

    // Verificar se o capítulo existe
    const opponent = STORY_OPPONENTS[chapter];
    if (!opponent) {
      throw createError({
        statusCode: 404,
        message: `Capítulo ${chapter} não encontrado`,
      });
    }

    // Verificar se o capítulo já foi completado
    const existingProgress = db
      .prepare(
        `
      SELECT * FROM story_progress 
      WHERE character_id = ? AND chapter = ? AND completed = TRUE
    `
      )
      .get(character_id, chapter);

    if (existingProgress) {
      throw createError({
        statusCode: 409,
        message: "Capítulo já foi completado",
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
      chapter: chapter,
      battle_type: "story" as const,
    };

    // Salvar batalha ativa
    db.prepare(
      `
      INSERT OR REPLACE INTO active_battles 
      (character_id, battle_type, opponent_data, character_health, opponent_health, battle_turn, battle_data, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `
    ).run(
      character_id,
      "story",
      JSON.stringify(opponent),
      characterStats.health,
      opponent.stats.health,
      1, // Turno do jogador
      JSON.stringify(battleData)
    );

    const response: ApiResponse<typeof battleData> = {
      success: true,
      data: battleData,
      message: `Batalha do Capítulo ${chapter} iniciada!`,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
