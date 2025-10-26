import { d as defineEventHandler, e as getQuery, c as createError } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const opponents_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const characterLevel = parseInt(query.level) || 1;
    const characterClass = query.class || "ninja";
    const npcsByLevel = {
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
            max_health: 50
          },
          xp_reward: 100,
          gold_reward: 25,
          difficulty: "easy"
        }
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
            max_health: 70
          },
          xp_reward: 150,
          gold_reward: 40,
          difficulty: "easy"
        }
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
            max_health: 90
          },
          xp_reward: 200,
          gold_reward: 60,
          difficulty: "easy"
        }
      ],
      4: [
        {
          id: "alienigena_hostil_4",
          name: "Alien\xEDgena Hostil",
          level: 4,
          stats: {
            strength: 11,
            agility: 10,
            defense: 6,
            health: 110,
            max_health: 110
          },
          xp_reward: 250,
          gold_reward: 80,
          difficulty: "easy"
        }
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
            max_health: 130
          },
          xp_reward: 300,
          gold_reward: 100,
          difficulty: "easy"
        }
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
            max_health: 150
          },
          xp_reward: 400,
          gold_reward: 120,
          difficulty: "medium"
        }
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
            max_health: 170
          },
          xp_reward: 500,
          gold_reward: 150,
          difficulty: "medium"
        }
      ],
      8: [
        {
          id: "dragao_espacial_8",
          name: "Drag\xE3o Espacial",
          level: 8,
          stats: {
            strength: 20,
            agility: 15,
            defense: 14,
            health: 200,
            max_health: 200
          },
          xp_reward: 600,
          gold_reward: 180,
          difficulty: "medium"
        }
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
            max_health: 220
          },
          xp_reward: 700,
          gold_reward: 210,
          difficulty: "medium"
        }
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
            max_health: 250
          },
          xp_reward: 800,
          gold_reward: 250,
          difficulty: "medium"
        }
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
            max_health: 280
          },
          xp_reward: 1e3,
          gold_reward: 300,
          difficulty: "hard"
        }
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
            max_health: 300
          },
          xp_reward: 1200,
          gold_reward: 350,
          difficulty: "hard"
        }
      ],
      13: [
        {
          id: "fenix_cosmica_13",
          name: "F\xEAnix C\xF3smica",
          level: 13,
          stats: {
            strength: 33,
            agility: 25,
            defense: 20,
            health: 330,
            max_health: 330
          },
          xp_reward: 1400,
          gold_reward: 400,
          difficulty: "hard"
        }
      ],
      14: [
        {
          id: "tita_espacial_14",
          name: "Tit\xE3 Espacial",
          level: 14,
          stats: {
            strength: 36,
            agility: 15,
            defense: 28,
            health: 360,
            max_health: 360
          },
          xp_reward: 1600,
          gold_reward: 450,
          difficulty: "hard"
        }
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
            max_health: 400
          },
          xp_reward: 1800,
          gold_reward: 500,
          difficulty: "hard"
        }
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
            max_health: 450
          },
          xp_reward: 2500,
          gold_reward: 600,
          difficulty: "hard"
        }
      ],
      17: [
        {
          id: "dragao_primordial_17",
          name: "Drag\xE3o Primordial",
          level: 17,
          stats: {
            strength: 50,
            agility: 28,
            defense: 32,
            health: 500,
            max_health: 500
          },
          xp_reward: 3e3,
          gold_reward: 700,
          difficulty: "hard"
        }
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
            max_health: 550
          },
          xp_reward: 3500,
          gold_reward: 800,
          difficulty: "hard"
        }
      ],
      19: [
        {
          id: "rei_demonios_19",
          name: "Rei dos Dem\xF4nios",
          level: 19,
          stats: {
            strength: 60,
            agility: 25,
            defense: 35,
            health: 600,
            max_health: 600
          },
          xp_reward: 4e3,
          gold_reward: 900,
          difficulty: "hard"
        }
      ],
      20: [
        {
          id: "entidade_cosmica_20",
          name: "Entidade C\xF3smica",
          level: 20,
          stats: {
            strength: 65,
            agility: 35,
            defense: 30,
            health: 650,
            max_health: 650
          },
          xp_reward: 5e3,
          gold_reward: 1e3,
          difficulty: "hard"
        }
      ],
      // Níveis 21-25: Inimigos Lendários
      21: [
        {
          id: "dragao_criacao_21",
          name: "Drag\xE3o da Cria\xE7\xE3o",
          level: 21,
          stats: {
            strength: 75,
            agility: 40,
            defense: 40,
            health: 750,
            max_health: 750
          },
          xp_reward: 7500,
          gold_reward: 1500,
          difficulty: "hard"
        }
      ],
      22: [
        {
          id: "anjo_caido_22",
          name: "Anjo Ca\xEDdo",
          level: 22,
          stats: {
            strength: 80,
            agility: 45,
            defense: 35,
            health: 800,
            max_health: 800
          },
          xp_reward: 9e3,
          gold_reward: 1800,
          difficulty: "hard"
        }
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
            max_health: 850
          },
          xp_reward: 11e3,
          gold_reward: 2200,
          difficulty: "hard"
        }
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
            max_health: 900
          },
          xp_reward: 13e3,
          gold_reward: 2600,
          difficulty: "hard"
        }
      ],
      25: [
        {
          id: "deus_destruicao_25",
          name: "Deus da Destrui\xE7\xE3o",
          level: 25,
          stats: {
            strength: 100,
            agility: 40,
            defense: 50,
            health: 1e3,
            max_health: 1e3
          },
          xp_reward: 15e3,
          gold_reward: 3e3,
          difficulty: "hard"
        }
      ],
      // Níveis 26-30: Inimigos Míticos
      26: [
        {
          id: "serpente_cosmica_26",
          name: "Serpente C\xF3smica",
          level: 26,
          stats: {
            strength: 110,
            agility: 50,
            defense: 45,
            health: 1100,
            max_health: 1100
          },
          xp_reward: 2e4,
          gold_reward: 4e3,
          difficulty: "hard"
        }
      ],
      27: [
        {
          id: "tita_caos_27",
          name: "Tit\xE3 do Caos",
          level: 27,
          stats: {
            strength: 120,
            agility: 35,
            defense: 60,
            health: 1200,
            max_health: 1200
          },
          xp_reward: 25e3,
          gold_reward: 5e3,
          difficulty: "hard"
        }
      ],
      28: [
        {
          id: "dragao_vazio_28",
          name: "Drag\xE3o do Vazio",
          level: 28,
          stats: {
            strength: 130,
            agility: 45,
            defense: 55,
            health: 1300,
            max_health: 1300
          },
          xp_reward: 3e4,
          gold_reward: 6e3,
          difficulty: "hard"
        }
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
            max_health: 1400
          },
          xp_reward: 35e3,
          gold_reward: 7e3,
          difficulty: "hard"
        }
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
            max_health: 1500
          },
          xp_reward: 5e4,
          gold_reward: 1e4,
          difficulty: "hard"
        }
      ],
      // Níveis 31-35: Inimigos Divinos
      31: [
        {
          id: "deus_criacao_31",
          name: "Deus da Cria\xE7\xE3o",
          level: 31,
          stats: {
            strength: 170,
            agility: 60,
            defense: 65,
            health: 1700,
            max_health: 1700
          },
          xp_reward: 75e3,
          gold_reward: 15e3,
          difficulty: "hard"
        }
      ],
      32: [
        {
          id: "dragao_infinito_32",
          name: "Drag\xE3o Infinito",
          level: 32,
          stats: {
            strength: 190,
            agility: 65,
            defense: 70,
            health: 1900,
            max_health: 1900
          },
          xp_reward: 1e5,
          gold_reward: 2e4,
          difficulty: "hard"
        }
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
            max_health: 2100
          },
          xp_reward: 125e3,
          gold_reward: 25e3,
          difficulty: "hard"
        }
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
            max_health: 2300
          },
          xp_reward: 15e4,
          gold_reward: 3e4,
          difficulty: "hard"
        }
      ],
      35: [
        {
          id: "entidade_cosmica_suprema_35",
          name: "Entidade C\xF3smica Suprema",
          level: 35,
          stats: {
            strength: 250,
            agility: 80,
            defense: 80,
            health: 2500,
            max_health: 2500
          },
          xp_reward: 2e5,
          gold_reward: 4e4,
          difficulty: "hard"
        }
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
            max_health: 2800
          },
          xp_reward: 3e5,
          gold_reward: 6e4,
          difficulty: "hard"
        }
      ],
      37: [
        {
          id: "dragao_primordial_supremo_37",
          name: "Drag\xE3o Primordial Supremo",
          level: 37,
          stats: {
            strength: 310,
            agility: 90,
            defense: 95,
            health: 3100,
            max_health: 3100
          },
          xp_reward: 4e5,
          gold_reward: 8e4,
          difficulty: "hard"
        }
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
            max_health: 3400
          },
          xp_reward: 5e5,
          gold_reward: 1e5,
          difficulty: "hard"
        }
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
            max_health: 3700
          },
          xp_reward: 6e5,
          gold_reward: 12e4,
          difficulty: "hard"
        }
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
            health: 4e3,
            max_health: 4e3
          },
          xp_reward: 8e5,
          gold_reward: 16e4,
          difficulty: "hard"
        }
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
            max_health: 4500
          },
          xp_reward: 12e5,
          gold_reward: 24e4,
          difficulty: "hard"
        }
      ],
      42: [
        {
          id: "dragao_criacao_supremo_42",
          name: "Drag\xE3o da Cria\xE7\xE3o Supremo",
          level: 42,
          stats: {
            strength: 500,
            agility: 115,
            defense: 120,
            health: 5e3,
            max_health: 5e3
          },
          xp_reward: 15e5,
          gold_reward: 3e5,
          difficulty: "hard"
        }
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
            max_health: 5500
          },
          xp_reward: 18e5,
          gold_reward: 36e4,
          difficulty: "hard"
        }
      ],
      44: [
        {
          id: "lorde_existencia_44",
          name: "Lorde da Exist\xEAncia",
          level: 44,
          stats: {
            strength: 600,
            agility: 110,
            defense: 130,
            health: 6e3,
            max_health: 6e3
          },
          xp_reward: 21e5,
          gold_reward: 42e4,
          difficulty: "hard"
        }
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
            max_health: 6500
          },
          xp_reward: 25e5,
          gold_reward: 5e5,
          difficulty: "hard"
        }
      ],
      // Níveis 46-50: Inimigos Lendários Finais
      46: [
        {
          id: "deus_omnipotencia_46",
          name: "Deus da Omnipot\xEAncia",
          level: 46,
          stats: {
            strength: 750,
            agility: 135,
            defense: 140,
            health: 7500,
            max_health: 7500
          },
          xp_reward: 35e5,
          gold_reward: 7e5,
          difficulty: "hard"
        }
      ],
      47: [
        {
          id: "dragao_eternidade_47",
          name: "Drag\xE3o da Eternidade",
          level: 47,
          stats: {
            strength: 850,
            agility: 140,
            defense: 145,
            health: 8500,
            max_health: 8500
          },
          xp_reward: 45e5,
          gold_reward: 9e5,
          difficulty: "hard"
        }
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
            max_health: 9500
          },
          xp_reward: 55e5,
          gold_reward: 11e5,
          difficulty: "hard"
        }
      ],
      49: [
        {
          id: "lorde_transcendencia_49",
          name: "Lorde da Transcend\xEAncia",
          level: 49,
          stats: {
            strength: 1050,
            agility: 135,
            defense: 155,
            health: 10500,
            max_health: 10500
          },
          xp_reward: 65e5,
          gold_reward: 13e5,
          difficulty: "hard"
        }
      ],
      50: [
        {
          id: "entidade_criacao_final_50",
          name: "Entidade da Cria\xE7\xE3o Final",
          level: 50,
          stats: {
            strength: 1200,
            agility: 150,
            defense: 150,
            health: 12e3,
            max_health: 12e3
          },
          xp_reward: 1e7,
          gold_reward: 2e6,
          difficulty: "hard"
        }
      ]
    };
    const getClassSpecificOpponents = (level, characterClass2) => {
      var _a;
      const classOpponents = {
        ninja: {
          1: [
            {
              id: "ninja_trainee_1",
              name: "Ninja Aprendiz",
              level: 1,
              stats: {
                strength: 6,
                agility: 8,
                defense: 4,
                health: 45,
                max_health: 45
              },
              xp_reward: 120,
              gold_reward: 30,
              difficulty: "easy"
            }
          ],
          3: [
            {
              id: "ninja_assassin_3",
              name: "Ninja Assassino",
              level: 3,
              stats: {
                strength: 10,
                agility: 12,
                defense: 6,
                health: 85,
                max_health: 85
              },
              xp_reward: 220,
              gold_reward: 70,
              difficulty: "easy"
            }
          ],
          5: [
            {
              id: "ninja_master_5",
              name: "Mestre Ninja",
              level: 5,
              stats: {
                strength: 14,
                agility: 16,
                defense: 8,
                health: 125,
                max_health: 125
              },
              xp_reward: 350,
              gold_reward: 120,
              difficulty: "medium"
            }
          ]
        },
        guerreiro_espacial: {
          1: [
            {
              id: "space_marine_1",
              name: "Marine Espacial",
              level: 1,
              stats: {
                strength: 8,
                agility: 5,
                defense: 7,
                health: 60,
                max_health: 60
              },
              xp_reward: 110,
              gold_reward: 28,
              difficulty: "easy"
            }
          ],
          3: [
            {
              id: "space_commando_3",
              name: "Comando Espacial",
              level: 3,
              stats: {
                strength: 12,
                agility: 8,
                defense: 10,
                health: 95,
                max_health: 95
              },
              xp_reward: 210,
              gold_reward: 65,
              difficulty: "easy"
            }
          ],
          5: [
            {
              id: "space_captain_5",
              name: "Capit\xE3o Espacial",
              level: 5,
              stats: {
                strength: 16,
                agility: 10,
                defense: 14,
                health: 140,
                max_health: 140
              },
              xp_reward: 320,
              gold_reward: 110,
              difficulty: "medium"
            }
          ]
        },
        mago_elemental: {
          1: [
            {
              id: "apprentice_mage_1",
              name: "Aprendiz Mago",
              level: 1,
              stats: {
                strength: 4,
                agility: 6,
                defense: 5,
                health: 40,
                max_health: 40
              },
              xp_reward: 130,
              gold_reward: 32,
              difficulty: "easy"
            }
          ],
          3: [
            {
              id: "elemental_mage_3",
              name: "Mago Elemental",
              level: 3,
              stats: {
                strength: 7,
                agility: 9,
                defense: 7,
                health: 80,
                max_health: 80
              },
              xp_reward: 230,
              gold_reward: 75,
              difficulty: "easy"
            }
          ],
          5: [
            {
              id: "archmage_5",
              name: "Arquimago",
              level: 5,
              stats: {
                strength: 10,
                agility: 12,
                defense: 9,
                health: 120,
                max_health: 120
              },
              xp_reward: 380,
              gold_reward: 130,
              difficulty: "medium"
            }
          ]
        },
        arqueiro_elfo: {
          1: [
            {
              id: "elf_scout_1",
              name: "Batedor \xC9lfico",
              level: 1,
              stats: {
                strength: 5,
                agility: 9,
                defense: 4,
                health: 42,
                max_health: 42
              },
              xp_reward: 125,
              gold_reward: 30,
              difficulty: "easy"
            }
          ],
          3: [
            {
              id: "elf_ranger_3",
              name: "Patrulheiro \xC9lfico",
              level: 3,
              stats: {
                strength: 8,
                agility: 13,
                defense: 6,
                health: 82,
                max_health: 82
              },
              xp_reward: 225,
              gold_reward: 70,
              difficulty: "easy"
            }
          ],
          5: [
            {
              id: "elf_archer_master_5",
              name: "Mestre Arqueiro \xC9lfico",
              level: 5,
              stats: {
                strength: 11,
                agility: 17,
                defense: 8,
                health: 122,
                max_health: 122
              },
              xp_reward: 370,
              gold_reward: 125,
              difficulty: "medium"
            }
          ]
        },
        paladino_sagrado: {
          1: [
            {
              id: "holy_warrior_1",
              name: "Guerreiro Sagrado",
              level: 1,
              stats: {
                strength: 7,
                agility: 5,
                defense: 8,
                health: 55,
                max_health: 55
              },
              xp_reward: 115,
              gold_reward: 28,
              difficulty: "easy"
            }
          ],
          3: [
            {
              id: "templar_3",
              name: "Templ\xE1rio",
              level: 3,
              stats: {
                strength: 11,
                agility: 7,
                defense: 12,
                health: 90,
                max_health: 90
              },
              xp_reward: 215,
              gold_reward: 68,
              difficulty: "easy"
            }
          ],
          5: [
            {
              id: "paladin_5",
              name: "Paladino",
              level: 5,
              stats: {
                strength: 15,
                agility: 9,
                defense: 16,
                health: 135,
                max_health: 135
              },
              xp_reward: 340,
              gold_reward: 115,
              difficulty: "medium"
            }
          ]
        },
        ladrao_sombrio: {
          1: [
            {
              id: "thief_1",
              name: "Ladr\xE3o",
              level: 1,
              stats: {
                strength: 5,
                agility: 10,
                defense: 3,
                health: 38,
                max_health: 38
              },
              xp_reward: 120,
              gold_reward: 35,
              difficulty: "easy"
            }
          ],
          3: [
            {
              id: "rogue_3",
              name: "Ladino",
              level: 3,
              stats: {
                strength: 8,
                agility: 14,
                defense: 5,
                health: 78,
                max_health: 78
              },
              xp_reward: 220,
              gold_reward: 80,
              difficulty: "easy"
            }
          ],
          5: [
            {
              id: "assassin_5",
              name: "Assassino",
              level: 5,
              stats: {
                strength: 11,
                agility: 18,
                defense: 7,
                health: 118,
                max_health: 118
              },
              xp_reward: 360,
              gold_reward: 140,
              difficulty: "medium"
            }
          ]
        }
      };
      return ((_a = classOpponents[characterClass2]) == null ? void 0 : _a[level]) || [];
    };
    const availableNpcs = [];
    for (let level = Math.max(1, characterLevel - 2); level <= characterLevel + 2; level++) {
      if (npcsByLevel[level]) {
        availableNpcs.push(...npcsByLevel[level]);
      }
      const classOpponents = getClassSpecificOpponents(level, characterClass);
      availableNpcs.push(...classOpponents);
    }
    const response = {
      success: true,
      data: availableNpcs
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { opponents_get as default };
//# sourceMappingURL=opponents.get.mjs.map
