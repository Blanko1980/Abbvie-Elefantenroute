// Erzeugt einen Veo-Clip (Image-to-Video mit Start- und Endbild).
// node scripts/gen-clip.mjs <clips.json> <ID>
import { GoogleGenAI } from "@google/genai";
import { readFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import sharp from "sharp";
import { addManifestEntry, attemptsFor, attemptsInRound, logApiCall, MAX_ATTEMPTS } from "./lib/assets.mjs";

const [file, id] = process.argv.slice(2);
const clip = JSON.parse(readFileSync(file, "utf8"))[id];
const round = clip.round ?? 1;
if (attemptsInRound(id, round) >= MAX_ATTEMPTS) { console.error(`Maximal ${MAX_ATTEMPTS} Versuche erreicht`); process.exit(1); }
const attempt = attemptsFor(id) + 1;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY });

// Start- und Endbild auf die Ausgabegröße bringen.
const size = clip.resolution === "1080p" ? [1920, 1080] : [1280, 720];
const frame = async (sid) => ({
  imageBytes: (await sharp(`public/stills/${sid}.jpg`).resize(size[0], size[1], { fit: "cover" }).jpeg({ quality: 95 }).toBuffer()).toString("base64"),
  mimeType: "image/jpeg",
});

let op;
try {
  op = await ai.models.generateVideos({
    model: clip.model, source: { prompt: clip.prompt, image: await frame(clip.start) },
    config: { lastFrame: await frame(clip.end), durationSeconds: clip.durationSeconds, resolution: clip.resolution,
      aspectRatio: clip.aspectRatio, negativePrompt: clip.negativePrompt, numberOfVideos: 1 },
  });
} catch (e) {
  logApiCall({ phase: clip.phase, type: "clip", model: clip.model, id, attempt, ok: false, note: String(e?.message ?? e).slice(0, 150) });
  console.error(String(e?.message ?? e).slice(0, 800));
  process.exit(1);
}
const t0 = Date.now();
while (!op.done) {
  await new Promise((r) => setTimeout(r, 10000));
  op = await ai.operations.getVideosOperation({ operation: op });
  process.stdout.write(".");
}
console.log(` ${(Date.now() - t0) / 1000}s`);
const vid = op.response?.generatedVideos?.[0]?.video;
if (!vid) {
  const why = JSON.stringify(op.error ?? op.response?.raiMediaFilteredReasons ?? "kein Video").slice(0, 200);
  logApiCall({ phase: clip.phase, type: "clip", model: clip.model, id, attempt, ok: false, note: why });
  console.error("Kein Video:", why);
  process.exit(1);
}
mkdirSync("work/candidates", { recursive: true }); mkdirSync("work/preview", { recursive: true });
const out = `work/candidates/${id}_a${attempt}.mp4`;
await ai.files.download({ file: vid, downloadPath: out });
logApiCall({ phase: clip.phase, type: "clip", model: clip.model, id, attempt, ok: true, note: `${clip.durationSeconds}s ${clip.resolution}` });
addManifestEntry({ id, type: "clip", attempt, round, timestamp: new Date().toISOString(), model: clip.model, refs: [clip.start, clip.end],
  prompt: clip.prompt, negativePrompt: clip.negativePrompt, durationSeconds: clip.durationSeconds, resolution: clip.resolution, status: "zu prüfen", file: null });
// Kontaktstreifen aus 6 Frames zum Prüfen.
execFileSync("ffmpeg", ["-y", "-v", "error", "-i", out, "-vf", "fps=1,scale=640:-1,tile=4x2", "-frames:v", "1", `work/preview/${id}_a${attempt}_strip.jpg`]);
console.log(out, execFileSync("ffprobe", ["-v", "error", "-show_entries", "stream=codec_type,width,height,r_frame_rate:format=duration", "-of", "compact", out]).toString());
