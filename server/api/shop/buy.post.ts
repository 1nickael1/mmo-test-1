import type { ApiResponse } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/databaseAdapter";

// Itens da loja (mesmo do items.get.ts)
const SHOP_ITEMS = [
  // Poções de Cura
  {
    id: "potion_heal_1",
    name: "Poção de Cura Pequena",
    type: "potion",
    price: 50,
    level_required: 1,
    description: "Restaura 50 pontos de vida",
    category: "Consumíveis",
  },
  {
    id: "potion_heal_2",
    name: "Poção de Cura Média",
    type: "potion",
    price: 150,
    level_required: 5,
    description: "Restaura 100 pontos de vida",
    category: "Consumíveis",
  },
  {
    id: "potion_heal_3",
    name: "Poção de Cura Grande",
    type: "potion",
    price: 300,
    level_required: 10,
    description: "Restaura 200 pontos de vida",
    category: "Consumíveis",
  },
  {
    id: "potion_heal_4",
    name: "Poção de Cura Superior",
    type: "potion",
    price: 600,
    level_required: 15,
    description: "Restaura 400 pontos de vida",
    category: "Consumíveis",
  },
  {
    id: "potion_heal_5",
    name: "Poção de Cura Épica",
    type: "potion",
    price: 1200,
    level_required: 20,
    description: "Restaura 800 pontos de vida",
    category: "Consumíveis",
  },
  {
    id: "potion_heal_6",
    name: "Poção de Cura Lendária",
    type: "potion",
    price: 2500,
    level_required: 30,
    description: "Restaura 1500 pontos de vida",
    category: "Consumíveis",
  },
  {
    id: "potion_heal_7",
    name: "Poção de Cura Divina",
    type: "potion",
    price: 5000,
    level_required: 40,
    description: "Restaura 3000 pontos de vida",
    category: "Consumíveis",
  },
  {
    id: "potion_heal_8",
    name: "Poção de Cura Celestial",
    type: "potion",
    price: 10000,
    level_required: 50,
    description: "Restaura 5000 pontos de vida",
    category: "Consumíveis",
  },

  // Armas Ninja
  {
    id: "ninja_sword_1",
    name: "Katana Básica",
    type: "equipment",
    price: 200,
    level_required: 1,
    stats: { strength: 2, damage: 5 },
    description: "Uma katana simples para iniciantes",
    category: "Armas Ninja",
  },
  {
    id: "ninja_sword_2",
    name: "Katana Afiada",
    type: "equipment",
    price: 500,
    level_required: 5,
    stats: { strength: 4, damage: 12 },
    description: "Katana com lâmina mais afiada",
    category: "Armas Ninja",
  },
  {
    id: "ninja_sword_3",
    name: "Katana do Vento",
    type: "equipment",
    price: 1200,
    level_required: 10,
    stats: { strength: 6, agility: 2, damage: 20 },
    description: "Katana que corta como o vento",
    category: "Armas Ninja",
  },
  {
    id: "ninja_sword_4",
    name: "Katana do Fogo",
    type: "equipment",
    price: 2500,
    level_required: 15,
    stats: { strength: 8, damage: 30 },
    description: "Katana que queima os inimigos",
    category: "Armas Ninja",
  },
  {
    id: "ninja_sword_5",
    name: "Katana da Sombra",
    type: "equipment",
    price: 5000,
    level_required: 20,
    stats: { strength: 10, agility: 5, damage: 45 },
    description: "Katana que se move nas sombras",
    category: "Armas Ninja",
  },
  {
    id: "ninja_sword_6",
    name: "Katana Lendária",
    type: "equipment",
    price: 10000,
    level_required: 30,
    stats: { strength: 15, agility: 8, damage: 70 },
    description: "Katana de lendas antigas",
    category: "Armas Ninja",
  },
  {
    id: "ninja_sword_7",
    name: "Katana Divina",
    type: "equipment",
    price: 20000,
    level_required: 40,
    stats: { strength: 20, agility: 12, damage: 100 },
    description: "Katana abençoada pelos deuses",
    category: "Armas Ninja",
  },
  {
    id: "ninja_sword_8",
    name: "Katana Celestial",
    type: "equipment",
    price: 40000,
    level_required: 50,
    stats: { strength: 25, agility: 15, damage: 150 },
    description: "A katana mais poderosa do universo",
    category: "Armas Ninja",
  },

  // Armas Guerreiro Espacial
  {
    id: "space_blaster_1",
    name: "Blaster Básico",
    type: "equipment",
    price: 200,
    level_required: 1,
    stats: { strength: 3, damage: 6 },
    description: "Blaster de energia básico",
    category: "Armas Espaciais",
  },
  {
    id: "space_blaster_2",
    name: "Blaster Avançado",
    type: "equipment",
    price: 500,
    level_required: 5,
    stats: { strength: 5, damage: 15 },
    description: "Blaster com maior poder de fogo",
    category: "Armas Espaciais",
  },
  {
    id: "space_blaster_3",
    name: "Blaster de Plasma",
    type: "equipment",
    price: 1200,
    level_required: 10,
    stats: { strength: 7, damage: 25 },
    description: "Blaster que dispara plasma",
    category: "Armas Espaciais",
  },
  {
    id: "space_blaster_4",
    name: "Blaster Quântico",
    type: "equipment",
    price: 2500,
    level_required: 15,
    stats: { strength: 9, damage: 35 },
    description: "Blaster com tecnologia quântica",
    category: "Armas Espaciais",
  },
  {
    id: "space_blaster_5",
    name: "Blaster de Antimatéria",
    type: "equipment",
    price: 5000,
    level_required: 20,
    stats: { strength: 12, damage: 50 },
    description: "Blaster que usa antimatéria",
    category: "Armas Espaciais",
  },
  {
    id: "space_blaster_6",
    name: "Blaster Lendário",
    type: "equipment",
    price: 10000,
    level_required: 30,
    stats: { strength: 18, damage: 80 },
    description: "Blaster de tecnologia perdida",
    category: "Armas Espaciais",
  },
  {
    id: "space_blaster_7",
    name: "Blaster Divino",
    type: "equipment",
    price: 20000,
    level_required: 40,
    stats: { strength: 24, damage: 120 },
    description: "Blaster abençoado pelos deuses",
    category: "Armas Espaciais",
  },
  {
    id: "space_blaster_8",
    name: "Blaster Celestial",
    type: "equipment",
    price: 40000,
    level_required: 50,
    stats: { strength: 30, damage: 180 },
    description: "O blaster mais poderoso do universo",
    category: "Armas Espaciais",
  },

  // Armaduras
  {
    id: "armor_1",
    name: "Armadura Básica",
    type: "equipment",
    price: 300,
    level_required: 1,
    stats: { defense: 3, health: 20 },
    description: "Armadura simples de proteção",
    category: "Armaduras",
  },
  {
    id: "armor_2",
    name: "Armadura Reforçada",
    type: "equipment",
    price: 800,
    level_required: 5,
    stats: { defense: 6, health: 50 },
    description: "Armadura com placas de reforço",
    category: "Armaduras",
  },
  {
    id: "armor_3",
    name: "Armadura de Energia",
    type: "equipment",
    price: 2000,
    level_required: 10,
    stats: { defense: 10, health: 100 },
    description: "Armadura com campo de energia",
    category: "Armaduras",
  },
  {
    id: "armor_4",
    name: "Armadura de Plasma",
    type: "equipment",
    price: 4000,
    level_required: 15,
    stats: { defense: 15, health: 150 },
    description: "Armadura que absorve plasma",
    category: "Armaduras",
  },
  {
    id: "armor_5",
    name: "Armadura Quântica",
    type: "equipment",
    price: 8000,
    level_required: 20,
    stats: { defense: 20, health: 250 },
    description: "Armadura com tecnologia quântica",
    category: "Armaduras",
  },
  {
    id: "armor_6",
    name: "Armadura Lendária",
    type: "equipment",
    price: 15000,
    level_required: 30,
    stats: { defense: 30, health: 400 },
    description: "Armadura de materiais lendários",
    category: "Armaduras",
  },
  {
    id: "armor_7",
    name: "Armadura Divina",
    type: "equipment",
    price: 30000,
    level_required: 40,
    stats: { defense: 40, health: 600 },
    description: "Armadura abençoada pelos deuses",
    category: "Armaduras",
  },
  {
    id: "armor_8",
    name: "Armadura Celestial",
    type: "equipment",
    price: 60000,
    level_required: 50,
    stats: { defense: 50, health: 1000 },
    description: "A armadura mais poderosa do universo",
    category: "Armaduras",
  },
];

