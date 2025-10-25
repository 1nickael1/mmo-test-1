import type { ApiResponse } from "../../../types";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const characterClass = query.class as string;
    const characterLevel = parseInt(query.level as string) || 1;

    if (!characterClass) {
      throw createError({
        statusCode: 400,
        message: "Classe do personagem é obrigatória",
      });
    }

    // Definir habilidades por classe e nível
    const skillsByClass = {
      ninja: {
        // Níveis 1-5: Habilidades Básicas
        1: [
          {
            name: "Kunai Throw",
            level: 1,
            damage: 25,
            cooldown: 30,
            description: "Lança kunais precisos",
          },
          {
            name: "Shuriken Barrage",
            level: 2,
            damage: 35,
            cooldown: 45,
            description: "Barragem de shurikens",
          },
          {
            name: "Fire Jutsu",
            level: 3,
            damage: 40,
            cooldown: 60,
            description: "Técnica de fogo básica",
          },
          {
            name: "Wind Jutsu",
            level: 4,
            damage: 40,
            cooldown: 60,
            description: "Técnica de vento básica",
          },
          {
            name: "Water Jutsu",
            level: 5,
            damage: 40,
            cooldown: 60,
            description: "Técnica de água básica",
          },
        ],
        // Níveis 6-10: Habilidades Intermediárias
        6: [
          {
            name: "Earth Jutsu",
            level: 6,
            damage: 45,
            cooldown: 60,
            description: "Técnica de terra básica",
          },
          {
            name: "Shadow Clone",
            level: 7,
            damage: 50,
            cooldown: 90,
            description: "Cria clones de sombra",
          },
          {
            name: "Lightning Jutsu",
            level: 8,
            damage: 55,
            cooldown: 75,
            description: "Técnica de raio básica",
          },
          {
            name: "Fire Dragon",
            level: 9,
            damage: 60,
            cooldown: 90,
            description: "Dragão de fogo",
          },
          {
            name: "Wind Tornado",
            level: 10,
            damage: 60,
            cooldown: 90,
            description: "Tornado de vento",
          },
        ],
        // Níveis 11-20: Habilidades Avançadas
        11: [
          {
            name: "Water Prison",
            level: 11,
            damage: 65,
            cooldown: 90,
            description: "Prisão de água",
          },
          {
            name: "Earth Spikes",
            level: 12,
            damage: 70,
            cooldown: 90,
            description: "Espinhos de terra",
          },
          {
            name: "Chidori",
            level: 13,
            damage: 80,
            cooldown: 120,
            description: "Técnica de raio avançada",
          },
          {
            name: "Rasengan",
            level: 14,
            damage: 85,
            cooldown: 120,
            description: "Esfera espiral",
          },
          {
            name: "Ice Jutsu",
            level: 15,
            damage: 75,
            cooldown: 90,
            description: "Técnica de gelo",
          },
          {
            name: "Rock Armor",
            level: 16,
            damage: 0,
            cooldown: 180,
            description: "Armadura de pedra",
          },
          {
            name: "Fire Phoenix",
            level: 17,
            damage: 90,
            cooldown: 150,
            description: "Fênix de fogo",
          },
          {
            name: "Tsunami",
            level: 18,
            damage: 95,
            cooldown: 150,
            description: "Tsunami devastador",
          },
          {
            name: "Earthquake",
            level: 19,
            damage: 100,
            cooldown: 150,
            description: "Terremoto",
          },
          {
            name: "Hurricane",
            level: 20,
            damage: 100,
            cooldown: 150,
            description: "Furacão",
          },
        ],
        // Níveis 21-30: Habilidades Épicas
        21: [
          {
            name: "Thunder Storm",
            level: 21,
            damage: 110,
            cooldown: 180,
            description: "Tempestade de raios",
          },
          {
            name: "Blizzard",
            level: 22,
            damage: 115,
            cooldown: 180,
            description: "Nevasca",
          },
          {
            name: "Meteor Strike",
            level: 23,
            damage: 120,
            cooldown: 200,
            description: "Ataque de meteoro",
          },
          {
            name: "Dimension Slash",
            level: 24,
            damage: 125,
            cooldown: 200,
            description: "Corte dimensional",
          },
          {
            name: "Chakra Mode",
            level: 25,
            damage: 0,
            cooldown: 300,
            description: "Modo chakra",
          },
          {
            name: "Resurrection",
            level: 26,
            damage: 0,
            cooldown: 600,
            description: "Ressurreição",
          },
          {
            name: "Solar Flare",
            level: 27,
            damage: 130,
            cooldown: 240,
            description: "Clarão solar",
          },
          {
            name: "Ocean Depths",
            level: 28,
            damage: 135,
            cooldown: 240,
            description: "Profundezas oceânicas",
          },
          {
            name: "Mountain Crush",
            level: 29,
            damage: 140,
            cooldown: 240,
            description: "Esmagamento de montanha",
          },
          {
            name: "Sky Tornado",
            level: 30,
            damage: 140,
            cooldown: 240,
            description: "Tornado do céu",
          },
        ],
        // Níveis 31-40: Habilidades Lendárias
        31: [
          {
            name: "Lightning God",
            level: 31,
            damage: 150,
            cooldown: 300,
            description: "Deus do raio",
          },
          {
            name: "Ice Age",
            level: 32,
            damage: 155,
            cooldown: 300,
            description: "Era do gelo",
          },
          {
            name: "Planet Crush",
            level: 33,
            damage: 160,
            cooldown: 300,
            description: "Esmagamento planetário",
          },
          {
            name: "Reality Warp",
            level: 34,
            damage: 165,
            cooldown: 300,
            description: "Distorção da realidade",
          },
          {
            name: "Sage Mode",
            level: 35,
            damage: 0,
            cooldown: 600,
            description: "Modo sábio",
          },
          {
            name: "Divine Intervention",
            level: 36,
            damage: 170,
            cooldown: 360,
            description: "Intervenção divina",
          },
          {
            name: "Supernova",
            level: 37,
            damage: 175,
            cooldown: 360,
            description: "Supernova",
          },
          {
            name: "Cosmic Flood",
            level: 38,
            damage: 180,
            cooldown: 360,
            description: "Inundação cósmica",
          },
          {
            name: "Galaxy Crush",
            level: 39,
            damage: 185,
            cooldown: 360,
            description: "Esmagamento galáctico",
          },
          {
            name: "Universal Storm",
            level: 40,
            damage: 190,
            cooldown: 360,
            description: "Tempestade universal",
          },
        ],
        // Níveis 41-50: Habilidades Míticas
        41: [
          {
            name: "God Thunder",
            level: 41,
            damage: 200,
            cooldown: 420,
            description: "Trovão divino",
          },
          {
            name: "Absolute Zero",
            level: 42,
            damage: 205,
            cooldown: 420,
            description: "Zero absoluto",
          },
          {
            name: "Black Hole",
            level: 43,
            damage: 210,
            cooldown: 420,
            description: "Buraco negro",
          },
          {
            name: "Dimension Collapse",
            level: 44,
            damage: 215,
            cooldown: 420,
            description: "Colapso dimensional",
          },
          {
            name: "Transcendence",
            level: 45,
            damage: 0,
            cooldown: 900,
            description: "Transcendência",
          },
          {
            name: "Omnipotence",
            level: 46,
            damage: 220,
            cooldown: 480,
            description: "Onipotência",
          },
          {
            name: "Big Bang",
            level: 47,
            damage: 225,
            cooldown: 480,
            description: "Big Bang",
          },
          {
            name: "Primordial Ocean",
            level: 48,
            damage: 230,
            cooldown: 480,
            description: "Oceano primordial",
          },
          {
            name: "World Tree",
            level: 49,
            damage: 235,
            cooldown: 480,
            description: "Árvore do mundo",
          },
          {
            name: "Infinite Wind",
            level: 50,
            damage: 240,
            cooldown: 480,
            description: "Vento infinito",
          },
        ],
      },
      guerreiro_espacial: {
        // Níveis 1-5: Habilidades Básicas
        1: [
          {
            name: "Plasma Shot",
            level: 1,
            damage: 30,
            cooldown: 30,
            description: "Tiro de plasma",
          },
          {
            name: "Laser Beam",
            level: 2,
            damage: 40,
            cooldown: 45,
            description: "Feixe de laser",
          },
          {
            name: "Energy Shield",
            level: 3,
            damage: 0,
            cooldown: 60,
            description: "Escudo de energia",
          },
          {
            name: "Gravity Bomb",
            level: 4,
            damage: 45,
            cooldown: 60,
            description: "Bomba de gravidade",
          },
          {
            name: "Photon Blast",
            level: 5,
            damage: 50,
            cooldown: 60,
            description: "Explosão de fótons",
          },
        ],
        // Níveis 6-10: Habilidades Intermediárias
        6: [
          {
            name: "Magnetic Field",
            level: 6,
            damage: 55,
            cooldown: 60,
            description: "Campo magnético",
          },
          {
            name: "Quantum Strike",
            level: 7,
            damage: 60,
            cooldown: 90,
            description: "Ataque quântico",
          },
          {
            name: "Warp Drive",
            level: 8,
            damage: 0,
            cooldown: 120,
            description: "Motor de dobra",
          },
          {
            name: "Solar Flare",
            level: 9,
            damage: 65,
            cooldown: 90,
            description: "Clarão solar",
          },
          {
            name: "Nebula Storm",
            level: 10,
            damage: 70,
            cooldown: 90,
            description: "Tempestade de nebulosa",
          },
        ],
        // Níveis 11-20: Habilidades Avançadas
        11: [
          {
            name: "Asteroid Field",
            level: 11,
            damage: 75,
            cooldown: 90,
            description: "Campo de asteroides",
          },
          {
            name: "Nova Blast",
            level: 12,
            damage: 80,
            cooldown: 90,
            description: "Explosão de nova",
          },
          {
            name: "Black Hole",
            level: 13,
            damage: 90,
            cooldown: 120,
            description: "Buraco negro",
          },
          {
            name: "Dark Matter",
            level: 14,
            damage: 95,
            cooldown: 120,
            description: "Matéria escura",
          },
          {
            name: "Stellar Wind",
            level: 15,
            damage: 85,
            cooldown: 90,
            description: "Vento estelar",
          },
          {
            name: "Cosmic Ray",
            level: 16,
            damage: 100,
            cooldown: 90,
            description: "Raio cósmico",
          },
          {
            name: "Supernova",
            level: 17,
            damage: 110,
            cooldown: 150,
            description: "Supernova",
          },
          {
            name: "Galactic Core",
            level: 18,
            damage: 115,
            cooldown: 150,
            description: "Núcleo galáctico",
          },
          {
            name: "Pulsar Beam",
            level: 19,
            damage: 120,
            cooldown: 150,
            description: "Feixe de pulsar",
          },
          {
            name: "Quasar Blast",
            level: 20,
            damage: 125,
            cooldown: 150,
            description: "Explosão de quasar",
          },
        ],
        // Níveis 21-30: Habilidades Épicas
        21: [
          {
            name: "White Dwarf",
            level: 21,
            damage: 130,
            cooldown: 180,
            description: "Anã branca",
          },
          {
            name: "Red Giant",
            level: 22,
            damage: 135,
            cooldown: 180,
            description: "Gigante vermelha",
          },
          {
            name: "Neutron Star",
            level: 23,
            damage: 140,
            cooldown: 200,
            description: "Estrela de nêutrons",
          },
          {
            name: "Wormhole",
            level: 24,
            damage: 0,
            cooldown: 300,
            description: "Buraco de minhoca",
          },
          {
            name: "Space-Time Rift",
            level: 25,
            damage: 145,
            cooldown: 200,
            description: "Fenda espaço-tempo",
          },
          {
            name: "Universal Constant",
            level: 26,
            damage: 0,
            cooldown: 600,
            description: "Constante universal",
          },
          {
            name: "Big Bang",
            level: 27,
            damage: 150,
            cooldown: 240,
            description: "Big Bang",
          },
          {
            name: "Dark Energy",
            level: 28,
            damage: 155,
            cooldown: 240,
            description: "Energia escura",
          },
          {
            name: "Multiverse",
            level: 29,
            damage: 160,
            cooldown: 240,
            description: "Multiverso",
          },
          {
            name: "String Theory",
            level: 30,
            damage: 165,
            cooldown: 240,
            description: "Teoria das cordas",
          },
        ],
        // Níveis 31-40: Habilidades Lendárias
        31: [
          {
            name: "Quantum Entanglement",
            level: 31,
            damage: 170,
            cooldown: 300,
            description: "Emaranhamento quântico",
          },
          {
            name: "Higgs Field",
            level: 32,
            damage: 175,
            cooldown: 300,
            description: "Campo de Higgs",
          },
          {
            name: "Planck Scale",
            level: 33,
            damage: 180,
            cooldown: 300,
            description: "Escala de Planck",
          },
          {
            name: "Inflation Field",
            level: 34,
            damage: 185,
            cooldown: 300,
            description: "Campo de inflação",
          },
          {
            name: "Vacuum Decay",
            level: 35,
            damage: 190,
            cooldown: 300,
            description: "Decaimento do vácuo",
          },
          {
            name: "Cosmic Consciousness",
            level: 36,
            damage: 0,
            cooldown: 600,
            description: "Consciência cósmica",
          },
          {
            name: "Universal Creation",
            level: 37,
            damage: 195,
            cooldown: 360,
            description: "Criação universal",
          },
          {
            name: "Dimensional Mastery",
            level: 38,
            damage: 200,
            cooldown: 360,
            description: "Domínio dimensional",
          },
          {
            name: "Reality Engine",
            level: 39,
            damage: 205,
            cooldown: 360,
            description: "Motor da realidade",
          },
          {
            name: "Existence Protocol",
            level: 40,
            damage: 210,
            cooldown: 360,
            description: "Protocolo de existência",
          },
        ],
        // Níveis 41-50: Habilidades Míticas
        41: [
          {
            name: "Infinite Loop",
            level: 41,
            damage: 215,
            cooldown: 420,
            description: "Loop infinito",
          },
          {
            name: "Zero Point",
            level: 42,
            damage: 220,
            cooldown: 420,
            description: "Ponto zero",
          },
          {
            name: "Absolute Reality",
            level: 43,
            damage: 225,
            cooldown: 420,
            description: "Realidade absoluta",
          },
          {
            name: "Omniverse",
            level: 44,
            damage: 230,
            cooldown: 420,
            description: "Omniverso",
          },
          {
            name: "Transcendent Being",
            level: 45,
            damage: 0,
            cooldown: 900,
            description: "Ser transcendente",
          },
          {
            name: "Universal Override",
            level: 46,
            damage: 235,
            cooldown: 480,
            description: "Sobrescrita universal",
          },
          {
            name: "Genesis Protocol",
            level: 47,
            damage: 240,
            cooldown: 480,
            description: "Protocolo de gênese",
          },
          {
            name: "Alpha Point",
            level: 48,
            damage: 245,
            cooldown: 480,
            description: "Ponto alfa",
          },
          {
            name: "Omega Sequence",
            level: 49,
            damage: 250,
            cooldown: 480,
            description: "Sequência ômega",
          },
          {
            name: "Infinite Recursion",
            level: 50,
            damage: 255,
            cooldown: 480,
            description: "Recursão infinita",
          },
        ],
      },
    };

    // Filtrar habilidades disponíveis baseado no nível
    const availableSkills = [];
    const classSkills =
      skillsByClass[characterClass as keyof typeof skillsByClass];

    for (let level = 1; level <= characterLevel; level++) {
      if (classSkills[level as keyof typeof classSkills]) {
        const skillsForLevel = classSkills[level as keyof typeof classSkills];
        // Adicionar informações de validação para cada habilidade
        const skillsWithValidation = skillsForLevel.map((skill) => ({
          ...skill,
          level_required: skill.level,
          cost: skill.level * 100, // Custo baseado no nível da habilidade
          can_learn: characterLevel >= skill.level,
          learned: false, // Será verificado no frontend
        }));
        availableSkills.push(...skillsWithValidation);
      }
    }

    const response: ApiResponse<any[]> = {
      success: true,
      data: availableSkills,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
