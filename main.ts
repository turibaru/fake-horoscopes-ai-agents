import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");

// The 1–200 character guard keeps this horoscope to one short line; empty or overlong text is rejected before anything is written.
// The entry is read from the folder beside this script, via import.meta.url,
// not from the process working directory, so the check behaves the same
// no matter where the command is launched from.
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
