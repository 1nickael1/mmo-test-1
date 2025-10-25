import type { ApiResponse } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import autoBackup from "../../utils/autoBackup";

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

    // Verificar se é admin (opcional - pode ser removido se não quiser restrição)
    // if (payload.role !== "admin") {
    //   throw createError({
    //     statusCode: 403,
    //     message: "Acesso negado. Apenas administradores podem forçar backup.",
    //   });
    // }

    // Forçar backup
    await autoBackup.forceBackup();

    const response: ApiResponse<{
      message: string;
    }> = {
      success: true,
      data: {
        message:
          "Backup forçado executado com sucesso! Todos os dados dos usuários foram salvos.",
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
