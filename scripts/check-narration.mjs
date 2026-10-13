// Prüft die Sprecher-Hörprobe mit Gemini gegen den Soll-Text (Transkript, Aussprache, Ton).
import { GoogleGenAI } from "@google/genai";
import { readFileSync } from "node:fs";
import { logApiCall } from "./lib/assets.mjs";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY });
const model = "gemini-3-flash-preview";
const lines = JSON.parse(readFileSync("data/voice/narration.json", "utf8")).lines.map((l) => `${l.id}: ${l.text}`).join("\n");
const prompt = `Du bist Tonregisseur für eine deutsche Naturdokumentation im Stil der BBC. Höre die komplette Sprecherspur (mit langen Pausen dazwischen).
Soll-Text, Satz für Satz:
${lines}
Antworte als JSON: saetze (Liste mit id, gehoert (wörtlich), abweichung (true/false), ausspracheProblem (Text oder leer)), artefakte (Liste mit ungefährer Zeit und Beschreibung), tonGesamt (1 Satz), konsistenzZwischenSaetzen (1 Satz: klingen alle Sätze wie dieselbe Aufnahme?), ironisch (1-10, niedrig ist gut).`;
const res = await ai.models.generateContent({ model, contents: [{ role: "user", parts: [{ inlineData: { mimeType: "audio/mpeg", data: readFileSync(process.argv[2]).toString("base64") } }, { text: prompt }] }], config: { responseMimeType: "application/json" } });
logApiCall({ phase: "4", type: "text", model, id: `check:${process.argv[2]}`, ok: true, note: "Sprecherspur prüfen" });
console.log(res.text);
