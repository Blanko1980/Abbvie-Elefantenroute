// Bodenausschnitt (unteres Drittel) als reine Textur-Referenz: node scripts/floor-crop.mjs <bild> <ausgabe>
import sharp from "sharp";
const [src, out] = process.argv.slice(2);
const m = await sharp(src).metadata();
const top = Math.round(m.height * 0.68);
await sharp(src).extract({ left: Math.round(m.width * 0.15), top, width: Math.round(m.width * 0.7), height: m.height - top }).jpeg({ quality: 90 }).toFile(out);
console.log(out);
