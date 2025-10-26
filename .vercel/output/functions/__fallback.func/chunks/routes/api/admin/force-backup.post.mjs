import { d as defineEventHandler, a as getHeader, g as getCookie, c as createError } from '../../../nitro/nitro.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../_/auth.mjs';
import fs from 'fs';
import path from 'path';
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

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const _AutoBackup = class _AutoBackup {
  // Manter 7 backups por usuário
  constructor() {
    __publicField(this, "backupInterval", null);
    __publicField(this, "BACKUP_INTERVAL", 24 * 60 * 60 * 1e3);
    // 24 horas
    __publicField(this, "MAX_BACKUPS_PER_USER", 7);
  }
  static getInstance() {
    if (!_AutoBackup.instance) {
      _AutoBackup.instance = new _AutoBackup();
    }
    return _AutoBackup.instance;
  }
  start() {
    if (this.backupInterval) {
      return;
    }
    this.performBackup();
    this.backupInterval = setInterval(() => {
      this.performBackup();
    }, this.BACKUP_INTERVAL);
  }
  stop() {
    if (this.backupInterval) {
      clearInterval(this.backupInterval);
      this.backupInterval = null;
    }
  }
  async performBackup() {
    try {
      const users = db.prepare("SELECT id, username FROM users ORDER BY created_at DESC").all();
      if (users.length === 0) {
        return;
      }
      let totalBackups = 0;
      let totalErrors = 0;
      for (const user of users) {
        try {
          await this.backupUserData(user.id, user.username);
          totalBackups++;
        } catch (error) {
          console.error(
            `Erro ao fazer backup do usu\xE1rio ${user.username}:`,
            error
          );
          totalErrors++;
        }
      }
      this.cleanupOldBackups();
    } catch (error) {
      console.error("Erro geral no backup:", error);
    }
  }
  async backupUserData(userId, username) {
    const userData = {
      user: db.prepare("SELECT * FROM users WHERE id = ?").get(userId),
      characters: db.prepare("SELECT * FROM characters WHERE user_id = ?").all(userId),
      resources: db.prepare(
        "SELECT * FROM resources WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).all(userId),
      skills: db.prepare(
        "SELECT * FROM skills WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).all(userId),
      equipment: db.prepare(
        "SELECT * FROM equipment WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).all(userId),
      items: db.prepare(
        "SELECT * FROM items WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).all(userId),
      upgrades: db.prepare(
        "SELECT * FROM upgrades WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).all(userId),
      battles: db.prepare(
        "SELECT * FROM battles WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).all(userId),
      story_progress: db.prepare(
        "SELECT * FROM story_progress WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
      ).all(userId)
    };
    const backupDir = path.join(process.cwd(), "backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    const backupFileName = `user-${userId}-backup-${timestamp}.json`;
    const backupFilePath = path.join(backupDir, backupFileName);
    fs.writeFileSync(backupFilePath, JSON.stringify(userData, null, 2));
  }
  cleanupOldBackups() {
    try {
      const backupDir = path.join(process.cwd(), "backups");
      if (!fs.existsSync(backupDir)) {
        return;
      }
      const backupFiles = fs.readdirSync(backupDir).filter((file) => file.endsWith(".json") && file.includes("-backup-")).map((file) => {
        const filePath = path.join(backupDir, file);
        const stats = fs.statSync(filePath);
        return {
          fileName: file,
          filePath,
          createdAt: stats.birthtime,
          userId: this.extractUserIdFromFileName(file)
        };
      });
      const backupsByUser = {};
      backupFiles.forEach((backup) => {
        if (!backupsByUser[backup.userId]) {
          backupsByUser[backup.userId] = [];
        }
        backupsByUser[backup.userId].push(backup);
      });
      Object.keys(backupsByUser).forEach((userId) => {
        const userBackups = backupsByUser[userId].sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
        if (userBackups.length > this.MAX_BACKUPS_PER_USER) {
          const backupsToDelete = userBackups.slice(this.MAX_BACKUPS_PER_USER);
          backupsToDelete.forEach((backup) => {
            try {
              fs.unlinkSync(backup.filePath);
            } catch (error) {
            }
          });
        }
      });
    } catch (error) {
      console.error("Erro ao limpar backups antigos:", error);
    }
  }
  extractUserIdFromFileName(fileName) {
    const match = fileName.match(/user-(\d+)-backup-/);
    return match ? match[1] : "unknown";
  }
  // Método para forçar backup manual
  async forceBackup() {
    await this.performBackup();
  }
};
__publicField(_AutoBackup, "instance");
let AutoBackup = _AutoBackup;
const autoBackup = AutoBackup.getInstance();
autoBackup.start();

const forceBackup_post = defineEventHandler(async (event) => {
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
    await autoBackup.forceBackup();
    const response = {
      success: true,
      data: {
        message: "Backup for\xE7ado executado com sucesso! Todos os dados dos usu\xE1rios foram salvos."
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

export { forceBackup_post as default };
//# sourceMappingURL=force-backup.post.mjs.map
