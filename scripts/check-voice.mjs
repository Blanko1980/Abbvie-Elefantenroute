// Prüft eine Sprecherprobe mit Gemini: Transkript, Aussprache, Ton.
// node scripts/check-voice.mjs <mp3> [...]
import { GoogleGenAI } from "@google/genai";
import { readFileSync } from "node:fs";
import { logApiCall } from "./lib/assets.mjs";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY });
const model = "gemini-3-flash-preview";
const prompt = `Du bist Tonregisseur für eine deutsche Naturdokumentation im Stil der BBC. Höre die Sprecherprobe.
Soll-Text: "Elefanten vergessen nichts. Sie erinnern sich an jeden Weg, der sie einmal sicher ans Ziel gebracht hat. Das ist ihre Stärke. Manchmal ist seine Vorsicht berechtigt. Und manchmal ist es nur Gewohnheit, die sich als Vorsicht ausgibt."
Antworte als JSON mit den Feldern: transcript (wörtlich), textAbweichungen (Liste), ausspracheProbleme (Liste), artefakte (Liste, z. B. Knackser, Atmer, abgeschnittene Wörter), stimme (kurze Beschreibung von Klangfarbe, Tiefe, Tempo), naturdokuEignung (1 bis 10), ruhig (1-10), warm (1-10), trocken (1-10), ironisch (1-10, niedrig ist gut), satzendenGehenNachUnten (true/false), begruendung (2 Sätze).`;
for (const f of process.argv.slice(2)) {
  const res = await ai.models.generateContent({
    model,
    contents: [{ role: "user", parts: [{ inlineData: { mimeType: "audio/mpeg", data: readFileSync(f).toString("base64") } }, { text: prompt }] }],
    config: { responseMimeType: "application/json" },
  });
  logApiCall({ phase: "2", type: "text", model, id: `check:${f}`, ok: true, note: "Sprecherprobe prüfen" });
  console.log("==", f, "\n" + res.text);
}
