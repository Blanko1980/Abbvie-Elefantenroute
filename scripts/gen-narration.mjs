// Phase 4: Sprechertext satzweise erzeugen (Übergangskontext innerhalb der Szene).
// node scripts/gen-narration.mjs [Satz-ID ...]   (ohne IDs: alle, vorhandene Dateien werden übersprungen)
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { addManifestEntry, attemptsFor, logApiCall } from "./lib/assets.mjs";

const cfg = JSON.parse(readFileSync("data/voice/narration.json", "utf8"));
const only = process.argv.slice(2);
const dur = (f) => Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString().trim());

for (const [i, line] of cfg.lines.entries()) {
  const out = `public/voice/${line.id}.mp3`;
  if (only.length ? !only.includes(line.id) : existsSync(out)) continue;
  const same = cfg.lines.filter((l) => l.scene === line.scene);
  const j = same.findIndex((l) => l.id === line.id);
  const body = {
    text: line.ttsText ?? line.text, model_id: cfg.model, seed: line.seed, voice_settings: { ...cfg.settings, ...line.settings },
    previous_text: [line.previousText, ...same.slice(0, j).map((l) => l.text)].filter(Boolean).join(" ") || undefined,
    next_text: same.slice(j + 1).map((l) => l.text).join(" ") || undefined,
  };
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${cfg.voice.voice_id}?output_format=mp3_44100_128`, {
    method: "POST", headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY, "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  if (!res.ok) {
    logApiCall({ phase: "4", type: "speech", model: cfg.model, id: line.id, ok: false, note: `HTTP ${res.status}` });
    throw new Error(`${line.id}: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
  }
  writeFileSync(out, Buffer.from(await res.arrayBuffer()));
  const attempt = attemptsFor(line.id) + 1;
  logApiCall({ phase: "4", type: "speech", model: cfg.model, id: line.id, attempt, ok: true, note: `${line.text.length} Zeichen` });
  addManifestEntry({ id: line.id, type: "speech", attempt, timestamp: new Date().toISOString(), model: cfg.model, voice: cfg.voice.name,
    voice_id: cfg.voice.voice_id, settings: cfg.settings, prompt: line.text, refs: [], status: "zur Freigabe", file: out, duration: dur(out) });
  console.log(line.id, dur(out).toFixed(2), "s", line.text);
}
