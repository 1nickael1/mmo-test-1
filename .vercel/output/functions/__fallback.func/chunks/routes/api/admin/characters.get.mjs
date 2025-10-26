import { d as defineEventHandler, g as getCookie, a as getHeader, c as createError } from '../../../nitro/nitro.mjs';
import { v as verifyRootToken } from '../../../_/adminAuth.mjs';
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

const characters_get = defineEventHandler(async (event) => {
  try {
    let adminToken = getCookie(event, "admin_token");
    if (!adminToken) {
      const authHeader = getHeader(event, "authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        adminToken = authHeader.substring(7);
      }
    }
    if (!adminToken) {
      throw createError({
        statusCode: 401,
        message: "Token administrativo n\xE3o fornecido"
      });
    }
    const adminPayload = verifyRootToken(adminToken);
    if (!adminPayload) {
      throw createError({
        statusCode: 401,
        message: "Token administrativo inv\xE1lido"
      });
    }
    const characters = db.prepare(
      `
      SELECT 
        c.id,
        c.name,
        c.class,
        c.level,
        c.xp,
        c.stats_json,
        c.created_at,
        u.username as user_username,
        u.email as user_email
      FROM characters c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.created_at DESC
    `
    ).all();
    const response = {
      success: true,
      data: {
        characters
      },
      message: `${characters.length} personagens encontrados`
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { characters_get as default };
//# sourceMappingURL=characters.get.mjs.map
