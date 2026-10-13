// Phase 4: baut data/timeline.json aus Sprecherzeilen (data/voice/narration.json),
// gemessenen Sprechgrenzen (data/voice/bounds.json) und der Einstellungsfolge laut Shotliste.
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const cfg = JSON.parse(readFileSync("data/voice/narration.json", "utf8"));
const bounds = JSON.parse(readFileSync("data/voice/bounds.json", "utf8"));
const FPS = 24;
const r3 = (x) => Math.round(x * 1000) / 1000;

// Einstellungen je Szene laut Shotliste. dur in Sekunden; "rest" füllt die Szene bis zum Ende.
// clip: Ausschnitt aus dem Veo-Clip (from/to in Sekunden). move: Kamerabewegung laut Technik-Spalte.
const SHOTS = {
  s1: [{ id: "00", type: "black", dur: 2 }, { id: "01a", type: "still", dur: 4, move: { kind: "push", from: 1.0, to: 1.04 } },
       { id: "01b1", type: "still", dur: 2, move: { kind: "crop", scale: 1.25 } }, { id: "01b2", type: "still", dur: 2, move: { kind: "crop", scale: 1.25 } },
       { id: "01c", type: "still", dur: "rest", move: { kind: "static" } }],
  s2: [{ id: "02a", type: "still", dur: 14, move: { kind: "pan", from: 0, to: 1 } }, { id: "02b", type: "still", dur: "rest", move: { kind: "static" } }],
  s3: [{ id: "03a", type: "still", dur: 2 }, { id: "03b", type: "still", dur: 3 }, { id: "03f", type: "still", dur: 2 }, { id: "03c", type: "still", dur: 2 },
       { id: "03g", type: "still", dur: 2 }, { id: "03d", type: "still", dur: 3 }, { id: "03h", type: "still", dur: 2 }, { id: "03e", type: "still", dur: "rest" }],
  s4: [{ id: "V2", type: "clip", clip: { from: 0.5, to: 5.2 } }, { id: "04b", type: "still", dur: "rest", move: { kind: "push", from: 1.0, to: 1.1, origin: "74% 50%" } }],
  s5: [{ id: "V3", type: "clip", clip: { from: 0, to: 8 } }, { id: "V4", type: "clip", clip: { from: 0, to: 8 }, crossfadeIn: 1 }, { id: "05c", type: "still", dur: "rest", move: { kind: "static" }, crossfadeIn: 1 }],
  s6: [{ id: "06a", type: "still", dur: 2 }, { id: "V5", type: "clip", clip: { from: 0.5, to: 3.5 } }, { id: "06c", type: "still", dur: 2 }, { id: "06d", type: "still", dur: "rest" }],
  s7: [{ id: "07a", type: "still", dur: "rest", move: { kind: "push", from: 1.0, to: 1.15 } }],
  s8: [{ id: "08a", type: "still", dur: 4 }, { id: "V1", type: "clip", clip: { from: 3.0, to: 6.0 }, grade: "warm-like-08c", file: "clips/V1-warm.mp4" },
       { id: "08d", type: "still", dur: "rest", move: { kind: "crop", scale: 1.3 } }],
  end: [{ id: "End", type: "endcard", dur: "rest" }],
  coda: [{ id: "Coda", type: "coda", dur: "rest" }],
};

let t = 0;
const scenes = [];
const voice = [];
for (const sc of cfg.scenes) {
  const start = t;
  let prevEnd = start;
  for (const line of cfg.lines.filter((l) => l.scene === sc.id)) {
    const b = bounds[line.id];
    const target = line.at == null ? -Infinity : start + (line.at - sc.scriptStart);
    const speechBegin = Math.max(target, prevEnd + line.minGap);
    const fileStart = speechBegin - b.speechStart;
    prevEnd = fileStart + b.speechEnd;
    voice.push({ id: line.id, scene: sc.id, text: line.text, file: `voice/${line.id}.mp3`, start: r3(fileStart), speechStart: r3(speechBegin),
      end: r3(prevEnd), duration: r3(b.total), scriptAt: line.at, offsetToScript: line.at == null ? null : r3(speechBegin - line.at) });
  }
  const end = Math.max(start + sc.scriptDur, prevEnd + sc.tail);
  const dur = end - start;
  // Einstellungen verteilen
  const shots = [];
  const fixed = SHOTS[sc.id].reduce((s, x) => s + (x.type === "clip" ? x.clip.to - x.clip.from : x.dur === "rest" ? 0 : x.dur) - (x.dur === "rest" ? 0 : x.crossfadeIn ?? 0), 0);
  let st = start;
  // Reine Standbild-Szenen, die durch den Text länger werden: Zusatzzeit gleichmäßig auf alle Standbilder verteilen
  const stillsOnly = SHOTS[sc.id].every((x) => x.type === "still" || x.type === "black");
  const blackTime = SHOTS[sc.id].filter((x) => x.type === "black").reduce((a, x) => a + x.dur, 0);
  const restScript = sc.scriptDur - fixed;
  const stretch = stillsOnly && dur > sc.scriptDur ? (dur - blackTime) / (sc.scriptDur - blackTime) : 1;
  for (const s of SHOTS[sc.id]) {
    let d = s.type === "clip" ? s.clip.to - s.clip.from : s.dur === "rest" ? dur - fixed + (s.crossfadeIn ?? 0) : s.dur;
    if (stretch > 1 && s.type === "still") d = (s.dur === "rest" ? restScript : s.dur) * stretch;
    st -= s.crossfadeIn ?? 0;
    shots.push({ ...s, dur: undefined, start: r3(st), duration: r3(d), src: s.file ?? (s.type === "still" ? `stills/${s.id}.jpg` : s.type === "clip" ? `clips/${s.id}.mp4` : null), file: undefined });
    st += d;
  }
  const deviation = (dur - sc.scriptDur) / sc.scriptDur;
  scenes.push({ id: sc.id, name: sc.name, start: r3(start), end: r3(end), duration: r3(dur), scriptStart: sc.scriptStart, scriptDuration: sc.scriptDur,
    deviationPercent: Math.round(deviation * 1000) / 10, flag: Math.abs(deviation) > 0.1, shots });
  t = end;
}

