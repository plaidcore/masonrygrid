import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.js"],
  format: ["esm"],
  sourcemap: true,
  clean: true,
  // Bundles src/styles/index.css into the JS and injects it into the page on load.
  injectStyle: true,
});
