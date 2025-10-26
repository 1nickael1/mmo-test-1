import type { ApiResponse, ShopItem } from "../../../types";
import { getClassSpecificItems } from "../../utils/shopItems";

export default defineEventHandler(async (event) => {
    const db = getDatabase();
  try {
    const query = getQuery(event);
    const characterLevel = parseInt(query.level as string) || 1;
    const characterClass = (query.class as string) || "ninja";

    // Obter todos os itens disponíveis para o nível e classe
    const allItems = getClassSpecificItems(characterLevel, characterClass);

    // Adicionar propriedade can_buy baseada no nível
    const itemsWithCanBuy = allItems.map((item) => ({
      ...item,
      can_buy: characterLevel >= item.level_required,
    }));

    const response: ApiResponse<ShopItem[]> = {
      success: true,
      data: itemsWithCanBuy,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
