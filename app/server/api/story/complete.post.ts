import type { ApiResponse } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/database";

export default defineEventHandler(async (event) => {
  try {
    let token = extractTokenFromHeader(getHeader(event, "authorization"));

    if (!token) {
      token = getCookie(event, "@mmo/ninja/token"); // Try to get token from cookie
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

    const body = await readBody<{
      character_id: number;
      chapter: number;
      outcome: "victory" | "defeat";
    }>(event);

    const { character_id, chapter, outcome } = body;

    if (!character_id || !chapter || !outcome) {
      throw createError({
        statusCode: 400,
        message: "Dados do capítulo são obrigatórios",
      });
    }

    // Verificar se o personagem pertence ao usuário
    const character = db
      .prepare(
        `
      SELECT * FROM characters 
      WHERE id = ? AND user_id = ?
    `
      )
      .get(character_id, payload.id) as any;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Verificar se o capítulo já foi completado
    const existingProgress = db
      .prepare(
        `
      SELECT * FROM story_progress 
      WHERE character_id = ? AND chapter = ?
    `
      )
      .get(character_id, chapter);

    if (existingProgress && (existingProgress as any).completed) {
      throw createError({
        statusCode: 409,
        message: "Capítulo já foi completado",
      });
    }

    if (outcome === "victory") {
      // Marcar capítulo como completado
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

      // Adicionar recompensas baseadas no capítulo
      let xpReward = 0;
      let goldReward = 0;
      let items: string[] = [];
      let equipment: string | null = null;
      let materialsReward = 0;
      let crystalsReward = 0;

      // Recompensas por capítulo
      switch (chapter) {
        case 1:
          xpReward = 50;
          goldReward = 25;
          items = ["Poção de Cura Pequena"];
          materialsReward = 2;
          break;
        case 2:
          xpReward = 80;
          goldReward = 40;
          break;
        case 3:
          xpReward = 120;
          goldReward = 60;
          items = ["Poção de Cura Média"];
          break;
        case 4:
          xpReward = 150;
          goldReward = 75;
          break;
        case 5:
          xpReward = 300;
          goldReward = 200;
          items = ["Poção de Cura Grande"];
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
          items = ["Poção de Cura Média"];
          break;
        case 8:
          xpReward = 280;
          goldReward = 140;
          break;
        case 9:
          xpReward = 320;
          goldReward = 160;
          items = ["Poção de Cura Grande"];
          break;
        case 10:
          xpReward = 500;
          goldReward = 400;
          items = ["Poção de Cura Superior"];
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
          items = ["Poção de Cura Superior"];
          break;
        case 13:
          xpReward = 600;
          goldReward = 300;
          break;
        case 14:
          xpReward = 700;
          goldReward = 350;
          items = ["Poção de Cura Épica"];
          break;
        case 15:
          xpReward = 1000;
          goldReward = 800;
          items = ["Poção de Cura Épica"];
          equipment = "Katana do Fogo";
          break;
        case 16:
          xpReward = 800;
          goldReward = 400;
          break;
        case 17:
          xpReward = 1000;
          goldReward = 500;
          items = ["Poção de Cura Lendária"];
          break;
        case 18:
          xpReward = 2000;
          goldReward = 1500;
          items = ["Poção de Cura Lendária"];
          equipment = "Katana da Sombra";
          break;
        case 19:
          xpReward = 1200;
          goldReward = 600;
          break;
        case 20:
          xpReward = 3000;
          goldReward = 2500;
          items = ["Poção de Cura Divina"];
          equipment = "Katana Lendária";
          materialsReward = 15;
          crystalsReward = 5;
          break;
        case 21:
          xpReward = 5000;
          goldReward = 5000;
          items = ["Poção de Cura Celestial"];
          equipment = "Katana Celestial";
          materialsReward = 25;
          crystalsReward = 10;
          break;
        default:
          xpReward = 100;
          goldReward = 50;
          break;
      }

      // Adicionar XP
      const newXp = character.xp + xpReward;
      let newLevel = character.level;
      let newStats = JSON.parse(character.stats_json);

      // Verificar level up
      while (newXp >= Math.floor(1000 * Math.pow(newLevel, 1.5))) {
        newLevel++;
        newStats = {
          ...newStats,
          strength: newStats.strength + 1,
          agility: newStats.agility + 1,
          defense: newStats.defense + 1,
          health: newStats.health + 10,
          max_health: newStats.max_health + 10,
        };
      }

      // Atualizar personagem
      db.prepare(
        `
        UPDATE characters 
        SET xp = ?, level = ?, stats_json = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `
      ).run(newXp, newLevel, JSON.stringify(newStats), character_id);

      // Adicionar ouro
      const goldResource = db
        .prepare(
          `
        SELECT * FROM resources 
        WHERE character_id = ? AND resource_type = 'ouro'
      `
        )
        .get(character_id) as any;

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

      // Adicionar materiais
      if (materialsReward > 0) {
        const existingMaterial = db
          .prepare(
            `
            SELECT * FROM resources 
            WHERE character_id = ? AND resource_type = 'materiais'
          `
          )
          .get(character_id);

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

      // Adicionar cristais
      if (crystalsReward > 0) {
        const existingCrystal = db
          .prepare(
            `
            SELECT * FROM resources 
            WHERE character_id = ? AND resource_type = 'cristais'
          `
          )
          .get(character_id);

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

      // Adicionar itens
      for (const itemName of items) {
        const existingItem = db
          .prepare(
            `
          SELECT * FROM items 
          WHERE character_id = ? AND item_name = ?
        `
          )
          .get(character_id, itemName);

        if (existingItem) {
          db.prepare(
            `
            UPDATE items 
            SET quantity = quantity + 1, created_at = CURRENT_TIMESTAMP
            WHERE id = ?
          `
          ).run((existingItem as any).id);
        } else {
          db.prepare(
            `
            INSERT INTO items (character_id, item_name, item_type, quantity, stats_json)
            VALUES (?, ?, 'potion', 1, ?)
          `
          ).run(character_id, itemName, JSON.stringify({}));
        }
      }

      // Adicionar equipamento se houver
      if (equipment) {
        // Determinar tipo de equipamento baseado no nome
        let equipmentType = "weapon";
        if (equipment.includes("Armadura")) {
          equipmentType = "armor";
        }

        // Determinar stats baseado no equipamento
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
          } else if (equipment.includes("Lendária")) {
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

      const response: ApiResponse<{
        xp_gained: number;
        gold_gained: number;
        items_gained: string[];
        equipment_gained?: string;
        materials_gained: number;
        crystals_gained: number;
        level_up: boolean;
        new_level?: number;
      }> = {
        success: true,
        data: {
          xp_gained: xpReward,
          gold_gained: goldReward,
          items_gained: items,
          equipment_gained: equipment || undefined,
          materials_gained: materialsReward,
          crystals_gained: crystalsReward,
          level_up: newLevel > character.level,
          new_level: newLevel > character.level ? newLevel : undefined,
        },
        message: `Capítulo ${chapter} completado com sucesso!`,
      };

      return response;
    } else {
      // Em caso de derrota, apenas registrar
      if (!existingProgress) {
        db.prepare(
          `
          INSERT INTO story_progress (character_id, chapter, completed, completed_at)
          VALUES (?, ?, FALSE, NULL)
        `
        ).run(character_id, chapter);
      }

      const response: ApiResponse<null> = {
        success: true,
        data: null,
        message:
          "Capítulo registrado. Tente novamente quando estiver mais forte!",
      };

      return response;
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
