import type { CharacterStats, EquipmentStats } from "../../types";
import db from "./database";

export function calculateCharacterStatsWithEquipment(characterId: number): {
  baseStats: CharacterStats;
  equipmentBonuses: EquipmentStats;
  finalStats: CharacterStats;
} {
  // Buscar personagem
  const character = db
    .prepare("SELECT * FROM characters WHERE id = ?")
    .get(characterId) as any;

  if (!character) {
    throw new Error("Personagem não encontrado");
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
    strength: baseStats.strength + (equipmentBonuses.strength || 0),
    agility: baseStats.agility + (equipmentBonuses.agility || 0),
    defense: baseStats.defense + (equipmentBonuses.defense || 0),
    health: baseStats.health + (equipmentBonuses.health || 0),
    max_health: baseStats.max_health + (equipmentBonuses.health || 0),
  };

  return {
    baseStats,
    equipmentBonuses,
    finalStats,
  };
}
