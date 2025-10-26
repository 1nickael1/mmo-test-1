import { d as defineEventHandler, a as getHeader, g as getCookie, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
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

const resolve_post = defineEventHandler(async (event) => {
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
    const {
      character_id,
      opponent_id,
      outcome,
      character_health_remaining,
      battle_type = "normal",
      chapter
    } = body;
    if (!character_id || !opponent_id || !outcome) {
      throw createError({
        statusCode: 400,
        message: "Dados da batalha s\xE3o obrigat\xF3rios"
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
    const NPC_OPPONENTS = {
      bandido_espacial_1: { xp_reward: 100, gold_reward: 25 },
      pirata_espacial_2: { xp_reward: 150, gold_reward: 40 },
      ciborgue_rebelde_3: { xp_reward: 200, gold_reward: 60 },
      alienigena_hostil_4: { xp_reward: 250, gold_reward: 80 },
      ninja_renegado_5: { xp_reward: 300, gold_reward: 100 }
      // Adicionar mais NPCs conforme necessário
    };
    let xpGained = 0;
    let goldGained = 0;
    let rewards = {
      xp: 0,
      gold: 0
    };
    if (outcome === "victory") {
      const opponentData = NPC_OPPONENTS[opponent_id];
      if (opponentData) {
        xpGained = opponentData.xp_reward;
        goldGained = opponentData.gold_reward;
      } else {
        const opponentLevel = parseInt(opponent_id.split("_")[1]) || 1;
        xpGained = Math.floor(100 * Math.pow(opponentLevel, 1.2));
        goldGained = Math.floor(50 * Math.pow(opponentLevel, 1.1));
      }
      rewards = {
        xp: xpGained,
        gold: goldGained,
        items: Math.random() < 0.3 ? ["Potion de Cura"] : void 0,
        materials: Math.random() < 0.4 ? Math.floor(Math.random() * 3) + 1 : void 0,
        crystals: Math.random() < 0.1 ? Math.floor(Math.random() * 2) + 1 : void 0
      };
    } else {
      xpGained = Math.floor(25 * Math.random());
      goldGained = Math.floor(10 * Math.random());
      rewards = {
        xp: xpGained,
        gold: goldGained
      };
    }
    const characterStats = JSON.parse(character.stats_json);
    characterStats.health = Math.max(0, character_health_remaining);
    const newXp = character.xp + xpGained;
    let newLevel = character.level;
    let newStats = characterStats;
    while (newXp >= Math.floor(1e3 * Math.pow(newLevel, 1.5))) {
      newLevel++;
      newStats = {
        ...newStats,
        strength: newStats.strength + 1,
        agility: newStats.agility + 1,
        defense: newStats.defense + 1,
        health: newStats.health + 10,
        max_health: newStats.max_health + 10
      };
    }
    db.prepare(
      `
      UPDATE characters 
      SET xp = ?, level = ?, stats_json = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
    ).run(newXp, newLevel, JSON.stringify(newStats), character_id);
    if (goldGained > 0) {
      const existingResource = db.prepare(
        `
            SELECT * FROM resources 
            WHERE character_id = ? AND resource_type = 'ouro'
          `
      ).get(character_id);
      if (existingResource) {
        db.prepare(
          `
              UPDATE resources 
              SET amount = amount + ?, updated_at = CURRENT_TIMESTAMP
              WHERE character_id = ? AND resource_type = 'ouro'
            `
        ).run(goldGained, character_id);
      } else {
        db.prepare(
          `
              INSERT INTO resources (character_id, resource_type, amount)
              VALUES (?, 'ouro', ?)
            `
        ).run(character_id, goldGained);
      }
    }
    if (rewards.materials && rewards.materials > 0) {
      const existingMaterial = db.prepare(
        `
            SELECT * FROM resources 
            WHERE character_id = ? AND resource_type = 'materiais'
          `
      ).get(character_id);
      if (existingMaterial) {
        db.prepare(
          `
              UPDATE resources 
              SET amount = amount + ?, updated_at = CURRENT_TIMESTAMP
              WHERE character_id = ? AND resource_type = 'materiais'
            `
        ).run(rewards.materials, character_id);
      } else {
        db.prepare(
          `
              INSERT INTO resources (character_id, resource_type, amount)
              VALUES (?, 'materiais', ?)
            `
        ).run(character_id, rewards.materials);
      }
    }
    if (rewards.crystals && rewards.crystals > 0) {
      const existingCrystal = db.prepare(
        `
            SELECT * FROM resources 
            WHERE character_id = ? AND resource_type = 'cristais'
          `
      ).get(character_id);
      if (existingCrystal) {
        db.prepare(
          `
              UPDATE resources 
              SET amount = amount + ?, updated_at = CURRENT_TIMESTAMP
              WHERE character_id = ? AND resource_type = 'cristais'
            `
        ).run(rewards.crystals, character_id);
      } else {
        db.prepare(
          `
              INSERT INTO resources (character_id, resource_type, amount)
              VALUES (?, 'cristais', ?)
            `
        ).run(character_id, rewards.crystals);
      }
    }
    if (rewards.items && rewards.items.length > 0) {
      for (const itemName of rewards.items) {
        const existingItem = db.prepare(
          `
              SELECT * FROM items 
              WHERE character_id = ? AND item_name = ?
            `
        ).get(character_id, itemName);
        if (existingItem) {
          db.prepare(
            `
                UPDATE items 
                SET quantity = quantity + 1, created_at = CURRENT_TIMESTAMP
                WHERE id = ?
              `
          ).run(existingItem.id);
        } else {
          const itemType = itemName.includes("Potion") ? "potion" : "consumable";
          db.prepare(
            `
                INSERT INTO items (character_id, item_name, item_type, quantity, stats_json)
                VALUES (?, ?, ?, 1, ?)
              `
          ).run(character_id, itemName, itemType, JSON.stringify({}));
        }
      }
    }
    db.prepare(
      `
      INSERT INTO battles (character_id, opponent_type, opponent_level, outcome, xp_gained, rewards_json)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    ).run(
      character_id,
      opponent_id,
      newLevel,
      outcome,
      xpGained,
      JSON.stringify(rewards)
    );
    if (battle_type === "story" && outcome === "victory" && chapter) {
      const existingProgress = db.prepare(
        `
        SELECT * FROM story_progress 
        WHERE character_id = ? AND chapter = ?
      `
      ).get(character_id, chapter);
      if (existingProgress) {
        db.prepare(
          `
          UPDATE story_progress 
          SET completed = TRUE, completed_at = CURRENT_TIMESTAMP
          WHERE character_id = ? AND chapter = ?
        `
        ).run(character_id, chapter);
      } else {
        db.prepare(
          `
          INSERT INTO story_progress (character_id, chapter, completed, completed_at)
          VALUES (?, ?, TRUE, CURRENT_TIMESTAMP)
        `
        ).run(character_id, chapter);
      }
    }
    db.prepare(
      `
      DELETE FROM active_battles 
      WHERE character_id = ?
    `
    ).run(character_id);
    const updatedCharacter = db.prepare("SELECT * FROM characters WHERE id = ?").get(character_id);
    const response = {
      success: true,
      data: {
        character: {
          ...updatedCharacter,
          stats: newStats
        },
        rewards,
        level_up: newLevel > character.level,
        new_level: newLevel > character.level ? newLevel : void 0,
        outcome,
        chapter_completed: battle_type === "story" && outcome === "victory" && chapter ? true : void 0
      },
      message: outcome === "victory" ? "Vit\xF3ria!" : "Derrota..."
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { resolve_post as default };
//# sourceMappingURL=resolve.post.mjs.map
