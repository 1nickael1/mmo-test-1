import type {
  ApiResponse,
  Character,
  CreateCharacterRequest,
} from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/databaseAdapter";

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    const token = extractTokenFromHeader(authHeader);

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

    const body = await readBody<CreateCharacterRequest>(event);
    const { name, class: characterClass } = body;

    if (!name || !characterClass) {
      throw createError({
        statusCode: 400,
        message: "Nome e classe são obrigatórios",
      });
    }

    // Verificar se já existe personagem com esse nome
    const existingCharacter = db
      .prepare(
        `
      SELECT id FROM characters 
      WHERE user_id = ? AND name = ?
    `
      )
      .get(payload.userId, name);

    if (existingCharacter) {
      throw createError({
        statusCode: 409,
        message: "Já existe um personagem com esse nome",
      });
    }

    // Stats base por classe
    const baseStats =
      characterClass === "ninja"
        ? {
            strength: 8,
            agility: 12,
            defense: 6,
            health: 80,
            max_health: 80,
          }
        : {
            strength: 12,
            agility: 6,
            defense: 10,
            health: 100,
            max_health: 100,
          };

    // Inserir personagem
    const result = db
      .prepare(
        `
      INSERT INTO characters (user_id, name, class, level, xp, stats_json)
      VALUES (?, ?, ?, 1, 0, ?)
    `
      )
      .run(payload.userId, name, characterClass, JSON.stringify(baseStats));

    // Buscar personagem criado
    const newCharacter = db
      .prepare("SELECT * FROM characters WHERE id = ?")
      .get(result.lastInsertRowid) as Character;

    // Inicializar recursos do personagem
    db.prepare(
      `
      INSERT INTO resources (character_id, resource_type, amount)
      VALUES (?, 'ouro', 1000), (?, 'cristais', 0), (?, 'materiais', 0)
    `
    ).run(newCharacter.id, newCharacter.id, newCharacter.id);

    const response: ApiResponse<Character> = {
      success: true,
      data: {
        ...newCharacter,
        stats: baseStats,
      },
      message: "Personagem criado com sucesso",
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
