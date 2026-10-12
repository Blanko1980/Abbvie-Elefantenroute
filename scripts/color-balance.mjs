// Lokale Lichtangleichung ohne API: überträgt nur die Farbbalance (Kanal/Luminanz-Verhältnis)
// eines Referenzbilds, Helligkeit und Kontrast bleiben. node scripts/color-balance.mjs <bild> <referenz> <ausgabe> [stärke 0..1]
import sharp from "sharp";
const [src, ref, out, strengthArg] = process.argv.slice(2);
const k = Number(strengthArg ?? 1);
const ratio = async (f) => { const c = (await sharp(f).stats()).channels.slice(0, 3).map((x) => x.mean); const L = (c[0] + c[1] + c[2]) / 3; return c.map((x) => x / L); };
const [a, b] = await Promise.all([ratio(src), ratio(ref)]);
const mul = a.map((x, i) => 1 + k * (b[i] / x - 1));
await sharp(src).removeAlpha().linear(mul, [0, 0, 0]).jpeg({ quality: 92, mozjpeg: true }).toFile(out);
console.log(out, "mul", mul.map((x) => x.toFixed(3)).join(" "));
