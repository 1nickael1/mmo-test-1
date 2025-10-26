import { hashPassword } from "./auth";
import db from "./databaseAdapter";

export function seedDatabase() {
  // Limpar dados existentes
  db.exec("DELETE FROM upgrades");
  db.exec("DELETE FROM items");
  db.exec("DELETE FROM battles");
  db.exec("DELETE FROM resources");
  db.exec("DELETE FROM skills");
  db.exec("DELETE FROM characters");
  db.exec("DELETE FROM users");

  // Criar usuário admin
  const adminPassword = hashPassword("admin123");
  const adminResult = db
    .prepare(
      `
    INSERT INTO users (email, password_hash, username)
    VALUES (?, ?, ?)
  `
    )
    .run("admin@ninjarpg.com", adminPassword, "Admin");

  // Criar usuário de teste
  const testPassword = hashPassword("test123");
  const testResult = db
    .prepare(
      `
    INSERT INTO users (email, password_hash, username)
    VALUES (?, ?, ?)
  `
    )
    .run("test@ninjarpg.com", testPassword, "TestUser");

  // Criar personagens de exemplo
  const ninjaStats = JSON.stringify({
    strength: 8,
    agility: 12,
    defense: 6,
    health: 80,
    max_health: 80,
  });

  const warriorStats = JSON.stringify({
    strength: 12,
    agility: 6,
    defense: 10,
    health: 100,
    max_health: 100,
  });

  // Personagem ninja para admin
  const ninjaResult = db
    .prepare(
      `
    INSERT INTO characters (user_id, name, class, level, xp, stats_json)
    VALUES (?, ?, ?, ?, ?, ?)
  `
    )
    .run(
      adminResult.lastInsertRowid,
      "NarutoUzumaki",
      "ninja",
      5,
      2500,
      ninjaStats
    );

  // Personagem guerreiro para admin
  const warriorResult = db
    .prepare(
      `
    INSERT INTO characters (user_id, name, class, level, xp, stats_json)
    VALUES (?, ?, ?, ?, ?, ?)
  `
    )
    .run(
      adminResult.lastInsertRowid,
      "SpaceWarrior",
      "guerreiro_espacial",
      3,
      1200,
      warriorStats
    );

  // Personagem ninja para usuário de teste
  const testNinjaResult = db
    .prepare(
      `
    INSERT INTO characters (user_id, name, class, level, xp, stats_json)
    VALUES (?, ?, ?, ?, ?, ?)
  `
    )
    .run(testResult.lastInsertRowid, "TestNinja", "ninja", 2, 800, ninjaStats);

  // Inicializar recursos para os personagens
  const characterIds = [
    ninjaResult.lastInsertRowid,
    warriorResult.lastInsertRowid,
    testNinjaResult.lastInsertRowid,
  ];

  characterIds.forEach((characterId) => {
    db.prepare(
      `
      INSERT INTO resources (character_id, resource_type, amount)
      VALUES (?, 'ouro', 1000), (?, 'cristais', 10), (?, 'materiais', 25)
    `
    ).run(characterId, characterId, characterId);
  });

  // Criar algumas habilidades para os personagens
  const skills = [
    {
      character_id: ninjaResult.lastInsertRowid,
      skill_name: "Kunai Throw",
      level: 1,
      unlocked: true,
    },
    {
      character_id: ninjaResult.lastInsertRowid,
      skill_name: "Fire Jutsu",
      level: 1,
      unlocked: true,
    },
    {
      character_id: warriorResult.lastInsertRowid,
      skill_name: "Plasma Shot",
      level: 1,
      unlocked: true,
    },
    {
      character_id: testNinjaResult.lastInsertRowid,
      skill_name: "Kunai Throw",
      level: 1,
      unlocked: true,
    },
  ];

  skills.forEach((skill) => {
    db.prepare(
      `
      INSERT INTO skills (character_id, skill_name, level, unlocked)
      VALUES (?, ?, ?, ?)
    `
    ).run(skill.character_id, skill.skill_name, skill.level, skill.unlocked);
  });

  // Criar algumas batalhas de exemplo
  const battles = [
    {
      character_id: ninjaResult.lastInsertRowid,
      opponent_type: "bandit_1",
      opponent_level: 1,
      outcome: "victory",
      xp_gained: 100,
      rewards_json: JSON.stringify({ xp: 100, gold: 50 }),
    },
    {
      character_id: ninjaResult.lastInsertRowid,
      opponent_type: "pirate_1",
      opponent_level: 2,
      outcome: "victory",
      xp_gained: 150,
      rewards_json: JSON.stringify({ xp: 150, gold: 75 }),
    },
    {
      character_id: warriorResult.lastInsertRowid,
      opponent_type: "bandit_1",
      opponent_level: 1,
      outcome: "victory",
      xp_gained: 100,
      rewards_json: JSON.stringify({ xp: 100, gold: 50 }),
    },
  ];

  battles.forEach((battle) => {
    db.prepare(
      `
      INSERT INTO battles (character_id, opponent_type, opponent_level, outcome, xp_gained, rewards_json)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    ).run(
      battle.character_id,
      battle.opponent_type,
      battle.opponent_level,
      battle.outcome,
      battle.xp_gained,
      battle.rewards_json
    );
  });

  // Criar algumas melhorias de exemplo
  const upgrades = [
    {
      character_id: ninjaResult.lastInsertRowid,
      upgrade_type: "stat",
      upgrade_name: "strength_boost",
      level: 2,
      cost_json: JSON.stringify({ gold: 500, materials: 10 }),
      is_completed: true,
    },
    {
      character_id: warriorResult.lastInsertRowid,
      upgrade_type: "building",
      upgrade_name: "training_ground",
      level: 1,
      cost_json: JSON.stringify({ gold: 1000, materials: 50, crystals: 5 }),
      is_completed: true,
    },
  ];

  upgrades.forEach((upgrade) => {
    db.prepare(
      `
      INSERT INTO upgrades (character_id, upgrade_type, upgrade_name, level, cost_json, is_completed)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    ).run(
      upgrade.character_id,
      upgrade.upgrade_type,
      upgrade.upgrade_name,
      upgrade.level,
      upgrade.cost_json,
      upgrade.is_completed
    );
  });
}
