import type { ApiResponse } from "../../types";

export default defineEventHandler(async (event) => {
  try {
    // Versão atual da aplicação
    const currentVersion = "1.1.0";

    // Versão mínima suportada (versões abaixo desta serão forçadas a atualizar)
    const minSupportedVersion = "1.0.0";

    // Data da última atualização
    const lastUpdate = "2025-10-25T19:29:52.667Z";

    // Versões que requerem logout forçado (versões antigas incompatíveis)
    const forceLogoutVersions: string[] = [];

    // Changelog das principais mudanças
    const changelog = [    {
      version: "1.1.0",
      date: "2025-10-25T19:29:52.667Z",
      changes: [
        "Implementação de 5 novas classes de personagem com conteúdo completo até nível 50"
      ],
      breaking_changes: []
    },

      {
        version: "1.0.0",
        date: "2025-01-25T18:00:00Z",
        changes: [
          "Sistema de versionamento implementado",
          "Correção do sistema de troca de personagem",
          "Expansão de habilidades até nível 50",
          "Correção da validação de recursos em melhorias",
          "Sistema de cooldown proporcional para habilidades",
          "Melhorias na responsividade mobile",
          "Correção de sincronização entre API e banco de dados",
          "Sistema de logout automático para versões incompatíveis",
        ],
        breaking_changes: [
          "Estrutura do localStorage foi alterada",
          "Tokens de autenticação foram atualizados",
          "Sistema de personagens foi reformulado",
        ],
      },
    ];

    const response: ApiResponse<{
      version: string;
      minSupportedVersion: string;
      lastUpdate: string;
      forceLogoutVersions: string[];
      changelog: any[];
      requiresUpdate: boolean;
      requiresLogout: boolean;
    }> = {
      success: true,
      data: {
        version: currentVersion,
        minSupportedVersion,
        lastUpdate,
        forceLogoutVersions,
        changelog,
        requiresUpdate: false, // Será calculado no frontend
        requiresLogout: false, // Será calculado no frontend
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
