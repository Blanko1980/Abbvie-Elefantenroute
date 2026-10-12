// Sprecherprobe: satzweise TTS mit Übergangskontext, Pausen per ffmpeg.
// node scripts/gen-voice.mjs <config.json> <voiceKey> [...]
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { addManifestEntry, logApiCall } from "./lib/assets.mjs";

const [cfgFile, ...keys] = process.argv.slice(2);
const cfg = JSON.parse(readFileSync(cfgFile, "utf8"));
const dur = (f) => Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString().trim());

async function tts(voice, line, i) {
  const out = `work/voice/${voice.key}/${line.id}.mp3`;
  if (existsSync(out)) return out; // bereits erzeugt, kein neuer Aufruf
  const body = {
    text: line.text, model_id: cfg.model, voice_settings: cfg.settings,
    previous_text: cfg.lines.slice(0, i).map((l) => l.text).join(" ") || undefined,
    next_text: cfg.lines.slice(i + 1).map((l) => l.text).join(" ") || undefined,
  };
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice.voice_id}?output_format=mp3_44100_128`, {
    method: "POST", headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY, "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = (await res.text()).slice(0, 200);
    logApiCall({ phase: "2", type: "speech", model: cfg.model, id: `voice:${voice.key}:${line.id}`, ok: false, note: `HTTP ${res.status}` });
    throw new Error(`${voice.key} ${line.id}: HTTP ${res.status} ${err}`);
  }
  writeFileSync(out, Buffer.from(await res.arrayBuffer()));
  logApiCall({ phase: "2", type: "speech", model: cfg.model, id: `voice:${voice.key}:${line.id}`, ok: true, note: `${line.text.length} Zeichen` });
  return out;
}

for (const key of keys) {
  const voice = cfg.voices.find((v) => v.key === key);
  mkdirSync(`work/voice/${key}`, { recursive: true });
  const files = [];
  for (let i = 0; i < cfg.lines.length; i++) files.push(await tts(voice, cfg.lines[i], i));
  // Startzeiten: fester Offset, sonst Ende des Vorsatzes + Mindestpause.
  let t = 0, prevEnd = 0;
  const starts = cfg.lines.map((l, i) => {
    t = Math.max(l.offset ?? 0, prevEnd + l.minGap);
    prevEnd = t + dur(files[i]);
    return t;
  });
  const out = `review/voice/${key}.mp3`;
  const inputs = files.flatMap((f) => ["-i", f]);
  const delays = files.map((_, i) => `[${i}:a]adelay=${Math.round(starts[i] * 1000)}:all=1[a${i}]`).join(";");
  const mix = files.map((_, i) => `[a${i}]`).join("") + `amix=inputs=${files.length}:normalize=0,apad=pad_dur=1[out]`;
  execFileSync("ffmpeg", ["-y", "-v", "error", ...inputs, "-filter_complex", `${delays};${mix}`, "-map", "[out]", "-ac", "2", "-b:a", "192k", out]);
  addManifestEntry({ id: `voice-sample:${key}`, type: "speech", attempt: 1, timestamp: new Date().toISOString(), model: cfg.model,
    voice: voice.name, voice_id: voice.voice_id, settings: cfg.settings, prompt: cfg.lines.map((l) => l.text).join(" | "), refs: [], status: "zur Freigabe", file: out });
  console.log(key, out, "Dauer", dur(out).toFixed(2), "s, Startzeiten", starts.map((s) => s.toFixed(2)).join(" "));
}
