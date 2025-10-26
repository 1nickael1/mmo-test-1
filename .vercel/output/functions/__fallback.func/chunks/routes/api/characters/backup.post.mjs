import { d as defineEventHandler, a as getHeader, g as getCookie, c as createError } from '../../../nitro/nitro.mjs';
import fs from 'fs';
import path from 'path';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../_/auth.mjs';
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

const backup_post = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    let token = extractTokenFromHeader(authHeader);
    if (!token) {
      const cookieToken = getCookie(event, "@mmo/ninja/token");
      token = cookieToken || null;
    }
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Token de autentica\xE7\xE3o n\xE3o fornecido"
      });
    }
    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        message: "Token inv\xE1lido"
      });
    }
    const userData = {
      user: db.prepare("SELECT * FROM users WHERE id = ?").get(payload.id),
      characters: db.prepare("SELECT * FROM characters WHERE user_id = ?").all(payload.id),
      resources: db.prepare(
        "SELECT * FROM resources WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).all(payload.id),
      skills: db.prepare(
        "SELECT * FROM skills WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).all(payload.id),
      equipment: db.prepare(
        "SELECT * FROM equipment WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).all(payload.id),
      items: db.prepare(
        "SELECT * FROM items WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).all(payload.id),
      upgrades: db.prepare(
        "SELECT * FROM upgrades WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).all(payload.id),
      battles: db.prepare(
        "SELECT * FROM battles WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).all(payload.id),
      story_progress: db.prepare(
        "SELECT * FROM story_progress WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).all(payload.id)
    };
    const backupDir = path.join(process.cwd(), "backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    const backupFileName = `user-${payload.id}-backup-${timestamp}.json`;
    const backupFilePath = path.join(backupDir, backupFileName);
    fs.writeFileSync(backupFilePath, JSON.stringify(userData, null, 2));
    const backupFiles = fs.readdirSync(backupDir).filter(
      (file) => file.startsWith(`user-${payload.id}-backup-`) && file.endsWith(".json")
    ).sort().reverse();
    if (backupFiles.length > 5) {
      const filesToDelete = backupFiles.slice(5);
      filesToDelete.forEach((file) => {
        fs.unlinkSync(path.join(backupDir, file));
      });
    }
    const response = {
      success: true,
      data: {
        backupFileName,
        backupCount: Math.min(backupFiles.length, 5),
        message: "Backup criado com sucesso! Seus dados est\xE3o seguros."
      }
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor durante backup"
    });
  }
});

export { backup_post as default };
//# sourceMappingURL=backup.post.mjs.map
