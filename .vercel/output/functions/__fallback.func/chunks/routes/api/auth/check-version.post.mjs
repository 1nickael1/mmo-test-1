import { d as defineEventHandler, a as getHeader, g as getCookie, c as createError } from '../../../nitro/nitro.mjs';
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

const checkVersion_post = defineEventHandler(async (event) => {
  getDatabase();
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
    const currentVersion = "1.0.0";
    const minSupportedVersion = "1.0.0";
    const forceLogoutVersions = [];
    const tokenVersion = payload.version || "0.0.0";
    if (forceLogoutVersions.includes(tokenVersion)) {
      throw createError({
        statusCode: 401,
        message: "Token criado com vers\xE3o incompat\xEDvel. Fa\xE7a login novamente."
      });
    }
    const compareVersions = (v1, v2) => {
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
        message: "Token criado com vers\xE3o muito antiga. Fa\xE7a login novamente."
      });
    }
    const response = {
      success: true,
      data: {
        version: currentVersion,
        tokenVersion,
        isCompatible: true
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

export { checkVersion_post as default };
//# sourceMappingURL=check-version.post.mjs.map
