import type { ApiResponse } from "../../../types";
import {
  generateRootToken,
  verifyRootCredentials,
} from "../../utils/adminAuth";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{
      username: string;
      password: string;
    }>(event);

    if (!body.username || !body.password) {
      throw createError({
        statusCode: 400,
        message: "Username e password são obrigatórios",
      });
    }

    const isValid = verifyRootCredentials(body.username, body.password);

    if (!isValid) {
      throw createError({
        statusCode: 401,
        message: "Credenciais inválidas",
      });
    }

    const token = generateRootToken();

    const response: ApiResponse<{
      token: string;
      user: {
        username: string;
        role: string;
      };
    }> = {
      success: true,
      data: {
        token,
        user: {
          username: body.username,
          role: "admin",
        },
      },
      message: "Login administrativo realizado com sucesso",
    };

    // Definir cookie httpOnly
    setCookie(event, "admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 horas
    });

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
