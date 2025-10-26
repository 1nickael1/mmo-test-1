import type { ShopItem } from "../../types";
import { getClassItemsExpanded } from "./classItems";

// Itens base (disponíveis para todas as classes)
export const getBaseItems = (level: number): ShopItem[] => {
  const baseItemsByLevel: Record<number, ShopItem[]> = {
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
    // Níveis 11-20: Itens avançados
    11: [
      {
        id: "pocao_vida_superior",
        name: "Poção de Vida Superior",
        type: "potion",
        price: 300,
        level_required: 11,
        description: "Restaura 300 pontos de vida",
        category: "Consumíveis",
      },
    ],
    12: [
      {
        id: "espada_avancada",
        name: "Espada Avançada",
        type: "equipment",
        price: 1500,
        level_required: 12,
        stats: { strength: 18, damage: 25 },
        description: "Espada de tecnologia avançada",
        category: "Armas",
      },
    ],
    13: [
      {
        id: "armadura_avancada",
        name: "Armadura Avançada",
        type: "equipment",
        price: 2000,
        level_required: 13,
        stats: { defense: 25, health: 80 },
        description: "Armadura com tecnologia avançada",
        category: "Armaduras",
      },
    ],
    14: [
      {
        id: "anel_poder",
        name: "Anel de Poder",
        type: "equipment",
        price: 2500,
        level_required: 14,
        stats: { strength: 20, magic_power: 15 },
        description: "Anel que aumenta poder físico e mágico",
        category: "Acessórios",
      },
    ],
    16: [
      {
        id: "armadura_magica",
        name: "Armadura Mágica",
        type: "equipment",
        price: 6000,
        level_required: 16,
        stats: { defense: 35, health: 120 },
        description: "Armadura protegida por magia",
        category: "Armaduras",
      },
    ],
    17: [
      {
        id: "botas_magicas",
        name: "Botas Mágicas",
        type: "equipment",
        price: 3500,
        level_required: 17,
        stats: { agility: 25, magic_power: 10 },
        description: "Botas que aumentam agilidade e poder mágico",
        category: "Acessórios",
      },
    ],
    18: [
      {
        id: "luvas_poder",
        name: "Luvas de Poder",
        type: "equipment",
        price: 4000,
        level_required: 18,
        stats: { strength: 25, damage: 15 },
        description: "Luvas que aumentam força e dano",
        category: "Acessórios",
      },
    ],
    19: [
      {
        id: "capacete_sabedoria",
        name: "Capacete da Sabedoria",
        type: "equipment",
        price: 4500,
        level_required: 19,
        stats: { intelligence: 30, magic_power: 20 },
        description: "Capacete que aumenta inteligência e poder mágico",
        category: "Acessórios",
      },
    ],
    // Níveis 21-30: Itens épicos
    21: [
      {
        id: "pocao_vida_epica",
        name: "Poção de Vida Épica",
        type: "potion",
        price: 800,
        level_required: 21,
        description: "Restaura 500 pontos de vida",
        category: "Consumíveis",
      },
    ],
    22: [
      {
        id: "espada_epica_inicial",
        name: "Espada Épica Inicial",
        type: "equipment",
        price: 12000,
        level_required: 22,
        stats: { strength: 30, damage: 45 },
        description: "Primeira espada de poder épico",
        category: "Armas",
      },
    ],
    23: [
      {
        id: "armadura_epica_inicial",
        name: "Armadura Épica Inicial",
        type: "equipment",
        price: 15000,
        level_required: 23,
        stats: { defense: 40, health: 150 },
        description: "Primeira armadura de poder épico",
        category: "Armaduras",
      },
    ],
    24: [
      {
        id: "anel_epico",
        name: "Anel Épico",
        type: "equipment",
        price: 10000,
        level_required: 24,
        stats: { strength: 35, magic_power: 25 },
        description: "Anel de poder épico",
        category: "Acessórios",
      },
    ],
    26: [
      {
        id: "armadura_epica",
        name: "Armadura Épica",
        type: "equipment",
        price: 30000,
        level_required: 26,
        stats: { defense: 45, health: 180 },
        description: "Armadura de poder épico",
        category: "Armaduras",
      },
    ],
    27: [
      {
        id: "botas_epicas",
        name: "Botas Épicas",
        type: "equipment",
        price: 18000,
        level_required: 27,
        stats: { agility: 40, magic_power: 20 },
        description: "Botas de poder épico",
        category: "Acessórios",
      },
    ],
    28: [
      {
        id: "luvas_epicas",
        name: "Luvas Épicas",
        type: "equipment",
        price: 20000,
        level_required: 28,
        stats: { strength: 40, damage: 25 },
        description: "Luvas de poder épico",
        category: "Acessórios",
      },
    ],
    29: [
      {
        id: "capacete_epico",
        name: "Capacete Épico",
        type: "equipment",
        price: 22000,
        level_required: 29,
        stats: { intelligence: 45, magic_power: 30 },
        description: "Capacete de poder épico",
        category: "Acessórios",
      },
    ],
    // Níveis 31-40: Itens lendários
    31: [
      {
        id: "pocao_vida_lendaria",
        name: "Poção de Vida Lendária",
        type: "potion",
        price: 2000,
        level_required: 31,
        description: "Restaura 800 pontos de vida",
        category: "Consumíveis",
      },
    ],
    32: [
      {
        id: "espada_lendaria_inicial",
        name: "Espada Lendária Inicial",
        type: "equipment",
        price: 60000,
        level_required: 32,
        stats: { strength: 50, damage: 80 },
        description: "Primeira espada de poder lendário",
        category: "Armas",
      },
    ],
    33: [
      {
        id: "armadura_lendaria_inicial",
        name: "Armadura Lendária Inicial",
        type: "equipment",
        price: 75000,
        level_required: 33,
        stats: { defense: 60, health: 250 },
        description: "Primeira armadura de poder lendário",
        category: "Armaduras",
      },
    ],
    34: [
      {
        id: "anel_lendario",
        name: "Anel Lendário",
        type: "equipment",
        price: 50000,
        level_required: 34,
        stats: { strength: 55, magic_power: 40 },
        description: "Anel de poder lendário",
        category: "Acessórios",
      },
    ],
    36: [
      {
        id: "armadura_lendaria",
        name: "Armadura Lendária",
        type: "equipment",
        price: 120000,
        level_required: 36,
        stats: { defense: 70, health: 300 },
        description: "Armadura de poder lendário",
        category: "Armaduras",
      },
    ],
    37: [
      {
        id: "botas_lendarias",
        name: "Botas Lendárias",
        type: "equipment",
        price: 80000,
        level_required: 37,
        stats: { agility: 60, magic_power: 30 },
        description: "Botas de poder lendário",
        category: "Acessórios",
      },
    ],
    38: [
      {
        id: "luvas_lendarias",
        name: "Luvas Lendárias",
        type: "equipment",
        price: 90000,
        level_required: 38,
        stats: { strength: 65, damage: 35 },
        description: "Luvas de poder lendário",
        category: "Acessórios",
      },
    ],
    39: [
      {
        id: "capacete_lendario",
        name: "Capacete Lendário",
        type: "equipment",
        price: 95000,
        level_required: 39,
        stats: { intelligence: 70, magic_power: 45 },
        description: "Capacete de poder lendário",
        category: "Acessórios",
      },
    ],
    // Níveis 41-50: Itens míticos
    41: [
      {
        id: "pocao_vida_mistica",
        name: "Poção de Vida Mística",
        type: "potion",
        price: 5000,
        level_required: 41,
        description: "Restaura 1200 pontos de vida",
        category: "Consumíveis",
      },
    ],
    42: [
      {
        id: "espada_mistica_inicial",
        name: "Espada Mística Inicial",
        type: "equipment",
        price: 300000,
        level_required: 42,
        stats: { strength: 80, damage: 150 },
        description: "Primeira espada de poder místico",
        category: "Armas",
      },
    ],
    43: [
      {
        id: "armadura_mistica_inicial",
        name: "Armadura Mística Inicial",
        type: "equipment",
        price: 400000,
        level_required: 43,
        stats: { defense: 100, health: 500 },
        description: "Primeira armadura de poder místico",
        category: "Armaduras",
      },
    ],
    44: [
      {
        id: "anel_mistico",
        name: "Anel Místico",
        type: "equipment",
        price: 250000,
        level_required: 44,
        stats: { strength: 85, magic_power: 70 },
        description: "Anel de poder místico",
        category: "Acessórios",
      },
    ],
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
    46: [
      {
        id: "armadura_mistica",
        name: "Armadura Mística",
        type: "equipment",
        price: 600000,
        level_required: 46,
        stats: { defense: 120, health: 600 },
        description: "Armadura de poder místico",
        category: "Armaduras",
      },
    ],
    47: [
      {
        id: "botas_misticas",
        name: "Botas Místicas",
        type: "equipment",
        price: 400000,
        level_required: 47,
        stats: { agility: 90, magic_power: 60 },
        description: "Botas de poder místico",
        category: "Acessórios",
      },
    ],
    48: [
      {
        id: "luvas_misticas",
        name: "Luvas Místicas",
        type: "equipment",
        price: 450000,
        level_required: 48,
        stats: { strength: 95, damage: 50 },
        description: "Luvas de poder místico",
        category: "Acessórios",
      },
    ],
    49: [
      {
        id: "capacete_mistico",
        name: "Capacete Místico",
        type: "equipment",
        price: 480000,
        level_required: 49,
        stats: { intelligence: 100, magic_power: 80 },
        description: "Capacete de poder místico",
        category: "Acessórios",
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

  return baseItemsByLevel[level] || [];
};

// Itens específicos por classe (usando utilitário expandido)
export const getClassItems = (
  level: number,
  characterClass: string
): ShopItem[] => {
  return getClassItemsExpanded(level, characterClass);
};

// Função principal para obter todos os itens da loja (até o nível atual)
export const getClassSpecificItems = (
  level: number,
  characterClass: string
): ShopItem[] => {
  const allItems: ShopItem[] = [];

  // Coletar todos os itens base até o nível atual
  for (let i = 1; i <= level; i++) {
    const baseItems = getBaseItems(i);
    allItems.push(...baseItems);
  }

  // Coletar todos os itens específicos da classe até o nível atual
  for (let i = 1; i <= level; i++) {
    const classItems = getClassItems(i, characterClass);
    allItems.push(...classItems);
  }

  return allItems;
};

// Função para buscar um item específico por ID
export const findShopItemById = (
  itemId: string,
  level: number,
  characterClass: string
): ShopItem | undefined => {
  const allItems = getClassSpecificItems(level, characterClass);
  return allItems.find((item) => item.id === itemId);
};
