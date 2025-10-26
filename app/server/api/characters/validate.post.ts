import type { ApiResponse } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/database";

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    let token = extractTokenFromHeader(authHeader);

    // Fallback: usa cookie "token" se não houver Authorization header
    if (!token) {
      const cookieToken = getCookie(event, "@mmo/ninja/token");
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

    // Validar integridade dos dados do usuário
    const validationResults = {
      characters: { valid: 0, invalid: 0, issues: [] as string[] },
      resources: { valid: 0, invalid: 0, issues: [] as string[] },
      skills: { valid: 0, invalid: 0, issues: [] as string[] },
      equipment: { valid: 0, invalid: 0, issues: [] as string[] },
      items: { valid: 0, invalid: 0, issues: [] as string[] },
      upgrades: { valid: 0, invalid: 0, issues: [] as string[] },
      battles: { valid: 0, invalid: 0, issues: [] as string[] },
      story_progress: { valid: 0, invalid: 0, issues: [] as string[] },
    };

    // Validar personagens
    const characters = db
      .prepare("SELECT * FROM characters WHERE user_id = ?")
      .all(payload.id);
    for (const character of characters as any[]) {
      try {
        // Verificar se stats_json é válido
        if (character.stats_json) {
          JSON.parse(character.stats_json);
        }

        // Verificar se level e xp são válidos
        if (character.level < 1 || character.level > 50) {
          validationResults.characters.issues.push(
            `Personagem ${character.name}: nível inválido (${character.level})`
          );
          validationResults.characters.invalid++;
        } else {
          validationResults.characters.valid++;
        }
      } catch (error) {
        validationResults.characters.issues.push(
          `Personagem ${character.name}: stats_json inválido`
        );
        validationResults.characters.invalid++;
      }
    }

    // Validar recursos
    const resources = db
      .prepare(
        "SELECT * FROM resources WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      )
      .all(payload.id);
    for (const resource of resources as any[]) {
      if (resource.amount < 0) {
        validationResults.resources.issues.push(
          `Recurso ${resource.resource_type}: quantidade negativa (${resource.amount})`
        );
        validationResults.resources.invalid++;
      } else {
        validationResults.resources.valid++;
      }
    }

    // Validar habilidades
    const skills = db
      .prepare(
        "SELECT * FROM skills WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      )
      .all(payload.id);
    for (const skill of skills as any[]) {
      if (skill.level < 1 || skill.level > 50) {
        validationResults.skills.issues.push(
          `Habilidade ${skill.skill_name}: nível inválido (${skill.level})`
        );
        validationResults.skills.invalid++;
      } else {
        validationResults.skills.valid++;
      }
    }

    // Validar equipamentos
    const equipment = db
      .prepare(
        "SELECT * FROM equipment WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      )
      .all(payload.id);
    for (const eq of equipment as any[]) {
      try {
        if (eq.stats_json) {
          JSON.parse(eq.stats_json);
        }
        validationResults.equipment.valid++;
      } catch (error) {
        validationResults.equipment.issues.push(
          `Equipamento ${eq.equipment_name}: stats_json inválido`
        );
        validationResults.equipment.invalid++;
      }
    }

    // Validar itens
    const items = db
      .prepare(
        "SELECT * FROM items WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      )
      .all(payload.id);
    for (const item of items as any[]) {
      if (item.quantity < 0) {
        validationResults.items.issues.push(
          `Item ${item.item_name}: quantidade negativa (${item.quantity})`
        );
        validationResults.items.invalid++;
      } else {
        validationResults.items.valid++;
      }
    }

    // Validar melhorias
    const upgrades = db
      .prepare(
        "SELECT * FROM upgrades WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      )
      .all(payload.id);
    for (const upgrade of upgrades as any[]) {
      if (upgrade.level < 1 || upgrade.level > 10) {
        validationResults.upgrades.issues.push(
          `Melhoria ${upgrade.upgrade_name}: nível inválido (${upgrade.level})`
        );
        validationResults.upgrades.invalid++;
      } else {
        validationResults.upgrades.valid++;
      }
    }

    // Validar batalhas
    const battles = db
      .prepare(
        "SELECT * FROM battles WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      )
      .all(payload.id);
    for (const battle of battles as any[]) {
      if (battle.xp_gained < 0) {
        validationResults.battles.issues.push(
          `Batalha ID ${battle.id}: XP negativo (${battle.xp_gained})`
        );
        validationResults.battles.invalid++;
      } else {
        validationResults.battles.valid++;
      }
    }

    // Validar progresso da história
    const storyProgress = db
      .prepare(
        "SELECT * FROM story_progress WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      )
      .all(payload.id);
    for (const progress of storyProgress as any[]) {
      if (progress.chapter < 1 || progress.chapter > 10) {
        validationResults.story_progress.issues.push(
          `Capítulo ${progress.chapter}: número inválido`
        );
        validationResults.story_progress.invalid++;
      } else {
        validationResults.story_progress.valid++;
      }
    }

    // Calcular estatísticas gerais
    const totalValid = Object.values(validationResults).reduce(
      (sum, result) => sum + result.valid,
      0
    );
    const totalInvalid = Object.values(validationResults).reduce(
      (sum, result) => sum + result.invalid,
      0
    );
    const totalIssues = Object.values(validationResults).reduce(
      (sum, result) => sum + result.issues.length,
      0
    );

    const response: ApiResponse<{
      validationResults: any;
      summary: {
        totalValid: number;
        totalInvalid: number;
        totalIssues: number;
        healthScore: number;
      };
      message: string;
    }> = {
      success: true,
      data: {
        validationResults,
        summary: {
          totalValid,
          totalInvalid,
          totalIssues,
          healthScore:
            totalValid + totalInvalid > 0
              ? Math.round((totalValid / (totalValid + totalInvalid)) * 100)
              : 100,
        },
        message:
          totalIssues === 0
            ? "✅ Todos os dados estão íntegros e válidos!"
            : `⚠️ Encontrados ${totalIssues} problema(s) nos dados. Considere fazer um backup e restaurar.`,
      },
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor durante validação",
    });
  }
});
