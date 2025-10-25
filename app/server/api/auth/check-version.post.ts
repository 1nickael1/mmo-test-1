import type { ApiResponse } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";

export default defineEventHandler(async (event) => {
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

    // Versão atual da aplicação
    const currentVersion = "1.0.0";
    const minSupportedVersion = "1.0.0";
    const forceLogoutVersions: string[] = []; // Versões antigas que requerem logout

    // Verificar se o token foi criado com uma versão compatível
    const tokenVersion = (payload as any).version || "0.0.0";

    // Se o token foi criado com uma versão que requer logout
    if (forceLogoutVersions.includes(tokenVersion)) {
      throw createError({
        statusCode: 401,
        message: "Token criado com versão incompatível. Faça login novamente.",
      });
    }

    // Se o token foi criado com uma versão muito antiga
    const compareVersions = (v1: string, v2: string): number => {
      const v1parts = v1.split(".").map(Number);
      const v2parts = v2.split(".").map(Number);

      for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
        const v1part = v1parts[i] || 0;
        const v2part = v2parts[i] || 0;

        if (v1part > v2part) return 1;
        if (v1part < v2part) return -1;
      }

      return 0;
    };

    if (compareVersions(tokenVersion, minSupportedVersion) < 0) {
      throw createError({
        statusCode: 401,
        message: "Token criado com versão muito antiga. Faça login novamente.",
      });
    }

    const response: ApiResponse<{
      version: string;
      tokenVersion: string;
      isCompatible: boolean;
    }> = {
      success: true,
      data: {
        version: currentVersion,
        tokenVersion,
        isCompatible: true,
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
