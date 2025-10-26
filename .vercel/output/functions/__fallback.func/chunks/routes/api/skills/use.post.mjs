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

const use_post = defineEventHandler(async (event) => {
  const db = getDatabase();
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
    const skill = db.prepare(
      `
      SELECT * FROM skills 
      WHERE character_id = ? AND skill_name = ? AND unlocked = TRUE
    `
    ).get(character_id, skill_name);
    if (!skill) {
      const skillExists = db.prepare(
        `
        SELECT * FROM skills 
        WHERE character_id = ? AND skill_name = ?
      `
      ).get(character_id, skill_name);
      throw createError({
        statusCode: 404,
        message: "Habilidade n\xE3o encontrada ou n\xE3o desbloqueada"
      });
    }
    if (skill.last_used) {
      const lastUsed = /* @__PURE__ */ new Date(skill.last_used + "Z");
      const cooldownSeconds = skill.cooldown_seconds || 1;
      const now = /* @__PURE__ */ new Date();
      const timeDiff = (now.getTime() - lastUsed.getTime()) / 1e3;
      if (timeDiff >= 0 && timeDiff < cooldownSeconds) {
        const remainingTime = Math.ceil(cooldownSeconds - timeDiff);
        throw createError({
          statusCode: 400,
          message: `Habilidade em cooldown. Aguarde ${remainingTime} segundos.`
        });
      }
    }
    db.prepare(
      `
      UPDATE skills 
      SET last_used = CURRENT_TIMESTAMP
      WHERE id = ?
    `
    ).run(skill.id);
    const baseDamage = skill.damage || 20;
    const characterStats = JSON.parse(character.stats_json);
    const skillDamage = baseDamage + Math.floor(characterStats.strength * 0.5);
    const response = {
      success: true,
      data: {
        skill_name,
        damage: skillDamage,
        cooldown_seconds: skill.cooldown_seconds || 1
      },
      message: `Habilidade ${skill_name} usada! Dano: ${skillDamage}`
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { use_post as default };
//# sourceMappingURL=use.post.mjs.map
