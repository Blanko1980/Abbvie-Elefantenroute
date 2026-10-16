// Phase 4: baut data/timeline.json aus Sprecherzeilen (data/voice/narration.json),
// gemessenen Sprechgrenzen (data/voice/bounds.json) und der Einstellungsfolge laut Shotliste.
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";
import { execFileSync } from "node:child_process";

const cfg = JSON.parse(readFileSync("data/voice/narration.json", "utf8"));
const bounds = JSON.parse(readFileSync("data/voice/bounds.json", "utf8"));
const FPS = 24;
const r3 = (x) => Math.round(x * 1000) / 1000;

// Einstellungen je Szene laut Shotliste. dur in Sekunden; "rest" füllt die Szene bis zum Ende.
// clip: Ausschnitt aus dem Veo-Clip (from/to in Sekunden). move: Kamerabewegung laut Technik-Spalte.
// Ab 13.10.2026 ist jede Einstellung ein Veo-Clip. Clips mit "dur" sind flexibel (Ausschnitt ab "from"),
// Clips ohne "dur" haben ein festes Fenster from/to.
const C = (id, from, dur, extra = {}) => ({ id, type: "clip", clip: { from }, dur, ...extra });
const SHOTS = {
  s1: [{ id: "00", type: "black", dur: 2 }, C("V01a", 0, 4), C("V01b1", 0, 2), C("V01b2", 0, 2), C("V01c", 0, "rest")],
  // 16.10.2026: Elefant wächst von Pony- auf Arztgröße. V02a ab 4,2 s (davor Wandecke im Vorderbild), V02a2 setzt am letzten Bild an und endet auf 02b.
  s2: [{ id: "V02a", type: "clip", clip: { from: 4.2, to: 8.0 } }, { id: "V02a2", type: "clip", clip: { from: 1 / 24, to: 8.0 } }, C("V02b", 0, "rest")],
  s3: [C("V03a", 0, 2), C("V03b", 0, 3), C("V03f", 0, 2), C("V03c", 0, 2), C("V03g", 0, 2), C("V03h", 0, 2), C("V03e", 0, "rest")],
  s4: [{ id: "V2", type: "clip", clip: { from: 3.0, to: 5.2 } }, C("V04b", 0, "rest", { move: { kind: "push", from: 1.0, to: 1.1, origin: "74% 50%" } })],
  s5: [{ id: "V3", type: "clip", clip: { from: 0, to: 8 } }, { id: "V4", type: "clip", clip: { from: 0, to: 8 }, crossfadeIn: 1 }, C("V05c", 0, "rest", { crossfadeIn: 1 })],
  s6: [C("V06a", 0, 2), { id: "V5", type: "clip", clip: { from: 0.5, to: 3.5 } }, C("V06c", 0, 2), C("V06d", 0, "rest")],
  // V07b setzt am letzten Bild von V07a an (Veo-Verlängerung scheiterte serverseitig); erstes Bild übersprungen.
  // V07b setzt am letzten Bild von V07a an (Veo-Verlängerung scheiterte serverseitig); erstes Bild übersprungen.
  // V07b hat eine feste Kamera, die Fahrt aus V07a läuft in Remotion mit Tempo weiter.
  s7: [C("V07a", 0, 8), C("V07b", 1 / 24, "rest", { move: { kind: "push", from: 1.0, to: 1.06, ease: "out" } })],
  // 16.10.2026: 08a gestrichen, V1 ungegradet, V08d an die Lichtstimmung von V07a angeglichen (scripts/grade-clip.py)
  s8: [{ id: "V1", type: "clip", clip: { from: 3.0, to: 6.0 } }, C("V08d", 0, "rest")],
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
  const flex = (x) => x.type === "still" || (x.type === "clip" && x.dur != null);
  const lenOf = (x) => (x.type === "clip" && x.dur == null ? x.clip.to - x.clip.from : x.dur);
  const fixed = SHOTS[sc.id].reduce((s, x) => s + (x.dur === "rest" ? 0 : lenOf(x) - (x.crossfadeIn ?? 0)), 0);
  let st = start;
  // Szenen nur aus flexiblen Einstellungen, die durch den Text länger werden: Zusatzzeit gleichmäßig verteilen
  const flexOnly = SHOTS[sc.id].every((x) => flex(x) || x.type === "black");
  const blackTime = SHOTS[sc.id].filter((x) => x.type === "black").reduce((a, x) => a + x.dur, 0);
  const restScript = sc.scriptDur - fixed;
  const stretch = flexOnly && dur > sc.scriptDur ? (dur - blackTime) / (sc.scriptDur - blackTime) : 1;
  for (const s of SHOTS[sc.id]) {
    let d = s.dur === "rest" ? dur - fixed + (s.crossfadeIn ?? 0) : lenOf(s);
    if (stretch > 1 && flex(s)) d = (s.dur === "rest" ? restScript : s.dur) * stretch;
    st -= s.crossfadeIn ?? 0;
    const src = s.file ?? (s.type === "still" ? `stills/${s.id}.jpg` : s.type === "clip" ? `clips/${s.id}.mp4` : null);
    let clip = s.clip;
    if (s.type === "clip") {
      clip = { from: s.clip.from, to: r3(s.clip.from + d) };
      const len = Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", `public/${src}`]).toString());
      if (clip.to > len + 0.01) throw new Error(`${s.id}: Ausschnitt bis ${clip.to} s, Clip hat nur ${len} s`);
    }
    shots.push({ ...s, dur: undefined, start: r3(st), duration: r3(d), src, file: undefined, clip });
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
].map((o) => ({ ...o, start: r3(S[o.scene].start + o.at), fadeIn: 0.3, visible: 2.5, fadeOut: 0.3 }))
  // Entscheidung 13.10.2026: keine Einblendungen beim Elefanten im finalen Film
  .filter(() => false);

// Bildmaße der Standbilder (für Schwenk und Ausschnitt)
for (const sc of scenes) for (const sh of sc.shots) if (sh.type === "still") {
  const m = await sharp(`public/${sh.src}`).metadata();
  sh.width = m.width; sh.height = m.height;
}
const total = scenes[scenes.length - 1].end;
// Musik: Einsätze aus data/music/mix.json, Zeiten aus den Szenen
const mix = JSON.parse(readFileSync("data/music/mix.json", "utf8"));
const music = { duckDb: mix.duckDb, duckLead: mix.duckLead, duckTail: mix.duckTail, duckRamp: mix.duckRamp,
  cues: mix.cues.map((c) => ({ id: c.id, file: `music/${c.id}.mp3`, start: r3(S[c.startScene].start + c.startOffset), gainDb: c.gainDb,
    cutAt: c.cutScene ? r3(S[c.cutScene].start + (c.cutOffset ?? 0)) : null, fadeOut: c.fadeOut ?? 0 })) };
const timeline = {
  version: 1, fps: FPS, width: 1920, height: 1080, durationSeconds: r3(total), durationInFrames: Math.round(total * FPS),
  note: "Erzeugt von scripts/build-timeline.mjs. Zeiten in Sekunden ab Filmbeginn. Die Spur ambience bleibt vorerst leer.",
  audioTracks: { voice: "voice", music: "music", ambience: null },
  scenes, voice, overlays, music,
  endcard: { scene: "end", line1: "LASST UNS ÜBER ELEFANTEN REDEN.", line2: null, line1At: 0, line2At: null, note: "Nur Zeile 1, 4 s, danach Ende; Zeile 2 und Coda entfallen (Entscheidung 16.10.2026)" },
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
