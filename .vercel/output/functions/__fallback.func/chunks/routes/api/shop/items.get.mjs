import { d as defineEventHandler, e as getQuery, c as createError } from '../../../nitro/nitro.mjs';
import { g as getClassSpecificItems } from '../../../_/shopItems.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const items_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const characterLevel = parseInt(query.level) || 1;
    const characterClass = query.class || "ninja";
    const allItems = getClassSpecificItems(characterLevel, characterClass);
    const itemsWithCanBuy = allItems.map((item) => ({
      ...item,
      can_buy: characterLevel >= item.level_required
    }));
    const response = {
      success: true,
      data: itemsWithCanBuy
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { items_get as default };
//# sourceMappingURL=items.get.mjs.map
