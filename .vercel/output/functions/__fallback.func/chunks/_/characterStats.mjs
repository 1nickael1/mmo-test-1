import { g as getDatabase } from './databaseAdapter.mjs';

function calculateCharacterStatsWithEquipment(characterId) {
  const character = getDatabase.prepare("SELECT * FROM characters WHERE id = ?").get(characterId);
  if (!character) {
    throw new Error("Personagem n\xE3o encontrado");
  }
  const equippedItems = getDatabase.prepare(
    `
    SELECT * FROM equipment 
    WHERE character_id = ? AND equipped = TRUE
  `
  ).all(characterId);
  const baseStats = JSON.parse(character.stats_json);
  const equipmentBonuses = {
    strength: 0,
    agility: 0,
    defense: 0,
    health: 0,
    damage: 0
  };
  equippedItems.forEach((item) => {
    const itemStats = JSON.parse(item.stats_json || "{}");
    equipmentBonuses.strength += itemStats.strength || 0;
    equipmentBonuses.agility += itemStats.agility || 0;
    equipmentBonuses.defense += itemStats.defense || 0;
    equipmentBonuses.health += itemStats.health || 0;
    equipmentBonuses.damage += itemStats.damage || 0;
  });
  const finalStats = {
    strength: baseStats.strength + (equipmentBonuses.strength || 0),
    agility: baseStats.agility + (equipmentBonuses.agility || 0),
    defense: baseStats.defense + (equipmentBonuses.defense || 0),
    health: baseStats.health + (equipmentBonuses.health || 0),
    max_health: baseStats.max_health + (equipmentBonuses.health || 0)
  };
  return {
    baseStats,
    equipmentBonuses,
    finalStats
  };
}

export { calculateCharacterStatsWithEquipment as c };
//# sourceMappingURL=characterStats.mjs.map
