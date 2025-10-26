#!/usr/bin/env node

// Script para popular banco com todos os itens e habilidades do projeto
import { createClient } from "@vercel/postgres";

async function populateGameData() {
  console.log("🎮 Populando dados completos do jogo no Supabase...\n");

  const postgresUrl = process.env.POSTGRES_URL;

  if (!postgresUrl) {
    console.log("❌ POSTGRES_URL não encontrado");
    return;
  }

  try {
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
      console.log("❌ Execute primeiro o script supabase-schema.sql");
      return;
    }

    console.log(`✅ ${tables.length} tabelas encontradas\n`);

    // 1. Criar usuário admin padrão
    console.log("👤 Criando usuário admin padrão...");

    const adminPasswordHash =
      "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"; // password: "password"

    const adminResult = await client.query(
      `INSERT INTO users (email, password_hash, username) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash
       RETURNING id`,
      ["admin@mmo.com", adminPasswordHash, "admin"]
    );

    const adminUserId = adminResult.rows[0].id;
    console.log(`   ✅ Admin criado/atualizado (ID: ${adminUserId})\n`);

    // 2. Criar personagem admin com todas as classes
    console.log("🎮 Criando personagens admin para todas as classes...");

    const classes = [
      "ninja",
      "guerreiro_espacial",
      "mago_elemental",
      "arqueiro_elfo",
      "paladino_sagrado",
      "ladrao_sombrio",
    ];

    const characterIds = [];
    for (const className of classes) {
      const result = await client.query(
        `INSERT INTO characters (user_id, name, class, level, xp, health, max_health, mana, max_mana, attack, defense, speed, gold, materials, crystals) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
         ON CONFLICT (user_id, name) DO UPDATE SET class = EXCLUDED.class
         RETURNING id`,
        [
          adminUserId,
          `Admin${className.charAt(0).toUpperCase() + className.slice(1)}`,
          className,
          50,
          100000,
          500,
          500,
          300,
          300,
          100,
          80,
          60,
          10000,
          1000,
          500,
        ]
      );
      characterIds.push(result.rows[0].id);
      console.log(
        `   ✅ ${className}: Admin${
          className.charAt(0).toUpperCase() + className.slice(1)
        } (Nível 50)`
      );
    }
    console.log();

    // 3. Criar todas as habilidades para cada classe
    console.log("⚔️ Criando habilidades para todas as classes...");

    const skillsByClass = {
      ninja: [
        "Kunai Throw",
        "Shadow Strike",
        "Stealth",
        "Ninja Dash",
        "Poison Dart",
        "Smoke Bomb",
        "Assassinate",
        "Shadow Clone",
        "Ninja Reflex",
        "Silent Kill",
      ],
      guerreiro_espacial: [
        "Plasma Slash",
        "Shield Bash",
        "Energy Burst",
        "Gravity Strike",
        "Laser Beam",
        "Force Field",
        "Warp Strike",
        "Energy Shield",
        "Plasma Cannon",
        "Space Warp",
      ],
      mago_elemental: [
        "Fireball",
        "Ice Shard",
        "Lightning Bolt",
        "Earthquake",
        "Wind Blast",
        "Elemental Fusion",
        "Meteor",
        "Blizzard",
        "Thunderstorm",
        "Elemental Mastery",
      ],
      arqueiro_elfo: [
        "Precise Shot",
        "Multi Arrow",
        "Nature's Blessing",
        "Eagle Eye",
        "Forest Arrow",
        "Wind Arrow",
        "Poison Arrow",
        "Explosive Arrow",
        "Rain of Arrows",
        "Nature's Wrath",
      ],
      paladino_sagrado: [
        "Holy Strike",
        "Divine Shield",
        "Healing Light",
        "Sacred Smite",
        "Blessing",
        "Divine Protection",
        "Holy Wrath",
        "Sacred Ground",
        "Divine Intervention",
        "Heaven's Light",
      ],
      ladrao_sombrio: [
        "Backstab",
        "Pickpocket",
        "Stealth",
        "Poison Blade",
        "Shadow Step",
        "Lockpick",
        "Trap Disarm",
        "Sneak Attack",
        "Shadow Veil",
        "Master Thief",
      ],
    };

    for (let i = 0; i < classes.length; i++) {
      const className = classes[i];
      const characterId = characterIds[i];
      const skills = skillsByClass[className];

      for (const skillName of skills) {
        await client.query(
          `INSERT INTO skills (character_id, skill_name, level) 
           VALUES ($1, $2, $3) 
           ON CONFLICT (character_id, skill_name) DO UPDATE SET level = EXCLUDED.level`,
          [characterId, skillName, 50] // Todas as habilidades no nível máximo
        );
      }
      console.log(
        `   ✅ ${className}: ${skills.length} habilidades (Nível 50)`
      );
    }
    console.log();

    // 4. Criar equipamentos para todas as classes
    console.log("🛡️ Criando equipamentos para todas as classes...");

    const equipmentByClass = {
      ninja: [
        {
          name: "Kunai Lendário",
          type: "weapon",
          stats: { attack: 50, speed: 30 },
        },
        {
          name: "Armadura Ninja Suprema",
          type: "armor",
          stats: { defense: 40, speed: 20 },
        },
        {
          name: "Máscara da Sombra",
          type: "accessory",
          stats: { stealth: 25, speed: 15 },
        },
        {
          name: "Botas Ninja",
          type: "accessory",
          stats: { speed: 20, agility: 15 },
        },
      ],
      guerreiro_espacial: [
        {
          name: "Espada de Plasma",
          type: "weapon",
          stats: { attack: 60, energy: 25 },
        },
        {
          name: "Armadura Espacial",
          type: "armor",
          stats: { defense: 50, health: 30 },
        },
        {
          name: "Escudo Energético",
          type: "accessory",
          stats: { defense: 30, energy: 20 },
        },
        {
          name: "Capacete Espacial",
          type: "accessory",
          stats: { defense: 20, vision: 15 },
        },
      ],
      mago_elemental: [
        {
          name: "Cajado Elemental",
          type: "weapon",
          stats: { attack: 45, mana: 40 },
        },
        {
          name: "Robe Mística",
          type: "armor",
          stats: { defense: 30, mana: 50 },
        },
        {
          name: "Anel do Poder",
          type: "accessory",
          stats: { mana: 30, magic_power: 25 },
        },
        {
          name: "Amuleto Elemental",
          type: "accessory",
          stats: { elemental_mastery: 20, mana: 20 },
        },
      ],
      arqueiro_elfo: [
        {
          name: "Arco Élfico",
          type: "weapon",
          stats: { attack: 55, precision: 30 },
        },
        {
          name: "Armadura de Folhas",
          type: "armor",
          stats: { defense: 35, nature_resistance: 25 },
        },
        {
          name: "Aljava Mágica",
          type: "accessory",
          stats: { arrow_count: 50, precision: 20 },
        },
        {
          name: "Botas Élficas",
          type: "accessory",
          stats: { speed: 25, nature_affinity: 15 },
        },
      ],
      paladino_sagrado: [
        {
          name: "Espada Sagrada",
          type: "weapon",
          stats: { attack: 65, holy_power: 35 },
        },
        {
          name: "Armadura Divina",
          type: "armor",
          stats: { defense: 55, holy_resistance: 30 },
        },
        {
          name: "Escudo Sagrado",
          type: "accessory",
          stats: { defense: 35, holy_power: 25 },
        },
        {
          name: "Coroa Divina",
          type: "accessory",
          stats: { holy_power: 30, wisdom: 20 },
        },
      ],
      ladrao_sombrio: [
        {
          name: "Adagas Sombrias",
          type: "weapon",
          stats: { attack: 50, stealth: 25 },
        },
        {
          name: "Armadura Sombria",
          type: "armor",
          stats: { defense: 30, stealth: 30 },
        },
        {
          name: "Capuz do Ladrão",
          type: "accessory",
          stats: { stealth: 25, lockpicking: 20 },
        },
        {
          name: "Luvas Ágeis",
          type: "accessory",
          stats: { dexterity: 20, lockpicking: 15 },
        },
      ],
    };

    for (let i = 0; i < classes.length; i++) {
      const className = classes[i];
      const characterId = characterIds[i];
      const equipments = equipmentByClass[className];

      for (const equip of equipments) {
        await client.query(
          `INSERT INTO equipment (character_id, equipment_name, equipment_type, equipped, stats_json) 
           VALUES ($1, $2, $3, $4, $5) 
           ON CONFLICT (character_id, equipment_name) DO UPDATE SET stats_json = EXCLUDED.stats_json`,
          [
            characterId,
            equip.name,
            equip.type,
            true,
            JSON.stringify(equip.stats),
          ]
        );
      }
      console.log(`   ✅ ${className}: ${equipments.length} equipamentos`);
    }
    console.log();

    // 5. Criar upgrades máximos para todos os personagens
    console.log("⬆️ Criando upgrades máximos...");

    const upgradeTypes = ["attack", "defense", "speed", "mana", "health"];

    for (const characterId of characterIds) {
      for (const upgradeType of upgradeTypes) {
        await client.query(
          `INSERT INTO upgrades (character_id, upgrade_type, level, max_level, cost_gold, cost_materials, cost_crystals) 
           VALUES ($1, $2, $3, $4, $5, $6, $7) 
           ON CONFLICT (character_id, upgrade_type) DO UPDATE SET level = EXCLUDED.level`,
          [characterId, upgradeType, 10, 10, 1000, 100, 50] // Todos no nível máximo
        );
      }
    }
    console.log(
      `   ✅ ${characterIds.length} personagens com upgrades máximos\n`
    );

    // 6. Criar progresso completo da história
    console.log("📖 Criando progresso completo da história...");

    for (const characterId of characterIds) {
      for (let chapter = 1; chapter <= 10; chapter++) {
        await client.query(
          `INSERT INTO story_progress (character_id, chapter, completed, completed_at) 
           VALUES ($1, $2, $3, $4) 
           ON CONFLICT (character_id, chapter) DO UPDATE SET completed = EXCLUDED.completed`,
          [characterId, chapter, true, new Date()]
        );
      }
    }
    console.log(
      `   ✅ ${characterIds.length} personagens com história completa (10 capítulos)\n`
    );

    // 7. Criar missões completas
    console.log("🎯 Criando missões completas...");

    const missions = [
      "Primeira Batalha",
      "Coleta de Cristais",
      "Treinamento Básico",
      "Exploração",
      "Aprendizado Mágico",
      "Batalha Épica",
      "Missão Secreta",
      "Desafio Final",
      "Prova de Coragem",
      "Conquista Suprema",
    ];

    for (const characterId of characterIds) {
      for (const missionName of missions) {
        await client.query(
          `INSERT INTO missions (character_id, mission_name, description, reward_gold, reward_xp, reward_materials, completed, completed_at) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
           ON CONFLICT (character_id, mission_name) DO UPDATE SET completed = EXCLUDED.completed`,
          [
            characterId,
            missionName,
            `Descrição da missão: ${missionName}`,
            500,
            250,
            25,
            true,
            new Date(),
          ]
        );
      }
    }
    console.log(
      `   ✅ ${characterIds.length} personagens com ${missions.length} missões completas\n`
    );

    // 8. Criar logs de batalha épicos
    console.log("⚔️ Criando logs de batalha épicos...");

    const opponents = [
      "Goblin",
      "Orc",
      "Dragon",
      "Demon",
      "Boss Final",
      "Guardião",
      "Lich",
      "Titan",
    ];

    for (const characterId of characterIds) {
      for (const opponent of opponents) {
        await client.query(
          `INSERT INTO battle_logs (character_id, opponent_name, result, damage_dealt, damage_received, gold_earned, xp_earned, battle_duration) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [characterId, opponent, "victory", 200, 50, 100, 150, 300]
        );
      }
    }
    console.log(
      `   ✅ ${characterIds.length} personagens com ${opponents.length} batalhas épicas\n`
    );

    await client.end();

    console.log("🎯 Dados completos do jogo populados com sucesso!");
    console.log("📊 Resumo:");
    console.log(`   👥 1 usuário admin`);
    console.log(`   🎮 ${classes.length} personagens (Nível 50)`);
    console.log(
      `   ⚔️ ${Object.values(skillsByClass).flat().length} habilidades`
    );
    console.log(
      `   🛡️ ${Object.values(equipmentByClass).flat().length} equipamentos`
    );
    console.log(
      `   ⬆️ ${characterIds.length * upgradeTypes.length} upgrades máximos`
    );
    console.log(`   📖 ${characterIds.length * 10} capítulos completos`);
    console.log(
      `   🎯 ${characterIds.length * missions.length} missões completas`
    );
    console.log(
      `   ⚔️ ${characterIds.length * opponents.length} batalhas épicas`
    );
    console.log(
      "\n✅ Banco Supabase completamente populado com dados do jogo!"
    );
  } catch (error) {
    console.log("❌ Erro durante a população:");
    console.log(`   ${error.message}\n`);
  }
}

// Executar população
populateGameData();
