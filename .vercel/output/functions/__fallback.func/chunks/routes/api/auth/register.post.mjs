import { d as defineEventHandler, r as readBody, c as createError, s as setCookie } from '../../../nitro/nitro.mjs';
import { h as hashPassword, g as generateToken } from '../../../_/auth.mjs';
import { g as getDatabase } from '../../../_/databaseAdapter.mjs';
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

const register_post = defineEventHandler(async (event) => {
  const db = getDatabase();
  try {
    const body = await readBody(event);
    const { email, password, username } = body;
    if (!email || !password || !username) {
      throw createError({
        statusCode: 400,
        message: "Email, senha e nome de usu\xE1rio s\xE3o obrigat\xF3rios"
      });
    }
    const existingUser = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
    if (existingUser) {
      throw createError({
        statusCode: 409,
        message: "Dados inv\xE1lidos"
      });
    }
    const existingUsername = db.prepare("SELECT id FROM users WHERE username = ?").get(username);
    if (existingUsername) {
      throw createError({
        statusCode: 409,
        message: "Dados inv\xE1lidos"
      });
    }
    const passwordHash = hashPassword(password);
    const result = db.prepare(
      `
      INSERT INTO users (email, password_hash, username)
      VALUES (?, ?, ?)
    `
    ).run(email, passwordHash, username);
    const newUser = db.prepare("SELECT * FROM users WHERE id = ?").get(result.lastInsertRowid);
    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
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
      data: newUser,
      message: "Usu\xE1rio criado com sucesso"
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
