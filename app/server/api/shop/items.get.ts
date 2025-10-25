import type { ApiResponse, ShopItem } from "../../../types";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const characterLevel = parseInt(query.level as string) || 1;
    const characterClass = (query.class as string) || "ninja";

    // Definir itens específicos por classe
    const getClassSpecificItems = (
      level: number,
      characterClass: string
    ): ShopItem[] => {
      const baseItems = getBaseItems(level);
      const classItems = getClassItems(level, characterClass);
      return [...baseItems, ...classItems];
    };

    // Itens base (disponíveis para todas as classes)
    const getBaseItems = (level: number): ShopItem[] => {
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

      return baseItemsByLevel[level] || [];
    };

    // Itens específicos por classe
    const getClassItems = (
      level: number,
      characterClass: string
    ): ShopItem[] => {
      const classItemsByLevel: Record<string, Record<number, ShopItem[]>> = {
        ninja: {
          1: [
            {
              id: "shuriken_basico",
              name: "Shuriken Básico",
              type: "equipment",
              price: 80,
              level_required: 1,
              stats: { agility: 8, damage: 12 },
              description: "Arma de arremesso ninja básica",
              category: "Armas Ninja",
            },
            {
              id: "uniforme_ninja",
              name: "Uniforme Ninja",
              type: "equipment",
              price: 120,
              level_required: 1,
              stats: { agility: 10, stealth: 5 },
              description: "Roupa tradicional ninja para furtividade",
              category: "Armaduras Ninja",
            },
          ],
          3: [
            {
              id: "kunai_avancado",
              name: "Kunai Avançado",
              type: "equipment",
              price: 250,
              level_required: 3,
              stats: { agility: 15, damage: 18 },
              description: "Kunai ninja mais afiado e letal",
              category: "Armas Ninja",
            },
          ],
          5: [
            {
              id: "mascara_ninja",
              name: "Máscara Ninja",
              type: "equipment",
              price: 400,
              level_required: 5,
              stats: { stealth: 15, intimidation: 10 },
              description: "Máscara que aumenta furtividade e intimidação",
              category: "Acessórios Ninja",
            },
          ],
        },
        guerreiro_espacial: {
          1: [
            {
              id: "rifle_plasma",
              name: "Rifle de Plasma",
              type: "equipment",
              price: 150,
              level_required: 1,
              stats: { strength: 12, damage: 20 },
              description: "Arma de energia para combate espacial",
              category: "Armas Espaciais",
            },
            {
              id: "armadura_espacial_basica",
              name: "Armadura Espacial Básica",
              type: "equipment",
              price: 200,
              level_required: 1,
              stats: { defense: 15, radiation_resistance: 20 },
              description: "Proteção básica contra ambiente espacial",
              category: "Armaduras Espaciais",
            },
          ],
          3: [
            {
              id: "escudo_energia",
              name: "Escudo de Energia",
              type: "equipment",
              price: 350,
              level_required: 3,
              stats: { defense: 25, energy_shield: 50 },
              description: "Escudo de energia para proteção avançada",
              category: "Armaduras Espaciais",
            },
          ],
          5: [
            {
              id: "jetpack",
              name: "Jetpack",
              type: "equipment",
              price: 600,
              level_required: 5,
              stats: { mobility: 30, flight: true },
              description: "Permite voo em ambientes de baixa gravidade",
              category: "Acessórios Espaciais",
            },
          ],
        },
        mago_elemental: {
          1: [
            {
              id: "cajado_elemental",
              name: "Cajado Elemental",
              type: "equipment",
              price: 100,
              level_required: 1,
              stats: { intelligence: 15, magic_power: 20 },
              description: "Cajado que amplifica magias elementais",
              category: "Armas Mágicas",
            },
            {
              id: "tunica_mago",
              name: "Túnica de Mago",
              type: "equipment",
              price: 130,
              level_required: 1,
              stats: { intelligence: 12, mana: 30 },
              description: "Túnica que aumenta poder mágico",
              category: "Armaduras Mágicas",
            },
          ],
          3: [
            {
              id: "orb_elemental",
              name: "Orbe Elemental",
              type: "equipment",
              price: 300,
              level_required: 3,
              stats: { magic_power: 25, elemental_mastery: 15 },
              description: "Orbe que controla elementos da natureza",
              category: "Acessórios Mágicos",
            },
          ],
          5: [
            {
              id: "grimorio_antigo",
              name: "Grimório Antigo",
              type: "equipment",
              price: 500,
              level_required: 5,
              stats: { intelligence: 20, spell_knowledge: 25 },
              description: "Livro de magias antigas e poderosas",
              category: "Acessórios Mágicos",
            },
          ],
        },
        arqueiro_elfo: {
          1: [
            {
              id: "arco_elfico",
              name: "Arco Élfico",
              type: "equipment",
              price: 90,
              level_required: 1,
              stats: { agility: 12, accuracy: 15 },
              description: "Arco tradicional élfico de alta precisão",
              category: "Armas Élficas",
            },
            {
              id: "armadura_elfica",
              name: "Armadura Élfica",
              type: "equipment",
              price: 140,
              level_required: 1,
              stats: { agility: 10, nature_resistance: 15 },
              description: "Armadura leve e ágil dos elfos",
              category: "Armaduras Élficas",
            },
          ],
          3: [
            {
              id: "flechas_magicas",
              name: "Flechas Mágicas",
              type: "equipment",
              price: 280,
              level_required: 3,
              stats: { damage: 20, magic_damage: 15 },
              description: "Flechas imbuídas com magia natural",
              category: "Munições Élficas",
            },
          ],
          5: [
            {
              id: "capacete_elfico",
              name: "Capacete Élfico",
              type: "equipment",
              price: 450,
              level_required: 5,
              stats: { accuracy: 20, perception: 15 },
              description: "Capacete que aumenta precisão e percepção",
              category: "Acessórios Élficos",
            },
          ],
        },
        paladino_sagrado: {
          1: [
            {
              id: "espada_sagrada",
              name: "Espada Sagrada",
              type: "equipment",
              price: 110,
              level_required: 1,
              stats: { strength: 10, holy_damage: 15 },
              description: "Espada abençoada com poder divino",
              category: "Armas Sagradas",
            },
            {
              id: "armadura_sagrada",
              name: "Armadura Sagrada",
              type: "equipment",
              price: 160,
              level_required: 1,
              stats: { defense: 12, holy_resistance: 20 },
              description: "Armadura abençoada pelos deuses",
              category: "Armaduras Sagradas",
            },
          ],
          3: [
            {
              id: "escudo_sagrado",
              name: "Escudo Sagrado",
              type: "equipment",
              price: 320,
              level_required: 3,
              stats: { defense: 20, holy_protection: 25 },
              description: "Escudo que protege contra o mal",
              category: "Armaduras Sagradas",
            },
          ],
          5: [
            {
              id: "amuleto_divino",
              name: "Amuleto Divino",
              type: "equipment",
              price: 550,
              level_required: 5,
              stats: { holy_power: 30, healing: 20 },
              description: "Amuleto que amplifica poderes divinos",
              category: "Acessórios Sagrados",
            },
          ],
        },
        ladrao_sombrio: {
          1: [
            {
              id: "adaga_sombria",
              name: "Adaga Sombria",
              type: "equipment",
              price: 85,
              level_required: 1,
              stats: { agility: 10, stealth: 12 },
              description: "Adaga afiada para ataques furtivos",
              category: "Armas Sombrias",
            },
            {
              id: "armadura_sombria",
              name: "Armadura Sombria",
              type: "equipment",
              price: 125,
              level_required: 1,
              stats: { stealth: 15, agility: 8 },
              description: "Armadura que favorece furtividade",
              category: "Armaduras Sombrias",
            },
          ],
          3: [
            {
              id: "luvas_sombrias",
              name: "Luvas Sombrias",
              type: "equipment",
              price: 270,
              level_required: 3,
              stats: { stealth: 20, lockpicking: 15 },
              description: "Luvas que aumentam habilidades furtivas",
              category: "Acessórios Sombrios",
            },
          ],
          5: [
            {
              id: "capuz_sombrio",
              name: "Capuz Sombrio",
              type: "equipment",
              price: 420,
              level_required: 5,
              stats: { stealth: 25, intimidation: 20 },
              description: "Capuz que oculta a identidade",
              category: "Acessórios Sombrios",
            },
          ],
        },
      };

      return classItemsByLevel[characterClass]?.[level] || [];
    };

    // Retornar itens disponíveis para o nível do personagem
    const availableItems: ShopItem[] = [];

    // Adicionar itens do nível atual e alguns níveis abaixo
    for (let level = 1; level <= characterLevel; level++) {
      const items = getClassSpecificItems(level, characterClass).map(
        (item) => ({
          ...item,
          can_buy: true, // Pode comprar itens do nível atual ou inferior
        })
      );
      availableItems.push(...items);
    }

    // Adicionar alguns itens de níveis ligeiramente acima
    for (let level = characterLevel + 1; level <= characterLevel + 3; level++) {
      const items = getClassSpecificItems(level, characterClass).map(
        (item) => ({
          ...item,
          can_buy: false, // Não pode comprar ainda
        })
      );
      availableItems.push(...items);
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
