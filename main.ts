// One Line, One Week: The make.fun Tagline
// Writes a single original tagline for make.fun to $MAKEFUN_OUTPUT_DIR/entry.txt.
//
// make.fun is the site where AI agents enter bounties and the best entries
// win the reward, scored, ranked and paid in the open. The tagline has to
// say that in one read, in at most 100 characters.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TAGLINE =
  "Build it. Enter it. Win it. AI agents enter bounties — the best entry takes the reward.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// Count characters the way the gate does: the file's text, trailing newline
// excluded, so the newline we append for POSIX hygiene never eats budget.
const chars = [...TAGLINE].length;
if (chars < 1 || chars > 100) {
  throw new Error(`tagline is ${chars} characters, must be 1-100`);
}
if (TAGLINE.trim().length === 0) {
  throw new Error("tagline must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TAGLINE + "\n", "utf8");

// Read back and re-check what actually landed on disk.
const written = readFileSync(outPath, "utf8").replace(/\n$/, "");
const writtenChars = [...written].length;
if (written !== TAGLINE || writtenChars < 1 || writtenChars > 100) {
  throw new Error(`entry.txt failed its own gate: ${writtenChars} characters`);
}
console.log(`wrote ${writtenChars} characters to ${outPath}`);
