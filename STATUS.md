# Status

Stand: 12.10.2026, Phase 1 Runde 2 (Überarbeitung nach Feedback). **Wartet auf Freigabe.**

## Fertig

- **Phase 0 Preflight**, siehe `PREFLIGHT.md`.
- **Phase 1 Referenzblätter R1 bis R4**: 10 Bilder in `refs/`, Kontaktbogen `review/contact-sheet-refs.jpg`.
  - R1a/R1b Arzt frontal und Dreiviertelprofil (Runde 1)
  - R2a/R2b Patientin frontal und Dreiviertelprofil, R2c Hand und Unterarm (Runde 2, neu)
  - R3a Elefant Dreiviertel, R3b Elefant seitlich, in der Empfangshalle, Größenstufe E1 (Runde 2, neu)
  - R4a (CAM-A Empfang), R4c (CAM-C Flurende), R4d (CAM-D Wartebereich), ohne Figuren (Runde 1, **freigegeben**)
- Bildaufrufe Phase 1 gesamt: 22 (Runde 1: 15, Runde 2: 7).

## Feedback Runde 1 und Umsetzung

- **Patient wird Patientin.** Junge Frau Mitte 20, wach, gefasst, vom Leiden genervt, aber nicht erschöpft oder antriebslos. Geändert in `SCRIPT.md` (Figuren, Entscheidungen) und im PATIENT_BLOCK der `SHOTBIBLE.md` (und `data/prompt-blocks.json`). Als Hintergrund der Porträts dient jetzt ein heller, unscharfer Wartebereich mit Pflanzen statt eines kahlen Raums, der in Runde 1 zum Eindruck „Anstalt“ beigetragen hat. In der Pose stecken kleine Alltagsgesten (Handgelenk reiben, ungeduldiger Seitenblick).
- **Elefant wirkte eingesetzt.** Ursache: Das Modell übernahm die gleichmäßige, helle Ausleuchtung von R4a (Architektur-Visualisierungs-Look), der Elefant hatte kein Gegenlicht und kaum Kontaktschatten. Neu:
  - Innenraum natürlich belichtet und dunkler als draußen, eine Lichtpfütze von der Glasfront.
  - Der Elefant steht im Gegenlicht, Lichtkante an Rücken und Ohren, der Schatten fällt zur Kamera, dunkle Kontaktschatten unter den Füßen, matte staubige Haut mit Schlamm an den Beinen.
  - Modell dafür: `gemini-3-pro-image`. R4a dient nur noch als Geometrie-Vorlage, das Licht kommt aus R3a.
- **Geografie, Böden, Jahreszeit und Wanduhr:** freigegeben (siehe unten).

## Freigegebene Set-Entscheidungen

1. **Geografie:** Der Flur verläuft in gerader Achse auf Empfangshalle und Glasfront zu. CAM-A steht an der Flurmündung (der Flur liegt hinter der Kamera), CAM-C am Flurende schaut durch die ganze Achse bis zum Wartebereich, CAM-D ist der Gegenschuss von der Glasfront in den Flur.
   - Im Flur, vom Empfang aus gesehen: links das Sprechzimmer, rechts hohe Fenster, Poster und Monitor.
   - Tür 2 liegt in der Stirnwand am Flurende, leicht rechts der Mitte.
2. **Böden:** Halle und Wartebereich helles Eichenholz, Flur hellgrauer Linoleum.
3. **Jahreszeit:** Sommergrün vor den Fenstern, außer im Jahreszeiten-Zeitraffer in Szene 3.
4. **Wanduhr:** rund, ohne Ziffern, nur Striche, an der Wand hinter dem Tresen.

## Bekannte Abweichungen in den Referenzen

- **R4a:** 5 statt 6 Stühle am Fenster. Die Uhr zeigt 10:10 statt 9:10 (laut Shot-Bible unkritisch). Die ziffernlose Uhr ist lokal per Retusche eingesetzt, ohne API-Aufruf (`scripts/retouch-clock.mjs`, im Manifest vermerkt).
- **R1a/R1b:** Hintergrund ist ein unscharfer Klinikflur mit einer Person weit hinten. Für die Gesichtsreferenz unkritisch.
- **R2a/R2b:** Die Ärmel liegen an den Handgelenken, die Hände sind sichtbar. In den Filmbildern verlange ich die Ärmel über den Händen ausdrücklich.
- **R3a/R3b:** Das Licht der Elefantenbilder (dunklerer Innenraum, Lichtpfütze) weicht bewusst vom gleichmäßig hellen R4a ab. Für die Filmbilder gilt R3a/R3b als Licht-Vorlage, R4 als Geometrie-Vorlage.
- **R4c/R4d:** Das Poster hängt in R4c an der Seitenwand, in R4d an der Stirnwand. Ab Phase 2 gilt die Seitenwand (R4c).

