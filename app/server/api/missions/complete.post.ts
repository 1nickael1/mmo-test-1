import type { ApiResponse } from "../../../types";
import { verifyToken } from "../../utils/auth";
import db from "../../utils/database";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { missionId, characterId } = body;

    if (!missionId || !characterId) {
      throw createError({
        statusCode: 400,
        message: "ID da missão e do personagem são obrigatórios",
      });
    }

    // Verificar autenticação
    const token = getCookie(event, "token");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Token de autenticação não encontrado",
      });
    }

    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        message: "Token inválido",
      });
    }

    // Verificar se o personagem pertence ao usuário
    const character = db
      .prepare("SELECT * FROM characters WHERE id = ? AND user_id = ?")
      .get(characterId, payload.id) as any;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Definir recompensas por missão (simulado)
    const missionRewards: Record<
      string,
      { xp: number; gold: number; materials?: number; crystals?: number }
    > = {
      first_battle: { xp: 200, gold: 50 },
      reach_level_2: { xp: 100, gold: 25 },
      defeat_pirates: { xp: 400, gold: 100 },
      learn_fire_jutsu: { xp: 300, gold: 75 },
      collect_materials: { xp: 500, gold: 125, materials: 5 },
      defeat_ninja_renegade: { xp: 600, gold: 150 },
      lorde_sombras: { xp: 800, gold: 200 },
      imperador_espacial: { xp: 1000, gold: 250 },
      dragao_espacial: { xp: 1200, gold: 300 },
      mestre_ninja: { xp: 1400, gold: 350 },
      general_imperial: { xp: 1600, gold: 400 },
      imperador_sombras: { xp: 3000, gold: 750 },
      entidade_cosmica: { xp: 5000, gold: 1250 },
      deus_destruicao: { xp: 10000, gold: 2500 },
      entidade_primordial: { xp: 20000, gold: 5000 },
      entidade_cosmica_suprema: { xp: 50000, gold: 12500 },
      entidade_absoluta: { xp: 100000, gold: 25000 },
      entidade_primordial_suprema: { xp: 200000, gold: 50000 },
      entidade_criacao_final: { xp: 500000, gold: 100000 },
    };

    const rewards = missionRewards[missionId] || { xp: 100, gold: 25 };

    // Adicionar recompensas ao personagem
    const characterStats = JSON.parse(character.stats_json);

    // Adicionar XP
    const newXp = character.xp + rewards.xp;

    // Calcular level ups
    const getXpForLevel = (level: number): number => {
      if (level <= 10) {
        return 1000 + (level - 1) * 500;
      } else if (level <= 20) {
        return Math.floor(5500 + Math.pow(level - 10, 1.8) * 1000);
      } else if (level <= 30) {
        return Math.floor(15000 + Math.pow(level - 20, 2.2) * 2000);
      } else if (level <= 40) {
        return Math.floor(50000 + Math.pow(level - 30, 2.5) * 5000);
      } else {
        return Math.floor(150000 + Math.pow(level - 40, 3) * 10000);
      }
    };

    let newLevel = character.level;
    let levelUps = 0;

    while (newLevel < 50 && newXp >= getXpForLevel(newLevel)) {
      newLevel++;
      levelUps++;
    }

    // Atualizar stats se houve level up
    if (levelUps > 0) {
      characterStats.strength += levelUps;
      characterStats.agility += levelUps;
      characterStats.defense += levelUps;
      characterStats.health += levelUps * 10;
      characterStats.max_health += levelUps * 10;
      characterStats.health = characterStats.max_health; // Restaurar vida
    }

    // Atualizar personagem
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

    // Adicionar recursos (ouro, materiais, cristais)
    const addResource = (resourceType: string, amount: number) => {
      const existingResource = db
        .prepare(
          "SELECT * FROM resources WHERE character_id = ? AND resource_type = ?"
        )
        .get(characterId, resourceType) as any;

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

    // Registrar conclusão da missão
    const completeMissionStmt = db.prepare(`
      INSERT OR REPLACE INTO mission_progress (character_id, mission_id, completed, completed_at)
      VALUES (?, ?, TRUE, CURRENT_TIMESTAMP)
    `);

    completeMissionStmt.run(characterId, missionId);

    const response: ApiResponse<any> = {
      success: true,
      data: {
        rewards,
        levelUps,
        newLevel,
        newXp,
      },
      message:
        levelUps > 0
          ? `Missão concluída! Você subiu ${levelUps} nível(is) e ganhou ${rewards.xp} XP e ${rewards.gold} ouro!`
          : `Missão concluída! Você ganhou ${rewards.xp} XP e ${rewards.gold} ouro!`,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
