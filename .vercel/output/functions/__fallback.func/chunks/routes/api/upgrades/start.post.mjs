import { d as defineEventHandler, r as readBody, c as createError, g as getCookie } from '../../../nitro/nitro.mjs';
import { v as verifyToken } from '../../../_/auth.mjs';
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

const start_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { upgrade_id, character_id } = body;
    if (!upgrade_id || !character_id) {
      throw createError({
        statusCode: 400,
        message: "ID da melhoria e do personagem s\xE3o obrigat\xF3rios"
      });
    }
    const upgradeId = parseInt(upgrade_id);
    const characterId = parseInt(character_id);
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
    const upgradeCosts = {
      1: { gold: 100, time_seconds: 30 },
      2: { gold: 150, time_seconds: 60 },
      3: { gold: 200, time_seconds: 45 },
      4: { gold: 300, time_seconds: 90 },
      5: { gold: 400, time_seconds: 60 },
      6: { gold: 500, time_seconds: 120 },
      7: { gold: 750, time_seconds: 180 },
      8: { gold: 1e3, time_seconds: 240 },
      9: { gold: 1250, time_seconds: 300 },
      10: { gold: 1500, time_seconds: 360 },
      11: { gold: 2e3, time_seconds: 480 },
      12: { gold: 5e3, time_seconds: 1800 },
      13: { gold: 1e4, time_seconds: 3600 },
      14: { gold: 25e3, time_seconds: 7200 },
      15: { gold: 5e4, time_seconds: 14400 },
      16: { gold: 1e5, time_seconds: 28800 },
      17: { gold: 2e5, time_seconds: 57600 },
      18: { gold: 5e5, time_seconds: 172800 },
      19: { gold: 1e6, time_seconds: 345600 }
    };
    const cost = upgradeCosts[upgradeId] || { gold: 100, time_seconds: 30 };
    const goldResource = db.prepare(
      "SELECT * FROM resources WHERE character_id = ? AND resource_type = ?"
    ).get(characterId, "ouro");
    const currentGold = (goldResource == null ? void 0 : goldResource.amount) || 0;
    if (currentGold < cost.gold) {
      throw createError({
        statusCode: 400,
        message: `Ouro insuficiente. Necess\xE1rio: ${cost.gold}, Dispon\xEDvel: ${currentGold}`
      });
    }
    const existingUpgrade = db.prepare(
      "SELECT * FROM upgrades WHERE character_id = ? AND is_completed = FALSE"
    ).get(characterId);
    if (existingUpgrade) {
      throw createError({
        statusCode: 400,
        message: "J\xE1 existe uma melhoria em andamento"
      });
    }
    if (goldResource) {
      db.prepare(
        "UPDATE resources SET amount = amount - ? WHERE character_id = ? AND resource_type = ?"
      ).run(cost.gold, characterId, "ouro");
    } else {
      throw createError({
        statusCode: 400,
        message: "Recurso de ouro n\xE3o encontrado"
      });
    }
    const startTime = /* @__PURE__ */ new Date();
    const endTime = new Date(startTime.getTime() + cost.time_seconds * 1e3);
    const insertUpgradeStmt = db.prepare(`
      INSERT INTO upgrades (character_id, upgrade_type, upgrade_name, level, cost_json, is_completed, started_at)
      VALUES (?, ?, ?, ?, ?, FALSE, ?)
    `);
    const upgradeNames = {
      1: { type: "stat", name: "Treinamento de For\xE7a" },
      2: { type: "building", name: "Armaz\xE9m de Recursos" },
      3: { type: "stat", name: "Treinamento de Agilidade" },
      4: { type: "building", name: "Laborat\xF3rio de Pesquisa" },
      5: { type: "stat", name: "Treinamento de Defesa" },
      6: { type: "building", name: "Oficina de Equipamentos" },
      7: { type: "training", name: "Campo de Treinamento" },
      8: { type: "building", name: "C\xE2mara de Medita\xE7\xE3o" },
      9: { type: "defense", name: "Escudo de Energia" },
      10: { type: "research", name: "Pesquisa de Tecnologia" },
      11: { type: "transport", name: "Portal de Teletransporte" },
      12: { type: "building", name: "Base Estelar" },
      13: { type: "research", name: "Manipulador de Gravidade" },
      14: { type: "building", name: "Portal do Multiverso" },
      15: { type: "research", name: "Motor da Realidade" },
      16: { type: "building", name: "Protocolo de G\xEAnese" },
      17: { type: "research", name: "Dom\xEDnio da Cria\xE7\xE3o" },
      18: { type: "building", name: "Entidade da Transcend\xEAncia" },
      19: { type: "research", name: "Onipot\xEAncia Absoluta" }
    };
    const upgradeInfo = upgradeNames[upgradeId] || {
      type: "stat",
      name: "Melhoria B\xE1sica"
    };
    insertUpgradeStmt.run(
      characterId,
      upgradeInfo.type,
      upgradeInfo.name,
      1,
      JSON.stringify(cost),
      startTime.toISOString()
    );
    const response = {
      success: true,
      data: {
        upgradeId,
        upgradeName: upgradeInfo.name,
        upgradeType: upgradeInfo.type,
        cost,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        timeRemaining: cost.time_seconds * 1e3
      },
      message: `Melhoria "${upgradeInfo.name}" iniciada com sucesso!`
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
