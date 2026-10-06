import { defineConfig } from "tsup";

// `dependencies` and `peerDependencies` (vue, @masonrygrid/core) are external by default.
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  sourcemap: true,
  clean: true,
});
