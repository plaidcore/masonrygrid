import { defineConfig } from "tsup";

// `dependencies` and `peerDependencies` (react, @masonrygrid/core) are external by default.
export default defineConfig({
  entry: ["src/index.js"],
  format: ["esm"],
  sourcemap: true,
  clean: true,
  // JSX without `import React` in every file.
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
  // esbuild drops module-level directives when bundling; Next.js needs this one.
  banner: { js: '"use client";' },
});
