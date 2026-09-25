const Module = require("module");
const original = Module.prototype.require;

Module.prototype.require = function patchedRequire(id) {
  const loaded = original.apply(this, arguments);
  if (
    (id === "@next/env" || String(id).includes("@next\\env") || String(id).includes("@next/env")) &&
    loaded &&
    typeof loaded === "object" &&
    loaded.loadEnvConfig &&
    !loaded.default
  ) {
    loaded.default = loaded;
  }
  return loaded;
};
