import type { ApiResponse, LoginRequest, User } from "../../../types";
import { generateToken, verifyPassword } from "../../utils/auth";
import getDatabase from "../../utils/databaseAdapter";

export default defineEventHandler(async (event) => {
    const db = getDatabase();
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
    const db = getDatabase();
    const userQuery = await db.prepare("SELECT * FROM users WHERE username = ?");
    const user = await userQuery.get(username) as User & { password_hash: string };

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

    // Gerar token JWT com versão
    const token = generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
      version: "1.0.0", // Versão atual da aplicação
    });

    // Definir cookie com configurações apropriadas para produção
    const isProduction = process.env.NODE_ENV === "production";
    setCookie(event, "@mmo/ninja/token", token, {
      httpOnly: false, // Permitir acesso via JavaScript
      secure: isProduction, // Secure apenas em produção (HTTPS)
      sameSite: isProduction ? "strict" : "lax", // Strict em produção, lax em desenvolvimento
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/", // Garantir que seja válido em toda a aplicação
    });

    const response: ApiResponse<User & { token: string }> = {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        created_at: user.created_at,
        updated_at: user.updated_at,
        token: token,
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
