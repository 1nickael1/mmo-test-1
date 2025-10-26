import type { ApiResponse, Character } from "../../../../types";
import { verifyToken } from "../../../utils/auth";
import getDatabase from "../../../utils/databaseAdapter";

export default defineEventHandler(async (event) => {
    const db = getDatabase();
  try {
    const characterId = getRouterParam(event, "id");
    const body = await readBody(event);
    const { xp } = body;

    if (!characterId || !xp || xp <= 0) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem e XP válido são obrigatórios",
      });
    }

    // Verificar autenticação
    const token = getCookie(event, "@mmo/ninja/token");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Token de autenticação não encontrado",
      });
    }

    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        message: "Token inválido",
      });
    }

    // Buscar personagem
    const character = db
      .prepare("SELECT * FROM characters WHERE id = ? AND user_id = ?")
      .get(characterId, payload.id) as any;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Calcular XP necessário para próximo nível (curva balanceada até nível 50)
    const getXpForLevel = (level: number): number => {
      if (level <= 10) {
        // Níveis 1-10: crescimento linear suave
        return 1000 + (level - 1) * 500;
      } else if (level <= 20) {
        // Níveis 11-20: crescimento exponencial moderado
        return Math.floor(5500 + Math.pow(level - 10, 1.8) * 1000);
      } else if (level <= 30) {
        // Níveis 21-30: crescimento exponencial mais acentuado
        return Math.floor(15000 + Math.pow(level - 20, 2.2) * 2000);
      } else if (level <= 40) {
        // Níveis 31-40: crescimento exponencial forte
        return Math.floor(50000 + Math.pow(level - 30, 2.5) * 5000);
      } else {
        // Níveis 41-50: crescimento exponencial muito forte
        return Math.floor(150000 + Math.pow(level - 40, 3) * 10000);
      }
    };

    // Adicionar XP
    const newXp = character.xp + xp;
    let newLevel = character.level;
    let levelUps = 0;

    // Verificar level ups
    while (newLevel < 50 && newXp >= getXpForLevel(newLevel)) {
      newLevel++;
      levelUps++;
    }

    // Calcular novos stats se houve level up
    let newStats = JSON.parse(character.stats_json);
    if (levelUps > 0) {
      // Aumentar stats por nível
      newStats.strength += levelUps;
      newStats.agility += levelUps;
      newStats.defense += levelUps;
      newStats.health += levelUps * 10;
      newStats.max_health += levelUps * 10;

      // Restaurar vida ao máximo no level up
      newStats.health = newStats.max_health;
    }

    // Atualizar personagem no banco
    const updateStmt = db.prepare(`
      UPDATE characters 
      SET xp = ?, level = ?, stats_json = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    updateStmt.run(newXp, newLevel, JSON.stringify(newStats), characterId);

    // Buscar personagem atualizado
    const updatedCharacter = db
      .prepare("SELECT * FROM characters WHERE id = ?")
      .get(characterId) as any;

    const characterData: Character = {
      id: updatedCharacter.id,
      user_id: updatedCharacter.user_id,
      name: updatedCharacter.name,
      class: updatedCharacter.class,
      level: updatedCharacter.level,
      xp: updatedCharacter.xp,
      stats: newStats,
      created_at: updatedCharacter.created_at,
      updated_at: updatedCharacter.updated_at,
    };

    const response: ApiResponse<Character> = {
      success: true,
      data: characterData,
      message:
        levelUps > 0
          ? `Parabéns! Você subiu ${levelUps} nível(is)!`
          : "XP adicionado com sucesso!",
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
