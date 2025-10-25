import type { ApiResponse, BattleRewards } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/database";

export default defineEventHandler(async (event) => {
  try {
    let token = extractTokenFromHeader(getHeader(event, "authorization"));

    if (!token) {
      token = getCookie(event, "token"); // Try to get token from cookie
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
      opponent_id: string;
      outcome: "victory" | "defeat";
      character_health_remaining: number;
      battle_type?: "normal" | "story";
      chapter?: number;
    }>(event);

    const {
      character_id,
      opponent_id,
      outcome,
      character_health_remaining,
      battle_type = "normal",
      chapter,
    } = body;

    if (!character_id || !opponent_id || !outcome) {
      throw createError({
        statusCode: 400,
        message: "Dados da batalha são obrigatórios",
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

    // Buscar dados do oponente para recompensas corretas
    const NPC_OPPONENTS: Record<string, any> = {
      bandido_espacial_1: { xp_reward: 100, gold_reward: 25 },
      pirata_espacial_2: { xp_reward: 150, gold_reward: 40 },
      ciborgue_rebelde_3: { xp_reward: 200, gold_reward: 60 },
      alienigena_hostil_4: { xp_reward: 250, gold_reward: 80 },
      ninja_renegado_5: { xp_reward: 300, gold_reward: 100 },
      // Adicionar mais NPCs conforme necessário
    };

    // Calcular recompensas baseado no resultado
    let xpGained = 0;
    let goldGained = 0;
    let rewards: BattleRewards = {
      xp: 0,
      gold: 0,
    };

    if (outcome === "victory") {
      // Usar recompensas específicas do NPC
      const opponentData = NPC_OPPONENTS[opponent_id];
      if (opponentData) {
        xpGained = opponentData.xp_reward;
        goldGained = opponentData.gold_reward;
      } else {
        // Fallback para fórmula genérica se NPC não encontrado
        const opponentLevel = parseInt(opponent_id.split("_")[1]) || 1;
        xpGained = Math.floor(100 * Math.pow(opponentLevel, 1.2));
        goldGained = Math.floor(50 * Math.pow(opponentLevel, 1.1));
      }

      rewards = {
        xp: xpGained,
        gold: goldGained,
        items: Math.random() < 0.3 ? ["Potion de Cura"] : undefined,
        materials:
          Math.random() < 0.4 ? Math.floor(Math.random() * 3) + 1 : undefined,
        crystals:
          Math.random() < 0.1 ? Math.floor(Math.random() * 2) + 1 : undefined,
      };
    } else {
      // Recompensas por derrota (menores)
      xpGained = Math.floor(25 * Math.random());
      goldGained = Math.floor(10 * Math.random());

      rewards = {
        xp: xpGained,
        gold: goldGained,
      };
    }

    // Atualizar vida do personagem
    const characterStats = JSON.parse(character.stats_json);
    characterStats.health = Math.max(0, character_health_remaining);

    // Adicionar XP
    const newXp = character.xp + xpGained;
    let newLevel = character.level;
    let newStats = characterStats;

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

    // Atualizar personagem no banco
    db.prepare(
      `
      UPDATE characters 
      SET xp = ?, level = ?, stats_json = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
    ).run(newXp, newLevel, JSON.stringify(newStats), character_id);

    // Atualizar recursos (ouro)
    if (goldGained > 0) {
      const existingResource = db
        .prepare(
          `
            SELECT * FROM resources 
            WHERE character_id = ? AND resource_type = 'ouro'
          `
        )
        .get(character_id);

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

    // Adicionar materiais
    if (rewards.materials && rewards.materials > 0) {
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

    // Adicionar cristais
    if (rewards.crystals && rewards.crystals > 0) {
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

    // Adicionar itens ao inventário
    if (rewards.items && rewards.items.length > 0) {
      for (const itemName of rewards.items) {
        // Verificar se o item já existe
        const existingItem = db
          .prepare(
            `
              SELECT * FROM items 
              WHERE character_id = ? AND item_name = ?
            `
          )
          .get(character_id, itemName);

        if (existingItem) {
          // Incrementar quantidade
          db.prepare(
            `
                UPDATE items 
                SET quantity = quantity + 1, created_at = CURRENT_TIMESTAMP
                WHERE id = ?
              `
          ).run(existingItem.id);
        } else {
          // Criar novo item
          const itemType = itemName.includes("Potion")
            ? "potion"
            : "consumable";
          db.prepare(
            `
                INSERT INTO items (character_id, item_name, item_type, quantity, stats_json)
                VALUES (?, ?, ?, 1, ?)
              `
          ).run(character_id, itemName, itemType, JSON.stringify({}));
        }
      }
    }

    // Registrar batalha no histórico
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

    // Se for uma batalha de história e o jogador venceu, marcar capítulo como completado
    if (battle_type === "story" && outcome === "victory" && chapter) {
      const existingProgress = db
        .prepare(
          `
        SELECT * FROM story_progress 
        WHERE character_id = ? AND chapter = ?
      `
        )
        .get(character_id, chapter);

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

    // Remover batalha ativa
    db.prepare(
      `
      DELETE FROM active_battles 
      WHERE character_id = ?
    `
    ).run(character_id);

    // Buscar personagem atualizado
    const updatedCharacter = db
      .prepare("SELECT * FROM characters WHERE id = ?")
      .get(character_id) as any;

    const response: ApiResponse<{
      character: any;
      rewards: BattleRewards;
      level_up: boolean;
      new_level?: number;
      outcome: "victory" | "defeat";
      chapter_completed?: boolean;
    }> = {
      success: true,
      data: {
        character: {
          ...updatedCharacter,
          stats: newStats,
        },
        rewards,
        level_up: newLevel > character.level,
        new_level: newLevel > character.level ? newLevel : undefined,
        outcome,
        chapter_completed:
          battle_type === "story" && outcome === "victory" && chapter
            ? true
            : undefined,
      },
      message: outcome === "victory" ? "Vitória!" : "Derrota...",
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
