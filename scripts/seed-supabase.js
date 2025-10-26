#!/usr/bin/env node

// Script completo de seed para Supabase - MMO RPG Project
import { createClient } from "@vercel/postgres";
import bcrypt from "bcryptjs";

async function seedSupabaseDatabase() {
  console.log("🌱 Iniciando seed completo do banco Supabase...\n");

  // Verificar variáveis de ambiente
  const postgresUrl = process.env.POSTGRES_URL;

  if (!postgresUrl) {
    console.log("❌ POSTGRES_URL não encontrado nas variáveis de ambiente");
    console.log("   Configure POSTGRES_URL no painel da Vercel\n");
    return;
  }

  try {
    // Criar cliente PostgreSQL
    const client = createClient({
      connectionString: postgresUrl,
    });

    console.log("🔌 Conectando ao Supabase...");

    // Verificar se as tabelas existem
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);

    const tables = tablesResult.rows.map((row) => row.table_name);

    if (tables.length === 0) {
      console.log("❌ Nenhuma tabela encontrada");
      console.log(
        "   Execute primeiro o script supabase-schema.sql no Supabase SQL Editor\n"
      );
      return;
    }

    console.log(`✅ ${tables.length} tabelas encontradas`);
    console.log("📋 Tabelas:", tables.join(", "), "\n");

    // Limpar dados existentes (opcional)
    console.log("🧹 Limpando dados existentes...");
    await client.query("DELETE FROM battle_logs");
    await client.query("DELETE FROM missions");
    await client.query("DELETE FROM story_progress");
    await client.query("DELETE FROM upgrades");
    await client.query("DELETE FROM equipment");
    await client.query("DELETE FROM skills");
    await client.query("DELETE FROM characters");
    await client.query("DELETE FROM users");
    console.log("✅ Dados limpos\n");

    // 1. Criar usuários de exemplo
    console.log("👥 Criando usuários...");

    const users = [
      {
        email: "admin@mmo.com",
        username: "admin",
        password: "admin123",
      },
      {
        email: "test@mmo.com",
        username: "testuser",
        password: "test123",
      },
      {
        email: "player@mmo.com",
        username: "player",
        password: "player123",
      },
    ];

    const userIds = [];
    for (const user of users) {
      const passwordHash = bcrypt.hashSync(user.password, 10);
      const result = await client.query(
        `INSERT INTO users (email, password_hash, username) 
         VALUES ($1, $2, $3) RETURNING id`,
        [user.email, passwordHash, user.username]
      );
      userIds.push(result.rows[0].id);
      console.log(
        `   ✅ Usuário criado: ${user.username} (ID: ${result.rows[0].id})`
      );
    }
    console.log();

    // 2. Criar personagens
    console.log("🎮 Criando personagens...");

    const characters = [
      {
        user_id: userIds[0],
        name: "AdminNinja",
        class: "ninja",
        level: 5,
        xp: 2500,
        health: 150,
        max_health: 150,
        mana: 80,
        max_mana: 80,
        attack: 25,
        defense: 15,
        speed: 20,
        gold: 1000,
        materials: 50,
        crystals: 25,
      },
      {
        user_id: userIds[1],
        name: "TestWarrior",
        class: "guerreiro_espacial",
        level: 3,
        xp: 1200,
        health: 120,
        max_health: 120,
        mana: 60,
        max_mana: 60,
        attack: 20,
        defense: 18,
        speed: 12,
        gold: 500,
        materials: 30,
        crystals: 15,
      },
      {
        user_id: userIds[2],
        name: "PlayerMage",
        class: "mago_elemental",
        level: 2,
        xp: 800,
        health: 100,
        max_health: 100,
        mana: 100,
        max_mana: 100,
        attack: 15,
        defense: 10,
        speed: 15,
        gold: 300,
        materials: 20,
        crystals: 10,
      },
    ];

    const characterIds = [];
    for (const char of characters) {
      const result = await client.query(
        `INSERT INTO characters (user_id, name, class, level, xp, health, max_health, mana, max_mana, attack, defense, speed, gold, materials, crystals) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id`,
        [
          char.user_id,
          char.name,
          char.class,
          char.level,
          char.xp,
          char.health,
          char.max_health,
          char.mana,
          char.max_mana,
          char.attack,
          char.defense,
          char.speed,
          char.gold,
          char.materials,
          char.crystals,
        ]
      );
      characterIds.push(result.rows[0].id);
      console.log(
        `   ✅ Personagem criado: ${char.name} (${char.class}, Nível ${char.level})`
      );
    }
    console.log();

    // 3. Criar habilidades
    console.log("⚔️ Criando habilidades...");

    const skills = [
      // Ninja
      { character_id: characterIds[0], skill_name: "Kunai Throw", level: 3 },
      { character_id: characterIds[0], skill_name: "Shadow Strike", level: 2 },
      { character_id: characterIds[0], skill_name: "Stealth", level: 1 },

      // Guerreiro Espacial
      { character_id: characterIds[1], skill_name: "Plasma Slash", level: 2 },
      { character_id: characterIds[1], skill_name: "Shield Bash", level: 1 },
      { character_id: characterIds[1], skill_name: "Energy Burst", level: 1 },

      // Mago Elemental
      { character_id: characterIds[2], skill_name: "Fireball", level: 2 },
      { character_id: characterIds[2], skill_name: "Ice Shard", level: 1 },
      { character_id: characterIds[2], skill_name: "Lightning Bolt", level: 1 },
    ];

    for (const skill of skills) {
      await client.query(
        `INSERT INTO skills (character_id, skill_name, level) 
         VALUES ($1, $2, $3)`,
        [skill.character_id, skill.skill_name, skill.level]
      );
      console.log(
        `   ✅ Habilidade: ${skill.skill_name} (Nível ${skill.level})`
      );
    }
    console.log();

    // 4. Criar equipamentos
    console.log("🛡️ Criando equipamentos...");

    const equipments = [
      // AdminNinja
      {
        character_id: characterIds[0],
        equipment_name: "Kunai Afiado",
        equipment_type: "weapon",
        equipped: true,
        stats_json: '{"attack": 15, "speed": 5}',
      },
      {
        character_id: characterIds[0],
        equipment_name: "Armadura Ninja",
        equipment_type: "armor",
        equipped: true,
        stats_json: '{"defense": 10, "health": 20}',
      },
      {
        character_id: characterIds[0],
        equipment_name: "Anel de Velocidade",
        equipment_type: "accessory",
        equipped: true,
        stats_json: '{"speed": 8}',
      },

      // TestWarrior
      {
        character_id: characterIds[1],
        equipment_name: "Espada de Plasma",
        equipment_type: "weapon",
        equipped: true,
        stats_json: '{"attack": 20, "defense": 5}',
      },
      {
        character_id: characterIds[1],
        equipment_name: "Armadura Espacial",
        equipment_type: "armor",
        equipped: true,
        stats_json: '{"defense": 15, "health": 25}',
      },

      // PlayerMage
      {
        character_id: characterIds[2],
        equipment_name: "Cajado Elemental",
        equipment_type: "weapon",
        equipped: true,
        stats_json: '{"attack": 12, "mana": 20}',
      },
      {
        character_id: characterIds[2],
        equipment_name: "Robe Mística",
        equipment_type: "armor",
        equipped: true,
        stats_json: '{"defense": 8, "mana": 30}',
      },
    ];

    for (const equip of equipments) {
      await client.query(
        `INSERT INTO equipment (character_id, equipment_name, equipment_type, equipped, stats_json) 
         VALUES ($1, $2, $3, $4, $5)`,
        [
          equip.character_id,
          equip.equipment_name,
          equip.equipment_type,
          equip.equipped,
          equip.stats_json,
        ]
      );
      console.log(
        `   ✅ Equipamento: ${equip.equipment_name} (${equip.equipment_type})`
      );
    }
    console.log();

    // 5. Criar upgrades
    console.log("⬆️ Criando upgrades...");

    const upgrades = [
      // AdminNinja
      {
        character_id: characterIds[0],
        upgrade_type: "attack",
        level: 3,
        max_level: 10,
        cost_gold: 500,
        cost_materials: 25,
        cost_crystals: 10,
      },
      {
        character_id: characterIds[0],
        upgrade_type: "defense",
        level: 2,
        max_level: 10,
        cost_gold: 400,
        cost_materials: 20,
        cost_crystals: 8,
      },
      {
        character_id: characterIds[0],
        upgrade_type: "speed",
        level: 4,
        max_level: 10,
        cost_gold: 600,
        cost_materials: 30,
        cost_crystals: 12,
      },

      // TestWarrior
      {
        character_id: characterIds[1],
        upgrade_type: "attack",
        level: 2,
        max_level: 10,
        cost_gold: 300,
        cost_materials: 15,
        cost_crystals: 6,
      },
      {
        character_id: characterIds[1],
        upgrade_type: "defense",
        level: 3,
        max_level: 10,
        cost_gold: 450,
        cost_materials: 22,
        cost_crystals: 9,
      },

      // PlayerMage
      {
        character_id: characterIds[2],
        upgrade_type: "attack",
        level: 1,
        max_level: 10,
        cost_gold: 200,
        cost_materials: 10,
        cost_crystals: 4,
      },
      {
        character_id: characterIds[2],
        upgrade_type: "mana",
        level: 2,
        max_level: 10,
        cost_gold: 350,
        cost_materials: 18,
        cost_crystals: 7,
      },
    ];

    for (const upgrade of upgrades) {
      await client.query(
        `INSERT INTO upgrades (character_id, upgrade_type, level, max_level, cost_gold, cost_materials, cost_crystals) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          upgrade.character_id,
          upgrade.upgrade_type,
          upgrade.level,
          upgrade.max_level,
          upgrade.cost_gold,
          upgrade.cost_materials,
          upgrade.cost_crystals,
        ]
      );
      console.log(
        `   ✅ Upgrade: ${upgrade.upgrade_type} (Nível ${upgrade.level}/${upgrade.max_level})`
      );
    }
    console.log();

    // 6. Criar progresso da história
    console.log("📖 Criando progresso da história...");

    const storyProgress = [
      {
        character_id: characterIds[0],
        chapter: 1,
        completed: true,
        completed_at: new Date(),
      },
      {
        character_id: characterIds[0],
        chapter: 2,
        completed: true,
        completed_at: new Date(),
      },
      { character_id: characterIds[0], chapter: 3, completed: false },

      {
        character_id: characterIds[1],
        chapter: 1,
        completed: true,
        completed_at: new Date(),
      },
      { character_id: characterIds[1], chapter: 2, completed: false },

      { character_id: characterIds[2], chapter: 1, completed: false },
    ];

    for (const story of storyProgress) {
      await client.query(
        `INSERT INTO story_progress (character_id, chapter, completed, completed_at) 
         VALUES ($1, $2, $3, $4)`,
        [story.character_id, story.chapter, story.completed, story.completed_at]
      );
      console.log(
        `   ✅ Capítulo ${story.chapter}: ${
          story.completed ? "Completo" : "Pendente"
        }`
      );
    }
    console.log();

    // 7. Criar missões
    console.log("🎯 Criando missões...");

    const missions = [
      {
        character_id: characterIds[0],
        mission_name: "Primeira Batalha",
        description: "Derrote 5 inimigos",
        reward_gold: 100,
        reward_xp: 50,
        reward_materials: 5,
        completed: true,
        completed_at: new Date(),
      },
      {
        character_id: characterIds[0],
        mission_name: "Coleta de Cristais",
        description: "Colete 10 cristais",
        reward_gold: 150,
        reward_xp: 75,
        reward_materials: 8,
        completed: false,
      },

      {
        character_id: characterIds[1],
        mission_name: "Treinamento Básico",
        description: "Complete o tutorial",
        reward_gold: 50,
        reward_xp: 25,
        reward_materials: 3,
        completed: true,
        completed_at: new Date(),
      },
      {
        character_id: characterIds[1],
        mission_name: "Exploração",
        description: "Explore 3 áreas",
        reward_gold: 200,
        reward_xp: 100,
        reward_materials: 10,
        completed: false,
      },

      {
        character_id: characterIds[2],
        mission_name: "Aprendizado Mágico",
        description: "Aprenda 2 habilidades",
        reward_gold: 75,
        reward_xp: 40,
        reward_materials: 4,
        completed: false,
      },
    ];

    for (const mission of missions) {
      await client.query(
        `INSERT INTO missions (character_id, mission_name, description, reward_gold, reward_xp, reward_materials, completed, completed_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          mission.character_id,
          mission.mission_name,
          mission.description,
          mission.reward_gold,
          mission.reward_xp,
          mission.reward_materials,
          mission.completed,
          mission.completed_at,
        ]
      );
      console.log(
        `   ✅ Missão: ${mission.mission_name} - ${
          mission.completed ? "Completa" : "Pendente"
        }`
      );
    }
    console.log();

    // 8. Criar logs de batalha
    console.log("⚔️ Criando logs de batalha...");

    const battleLogs = [
      {
        character_id: characterIds[0],
        opponent_name: "Goblin",
        result: "victory",
        damage_dealt: 45,
        damage_received: 15,
        gold_earned: 25,
        xp_earned: 30,
        battle_duration: 120,
      },
      {
        character_id: characterIds[0],
        opponent_name: "Orc",
        result: "victory",
        damage_dealt: 60,
        damage_received: 25,
        gold_earned: 40,
        xp_earned: 45,
        battle_duration: 180,
      },
      {
        character_id: characterIds[0],
        opponent_name: "Dragon",
        result: "defeat",
        damage_dealt: 80,
        damage_received: 120,
        gold_earned: 0,
        xp_earned: 15,
        battle_duration: 300,
      },

      {
        character_id: characterIds[1],
        opponent_name: "Skeleton",
        result: "victory",
        damage_dealt: 35,
        damage_received: 20,
        gold_earned: 20,
        xp_earned: 25,
        battle_duration: 90,
      },
      {
        character_id: characterIds[1],
        opponent_name: "Spider",
        result: "victory",
        damage_dealt: 50,
        damage_received: 18,
        gold_earned: 30,
        xp_earned: 35,
        battle_duration: 150,
      },

      {
        character_id: characterIds[2],
        opponent_name: "Slime",
        result: "victory",
        damage_dealt: 25,
        damage_received: 10,
        gold_earned: 15,
        xp_earned: 20,
        battle_duration: 60,
      },
    ];

    for (const battle of battleLogs) {
      await client.query(
        `INSERT INTO battle_logs (character_id, opponent_name, result, damage_dealt, damage_received, gold_earned, xp_earned, battle_duration) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          battle.character_id,
          battle.opponent_name,
          battle.result,
          battle.damage_dealt,
          battle.damage_received,
          battle.gold_earned,
          battle.xp_earned,
          battle.battle_duration,
        ]
      );
      console.log(
        `   ✅ Batalha: ${battle.opponent_name} - ${battle.result} (${battle.xp_earned} XP)`
      );
    }

    // Fechar conexão
    await client.end();

    console.log("\n🎯 Seed completo realizado com sucesso!");
    console.log("📊 Resumo dos dados criados:");
    console.log(`   👥 ${users.length} usuários`);
    console.log(`   🎮 ${characters.length} personagens`);
    console.log(`   ⚔️ ${skills.length} habilidades`);
    console.log(`   🛡️ ${equipments.length} equipamentos`);
    console.log(`   ⬆️ ${upgrades.length} upgrades`);
    console.log(`   📖 ${storyProgress.length} capítulos de história`);
    console.log(`   🎯 ${missions.length} missões`);
    console.log(`   ⚔️ ${battleLogs.length} logs de batalha`);
    console.log(
      "\n✅ Banco Supabase completamente populado e pronto para uso!"
    );
  } catch (error) {
    console.log("❌ Erro durante o seed:");
    console.log(`   ${error.message}\n`);

    if (error.message.includes("ENOTFOUND")) {
      console.log("💡 Possíveis soluções:");
      console.log("   - Verifique se o POSTGRES_URL está correto");
      console.log("   - Confirme se o projeto Supabase está ativo");
      console.log("   - Execute primeiro o script supabase-schema.sql\n");
    }
  }
}

// Executar seed
seedSupabaseDatabase();
