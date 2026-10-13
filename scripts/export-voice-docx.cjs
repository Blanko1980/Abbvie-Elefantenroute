// Exportiert die Sprecherspur mit Zeitstempeln als Word-Dokument für Feedback.
// node scripts/export-voice-docx.cjs <ausgabe.docx>
const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, HeadingLevel,
  PageOrientation, AlignmentType, BorderStyle } = require("docx");

const t = JSON.parse(fs.readFileSync("data/timeline.json", "utf8"));
const out = process.argv[2];

// Kurzbeschreibung der Bilder (aus Shotliste und Phase 3)
const SHOT_DESC = {
  "00": "Schwarz", "01a": "Totale Empfangshalle, Elefant mittig", "01b1": "MFA geht am Elefanten vorbei", "01b2": "Passanten rechts, Becher wird abgestellt",
  "01c": "Ganzer Raum, Patientin klein auf Stuhl 1", "02a": "Arzt geht durch den Flur, Rüssel am Ohr (Schwenk)", "02b": "Arzt verschwindet im Sprechzimmer",
  "03a": "Zeitraffer Flur, Sommer", "03b": "Herbst", "03f": "Elefant am Poster", "03c": "Winter", "03g": "Flanke am Monitor", "03d": "Frühling", "03h": "Tür 2 im Schatten", "03e": "Sommer, Jahre später, ausgetretener Weg",
  "V2": "Arzt geht zur Tür, Rüssel bremst ihn (Clip)", "04b": "Hand an der Klinke, Rüssel auf der Schulter",
  "V3": "Zeitraffer Wartebereich, Wartende gehen (Clip)", "V4": "Dämmerung, letzter Wartender geht (Clip)", "05c": "Patientin allein im Abendlicht",
  "06a": "Patientin steht auf", "V5": "Arzt und Elefant kommen herein (Clip)", "06c": "Arzt, Elefantenflanke schiebt sich ins Bild", "06d": "Patientin kratzt sich am Unterarm",
  "07a": "Dreier-Totale: Arzt, Elefant, Patientin (langsamer Push)",
  "08a": "Arzt dreht sich weg, sieht den Elefanten an", "V1": "Elefant tritt zur Seite (Clip)", "08d": "Arzt und Patientin sehen sich an",
  "End": "Endcard (weiß)", "Coda": "Textkarten (schwarz)",
};

const fmt = (s) => { const m = Math.floor(s / 60); const r = s - m * 60; return `${m}:${r.toFixed(1).padStart(4, "0").replace(".", ",")}`; };
const shotAt = (sec) => { for (const sc of t.scenes) for (const sh of [...sc.shots].reverse()) if (sec >= sh.start && sec < sh.start + sh.duration) return sh; return null; };

const FONT = "Arial";
const W = [1300, 1300, 3200, 4600, 4200]; // Zeit, Szene, Bild, Text, Feedback (Summe 14600 DXA, A4 quer mit Rändern)
const TABLE_W = W.reduce((a, b) => a + b, 0);
const border = { style: BorderStyle.SINGLE, size: 4, color: "BBBBBB" };
const borders = { top: border, bottom: border, left: border, right: border };
const cell = (text, w, opts = {}) => new TableCell({
  width: { size: w, type: WidthType.DXA }, borders,
  shading: opts.fill ? { type: ShadingType.CLEAR, color: "auto", fill: opts.fill } : undefined,
  margins: { top: 80, bottom: 80, left: 100, right: 100 },
  children: String(text).split("\n").map((line) => new Paragraph({ children: [new TextRun({ text: line, font: FONT, size: opts.size ?? 20, bold: opts.bold, italics: opts.italics, color: opts.color })] })),
});
const header = (labels) => new TableRow({ tableHeader: true, children: labels.map((l, i) => cell(l, W[i], { bold: true, fill: "E8E8E8" })) });

// Sprechertabelle: alle Szenen in Reihenfolge, Szenen ohne Sprecher als eigene Zeile
const rows = [header(["Beginn", "Ende", "Bild (Szene)", "Sprechertext (aktuell)", "Feedback / neuer Text"])];
for (const sc of t.scenes) {
  const lines = t.voice.filter((v) => v.scene === sc.id);
  const label = sc.id === "end" ? "Endcard" : sc.id === "coda" ? "Coda (nur intern)" : `Szene ${sc.id.replace("s", "")} · ${sc.name}`;
  rows.push(new TableRow({ children: [cell(`${label}   (${fmt(sc.start)} – ${fmt(sc.end)}, ${sc.duration.toFixed(1).replace(".", ",")} s)`, TABLE_W, { bold: true, fill: "F4F1EA" })].map((c) => c) }));
  // Zelle über alle Spalten: separate Zeile mit columnSpan
  rows.pop();
  rows.push(new TableRow({ children: [new TableCell({ columnSpan: 5, width: { size: TABLE_W, type: WidthType.DXA }, borders, shading: { type: ShadingType.CLEAR, color: "auto", fill: "F4F1EA" },
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children: [new Paragraph({ children: [new TextRun({ text: `${label}   (${fmt(sc.start)} – ${fmt(sc.end)}, ${sc.duration.toFixed(1).replace(".", ",")} s)`, font: FONT, size: 21, bold: true })] })] })] }));
  if (!lines.length) {
    const desc = sc.shots.map((s) => SHOT_DESC[s.id] ?? s.id).join(" · ");
    rows.push(new TableRow({ children: [cell(fmt(sc.start), W[0]), cell(fmt(sc.end), W[1]), cell(desc, W[2], { size: 18 }), cell("(kein Sprecher)", W[3], { italics: true, color: "777777" }), cell("", W[4])] }));
    continue;
  }
  for (const v of lines) {
    const sh = shotAt(v.speechStart);
    rows.push(new TableRow({ children: [cell(fmt(v.speechStart), W[0]), cell(fmt(v.end), W[1]), cell(`${sh ? SHOT_DESC[sh.id] ?? sh.id : ""} (${sh?.id ?? ""})`, W[2], { size: 18 }), cell(v.text, W[3], { size: 22 }), cell("", W[4])] }));
  }
}

