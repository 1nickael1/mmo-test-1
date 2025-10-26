import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const test_get = defineEventHandler(async (event) => {
  return {
    message: "API funcionando!",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
});

export { test_get as default };
//# sourceMappingURL=test.get.mjs.map
