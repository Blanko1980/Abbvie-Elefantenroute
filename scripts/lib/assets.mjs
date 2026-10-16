// Gemeinsame Helfer: Manifest, API-Log, Pfade.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

export const MANIFEST = "data/manifest.json";
export const API_CALLS = "data/api-calls.json";
export const API_LOG_MD = "review/api-log.md";
export const MAX_ATTEMPTS = 3;

const readJson = (p, fallback) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : fallback);
const writeJson = (p, v) => writeFileSync(p, JSON.stringify(v, null, 2) + "\n");

export const loadManifest = () => readJson(MANIFEST, { version: 1, assets: [] });
export const saveManifest = (m) => writeJson(MANIFEST, m);

// Versuchsnummer läuft je ID fort. Das Limit gilt je Runde: Eine neue Runde beginnt nur,
// wenn sich die Vorgabe nach Feedback ändert (Feld "round" in der Shot-Definition).
export function attemptsFor(id) {
  return loadManifest().assets.filter((a) => a.id === id).length;
}

export function attemptsInRound(id, round = 1) {
  // Nicht gezählt werden Aufrufe, die kein Ergebnis geliefert haben (API-Fehler oder Filter, nicht berechnet).
  const noResult = new Set(["API-Fehler, kein Video", "kein Video"]);
  return loadManifest().assets.filter((a) => a.id === id && (a.round ?? 1) === round && !noResult.has(a.note)).length;
}

export function addManifestEntry(entry) {
  const m = loadManifest();
  m.assets.push(entry);
  saveManifest(m);
}

export function setStatus(id, attempt, status, note) {
  const m = loadManifest();
  const e = m.assets.find((a) => a.id === id && a.attempt === attempt);
  if (!e) throw new Error(`Kein Manifest-Eintrag ${id} Versuch ${attempt}`);
  e.status = status;
  if (note) e.note = note;
  saveManifest(m);
  return e;
}

// Jeder kostenpflichtige Aufruf wird protokolliert, auch fehlgeschlagene.
export function logApiCall(call) {
  const calls = readJson(API_CALLS, []);
  calls.push({ timestamp: new Date().toISOString(), ...call });
  writeJson(API_CALLS, calls);
  renderApiLog(calls);
}

const TYPE_LABEL = { image: "Bild", clip: "Clip", speech: "Sprache", music: "Musik", text: "Text (Prüfung)" };

export function renderApiLog(calls = readJson(API_CALLS, [])) {
  const sum = { image: 0, clip: 0, speech: 0, music: 0, text: 0 };
  const byPhase = {};
  for (const c of calls) {
    sum[c.type]++;
    byPhase[c.phase] ??= { image: 0, clip: 0, speech: 0, music: 0, text: 0 };
    byPhase[c.phase][c.type]++;
  }
  const lines = [
    "# API-Log",
    "",
    "Zählt alle kostenpflichtigen Aufrufe, auch fehlgeschlagene. Kostenlose Abfragen (Modell- und Stimmenlisten) sind nicht mitgezählt. Erzeugt aus `data/api-calls.json`.",
    "",
    `**Summe:** ${sum.image} Bild, ${sum.clip} Clip, ${sum.speech} Sprache, ${sum.music} Musik, ${sum.text} Text (Prüfaufrufe)`,
    "",
    "| Phase | Bild | Clip | Sprache | Musik | Text |",
    "| --- | ---: | ---: | ---: | ---: | ---: |",
    ...Object.entries(byPhase).map(([p, s]) => `| ${p} | ${s.image} | ${s.clip} | ${s.speech} | ${s.music} | ${s.text} |`),
    "",
    "## Einzelaufrufe",
    "",
    "| Zeit (UTC) | Phase | Art | Modell | Asset | Versuch | Ergebnis | Notiz |",
    "| --- | --- | --- | --- | --- | ---: | --- | --- |",
    ...calls.map((c) =>
      `| ${c.timestamp.slice(0, 16).replace("T", " ")} | ${c.phase} | ${TYPE_LABEL[c.type]} | ${c.model} | ${c.id ?? "–"} | ${c.attempt ?? "–"} | ${c.ok ? "ok" : "Fehler"} | ${(c.note ?? "").replace(/\|/g, "/")} |`),
    "",
  ];
  writeFileSync(API_LOG_MD, lines.join("\n"));
}
