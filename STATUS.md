# Status

Stand: 12.10.2026, Phase 3, Runde 2. **Blockiert: Gemini-Guthaben aufgebraucht (Fehler 402).**

## Fertig

- Phase 0 bis 2 abgeschlossen, siehe frühere Notizen. Sprecher: Thomas Schendel.
- Phase 3, Runde 1: alle Standbilder in `public/stills/`, Kontaktbögen in `review/phase3/`.
- Phase 3, Runde 2 (Feedback vom 12.10.2026), bisher umgesetzt:
  - **Neue Bild-ID 07a:** Das bisherige 06b (Elefant zwischen Arzt und Patientin) heißt jetzt 07a (Szene 7, Endbild von V5, Startbild von V1). Script, Shot-Bible, Manifest und Shot-Definitionen sind angepasst.
  - Script und Shot-Bible enthalten alle neuen Entscheidungen: Trampelpfad, Elefant in Szene 5 lebendig, Hereinkommen in Szene 6, 08a mit Blick zum Elefanten, Licht konsistent je Szene, neue Clips V3, V4, V5.
  - **Lichtangleichung lokal:** 01c an 01a, 06d an 07a (`scripts/color-balance.mjs`, nur Farbbalance).

## Blockiert

Die Gemini-API antwortet mit „Your prepayment credits are depleted“. Alle 11 Anfragen der Runde wurden abgelehnt (nicht berechnet, im API-Log als Fehler vermerkt). **Du musst im AI Studio unter Projekte → Billing Guthaben aufladen.** Danach kann ich sofort weitermachen.

## Bereit zum Start, sobald Guthaben da ist

Die Vorgaben sind fertig in `data/shots/phase3.json` (Runde 2) und `data/shots/phase3-clips.json`:
1. **Szene 3, Trampelpfad:** Bildbearbeitung von 03a bis 03h. Natürliche Schuh- und Elefantenabdrücke, die von Bild zu Bild zunehmen, breiter und minimal tiefer werden, bis ein ausgetretener Weg entsteht.
2. **06a:** Der überzählige Stuhl verschwindet, ihr Stuhl steht in der Reihe.
3. **06b neu (Startbild V5):** Der Arzt kommt von vorn links, der Elefant biegt hinten links um die Ecke (Bearbeitung aus 07a).
4. **08a neu:** Der Arzt dreht sich weg und schaut in die Raumtiefe auf den Elefanten, im warmen Licht von Szene 8.
5. **Clips** (freigegeben): V3 (05a nach 05b) und V4 (05b nach 05c) für den Zeitraffer in Szene 5 mit lebendigem Elefanten, V5 (06b nach 07a) für das Hereinkommen.
6. **Danach Lichtangleichung:** 06a und 08a; V1 wird in Phase 5 warm gegradet, damit Szene 8 nicht zwischen Blau und Gold springt. Vorschlag: **06c neu im Abendlicht**, weil der Hintergrund trotz Farbangleichung nach Tag aussieht.

## Freigegebene Set- und Figuren-Entscheidungen

1. **Geografie:** Der Flur verläuft in gerader Achse auf Empfangshalle und Glasfront zu. CAM-A steht an der Flurmündung, CAM-C am Flurende mit Blick zurück, CAM-D ist der Gegenschuss von der Glasfront in den Flur. Im Flur, vom Empfang aus gesehen: links das Sprechzimmer, rechts hohe Fenster, Poster und Monitor. Tür 2 liegt in der Stirnwand am Flurende.
2. **Böden:** Halle und Wartebereich helles Eichenholz, Flur hellgrauer Linoleum.
3. **Jahreszeit:** Sommergrün vor den Fenstern, außer im Zeitraffer in Szene 3.
4. **Wanduhr:** rund, ohne Ziffern, hinter dem Tresen.
5. **Patientin statt Patient:** junge Frau, wach und genervt, nicht erschöpft. Die Einblendung in Szene 2 lautet „Dafür ist die Patientin noch nicht schwer genug.“
6. **Sprecher:** männlich, Naturdoku-Stil, Stimme Thomas Schendel (ElevenLabs, Voice-ID `Fghah4fztZORbiKfIGAs`, Stimmbibliothek).
7. **Szene 4:** Der Arzt geht auf Tür 2 zu, der Rüssel bremst ihn; V2 läuft von 0:50 bis 0:56.
8. **Kleidung:** Die Patientin trägt einen dunkelgrauen Pullover, Jeans und weiße Sneaker; die MFA trägt am Abend Straßenkleidung.
9. **Lebendiges Set:** Pflanzen, Alltagsspuren, am Abend macht eine MFA Feierabend; natürliche Haltungen statt steifem Profil.

## Bekannte Abweichungen

- **R4a/01a:** 5 statt 6 Stühle; die Uhr zeigt 10:10 (laut Shot-Bible unkritisch).
- **04a:** Holzleisten an den Wänden, Rasterdecke, helle klinische Lichtstimmung.
- **04b:** gleicher Bildausschnitt wie 04a; der Push auf Hand und Schulter entsteht in Remotion.
- **08c:** Der Elefant steht nach dem Schritt links hinter dem Arzt, nicht im Vordergrund. Er ist kaum unscharf.
- **V2:** Die Stuhlreihe im Flur verschwindet, während der Arzt daran vorbeigeht (das Endbild 04b hat keine Stühle).
- **06b:** Die Ärmel sind hochgeschoben, das Vordergrundblatt fehlt.
- **V2:** Ab 5,25 s springt der Rüssel durch den Kopf des Arztes auf die andere Schulter, deshalb wird nur bis 5,2 s geschnitten; 04b ist ersetzt.
- **Phase 3:** Die Abweichungen je Bild stehen in `review/phase3/notiz.md`.
- **Clips:** 8 statt 4 Sekunden, weil die API 4 Sekunden mit Endbild ablehnt. Im Film werden Ausschnitte genutzt.

