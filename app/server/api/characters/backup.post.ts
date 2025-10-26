import fs from "fs";
import path from "path";
import type { ApiResponse } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import getDatabase from "../../utils/databaseAdapter";

export default defineEventHandler(async (event) => {
    const db = getDatabase();
  try {
    const authHeader = getHeader(event, "authorization");
    let token = extractTokenFromHeader(authHeader);

    // Fallback: usa cookie "token" se não houver Authorization header
    if (!token) {
      const cookieToken = getCookie(event, "@mmo/ninja/token");
      token = cookieToken || null;
    }

    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Token de autenticação não fornecido",
      });
    }

    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        message: "Token inválido",
      });
    }

    // Buscar todos os dados do usuário
    const userData = {
      user: db.prepare("SELECT * FROM users WHERE id = ?").get(payload.id),
      characters: db
        .prepare("SELECT * FROM characters WHERE user_id = ?")
        .all(payload.id),
      resources: db
        .prepare(
          "SELECT * FROM resources WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
        )
        .all(payload.id),
      skills: db
        .prepare(
          "SELECT * FROM skills WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
        )
        .all(payload.id),
      equipment: db
        .prepare(
          "SELECT * FROM equipment WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
        )
        .all(payload.id),
      items: db
        .prepare(
          "SELECT * FROM items WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
        )
        .all(payload.id),
      upgrades: db
        .prepare(
          "SELECT * FROM upgrades WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
        )
        .all(payload.id),
      battles: db
        .prepare(
          "SELECT * FROM battles WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
        )
        .all(payload.id),
      story_progress: db
        .prepare(
          "SELECT * FROM story_progress WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
        )
        .all(payload.id),
    };

    // Criar diretório de backup se não existir
    const backupDir = path.join(process.cwd(), "backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Gerar nome do arquivo de backup
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFileName = `user-${payload.id}-backup-${timestamp}.json`;
    const backupFilePath = path.join(backupDir, backupFileName);

    // Salvar backup
    fs.writeFileSync(backupFilePath, JSON.stringify(userData, null, 2));

    // Manter apenas os 5 backups mais recentes
    const backupFiles = fs
      .readdirSync(backupDir)
      .filter(
        (file) =>
          file.startsWith(`user-${payload.id}-backup-`) &&
          file.endsWith(".json")
      )
      .sort()
      .reverse();

    if (backupFiles.length > 5) {
      const filesToDelete = backupFiles.slice(5);
      filesToDelete.forEach((file) => {
        fs.unlinkSync(path.join(backupDir, file));
      });
    }

    const response: ApiResponse<{
      backupFileName: string;
      backupCount: number;
      message: string;
    }> = {
      success: true,
      data: {
        backupFileName,
        backupCount: Math.min(backupFiles.length, 5),
        message: "Backup criado com sucesso! Seus dados estão seguros.",
      },
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor durante backup",
    });
  }
});
