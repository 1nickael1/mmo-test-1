import { d as defineEventHandler, a as getHeader, g as getCookie, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../_/auth.mjs';
import { c as calculateCharacterStatsWithEquipment } from '../../../_/characterStats.mjs';
import { d as db } from '../../../_/databaseAdapter.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'bcryptjs';
import 'jsonwebtoken';
import '@vercel/postgres';

const NPC_OPPONENTS = {
  bandido_espacial_1: {
    id: "bandido_espacial_1",
    name: "Bandido Espacial",
    level: 1,
    stats: {
      strength: 5,
      agility: 6,
      defense: 4,
      health: 50,
      max_health: 50
    },
    xp_reward: 100,
    gold_reward: 25,
    difficulty: "easy"
  },
  pirata_espacial_2: {
    id: "pirata_espacial_2",
    name: "Pirata Espacial",
    level: 2,
    stats: {
      strength: 7,
      agility: 8,
      defense: 5,
      health: 70,
      max_health: 70
    },
    xp_reward: 150,
    gold_reward: 40,
    difficulty: "easy"
  },
  ciborgue_rebelde_3: {
    id: "ciborgue_rebelde_3",
    name: "Ciborgue Rebelde",
    level: 3,
    stats: {
      strength: 9,
      agility: 7,
      defense: 8,
      health: 90,
      max_health: 90
    },
    xp_reward: 200,
    gold_reward: 60,
    difficulty: "easy"
  },
  alienigena_hostil_4: {
    id: "alienigena_hostil_4",
    name: "Alien\xEDgena Hostil",
    level: 4,
    stats: {
      strength: 11,
      agility: 10,
      defense: 6,
      health: 110,
      max_health: 110
    },
    xp_reward: 250,
    gold_reward: 80,
    difficulty: "easy"
  },
  ninja_renegado_5: {
    id: "ninja_renegado_5",
    name: "Ninja Renegado",
    level: 5,
    stats: {
      strength: 13,
      agility: 12,
      defense: 9,
      health: 130,
      max_health: 130
    },
    xp_reward: 300,
    gold_reward: 100,
    difficulty: "medium"
  }
};
const start_post = defineEventHandler(async (event) => {
  try {
    let token = extractTokenFromHeader(getHeader(event, "authorization"));
    if (!token) {
      token = getCookie(event, "@mmo/ninja/token");
    }
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Token de autentica\xE7\xE3o n\xE3o fornecido"
      });
    }
    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        message: "Token inv\xE1lido"
      });
    }
    const body = await readBody(event);
    const { character_id, opponent_id } = body;
    if (!character_id || !opponent_id) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem e oponente s\xE3o obrigat\xF3rios"
      });
    }
    const character = db.prepare(
      `
      SELECT * FROM characters 
      WHERE id = ? AND user_id = ?
    `
    ).get(character_id, payload.id);
    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem n\xE3o encontrado"
      });
    }
    const opponent = NPC_OPPONENTS[opponent_id];
    if (!opponent) {
      throw createError({
        statusCode: 404,
        message: `Oponente n\xE3o encontrado: ${opponent_id}. Op\xE7\xF5es dispon\xEDveis: ${Object.keys(
          NPC_OPPONENTS
        ).join(", ")}`
      });
    }
    const { finalStats: characterStats } = calculateCharacterStatsWithEquipment(character_id);
    if (characterStats.health <= 0) {
      throw createError({
        statusCode: 400,
        message: "Seu personagem est\xE1 sem vida. Cure-se antes de batalhar."
      });
    }
    const battleData = {
      character: {
        id: character.id,
        name: character.name,
        level: character.level,
        stats: characterStats
      },
      opponent: {
        id: opponent.id,
        name: opponent.name,
        level: opponent.level,
        stats: opponent.stats
      },
      battle_id: `battle_${Date.now()}_${character_id}_${opponent_id}`
    };
    const response = {
      success: true,
      data: battleData,
      message: "Batalha iniciada!"
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { start_post as default };
//# sourceMappingURL=start.post.mjs.map