// Einblendungen (Szenen 2 und 4): 0,3 s ein, 2,5 s sichtbar, 0,3 s aus. Zeiten relativ zum Szenenstart laut Script.
const S = Object.fromEntries(scenes.map((s) => [s.id, s]));
const overlays = [
  { scene: "s2", text: "„Das hat sich bewährt.“", at: 2 },
  { scene: "s2", text: "„Damit kenne ich mich aus.“", at: 5 },
  { scene: "s2", text: "„Dafür ist die Patientin noch nicht schwer genug.“", at: 8 },
  { scene: "s2", text: "„Ich hebe mir das für später auf.“", at: 11 },
  // Szene 4: in dem Moment, in dem der Rüssel landet (V2 bei ca. 4,6 s Clipzeit = 4,1 s nach Szenenstart)
  { scene: "s4", text: "„Da habe ich Respekt vor.“", at: 4.1 },
].map((o) => ({ ...o, start: r3(S[o.scene].start + o.at), fadeIn: 0.3, visible: 2.5, fadeOut: 0.3 }));

// Bildmaße der Standbilder (für Schwenk und Ausschnitt)
for (const sc of scenes) for (const sh of sc.shots) if (sh.type === "still") {
  const m = await sharp(`public/${sh.src}`).metadata();
  sh.width = m.width; sh.height = m.height;
}
const total = scenes[scenes.length - 1].end;
const timeline = {
  version: 1, fps: FPS, width: 1920, height: 1080, durationSeconds: r3(total), durationInFrames: Math.round(total * FPS),
  note: "Erzeugt von scripts/build-timeline.mjs. Zeiten in Sekunden ab Filmbeginn. Audiospuren music und ambience bleiben vorerst leer.",
  audioTracks: { voice: "voice", music: null, ambience: null },
  scenes, voice, overlays,
  endcard: { scene: "end", line1: "LASST UNS ÜBER ELEFANTEN REDEN.", line2: "Welcher Elefant bestimmt Ihre Entscheidung?", line1At: 0, line2At: 6, note: "Zeile 1 sofort ohne Überblendung, Zeile 2 ab 6 s darunter, beide bis zum Ende (Entscheidung 13.10.2026)" },
  coda: { scene: "coda", cardDuration: 3.5, fade: 0.3, cards: [
    { title: "Die Frage.", body: "„Was ist der größte Elefant in Ihrer Therapieentscheidung?“ auf Kongress, digital, Social, Print und Mikrosite." },
    { title: "Das Sammeln.", body: "Antworten anonym und kuratiert, am Kongress analog (Wand, Sticker), online eher als Auswahl denn als Freitext." },
    { title: "Der Elefanten-Check.", body: "Drei Fragen zur eigenen Entscheidungsroutine, mit echten Patientenfällen. Das ist die Brücke von der Haltung zur Substanz." },
    { title: "Der Außendienst.", body: "Das Gespräch beginnt bei der Frage, nicht beim Produkt." }] },
};
writeFileSync("data/timeline.json", JSON.stringify(timeline, null, 2) + "\n");
console.log("Gesamt", r3(total), "s =", Math.floor(total / 60) + ":" + String(Math.round(total % 60)).padStart(2, "0"));
for (const s of scenes) console.log(s.id.padEnd(5), `${s.start.toFixed(2)}–${s.end.toFixed(2)}`, "Dauer", s.duration.toFixed(2), "Script", s.scriptDuration, `${s.deviationPercent > 0 ? "+" : ""}${s.deviationPercent}%`, s.flag ? "  <-- über 10 %" : "");
for (const v of voice) console.log("  ", v.id, "Sprechbeginn", v.speechStart.toFixed(2), "Ende", v.end.toFixed(2), v.scriptAt != null ? `(Script ${v.scriptAt}, ${v.offsetToScript >= 0 ? "+" : ""}${v.offsetToScript})` : "");
