import { d as defineEventHandler, a as getHeader, g as getCookie, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../_/auth.mjs';
import { g as getDatabase } from '../../../_/databaseAdapter.mjs';
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

const calculateCooldown = (level) => {
  return Math.round(1 + (level - 1) * (29 / 49));
};
const AVAILABLE_SKILLS = {
  ninja: [
    {
      name: "Kunai Throw",
      description: "Ataque \xE0 dist\xE2ncia com kunais",
      cost: 100,
      level_required: 1,
      cooldown_seconds: calculateCooldown(1),
      // 1 segundo
      damage: 25
    },
    {
      name: "Fire Jutsu",
      description: "T\xE9cnica de fogo b\xE1sica",
      cost: 200,
      level_required: 3,
      cooldown_seconds: calculateCooldown(3),
      // 2 segundos
      damage: 35
    },
    {
      name: "Wind Jutsu",
      description: "T\xE9cnica de vento b\xE1sica",
      cost: 200,
      level_required: 3,
      cooldown_seconds: calculateCooldown(3),
      // 2 segundos
      damage: 30
    },
    {
      name: "Shadow Clone",
      description: "Cria clones ilus\xF3rios",
      cost: 500,
      level_required: 5,
      cooldown_seconds: calculateCooldown(5),
      // 3 segundos
      damage: 40
    },
    {
      name: "Chidori",
      description: "Ataque el\xE9trico devastador",
      cost: 1e3,
      level_required: 8,
      cooldown_seconds: calculateCooldown(8),
      // 9 segundos
      damage: 60
    },
    {
      name: "Rasengan",
      description: "Esfera de energia concentrada",
      cost: 1e3,
      level_required: 8,
      cooldown_seconds: calculateCooldown(8),
      // 9 segundos
      damage: 65
    }
  ],
  guerreiro_espacial: [
    {
      name: "Plasma Shot",
      description: "Disparo de plasma energ\xE9tico",
      cost: 100,
      level_required: 1,
      cooldown_seconds: calculateCooldown(1),
      // 1 segundo
      damage: 30
    },
    {
      name: "Energy Shield",
      description: "Escudo de energia defensivo",
      cost: 200,
      level_required: 3,
      cooldown_seconds: calculateCooldown(3),
      // 2 segundos
      damage: 0
      // Habilidade defensiva
    },
    {
      name: "Gravity Bomb",
      description: "Bomba de gravidade",
      cost: 200,
      level_required: 3,
      cooldown_seconds: calculateCooldown(3),
      // 2 segundos
      damage: 40
    },
    {
      name: "Quantum Strike",
      description: "Ataque qu\xE2ntico poderoso",
      cost: 500,
      level_required: 5,
      cooldown_seconds: calculateCooldown(5),
      // 3 segundos
      damage: 50
    },
    {
      name: "Nova Blast",
      description: "Explos\xE3o estelar devastadora",
      cost: 1e3,
      level_required: 8,
      cooldown_seconds: calculateCooldown(8),
      // 9 segundos
      damage: 70
    },
    {
      name: "Black Hole",
      description: "Cria um buraco negro tempor\xE1rio",
      cost: 1e3,
      level_required: 8,
      cooldown_seconds: calculateCooldown(8),
      // 9 segundos
      damage: 80
    }
  ]
};
const learn_post = defineEventHandler(async (event) => {
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
    const body = await readBody(
      event
    );
    const { character_id, skill_name } = body;
    if (!character_id || !skill_name) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem e nome da habilidade s\xE3o obrigat\xF3rios"
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
    const availableSkills = AVAILABLE_SKILLS[character.class];
    const skillInfo = availableSkills.find((s) => s.name === skill_name);
    if (!skillInfo) {
      throw createError({
        statusCode: 400,
        message: "Habilidade n\xE3o dispon\xEDvel para esta classe"
      });
    }
    if (character.level < skillInfo.level_required) {
      throw createError({
        statusCode: 400,
        message: `N\xEDvel ${skillInfo.level_required} necess\xE1rio para aprender esta habilidade`
      });
    }
    const existingSkill = db.prepare(
      `
      SELECT * FROM skills 
      WHERE character_id = ? AND skill_name = ?
    `
    ).get(character_id, skill_name);
    if (existingSkill) {
      throw createError({
        statusCode: 409,
        message: "Voc\xEA j\xE1 possui esta habilidade"
      });
    }
    const result = db.prepare(
      `
          INSERT INTO skills (character_id, skill_name, level, unlocked, cooldown_seconds, damage, description)
          VALUES (?, ?, 1, TRUE, ?, ?, ?)
        `
    ).run(
      character_id,
      skill_name,
      skillInfo.cooldown_seconds || 30,
      skillInfo.damage || 20,
      skillInfo.description || ""
    );
    const newSkill = db.prepare("SELECT * FROM skills WHERE id = ?").get(result.lastInsertRowid);
    const response = {
      success: true,
      data: newSkill,
      message: `Habilidade "${skill_name}" aprendida com sucesso!`
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { learn_post as default };
//# sourceMappingURL=learn.post.mjs.map
