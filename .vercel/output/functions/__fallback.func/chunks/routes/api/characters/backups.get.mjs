import { d as defineEventHandler, a as getHeader, g as getCookie, c as createError } from '../../../nitro/nitro.mjs';
import fs from 'fs';
import path from 'path';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../_/auth.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'bcryptjs';
import 'jsonwebtoken';

const backups_get = defineEventHandler(async (event) => {
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
    const backupDir = path.join(process.cwd(), "backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    const backupFiles = fs.readdirSync(backupDir).filter(
      (file) => file.startsWith(`user-${payload.id}-backup-`) && file.endsWith(".json")
    ).map((file) => {
      const filePath = path.join(backupDir, file);
      const stats = fs.statSync(filePath);
      return {
        fileName: file,
        createdAt: stats.birthtime.toISOString(),
        size: stats.size,
        sizeFormatted: formatFileSize(stats.size)
      };
    }).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const response = {
      success: true,
      data: {
        backups: backupFiles,
        message: backupFiles.length > 0 ? `${backupFiles.length} backup(s) encontrado(s)` : "Nenhum backup encontrado. Crie um backup para proteger seus dados."
      }
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export { backups_get as default };
//# sourceMappingURL=backups.get.mjs.map
