import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");

// Only a single short horoscope may pass here: anything blank, or longer than two hundred characters, stops the run right away.
// The source file sits next to this program file, and its path is worked out from the program's own location,
// which means the result does not depend on the directory the command was typed in —
// running it from anywhere still finds the same file.
if (text.trim().length === 0 || text.length < 1 || text.length > 200) {
  console.error(`entry.txt must be 1-200 characters, got ${text.length}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
