// Runs after ng-packagr. Angular libraries are published from `dist`, so this script prepares that folder:
// 1. copies the core stylesheet, so SSR / strict-CSP apps can load it as a normal stylesheet;
// 2. makes the generated package.json publishable. The source package.json is `private` so that
//    `changeset publish` never publishes this package from the wrong folder.
import { copyFile, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

await copyFile(
  require.resolve("@masonrygrid/core/style.css"),
  new URL("../dist/style.css", import.meta.url),
);

const packageJsonUrl = new URL("../dist/package.json", import.meta.url);
const packageJson = JSON.parse(await readFile(packageJsonUrl, "utf8"));

delete packageJson.private;
packageJson.exports = { ...packageJson.exports, "./style.css": "./style.css" };

await writeFile(packageJsonUrl, JSON.stringify(packageJson, null, 2) + "\n");
