import type { ApiResponse, NPC } from "../../../types";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const characterLevel = parseInt(query.level as string) || 1;

    // Definir NPCs por nível (1-50)
    const npcsByLevel: Record<number, NPC[]> = {
      // Níveis 1-5: Inimigos Básicos
      1: [
        {
          id: "bandido_espacial_1",
          name: "Bandido Espacial",
          level: 1,
          stats: {
            strength: 5,
            agility: 6,
            defense: 4,
            health: 50,
            max_health: 50,
          },
          xp_reward: 100,
          gold_reward: 25,
          difficulty: "easy",
        },
      ],
      2: [
        {
          id: "pirata_espacial_2",
          name: "Pirata Espacial",
          level: 2,
          stats: {
            strength: 7,
            agility: 8,
            defense: 5,
            health: 70,
            max_health: 70,
          },
          xp_reward: 150,
          gold_reward: 40,
          difficulty: "easy",
        },
      ],
      3: [
        {
          id: "ciborgue_rebelde_3",
          name: "Ciborgue Rebelde",
          level: 3,
          stats: {
            strength: 9,
            agility: 7,
            defense: 8,
            health: 90,
            max_health: 90,
          },
          xp_reward: 200,
          gold_reward: 60,
          difficulty: "easy",
        },
      ],
      4: [
        {
          id: "alienigena_hostil_4",
          name: "Alienígena Hostil",
          level: 4,
          stats: {
            strength: 11,
            agility: 10,
            defense: 6,
            health: 110,
            max_health: 110,
          },
          xp_reward: 250,
          gold_reward: 80,
          difficulty: "easy",
        },
      ],
      5: [
        {
          id: "ninja_renegado_5",
          name: "Ninja Renegado",
          level: 5,
          stats: {
            strength: 13,
            agility: 12,
            defense: 7,
            health: 130,
            max_health: 130,
          },
          xp_reward: 300,
          gold_reward: 100,
          difficulty: "easy",
        },
      ],
      // Níveis 6-10: Inimigos Intermediários
      6: [
        {
          id: "lorde_sombras_6",
          name: "Lorde das Sombras",
          level: 6,
          stats: {
            strength: 15,
            agility: 14,
            defense: 9,
            health: 150,
            max_health: 150,
          },
          xp_reward: 400,
          gold_reward: 120,
          difficulty: "medium",
        },
      ],
      7: [
        {
          id: "imperador_espacial_7",
          name: "Imperador Espacial",
          level: 7,
          stats: {
            strength: 17,
            agility: 13,
            defense: 12,
            health: 170,
            max_health: 170,
          },
          xp_reward: 500,
          gold_reward: 150,
          difficulty: "medium",
        },
      ],
      8: [
        {
          id: "dragao_espacial_8",
          name: "Dragão Espacial",
          level: 8,
          stats: {
            strength: 20,
            agility: 15,
            defense: 14,
            health: 200,
            max_health: 200,
          },
          xp_reward: 600,
          gold_reward: 180,
          difficulty: "medium",
        },
      ],
      9: [
        {
          id: "mestre_ninja_9",
          name: "Mestre Ninja",
          level: 9,
          stats: {
            strength: 22,
            agility: 18,
            defense: 11,
            health: 220,
            max_health: 220,
          },
          xp_reward: 700,
          gold_reward: 210,
          difficulty: "medium",
        },
      ],
      10: [
        {
          id: "general_imperial_10",
          name: "General Imperial",
          level: 10,
          stats: {
            strength: 25,
            agility: 16,
            defense: 16,
            health: 250,
            max_health: 250,
          },
          xp_reward: 800,
          gold_reward: 250,
          difficulty: "medium",
        },
      ],
      // Níveis 11-15: Inimigos Avançados
      11: [
        {
          id: "lorde_trevas_11",
          name: "Lorde das Trevas",
          level: 11,
          stats: {
            strength: 28,
            agility: 20,
            defense: 18,
            health: 280,
            max_health: 280,
          },
          xp_reward: 1000,
          gold_reward: 300,
          difficulty: "hard",
        },
      ],
      12: [
        {
          id: "comandante_espacial_12",
          name: "Comandante Espacial",
          level: 12,
          stats: {
            strength: 30,
            agility: 18,
            defense: 22,
            health: 300,
            max_health: 300,
          },
          xp_reward: 1200,
          gold_reward: 350,
          difficulty: "hard",
        },
      ],
      13: [
        {
          id: "fenix_cosmica_13",
          name: "Fênix Cósmica",
          level: 13,
          stats: {
            strength: 33,
            agility: 25,
            defense: 20,
            health: 330,
            max_health: 330,
          },
          xp_reward: 1400,
          gold_reward: 400,
          difficulty: "hard",
        },
      ],
      14: [
        {
          id: "tita_espacial_14",
          name: "Titã Espacial",
          level: 14,
          stats: {
            strength: 36,
            agility: 15,
            defense: 28,
            health: 360,
            max_health: 360,
          },
          xp_reward: 1600,
          gold_reward: 450,
          difficulty: "hard",
        },
      ],
      15: [
        {
          id: "imperador_sombras_15",
          name: "Imperador das Sombras",
          level: 15,
          stats: {
            strength: 40,
            agility: 22,
            defense: 25,
            health: 400,
            max_health: 400,
          },
          xp_reward: 1800,
          gold_reward: 500,
          difficulty: "hard",
        },
      ],
      // Níveis 16-20: Inimigos Épicos
      16: [
        {
          id: "deus_guerra_16",
          name: "Deus da Guerra",
          level: 16,
          stats: {
            strength: 45,
            agility: 25,
            defense: 30,
            health: 450,
            max_health: 450,
          },
          xp_reward: 2500,
          gold_reward: 600,
          difficulty: "hard",
        },
      ],
      17: [
        {
          id: "dragao_primordial_17",
          name: "Dragão Primordial",
          level: 17,
          stats: {
            strength: 50,
            agility: 28,
            defense: 32,
            health: 500,
            max_health: 500,
          },
          xp_reward: 3000,
          gold_reward: 700,
          difficulty: "hard",
        },
      ],
      18: [
        {
          id: "lorde_tempo_18",
          name: "Lorde do Tempo",
          level: 18,
          stats: {
            strength: 55,
            agility: 30,
            defense: 28,
            health: 550,
            max_health: 550,
          },
          xp_reward: 3500,
          gold_reward: 800,
          difficulty: "hard",
        },
      ],
      19: [
        {
          id: "rei_demonios_19",
          name: "Rei dos Demônios",
          level: 19,
          stats: {
            strength: 60,
            agility: 25,
            defense: 35,
            health: 600,
            max_health: 600,
          },
          xp_reward: 4000,
          gold_reward: 900,
          difficulty: "hard",
        },
      ],
      20: [
        {
          id: "entidade_cosmica_20",
          name: "Entidade Cósmica",
          level: 20,
          stats: {
            strength: 65,
            agility: 35,
            defense: 30,
            health: 650,
            max_health: 650,
          },
          xp_reward: 5000,
          gold_reward: 1000,
          difficulty: "hard",
        },
      ],
      // Níveis 21-25: Inimigos Lendários
      21: [
        {
          id: "dragao_criacao_21",
          name: "Dragão da Criação",
          level: 21,
          stats: {
            strength: 75,
            agility: 40,
            defense: 40,
            health: 750,
            max_health: 750,
          },
          xp_reward: 7500,
          gold_reward: 1500,
          difficulty: "hard",
        },
      ],
      22: [
        {
          id: "anjo_caido_22",
          name: "Anjo Caído",
          level: 22,
          stats: {
            strength: 80,
            agility: 45,
            defense: 35,
            health: 800,
            max_health: 800,
          },
          xp_reward: 9000,
          gold_reward: 1800,
          difficulty: "hard",
        },
      ],
      23: [
        {
          id: "kraken_espacial_23",
          name: "Kraken Espacial",
          level: 23,
          stats: {
            strength: 85,
            agility: 30,
            defense: 50,
            health: 850,
            max_health: 850,
          },
          xp_reward: 11000,
          gold_reward: 2200,
          difficulty: "hard",
        },
      ],
      24: [
        {
          id: "lich_imortal_24",
          name: "Lich Imortal",
          level: 24,
          stats: {
            strength: 90,
            agility: 35,
            defense: 45,
            health: 900,
            max_health: 900,
          },
          xp_reward: 13000,
          gold_reward: 2600,
          difficulty: "hard",
        },
      ],
      25: [
        {
          id: "deus_destruicao_25",
          name: "Deus da Destruição",
          level: 25,
          stats: {
            strength: 100,
            agility: 40,
            defense: 50,
            health: 1000,
            max_health: 1000,
          },
          xp_reward: 15000,
          gold_reward: 3000,
          difficulty: "hard",
        },
      ],
      // Níveis 26-30: Inimigos Míticos
      26: [
        {
          id: "serpente_cosmica_26",
          name: "Serpente Cósmica",
          level: 26,
          stats: {
            strength: 110,
            agility: 50,
            defense: 45,
            health: 1100,
            max_health: 1100,
          },
          xp_reward: 20000,
          gold_reward: 4000,
          difficulty: "hard",
        },
      ],
      27: [
        {
          id: "tita_caos_27",
          name: "Titã do Caos",
          level: 27,
          stats: {
            strength: 120,
            agility: 35,
            defense: 60,
            health: 1200,
            max_health: 1200,
          },
          xp_reward: 25000,
          gold_reward: 5000,
          difficulty: "hard",
        },
      ],
      28: [
        {
          id: "dragao_vazio_28",
          name: "Dragão do Vazio",
          level: 28,
          stats: {
            strength: 130,
            agility: 45,
            defense: 55,
            health: 1300,
            max_health: 1300,
          },
          xp_reward: 30000,
          gold_reward: 6000,
          difficulty: "hard",
        },
      ],
      29: [
        {
          id: "lorde_multiverso_29",
          name: "Lorde do Multiverso",
          level: 29,
          stats: {
            strength: 140,
            agility: 50,
            defense: 50,
            health: 1400,
            max_health: 1400,
          },
          xp_reward: 35000,
          gold_reward: 7000,
          difficulty: "hard",
        },
      ],
      30: [
        {
          id: "entidade_primordial_30",
          name: "Entidade Primordial",
          level: 30,
          stats: {
            strength: 150,
            agility: 55,
            defense: 55,
            health: 1500,
            max_health: 1500,
          },
          xp_reward: 50000,
          gold_reward: 10000,
          difficulty: "hard",
        },
      ],
      // Níveis 31-35: Inimigos Divinos
      31: [
        {
          id: "deus_criacao_31",
          name: "Deus da Criação",
          level: 31,
          stats: {
            strength: 170,
            agility: 60,
            defense: 65,
            health: 1700,
            max_health: 1700,
          },
          xp_reward: 75000,
          gold_reward: 15000,
          difficulty: "hard",
        },
      ],
      32: [
        {
          id: "dragao_infinito_32",
          name: "Dragão Infinito",
          level: 32,
          stats: {
            strength: 190,
            agility: 65,
            defense: 70,
            health: 1900,
            max_health: 1900,
          },
          xp_reward: 100000,
          gold_reward: 20000,
          difficulty: "hard",
        },
      ],
      33: [
        {
          id: "ser_absoluto_33",
          name: "Ser Absoluto",
          level: 33,
          stats: {
            strength: 210,
            agility: 70,
            defense: 75,
            health: 2100,
            max_health: 2100,
          },
          xp_reward: 125000,
          gold_reward: 25000,
          difficulty: "hard",
        },
      ],
      34: [
        {
          id: "lorde_tempo_eterno_34",
          name: "Lorde do Tempo Eterno",
          level: 34,
          stats: {
            strength: 230,
            agility: 75,
            defense: 70,
            health: 2300,
            max_health: 2300,
          },
          xp_reward: 150000,
          gold_reward: 30000,
          difficulty: "hard",
        },
      ],
      35: [
        {
          id: "entidade_cosmica_suprema_35",
          name: "Entidade Cósmica Suprema",
          level: 35,
          stats: {
            strength: 250,
            agility: 80,
            defense: 80,
            health: 2500,
            max_health: 2500,
          },
          xp_reward: 200000,
          gold_reward: 40000,
          difficulty: "hard",
        },
      ],
      // Níveis 36-40: Inimigos Transcendentes
      36: [
        {
          id: "deus_supremo_36",
          name: "Deus Supremo",
          level: 36,
          stats: {
            strength: 280,
            agility: 85,
            defense: 90,
            health: 2800,
            max_health: 2800,
          },
          xp_reward: 300000,
          gold_reward: 60000,
          difficulty: "hard",
        },
      ],
      37: [
        {
          id: "dragao_primordial_supremo_37",
          name: "Dragão Primordial Supremo",
          level: 37,
          stats: {
            strength: 310,
            agility: 90,
            defense: 95,
            health: 3100,
            max_health: 3100,
          },
          xp_reward: 400000,
          gold_reward: 80000,
          difficulty: "hard",
        },
      ],
      38: [
        {
          id: "ser_transcendente_38",
          name: "Ser Transcendente",
          level: 38,
          stats: {
            strength: 340,
            agility: 95,
            defense: 90,
            health: 3400,
            max_health: 3400,
          },
          xp_reward: 500000,
          gold_reward: 100000,
          difficulty: "hard",
        },
      ],
      39: [
        {
          id: "lorde_vazio_39",
          name: "Lorde do Vazio",
          level: 39,
          stats: {
            strength: 370,
            agility: 85,
            defense: 105,
            health: 3700,
            max_health: 3700,
          },
          xp_reward: 600000,
          gold_reward: 120000,
          difficulty: "hard",
        },
      ],
      40: [
        {
          id: "entidade_absoluta_40",
          name: "Entidade Absoluta",
          level: 40,
          stats: {
            strength: 400,
            agility: 100,
            defense: 100,
            health: 4000,
            max_health: 4000,
          },
          xp_reward: 800000,
          gold_reward: 160000,
          difficulty: "hard",
        },
      ],
      // Níveis 41-45: Inimigos Míticos Supremos
      41: [
        {
          id: "deus_realidade_41",
          name: "Deus da Realidade",
          level: 41,
          stats: {
            strength: 450,
            agility: 110,
            defense: 115,
            health: 4500,
            max_health: 4500,
          },
          xp_reward: 1200000,
          gold_reward: 240000,
          difficulty: "hard",
        },
      ],
      42: [
        {
          id: "dragao_criacao_supremo_42",
          name: "Dragão da Criação Supremo",
          level: 42,
          stats: {
            strength: 500,
            agility: 115,
            defense: 120,
            health: 5000,
            max_health: 5000,
          },
          xp_reward: 1500000,
          gold_reward: 300000,
          difficulty: "hard",
        },
      ],
      43: [
        {
          id: "ser_infinito_43",
          name: "Ser Infinito",
          level: 43,
          stats: {
            strength: 550,
            agility: 120,
            defense: 115,
            health: 5500,
            max_health: 5500,
          },
          xp_reward: 1800000,
          gold_reward: 360000,
          difficulty: "hard",
        },
      ],
      44: [
        {
          id: "lorde_existencia_44",
          name: "Lorde da Existência",
          level: 44,
          stats: {
            strength: 600,
            agility: 110,
            defense: 130,
            health: 6000,
            max_health: 6000,
          },
          xp_reward: 2100000,
          gold_reward: 420000,
          difficulty: "hard",
        },
      ],
      45: [
        {
          id: "entidade_primordial_suprema_45",
          name: "Entidade Primordial Suprema",
          level: 45,
          stats: {
            strength: 650,
            agility: 125,
            defense: 125,
            health: 6500,
            max_health: 6500,
          },
          xp_reward: 2500000,
          gold_reward: 500000,
          difficulty: "hard",
        },
      ],
      // Níveis 46-50: Inimigos Lendários Finais
      46: [
        {
          id: "deus_omnipotencia_46",
          name: "Deus da Omnipotência",
          level: 46,
          stats: {
            strength: 750,
            agility: 135,
            defense: 140,
            health: 7500,
            max_health: 7500,
          },
          xp_reward: 3500000,
          gold_reward: 700000,
          difficulty: "hard",
        },
      ],
      47: [
        {
          id: "dragao_eternidade_47",
          name: "Dragão da Eternidade",
          level: 47,
          stats: {
            strength: 850,
            agility: 140,
            defense: 145,
            health: 8500,
            max_health: 8500,
          },
          xp_reward: 4500000,
          gold_reward: 900000,
          difficulty: "hard",
        },
      ],
      48: [
        {
          id: "ser_absoluto_supremo_48",
          name: "Ser Absoluto Supremo",
          level: 48,
          stats: {
            strength: 950,
            agility: 145,
            defense: 140,
            health: 9500,
            max_health: 9500,
          },
          xp_reward: 5500000,
          gold_reward: 1100000,
          difficulty: "hard",
        },
      ],
      49: [
        {
          id: "lorde_transcendencia_49",
          name: "Lorde da Transcendência",
          level: 49,
          stats: {
            strength: 1050,
            agility: 135,
            defense: 155,
            health: 10500,
            max_health: 10500,
          },
          xp_reward: 6500000,
          gold_reward: 1300000,
          difficulty: "hard",
        },
      ],
      50: [
        {
          id: "entidade_criacao_final_50",
          name: "Entidade da Criação Final",
          level: 50,
          stats: {
            strength: 1200,
            agility: 150,
            defense: 150,
            health: 12000,
            max_health: 12000,
          },
          xp_reward: 10000000,
          gold_reward: 2000000,
          difficulty: "hard",
        },
      ],
    };

    // Retornar NPCs disponíveis para o nível do personagem
    const availableNpcs: NPC[] = [];

    // Adicionar NPCs do nível atual e alguns níveis abaixo
    for (
      let level = Math.max(1, characterLevel - 2);
      level <= characterLevel + 2;
      level++
    ) {
      if (npcsByLevel[level]) {
        availableNpcs.push(...npcsByLevel[level]);
      }
    }

    const response: ApiResponse<NPC[]> = {
      success: true,
      data: availableNpcs,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
