// Copies src/styles/index.css to dist/style.css, the standalone stylesheet for SSR / strict-CSP apps.
import { mkdir, readFile, writeFile } from "node:fs/promises";

const files = ["index.css"];

const css = await Promise.all(
  files.map((file) => readFile(new URL(`../src/styles/${file}`, import.meta.url), "utf8")),
);

await mkdir(new URL("../dist/", import.meta.url), { recursive: true });
await writeFile(new URL("../dist/style.css", import.meta.url), css.join("\n"));
