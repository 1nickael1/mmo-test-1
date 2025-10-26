#!/usr/bin/env node

// Script completo de seed para Supabase - MMO RPG Project
// Inclui TODOS os itens, habilidades, inimigos e conteúdo do projeto
import { createClient } from "@vercel/postgres";
import bcrypt from "bcryptjs";

async function completeSupabaseSeed() {
  console.log("🌱 Iniciando seed COMPLETO do banco Supabase...\n");

  const postgresUrl = process.env.POSTGRES_URL;
  
  if (!postgresUrl) {
    console.log("❌ POSTGRES_URL não encontrado nas variáveis de ambiente");
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

    // Limpar dados existentes
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

    // 1. Criar usuários completos
    console.log("👥 Criando usuários completos...");
    
    const users = [
      {
        email: "admin@mmo.com",
        username: "admin",
        password: "admin123"
      },
      {
        email: "test@mmo.com", 
        username: "testuser",
        password: "test123"
      },
      {
        email: "player@mmo.com",
        username: "player",
        password: "player123"
      },
      {
        email: "ninja@mmo.com",
        username: "ninjaplayer",
        password: "ninja123"
      },
      {
        email: "mage@mmo.com",
        username: "mageplayer", 
        password: "mage123"
      }
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
      console.log(`   ✅ Usuário: ${user.username} (ID: ${result.rows[0].id})`);
    }
    console.log();

    // 2. Criar personagens para todas as classes
    console.log("🎮 Criando personagens para todas as classes...");
    
    const characterClasses = [
      "ninja",
      "guerreiro_espacial", 
      "mago_elemental",
      "arqueiro_elfo",
      "paladino_sagrado",
      "ladrao_sombrio"
    ];

    const characters = [
      // Admin - Nível alto
      {
        user_id: userIds[0],
        name: "AdminNinja",
        class: "ninja",
        level: 25,
        xp: 15000,
        health: 300,
        max_health: 300,
        mana: 150,
        max_mana: 150,
        attack: 50,
        defense: 30,
        speed: 40,
        gold: 5000,
        materials: 200,
        crystals: 100
      },
      {
        user_id: userIds[0],
        name: "AdminWarrior",
        class: "guerreiro_espacial",
        level: 20,
        xp: 12000,
        health: 400,
        max_health: 400,
        mana: 100,
        max_mana: 100,
        attack: 60,
        defense: 50,
        speed: 25,
        gold: 4000,
        materials: 150,
        crystals: 75
      },
      
      // Test user - Nível médio
      {
        user_id: userIds[1],
        name: "TestMage",
        class: "mago_elemental",
        level: 15,
        xp: 8000,
        health: 200,
        max_health: 200,
        mana: 250,
        max_mana: 250,
        attack: 40,
        defense: 20,
        speed: 30,
        gold: 2500,
        materials: 100,
        crystals: 50
      },
      {
        user_id: userIds[1],
        name: "TestArcher",
        class: "arqueiro_elfo",
        level: 12,
        xp: 6000,
        health: 180,
        max_health: 180,
        mana: 120,
        max_mana: 120,
        attack: 45,
        defense: 25,
        speed: 35,
        gold: 2000,
        materials: 80,
        crystals: 40
      },
      
      // Player - Nível baixo
      {
        user_id: userIds[2],
        name: "PlayerPaladin",
        class: "paladino_sagrado",
        level: 8,
        xp: 3000,
        health: 250,
        max_health: 250,
        mana: 100,
        max_mana: 100,
        attack: 30,
        defense: 35,
        speed: 20,
        gold: 1000,
        materials: 50,
        crystals: 25
      },
      {
        user_id: userIds[2],
        name: "PlayerThief",
        class: "ladrao_sombrio",
        level: 5,
        xp: 1500,
        health: 120,
        max_health: 120,
        mana: 80,
        max_mana: 80,
        attack: 25,
        defense: 15,
        speed: 45,
        gold: 500,
        materials: 30,
        crystals: 15
      },
      
      // Ninja player - Especializado
      {
        user_id: userIds[3],
        name: "ShadowMaster",
        class: "ninja",
        level: 18,
        xp: 10000,
        health: 220,
        max_health: 220,
        mana: 120,
        max_mana: 120,
        attack: 55,
        defense: 25,
        speed: 60,
        gold: 3000,
        materials: 120,
        crystals: 60
      },
      
      // Mage player - Especializado
      {
        user_id: userIds[4],
        name: "ElementalLord",
        class: "mago_elemental",
        level: 22,
        xp: 13000,
        health: 180,
        max_health: 180,
        mana: 300,
        max_mana: 300,
        attack: 65,
        defense: 20,
        speed: 25,
        gold: 3500,
        materials: 180,
        crystals: 90
      }
    ];

    const characterIds = [];
    for (const char of characters) {
      const result = await client.query(
        `INSERT INTO characters (user_id, name, class, level, xp, health, max_health, mana, max_mana, attack, defense, speed, gold, materials, crystals) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id`,
        [char.user_id, char.name, char.class, char.level, char.xp, char.health, char.max_health, char.mana, char.max_mana, char.attack, char.defense, char.speed, char.gold, char.materials, char.crystals]
      );
      characterIds.push(result.rows[0].id);
      console.log(`   ✅ ${char.name} (${char.class}, Nível ${char.level})`);
    }
    console.log();

    // 3. Criar TODAS as habilidades específicas por classe
    console.log("⚔️ Criando TODAS as habilidades específicas por classe...");
    
    const allSkillsByClass = {
      ninja: [
        { name: "Kunai Throw", level: 1, cooldown: 3 },
        { name: "Shadow Strike", level: 1, cooldown: 5 },
        { name: "Stealth", level: 1, cooldown: 8 },
        { name: "Ninja Dash", level: 2, cooldown: 4 },
        { name: "Poison Dart", level: 2, cooldown: 6 },
        { name: "Smoke Bomb", level: 3, cooldown: 10 },
        { name: "Assassinate", level: 3, cooldown: 12 },
        { name: "Shadow Clone", level: 4, cooldown: 15 },
        { name: "Ninja Reflex", level: 4, cooldown: 8 },
        { name: "Silent Kill", level: 5, cooldown: 20 },
        { name: "Wind Slash", level: 5, cooldown: 7 },
        { name: "Shadow Step", level: 6, cooldown: 10 },
        { name: "Poison Cloud", level: 6, cooldown: 15 },
        { name: "Ninja Storm", level: 7, cooldown: 18 },
        { name: "Shadow Mastery", level: 8, cooldown: 25 }
      ],
      guerreiro_espacial: [
        { name: "Plasma Slash", level: 1, cooldown: 4 },
        { name: "Shield Bash", level: 1, cooldown: 6 },
        { name: "Energy Burst", level: 1, cooldown: 8 },
        { name: "Gravity Strike", level: 2, cooldown: 7 },
        { name: "Laser Beam", level: 2, cooldown: 5 },
        { name: "Force Field", level: 3, cooldown: 12 },
        { name: "Warp Strike", level: 3, cooldown: 10 },
        { name: "Energy Shield", level: 4, cooldown: 15 },
        { name: "Plasma Cannon", level: 4, cooldown: 8 },
        { name: "Space Warp", level: 5, cooldown: 20 },
        { name: "Quantum Slash", level: 5, cooldown: 6 },
        { name: "Gravity Well", level: 6, cooldown: 18 },
        { name: "Energy Storm", level: 6, cooldown: 12 },
        { name: "Space Mastery", level: 7, cooldown: 25 },
        { name: "Cosmic Strike", level: 8, cooldown: 30 }
      ],
      mago_elemental: [
        { name: "Fireball", level: 1, cooldown: 3 },
        { name: "Ice Shard", level: 1, cooldown: 4 },
        { name: "Lightning Bolt", level: 1, cooldown: 5 },
        { name: "Earthquake", level: 2, cooldown: 8 },
        { name: "Wind Blast", level: 2, cooldown: 6 },
        { name: "Elemental Fusion", level: 3, cooldown: 12 },
        { name: "Meteor", level: 3, cooldown: 15 },
        { name: "Blizzard", level: 4, cooldown: 18 },
        { name: "Thunderstorm", level: 4, cooldown: 20 },
        { name: "Elemental Mastery", level: 5, cooldown: 25 },
        { name: "Flame Wall", level: 5, cooldown: 10 },
        { name: "Ice Prison", level: 6, cooldown: 15 },
        { name: "Chain Lightning", level: 6, cooldown: 8 },
        { name: "Elemental Storm", level: 7, cooldown: 30 },
        { name: "Arcane Mastery", level: 8, cooldown: 35 }
      ],
      arqueiro_elfo: [
        { name: "Precise Shot", level: 1, cooldown: 2 },
        { name: "Multi Arrow", level: 1, cooldown: 5 },
        { name: "Nature's Blessing", level: 1, cooldown: 8 },
        { name: "Eagle Eye", level: 2, cooldown: 6 },
        { name: "Forest Arrow", level: 2, cooldown: 4 },
        { name: "Wind Arrow", level: 3, cooldown: 7 },
        { name: "Poison Arrow", level: 3, cooldown: 9 },
        { name: "Explosive Arrow", level: 4, cooldown: 12 },
        { name: "Rain of Arrows", level: 4, cooldown: 15 },
        { name: "Nature's Wrath", level: 5, cooldown: 20 },
        { name: "Piercing Shot", level: 5, cooldown: 6 },
        { name: "Elemental Arrow", level: 6, cooldown: 10 },
        { name: "Arrow Storm", level: 6, cooldown: 18 },
        { name: "Nature's Mastery", level: 7, cooldown: 25 },
        { name: "Divine Shot", level: 8, cooldown: 30 }
      ],
      paladino_sagrado: [
        { name: "Holy Strike", level: 1, cooldown: 4 },
        { name: "Divine Shield", level: 1, cooldown: 8 },
        { name: "Healing Light", level: 1, cooldown: 6 },
        { name: "Sacred Smite", level: 2, cooldown: 7 },
        { name: "Blessing", level: 2, cooldown: 10 },
        { name: "Divine Protection", level: 3, cooldown: 15 },
        { name: "Holy Wrath", level: 3, cooldown: 12 },
        { name: "Sacred Ground", level: 4, cooldown: 18 },
        { name: "Divine Intervention", level: 4, cooldown: 25 },
        { name: "Heaven's Light", level: 5, cooldown: 30 },
        { name: "Holy Nova", level: 5, cooldown: 10 },
        { name: "Divine Justice", level: 6, cooldown: 20 },
        { name: "Sacred Fire", level: 6, cooldown: 15 },
        { name: "Divine Mastery", level: 7, cooldown: 35 },
        { name: "Celestial Strike", level: 8, cooldown: 40 }
      ],
      ladrao_sombrio: [
        { name: "Backstab", level: 1, cooldown: 3 },
        { name: "Pickpocket", level: 1, cooldown: 5 },
        { name: "Stealth", level: 1, cooldown: 8 },
        { name: "Poison Blade", level: 2, cooldown: 6 },
        { name: "Shadow Step", level: 2, cooldown: 7 },
        { name: "Lockpick", level: 3, cooldown: 10 },
        { name: "Trap Disarm", level: 3, cooldown: 8 },
        { name: "Sneak Attack", level: 4, cooldown: 12 },
        { name: "Shadow Veil", level: 4, cooldown: 15 },
        { name: "Master Thief", level: 5, cooldown: 20 },
        { name: "Venom Strike", level: 5, cooldown: 9 },
        { name: "Shadow Clone", level: 6, cooldown: 18 },
        { name: "Assassin's Mark", level: 6, cooldown: 12 },
        { name: "Shadow Mastery", level: 7, cooldown: 25 },
        { name: "Death Strike", level: 8, cooldown: 30 }
      ]
    };

    // Criar habilidades baseadas no nível do personagem
    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      const charId = characterIds[i];
      const skills = allSkillsByClass[char.class];
      
      // Personagem aprende habilidades até seu nível
      const availableSkills = skills.filter(skill => skill.level <= char.level);
      
      for (const skill of availableSkills) {
        await client.query(
          `INSERT INTO skills (character_id, skill_name, level) 
           VALUES ($1, $2, $3)`,
          [charId, skill.name, skill.level]
        );
      }
      console.log(`   ✅ ${char.name}: ${availableSkills.length} habilidades aprendidas`);
    }
    console.log();

    // 4. Criar equipamentos completos baseados no nível
    console.log("🛡️ Criando equipamentos completos...");
    
    const equipmentTemplates = {
      ninja: {
        weapons: [
          { name: "Kunai Básico", level: 1, stats: { attack: 5, speed: 3 } },
          { name: "Kunai Afiado", level: 5, stats: { attack: 12, speed: 5 } },
          { name: "Kunai Venenoso", level: 10, stats: { attack: 20, speed: 7, poison: 5 } },
          { name: "Kunai Lendário", level: 15, stats: { attack: 35, speed: 10, stealth: 8 } },
          { name: "Kunai Supremo", level: 20, stats: { attack: 50, speed: 15, stealth: 12 } }
        ],
        armors: [
          { name: "Roupa Ninja", level: 1, stats: { defense: 3, speed: 2 } },
          { name: "Armadura Ninja", level: 5, stats: { defense: 8, speed: 4 } },
          { name: "Armadura Sombria", level: 10, stats: { defense: 15, speed: 6, stealth: 5 } },
          { name: "Armadura Suprema", level: 15, stats: { defense: 25, speed: 8, stealth: 10 } },
          { name: "Armadura Mestre", level: 20, stats: { defense: 40, speed: 12, stealth: 15 } }
        ],
        accessories: [
          { name: "Máscara Ninja", level: 3, stats: { stealth: 3, speed: 2 } },
          { name: "Botas Ninja", level: 7, stats: { speed: 5, agility: 3 } },
          { name: "Luvas Ágeis", level: 12, stats: { speed: 8, dexterity: 5 } },
          { name: "Anel da Sombra", level: 18, stats: { stealth: 10, speed: 6 } }
        ]
      },
      guerreiro_espacial: {
        weapons: [
          { name: "Espada Laser", level: 1, stats: { attack: 8, energy: 2 } },
          { name: "Espada de Plasma", level: 5, stats: { attack: 18, energy: 5 } },
          { name: "Espada Quântica", level: 10, stats: { attack: 30, energy: 8, defense: 3 } },
          { name: "Espada Suprema", level: 15, stats: { attack: 50, energy: 12, defense: 5 } },
          { name: "Espada Cósmica", level: 20, stats: { attack: 70, energy: 18, defense: 8 } }
        ],
        armors: [
          { name: "Armadura Básica", level: 1, stats: { defense: 5, health: 10 } },
          { name: "Armadura Espacial", level: 5, stats: { defense: 12, health: 20 } },
          { name: "Armadura Quântica", level: 10, stats: { defense: 22, health: 35, energy: 5 } },
          { name: "Armadura Suprema", level: 15, stats: { defense: 35, health: 50, energy: 8 } },
          { name: "Armadura Cósmica", level: 20, stats: { defense: 55, health: 80, energy: 12 } }
        ],
        accessories: [
          { name: "Escudo Energético", level: 3, stats: { defense: 5, energy: 3 } },
          { name: "Capacete Espacial", level: 7, stats: { defense: 8, vision: 5 } },
          { name: "Gerador de Energia", level: 12, stats: { energy: 10, defense: 5 } },
          { name: "Core Quântico", level: 18, stats: { energy: 15, defense: 10 } }
        ]
      },
      mago_elemental: {
        weapons: [
          { name: "Cajado Básico", level: 1, stats: { attack: 3, mana: 5 } },
          { name: "Cajado Elemental", level: 5, stats: { attack: 8, mana: 12 } },
          { name: "Cajado Arcano", level: 10, stats: { attack: 15, mana: 20, magic_power: 5 } },
          { name: "Cajado Supremo", level: 15, stats: { attack: 25, mana: 35, magic_power: 10 } },
          { name: "Cajado Místico", level: 20, stats: { attack: 40, mana: 50, magic_power: 15 } }
        ],
        armors: [
          { name: "Robe Básica", level: 1, stats: { defense: 2, mana: 8 } },
          { name: "Robe Mística", level: 5, stats: { defense: 5, mana: 15 } },
          { name: "Robe Arcano", level: 10, stats: { defense: 10, mana: 25, magic_power: 5 } },
          { name: "Robe Suprema", level: 15, stats: { defense: 18, mana: 40, magic_power: 10 } },
          { name: "Robe Mística", level: 20, stats: { defense: 30, mana: 60, magic_power: 15 } }
        ],
        accessories: [
          { name: "Anel do Poder", level: 3, stats: { mana: 8, magic_power: 3 } },
          { name: "Amuleto Elemental", level: 7, stats: { mana: 12, elemental_mastery: 5 } },
          { name: "Cristal Arcano", level: 12, stats: { mana: 18, magic_power: 8 } },
          { name: "Orbe Místico", level: 18, stats: { mana: 25, magic_power: 12 } }
        ]
      },
      arqueiro_elfo: {
        weapons: [
          { name: "Arco Básico", level: 1, stats: { attack: 6, precision: 2 } },
          { name: "Arco Élfico", level: 5, stats: { attack: 14, precision: 5 } },
          { name: "Arco da Floresta", level: 10, stats: { attack: 24, precision: 8, nature_power: 5 } },
          { name: "Arco Supremo", level: 15, stats: { attack: 40, precision: 12, nature_power: 8 } },
          { name: "Arco Divino", level: 20, stats: { attack: 60, precision: 18, nature_power: 12 } }
        ],
        armors: [
          { name: "Armadura de Folhas", level: 1, stats: { defense: 4, nature_resistance: 3 } },
          { name: "Armadura Élfica", level: 5, stats: { defense: 9, nature_resistance: 6 } },
          { name: "Armadura da Floresta", level: 10, stats: { defense: 18, nature_resistance: 10, speed: 3 } },
          { name: "Armadura Suprema", level: 15, stats: { defense: 30, nature_resistance: 15, speed: 5 } },
          { name: "Armadura Divina", level: 20, stats: { defense: 45, nature_resistance: 20, speed: 8 } }
        ],
        accessories: [
          { name: "Aljava Básica", level: 3, stats: { arrow_count: 20, precision: 2 } },
          { name: "Aljava Mágica", level: 7, stats: { arrow_count: 35, precision: 5 } },
          { name: "Botas Élficas", level: 12, stats: { speed: 8, nature_affinity: 5 } },
          { name: "Pena Divina", level: 18, stats: { precision: 12, nature_power: 8 } }
        ]
      },
      paladino_sagrado: {
        weapons: [
          { name: "Espada Básica", level: 1, stats: { attack: 7, holy_power: 2 } },
          { name: "Espada Sagrada", level: 5, stats: { attack: 16, holy_power: 5 } },
          { name: "Espada Divina", level: 10, stats: { attack: 28, holy_power: 8, defense: 3 } },
          { name: "Espada Suprema", level: 15, stats: { attack: 45, holy_power: 12, defense: 5 } },
          { name: "Espada Celestial", level: 20, stats: { attack: 65, holy_power: 18, defense: 8 } }
        ],
        armors: [
          { name: "Armadura Básica", level: 1, stats: { defense: 6, holy_resistance: 3 } },
          { name: "Armadura Sagrada", level: 5, stats: { defense: 13, holy_resistance: 6 } },
          { name: "Armadura Divina", level: 10, stats: { defense: 24, holy_resistance: 10, health: 15 } },
          { name: "Armadura Suprema", level: 15, stats: { defense: 38, holy_resistance: 15, health: 25 } },
          { name: "Armadura Celestial", level: 20, stats: { defense: 55, holy_resistance: 20, health: 40 } }
        ],
        accessories: [
          { name: "Escudo Sagrado", level: 3, stats: { defense: 6, holy_power: 3 } },
          { name: "Coroa Divina", level: 7, stats: { holy_power: 8, wisdom: 5 } },
          { name: "Anel Sagrado", level: 12, stats: { holy_power: 12, defense: 5 } },
          { name: "Orbe Celestial", level: 18, stats: { holy_power: 18, wisdom: 10 } }
        ]
      },
      ladrao_sombrio: {
        weapons: [
          { name: "Adaga Básica", level: 1, stats: { attack: 4, stealth: 2 } },
          { name: "Adaga Sombria", level: 5, stats: { attack: 10, stealth: 5 } },
          { name: "Adaga Venenosa", level: 10, stats: { attack: 18, stealth: 8, poison: 5 } },
          { name: "Adaga Suprema", level: 15, stats: { attack: 30, stealth: 12, poison: 8 } },
          { name: "Adaga Mestre", level: 20, stats: { attack: 45, stealth: 18, poison: 12 } }
        ],
        armors: [
          { name: "Armadura Básica", level: 1, stats: { defense: 3, stealth: 3 } },
          { name: "Armadura Sombria", level: 5, stats: { defense: 7, stealth: 6 } },
          { name: "Armadura do Ladrão", level: 10, stats: { defense: 14, stealth: 10, speed: 3 } },
          { name: "Armadura Suprema", level: 15, stats: { defense: 24, stealth: 15, speed: 5 } },
          { name: "Armadura Mestre", level: 20, stats: { defense: 38, stealth: 22, speed: 8 } }
        ],
        accessories: [
          { name: "Capuz do Ladrão", level: 3, stats: { stealth: 5, lockpicking: 3 } },
          { name: "Luvas Ágeis", level: 7, stats: { dexterity: 5, lockpicking: 5 } },
          { name: "Máscara Sombria", level: 12, stats: { stealth: 10, speed: 5 } },
          { name: "Anel do Mestre", level: 18, stats: { stealth: 15, lockpicking: 10 } }
        ]
      }
    };

    // Equipar personagens baseado no nível
    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      const charId = characterIds[i];
      const equipment = equipmentTemplates[char.class];
      
      // Arma baseada no nível
      const weapon = equipment.weapons
        .filter(w => w.level <= char.level)
        .sort((a, b) => b.level - a.level)[0];
      
      if (weapon) {
        await client.query(
          `INSERT INTO equipment (character_id, equipment_name, equipment_type, equipped, stats_json) 
           VALUES ($1, $2, $3, $4, $5)`,
          [charId, weapon.name, "weapon", true, JSON.stringify(weapon.stats)]
        );
      }
      
      // Armadura baseada no nível
      const armor = equipment.armors
        .filter(a => a.level <= char.level)
        .sort((a, b) => b.level - a.level)[0];
      
      if (armor) {
        await client.query(
          `INSERT INTO equipment (character_id, equipment_name, equipment_type, equipped, stats_json) 
           VALUES ($1, $2, $3, $4, $5)`,
          [charId, armor.name, "armor", true, JSON.stringify(armor.stats)]
        );
      }
      
      // Acessórios baseados no nível
      const accessories = equipment.accessories
        .filter(a => a.level <= char.level)
        .sort((a, b) => b.level - a.level)
        .slice(0, 2); // Máximo 2 acessórios
      
      for (const accessory of accessories) {
        await client.query(
          `INSERT INTO equipment (character_id, equipment_name, equipment_type, equipped, stats_json) 
           VALUES ($1, $2, $3, $4, $5)`,
          [charId, accessory.name, "accessory", true, JSON.stringify(accessory.stats)]
        );
      }
      
      console.log(`   ✅ ${char.name}: ${weapon?.name || 'Nenhuma arma'}, ${armor?.name || 'Nenhuma armadura'}, ${accessories.length} acessórios`);
    }
    console.log();

    // 5. Criar upgrades baseados no nível
    console.log("⬆️ Criando upgrades baseados no nível...");
    
    const upgradeTypes = ["attack", "defense", "speed", "mana", "health"];
    
    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      const charId = characterIds[i];
      
      // Nível de upgrade baseado no nível do personagem (máximo 10)
      const upgradeLevel = Math.min(Math.floor(char.level / 2), 10);
      
      for (const upgradeType of upgradeTypes) {
        const costGold = upgradeLevel * 100;
        const costMaterials = upgradeLevel * 10;
        const costCrystals = upgradeLevel * 5;
        
        await client.query(
          `INSERT INTO upgrades (character_id, upgrade_type, level, max_level, cost_gold, cost_materials, cost_crystals) 
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [charId, upgradeType, upgradeLevel, 10, costGold, costMaterials, costCrystals]
        );
      }
      console.log(`   ✅ ${char.name}: Upgrades nível ${upgradeLevel}/10`);
    }
    console.log();

    // 6. Criar progresso da história baseado no nível
    console.log("📖 Criando progresso da história...");
    
    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      const charId = characterIds[i];
      
      // Capítulos completos baseados no nível (máximo 10)
      const completedChapters = Math.min(Math.floor(char.level / 2), 10);
      
      for (let chapter = 1; chapter <= completedChapters; chapter++) {
        await client.query(
          `INSERT INTO story_progress (character_id, chapter, completed, completed_at) 
           VALUES ($1, $2, $3, $4)`,
          [charId, chapter, true, new Date()]
        );
      }
      
      console.log(`   ✅ ${char.name}: ${completedChapters} capítulos completos`);
    }
    console.log();

    // 7. Criar missões baseadas no nível
    console.log("🎯 Criando missões...");
    
    const missionTemplates = [
      { name: "Primeira Batalha", level: 1, reward_gold: 50, reward_xp: 25, reward_materials: 5 },
      { name: "Treinamento Básico", level: 2, reward_gold: 75, reward_xp: 40, reward_materials: 8 },
      { name: "Coleta de Cristais", level: 3, reward_gold: 100, reward_xp: 60, reward_materials: 12 },
      { name: "Exploração", level: 5, reward_gold: 150, reward_xp: 100, reward_materials: 20 },
      { name: "Batalha Épica", level: 8, reward_gold: 250, reward_xp: 150, reward_materials: 30 },
      { name: "Missão Secreta", level: 12, reward_gold: 400, reward_xp: 250, reward_materials: 50 },
      { name: "Desafio Final", level: 15, reward_gold: 600, reward_xp: 400, reward_materials: 75 },
      { name: "Prova de Coragem", level: 18, reward_gold: 800, reward_xp: 600, reward_materials: 100 },
      { name: "Conquista Suprema", level: 20, reward_gold: 1000, reward_xp: 800, reward_materials: 150 }
    ];
    
    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      const charId = characterIds[i];
      
      // Missões disponíveis baseadas no nível
      const availableMissions = missionTemplates.filter(m => m.level <= char.level);
      
      for (const mission of availableMissions) {
        const completed = Math.random() > 0.3; // 70% chance de estar completa
        
        await client.query(
          `INSERT INTO missions (character_id, mission_name, description, reward_gold, reward_xp, reward_materials, completed, completed_at) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [charId, mission.name, `Descrição da missão: ${mission.name}`, mission.reward_gold, mission.reward_xp, mission.reward_materials, completed, completed ? new Date() : null]
        );
      }
      
      console.log(`   ✅ ${char.name}: ${availableMissions.length} missões disponíveis`);
    }
    console.log();

    // 8. Criar logs de batalha realistas
    console.log("⚔️ Criando logs de batalha realistas...");
    
    const opponents = [
      { name: "Goblin", level: 1, hp: 50, attack: 8, defense: 3 },
      { name: "Orc", level: 3, hp: 80, attack: 12, defense: 5 },
      { name: "Skeleton", level: 5, hp: 100, attack: 15, defense: 7 },
      { name: "Spider", level: 7, hp: 120, attack: 18, defense: 8 },
      { name: "Dragon", level: 10, hp: 200, attack: 25, defense: 12 },
      { name: "Demon", level: 12, hp: 250, attack: 30, defense: 15 },
      { name: "Boss Final", level: 15, hp: 400, attack: 40, defense: 20 },
      { name: "Guardião", level: 18, hp: 500, attack: 50, defense: 25 },
      { name: "Lich", level: 20, hp: 600, attack: 60, defense: 30 },
      { name: "Titan", level: 25, hp: 800, attack: 80, defense: 40 }
    ];
    
    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      const charId = characterIds[i];
      
      // Batalhas baseadas no nível do personagem
      const availableOpponents = opponents.filter(o => o.level <= char.level + 2);
      const battleCount = Math.min(Math.floor(char.level / 2) + 3, 10);
      
      for (let j = 0; j < battleCount; j++) {
        const opponent = availableOpponents[Math.floor(Math.random() * availableOpponents.length)];
        
        // Calcular resultado da batalha baseado nas stats
        const charPower = char.attack + char.defense + char.speed;
        const opponentPower = opponent.attack + opponent.defense + (opponent.level * 2);
        
        const victory = charPower > opponentPower * 0.8; // 80% do poder do oponente
        const damageDealt = victory ? Math.floor(opponent.hp * 0.8) : Math.floor(opponent.hp * 0.3);
        const damageReceived = victory ? Math.floor(char.max_health * 0.2) : Math.floor(char.max_health * 0.6);
        
        await client.query(
          `INSERT INTO battle_logs (character_id, opponent_name, result, damage_dealt, damage_received, gold_earned, xp_earned, battle_duration) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [charId, opponent.name, victory ? "victory" : "defeat", damageDealt, damageReceived, victory ? opponent.level * 10 : 0, victory ? opponent.level * 15 : opponent.level * 5, Math.floor(Math.random() * 300) + 60]
        );
      }
      
      console.log(`   ✅ ${char.name}: ${battleCount} batalhas registradas`);
    }

    await client.end();
    
    console.log("\n🎯 Seed COMPLETO realizado com sucesso!");
    console.log("📊 Resumo dos dados criados:");
    console.log(`   👥 ${users.length} usuários`);
    console.log(`   🎮 ${characters.length} personagens`);
    console.log(`   ⚔️ ${Object.values(allSkillsByClass).flat().length} habilidades únicas`);
    console.log(`   🛡️ Equipamentos completos por classe`);
    console.log(`   ⬆️ Upgrades baseados no nível`);
    console.log(`   📖 Progresso da história baseado no nível`);
    console.log(`   🎯 Missões baseadas no nível`);
    console.log(`   ⚔️ Logs de batalha realistas`);
    console.log("\n✅ Banco Supabase completamente populado com TODOS os dados do jogo!");

  } catch (error) {
    console.log("❌ Erro durante o seed:");
    console.log(`   ${error.message}\n`);
  }
}

// Executar seed completo
completeSupabaseSeed();
