import { d as defineEventHandler, a as getHeader, g as getCookie, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
import fs from 'fs';
import path from 'path';
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

const restore_post = defineEventHandler(async (event) => {
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
    const { backupFileName } = body;
    if (!backupFileName) {
      throw createError({
        statusCode: 400,
        message: "Nome do arquivo de backup \xE9 obrigat\xF3rio"
      });
    }
    const backupDir = path.join(process.cwd(), "backups");
    const backupFilePath = path.join(backupDir, backupFileName);
    if (!fs.existsSync(backupFilePath)) {
      throw createError({
        statusCode: 404,
        message: "Arquivo de backup n\xE3o encontrado"
      });
    }
    if (!backupFileName.startsWith(`user-${payload.id}-backup-`)) {
      throw createError({
        statusCode: 403,
        message: "Voc\xEA n\xE3o tem permiss\xE3o para restaurar este backup"
      });
    }
    const backupData = JSON.parse(fs.readFileSync(backupFilePath, "utf8"));
    const transaction = db.transaction(() => {
      db.prepare(
        "DELETE FROM story_progress WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).run(payload.id);
      db.prepare(
        "DELETE FROM battles WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).run(payload.id);
      db.prepare(
        "DELETE FROM upgrades WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).run(payload.id);
      db.prepare(
        "DELETE FROM items WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).run(payload.id);
      db.prepare(
        "DELETE FROM equipment WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).run(payload.id);
      db.prepare(
        "DELETE FROM skills WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).run(payload.id);
      db.prepare(
        "DELETE FROM resources WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).run(payload.id);
      db.prepare("DELETE FROM characters WHERE user_id = ?").run(payload.id);
      if (backupData.characters && backupData.characters.length > 0) {
        const insertCharacter = db.prepare(`
          INSERT INTO characters (id, user_id, name, class, level, xp, stats_json, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        for (const character of backupData.characters) {
          insertCharacter.run(
            character.id,
            payload.id,
            // Garantir que o user_id seja o usuário atual
            character.name,
            character.class,
            character.level,
            character.xp,
            character.stats_json,
            character.created_at,
            (/* @__PURE__ */ new Date()).toISOString()
          );
        }
      }
      if (backupData.resources && backupData.resources.length > 0) {
        const insertResource = db.prepare(`
          INSERT INTO resources (id, character_id, resource_type, amount, updated_at)
          VALUES (?, ?, ?, ?, ?)
        `);
        for (const resource of backupData.resources) {
          insertResource.run(
            resource.id,
            resource.character_id,
            resource.resource_type,
            resource.amount,
            (/* @__PURE__ */ new Date()).toISOString()
          );
        }
      }
      if (backupData.skills && backupData.skills.length > 0) {
        const insertSkill = db.prepare(`
          INSERT INTO skills (id, character_id, skill_name, level, unlocked, cooldown_seconds, last_used, damage, description, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        for (const skill of backupData.skills) {
          insertSkill.run(
            skill.id,
            skill.character_id,
            skill.skill_name,
            skill.level,
            skill.unlocked,
            skill.cooldown_seconds,
            skill.last_used,
            skill.damage,
            skill.description,
            skill.created_at
          );
        }
      }
      if (backupData.equipment && backupData.equipment.length > 0) {
        const insertEquipment = db.prepare(`
          INSERT INTO equipment (id, character_id, equipment_name, equipment_type, equipped, stats_json, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        for (const equipment of backupData.equipment) {
          insertEquipment.run(
            equipment.id,
            equipment.character_id,
            equipment.equipment_name,
            equipment.equipment_type,
            equipment.equipped,
            equipment.stats_json,
            equipment.created_at
          );
        }
      }
      if (backupData.items && backupData.items.length > 0) {
        const insertItem = db.prepare(`
          INSERT INTO items (id, character_id, item_name, item_type, quantity, stats_json, description, effect, cooldown, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        for (const item of backupData.items) {
          insertItem.run(
            item.id,
            item.character_id,
            item.item_name,
            item.item_type,
            item.quantity,
            item.stats_json,
            item.description,
            item.effect,
            item.cooldown,
            item.created_at
          );
        }
      }
      if (backupData.upgrades && backupData.upgrades.length > 0) {
        const insertUpgrade = db.prepare(`
          INSERT INTO upgrades (id, character_id, upgrade_type, upgrade_name, level, cost_json, is_completed, started_at, completed_at, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        for (const upgrade of backupData.upgrades) {
          insertUpgrade.run(
            upgrade.id,
            upgrade.character_id,
            upgrade.upgrade_type,
            upgrade.upgrade_name,
            upgrade.level,
            JSON.stringify(upgrade.cost),
            upgrade.is_completed,
            upgrade.started_at,
            upgrade.completed_at,
            upgrade.created_at
          );
        }
      }
      if (backupData.battles && backupData.battles.length > 0) {
        const insertBattle = db.prepare(`
          INSERT INTO battles (id, character_id, opponent_type, opponent_level, outcome, xp_gained, rewards_json, battle_date)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);
        for (const battle of backupData.battles) {
          insertBattle.run(
            battle.id,
            battle.character_id,
            battle.opponent_type,
            battle.opponent_level,
            battle.outcome,
            battle.xp_gained,
            JSON.stringify(battle.rewards),
            battle.battle_date
          );
        }
      }
      if (backupData.story_progress && backupData.story_progress.length > 0) {
        const insertStoryProgress = db.prepare(`
          INSERT INTO story_progress (id, character_id, chapter, completed, completed_at, created_at)
          VALUES (?, ?, ?, ?, ?, ?)
        `);
        for (const progress of backupData.story_progress) {
          insertStoryProgress.run(
            progress.id,
            progress.character_id,
            progress.chapter,
            progress.completed,
            progress.completed_at,
            progress.created_at
          );
        }
      }
    });
    transaction();
    const response = {
      success: true,
      data: {
        restoredCharacters: backupData.characters ? backupData.characters.length : 0,
        message: "Backup restaurado com sucesso! Todos os seus dados foram recuperados."
      }
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor durante restaura\xE7\xE3o"
    });
  }
});

export { restore_post as default };
//# sourceMappingURL=restore.post.mjs.map
