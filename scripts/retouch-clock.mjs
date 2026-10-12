// Lokale Retusche ohne API: setzt einen kreisförmigen Ausschnitt aus Bild A in Bild B ein.
// node scripts/retouch-clock.mjs <quelle> <ziel> <cx> <cy> <radius> <ausgabe>
import sharp from "sharp";
const [src, dst, cx, cy, r, out] = process.argv.slice(2);
const R = Number(r), size = R * 2, left = Number(cx) - R, top = Number(cy) - R;
const patch = await sharp(src).extract({ left, top, width: size, height: size }).toBuffer();
const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><defs><radialGradient id="g"><stop offset="80%" stop-color="#fff"/><stop offset="98%" stop-color="#000"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`);
const alphaMask = await sharp(mask).flatten({ background: "#000" }).extractChannel(0).raw().toBuffer();
// RGBA von Hand zusammensetzen (joinChannel mit Rohdaten ist hier unzuverlässig).
const rgb = await sharp(patch).removeAlpha().raw().toBuffer();
const rgba = Buffer.alloc(size * size * 4);
for (let i = 0; i < size * size; i++) {
  rgba[i * 4] = rgb[i * 3]; rgba[i * 4 + 1] = rgb[i * 3 + 1]; rgba[i * 4 + 2] = rgb[i * 3 + 2]; rgba[i * 4 + 3] = alphaMask[i];
}
const patchWithAlpha = await sharp(rgba, { raw: { width: size, height: size, channels: 4 } }).png().toBuffer();
await sharp(dst).composite([{ input: patchWithAlpha, left, top }]).jpeg({ quality: 92, mozjpeg: true }).toFile(out);
console.log("ok", out);
