import { d as defineEventHandler, e as getQuery, c as createError } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const index_get = defineEventHandler(async (event) => {
  getDatabase();
  try {
    const query = getQuery(event);
    const characterLevel = parseInt(query.level) || 1;
    const characterClass = query.class;
    const missionsByLevel = {
      // Níveis 1-5: Missões básicas
      1: [
        {
          id: "first_battle",
          title: "Primeira Batalha",
          description: "Derrote seu primeiro inimigo para ganhar experi\xEAncia",
          type: "battle",
          target: "Bandido Espacial",
          target_value: 1,
          current_value: 0,
          level_required: 1,
          rewards: { xp: 200, gold: 50 },
          completed: false
        },
        {
          id: "reach_level_2",
          title: "Crescimento Inicial",
          description: "Alcance o n\xEDvel 2 para desbloquear novas habilidades",
          type: "level",
          target: "N\xEDvel",
          target_value: 2,
          current_value: 1,
          level_required: 1,
          rewards: { xp: 100, gold: 25 },
          completed: false
        }
      ],
      2: [
        {
          id: "defeat_pirates",
          title: "Piratas Espaciais",
          description: "Derrote 3 Piratas Espaciais para limpar a \xE1rea",
          type: "battle",
          target: "Pirata Espacial",
          target_value: 3,
          current_value: 0,
          level_required: 2,
          rewards: { xp: 400, gold: 100 },
          completed: false
        }
      ],
      3: [
        {
          id: "learn_fire_jutsu",
          title: "Dom\xEDnio do Fogo",
          description: "Aprenda a t\xE9cnica de fogo b\xE1sica",
          type: "skills",
          target: "Fire Jutsu",
          target_value: 1,
          current_value: 0,
          level_required: 3,
          rewards: { xp: 300, gold: 75 },
          completed: false
        }
      ],
      4: [
        {
          id: "collect_materials",
          title: "Coleta de Materiais",
          description: "Colete 10 materiais atrav\xE9s de batalhas",
          type: "resources",
          target: "Materiais",
          target_value: 10,
          current_value: 0,
          level_required: 4,
          rewards: { xp: 500, gold: 125, materials: 5 },
          completed: false
        }
      ],
      5: [
        {
          id: "defeat_ninja_renegade",
          title: "Ninja Renegado",
          description: "Derrote o Ninja Renegado para provar sua for\xE7a",
          type: "battle",
          target: "Ninja Renegado",
          target_value: 1,
          current_value: 0,
          level_required: 5,
          rewards: { xp: 600, gold: 150 },
          completed: false
        }
      ],
      // Níveis 6-10: Missões intermediárias
      6: [
        {
          id: "lorde_sombras",
          title: "Lorde das Sombras",
          description: "Enfrente o tem\xEDvel Lorde das Sombras",
          type: "battle",
          target: "Lorde das Sombras",
          target_value: 1,
          current_value: 0,
          level_required: 6,
          rewards: { xp: 800, gold: 200 },
          completed: false
        }
      ],
      7: [
        {
          id: "imperador_espacial",
          title: "Imperador Espacial",
          description: "Derrote o Imperador Espacial e liberte a gal\xE1xia",
          type: "battle",
          target: "Imperador Espacial",
          target_value: 1,
          current_value: 0,
          level_required: 7,
          rewards: { xp: 1e3, gold: 250 },
          completed: false
        }
      ],
      8: [
        {
          id: "dragao_espacial",
          title: "Drag\xE3o Espacial",
          description: "Enfrente o lend\xE1rio Drag\xE3o Espacial",
          type: "battle",
          target: "Drag\xE3o Espacial",
          target_value: 1,
          current_value: 0,
          level_required: 8,
          rewards: { xp: 1200, gold: 300 },
          completed: false
        }
      ],
      9: [
        {
          id: "mestre_ninja",
          title: "Mestre Ninja",
          description: "Prove sua habilidade contra um Mestre Ninja",
          type: "battle",
          target: "Mestre Ninja",
          target_value: 1,
          current_value: 0,
          level_required: 9,
          rewards: { xp: 1400, gold: 350 },
          completed: false
        }
      ],
      10: [
        {
          id: "general_imperial",
          title: "General Imperial",
          description: "Derrote o General Imperial em batalha \xE9pica",
          type: "battle",
          target: "General Imperial",
          target_value: 1,
          current_value: 0,
          level_required: 10,
          rewards: { xp: 1600, gold: 400 },
          completed: false
        }
      ],
      // Níveis 11-20: Missões avançadas
      15: [
        {
          id: "imperador_sombras",
          title: "Imperador das Sombras",
          description: "Enfrente o poderoso Imperador das Sombras",
          type: "battle",
          target: "Imperador das Sombras",
          target_value: 1,
          current_value: 0,
          level_required: 15,
          rewards: { xp: 3e3, gold: 750 },
          completed: false
        }
      ],
      20: [
        {
          id: "entidade_cosmica",
          title: "Entidade C\xF3smica",
          description: "Derrote a tem\xEDvel Entidade C\xF3smica",
          type: "battle",
          target: "Entidade C\xF3smica",
          target_value: 1,
          current_value: 0,
          level_required: 20,
          rewards: { xp: 5e3, gold: 1250 },
          completed: false
        }
      ],
      // Níveis 21-30: Missões épicas
      25: [
        {
          id: "deus_destruicao",
          title: "Deus da Destrui\xE7\xE3o",
          description: "Enfrente o Deus da Destrui\xE7\xE3o em batalha lend\xE1ria",
          type: "battle",
          target: "Deus da Destrui\xE7\xE3o",
          target_value: 1,
          current_value: 0,
          level_required: 25,
          rewards: { xp: 1e4, gold: 2500 },
          completed: false
        }
      ],
      30: [
        {
          id: "entidade_primordial",
          title: "Entidade Primordial",
          description: "Derrote a Entidade Primordial e alcance a transcend\xEAncia",
          type: "battle",
          target: "Entidade Primordial",
          target_value: 1,
          current_value: 0,
          level_required: 30,
          rewards: { xp: 2e4, gold: 5e3 },
          completed: false
        }
      ],
      // Níveis 31-40: Missões lendárias
      35: [
        {
          id: "entidade_cosmica_suprema",
          title: "Entidade C\xF3smica Suprema",
          description: "Enfrente a Entidade C\xF3smica Suprema",
          type: "battle",
          target: "Entidade C\xF3smica Suprema",
          target_value: 1,
          current_value: 0,
          level_required: 35,
          rewards: { xp: 5e4, gold: 12500 },
          completed: false
        }
      ],
      40: [
        {
          id: "entidade_absoluta",
          title: "Entidade Absoluta",
          description: "Derrote a Entidade Absoluta e alcance o poder supremo",
          type: "battle",
          target: "Entidade Absoluta",
          target_value: 1,
          current_value: 0,
          level_required: 40,
          rewards: { xp: 1e5, gold: 25e3 },
          completed: false
        }
      ],
      // Níveis 41-50: Missões míticas
      45: [
        {
          id: "entidade_primordial_suprema",
          title: "Entidade Primordial Suprema",
          description: "Enfrente a Entidade Primordial Suprema",
          type: "battle",
          target: "Entidade Primordial Suprema",
          target_value: 1,
          current_value: 0,
          level_required: 45,
          rewards: { xp: 2e5, gold: 5e4 },
          completed: false
        }
      ],
      50: [
        {
          id: "entidade_criacao_final",
          title: "Entidade da Cria\xE7\xE3o Final",
          description: "Derrote a Entidade da Cria\xE7\xE3o Final e alcance a onipot\xEAncia",
          type: "battle",
          target: "Entidade da Cria\xE7\xE3o Final",
          target_value: 1,
          current_value: 0,
          level_required: 50,
          rewards: { xp: 5e5, gold: 1e5 },
          completed: false
        }
      ]
    };
    const availableMissions = [];
    for (let level = 1; level <= characterLevel; level++) {
      if (missionsByLevel[level]) {
        availableMissions.push(...missionsByLevel[level]);
      }
    }
    const response = {
      success: true,
      data: availableMissions
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
