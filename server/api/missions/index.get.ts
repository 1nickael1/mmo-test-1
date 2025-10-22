import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/database";
import type { ApiResponse } from "../../../types";

// Definir missões disponíveis por nível
const AVAILABLE_MISSIONS = [
  // NÍVEL 1-5 - Missões Básicas
  {
    id: "first_battle",
    name: "Primeira Batalha",
    description: "Derrote seu primeiro inimigo em combate",
    type: "battle",
    level_required: 1,
    target: 1,
    rewards: {
      xp: 200,
      gold: 100,
      materials: 0,
      crystals: 0,
    },
    difficulty: "easy",
  },
  {
    id: "collect_resources",
    name: "Coletor de Recursos",
    description: "Colete 50 unidades de ouro",
    type: "resource",
    level_required: 1,
    target: 50,
    rewards: {
      xp: 150,
      gold: 50,
      materials: 10,
      crystals: 0,
    },
    difficulty: "easy",
  },
  {
    id: "level_up",
    name: "Primeiro Nível",
    description: "Alcance o nível 2",
    type: "level",
    level_required: 1,
    target: 2,
    rewards: {
      xp: 300,
      gold: 200,
      materials: 20,
      crystals: 0,
    },
    difficulty: "easy",
  },
  {
    id: "learn_skill",
    name: "Primeira Habilidade",
    description: "Aprenda sua primeira habilidade",
    type: "skill",
    level_required: 2,
    target: 1,
    rewards: {
      xp: 250,
      gold: 150,
      materials: 15,
      crystals: 0,
    },
    difficulty: "easy",
  },
  {
    id: "defeat_bandits",
    name: "Caçador de Bandidos",
    description: "Derrote 5 bandidos espaciais",
    type: "battle",
    level_required: 3,
    target: 5,
    rewards: {
      xp: 500,
      gold: 300,
      materials: 25,
      crystals: 0,
    },
    difficulty: "medium",
  },

  // NÍVEL 6-10 - Missões Intermediárias
  {
    id: "pirate_hunter",
    name: "Caçador de Piratas",
    description: "Derrote 10 piratas espaciais",
    type: "battle",
    level_required: 6,
    target: 10,
    rewards: {
      xp: 1000,
      gold: 600,
      materials: 50,
      crystals: 5,
    },
    difficulty: "medium",
  },
  {
    id: "resource_master",
    name: "Mestre dos Recursos",
    description: "Colete 500 unidades de ouro",
    type: "resource",
    level_required: 7,
    target: 500,
    rewards: {
      xp: 800,
      gold: 400,
      materials: 75,
      crystals: 10,
    },
    difficulty: "medium",
  },
  {
    id: "skill_master",
    name: "Mestre das Habilidades",
    description: "Aprenda 5 habilidades diferentes",
    type: "skill",
    level_required: 8,
    target: 5,
    rewards: {
      xp: 1200,
      gold: 800,
      materials: 100,
      crystals: 15,
    },
    difficulty: "medium",
  },
  {
    id: "level_10",
    name: "Décimo Nível",
    description: "Alcance o nível 10",
    type: "level",
    level_required: 9,
    target: 10,
    rewards: {
      xp: 2000,
      gold: 1500,
      materials: 150,
      crystals: 25,
    },
    difficulty: "hard",
  },
  {
    id: "boss_hunter",
    name: "Caçador de Chefes",
    description: "Derrote 3 chefes de nível 5 ou superior",
    type: "battle",
    level_required: 10,
    target: 3,
    rewards: {
      xp: 2500,
      gold: 2000,
      materials: 200,
      crystals: 50,
    },
    difficulty: "hard",
  },

  // NÍVEL 11-20 - Missões Avançadas
  {
    id: "shadow_lord",
    name: "Derrote o Lorde das Sombras",
    description: "Derrote o Lorde das Sombras (nível 6)",
    type: "battle",
    level_required: 11,
    target: 1,
    rewards: {
      xp: 3000,
      gold: 2500,
      materials: 300,
      crystals: 75,
    },
    difficulty: "hard",
  },
  {
    id: "imperial_commander",
    name: "Comandante Imperial",
    description: "Derrote o Comandante Espacial (nível 12)",
    type: "battle",
    level_required: 12,
    target: 1,
    rewards: {
      xp: 4000,
      gold: 3500,
      materials: 400,
      crystals: 100,
    },
    difficulty: "hard",
  },
  {
    id: "cosmic_phoenix",
    name: "Fênix Cósmica",
    description: "Derrote a Fênix Cósmica (nível 13)",
    type: "battle",
    level_required: 13,
    target: 1,
    rewards: {
      xp: 5000,
      gold: 4500,
      materials: 500,
      crystals: 125,
    },
    difficulty: "hard",
  },
  {
    id: "space_titan",
    name: "Titã Espacial",
    description: "Derrote o Titã Espacial (nível 14)",
    type: "battle",
    level_required: 14,
    target: 1,
    rewards: {
      xp: 6000,
      gold: 5500,
      materials: 600,
      crystals: 150,
    },
    difficulty: "hard",
  },
  {
    id: "shadow_emperor",
    name: "Imperador das Sombras",
    description: "Derrote o Imperador das Sombras (nível 15)",
    type: "battle",
    level_required: 15,
    target: 1,
    rewards: {
      xp: 7500,
      gold: 7000,
      materials: 750,
      crystals: 200,
    },
    difficulty: "hard",
  },
  {
    id: "level_20",
    name: "Vigésimo Nível",
    description: "Alcance o nível 20",
    type: "level",
    level_required: 19,
    target: 20,
    rewards: {
      xp: 10000,
      gold: 10000,
      materials: 1000,
      crystals: 300,
    },
    difficulty: "hard",
  },

  // NÍVEL 21-30 - Missões Épicas
  {
    id: "war_god",
    name: "Deus da Guerra",
    description: "Derrote o Deus da Guerra (nível 16)",
    type: "battle",
    level_required: 21,
    target: 1,
    rewards: {
      xp: 15000,
      gold: 15000,
      materials: 1500,
      crystals: 500,
    },
    difficulty: "hard",
  },
  {
    id: "primordial_dragon",
    name: "Dragão Primordial",
    description: "Derrote o Dragão Primordial (nível 17)",
    type: "battle",
    level_required: 22,
    target: 1,
    rewards: {
      xp: 18000,
      gold: 18000,
      materials: 1800,
      crystals: 600,
    },
    difficulty: "hard",
  },
  {
    id: "time_lord",
    name: "Lorde do Tempo",
    description: "Derrote o Lorde do Tempo (nível 18)",
    type: "battle",
    level_required: 23,
    target: 1,
    rewards: {
      xp: 22000,
      gold: 22000,
      materials: 2200,
      crystals: 750,
    },
    difficulty: "hard",
  },
  {
    id: "demon_king",
    name: "Rei dos Demônios",
    description: "Derrote o Rei dos Demônios (nível 19)",
    type: "battle",
    level_required: 24,
    target: 1,
    rewards: {
      xp: 25000,
      gold: 25000,
      materials: 2500,
      crystals: 900,
    },
    difficulty: "hard",
  },
  {
    id: "cosmic_entity",
    name: "Entidade Cósmica",
    description: "Derrote a Entidade Cósmica (nível 20)",
    type: "battle",
    level_required: 25,
    target: 1,
    rewards: {
      xp: 30000,
      gold: 30000,
      materials: 3000,
      crystals: 1200,
    },
    difficulty: "hard",
  },
  {
    id: "level_30",
    name: "Trigésimo Nível",
    description: "Alcance o nível 30",
    type: "level",
    level_required: 29,
    target: 30,
    rewards: {
      xp: 50000,
      gold: 50000,
      materials: 5000,
      crystals: 2000,
    },
    difficulty: "hard",
  },

  // NÍVEL 31-40 - Missões Lendárias
  {
    id: "creation_dragon",
    name: "Dragão da Criação",
    description: "Derrote o Dragão da Criação (nível 21)",
    type: "battle",
    level_required: 31,
    target: 1,
    rewards: {
      xp: 60000,
      gold: 60000,
      materials: 6000,
      crystals: 2500,
    },
    difficulty: "hard",
  },
  {
    id: "fallen_angel",
    name: "Anjo Caído",
    description: "Derrote o Anjo Caído (nível 22)",
    type: "battle",
    level_required: 32,
    target: 1,
    rewards: {
      xp: 70000,
      gold: 70000,
      materials: 7000,
      crystals: 3000,
    },
    difficulty: "hard",
  },
  {
    id: "space_kraken",
    name: "Kraken Espacial",
    description: "Derrote o Kraken Espacial (nível 23)",
    type: "battle",
    level_required: 33,
    target: 1,
    rewards: {
      xp: 80000,
      gold: 80000,
      materials: 8000,
      crystals: 3500,
    },
    difficulty: "hard",
  },
  {
    id: "immortal_lich",
    name: "Lich Imortal",
    description: "Derrote o Lich Imortal (nível 24)",
    type: "battle",
    level_required: 34,
    target: 1,
    rewards: {
      xp: 90000,
      gold: 90000,
      materials: 9000,
      crystals: 4000,
    },
    difficulty: "hard",
  },
  {
    id: "destruction_god",
    name: "Deus da Destruição",
    description: "Derrote o Deus da Destruição (nível 25)",
    type: "battle",
    level_required: 35,
    target: 1,
    rewards: {
      xp: 100000,
      gold: 100000,
      materials: 10000,
      crystals: 5000,
    },
    difficulty: "hard",
  },
  {
    id: "level_40",
    name: "Quadragésimo Nível",
    description: "Alcance o nível 40",
    type: "level",
    level_required: 39,
    target: 40,
    rewards: {
      xp: 200000,
      gold: 200000,
      materials: 20000,
      crystals: 10000,
    },
    difficulty: "hard",
  },

  // NÍVEL 41-50 - Missões Míticas
  {
    id: "reality_god",
    name: "Deus da Realidade",
    description: "Derrote o Deus da Realidade (nível 41)",
    type: "battle",
    level_required: 41,
    target: 1,
    rewards: {
      xp: 250000,
      gold: 250000,
      materials: 25000,
      crystals: 15000,
    },
    difficulty: "hard",
  },
  {
    id: "supreme_creation_dragon",
    name: "Dragão da Criação Supremo",
    description: "Derrote o Dragão da Criação Supremo (nível 42)",
    type: "battle",
    level_required: 42,
    target: 1,
    rewards: {
      xp: 300000,
      gold: 300000,
      materials: 30000,
      crystals: 20000,
    },
    difficulty: "hard",
  },
  {
    id: "infinite_being",
    name: "Ser Infinito",
    description: "Derrote o Ser Infinito (nível 43)",
    type: "battle",
    level_required: 43,
    target: 1,
    rewards: {
      xp: 350000,
      gold: 350000,
      materials: 35000,
      crystals: 25000,
    },
    difficulty: "hard",
  },
  {
    id: "existence_lord",
    name: "Lorde da Existência",
    description: "Derrote o Lorde da Existência (nível 44)",
    type: "battle",
    level_required: 44,
    target: 1,
    rewards: {
      xp: 400000,
      gold: 400000,
      materials: 40000,
      crystals: 30000,
    },
    difficulty: "hard",
  },
  {
    id: "supreme_primordial_entity",
    name: "Entidade Primordial Suprema",
    description: "Derrote a Entidade Primordial Suprema (nível 45)",
    type: "battle",
    level_required: 45,
    target: 1,
    rewards: {
      xp: 500000,
      gold: 500000,
      materials: 50000,
      crystals: 40000,
    },
    difficulty: "hard",
  },
  {
    id: "level_50",
    name: "Quinquagésimo Nível",
    description: "Alcance o nível 50 - O Nível Máximo!",
    type: "level",
    level_required: 49,
    target: 50,
    rewards: {
      xp: 1000000,
      gold: 1000000,
      materials: 100000,
      crystals: 100000,
    },
    difficulty: "hard",
  },

  // Missões Especiais Finais
  {
    id: "omnipotence_god",
    name: "Deus da Omnipotência",
    description: "Derrote o Deus da Omnipotência (nível 46)",
    type: "battle",
    level_required: 46,
    target: 1,
    rewards: {
      xp: 600000,
      gold: 600000,
      materials: 60000,
      crystals: 50000,
    },
    difficulty: "hard",
  },
  {
    id: "eternity_dragon",
    name: "Dragão da Eternidade",
    description: "Derrote o Dragão da Eternidade (nível 47)",
    type: "battle",
    level_required: 47,
    target: 1,
    rewards: {
      xp: 700000,
      gold: 700000,
      materials: 70000,
      crystals: 60000,
    },
    difficulty: "hard",
  },
  {
    id: "supreme_absolute_being",
    name: "Ser Absoluto Supremo",
    description: "Derrote o Ser Absoluto Supremo (nível 48)",
    type: "battle",
    level_required: 48,
    target: 1,
    rewards: {
      xp: 800000,
      gold: 800000,
      materials: 80000,
      crystals: 70000,
    },
    difficulty: "hard",
  },
  {
    id: "transcendence_lord",
    name: "Lorde da Transcendência",
    description: "Derrote o Lorde da Transcendência (nível 49)",
    type: "battle",
    level_required: 49,
    target: 1,
    rewards: {
      xp: 900000,
      gold: 900000,
      materials: 90000,
      crystals: 80000,
    },
    difficulty: "hard",
  },
  {
    id: "final_creation_entity",
    name: "Entidade da Criação Final",
    description:
      "Derrote a Entidade da Criação Final (nível 50) - O BOSS FINAL!",
    type: "battle",
    level_required: 50,
    target: 1,
    rewards: {
      xp: 2000000,
      gold: 2000000,
      materials: 200000,
      crystals: 200000,
    },
    difficulty: "hard",
  },
];

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Token de autenticação não fornecido",
      });
    }

    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        statusMessage: "Token inválido",
      });
    }

    const characterId = getQuery(event).character_id;

    if (!characterId) {
      throw createError({
        statusCode: 400,
        statusMessage: "ID do personagem é obrigatório",
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
        statusMessage: "Personagem não encontrado",
      });
    }

    // Filtrar missões baseado no nível do personagem
    const characterLevel = character.level;
    const availableMissions = AVAILABLE_MISSIONS.filter((mission) => {
      return mission.level_required <= characterLevel;
    });

    // Simular progresso das missões (em um jogo real, isso viria do banco de dados)
    const missionsWithProgress = availableMissions.map((mission) => ({
      ...mission,
      progress: Math.floor(Math.random() * mission.target), // Simulação
      completed: false, // Simulação
    }));

    const response: ApiResponse<typeof missionsWithProgress> = {
      success: true,
      data: missionsWithProgress,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Erro interno do servidor",
    });
  }
});
