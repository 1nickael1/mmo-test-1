import { d as defineEventHandler, a as getHeader, g as getCookie, c as createError, r as readBody } from '../../nitro/nitro.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../_/auth.mjs';
import { g as getDatabase } from '../../_/databaseAdapter.mjs';
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

const index_post = defineEventHandler(async (event) => {
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
    const { name, class: characterClass } = body;
    if (!name || !characterClass) {
      throw createError({
        statusCode: 400,
        message: "Nome e classe s\xE3o obrigat\xF3rios"
      });
    }
    const existingCharacter = db.prepare(
      `
      SELECT id FROM characters 
      WHERE user_id = ? AND name = ?
    `
    ).get(payload.id, name);
    if (existingCharacter) {
      throw createError({
        statusCode: 409,
        message: "J\xE1 existe um personagem com esse nome"
      });
    }
    const getBaseStats = (characterClass2) => {
      const statsByClass = {
        ninja: {
          strength: 8,
          agility: 12,
          defense: 6,
          health: 80,
          max_health: 80
        },
        guerreiro_espacial: {
          strength: 12,
          agility: 6,
          defense: 10,
          health: 100,
          max_health: 100
        },
        mago_cosmico: {
          strength: 5,
          agility: 8,
          defense: 4,
          health: 70,
          max_health: 70
        },
        arqueiro_estelar: {
          strength: 7,
          agility: 10,
          defense: 5,
          health: 75,
          max_health: 75
        },
        clerigo_divino: {
          strength: 6,
          agility: 7,
          defense: 8,
          health: 90,
          max_health: 90
        },
        assassino_sombrio: {
          strength: 6,
          agility: 13,
          defense: 4,
          health: 65,
          max_health: 65
        },
        paladino_cosmico: {
          strength: 11,
          agility: 6,
          defense: 12,
          health: 110,
          max_health: 110
        }
      };
      return statsByClass[characterClass2] || statsByClass.ninja;
    };
    const baseStats = getBaseStats(characterClass);
    const result = db.prepare(
      `
      INSERT INTO characters (user_id, name, class, level, xp, stats_json)
      VALUES (?, ?, ?, 1, 0, ?)
    `
    ).run(payload.id, name, characterClass, JSON.stringify(baseStats));
    const newCharacter = db.prepare("SELECT * FROM characters WHERE id = ?").get(result.lastInsertRowid);
    db.prepare(
      `
      INSERT INTO resources (character_id, resource_type, amount)
      VALUES (?, 'ouro', 1000), (?, 'cristais', 0), (?, 'materiais', 0)
    `
    ).run(newCharacter.id, newCharacter.id, newCharacter.id);
    const response = {
      success: true,
      data: {
        ...newCharacter,
        stats: baseStats
      },
      message: "Personagem criado com sucesso"
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
