import fs from "fs";
import path from "path";
import type { ApiResponse } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/database";

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    let token = extractTokenFromHeader(authHeader);

    // Fallback: usa cookie "token" se não houver Authorization header
    if (!token) {
      const cookieToken = getCookie(event, "token");
      token = cookieToken || null;
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

    const body = await readBody(event);
    const { backupFileName } = body;

    if (!backupFileName) {
      throw createError({
        statusCode: 400,
        message: "Nome do arquivo de backup é obrigatório",
      });
    }

    // Verificar se o arquivo de backup existe
    const backupDir = path.join(process.cwd(), "backups");
    const backupFilePath = path.join(backupDir, backupFileName);

    if (!fs.existsSync(backupFilePath)) {
      throw createError({
        statusCode: 404,
        message: "Arquivo de backup não encontrado",
      });
    }

    // Verificar se o backup pertence ao usuário atual
    if (!backupFileName.startsWith(`user-${payload.id}-backup-`)) {
      throw createError({
        statusCode: 403,
        message: "Você não tem permissão para restaurar este backup",
      });
    }

    // Ler dados do backup
    const backupData = JSON.parse(fs.readFileSync(backupFilePath, "utf8"));

    // Iniciar transação para restaurar dados
    const transaction = db.transaction(() => {
      // Limpar dados atuais do usuário
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

      // Restaurar personagens
      if (backupData.characters && backupData.characters.length > 0) {
        const insertCharacter = db.prepare(`
          INSERT INTO characters (id, user_id, name, class, level, xp, stats_json, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        for (const character of backupData.characters) {
          insertCharacter.run(
            character.id,
            payload.id, // Garantir que o user_id seja o usuário atual
            character.name,
            character.class,
            character.level,
            character.xp,
            character.stats_json,
            character.created_at,
            new Date().toISOString()
          );
        }
      }

      // Restaurar recursos
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
            new Date().toISOString()
          );
        }
      }

      // Restaurar habilidades
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

      // Restaurar equipamentos
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

      // Restaurar itens
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

      // Restaurar melhorias
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

      // Restaurar batalhas
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

      // Restaurar progresso da história
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

    // Executar transação
    transaction();

    const response: ApiResponse<{
      restoredCharacters: number;
      message: string;
    }> = {
      success: true,
      data: {
        restoredCharacters: backupData.characters
          ? backupData.characters.length
          : 0,
        message:
          "Backup restaurado com sucesso! Todos os seus dados foram recuperados.",
      },
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor durante restauração",
    });
  }
});
