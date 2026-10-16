// Beschreibt ein Musikstück per Gemini (Charakter, Instrumente, Verlauf): node scripts/check-music.mjs <musik.mp3> "<Soll>"
import { readFileSync } from "node:fs";
import { GoogleGenAI } from "@google/genai";
import { logApiCall } from "./lib/assets.mjs";
const [f, soll] = process.argv.slice(2);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY });
const r = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: [{ role: "user", parts: [{ inlineData: { mimeType: "audio/mpeg", data: readFileSync(f).toString("base64") } },
  { text: `Du bist Musikberater für eine BBC-Naturdokumentation. Soll: ${soll}\nHöre das Stück. Antworte als JSON: charakter (1 Satz), tonart (Dur/Moll/unklar), traurigOderTragisch (1-10, niedrig ist gut), naturdokuTypisch (1-10), haltetoeneOderDrone (true/false), instrumente (Liste), verlauf (Liste mit ungefährer Sekunde und Beschreibung), ende (1 Satz), artefakte (Text oder leer).` }] }], config: { responseMimeType: "application/json" } });
logApiCall({ phase: "8", type: "text", model: "gemini-3-flash-preview", id: `musik:${f}`, ok: true, note: "Musik prüfen" });
console.log(r.text);
