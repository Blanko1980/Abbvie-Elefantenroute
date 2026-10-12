// Prüfraster: node scripts/grid.mjs <ausgabe> <bild> [...] (2 Spalten, je 1000 px breit)
import sharp from "sharp";
const [out, ...files] = process.argv.slice(2);
const W = 1000, cols = 2;
const tiles = await Promise.all(files.map(async (f) => sharp(f).resize({ width: W }).toBuffer({ resolveWithObject: true })));
const rowH = [];
for (let i = 0; i < tiles.length; i += cols) rowH.push(Math.max(...tiles.slice(i, i + cols).map((t) => t.info.height)));
const comps = []; let y = 0;
rowH.forEach((h, r) => { for (let c = 0; c < cols && r * cols + c < tiles.length; c++) comps.push({ input: tiles[r * cols + c].data, left: c * (W + 10), top: y }); y += h + 10; });
await sharp({ create: { width: cols * W + 10, height: y, channels: 3, background: "#000" } }).composite(comps).jpeg({ quality: 85 }).toFile(out);
console.log(out);
