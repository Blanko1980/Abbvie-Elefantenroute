// Lokale Farbkorrektur ohne API: gleicht Mittelwert und Streuung je Kanal an ein Referenzbild an.
// node scripts/color-match.mjs <bild> <referenz> <ausgabe>
import sharp from "sharp";
const [src, ref, out] = process.argv.slice(2);
const [a, b] = await Promise.all([sharp(src).stats(), sharp(ref).stats()]);
const mul = [0, 1, 2].map((i) => b.channels[i].stdev / a.channels[i].stdev);
const add = [0, 1, 2].map((i) => b.channels[i].mean - a.channels[i].mean * mul[i]);
await sharp(src).removeAlpha().linear(mul, add).jpeg({ quality: 92, mozjpeg: true }).toFile(out);
console.log(out, "mul", mul.map((x) => x.toFixed(3)).join(" "), "add", add.map((x) => x.toFixed(1)).join(" "));
