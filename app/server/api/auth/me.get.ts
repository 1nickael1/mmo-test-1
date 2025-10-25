import type { ApiResponse, User } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/database";

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

    // Buscar usuário no banco
    const user = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(payload.userId) as User;

    if (!user) {
      throw createError({
        statusCode: 404,
        message: "Usuário não encontrado",
      });
    }

    const response: ApiResponse<User> = {
      success: true,
      data: user,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
