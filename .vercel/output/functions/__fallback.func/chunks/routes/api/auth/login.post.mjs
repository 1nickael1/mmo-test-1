import { d as defineEventHandler, r as readBody, c as createError, s as setCookie } from '../../../nitro/nitro.mjs';
import { a as verifyPassword, g as generateToken } from '../../../_/auth.mjs';
import { d as db } from '../../../_/databaseAdapter.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'bcryptjs';
import 'jsonwebtoken';
import '@vercel/postgres';

const login_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, password } = body;
    if (!username || !password) {
      throw createError({
        statusCode: 400,
        message: "Login e senha s\xE3o obrigat\xF3rios"
      });
    }
    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "Dados inv\xE1lidos"
      });
    }
    if (!verifyPassword(password, user.password_hash)) {
      throw createError({
        statusCode: 401,
        message: "Dados inv\xE1lidos"
      });
    }
    const token = generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
      version: "1.0.0"
      // Versão atual da aplicação
    });
    const isProduction = true;
    setCookie(event, "@mmo/ninja/token", token, {
      httpOnly: false,
      // Permitir acesso via JavaScript
      secure: isProduction,
      // Secure apenas em produção (HTTPS)
      sameSite: isProduction ? "strict" : "lax",
      // Strict em produção, lax em desenvolvimento
      maxAge: 60 * 60 * 24 * 7,
      // 7 dias
      path: "/"
      // Garantir que seja válido em toda a aplicação
    });
    const response = {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        created_at: user.created_at,
        updated_at: user.updated_at,
        token
      },
      message: "Login realizado com sucesso"
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
