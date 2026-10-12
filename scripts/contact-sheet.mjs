// Kontaktbogen: Zeilen von Bildern auf gemeinsame Höhe skaliert, Beschriftung darunter.
// node scripts/contact-sheet.mjs <layout.json> <ausgabe.jpg>
// layout.json: { "title": "...", "rows": [[{ "file": "...", "label": "..." }, ...], ...] }
import sharp from "sharp";
import { readFileSync } from "node:fs";

const [layoutFile, out] = process.argv.slice(2);
const layout = JSON.parse(readFileSync(layoutFile, "utf8"));
const W = 3200, GAP = 24, PAD = 48, LABEL = 70, TITLE = 110;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const composites = [];
let y = PAD + TITLE;
for (const row of layout.rows) {
  const metas = await Promise.all(row.map((t) => sharp(t.file).metadata()));
  const ratios = metas.map((m) => m.width / m.height);
  const h = Math.floor((W - 2 * PAD - GAP * (row.length - 1)) / ratios.reduce((a, b) => a + b, 0));
  let x = PAD;
  for (let i = 0; i < row.length; i++) {
    const w = Math.round(h * ratios[i]);
    composites.push({ input: await sharp(row[i].file).resize(w, h).toBuffer(), left: x, top: y });
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${LABEL}"><text x="0" y="40" font-family="Inter" font-size="30" fill="#eee">${esc(row[i].label)}</text></svg>`;
    composites.push({ input: Buffer.from(svg), left: x, top: y + h + 6 });
    x += w + GAP;
  }
  y += h + LABEL + GAP;
}
const H = y + PAD - GAP;
const title = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${TITLE}"><text x="${PAD}" y="70" font-family="Inter" font-weight="600" font-size="48" fill="#fff">${esc(layout.title)}</text></svg>`;
composites.unshift({ input: Buffer.from(title), left: 0, top: PAD - 10 });
await sharp({ create: { width: W, height: H, channels: 3, background: "#1b1b1b" } })
  .composite(composites).jpeg({ quality: 88, mozjpeg: true }).toFile(out);
console.log(out, `${W}x${H}`);