## Entscheidungen bisher

- **Browser:** Remotion rendert mit dem vorinstallierten Chromium `/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell` (deine Entscheidung). `remotion.media` bleibt gesperrt.
- **Branch:** Gearbeitet wird auf dem Sitzungs-Branch `claude/elegant-faraday-8y87ce` statt `film/elefant-v1` (deine Entscheidung).
- Gemini-Schlüssel aus `GEMINI_API_KEY`. Modell-IDs über die API bestätigt.
- Alle Bilder werden einheitlich als JPG Qualität 92 gespeichert (mozjpeg über `sharp`).
- Referenzblätter liegen in `refs/<ID>.jpg`, Filmbilder ab Phase 2 in `public/stills/<ID>.jpg`.
- Rohdaten und abgelehnte Versuche liegen in `work/` und werden nicht committet.
- Die Prompt-Bausteine stehen wörtlich in `data/prompt-blocks.json`; `node scripts/check-blocks.mjs` prüft sie gegen `SHOTBIBLE.md`.
- Prompt-Aufbau: zuerst eine Legende der Referenzbilder, dann STYLE_LOCK, SET_BLOCK, ELEPHANT_BLOCK mit „Elephant size: <E1|E2|E3>“, Figuren-Bausteine, „Shot: <Bildinhalt>“ und „Light: <Licht-Token>“. Eine Bildbearbeitung besteht aus „Edit image 1.“ plus Änderungsanweisung plus STYLE_LOCK.
- **Veo:** Start- und Endbild nur mit `durationSeconds: 8`. Das Skript `scripts/gen-clip.mjs` nutzt das `source`-Argument des SDK, Bilder werden auf 1280×720 skaliert.
- **Pro-Modell:** `gemini-3-pro-image` für alle Bilder mit Elefant (Integration ins Licht).
- **Stimme:** Probe mit `eleven_multilingual_v2`, Stabilität 0,55, Ähnlichkeit 0,8, Stil 0, Tempo 0,92, MP3 128 kbit/s (mehr erlaubt das Abo nicht).
- Lehre aus Phase 2: Raumreferenzen sparsam einsetzen und den Hintergrund genau benennen, sonst erfindet das Modell eine andere Klinik. Lange Prompts mit vielen Referenzen funktionieren mit dem Pro-Modell gut.
- Lehre aus Phase 1, Runde 2: Integration des Elefanten gelingt nur mit motiviertem Licht (Gegenlicht, Lichtpfütze, Schatten zur Kamera, Kontaktschatten) und dem Pro-Modell. Eine Referenz wird wörtlich als „room layout reference only“ markiert, sonst übernimmt das Modell ihr Licht.
- Lehre aus Phase 1: Der SET_BLOCK zieht Poster und Monitor in jedes Bild. Bei Einstellungen in der Halle muss der Bildinhalt ausdrücklich „no poster, no monitor“ sagen. Ohne den Zusatz „all door signs blank“ schreibt das Modell lesbare Türschilder.

## Werkzeuge (für eine neue Sitzung)

- `npm ci` installiert alles.
- `node scripts/gen-image.mjs <shots.json> <ID> [...]` erzeugt je einen Versuch. Kandidaten landen in `work/candidates/<ID>_a<n>.jpg`, das Manifest bekommt einen Eintrag, das API-Log zählt mit. Mehr als 3 Versuche je ID und Runde verweigert das Skript. Eine neue Runde (Feld `round` in der Shot-Definition) gibt es nur, wenn sich die Vorgabe nach deinem Feedback ändert. `--dry` zeigt nur den Prompt.
- `node scripts/review.mjs accept <ID> <Versuch> <refs|public/stills> [Notiz]` oder `node scripts/review.mjs reject <ID> <Versuch> <Grund>`.
- `node scripts/preview.mjs <datei>` erzeugt eine verkleinerte Ansicht in `work/preview/`.
- `node scripts/contact-sheet.mjs <layout.json> <ausgabe.jpg>` baut einen Kontaktbogen; `node scripts/grid.mjs` ein schnelles Prüfraster.
- `node scripts/color-match.mjs <bild> <referenz> <ausgabe>` gleicht die Farbe lokal an (ohne API).
- Shot-Definitionen Phase 3: `data/shots/phase3.json`.
- Shot-Definitionen: `data/shots/phase1.json`, `data/shots/phase2.json`, Clips `data/shots/phase2-clips.json`.
- `node scripts/gen-clip.mjs <clips.json> <ID>` erzeugt einen Veo-Clip (Limit und Protokoll wie bei Bildern).
- `node scripts/gen-voice.mjs <config.json> <voiceKey>` erzeugt eine Sprecherprobe; `node scripts/check-voice.mjs <mp3>` prüft sie per Gemini.
- Testrendering: `npx remotion render src/index.ts Preflight out/test.mp4 --scale=0.6666666666666666` (Browser ist in `remotion.config.ts` gesetzt)
