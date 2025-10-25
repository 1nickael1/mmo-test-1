import type { ApiResponse, RegisterRequest, User } from "../../../types";
import { generateToken, hashPassword } from "../../utils/auth";
import db from "../../utils/database";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<RegisterRequest>(event);
    const { email, password, username } = body;

    if (!email || !password || !username) {
      throw createError({
        statusCode: 400,
        message: "Email, senha e nome de usuário são obrigatórios",
      });
    }

    // Verificar se email já existe
    const existingUser = db
      .prepare("SELECT id FROM users WHERE email = ?")
      .get(email);
    if (existingUser) {
      throw createError({
        statusCode: 409,
        message: "Dados inválidos",
      });
    }

    // Verificar se username já existe
    const existingUsername = db
      .prepare("SELECT id FROM users WHERE username = ?")
      .get(username);
    if (existingUsername) {
      throw createError({
        statusCode: 409,
        message: "Dados inválidos",
      });
    }

    // Hash da senha
    const passwordHash = hashPassword(password);

    // Inserir usuário no banco
    const result = db
      .prepare(
        `
      INSERT INTO users (email, password_hash, username)
      VALUES (?, ?, ?)
    `
      )
      .run(email, passwordHash, username);

    // Buscar usuário criado
    const newUser = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(result.lastInsertRowid) as User;

    // Gerar token JWT
    const token = generateToken({
      userId: newUser.id,
      email: newUser.email,
      username: newUser.username,
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
      data: newUser,
      message: "Usuário criado com sucesso",
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
