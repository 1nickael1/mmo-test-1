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

const complete_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { missionId, characterId } = body;
    if (!missionId || !characterId) {
      throw createError({
        statusCode: 400,
        message: "ID da miss\xE3o e do personagem s\xE3o obrigat\xF3rios"
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
    const missionRewards = {
      first_battle: { xp: 200, gold: 50 },
      reach_level_2: { xp: 100, gold: 25 },
      defeat_pirates: { xp: 400, gold: 100 },
      learn_fire_jutsu: { xp: 300, gold: 75 },
      collect_materials: { xp: 500, gold: 125, materials: 5 },
      defeat_ninja_renegade: { xp: 600, gold: 150 },
      lorde_sombras: { xp: 800, gold: 200 },
      imperador_espacial: { xp: 1e3, gold: 250 },
      dragao_espacial: { xp: 1200, gold: 300 },
      mestre_ninja: { xp: 1400, gold: 350 },
      general_imperial: { xp: 1600, gold: 400 },
      imperador_sombras: { xp: 3e3, gold: 750 },
      entidade_cosmica: { xp: 5e3, gold: 1250 },
      deus_destruicao: { xp: 1e4, gold: 2500 },
      entidade_primordial: { xp: 2e4, gold: 5e3 },
      entidade_cosmica_suprema: { xp: 5e4, gold: 12500 },
      entidade_absoluta: { xp: 1e5, gold: 25e3 },
      entidade_primordial_suprema: { xp: 2e5, gold: 5e4 },
      entidade_criacao_final: { xp: 5e5, gold: 1e5 }
    };
    const rewards = missionRewards[missionId] || { xp: 100, gold: 25 };
    const characterStats = JSON.parse(character.stats_json);
    const newXp = character.xp + rewards.xp;
    const getXpForLevel = (level) => {
      if (level <= 10) {
        return 1e3 + (level - 1) * 500;
      } else if (level <= 20) {
        return Math.floor(5500 + Math.pow(level - 10, 1.8) * 1e3);
      } else if (level <= 30) {
        return Math.floor(15e3 + Math.pow(level - 20, 2.2) * 2e3);
      } else if (level <= 40) {
        return Math.floor(5e4 + Math.pow(level - 30, 2.5) * 5e3);
      } else {
        return Math.floor(15e4 + Math.pow(level - 40, 3) * 1e4);
      }
    };
    let newLevel = character.level;
    let levelUps = 0;
    while (newLevel < 50 && newXp >= getXpForLevel(newLevel)) {
      newLevel++;
      levelUps++;
    }
    if (levelUps > 0) {
      characterStats.strength += levelUps;
      characterStats.agility += levelUps;
      characterStats.defense += levelUps;
      characterStats.health += levelUps * 10;
      characterStats.max_health += levelUps * 10;
      characterStats.health = characterStats.max_health;
    }
    const updateCharacterStmt = db.prepare(`
      UPDATE characters 
      SET xp = ?, level = ?, stats_json = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    updateCharacterStmt.run(
      newXp,
      newLevel,
      JSON.stringify(characterStats),
      characterId
    );
    const addResource = (resourceType, amount) => {
      const existingResource = db.prepare(
        "SELECT * FROM resources WHERE character_id = ? AND resource_type = ?"
      ).get(characterId, resourceType);
      if (existingResource) {
        db.prepare(
          "UPDATE resources SET amount = amount + ? WHERE character_id = ? AND resource_type = ?"
        ).run(amount, characterId, resourceType);
      } else {
        db.prepare(
          "INSERT INTO resources (character_id, resource_type, amount) VALUES (?, ?, ?)"
        ).run(characterId, resourceType, amount);
      }
    };
    addResource("ouro", rewards.gold);
    if (rewards.materials) addResource("materiais", rewards.materials);
    if (rewards.crystals) addResource("cristais", rewards.crystals);
    const completeMissionStmt = db.prepare(`
      INSERT OR REPLACE INTO mission_progress (character_id, mission_id, completed, completed_at)
      VALUES (?, ?, TRUE, CURRENT_TIMESTAMP)
    `);
    completeMissionStmt.run(characterId, missionId);
    const response = {
      success: true,
      data: {
        rewards,
        levelUps,
        newLevel,
        newXp
      },
      message: levelUps > 0 ? `Miss\xE3o conclu\xEDda! Voc\xEA subiu ${levelUps} n\xEDvel(is) e ganhou ${rewards.xp} XP e ${rewards.gold} ouro!` : `Miss\xE3o conclu\xEDda! Voc\xEA ganhou ${rewards.xp} XP e ${rewards.gold} ouro!`
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
