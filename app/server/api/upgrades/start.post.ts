import type { ApiResponse } from "../../../types";
import { verifyToken } from "../../utils/auth";
import db from "../../utils/databaseAdapter";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { upgrade_id, character_id } = body;

    if (!upgrade_id || !character_id) {
      throw createError({
        statusCode: 400,
        message: "ID da melhoria e do personagem são obrigatórios",
      });
    }

    const upgradeId = parseInt(upgrade_id);
    const characterId = parseInt(character_id);

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

    // Verificar se o personagem pertence ao usuário
    const character = db
      .prepare("SELECT * FROM characters WHERE id = ? AND user_id = ?")
      .get(characterId, payload.id) as any;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Definir custos das melhorias (simulado)
    const upgradeCosts: Record<number, { gold: number; time_seconds: number }> =
      {
        1: { gold: 100, time_seconds: 30 },
        2: { gold: 150, time_seconds: 60 },
        3: { gold: 200, time_seconds: 45 },
        4: { gold: 300, time_seconds: 90 },
        5: { gold: 400, time_seconds: 60 },
        6: { gold: 500, time_seconds: 120 },
        7: { gold: 750, time_seconds: 180 },
        8: { gold: 1000, time_seconds: 240 },
        9: { gold: 1250, time_seconds: 300 },
        10: { gold: 1500, time_seconds: 360 },
        11: { gold: 2000, time_seconds: 480 },
        12: { gold: 5000, time_seconds: 1800 },
        13: { gold: 10000, time_seconds: 3600 },
        14: { gold: 25000, time_seconds: 7200 },
        15: { gold: 50000, time_seconds: 14400 },
        16: { gold: 100000, time_seconds: 28800 },
        17: { gold: 200000, time_seconds: 57600 },
        18: { gold: 500000, time_seconds: 172800 },
        19: { gold: 1000000, time_seconds: 345600 },
      };

    const cost = upgradeCosts[upgradeId] || { gold: 100, time_seconds: 30 };

    // Verificar se o personagem tem recursos suficientes
    const goldResource = db
      .prepare(
        "SELECT * FROM resources WHERE character_id = ? AND resource_type = ?"
      )
      .get(characterId, "ouro") as any;

    const currentGold = goldResource?.amount || 0;

    if (currentGold < cost.gold) {
      throw createError({
        statusCode: 400,
        message: `Ouro insuficiente. Necessário: ${cost.gold}, Disponível: ${currentGold}`,
      });
    }

    // Verificar se já existe uma melhoria em andamento
    const existingUpgrade = db
      .prepare(
        "SELECT * FROM upgrades WHERE character_id = ? AND is_completed = FALSE"
      )
      .get(characterId) as any;

    if (existingUpgrade) {
      throw createError({
        statusCode: 400,
        message: "Já existe uma melhoria em andamento",
      });
    }

    // Deduzir ouro
    if (goldResource) {
      db.prepare(
        "UPDATE resources SET amount = amount - ? WHERE character_id = ? AND resource_type = ?"
      ).run(cost.gold, characterId, "ouro");
    } else {
      throw createError({
        statusCode: 400,
        message: "Recurso de ouro não encontrado",
      });
    }

    // Iniciar melhoria
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + cost.time_seconds * 1000);

    const insertUpgradeStmt = db.prepare(`
      INSERT INTO upgrades (character_id, upgrade_type, upgrade_name, level, cost_json, is_completed, started_at)
      VALUES (?, ?, ?, ?, ?, FALSE, ?)
    `);

    // Definir nome da melhoria baseado no ID
    const upgradeNames: Record<number, { type: string; name: string }> = {
      1: { type: "stat", name: "Treinamento de Força" },
      2: { type: "building", name: "Armazém de Recursos" },
      3: { type: "stat", name: "Treinamento de Agilidade" },
      4: { type: "building", name: "Laboratório de Pesquisa" },
      5: { type: "stat", name: "Treinamento de Defesa" },
      6: { type: "building", name: "Oficina de Equipamentos" },
      7: { type: "training", name: "Campo de Treinamento" },
      8: { type: "building", name: "Câmara de Meditação" },
      9: { type: "defense", name: "Escudo de Energia" },
      10: { type: "research", name: "Pesquisa de Tecnologia" },
      11: { type: "transport", name: "Portal de Teletransporte" },
      12: { type: "building", name: "Base Estelar" },
      13: { type: "research", name: "Manipulador de Gravidade" },
      14: { type: "building", name: "Portal do Multiverso" },
      15: { type: "research", name: "Motor da Realidade" },
      16: { type: "building", name: "Protocolo de Gênese" },
      17: { type: "research", name: "Domínio da Criação" },
      18: { type: "building", name: "Entidade da Transcendência" },
      19: { type: "research", name: "Onipotência Absoluta" },
    };

    const upgradeInfo = upgradeNames[upgradeId] || {
      type: "stat",
      name: "Melhoria Básica",
    };

    insertUpgradeStmt.run(
      characterId,
      upgradeInfo.type,
      upgradeInfo.name,
      1,
      JSON.stringify(cost),
      startTime.toISOString()
    );

    const response: ApiResponse<any> = {
      success: true,
      data: {
        upgradeId,
        upgradeName: upgradeInfo.name,
        upgradeType: upgradeInfo.type,
        cost,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        timeRemaining: cost.time_seconds * 1000,
      },
      message: `Melhoria "${upgradeInfo.name}" iniciada com sucesso!`,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
