import type { ApiResponse } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/database";

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    let token = extractTokenFromHeader(authHeader);
    if (!token) {
      const cookieToken = getCookie(event, "token");
      token = cookieToken || null;
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
      upgrade_id: string;
    }>(event);

    const { character_id, upgrade_id } = body;

    if (!character_id || !upgrade_id) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem e melhoria são obrigatórios",
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

    // Buscar recursos do personagem
    const resources = db
      .prepare(
        `
      SELECT * FROM resources 
      WHERE character_id = ?
    `
      )
      .all(character_id) as any[];

    const resourceMap = resources.reduce((acc, res) => {
      acc[res.resource_type] = res.amount;
      return acc;
    }, {} as Record<string, number>);

    // Buscar melhoria existente
    const existingUpgrade = db
      .prepare(
        `
      SELECT * FROM upgrades 
      WHERE character_id = ? AND upgrade_name = ?
    `
      )
      .get(character_id, upgrade_id) as any;

    // Definir melhorias disponíveis (mesmo do get)
    const AVAILABLE_UPGRADES = [
      {
        id: "strength_boost",
        name: "Treinamento de Força",
        type: "stat",
        cost: { gold: 500, materials: 10 },
        max_level: 10,
        stat_boost: { strength: 2 },
      },
      {
        id: "agility_boost",
        name: "Treinamento de Agilidade",
        type: "stat",
        cost: { gold: 500, materials: 10 },
        max_level: 10,
        stat_boost: { agility: 2 },
      },
      {
        id: "defense_boost",
        name: "Treinamento de Defesa",
        type: "stat",
        cost: { gold: 500, materials: 10 },
        max_level: 10,
        stat_boost: { defense: 2 },
      },
      {
        id: "health_boost",
        name: "Treinamento de Vitalidade",
        type: "stat",
        cost: { gold: 500, materials: 10 },
        max_level: 10,
        stat_boost: { max_health: 20 },
      },
      {
        id: "regeneration_1",
        name: "Regeneração Básica",
        type: "regeneration",
        cost: { gold: 100 },
        max_level: 1,
        time_seconds: 0,
      },
      {
        id: "regeneration_2",
        name: "Regeneração Aprimorada",
        type: "regeneration",
        cost: { gold: 200 },
        max_level: 1,
        time_seconds: 0,
      },
      {
        id: "regeneration_3",
        name: "Regeneração Avançada",
        type: "regeneration",
        cost: { gold: 400 },
        max_level: 1,
        time_seconds: 0,
      },
      {
        id: "regeneration_4",
        name: "Regeneração Superior",
        type: "regeneration",
        cost: { gold: 800 },
        max_level: 1,
        time_seconds: 0,
      },
      {
        id: "regeneration_5",
        name: "Regeneração Épica",
        type: "regeneration",
        cost: { gold: 1600 },
        max_level: 1,
        time_seconds: 0,
      },
      {
        id: "regeneration_6",
        name: "Regeneração Lendária",
        type: "regeneration",
        cost: { gold: 3200 },
        max_level: 1,
        time_seconds: 0,
      },
      {
        id: "regeneration_7",
        name: "Regeneração Divina",
        type: "regeneration",
        cost: { gold: 6400 },
        max_level: 1,
        time_seconds: 0,
      },
      {
        id: "regeneration_8",
        name: "Regeneração Celestial",
        type: "regeneration",
        cost: { gold: 12800 },
        max_level: 1,
        time_seconds: 0,
      },
      {
        id: "regeneration_9",
        name: "Regeneração Transcendente",
        type: "regeneration",
        cost: { gold: 25600 },
        max_level: 1,
        time_seconds: 0,
      },
      {
        id: "regeneration_10",
        name: "Regeneração Absoluta",
        type: "regeneration",
        cost: { gold: 51200 },
        max_level: 1,
        time_seconds: 0,
      },
      {
        id: "training_ground",
        name: "Campo de Treinamento",
        type: "building",
        cost: { gold: 1000, materials: 50, crystals: 5 },
        max_level: 5,
        time_seconds: 300,
      },
      {
        id: "resource_mine",
        name: "Mina de Recursos",
        type: "building",
        cost: { gold: 2000, materials: 100, crystals: 10 },
        max_level: 3,
        time_seconds: 600,
      },
      {
        id: "energy_shield",
        name: "Escudo de Energia",
        type: "building",
        cost: { gold: 3000, materials: 150, crystals: 15 },
        max_level: 3,
        time_seconds: 900,
      },
      {
        id: "research_lab",
        name: "Laboratório de Pesquisa",
        type: "building",
        cost: { gold: 5000, materials: 200, crystals: 25 },
        max_level: 2,
        time_seconds: 1800,
      },
    ];

    const upgradeInfo = AVAILABLE_UPGRADES.find((u) => u.id === upgrade_id);
    if (!upgradeInfo) {
      throw createError({
        statusCode: 404,
        message: "Melhoria não encontrada",
      });
    }

    const currentLevel = existingUpgrade ? existingUpgrade.level : 0;
    if (currentLevel >= upgradeInfo.max_level) {
      throw createError({
        statusCode: 400,
        message: "Melhoria já está no nível máximo",
      });
    }

    // Verificar se já está em progresso
    if (existingUpgrade && !existingUpgrade.is_completed) {
      throw createError({
        statusCode: 400,
        message: "Esta melhoria já está em progresso",
      });
    }

    // Calcular custo
    const costMultiplier = Math.pow(1.5, currentLevel);
    const currentCost = {
      gold: Math.floor(upgradeInfo.cost.gold * costMultiplier),
      materials: Math.floor((upgradeInfo.cost.materials || 0) * costMultiplier),
      crystals: Math.floor((upgradeInfo.cost.crystals || 0) * costMultiplier),
    };

    // Verificar se tem recursos suficientes
    if (
      resourceMap.ouro < currentCost.gold ||
      resourceMap.materiais < currentCost.materials ||
      resourceMap.cristais < currentCost.crystals
    ) {
      throw createError({
        statusCode: 400,
        message: "Recursos insuficientes",
      });
    }

    // Deduzir recursos
    db.prepare(
      `
      UPDATE resources 
      SET amount = amount - ?, updated_at = CURRENT_TIMESTAMP
      WHERE character_id = ? AND resource_type = 'ouro'
    `
    ).run(currentCost.gold, character_id);

    if (currentCost.materials > 0) {
      db.prepare(
        `
        UPDATE resources 
        SET amount = amount - ?, updated_at = CURRENT_TIMESTAMP
        WHERE character_id = ? AND resource_type = 'materiais'
      `
      ).run(currentCost.materials, character_id);
    }

    if (currentCost.crystals > 0) {
      db.prepare(
        `
        UPDATE resources 
        SET amount = amount - ?, updated_at = CURRENT_TIMESTAMP
        WHERE character_id = ? AND resource_type = 'cristais'
      `
      ).run(currentCost.crystals, character_id);
    }

    // Calcular tempo de conclusão
    const completionTime = new Date(
      Date.now() + (upgradeInfo.time_seconds || 0) * 1000
    );

    // Criar ou atualizar melhoria
    if (existingUpgrade) {
      db.prepare(
        `
        UPDATE upgrades 
        SET level = ?, cost_json = ?, is_completed = FALSE, started_at = CURRENT_TIMESTAMP, completed_at = ?
        WHERE character_id = ? AND upgrade_name = ?
      `
      ).run(
        currentLevel + 1,
        JSON.stringify(currentCost),
        completionTime.toISOString(),
        character_id,
        upgrade_id
      );
    } else {
      db.prepare(
        `
        INSERT INTO upgrades (character_id, upgrade_type, upgrade_name, level, cost_json, is_completed, started_at, completed_at)
        VALUES (?, ?, ?, ?, ?, FALSE, CURRENT_TIMESTAMP, ?)
      `
      ).run(
        character_id,
        upgradeInfo.type,
        upgrade_id,
        1,
        JSON.stringify(currentCost),
        completionTime.toISOString()
      );
    }

    // Se for melhoria de stat ou regeneração, aplicar imediatamente
    if (
      (upgradeInfo.type === "stat" && upgradeInfo.stat_boost) ||
      upgradeInfo.type === "regeneration"
    ) {
      if (upgradeInfo.type === "stat" && upgradeInfo.stat_boost) {
        const characterStats = JSON.parse(character.stats_json);
        const newStats = { ...characterStats };

        Object.entries(upgradeInfo.stat_boost).forEach(([stat, boost]) => {
          newStats[stat] = (newStats[stat] || 0) + (boost as number);
        });

        db.prepare(
          `
          UPDATE characters 
          SET stats_json = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `
        ).run(JSON.stringify(newStats), character_id);
      }

      // Marcar como concluída
      db.prepare(
        `
        UPDATE upgrades 
        SET is_completed = TRUE, completed_at = CURRENT_TIMESTAMP
        WHERE character_id = ? AND upgrade_name = ?
      `
      ).run(character_id, upgrade_id);
    }

    const response: ApiResponse<{
      upgrade_id: string;
      completion_time?: string;
      immediate_effect?: boolean;
    }> = {
      success: true,
      data: {
        upgrade_id,
        completion_time:
          upgradeInfo.type === "building"
            ? completionTime.toISOString()
            : undefined,
        immediate_effect:
          upgradeInfo.type === "stat" || upgradeInfo.type === "regeneration",
      },
      message:
        upgradeInfo.type === "stat" || upgradeInfo.type === "regeneration"
          ? "Melhoria aplicada imediatamente!"
          : "Melhoria iniciada! Será concluída em breve.",
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
