// Erzeugt Sprecher-Varianten für einzelne Sätze mit abweichenden Einstellungen (zum Vergleichen, nicht im Film).
// node scripts/voice-variants.mjs <varianten.json>
// varianten.json: { "ids": ["s7-1", ...], "variants": { "<name>": { "settings": {...}, "previousText": "..." } } }
// Ausgabe: work/voice-test/<name>/<id>.mp3 und work/voice-test/<name>.mp3 (Sätze mit 1,5 s Pause aneinander)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { logApiCall } from "./lib/assets.mjs";

const cfg = JSON.parse(readFileSync("data/voice/narration.json", "utf8"));
const spec = JSON.parse(readFileSync(process.argv[2], "utf8"));
const lines = spec.ids.map((id) => cfg.lines.find((l) => l.id === id));

for (const [name, v] of Object.entries(spec.variants)) {
  const dir = `work/voice-test/${name}`;
  mkdirSync(dir, { recursive: true });
  for (const [j, line] of lines.entries()) {
    const prev = [v.previousText, ...lines.slice(0, j).map((l) => l.text)].filter(Boolean).join(" ");
    const body = { text: line.text, model_id: cfg.model, voice_settings: { ...cfg.settings, ...v.settings },
      previous_text: prev || undefined, next_text: lines.slice(j + 1).map((l) => l.text).join(" ") || undefined };
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${cfg.voice.voice_id}?output_format=mp3_44100_128`, {
      method: "POST", headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY, "Content-Type": "application/json" }, body: JSON.stringify(body) });
    logApiCall({ phase: "7", type: "speech", model: cfg.model, id: `${line.id}:${name}`, ok: res.ok, note: res.ok ? `${line.text.length} Zeichen, Variante` : `HTTP ${res.status}` });
    if (!res.ok) throw new Error(`${line.id}: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
    writeFileSync(`${dir}/${line.id}.mp3`, Buffer.from(await res.arrayBuffer()));
  }
  // Hörprobe: Sätze mit 1,5 s Pause
  const inputs = lines.flatMap((l) => ["-i", `${dir}/${l.id}.mp3`]);
  const n = lines.length;
  const filter = lines.map((_, i) => `[${i}:a]apad=pad_dur=1.5[a${i}]`).join(";") + ";" + lines.map((_, i) => `[a${i}]`).join("") + `concat=n=${n}:v=0:a=1[out]`;
  execFileSync("ffmpeg", ["-v", "error", "-y", ...inputs, "-filter_complex", filter, "-map", "[out]", "-b:a", "128k", `work/voice-test/${name}.mp3`]);
  console.log(name, "fertig");
}
