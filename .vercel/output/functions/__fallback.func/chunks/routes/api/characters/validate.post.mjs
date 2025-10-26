import { d as defineEventHandler, a as getHeader, g as getCookie, c as createError } from '../../../nitro/nitro.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../_/auth.mjs';
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

const validate_post = defineEventHandler(async (event) => {
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
    const validationResults = {
      characters: { valid: 0, invalid: 0, issues: [] },
      resources: { valid: 0, invalid: 0, issues: [] },
      skills: { valid: 0, invalid: 0, issues: [] },
      equipment: { valid: 0, invalid: 0, issues: [] },
      items: { valid: 0, invalid: 0, issues: [] },
      upgrades: { valid: 0, invalid: 0, issues: [] },
      battles: { valid: 0, invalid: 0, issues: [] },
      story_progress: { valid: 0, invalid: 0, issues: [] }
    };
    const characters = db.prepare("SELECT * FROM characters WHERE user_id = ?").all(payload.id);
    for (const character of characters) {
      try {
        if (character.stats_json) {
          JSON.parse(character.stats_json);
        }
        if (character.level < 1 || character.level > 50) {
          validationResults.characters.issues.push(
            `Personagem ${character.name}: n\xEDvel inv\xE1lido (${character.level})`
          );
          validationResults.characters.invalid++;
        } else {
          validationResults.characters.valid++;
        }
      } catch (error) {
        validationResults.characters.issues.push(
          `Personagem ${character.name}: stats_json inv\xE1lido`
        );
        validationResults.characters.invalid++;
      }
    }
    const resources = db.prepare(
      "SELECT * FROM resources WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
    ).all(payload.id);
    for (const resource of resources) {
      if (resource.amount < 0) {
        validationResults.resources.issues.push(
          `Recurso ${resource.resource_type}: quantidade negativa (${resource.amount})`
        );
        validationResults.resources.invalid++;
      } else {
        validationResults.resources.valid++;
      }
    }
    const skills = db.prepare(
      "SELECT * FROM skills WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
    ).all(payload.id);
    for (const skill of skills) {
      if (skill.level < 1 || skill.level > 50) {
        validationResults.skills.issues.push(
          `Habilidade ${skill.skill_name}: n\xEDvel inv\xE1lido (${skill.level})`
        );
        validationResults.skills.invalid++;
      } else {
        validationResults.skills.valid++;
      }
    }
    const equipment = db.prepare(
      "SELECT * FROM equipment WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
    ).all(payload.id);
    for (const eq of equipment) {
      try {
        if (eq.stats_json) {
          JSON.parse(eq.stats_json);
        }
        validationResults.equipment.valid++;
      } catch (error) {
        validationResults.equipment.issues.push(
          `Equipamento ${eq.equipment_name}: stats_json inv\xE1lido`
        );
        validationResults.equipment.invalid++;
      }
    }
    const items = db.prepare(
      "SELECT * FROM items WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
    ).all(payload.id);
    for (const item of items) {
      if (item.quantity < 0) {
        validationResults.items.issues.push(
          `Item ${item.item_name}: quantidade negativa (${item.quantity})`
        );
        validationResults.items.invalid++;
      } else {
        validationResults.items.valid++;
      }
    }
    const upgrades = db.prepare(
      "SELECT * FROM upgrades WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
    ).all(payload.id);
    for (const upgrade of upgrades) {
      if (upgrade.level < 1 || upgrade.level > 10) {
        validationResults.upgrades.issues.push(
          `Melhoria ${upgrade.upgrade_name}: n\xEDvel inv\xE1lido (${upgrade.level})`
        );
        validationResults.upgrades.invalid++;
      } else {
        validationResults.upgrades.valid++;
      }
    }
    const battles = db.prepare(
      "SELECT * FROM battles WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
    ).all(payload.id);
    for (const battle of battles) {
      if (battle.xp_gained < 0) {
        validationResults.battles.issues.push(
          `Batalha ID ${battle.id}: XP negativo (${battle.xp_gained})`
        );
        validationResults.battles.invalid++;
      } else {
        validationResults.battles.valid++;
      }
    }
    const storyProgress = db.prepare(
      "SELECT * FROM story_progress WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
    ).all(payload.id);
    for (const progress of storyProgress) {
      if (progress.chapter < 1 || progress.chapter > 10) {
        validationResults.story_progress.issues.push(
          `Cap\xEDtulo ${progress.chapter}: n\xFAmero inv\xE1lido`
        );
        validationResults.story_progress.invalid++;
      } else {
        validationResults.story_progress.valid++;
      }
    }
    const totalValid = Object.values(validationResults).reduce(
      (sum, result) => sum + result.valid,
      0
    );
    const totalInvalid = Object.values(validationResults).reduce(
      (sum, result) => sum + result.invalid,
      0
    );
    const totalIssues = Object.values(validationResults).reduce(
      (sum, result) => sum + result.issues.length,
      0
    );
    const response = {
      success: true,
      data: {
        validationResults,
        summary: {
          totalValid,
          totalInvalid,
          totalIssues,
          healthScore: totalValid + totalInvalid > 0 ? Math.round(totalValid / (totalValid + totalInvalid) * 100) : 100
        },
        message: totalIssues === 0 ? "\u2705 Todos os dados est\xE3o \xEDntegros e v\xE1lidos!" : `\u26A0\uFE0F Encontrados ${totalIssues} problema(s) nos dados. Considere fazer um backup e restaurar.`
      }
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor durante valida\xE7\xE3o"
    });
  }
});

export { validate_post as default };
//# sourceMappingURL=validate.post.mjs.map
