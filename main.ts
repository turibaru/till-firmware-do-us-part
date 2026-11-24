// A robot's wedding vow, kept in a plain text file beside this script.
// The script never hardcodes the vow: it reads entry.txt at runtime.
// That keeps the words editable without touching the code at all.
// One sentence, one file, one promise — passed through unchanged.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outputDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const content = readFileSync(join(here, "entry.txt"), "utf8");

if (Array.from(content).length > 200) {
  console.error("entry.txt exceeds 200 code points");
  process.exit(1);
}

if (content.trim().length === 0) {
  console.error("entry.txt is empty or whitespace only");
  process.exit(1);
}

writeFileSync(join(outputDir, "entry.txt"), content);
process.exit(0);