## Offen

- Deine Freigabe von Patientin (R2a bis R2c), Elefant (R3a/R3b) und Arzt (R1a/R1b).
- **Rückfrage:** Die Einblendung in Szene 2 lautet „Dafür ist der Patient noch nicht schwer genug.“ Das ist ein allgemeiner Gedanke des Arztes und kann so bleiben, oder soll sie „Dafür ist die Patientin noch nicht schwer genug.“ heißen?
- Danach Phase 2: Drei-Shot-Test (01a; 04a, 04b, V2; 06b, 08c, V1) und Sprecherprobe mit drei Stimmen.

## Entscheidungen bisher

- **Browser:** Remotion rendert mit dem vorinstallierten Chromium `/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell` (deine Entscheidung). `remotion.media` bleibt gesperrt.
- **Branch:** Gearbeitet wird auf dem Sitzungs-Branch `claude/elegant-faraday-8y87ce` statt `film/elefant-v1` (deine Entscheidung).
- Gemini-Schlüssel aus `GEMINI_API_KEY`. Modell-IDs über die API bestätigt.
- Alle Bilder werden einheitlich als JPG Qualität 92 gespeichert (mozjpeg über `sharp`).
- Referenzblätter liegen in `refs/<ID>.jpg`, Filmbilder ab Phase 2 in `public/stills/<ID>.jpg`.
- Rohdaten und abgelehnte Versuche liegen in `work/` und werden nicht committet.
- Die Prompt-Bausteine stehen wörtlich in `data/prompt-blocks.json`; `node scripts/check-blocks.mjs` prüft sie gegen `SHOTBIBLE.md`.
- Prompt-Aufbau: zuerst eine Legende der Referenzbilder, dann STYLE_LOCK, SET_BLOCK, ELEPHANT_BLOCK mit „Elephant size: <E1|E2|E3>“, Figuren-Bausteine, „Shot: <Bildinhalt>“ und „Light: <Licht-Token>“. Eine Bildbearbeitung besteht aus „Edit image 1.“ plus Änderungsanweisung plus STYLE_LOCK.
- Lehre aus Phase 1, Runde 2: Integration des Elefanten gelingt nur mit motiviertem Licht (Gegenlicht, Lichtpfütze, Schatten zur Kamera, Kontaktschatten) und dem Pro-Modell. Eine Referenz wird wörtlich als „room layout reference only“ markiert, sonst übernimmt das Modell ihr Licht.
- Lehre aus Phase 1: Der SET_BLOCK zieht Poster und Monitor in jedes Bild. Bei Einstellungen in der Halle muss der Bildinhalt ausdrücklich „no poster, no monitor“ sagen. Ohne den Zusatz „all door signs blank“ schreibt das Modell lesbare Türschilder.

## Werkzeuge (für eine neue Sitzung)

- `npm ci` installiert alles.
- `node scripts/gen-image.mjs <shots.json> <ID> [...]` erzeugt je einen Versuch. Kandidaten landen in `work/candidates/<ID>_a<n>.jpg`, das Manifest bekommt einen Eintrag, das API-Log zählt mit. Mehr als 3 Versuche je ID und Runde verweigert das Skript. Eine neue Runde (Feld `round` in der Shot-Definition) gibt es nur, wenn sich die Vorgabe nach deinem Feedback ändert. `--dry` zeigt nur den Prompt.
- `node scripts/review.mjs accept <ID> <Versuch> <refs|public/stills> [Notiz]` oder `node scripts/review.mjs reject <ID> <Versuch> <Grund>`.
- `node scripts/preview.mjs <datei>` erzeugt eine verkleinerte Ansicht in `work/preview/`.
- `node scripts/contact-sheet.mjs <layout.json> <ausgabe.jpg>` baut einen Kontaktbogen.
- Shot-Definitionen für Phase 1: `data/shots/phase1.json`.
- Testrendering: `npx remotion render src/index.ts Preflight out/test.mp4 --scale=0.6666666666666666` (Browser ist in `remotion.config.ts` gesetzt)