// Texte im Bild
const W2 = [1300, 1300, 3200, 4600, 4200];
const rows2 = [header(["Beginn", "Ende", "Wo", "Text im Bild (aktuell)", "Feedback / neuer Text"])];
for (const o of t.overlays) rows2.push(new TableRow({ children: [cell(fmt(o.start), W2[0]), cell(fmt(o.start + o.fadeIn + o.visible + o.fadeOut), W2[1]), cell(`Einblendung ${o.scene === "s2" ? "Szene 2" : "Szene 4"}`, W2[2], { size: 18 }), cell(o.text, W2[3], { size: 22 }), cell("", W2[4])] }));
const end = t.scenes.find((s) => s.id === "end");
rows2.push(new TableRow({ children: [cell(fmt(end.start), W2[0]), cell(fmt(end.end), W2[1]), cell("Endcard, Zeile 1 (sofort)", W2[2], { size: 18 }), cell(t.endcard.line1, W2[3], { size: 22 }), cell("", W2[4])] }));
rows2.push(new TableRow({ children: [cell(fmt(end.start + t.endcard.line2At), W2[0]), cell(fmt(end.end), W2[1]), cell("Endcard, Zeile 2", W2[2], { size: 18 }), cell(t.endcard.line2, W2[3], { size: 22 }), cell("", W2[4])] }));
const coda = t.scenes.find((s) => s.id === "coda");
t.coda.cards.forEach((c, i) => {
  const s = coda.start + i * t.coda.cardDuration;
  rows2.push(new TableRow({ children: [cell(fmt(s), W2[0]), cell(fmt(s + t.coda.cardDuration), W2[1]), cell(`Coda, Karte ${i + 1}`, W2[2], { size: 18 }), cell(`${c.title}\n${c.body}`, W2[3], { size: 22 }), cell("", W2[4])] }));
});

const p = (text, opts = {}) => new Paragraph({ spacing: { after: 120 }, ...opts.para, children: [new TextRun({ text, font: FONT, size: opts.size ?? 22, bold: opts.bold, color: opts.color })] });
const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: 22 } } },
    paragraphStyles: [{ id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 32, bold: true, font: FONT }, paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 26, bold: true, font: FONT }, paragraph: { spacing: { before: 300, after: 120 }, outlineLevel: 1 } }] },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838, orientation: PageOrientation.LANDSCAPE }, margin: { top: 1000, bottom: 1000, left: 1100, right: 1100 } } },
    children: [
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "Sprecherspur mit Zeitstempeln", font: FONT })] }),
      p(`Stand: ${new Date().toLocaleDateString("de-DE")} · Sprecher: Thomas Schendel · Filmlänge ${fmt(t.durationSeconds)} (Rohschnitt review/rohschnitt-720p.mp4)`, { size: 20, color: "555555" }),
      p("So geht das Feedback: Trage in der rechten Spalte den neuen Text oder deinen Kommentar ein. Leere Felder bedeuten: bleibt so. Wenn ein Satz an einer anderen Stelle beginnen soll, schreib die gewünschte Zeit dazu. Neue Sätze kannst du als eigene Zeile ergänzen.", { size: 20 }),
      p("Zeitstempel: Minute:Sekunde,Zehntel ab Filmbeginn, wie im Rohschnitt. „Beginn“ ist der Sprecheinsatz, „Ende“ das Ende des Satzes.", { size: 20, color: "555555" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "1. Sprechertext", font: FONT })] }),
      new Table({ width: { size: TABLE_W, type: WidthType.DXA }, columnWidths: W, rows }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "2. Texte im Bild (zur Vollständigkeit)", font: FONT })] }),
      new Table({ width: { size: TABLE_W, type: WidthType.DXA }, columnWidths: W2, rows: rows2 }),
    ],
  }],
});
Packer.toBuffer(doc).then((b) => { fs.writeFileSync(out, b); console.log(out); });
