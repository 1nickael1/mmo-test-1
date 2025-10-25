import type { ApiResponse } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/database";

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
      skill_name: string;
    }>(event);

    const { character_id, skill_name } = body;

    if (!character_id || !skill_name) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem e nome da habilidade são obrigatórios",
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

    // Buscar a habilidade
    const skill = db
      .prepare(
        `
      SELECT * FROM skills 
      WHERE character_id = ? AND skill_name = ? AND unlocked = TRUE
    `
      )
      .get(character_id, skill_name) as any;

    if (!skill) {
      // Verificar se a habilidade existe mas não está desbloqueada
      const skillExists = db
        .prepare(
          `
        SELECT * FROM skills 
        WHERE character_id = ? AND skill_name = ?
      `
        )
        .get(character_id, skill_name);

      throw createError({
        statusCode: 404,
        message: "Habilidade não encontrada ou não desbloqueada",
      });
    }

    // Verificar cooldown
    if (skill.last_used) {
      // Converter timestamp do banco para Date corretamente
      const lastUsed = new Date(skill.last_used + "Z"); // Adicionar 'Z' para UTC
      const cooldownSeconds = skill.cooldown_seconds || 1; // 1 segundo padrão
      const now = new Date();
      const timeDiff = (now.getTime() - lastUsed.getTime()) / 1000;

      if (timeDiff >= 0 && timeDiff < cooldownSeconds) {
        const remainingTime = Math.ceil(cooldownSeconds - timeDiff);
        throw createError({
          statusCode: 400,
          message: `Habilidade em cooldown. Aguarde ${remainingTime} segundos.`,
        });
      }
    }

    // Atualizar último uso da habilidade
    db.prepare(
      `
      UPDATE skills 
      SET last_used = CURRENT_TIMESTAMP
      WHERE id = ?
    `
    ).run(skill.id);

    // Calcular dano da habilidade
    const baseDamage = skill.damage || 20;
    const characterStats = JSON.parse(character.stats_json);
    const skillDamage = baseDamage + Math.floor(characterStats.strength * 0.5);

    const response: ApiResponse<{
      skill_name: string;
      damage: number;
      cooldown_seconds: number;
    }> = {
      success: true,
      data: {
        skill_name: skill_name,
        damage: skillDamage,
        cooldown_seconds: skill.cooldown_seconds || 1,
      },
      message: `Habilidade ${skill_name} usada! Dano: ${skillDamage}`,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
