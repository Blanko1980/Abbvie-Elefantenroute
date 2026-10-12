// Phase 0: minimale Testaufrufe an Gemini und ElevenLabs.
// Schlüssel nur aus Umgebungsvariablen, Werte werden nie ausgegeben.
import { GoogleGenAI } from "@google/genai";
import { writeFileSync, mkdirSync } from "node:fs";

const out = process.argv[2] ?? "/tmp/preflight";
mkdirSync(out, { recursive: true });
const result = {};

// Gemini: ein kleines Testbild (1K) mit dem Standardmodell für Standbilder.
const geminiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
try {
  const ai = new GoogleGenAI({ apiKey: geminiKey });
  const t0 = Date.now();
  const res = await ai.models.generateContent({
    model: "gemini-3.1-flash-image",
    contents: "A plain light grey ceramic cup on a light oak table, soft daylight. No text.",
    config: {
      responseModalities: ["IMAGE"],
      imageConfig: { aspectRatio: "16:9", imageSize: "1K" },
    },
  });
  const part = res.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part) throw new Error("Keine Bilddaten in der Antwort: " + JSON.stringify(res.candidates?.[0]?.finishReason));
  const buf = Buffer.from(part.inlineData.data, "base64");
  writeFileSync(`${out}/gemini-test.${part.inlineData.mimeType.split("/")[1]}`, buf);
  result.gemini = { ok: true, model: "gemini-3.1-flash-image", mime: part.inlineData.mimeType, bytes: buf.length, ms: Date.now() - t0 };
} catch (e) {
  result.gemini = { ok: false, error: String(e?.message ?? e).slice(0, 500) };
}

// ElevenLabs: Kontoinfo (kostenlos), Modellliste, ein sehr kurzer TTS-Aufruf.
const elKey = process.env.ELEVENLABS_API_KEY;
const el = (path, init = {}) =>
  fetch(`https://api.elevenlabs.io${path}`, { ...init, headers: { "xi-api-key": elKey, ...(init.headers ?? {}) } });
try {
  const sub = await el("/v1/user/subscription");
  const subJson = sub.ok ? await sub.json() : null;
  const models = await el("/v1/models");
  const modelsJson = models.ok ? await models.json() : [];
  const voices = await el("/v2/voices?page_size=5");
  const voicesJson = voices.ok ? await voices.json() : null;
  const voiceId = voicesJson?.voices?.[0]?.voice_id ?? "JBFqnCBsd6RMkjVDRZzb";
  const t0 = Date.now();
  const tts = await el(`/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: "Das ist ein Test.", model_id: "eleven_multilingual_v2" }),
  });
  let ttsInfo;
  if (tts.ok) {
    const buf = Buffer.from(await tts.arrayBuffer());
    writeFileSync(`${out}/elevenlabs-test.mp3`, buf);
    ttsInfo = { ok: true, bytes: buf.length, ms: Date.now() - t0 };
  } else {
    ttsInfo = { ok: false, status: tts.status, body: (await tts.text()).slice(0, 300) };
  }
  result.elevenlabs = {
    subscriptionStatus: sub.status,
    tier: subJson?.tier,
    characters: subJson ? { used: subJson.character_count, limit: subJson.character_limit } : null,
    modelsStatus: models.status,
    ttsModels: Array.isArray(modelsJson) ? modelsJson.filter((m) => m.can_do_text_to_speech).map((m) => m.model_id) : [],
    voicesStatus: voices.status,
    voiceCount: voicesJson?.total_count,
    tts: ttsInfo,
  };
} catch (e) {
  result.elevenlabs = { ok: false, error: String(e?.message ?? e).slice(0, 500) };
}

console.log(JSON.stringify(result, null, 2));
