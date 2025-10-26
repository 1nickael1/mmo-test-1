import type { ApiResponse } from "../../../types";

interface Mission {
  id: string;
  title: string;
  description: string;
  type: "battle" | "resources" | "level" | "skills";
  target: string;
  target_value: number;
  current_value: number;
  level_required: number;
  rewards: {
    xp: number;
    gold: number;
    materials?: number;
    crystals?: number;
  };
  completed: boolean;
}

export default defineEventHandler(async (event) => {
    const db = getDatabase();
  try {
    const query = getQuery(event);
    const characterLevel = parseInt(query.level as string) || 1;
    const characterClass = query.class as string;

    // Definir missões por nível (1-50)
    const missionsByLevel: Record<number, Mission[]> = {
      // Níveis 1-5: Missões básicas
      1: [
        {
          id: "first_battle",
          title: "Primeira Batalha",
          description: "Derrote seu primeiro inimigo para ganhar experiência",
          type: "battle",
          target: "Bandido Espacial",
          target_value: 1,
          current_value: 0,
          level_required: 1,
          rewards: { xp: 200, gold: 50 },
          completed: false,
        },
        {
          id: "reach_level_2",
          title: "Crescimento Inicial",
          description: "Alcance o nível 2 para desbloquear novas habilidades",
          type: "level",
          target: "Nível",
          target_value: 2,
          current_value: 1,
          level_required: 1,
          rewards: { xp: 100, gold: 25 },
          completed: false,
        },
      ],
      2: [
        {
          id: "defeat_pirates",
          title: "Piratas Espaciais",
          description: "Derrote 3 Piratas Espaciais para limpar a área",
          type: "battle",
          target: "Pirata Espacial",
          target_value: 3,
          current_value: 0,
          level_required: 2,
          rewards: { xp: 400, gold: 100 },
          completed: false,
        },
      ],
      3: [
        {
          id: "learn_fire_jutsu",
          title: "Domínio do Fogo",
          description: "Aprenda a técnica de fogo básica",
          type: "skills",
          target: "Fire Jutsu",
          target_value: 1,
          current_value: 0,
          level_required: 3,
          rewards: { xp: 300, gold: 75 },
          completed: false,
        },
      ],
      4: [
        {
          id: "collect_materials",
          title: "Coleta de Materiais",
          description: "Colete 10 materiais através de batalhas",
          type: "resources",
          target: "Materiais",
          target_value: 10,
          current_value: 0,
          level_required: 4,
          rewards: { xp: 500, gold: 125, materials: 5 },
          completed: false,
        },
      ],
      5: [
        {
          id: "defeat_ninja_renegade",
          title: "Ninja Renegado",
          description: "Derrote o Ninja Renegado para provar sua força",
          type: "battle",
          target: "Ninja Renegado",
          target_value: 1,
          current_value: 0,
          level_required: 5,
          rewards: { xp: 600, gold: 150 },
          completed: false,
        },
      ],
      // Níveis 6-10: Missões intermediárias
      6: [
        {
          id: "lorde_sombras",
          title: "Lorde das Sombras",
          description: "Enfrente o temível Lorde das Sombras",
          type: "battle",
          target: "Lorde das Sombras",
          target_value: 1,
          current_value: 0,
          level_required: 6,
          rewards: { xp: 800, gold: 200 },
          completed: false,
        },
      ],
      7: [
        {
          id: "imperador_espacial",
          title: "Imperador Espacial",
          description: "Derrote o Imperador Espacial e liberte a galáxia",
          type: "battle",
          target: "Imperador Espacial",
          target_value: 1,
          current_value: 0,
          level_required: 7,
          rewards: { xp: 1000, gold: 250 },
          completed: false,
        },
      ],
      8: [
        {
          id: "dragao_espacial",
          title: "Dragão Espacial",
          description: "Enfrente o lendário Dragão Espacial",
          type: "battle",
          target: "Dragão Espacial",
          target_value: 1,
          current_value: 0,
          level_required: 8,
          rewards: { xp: 1200, gold: 300 },
          completed: false,
        },
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
          completed: false,
        },
      ],
      10: [
        {
          id: "general_imperial",
          title: "General Imperial",
          description: "Derrote o General Imperial em batalha épica",
          type: "battle",
          target: "General Imperial",
          target_value: 1,
          current_value: 0,
          level_required: 10,
          rewards: { xp: 1600, gold: 400 },
          completed: false,
        },
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
          rewards: { xp: 3000, gold: 750 },
          completed: false,
        },
      ],
      20: [
        {
          id: "entidade_cosmica",
          title: "Entidade Cósmica",
          description: "Derrote a temível Entidade Cósmica",
          type: "battle",
          target: "Entidade Cósmica",
          target_value: 1,
          current_value: 0,
          level_required: 20,
          rewards: { xp: 5000, gold: 1250 },
          completed: false,
        },
      ],
      // Níveis 21-30: Missões épicas
      25: [
        {
          id: "deus_destruicao",
          title: "Deus da Destruição",
          description: "Enfrente o Deus da Destruição em batalha lendária",
          type: "battle",
          target: "Deus da Destruição",
          target_value: 1,
          current_value: 0,
          level_required: 25,
          rewards: { xp: 10000, gold: 2500 },
          completed: false,
        },
      ],
      30: [
        {
          id: "entidade_primordial",
          title: "Entidade Primordial",
          description:
            "Derrote a Entidade Primordial e alcance a transcendência",
          type: "battle",
          target: "Entidade Primordial",
          target_value: 1,
          current_value: 0,
          level_required: 30,
          rewards: { xp: 20000, gold: 5000 },
          completed: false,
        },
      ],
      // Níveis 31-40: Missões lendárias
      35: [
        {
          id: "entidade_cosmica_suprema",
          title: "Entidade Cósmica Suprema",
          description: "Enfrente a Entidade Cósmica Suprema",
          type: "battle",
          target: "Entidade Cósmica Suprema",
          target_value: 1,
          current_value: 0,
          level_required: 35,
          rewards: { xp: 50000, gold: 12500 },
          completed: false,
        },
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
          rewards: { xp: 100000, gold: 25000 },
          completed: false,
        },
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
          rewards: { xp: 200000, gold: 50000 },
          completed: false,
        },
      ],
      50: [
        {
          id: "entidade_criacao_final",
          title: "Entidade da Criação Final",
          description:
            "Derrote a Entidade da Criação Final e alcance a onipotência",
          type: "battle",
          target: "Entidade da Criação Final",
          target_value: 1,
          current_value: 0,
          level_required: 50,
          rewards: { xp: 500000, gold: 100000 },
          completed: false,
        },
      ],
    };

    // Retornar missões disponíveis para o nível do personagem
    const availableMissions: Mission[] = [];

    // Adicionar missões do nível atual e alguns níveis abaixo
    for (let level = 1; level <= characterLevel; level++) {
      if (missionsByLevel[level]) {
        availableMissions.push(...missionsByLevel[level]);
      }
    }

    const response: ApiResponse<Mission[]> = {
      success: true,
      data: availableMissions,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
