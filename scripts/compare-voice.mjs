// Vergleicht Sprecher-Varianten per Gemini: sachlich-dokumentarisch oder meditativ/weich?
// node scripts/compare-voice.mjs <a.mp3> <b.mp3> [...]
import { GoogleGenAI } from "@google/genai";
import { readFileSync } from "node:fs";
import { logApiCall } from "./lib/assets.mjs";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY });
const model = "gemini-3-flash-preview";
const files = process.argv.slice(2);
const parts = files.flatMap((f, i) => [{ text: `Aufnahme ${i + 1} (${f}):` }, { inlineData: { mimeType: "audio/mpeg", data: readFileSync(f).toString("base64") } }]);
const prompt = `Du bist Tonregisseur einer BBC-Naturdokumentation. Alle Aufnahmen sprechen denselben Text: "Der Elefant ist immer da. Er begleitet jeden von uns. Jeden Tag. Man muss den Entscheidungselefanten bewusst wahrnehmen."
Der Ton soll sachlich, trocken und beobachtend sein wie ein Doku-Sprecher, der eine Tatsache feststellt, ausdrücklich NICHT wie eine Meditationsanleitung (kein gehauchtes, weiches, tröstendes, langsames Sprechen, keine übertriebenen Pausen in Sätzen). Besonders kritisch ist der Satz "Er begleitet jeden von uns".
Antworte als JSON: bewertung (Liste je Aufnahme: nr, sachlich (1-10, hoch ist gut), meditativ (1-10, niedrig ist gut), satzErBegleitet (1 Satz), textRichtig (true/false), artefakte (Text oder leer)), empfehlung (nr und 1 Satz Begründung).`;
const res = await ai.models.generateContent({ model, contents: [{ role: "user", parts: [...parts, { text: prompt }] }], config: { responseMimeType: "application/json" } });
logApiCall({ phase: "7", type: "text", model, id: "compare:s7", ok: true, note: "Sprecher-Varianten vergleichen" });
console.log(res.text);
