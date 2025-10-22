import type { ApiResponse, NPC } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/database";

// NPCs disponíveis para batalha - Expandido até nível 50
const NPC_OPPONENTS: NPC[] = [
  // NÍVEL 1-5 - Inimigos Básicos
  {
    id: "bandit_1",
    name: "Bandido Espacial",
    level: 1,
    stats: {
      strength: 6,
      agility: 5,
      defense: 4,
      health: 60,
      max_health: 60,
    },
    xp_reward: 100,
    gold_reward: 50,
    difficulty: "easy",
  },
  {
    id: "pirate_1",
    name: "Pirata Espacial",
    level: 2,
    stats: {
      strength: 8,
      agility: 6,
      defense: 5,
      health: 80,
      max_health: 80,
    },
    xp_reward: 150,
    gold_reward: 75,
    difficulty: "easy",
  },
  {
    id: "cyborg_1",
    name: "Ciborgue Rebelde",
    level: 3,
    stats: {
      strength: 10,
      agility: 7,
      defense: 8,
      health: 100,
      max_health: 100,
    },
    xp_reward: 250,
    gold_reward: 120,
    difficulty: "medium",
  },
  {
    id: "alien_1",
    name: "Alienígena Hostil",
    level: 4,
    stats: {
      strength: 12,
      agility: 9,
      defense: 7,
      health: 120,
      max_health: 120,
    },
    xp_reward: 300,
    gold_reward: 150,
    difficulty: "medium",
  },
  {
    id: "ninja_1",
    name: "Ninja Renegado",
    level: 5,
    stats: {
      strength: 15,
      agility: 12,
      defense: 10,
      health: 150,
      max_health: 150,
    },
    xp_reward: 500,
    gold_reward: 200,
    difficulty: "hard",
  },

  // NÍVEL 6-10 - Inimigos Intermediários
  {
    id: "lorde_sombras",
    name: "Lorde das Sombras",
    level: 6,
    stats: {
      strength: 18,
      agility: 15,
      defense: 12,
      health: 180,
      max_health: 180,
    },
    xp_reward: 750,
    gold_reward: 300,
    difficulty: "hard",
  },
  {
    id: "imperador_espacial",
    name: "Imperador Espacial",
    level: 7,
    stats: {
      strength: 22,
      agility: 18,
      defense: 15,
      health: 220,
      max_health: 220,
    },
    xp_reward: 1000,
    gold_reward: 400,
    difficulty: "hard",
  },
  {
    id: "dragão_espacial",
    name: "Dragão Espacial",
    level: 8,
    stats: {
      strength: 25,
      agility: 20,
      defense: 18,
      health: 250,
      max_health: 250,
    },
    xp_reward: 1250,
    gold_reward: 500,
    difficulty: "hard",
  },
  {
    id: "mestre_ninja",
    name: "Mestre Ninja",
    level: 9,
    stats: {
      strength: 28,
      agility: 25,
      defense: 20,
      health: 280,
      max_health: 280,
    },
    xp_reward: 1500,
    gold_reward: 600,
    difficulty: "hard",
  },
  {
    id: "general_imperial",
    name: "General Imperial",
    level: 10,
    stats: {
      strength: 30,
      agility: 22,
      defense: 25,
      health: 300,
      max_health: 300,
    },
    xp_reward: 2000,
    gold_reward: 800,
    difficulty: "hard",
  },

  // NÍVEL 11-15 - Inimigos Avançados
  {
    id: "lorde_trevas",
    name: "Lorde das Trevas",
    level: 11,
    stats: {
      strength: 35,
      agility: 28,
      defense: 30,
      health: 350,
      max_health: 350,
    },
    xp_reward: 2500,
    gold_reward: 1000,
    difficulty: "hard",
  },
  {
    id: "comandante_espacial",
    name: "Comandante Espacial",
    level: 12,
    stats: {
      strength: 40,
      agility: 30,
      defense: 35,
      health: 400,
      max_health: 400,
    },
    xp_reward: 3000,
    gold_reward: 1200,
    difficulty: "hard",
  },
  {
    id: "fênix_cósmica",
    name: "Fênix Cósmica",
    level: 13,
    stats: {
      strength: 45,
      agility: 35,
      defense: 40,
      health: 450,
      max_health: 450,
    },
    xp_reward: 3500,
    gold_reward: 1400,
    difficulty: "hard",
  },
  {
    id: "titã_espacial",
    name: "Titã Espacial",
    level: 14,
    stats: {
      strength: 50,
      agility: 32,
      defense: 45,
      health: 500,
      max_health: 500,
    },
    xp_reward: 4000,
    gold_reward: 1600,
    difficulty: "hard",
  },
  {
    id: "imperador_sombras",
    name: "Imperador das Sombras",
    level: 15,
    stats: {
      strength: 55,
      agility: 40,
      defense: 50,
      health: 550,
      max_health: 550,
    },
    xp_reward: 5000,
    gold_reward: 2000,
    difficulty: "hard",
  },

  // NÍVEL 16-20 - Inimigos Épicos
  {
    id: "deus_guerra",
    name: "Deus da Guerra",
    level: 16,
    stats: {
      strength: 60,
      agility: 45,
      defense: 55,
      health: 600,
      max_health: 600,
    },
    xp_reward: 6000,
    gold_reward: 2400,
    difficulty: "hard",
  },
  {
    id: "dragão_primordial",
    name: "Dragão Primordial",
    level: 17,
    stats: {
      strength: 65,
      agility: 50,
      defense: 60,
      health: 650,
      max_health: 650,
    },
    xp_reward: 7000,
    gold_reward: 2800,
    difficulty: "hard",
  },
  {
    id: "lorde_tempo",
    name: "Lorde do Tempo",
    level: 18,
    stats: {
      strength: 70,
      agility: 55,
      defense: 65,
      health: 700,
      max_health: 700,
    },
    xp_reward: 8000,
    gold_reward: 3200,
    difficulty: "hard",
  },
  {
    id: "rei_demonios",
    name: "Rei dos Demônios",
    level: 19,
    stats: {
      strength: 75,
      agility: 60,
      defense: 70,
      health: 750,
      max_health: 750,
    },
    xp_reward: 9000,
    gold_reward: 3600,
    difficulty: "hard",
  },
  {
    id: "entidade_cósmica",
    name: "Entidade Cósmica",
    level: 20,
    stats: {
      strength: 80,
      agility: 65,
      defense: 75,
      health: 800,
      max_health: 800,
    },
    xp_reward: 10000,
    gold_reward: 4000,
    difficulty: "hard",
  },

  // NÍVEL 21-25 - Inimigos Lendários
  {
    id: "dragão_criação",
    name: "Dragão da Criação",
    level: 21,
    stats: {
      strength: 90,
      agility: 70,
      defense: 85,
      health: 900,
      max_health: 900,
    },
    xp_reward: 12000,
    gold_reward: 4800,
    difficulty: "hard",
  },
  {
    id: "anjo_caído",
    name: "Anjo Caído",
    level: 22,
    stats: {
      strength: 100,
      agility: 75,
      defense: 90,
      health: 1000,
      max_health: 1000,
    },
    xp_reward: 14000,
    gold_reward: 5600,
    difficulty: "hard",
  },
  {
    id: "kraken_espacial",
    name: "Kraken Espacial",
    level: 23,
    stats: {
      strength: 110,
      agility: 60,
      defense: 95,
      health: 1100,
      max_health: 1100,
    },
    xp_reward: 16000,
    gold_reward: 6400,
    difficulty: "hard",
  },
  {
    id: "lich_imortal",
    name: "Lich Imortal",
    level: 24,
    stats: {
      strength: 120,
      agility: 80,
      defense: 100,
      health: 1200,
      max_health: 1200,
    },
    xp_reward: 18000,
    gold_reward: 7200,
    difficulty: "hard",
  },
  {
    id: "deus_destruição",
    name: "Deus da Destruição",
    level: 25,
    stats: {
      strength: 130,
      agility: 85,
      defense: 110,
      health: 1300,
      max_health: 1300,
    },
    xp_reward: 20000,
    gold_reward: 8000,
    difficulty: "hard",
  },

  // NÍVEL 26-30 - Inimigos Míticos
  {
    id: "serpente_cósmica",
    name: "Serpente Cósmica",
    level: 26,
    stats: {
      strength: 140,
      agility: 90,
      defense: 120,
      health: 1400,
      max_health: 1400,
    },
    xp_reward: 25000,
    gold_reward: 10000,
    difficulty: "hard",
  },
  {
    id: "titã_caos",
    name: "Titã do Caos",
    level: 27,
    stats: {
      strength: 150,
      agility: 70,
      defense: 130,
      health: 1500,
      max_health: 1500,
    },
    xp_reward: 30000,
    gold_reward: 12000,
    difficulty: "hard",
  },
  {
    id: "dragão_vazio",
    name: "Dragão do Vazio",
    level: 28,
    stats: {
      strength: 160,
      agility: 95,
      defense: 140,
      health: 1600,
      max_health: 1600,
    },
    xp_reward: 35000,
    gold_reward: 14000,
    difficulty: "hard",
  },
  {
    id: "lorde_multiverso",
    name: "Lorde do Multiverso",
    level: 29,
    stats: {
      strength: 170,
      agility: 100,
      defense: 150,
      health: 1700,
      max_health: 1700,
    },
    xp_reward: 40000,
    gold_reward: 16000,
    difficulty: "hard",
  },
  {
    id: "entidade_primordial",
    name: "Entidade Primordial",
    level: 30,
    stats: {
      strength: 180,
      agility: 105,
      defense: 160,
      health: 1800,
      max_health: 1800,
    },
    xp_reward: 50000,
    gold_reward: 20000,
    difficulty: "hard",
  },

  // NÍVEL 31-35 - Inimigos Divinos
  {
    id: "deus_criação",
    name: "Deus da Criação",
    level: 31,
    stats: {
      strength: 200,
      agility: 120,
      defense: 180,
      health: 2000,
      max_health: 2000,
    },
    xp_reward: 60000,
    gold_reward: 24000,
    difficulty: "hard",
  },
  {
    id: "dragão_infinito",
    name: "Dragão Infinito",
    level: 32,
    stats: {
      strength: 220,
      agility: 130,
      defense: 200,
      health: 2200,
      max_health: 2200,
    },
    xp_reward: 70000,
    gold_reward: 28000,
    difficulty: "hard",
  },
  {
    id: "ser_absoluto",
    name: "Ser Absoluto",
    level: 33,
    stats: {
      strength: 240,
      agility: 140,
      defense: 220,
      health: 2400,
      max_health: 2400,
    },
    xp_reward: 80000,
    gold_reward: 32000,
    difficulty: "hard",
  },
  {
    id: "lorde_tempo_eterno",
    name: "Lorde do Tempo Eterno",
    level: 34,
    stats: {
      strength: 260,
      agility: 150,
      defense: 240,
      health: 2600,
      max_health: 2600,
    },
    xp_reward: 90000,
    gold_reward: 36000,
    difficulty: "hard",
  },
  {
    id: "entidade_cósmica_suprema",
    name: "Entidade Cósmica Suprema",
    level: 35,
    stats: {
      strength: 280,
      agility: 160,
      defense: 260,
      health: 2800,
      max_health: 2800,
    },
    xp_reward: 100000,
    gold_reward: 40000,
    difficulty: "hard",
  },

  // NÍVEL 36-40 - Inimigos Transcendentes
  {
    id: "deus_supremo",
    name: "Deus Supremo",
    level: 36,
    stats: {
      strength: 320,
      agility: 180,
      defense: 300,
      health: 3200,
      max_health: 3200,
    },
    xp_reward: 120000,
    gold_reward: 48000,
    difficulty: "hard",
  },
  {
    id: "dragão_primordial_supremo",
    name: "Dragão Primordial Supremo",
    level: 37,
    stats: {
      strength: 360,
      agility: 200,
      defense: 340,
      health: 3600,
      max_health: 3600,
    },
    xp_reward: 140000,
    gold_reward: 56000,
    difficulty: "hard",
  },
  {
    id: "ser_transcendente",
    name: "Ser Transcendente",
    level: 38,
    stats: {
      strength: 400,
      agility: 220,
      defense: 380,
      health: 4000,
      max_health: 4000,
    },
    xp_reward: 160000,
    gold_reward: 64000,
    difficulty: "hard",
  },
  {
    id: "lorde_vazio",
    name: "Lorde do Vazio",
    level: 39,
    stats: {
      strength: 440,
      agility: 240,
      defense: 420,
      health: 4400,
      max_health: 4400,
    },
    xp_reward: 180000,
    gold_reward: 72000,
    difficulty: "hard",
  },
  {
    id: "entidade_absoluta",
    name: "Entidade Absoluta",
    level: 40,
    stats: {
      strength: 480,
      agility: 260,
      defense: 460,
      health: 4800,
      max_health: 4800,
    },
    xp_reward: 200000,
    gold_reward: 80000,
    difficulty: "hard",
  },

  // NÍVEL 41-45 - Inimigos Míticos Supremos
  {
    id: "deus_realidade",
    name: "Deus da Realidade",
    level: 41,
    stats: {
      strength: 550,
      agility: 300,
      defense: 520,
      health: 5500,
      max_health: 5500,
    },
    xp_reward: 250000,
    gold_reward: 100000,
    difficulty: "hard",
  },
  {
    id: "dragão_criação_supremo",
    name: "Dragão da Criação Supremo",
    level: 42,
    stats: {
      strength: 600,
      agility: 320,
      defense: 560,
      health: 6000,
      max_health: 6000,
    },
    xp_reward: 300000,
    gold_reward: 120000,
    difficulty: "hard",
  },
  {
    id: "ser_infinito",
    name: "Ser Infinito",
    level: 43,
    stats: {
      strength: 650,
      agility: 340,
      defense: 600,
      health: 6500,
      max_health: 6500,
    },
    xp_reward: 350000,
    gold_reward: 140000,
    difficulty: "hard",
  },
  {
    id: "lorde_existência",
    name: "Lorde da Existência",
    level: 44,
    stats: {
      strength: 700,
      agility: 360,
      defense: 640,
      health: 7000,
      max_health: 7000,
    },
    xp_reward: 400000,
    gold_reward: 160000,
    difficulty: "hard",
  },
  {
    id: "entidade_primordial_suprema",
    name: "Entidade Primordial Suprema",
    level: 45,
    stats: {
      strength: 750,
      agility: 380,
      defense: 680,
      health: 7500,
      max_health: 7500,
    },
    xp_reward: 500000,
    gold_reward: 200000,
    difficulty: "hard",
  },

  // NÍVEL 46-50 - Inimigos Lendários Finais
  {
    id: "deus_omnipotência",
    name: "Deus da Omnipotência",
    level: 46,
    stats: {
      strength: 850,
      agility: 420,
      defense: 780,
      health: 8500,
      max_health: 8500,
    },
    xp_reward: 600000,
    gold_reward: 240000,
    difficulty: "hard",
  },
  {
    id: "dragão_eternidade",
    name: "Dragão da Eternidade",
    level: 47,
    stats: {
      strength: 950,
      agility: 460,
      defense: 880,
      health: 9500,
      max_health: 9500,
    },
    xp_reward: 700000,
    gold_reward: 280000,
    difficulty: "hard",
  },
  {
    id: "ser_absoluto_supremo",
    name: "Ser Absoluto Supremo",
    level: 48,
    stats: {
      strength: 1050,
      agility: 500,
      defense: 980,
      health: 10500,
      max_health: 10500,
    },
    xp_reward: 800000,
    gold_reward: 320000,
    difficulty: "hard",
  },
  {
    id: "lorde_transcendência",
    name: "Lorde da Transcendência",
    level: 49,
    stats: {
      strength: 1150,
      agility: 540,
      defense: 1080,
      health: 11500,
      max_health: 11500,
    },
    xp_reward: 900000,
    gold_reward: 360000,
    difficulty: "hard",
  },
  {
    id: "entidade_criação_final",
    name: "Entidade da Criação Final",
    level: 50,
    stats: {
      strength: 1250,
      agility: 580,
      defense: 1180,
      health: 12500,
      max_health: 12500,
    },
    xp_reward: 1000000,
    gold_reward: 400000,
    difficulty: "hard",
  },
];

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    let token = extractTokenFromHeader(authHeader);
    if (!token) {
      const cookieToken = getCookie(event, "token");
      token = cookieToken || null;
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

    const characterId = getQuery(event).character_id;

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
      .get(characterId, payload.userId) as any;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Filtrar NPCs baseado no nível do personagem
    const characterLevel = character.level;
    const availableOpponents = NPC_OPPONENTS.filter((npc) => {
      // Permitir NPCs até 2 níveis acima do personagem
      return npc.level <= characterLevel + 2;
    });

    const response: ApiResponse<NPC[]> = {
      success: true,
      data: availableOpponents,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
