import { d as defineEventHandler, r as readBody, c as createError, g as getCookie } from '../../../nitro/nitro.mjs';
import { v as verifyToken } from '../../../_/auth.mjs';
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

const complete_post = defineEventHandler(async (event) => {
  const db = getDatabase();
  try {
    const body = await readBody(event);
    const { upgradeId, characterId } = body;
    if (!upgradeId || !characterId) {
      throw createError({
        statusCode: 400,
        message: "ID da melhoria e do personagem s\xE3o obrigat\xF3rios"
      });
    }
    const token = getCookie(event, "@mmo/ninja/token");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Token de autentica\xE7\xE3o n\xE3o encontrado"
      });
    }
    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        message: "Token inv\xE1lido"
      });
    }
    const character = db.prepare("SELECT * FROM characters WHERE id = ? AND user_id = ?").get(characterId, payload.id);
    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem n\xE3o encontrado"
      });
    }
    const upgrade = db.prepare("SELECT * FROM upgrades WHERE id = ? AND character_id = ?").get(upgradeId, characterId);
    if (!upgrade) {
      throw createError({
        statusCode: 404,
        message: "Melhoria n\xE3o encontrada"
      });
    }
    if (upgrade.is_completed) {
      throw createError({
        statusCode: 400,
        message: "Melhoria j\xE1 foi conclu\xEDda"
      });
    }
    const startTime = new Date(upgrade.started_at);
    const cost = JSON.parse(upgrade.cost_json);
    const endTime = new Date(startTime.getTime() + cost.time_seconds * 1e3);
    const now = /* @__PURE__ */ new Date();
    if (now < endTime) {
      const remainingTime = endTime.getTime() - now.getTime();
      throw createError({
        statusCode: 400,
        message: `Melhoria ainda em andamento. Tempo restante: ${Math.ceil(
          remainingTime / 1e3
        )} segundos`
      });
    }
    const characterStats = JSON.parse(character.stats_json);
    let bonusApplied = false;
    switch (upgrade.upgrade_type) {
      case "stat":
        if (upgrade.upgrade_name.includes("For\xE7a")) {
          characterStats.strength += 5;
          bonusApplied = true;
        } else if (upgrade.upgrade_name.includes("Agilidade")) {
          characterStats.agility += 5;
          bonusApplied = true;
        } else if (upgrade.upgrade_name.includes("Defesa")) {
          characterStats.defense += 5;
          bonusApplied = true;
        }
        break;
      case "building":
        if (upgrade.upgrade_name.includes("Armaz\xE9m")) {
          bonusApplied = true;
        } else if (upgrade.upgrade_name.includes("Laborat\xF3rio")) {
          bonusApplied = true;
        } else if (upgrade.upgrade_name.includes("Oficina")) {
          bonusApplied = true;
        }
        break;
      case "training":
        bonusApplied = true;
        break;
      case "defense":
        characterStats.defense += 10;
        bonusApplied = true;
        break;
      case "research":
        bonusApplied = true;
        break;
      case "transport":
        bonusApplied = true;
        break;
    }
    const updateCharacterStmt = db.prepare(`
      UPDATE characters 
      SET stats_json = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    updateCharacterStmt.run(JSON.stringify(characterStats), characterId);
    const completeUpgradeStmt = db.prepare(`
      UPDATE upgrades 
      SET is_completed = TRUE, completed_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    completeUpgradeStmt.run(upgradeId);
    const response = {
      success: true,
      data: {
        upgradeId,
        upgradeName: upgrade.upgrade_name,
        upgradeType: upgrade.upgrade_type,
        bonusApplied,
        newStats: characterStats
      },
      message: `Melhoria "${upgrade.upgrade_name}" conclu\xEDda com sucesso!`
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { complete_post as default };
//# sourceMappingURL=complete.post.mjs.map
