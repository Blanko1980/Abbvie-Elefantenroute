// Erzeugt einen Bildversuch je angegebener ID.
// Aufruf: node scripts/gen-image.mjs <shots.json> <ID> [<ID> ...] [--dry]
// Rohdaten -> work/raw, Kandidat als JPG q92 -> work/candidates/<ID>_a<n>.jpg,
// Manifest-Eintrag mit Status "zu prüfen". Freigabe/Ablehnung: scripts/review.mjs.
import { GoogleGenAI } from "@google/genai";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import sharp from "sharp";
import { addManifestEntry, attemptsFor, logApiCall, MAX_ATTEMPTS } from "./lib/assets.mjs";

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const [shotsFile, ...ids] = args.filter((a) => a !== "--dry");
const shots = JSON.parse(readFileSync(shotsFile, "utf8"));
const blocks = JSON.parse(readFileSync("data/prompt-blocks.json", "utf8"));

// Freigegebene Bilder liegen in refs/ (Referenzblätter) oder public/stills/ (Film).
// Eine Referenz mit "/" ist ein Dateipfad (z. B. ein Kandidat in work/candidates für eine Bearbeitung).
export function assetPath(id) {
  if (id.includes("/")) { if (existsSync(id)) return id; throw new Error(`Datei ${id} fehlt`); }
  for (const p of [`refs/${id}.jpg`, `public/stills/${id}.jpg`]) if (existsSync(p)) return p;
  throw new Error(`Referenzbild ${id} nicht gefunden (erst freigeben)`);
}

// Reihenfolge laut SHOTBIBLE.md: STYLE_LOCK + SET_BLOCK + ELEPHANT_BLOCK (+ Größe) + Figuren + Bildinhalt + Licht.
function buildPrompt(shot) {
  const parts = [];
  if (shot.refs?.length) {
    parts.push("Reference images, in order: " + shot.refs.map((r, i) => `image ${i + 1} = ${r.role}`).join("; ") + ".");
  }
  // Bearbeitung eines Master-Bildes: klare Änderungsanweisung, Rest bleibt gleich.
  if (shot.edit) return [...parts, "Edit image 1. " + shot.edit, blocks.STYLE_LOCK].join("\n\n");
  parts.push(blocks.STYLE_LOCK);
  if (shot.set) parts.push(blocks.SET_BLOCK);
  if (shot.elephant) parts.push(blocks.ELEPHANT_BLOCK + " Elephant size: " + blocks[shot.elephant]);
  if (shot.doctor) parts.push(blocks.DOCTOR_BLOCK);
  if (shot.patient) parts.push(blocks.PATIENT_BLOCK);
  parts.push("Shot: " + shot.content);
  if (shot.light) parts.push("Light: " + blocks[shot.light]);
  return parts.join("\n\n");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY });
mkdirSync("work/raw", { recursive: true });
mkdirSync("work/candidates", { recursive: true });

async function generate(id) {
  const shot = shots[id];
  if (!shot) throw new Error(`Unbekannte ID ${id}`);
  const attempt = attemptsFor(id) + 1;
  if (attempt > MAX_ATTEMPTS) return { id, error: `Maximal ${MAX_ATTEMPTS} Versuche erreicht` };
  const prompt = buildPrompt(shot);
  const refParts = (shot.refs ?? []).map((r) => ({
    inlineData: { mimeType: "image/jpeg", data: readFileSync(assetPath(r.id)).toString("base64") },
  }));
  if (dry) return { id, attempt, prompt, refs: shot.refs?.map((r) => r.id) };

  let res, err;
  for (let i = 0; i < 2; i++) {
    try {
      res = await ai.models.generateContent({
        model: shot.model,
        contents: [{ role: "user", parts: [...refParts, { text: prompt }] }],
        config: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: shot.aspectRatio, imageSize: shot.imageSize } },
      });
      err = null;
      break;
    } catch (e) {
      err = e;
      logApiCall({ phase: shot.phase, type: "image", model: shot.model, id, attempt, ok: false, note: String(e?.message ?? e).slice(0, 120) });
      if (!/(429|500|503|UNAVAILABLE|overloaded|fetch failed)/i.test(String(e))) break;
      await new Promise((r) => setTimeout(r, 15000));
    }
  }
  if (err) return { id, error: String(err?.message ?? err).slice(0, 300) };

  const part = res.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part) {
    const why = res.candidates?.[0]?.finishReason ?? res.promptFeedback?.blockReason ?? "keine Bilddaten";
    logApiCall({ phase: shot.phase, type: "image", model: shot.model, id, attempt, ok: false, note: String(why) });
    return { id, error: String(why) };
  }
  const raw = Buffer.from(part.inlineData.data, "base64");
  const ext = part.inlineData.mimeType.split("/")[1];
  writeFileSync(`work/raw/${id}_a${attempt}.${ext}`, raw);
  const out = `work/candidates/${id}_a${attempt}.jpg`;
  const meta = await sharp(raw).jpeg({ quality: 92, mozjpeg: true }).toFile(out);
  logApiCall({ phase: shot.phase, type: "image", model: shot.model, id, attempt, ok: true, note: `${meta.width}x${meta.height}` });
  addManifestEntry({
    id, type: "image", attempt, timestamp: new Date().toISOString(), model: shot.model,
    refs: (shot.refs ?? []).map((r) => r.id), aspectRatio: shot.aspectRatio, imageSize: shot.imageSize,
    prompt, status: "zu prüfen", file: null, width: meta.width, height: meta.height,
  });
  return { id, attempt, out, size: `${meta.width}x${meta.height}` };
}

const results = await Promise.all(ids.map((id) => generate(id).catch((e) => ({ id, error: String(e?.message ?? e) }))));
console.log(JSON.stringify(results, null, 2));
