import { seedDatabase } from "../utils/seed";

export default defineEventHandler(async (event) => {
  try {
    // Apenas permitir em desenvolvimento
    if (process.env.NODE_ENV === "production") {
      throw createError({
        statusCode: 403,
        statusMessage: "Seed não permitido em produção",
      });
    }

    seedDatabase();

    return {
      success: true,
      message: "Banco de dados populado com sucesso!",
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Erro ao executar seed",
    });
  }
});