export default defineEventHandler(async (event) => {
  try {
    let token = extractTokenFromHeader(getHeader(event, "authorization"));

    if (!token) {
      token = getCookie(event, "token"); // Try to get token from cookie
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

    const body = await readBody<{
      character_id: number;
      item_id: string;
    }>(event);

    const { character_id, item_id } = body;

    if (!character_id || !item_id) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem e item são obrigatórios",
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
      .get(character_id, payload.userId) as any;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Buscar o item na loja
    const shopItem = SHOP_ITEMS.find((item) => item.id === item_id);
    if (!shopItem) {
      throw createError({
        statusCode: 404,
        message: "Item não encontrado na loja",
      });
    }

    // Verificar se o personagem tem nível suficiente
    if (character.level < shopItem.level_required) {
      throw createError({
        statusCode: 400,
        message: `Nível ${shopItem.level_required} necessário para comprar este item`,
      });
    }

    // Verificar se tem ouro suficiente
    const goldResource = db
      .prepare(
        `
      SELECT * FROM resources 
      WHERE character_id = ? AND resource_type = 'ouro'
    `
      )
      .get(character_id) as any;

    const currentGold = goldResource ? goldResource.amount : 0;
    if (currentGold < shopItem.price) {
      throw createError({
        statusCode: 400,
        message: "Ouro insuficiente",
      });
    }

    // Deduzir ouro
    if (goldResource) {
      db.prepare(
        `
        UPDATE resources 
        SET amount = amount - ?, updated_at = CURRENT_TIMESTAMP
        WHERE character_id = ? AND resource_type = 'ouro'
      `
      ).run(shopItem.price, character_id);
    }

    // Adicionar item ao inventário ou equipamento
    if (shopItem.type === "potion") {
      // Verificar se já existe no inventário
      const existingItem = db
        .prepare(
          `
        SELECT * FROM items 
        WHERE character_id = ? AND item_name = ?
      `
        )
        .get(character_id, shopItem.name);

      if (existingItem) {
        // Incrementar quantidade
        db.prepare(
          `
          UPDATE items 
          SET quantity = quantity + 1, created_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `
        ).run(existingItem.id);
      } else {
        // Criar novo item
        db.prepare(
          `
          INSERT INTO items (character_id, item_name, item_type, quantity, stats_json)
          VALUES (?, ?, 'potion', 1, ?)
        `
        ).run(character_id, shopItem.name, JSON.stringify({}));
      }
    } else if (shopItem.type === "equipment") {
      // Adicionar equipamento
      db.prepare(
        `
        INSERT INTO equipment (character_id, equipment_name, equipment_type, equipped, stats_json)
        VALUES (?, ?, ?, FALSE, ?)
      `
      ).run(
        character_id,
        shopItem.name,
        shopItem.category.includes("Arma")
          ? "weapon"
          : shopItem.category.includes("Armadura")
          ? "armor"
          : "accessory",
        JSON.stringify(shopItem.stats || {})
      );
    }

    const response: ApiResponse<{
      item_name: string;
      price: number;
      remaining_gold: number;
    }> = {
      success: true,
      data: {
        item_name: shopItem.name,
        price: shopItem.price,
        remaining_gold: currentGold - shopItem.price,
      },
      message: `${shopItem.name} comprado com sucesso!`,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
