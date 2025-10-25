import type { ApiResponse } from "../../../types";
import { verifyToken } from "../../utils/auth";
import db from "../../utils/database";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { upgradeId, characterId } = body;

    if (!upgradeId || !characterId) {
      throw createError({
        statusCode: 400,
        message: "ID da melhoria e do personagem são obrigatórios",
      });
    }

    // Verificar autenticação
    const token = getCookie(event, "token");
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

    // Verificar se o personagem pertence ao usuário
    const character = db
      .prepare("SELECT * FROM characters WHERE id = ? AND user_id = ?")
      .get(characterId, payload.userId) as any;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Buscar melhoria
    const upgrade = db
      .prepare("SELECT * FROM upgrades WHERE id = ? AND character_id = ?")
      .get(upgradeId, characterId) as any;

    if (!upgrade) {
      throw createError({
        statusCode: 404,
        message: "Melhoria não encontrada",
      });
    }

    if (upgrade.is_completed) {
      throw createError({
        statusCode: 400,
        message: "Melhoria já foi concluída",
      });
    }

    // Verificar se o tempo de construção já passou
    const startTime = new Date(upgrade.started_at);
    const cost = JSON.parse(upgrade.cost_json);
    const endTime = new Date(startTime.getTime() + cost.time_seconds * 1000);
    const now = new Date();

    if (now < endTime) {
      const remainingTime = endTime.getTime() - now.getTime();
      throw createError({
        statusCode: 400,
        message: `Melhoria ainda em andamento. Tempo restante: ${Math.ceil(
          remainingTime / 1000
        )} segundos`,
      });
    }

    // Aplicar bônus da melhoria
    const characterStats = JSON.parse(character.stats_json);
    let bonusApplied = false;

    switch (upgrade.upgrade_type) {
      case "stat":
        if (upgrade.upgrade_name.includes("Força")) {
          characterStats.strength += 5;
          bonusApplied = true;
        } else if (upgrade.upgrade_name.includes("Agilidade")) {
          characterStats.agility += 5;
          bonusApplied = true;
        } else if (upgrade.upgrade_name.includes("Defesa")) {
          characterStats.defense += 5;
          bonusApplied = true;
        }
        break;
      case "building":
        // Melhorias de construção podem dar bônus de recursos ou outras vantagens
        if (upgrade.upgrade_name.includes("Armazém")) {
          // Aumentar capacidade de recursos (implementar se necessário)
          bonusApplied = true;
        } else if (upgrade.upgrade_name.includes("Laboratório")) {
          // Bônus de pesquisa (implementar se necessário)
          bonusApplied = true;
        } else if (upgrade.upgrade_name.includes("Oficina")) {
          // Bônus de equipamentos (implementar se necessário)
          bonusApplied = true;
        }
        break;
      case "training":
        // Reduzir tempo de treinamento (implementar se necessário)
        bonusApplied = true;
        break;
      case "defense":
        // Bônus de defesa
        characterStats.defense += 10;
        bonusApplied = true;
        break;
      case "research":
        // Bônus de pesquisa (implementar se necessário)
        bonusApplied = true;
        break;
      case "transport":
        // Bônus de transporte (implementar se necessário)
        bonusApplied = true;
        break;
    }

    // Atualizar personagem com novos stats
    const updateCharacterStmt = db.prepare(`
      UPDATE characters 
      SET stats_json = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    updateCharacterStmt.run(JSON.stringify(characterStats), characterId);

    // Marcar melhoria como concluída
    const completeUpgradeStmt = db.prepare(`
      UPDATE upgrades 
      SET is_completed = TRUE, completed_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    completeUpgradeStmt.run(upgradeId);

    const response: ApiResponse<any> = {
      success: true,
      data: {
        upgradeId,
        upgradeName: upgrade.upgrade_name,
        upgradeType: upgrade.upgrade_type,
        bonusApplied,
        newStats: characterStats,
      },
      message: `Melhoria "${upgrade.upgrade_name}" concluída com sucesso!`,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
