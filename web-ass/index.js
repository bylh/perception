
const fs   = require("fs");

const compiled = new WebAssembly.Module(
  fs.readFileSync(__dirname + "/build/optimized.wasm")
);

const imports = {
  env: {
    memory: new WebAssembly.Memory({ initial: 10 }),
    abort: (filename, line, column) => {
      throw Error("abort called at " + line + ":" + colum);
    }
  }
};

Object.defineProperty(module, "exports", {
  get: () => new WebAssembly.Instance(compiled, imports).exports
});