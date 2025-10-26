import { d as defineEventHandler, b as deleteCookie } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const logout_post = defineEventHandler(async (event) => {
  getDatabase();
  deleteCookie(event, "@mmo/ninja/token");
  return {
    success: true,
    message: "Logout realizado com sucesso"
  };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
