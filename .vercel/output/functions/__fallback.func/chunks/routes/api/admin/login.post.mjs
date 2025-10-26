import { d as defineEventHandler, r as readBody, c as createError, s as setCookie } from '../../../nitro/nitro.mjs';
import { a as verifyRootCredentials, g as generateRootToken } from '../../../_/adminAuth.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'bcryptjs';
import 'jsonwebtoken';

const login_post = defineEventHandler(async (event) => {
  getDatabase();
  try {
    const body = await readBody(event);
    if (!body.username || !body.password) {
      throw createError({
        statusCode: 400,
        message: "Username e password s\xE3o obrigat\xF3rios"
      });
    }
    const isValid = verifyRootCredentials(body.username, body.password);
    if (!isValid) {
      throw createError({
        statusCode: 401,
        message: "Credenciais inv\xE1lidas"
      });
    }
    const token = generateRootToken();
    const response = {
      success: true,
      data: {
        token,
        user: {
          username: body.username,
          role: "admin"
        }
      },
      message: "Login administrativo realizado com sucesso"
    };
    setCookie(event, "admin_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60
      // 24 horas
    });
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
