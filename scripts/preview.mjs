// Verkleinerte Vorschau zum Ansehen: node scripts/preview.mjs <datei> [...]
import sharp from "sharp";
import path from "node:path";
for (const f of process.argv.slice(2)) {
  const out = `work/preview/${path.basename(f)}`;
  await sharp(f).resize({ width: 1400, height: 1400, fit: "inside" }).jpeg({ quality: 85 }).toFile(out);
  console.log(out);
}
