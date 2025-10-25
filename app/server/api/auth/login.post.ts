import type { ApiResponse, LoginRequest, User } from "../../../types";
import { generateToken, verifyPassword } from "../../utils/auth";
import db from "../../utils/database";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<LoginRequest>(event);
    const { username, password } = body;

    if (!username || !password) {
      throw createError({
        statusCode: 400,
        message: "Login e senha são obrigatórios",
      });
    }

    // Buscar usuário no banco
    const user = db
      .prepare("SELECT * FROM users WHERE username = ?")
      .get(username) as User & { password_hash: string };

    if (!user) {
      throw createError({
        statusCode: 401,
        message: "Dados inválidos",
      });
    }

    // Verificar senha
    if (!verifyPassword(password, user.password_hash)) {
      throw createError({
        statusCode: 401,
        message: "Dados inválidos",
      });
    }

    // Gerar token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
      username: user.username,
    });

    // Definir cookie (Secure apenas em produção para funcionar em http://localhost)
    setCookie(event, "token", token, {
      httpOnly: false, // Permitir acesso via JavaScript
      secure: false, // Desabilitar secure para funcionar em http
      sameSite: "lax", // Mais permissivo para desenvolvimento
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/", // Garantir que seja válido em toda a aplicação
    });

    const response: ApiResponse<User> = {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      message: "Login realizado com sucesso",
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
