// Erzeugt Musik mit ElevenLabs (music_v1) aus einem Kompositionsplan.
// node scripts/gen-music.mjs <plan.json> <ID> [<ID> ...]   -> work/music/<ID>_a<n>.mp3
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { addManifestEntry, attemptsFor, logApiCall } from "./lib/assets.mjs";
const [file, ...ids] = process.argv.slice(2);
const plan = JSON.parse(readFileSync(file, "utf8"));
mkdirSync("work/music", { recursive: true });
for (const id of ids) {
  const p = plan[id];
  const attempt = attemptsFor(id) + 1;
  const body = { composition_plan: p.composition_plan, model_id: "music_v1", respect_sections_durations: true };
  const res = await fetch("https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128", {
    method: "POST", headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const len = p.composition_plan.sections.reduce((a, s) => a + s.duration_ms, 0) / 1000;
  logApiCall({ phase: "8", type: "music", model: "music_v1", id, attempt, ok: res.ok, note: res.ok ? `${len} s` : `HTTP ${res.status}` });
  if (!res.ok) { console.error(id, res.status, (await res.text()).slice(0, 300)); continue; }
  const out = `work/music/${id}_a${attempt}.mp3`;
  writeFileSync(out, Buffer.from(await res.arrayBuffer()));
  addManifestEntry({ id, type: "music", attempt, timestamp: new Date().toISOString(), model: "music_v1", refs: [], prompt: JSON.stringify(p.composition_plan), status: "zu prüfen", file: null });
  console.log(out, execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out]).toString().trim(), "s");
}
