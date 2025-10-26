import { d as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useCookie } from './cookie-b4_mmrzk.mjs';
import 'vue';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const auth = defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie("@mmo/ninja/token");
  const publicRoutes = ["/login", "/cadastro", "/", "/admin"];
  if (publicRoutes.includes(to.path)) {
    return;
  }
  if (!token.value) {
    return navigateTo("/login");
  }
  return;
});

export { auth as default };
//# sourceMappingURL=auth-DEzccLoD.mjs.map
