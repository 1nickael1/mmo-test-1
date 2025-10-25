import type { ApiResponse, Upgrade } from "../../../types";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const characterLevel = parseInt(query.level as string) || 1;

    // Definir melhorias por nível (1-50)
    const upgradesByLevel: Record<number, Upgrade[]> = {
      // Níveis 1-10: Melhorias básicas
      1: [
        {
          id: 1,
          character_id: 0, // Será preenchido dinamicamente
          upgrade_type: "stat",
          upgrade_name: "Treinamento de Força",
          level: 1,
          cost: { gold: 100, time_seconds: 30 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          character_id: 0,
          upgrade_type: "building",
          upgrade_name: "Armazém de Recursos",
          level: 1,
          cost: { gold: 150, time_seconds: 60 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ],
      2: [
        {
          id: 3,
          character_id: 0,
          upgrade_type: "stat",
          upgrade_name: "Treinamento de Agilidade",
          level: 1,
          cost: { gold: 200, time_seconds: 45 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ],
      3: [
        {
          id: 4,
          character_id: 0,
          upgrade_type: "building",
          upgrade_name: "Laboratório de Pesquisa",
          level: 1,
          cost: { gold: 300, time_seconds: 90 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ],
      4: [
        {
          id: 5,
          character_id: 0,
          upgrade_type: "stat",
          upgrade_name: "Treinamento de Defesa",
          level: 1,
          cost: { gold: 400, time_seconds: 60 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ],
      5: [
        {
          id: 6,
          character_id: 0,
          upgrade_type: "building",
          upgrade_name: "Oficina de Equipamentos",
          level: 1,
          cost: { gold: 500, time_seconds: 120 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ],
      // Níveis 6-10: Melhorias intermediárias
      6: [
        {
          id: 7,
          character_id: 0,
          upgrade_type: "training",
          upgrade_name: "Campo de Treinamento",
          level: 1,
          cost: { gold: 750, time_seconds: 180 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ],
      7: [
        {
          id: 8,
          character_id: 0,
          upgrade_type: "building",
          upgrade_name: "Câmara de Meditação",
          level: 1,
          cost: { gold: 1000, time_seconds: 240 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ],
      8: [
        {
          id: 9,
          character_id: 0,
          upgrade_type: "defense",
          upgrade_name: "Escudo de Energia",
          level: 1,
          cost: { gold: 1250, time_seconds: 300 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ],
      9: [
        {
          id: 10,
          character_id: 0,
          upgrade_type: "research",
          upgrade_name: "Pesquisa de Tecnologia",
          level: 1,
          cost: { gold: 1500, time_seconds: 360 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ],
      10: [
        {
          id: 11,
          character_id: 0,
          upgrade_type: "transport",
          upgrade_name: "Portal de Teletransporte",
          level: 1,
          cost: { gold: 2000, time_seconds: 480 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ],
      // Níveis 11-20: Melhorias avançadas
      15: [
        {
          id: 12,
          character_id: 0,
          upgrade_type: "building",
          upgrade_name: "Base Estelar",
          level: 1,
          cost: { gold: 5000, time_seconds: 1800 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ],
      20: [
        {
          id: 13,
          character_id: 0,
          upgrade_type: "research",
          upgrade_name: "Manipulador de Gravidade",
          level: 1,
          cost: { gold: 10000, time_seconds: 3600 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ],
      // Níveis 21-30: Melhorias épicas
      25: [
        {
          id: 14,
          character_id: 0,
          upgrade_type: "building",
          upgrade_name: "Portal do Multiverso",
          level: 1,
          cost: { gold: 25000, time_seconds: 7200 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ],
      30: [
        {
          id: 15,
          character_id: 0,
          upgrade_type: "research",
          upgrade_name: "Motor da Realidade",
          level: 1,
          cost: { gold: 50000, time_seconds: 14400 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ],
      // Níveis 31-40: Melhorias lendárias
      35: [
        {
          id: 16,
          character_id: 0,
          upgrade_type: "building",
          upgrade_name: "Protocolo de Gênese",
          level: 1,
          cost: { gold: 100000, time_seconds: 28800 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ],
      40: [
        {
          id: 17,
          character_id: 0,
          upgrade_type: "research",
          upgrade_name: "Domínio da Criação",
          level: 1,
          cost: { gold: 200000, time_seconds: 57600 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ],
      // Níveis 41-50: Melhorias míticas
      45: [
        {
          id: 18,
          character_id: 0,
          upgrade_type: "building",
          upgrade_name: "Entidade da Transcendência",
          level: 1,
          cost: { gold: 500000, time_seconds: 172800 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ],
      50: [
        {
          id: 19,
          character_id: 0,
          upgrade_type: "research",
          upgrade_name: "Onipotência Absoluta",
          level: 1,
          cost: { gold: 1000000, time_seconds: 345600 },
          is_completed: false,
          created_at: new Date().toISOString(),
        },
      ],
    };

    // Retornar melhorias disponíveis para o nível do personagem
    const availableUpgrades: any[] = [];

    // Adicionar melhorias do nível atual e alguns níveis abaixo
    for (let level = 1; level <= characterLevel; level++) {
      if (upgradesByLevel[level]) {
        const upgradesForLevel = upgradesByLevel[level];
        // Adicionar informações de validação para cada melhoria
        const upgradesWithValidation = upgradesForLevel.map((upgrade) => ({
          ...upgrade,
          id: upgrade.id.toString(),
          name: upgrade.upgrade_name,
          type: upgrade.upgrade_type,
          description: `Melhoria de ${upgrade.upgrade_name}`,
          current_level: 0,
          max_level: 10,
          current_cost: upgrade.cost,
          can_afford: true, // Será verificado no frontend com recursos
          can_upgrade: characterLevel >= level,
          time_seconds: upgrade.cost.time_seconds,
          time_remaining: 0,
        }));
        availableUpgrades.push(...upgradesWithValidation);
      }
    }

    const response: ApiResponse<Upgrade[]> = {
      success: true,
      data: availableUpgrades,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
