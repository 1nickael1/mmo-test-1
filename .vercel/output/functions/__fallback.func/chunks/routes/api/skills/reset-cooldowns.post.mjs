import { d as defineEventHandler, c as createError } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const resetCooldowns_post = defineEventHandler(async (event) => {
  throw createError({
    statusCode: 403,
    message: "Esta funcionalidade est\xE1 dispon\xEDvel apenas no dashboard administrativo. Acesse /admin para usar esta funcionalidade."
  });
});

export { resetCooldowns_post as default };
//# sourceMappingURL=reset-cooldowns.post.mjs.map
