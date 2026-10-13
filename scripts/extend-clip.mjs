// Verlängert einen bereits erzeugten Veo-Clip um 7 Sekunden (Veo-Verlängerung, 720p).
// Nutzt die im Manifest gespeicherte Video-Referenz (videoUri) und den Verlängerungs-Prompt aus der Clip-Definition.
// node scripts/extend-clip.mjs <clips.json> <ID> <Versuch>
import { GoogleGenAI } from "@google/genai";
import { readFileSync, copyFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { loadManifest, saveManifest, logApiCall } from "./lib/assets.mjs";

const [file, id, attemptStr] = process.argv.slice(2);
const attempt = Number(attemptStr);
const clip = JSON.parse(readFileSync(file, "utf8"))[id];
const entry = loadManifest().assets.find((a) => a.id === id && a.attempt === attempt);
if (!entry?.videoUri) { console.error("Keine Video-Referenz im Manifest"); process.exit(1); }
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY });

let video = null;
for (let tryNo = 1; tryNo <= 4 && !video; tryNo++) {
  try {
    let op = await ai.models.generateVideos({ model: clip.model, source: { prompt: clip.extend.prompt, video: { uri: entry.videoUri } },
      config: { resolution: "720p", negativePrompt: clip.negativePrompt, numberOfVideos: 1 } });
    while (!op.done) { await new Promise((r) => setTimeout(r, 10000)); op = await ai.operations.getVideosOperation({ operation: op }); }
    video = op.response?.generatedVideos?.[0]?.video;
    const why = JSON.stringify(op.error ?? "kein Video").slice(0, 140);
    logApiCall({ phase: clip.phase, type: "clip", model: clip.model, id, attempt, ok: !!video, note: video ? "Verlängerung +7s 720p" : `Verlängerung: ${why}` });
    if (!video) console.error(id, "Verlängerung ohne Video:", why);
  } catch (e) {
    const msg = String(e?.message ?? e);
    logApiCall({ phase: clip.phase, type: "clip", model: clip.model, id, attempt, ok: false, note: `Verlängerung: ${msg.slice(0, 140)}` });
    console.error(id, "Verlängerung:", msg.slice(0, 300));
  }
  if (!video) await new Promise((r) => setTimeout(r, 45000 * tryNo));
}
if (!video) process.exit(1);
const out = `work/candidates/${id}_a${attempt}.mp4`;
copyFileSync(out, `work/candidates/${id}_a${attempt}_basis.mp4`);
await ai.files.download({ file: video, downloadPath: out });
const m = loadManifest();
Object.assign(m.assets.find((a) => a.id === id && a.attempt === attempt), { videoUri: video.uri ?? null, extendPrompt: clip.extend.prompt, extended: true });
saveManifest(m);
execFileSync("ffmpeg", ["-y", "-v", "error", "-i", out, "-vf", "fps=1,scale=480:-1,tile=4x4", "-frames:v", "1", `work/preview/${id}_a${attempt}_strip.jpg`]);
console.log(out, execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out]).toString().trim());
