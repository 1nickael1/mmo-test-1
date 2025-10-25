import type { ApiResponse, ShopItem } from "../../../types";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const characterLevel = parseInt(query.level as string) || 1;

    // Definir itens da loja por nível (1-50)
    const itemsByLevel: Record<number, ShopItem[]> = {
      // Níveis 1-10: Itens básicos
      1: [
        {
          id: "pocao_vida_basica",
          name: "Poção de Vida Básica",
          type: "potion",
          price: 25,
          level_required: 1,
          description: "Restaura 50 pontos de vida",
          category: "Consumíveis",
        },
        {
          id: "espada_basica",
          name: "Espada Básica",
          type: "equipment",
          price: 100,
          level_required: 1,
          stats: { strength: 5, damage: 10 },
          description: "Espada simples para iniciantes",
          category: "Armas",
        },
      ],
      2: [
        {
          id: "armadura_basica",
          name: "Armadura Básica",
          type: "equipment",
          price: 150,
          level_required: 2,
          stats: { defense: 8, health: 20 },
          description: "Armadura simples de proteção",
          category: "Armaduras",
        },
      ],
      3: [
        {
          id: "pocao_vida_media",
          name: "Poção de Vida Média",
          type: "potion",
          price: 75,
          level_required: 3,
          description: "Restaura 100 pontos de vida",
          category: "Consumíveis",
        },
      ],
      4: [
        {
          id: "espada_ferro",
          name: "Espada de Ferro",
          type: "equipment",
          price: 300,
          level_required: 4,
          stats: { strength: 8, damage: 15 },
          description: "Espada de ferro mais resistente",
          category: "Armas",
        },
      ],
      5: [
        {
          id: "armadura_ferro",
          name: "Armadura de Ferro",
          type: "equipment",
          price: 400,
          level_required: 5,
          stats: { defense: 12, health: 30 },
          description: "Armadura de ferro resistente",
          category: "Armaduras",
        },
      ],
      // Níveis 6-10: Itens intermediários
      6: [
        {
          id: "pocao_vida_avancada",
          name: "Poção de Vida Avançada",
          type: "potion",
          price: 150,
          level_required: 6,
          description: "Restaura 200 pontos de vida",
          category: "Consumíveis",
        },
      ],
      7: [
        {
          id: "espada_aco",
          name: "Espada de Aço",
          type: "equipment",
          price: 600,
          level_required: 7,
          stats: { strength: 12, damage: 20 },
          description: "Espada de aço afiada",
          category: "Armas",
        },
      ],
      8: [
        {
          id: "armadura_aco",
          name: "Armadura de Aço",
          type: "equipment",
          price: 800,
          level_required: 8,
          stats: { defense: 18, health: 50 },
          description: "Armadura de aço resistente",
          category: "Armaduras",
        },
      ],
      9: [
        {
          id: "anel_forca",
          name: "Anel de Força",
          type: "equipment",
          price: 1000,
          level_required: 9,
          stats: { strength: 15 },
          description: "Anel que aumenta a força",
          category: "Acessórios",
        },
      ],
      10: [
        {
          id: "botas_velocidade",
          name: "Botas de Velocidade",
          type: "equipment",
          price: 1200,
          level_required: 10,
          stats: { agility: 15 },
          description: "Botas que aumentam a agilidade",
          category: "Acessórios",
        },
      ],
      // Níveis 11-20: Itens avançados
      15: [
        {
          id: "espada_magica",
          name: "Espada Mágica",
          type: "equipment",
          price: 5000,
          level_required: 15,
          stats: { strength: 20, damage: 35 },
          description: "Espada imbuída com magia",
          category: "Armas",
        },
      ],
      20: [
        {
          id: "armadura_magica",
          name: "Armadura Mágica",
          type: "equipment",
          price: 8000,
          level_required: 20,
          stats: { defense: 30, health: 100 },
          description: "Armadura protegida por magia",
          category: "Armaduras",
        },
      ],
      // Níveis 21-30: Itens épicos
      25: [
        {
          id: "espada_epica",
          name: "Espada Épica",
          type: "equipment",
          price: 25000,
          level_required: 25,
          stats: { strength: 35, damage: 60 },
          description: "Espada de poder épico",
          category: "Armas",
        },
      ],
      30: [
        {
          id: "armadura_epica",
          name: "Armadura Épica",
          type: "equipment",
          price: 40000,
          level_required: 30,
          stats: { defense: 50, health: 200 },
          description: "Armadura de poder épico",
          category: "Armaduras",
        },
      ],
      // Níveis 31-40: Itens lendários
      35: [
        {
          id: "espada_lendaria",
          name: "Espada Lendária",
          type: "equipment",
          price: 100000,
          level_required: 35,
          stats: { strength: 60, damage: 100 },
          description: "Espada de poder lendário",
          category: "Armas",
        },
      ],
      40: [
        {
          id: "armadura_lendaria",
          name: "Armadura Lendária",
          type: "equipment",
          price: 150000,
          level_required: 40,
          stats: { defense: 80, health: 400 },
          description: "Armadura de poder lendário",
          category: "Armaduras",
        },
      ],
      // Níveis 41-50: Itens míticos
      45: [
        {
          id: "espada_mistica",
          name: "Espada Mística",
          type: "equipment",
          price: 500000,
          level_required: 45,
          stats: { strength: 100, damage: 200 },
          description: "Espada de poder místico",
          category: "Armas",
        },
      ],
      50: [
        {
          id: "armadura_mistica",
          name: "Armadura Mística",
          type: "equipment",
          price: 1000000,
          level_required: 50,
          stats: { defense: 150, health: 800 },
          description: "Armadura de poder místico supremo",
          category: "Armaduras",
        },
      ],
    };

    // Retornar itens disponíveis para o nível do personagem
    const availableItems: ShopItem[] = [];

    // Adicionar itens do nível atual e alguns níveis abaixo
    for (let level = 1; level <= characterLevel; level++) {
      if (itemsByLevel[level]) {
        const items = itemsByLevel[level].map((item) => ({
          ...item,
          can_buy: true, // Pode comprar itens do nível atual ou inferior
        }));
        availableItems.push(...items);
      }
    }

    // Adicionar alguns itens de níveis ligeiramente acima
    for (let level = characterLevel + 1; level <= characterLevel + 3; level++) {
      if (itemsByLevel[level]) {
        const items = itemsByLevel[level].map((item) => ({
          ...item,
          can_buy: false, // Não pode comprar ainda
        }));
        availableItems.push(...items);
      }
    }

    const response: ApiResponse<ShopItem[]> = {
      success: true,
      data: availableItems,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
