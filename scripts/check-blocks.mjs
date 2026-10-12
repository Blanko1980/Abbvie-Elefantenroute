// Prüft, dass jeder Baustein wörtlich in SHOTBIBLE.md steht.
import { readFileSync } from "node:fs";
const bible = readFileSync("SHOTBIBLE.md", "utf8");
const blocks = JSON.parse(readFileSync("data/prompt-blocks.json", "utf8"));
let bad = 0;
for (const [k, v] of Object.entries(blocks)) {
  if (k.startsWith("_")) continue;
  if (!bible.includes(v)) { console.log("ABWEICHUNG:", k); bad++; }
}
console.log(bad ? `${bad} Abweichungen` : "Alle Bausteine wörtlich gefunden");
process.exit(bad ? 1 : 0);
