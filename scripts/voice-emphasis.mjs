// Betonungskorrektur: erzeugt je Satz mehrere Varianten (Schreibweise, Kontext, Seed) und lässt Gemini die Betonung prüfen.
// node scripts/voice-emphasis.mjs <betonung.json>
// betonung.json: { "<Satz-ID>": { "target": "Beschreibung der Soll-Betonung", "variants": [ { "name", "text", "previousText"?, "seed"? } ] } }
// Ausgabe: work/voice-emph/<ID>/<name>.mp3 und work/voice-emph/<ID>/bewertung.json
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { GoogleGenAI } from "@google/genai";
import { logApiCall } from "./lib/assets.mjs";

const cfg = JSON.parse(readFileSync("data/voice/narration.json", "utf8"));
const spec = JSON.parse(readFileSync(process.argv[2], "utf8"));
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY });
const judgeModel = "gemini-3-flash-preview";

for (const [id, s] of Object.entries(spec)) {
  const line = cfg.lines.find((l) => l.id === id);
  const same = cfg.lines.filter((l) => l.scene === line.scene);
  const j = same.findIndex((l) => l.id === id);
  const dir = `work/voice-emph/${id}`;
  mkdirSync(dir, { recursive: true });
  for (const v of s.variants) {
    const prev = [v.previousText ?? line.previousText, ...same.slice(0, j).map((l) => l.text)].filter(Boolean).join(" ");
    const body = { text: v.text, model_id: cfg.model, voice_settings: { ...cfg.settings, ...line.settings }, seed: v.seed,
      previous_text: prev || undefined, next_text: same.slice(j + 1).map((l) => l.text).join(" ") || undefined };
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${cfg.voice.voice_id}?output_format=mp3_44100_128`, {
      method: "POST", headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY, "Content-Type": "application/json" }, body: JSON.stringify(body) });
    logApiCall({ phase: "8", type: "speech", model: cfg.model, id: `${id}:${v.name}`, ok: res.ok, note: res.ok ? `${v.text.length} Zeichen, Betonungsvariante` : `HTTP ${res.status}` });
    if (!res.ok) throw new Error(`${id}/${v.name}: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
    writeFileSync(`${dir}/${v.name}.mp3`, Buffer.from(await res.arrayBuffer()));
  }
  const files = [{ name: "alt", path: `public/voice/${id}.mp3` }, ...s.variants.map((v) => ({ name: v.name, path: `${dir}/${v.name}.mp3` }))];
  const parts = files.flatMap((f) => [{ text: `Aufnahme "${f.name}":` }, { inlineData: { mimeType: "audio/mpeg", data: readFileSync(f.path).toString("base64") } }]);
  const prompt = `Du bist Sprechregisseur einer deutschen BBC-Naturdokumentation. Alle Aufnahmen sprechen den Satz: "${line.text}"
Soll: ${s.target}
Höre jede Aufnahme genau. Antworte als JSON-Liste, je Aufnahme: name, gehoert (wörtliches Transkript), hauptbetonung (das Wort mit der stärksten Satzbetonung), sollErfuellt (true/false), natuerlich (1-10: klingt es wie ein ruhiger, sachlicher Doku-Sprecher, ohne übertriebene oder geschrieene Betonung?), problem (Text oder leer).`;
  const r = await ai.models.generateContent({ model: judgeModel, contents: [{ role: "user", parts: [...parts, { text: prompt }] }], config: { responseMimeType: "application/json" } });
  logApiCall({ phase: "8", type: "text", model: judgeModel, id: `betonung:${id}`, ok: true, note: "Betonung prüfen" });
  writeFileSync(`${dir}/bewertung.json`, r.text);
  console.log(`\n== ${id}: ${s.target}`);
  for (const b of JSON.parse(r.text)) console.log(`${b.name.padEnd(10)} betont: ${String(b.hauptbetonung).padEnd(24)} soll: ${b.sollErfuellt ? "ja " : "nein"} natürlich: ${b.natuerlich}  ${b.problem ?? ""}`);
}
