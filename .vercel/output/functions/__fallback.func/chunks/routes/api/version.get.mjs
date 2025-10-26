import { d as defineEventHandler, c as createError } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const version_get = defineEventHandler(async (event) => {
  try {
    const currentVersion = "1.2.0";
    const minSupportedVersion = "1.2.0";
    const lastUpdate = "2025-01-25T20:00:00.000Z";
    const forceLogoutVersions = [];
    const changelog = [
      {
        version: "1.2.0",
        date: "2025-01-25T20:00:00.000Z",
        changes: [
          "Corre\xE7\xF5es de autentica\xE7\xE3o com cookies padronizados",
          "Interface de personagem reformulada com dashboard completo",
          "Filtros e navega\xE7\xE3o melhorados com melhor legibilidade",
          "Corre\xE7\xE3o do erro 'personagem n\xE3o encontrado' em todas as p\xE1ginas",
          "Carregamento correto de recursos (ouro, materiais, cristais)",
          "Bot\xE3o de logout melhorado com \xEDcone vis\xEDvel",
          "Sistema robusto e est\xE1vel para produ\xE7\xE3o"
        ],
        breaking_changes: []
      },
      {
        version: "1.1.0",
        date: "2025-10-25T19:29:52.667Z",
        changes: [
          "Implementa\xE7\xE3o de 5 novas classes de personagem com conte\xFAdo completo at\xE9 n\xEDvel 50"
        ],
        breaking_changes: []
      },
      {
        version: "1.0.0",
        date: "2025-01-25T18:00:00Z",
        changes: [
          "Sistema de versionamento implementado",
          "Corre\xE7\xE3o do sistema de troca de personagem",
          "Expans\xE3o de habilidades at\xE9 n\xEDvel 50",
          "Corre\xE7\xE3o da valida\xE7\xE3o de recursos em melhorias",
          "Sistema de cooldown proporcional para habilidades",
          "Melhorias na responsividade mobile",
          "Corre\xE7\xE3o de sincroniza\xE7\xE3o entre API e banco de dados",
          "Sistema de logout autom\xE1tico para vers\xF5es incompat\xEDveis"
        ],
        breaking_changes: [
          "Estrutura do localStorage foi alterada",
          "Tokens de autentica\xE7\xE3o foram atualizados",
          "Sistema de personagens foi reformulado"
        ]
      }
    ];
    const response = {
      success: true,
      data: {
        version: currentVersion,
        minSupportedVersion,
        lastUpdate,
        forceLogoutVersions,
        changelog,
        requiresUpdate: false,
        // Será calculado no frontend
        requiresLogout: false
        // Será calculado no frontend
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

export { version_get as default };
//# sourceMappingURL=version.get.mjs.map
