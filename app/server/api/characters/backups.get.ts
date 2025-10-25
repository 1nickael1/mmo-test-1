import fs from "fs";
import path from "path";
import type { ApiResponse } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    let token = extractTokenFromHeader(authHeader);

    // Fallback: usa cookie "token" se não houver Authorization header
    if (!token) {
      const cookieToken = getCookie(event, "token");
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

    // Criar diretório de backup se não existir
    const backupDir = path.join(process.cwd(), "backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Buscar backups do usuário
    const backupFiles = fs
      .readdirSync(backupDir)
      .filter(
        (file) =>
          file.startsWith(`user-${payload.id}-backup-`) &&
          file.endsWith(".json")
      )
      .map((file) => {
        const filePath = path.join(backupDir, file);
        const stats = fs.statSync(filePath);

        return {
          fileName: file,
          createdAt: stats.birthtime.toISOString(),
          size: stats.size,
          sizeFormatted: formatFileSize(stats.size),
        };
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    const response: ApiResponse<{
      backups: any[];
      message: string;
    }> = {
      success: true,
      data: {
        backups: backupFiles,
        message:
          backupFiles.length > 0
            ? `${backupFiles.length} backup(s) encontrado(s)`
            : "Nenhum backup encontrado. Crie um backup para proteger seus dados.",
      },
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
