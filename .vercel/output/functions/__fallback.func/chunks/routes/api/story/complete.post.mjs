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

const complete_post = defineEventHandler(async (event) => {
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
    const { character_id, chapter, outcome } = body;
    if (!character_id || !chapter || !outcome) {
      throw createError({
        statusCode: 400,
        message: "Dados do cap\xEDtulo s\xE3o obrigat\xF3rios"
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
    const existingProgress = db.prepare(
      `
      SELECT * FROM story_progress 
      WHERE character_id = ? AND chapter = ?
    `
    ).get(character_id, chapter);
    if (existingProgress && existingProgress.completed) {
      throw createError({
        statusCode: 409,
        message: "Cap\xEDtulo j\xE1 foi completado"
      });
    }
    if (outcome === "victory") {
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
      let xpReward = 0;
      let goldReward = 0;
      let items = [];
      let equipment = null;
      let materialsReward = 0;
      let crystalsReward = 0;
      switch (chapter) {
        case 1:
          xpReward = 50;
          goldReward = 25;
          items = ["Po\xE7\xE3o de Cura Pequena"];
          materialsReward = 2;
          break;
        case 2:
          xpReward = 80;
          goldReward = 40;
          break;
        case 3:
          xpReward = 120;
          goldReward = 60;
          items = ["Po\xE7\xE3o de Cura M\xE9dia"];
          break;
        case 4:
          xpReward = 150;
          goldReward = 75;
          break;
        case 5:
          xpReward = 300;
          goldReward = 200;
          items = ["Po\xE7\xE3o de Cura Grande"];
          equipment = "Katana Afiada";
          materialsReward = 5;
          crystalsReward = 1;
          break;
        case 6:
          xpReward = 200;
          goldReward = 100;
          break;
        case 7:
          xpReward = 250;
          goldReward = 125;
          items = ["Po\xE7\xE3o de Cura M\xE9dia"];
          break;
        case 8:
          xpReward = 280;
          goldReward = 140;
          break;
        case 9:
          xpReward = 320;
          goldReward = 160;
          items = ["Po\xE7\xE3o de Cura Grande"];
          break;
        case 10:
          xpReward = 500;
          goldReward = 400;
          items = ["Po\xE7\xE3o de Cura Superior"];
          equipment = "Katana do Vento";
          materialsReward = 8;
          crystalsReward = 2;
          break;
        case 11:
          xpReward = 400;
          goldReward = 200;
          break;
        case 12:
          xpReward = 500;
          goldReward = 250;
          items = ["Po\xE7\xE3o de Cura Superior"];
          break;
        case 13:
          xpReward = 600;
          goldReward = 300;
          break;
        case 14:
          xpReward = 700;
          goldReward = 350;
          items = ["Po\xE7\xE3o de Cura \xC9pica"];
          break;
        case 15:
          xpReward = 1e3;
          goldReward = 800;
          items = ["Po\xE7\xE3o de Cura \xC9pica"];
          equipment = "Katana do Fogo";
          break;
        case 16:
          xpReward = 800;
          goldReward = 400;
          break;
        case 17:
          xpReward = 1e3;
          goldReward = 500;
          items = ["Po\xE7\xE3o de Cura Lend\xE1ria"];
          break;
        case 18:
          xpReward = 2e3;
          goldReward = 1500;
          items = ["Po\xE7\xE3o de Cura Lend\xE1ria"];
          equipment = "Katana da Sombra";
          break;
        case 19:
          xpReward = 1200;
          goldReward = 600;
          break;
        case 20:
          xpReward = 3e3;
          goldReward = 2500;
          items = ["Po\xE7\xE3o de Cura Divina"];
          equipment = "Katana Lend\xE1ria";
          materialsReward = 15;
          crystalsReward = 5;
          break;
        case 21:
          xpReward = 5e3;
          goldReward = 5e3;
          items = ["Po\xE7\xE3o de Cura Celestial"];
          equipment = "Katana Celestial";
          materialsReward = 25;
          crystalsReward = 10;
          break;
        default:
          xpReward = 100;
          goldReward = 50;
          break;
      }
      const newXp = character.xp + xpReward;
      let newLevel = character.level;
      let newStats = JSON.parse(character.stats_json);
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
      const goldResource = db.prepare(
        `
        SELECT * FROM resources 
        WHERE character_id = ? AND resource_type = 'ouro'
      `
      ).get(character_id);
      if (goldResource) {
        db.prepare(
          `
          UPDATE resources 
          SET amount = amount + ?, updated_at = CURRENT_TIMESTAMP
          WHERE character_id = ? AND resource_type = 'ouro'
        `
        ).run(goldReward, character_id);
      } else {
        db.prepare(
          `
          INSERT INTO resources (character_id, resource_type, amount)
          VALUES (?, 'ouro', ?)
        `
        ).run(character_id, goldReward);
      }
      if (materialsReward > 0) {
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
          ).run(materialsReward, character_id);
        } else {
          db.prepare(
            `
              INSERT INTO resources (character_id, resource_type, amount)
              VALUES (?, 'materiais', ?)
            `
          ).run(character_id, materialsReward);
        }
      }
      if (crystalsReward > 0) {
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
          ).run(crystalsReward, character_id);
        } else {
          db.prepare(
            `
              INSERT INTO resources (character_id, resource_type, amount)
              VALUES (?, 'cristais', ?)
            `
          ).run(character_id, crystalsReward);
        }
      }
      for (const itemName of items) {
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
          db.prepare(
            `
            INSERT INTO items (character_id, item_name, item_type, quantity, stats_json)
            VALUES (?, ?, 'potion', 1, ?)
          `
          ).run(character_id, itemName, JSON.stringify({}));
        }
      }
      if (equipment) {
        let equipmentType = "weapon";
        if (equipment.includes("Armadura")) {
          equipmentType = "armor";
        }
        let equipmentStats = {};
        if (equipment.includes("Katana")) {
          if (equipment.includes("Afiada")) {
            equipmentStats = { strength: 4, damage: 12 };
          } else if (equipment.includes("Vento")) {
            equipmentStats = { strength: 6, agility: 2, damage: 20 };
          } else if (equipment.includes("Fogo")) {
            equipmentStats = { strength: 8, damage: 30 };
          } else if (equipment.includes("Sombra")) {
            equipmentStats = { strength: 10, agility: 5, damage: 45 };
          } else if (equipment.includes("Lend\xE1ria")) {
            equipmentStats = { strength: 15, agility: 8, damage: 70 };
          } else if (equipment.includes("Celestial")) {
            equipmentStats = { strength: 25, agility: 15, damage: 150 };
          }
        }
        db.prepare(
          `
          INSERT INTO equipment (character_id, equipment_name, equipment_type, equipped, stats_json)
          VALUES (?, ?, ?, FALSE, ?)
        `
        ).run(
          character_id,
          equipment,
          equipmentType,
          JSON.stringify(equipmentStats)
        );
      }
      const response = {
        success: true,
        data: {
          xp_gained: xpReward,
          gold_gained: goldReward,
          items_gained: items,
          equipment_gained: equipment || void 0,
          materials_gained: materialsReward,
          crystals_gained: crystalsReward,
          level_up: newLevel > character.level,
          new_level: newLevel > character.level ? newLevel : void 0
        },
        message: `Cap\xEDtulo ${chapter} completado com sucesso!`
      };
      return response;
    } else {
      if (!existingProgress) {
        db.prepare(
          `
          INSERT INTO story_progress (character_id, chapter, completed, completed_at)
          VALUES (?, ?, FALSE, NULL)
        `
        ).run(character_id, chapter);
      }
      const response = {
        success: true,
        data: null,
        message: "Cap\xEDtulo registrado. Tente novamente quando estiver mais forte!"
      };
      return response;
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { complete_post as default };
//# sourceMappingURL=complete.post.mjs.map
