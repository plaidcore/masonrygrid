// Copies the core stylesheet into this package so users can import it from `@masonrygrid/vue/style.css`.
import { copyFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const source = require.resolve("@masonrygrid/core/style.css");

await mkdir(new URL("../dist/", import.meta.url), { recursive: true });
await copyFile(source, new URL("../dist/style.css", import.meta.url));
