import type {
  ApiResponse,
  CharacterStats,
  EquipmentStats,
} from "../../../../types";
import { extractTokenFromHeader, verifyToken } from "../../../utils/auth";
import getDatabase from "../../../utils/databaseAdapter";

export default defineEventHandler(async (event) => {
    const db = getDatabase();
  try {
    const authHeader = getHeader(event, "authorization");
    const token = extractTokenFromHeader(authHeader);

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

    const characterId = getRouterParam(event, "id");

    if (!characterId) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem é obrigatório",
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
      .get(characterId, payload.id) as any;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Buscar equipamentos equipados
    const equippedItems = db
      .prepare(
        `
      SELECT * FROM equipment 
      WHERE character_id = ? AND equipped = TRUE
    `
      )
      .all(characterId) as any[];

    // Stats base do personagem
    const baseStats: CharacterStats = JSON.parse(character.stats_json);

    // Calcular bônus dos equipamentos
    const equipmentBonuses: EquipmentStats = {
      strength: 0,
      agility: 0,
      defense: 0,
      health: 0,
      damage: 0,
    };

    equippedItems.forEach((item) => {
      const itemStats = JSON.parse(item.stats_json || "{}");
      equipmentBonuses.strength += itemStats.strength || 0;
      equipmentBonuses.agility += itemStats.agility || 0;
      equipmentBonuses.defense += itemStats.defense || 0;
      equipmentBonuses.health += itemStats.health || 0;
      equipmentBonuses.damage += itemStats.damage || 0;
    });

    // Stats finais (base + equipamentos)
    const finalStats: CharacterStats = {
      strength: baseStats.strength + equipmentBonuses.strength,
      agility: baseStats.agility + equipmentBonuses.agility,
      defense: baseStats.defense + equipmentBonuses.defense,
      health: baseStats.health + equipmentBonuses.health,
      max_health: baseStats.max_health + equipmentBonuses.health,
    };

    const response: ApiResponse<{
      base_stats: CharacterStats;
      equipment_bonuses: EquipmentStats;
      final_stats: CharacterStats;
      equipped_items: any[];
    }> = {
      success: true,
      data: {
        base_stats: baseStats,
        equipment_bonuses: equipmentBonuses,
        final_stats: finalStats,
        equipped_items: equippedItems,
      },
      message: "Stats calculados com sucesso!",
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
