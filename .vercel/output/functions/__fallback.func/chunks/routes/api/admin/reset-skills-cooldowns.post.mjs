import { d as defineEventHandler, g as getCookie, a as getHeader, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
import { v as verifyRootToken } from '../../../_/adminAuth.mjs';
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

const resetSkillsCooldowns_post = defineEventHandler(async (event) => {
  const db = getDatabase();
  try {
    let adminToken = getCookie(event, "admin_token");
    if (!adminToken) {
      const authHeader = getHeader(event, "authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        adminToken = authHeader.substring(7);
      }
    }
    if (!adminToken) {
      throw createError({
        statusCode: 401,
        message: "Token administrativo n\xE3o fornecido"
      });
    }
    const adminPayload = verifyRootToken(adminToken);
    if (!adminPayload) {
      throw createError({
        statusCode: 401,
        message: "Token administrativo inv\xE1lido"
      });
    }
    const body = await readBody(event);
    const { character_id } = body;
    if (!character_id) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem \xE9 obrigat\xF3rio"
      });
    }
    const character = db.prepare(
      `
      SELECT * FROM characters 
      WHERE id = ?
    `
    ).get(character_id);
    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem n\xE3o encontrado"
      });
    }
    const result = db.prepare(
      `
      UPDATE skills 
      SET last_used = NULL
      WHERE character_id = ?
    `
    ).run(character_id);
    const updatedSkills = db.prepare(
      `
      SELECT skill_name, cooldown_seconds, last_used 
      FROM skills 
      WHERE character_id = ?
    `
    ).all(character_id);
    const response = {
      success: true,
      data: {
        character_id,
        character_name: character.name,
        skills_reset: result.changes || 0,
        skills: updatedSkills
      },
      message: `Cooldowns de ${result.changes || 0} habilidades foram resetados para o personagem ${character.name}`
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { resetSkillsCooldowns_post as default };
//# sourceMappingURL=reset-skills-cooldowns.post.mjs.map
