// Erzeugt Veo-Clips (Image-to-Video). Mit "end" als Start- und Endbild, ohne "end" nur ab Startbild.
// "crop" ({ scale } um die Bildmitte) oder "region" ({ left, top, width, height } in Pixeln) schneidet das Startbild zu.
// "extend" verlängert den fertigen Clip einmal um 7 Sekunden (Veo-Verlängerung, nur 720p).
// node scripts/gen-clip.mjs <clips.json> <ID> [<ID> ...] [--parallel N]
// Alle IDs laufen in einem Prozess, damit Manifest und API-Log nicht gleichzeitig beschrieben werden.
import { GoogleGenAI } from "@google/genai";
import { readFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import sharp from "sharp";
import { addManifestEntry, attemptsFor, attemptsInRound, logApiCall, setStatus, loadManifest, saveManifest, MAX_ATTEMPTS } from "./lib/assets.mjs";

const args = process.argv.slice(2);
const pi = args.indexOf("--parallel");
const parallel = pi >= 0 ? Number(args.splice(pi, 2)[1]) : 1;
const [file, ...ids] = args;
const clips = JSON.parse(readFileSync(file, "utf8"));
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY });

// Start- und Endbild auf die Ausgabegröße bringen.
const frame = async (sid, clip, cropped) => {
  const size = clip.resolution === "1080p" ? [1920, 1080] : [1280, 720];
  let img = sharp(cropped && clip.startFile ? clip.startFile : `public/stills/${sid}.jpg`);
  if (cropped && clip.region) img = img.extract(clip.region);
  else if (cropped && clip.crop) {
    const { width, height } = await img.metadata();
    const w = Math.round(width / clip.crop.scale), h = Math.round(height / clip.crop.scale);
    img = img.extract({ left: Math.round((width - w) / 2), top: Math.round((height - h) / 2), width: w, height: h });
  }
  const buf = await img.resize(size[0], size[1], { fit: "cover" }).jpeg({ quality: 95 }).toBuffer();
  return { imageBytes: buf.toString("base64"), mimeType: "image/jpeg" };
};

async function waitFor(op) {
  while (!op.done) {
    await new Promise((r) => setTimeout(r, 10000));
    op = await ai.operations.getVideosOperation({ operation: op });
  }
  return op;
}

const videoOf = (op) => op.response?.generatedVideos?.[0]?.video;
const whyNot = (op) => JSON.stringify(op.error ?? op.response?.raiMediaFilteredReasons ?? "kein Video").slice(0, 200);

async function genOne(id) {
  const clip = clips[id];
  const round = clip.round ?? 1;
  if (attemptsInRound(id, round) >= MAX_ATTEMPTS) { console.error(`${id}: maximal ${MAX_ATTEMPTS} Versuche erreicht`); return; }
  const attempt = attemptsFor(id) + 1;
  const log = (ok, note, extra = {}) => logApiCall({ phase: clip.phase, type: "clip", model: clip.model, id, attempt, ok, note, ...extra });
  addManifestEntry({ id, type: "clip", attempt, round, timestamp: new Date().toISOString(), model: clip.model,
    refs: clip.end ? [clip.start, clip.end] : [clip.start], crop: clip.crop ?? clip.region ?? null,
    prompt: clip.prompt, extendPrompt: clip.extend?.prompt ?? null, negativePrompt: clip.negativePrompt,
    durationSeconds: clip.durationSeconds, resolution: clip.resolution, status: "zu prüfen", file: null });

  let op;
  try {
    const config = { durationSeconds: clip.durationSeconds, resolution: clip.resolution, aspectRatio: clip.aspectRatio,
      negativePrompt: clip.negativePrompt, numberOfVideos: 1 };
    if (clip.end) config.lastFrame = await frame(clip.end, clip, false);
    op = await waitFor(await ai.models.generateVideos({ model: clip.model,
      source: { prompt: clip.prompt, image: await frame(clip.start, clip, true) }, config }));
  } catch (e) {
    log(false, String(e?.message ?? e).slice(0, 150));
    setStatus(id, attempt, "abgelehnt", "API-Fehler, kein Video");
    console.error(id, String(e?.message ?? e).slice(0, 800));
    return;
  }
  if (!videoOf(op)) { log(false, whyNot(op)); setStatus(id, attempt, "abgelehnt", "kein Video"); console.error(id, "kein Video:", whyNot(op)); return; }
  log(true, `${clip.durationSeconds}s ${clip.resolution}`);

  if (clip.extend) {
    // Veo nimmt den Clip erst an, wenn er serverseitig verarbeitet ist; bei Fehlern bis zu 3 Anläufe mit Wartezeit.
    for (let tryNo = 1; tryNo <= 3; tryNo++) {
      await new Promise((r) => setTimeout(r, 30000 * tryNo));
      try {
        const ext = await waitFor(await ai.models.generateVideos({ model: clip.model,
          source: { prompt: clip.extend.prompt, video: videoOf(op) },
          config: { resolution: "720p", negativePrompt: clip.negativePrompt, numberOfVideos: 1 } }));
        if (videoOf(ext)) { log(true, "Verlängerung +7s 720p"); op = ext; break; }
        log(false, `Verlängerung: ${whyNot(ext)}`); console.error(id, "Verlängerung ohne Video:", whyNot(ext));
      } catch (e) {
        const msg = String(e?.message ?? e);
        log(false, `Verlängerung: ${msg.slice(0, 140)}`); console.error(id, "Verlängerung:", msg.slice(0, 300));
      }
    }
  }
  const m = loadManifest();
  Object.assign(m.assets.find((a) => a.id === id && a.attempt === attempt), { videoUri: videoOf(op).uri ?? null });
  saveManifest(m);

  mkdirSync("work/candidates", { recursive: true }); mkdirSync("work/preview", { recursive: true });
  const out = `work/candidates/${id}_a${attempt}.mp4`;
  await ai.files.download({ file: videoOf(op), downloadPath: out });
  // Kontaktstreifen aus einem Bild je Sekunde zum Prüfen.
  execFileSync("ffmpeg", ["-y", "-v", "error", "-i", out, "-vf", "fps=1,scale=480:-1,tile=4x4", "-frames:v", "1", `work/preview/${id}_a${attempt}_strip.jpg`]);
  console.log(out, execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out]).toString().trim());
}

// Einfache Warteschlange mit begrenzter Parallelität.
const queue = [...ids];
await Promise.all(Array.from({ length: Math.min(parallel, queue.length) }, async () => {
  while (queue.length) await genOne(queue.shift());
}));
