// Joins the stylesheets in src/styles into dist/style.css.
import { mkdir, readFile, writeFile } from "node:fs/promises";

const files = ["grid.css", "masonry.css"];

const css = await Promise.all(
  files.map((file) => readFile(new URL(`../src/styles/${file}`, import.meta.url), "utf8")),
);

await mkdir(new URL("../dist/", import.meta.url), { recursive: true });
await writeFile(new URL("../dist/style.css", import.meta.url), css.join("\n"));
