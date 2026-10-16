// Wortgrenzen per ElevenLabs Forced Alignment: node scripts/align-words.mjs <audio.mp3> "<Text>" <ausgabe.json>
import { readFileSync, writeFileSync } from "node:fs";
import { logApiCall } from "./lib/assets.mjs";
const [audio, text, out] = process.argv.slice(2);
const fd = new FormData();
fd.append("file", new Blob([readFileSync(audio)], { type: "audio/mpeg" }), "a.mp3");
fd.append("text", text);
const res = await fetch("https://api.elevenlabs.io/v1/forced-alignment", { method: "POST", headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY }, body: fd });
logApiCall({ phase: "8", type: "text", model: "forced-alignment", id: `align:${audio}`, ok: res.ok, note: res.ok ? "Wortgrenzen" : `HTTP ${res.status}` });
if (!res.ok) throw new Error(`HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
const j = await res.json();
writeFileSync(out, JSON.stringify(j.words, null, 1));
