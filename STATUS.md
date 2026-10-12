# Status

Stand: 12.10.2026, Ende Phase 2 (Drei-Shot-Test). **Wartet auf Rückmeldung.**

## Fertig

- **Phase 0 Preflight**, siehe `PREFLIGHT.md`.
- **Phase 1 Referenzblätter** R1 bis R4 in `refs/`, alle **freigegeben** (Runde 2 mit Patientin und neuem Elefantenlicht).
- **Phase 2 Drei-Shot-Test**, Notiz in `review/phase2-notiz.md`, Kontaktbogen `review/contact-sheet-phase2.jpg`.
  - Bilder in `public/stills/`: 01a (4K), 04a (2K), 04b (4K), 06b (4K), 08c (2K), alle mit `gemini-3-pro-image`.
  - Clips in `public/clips/`: V2 (04a nach 04b) und V1 (06b nach 08c), je 8 s in 720p.
  - Sprecherproben in `review/voice/`: drei männliche Stimmen, empfohlen ist Christian Plasa (Warm Voice).
  - Schnittvorschlag der Clips: `review/clips-schnittvorschlag.mp4`.

## Offen, braucht Entscheidung

1. **Stimme:** Christian Plasa (Empfehlung) oder eine der Alternativen?
2. **Clips:** Die Ausschnitte (V2 3,5 bis 7,5 s, V1 3,0 bis 6,0 s) und der Vorschlag, für 0:50 bis 0:52 das Clip-Bild bei 3,5 s statt 04a zu nehmen (siehe Notiz).
3. **Bildstil:** Freigabe der fünf Testbilder als Maßstab für Phase 3.

## Als Nächstes

Phase 3: alle 26 Standbilder. Die Varianten (03a bis 03e, 05a bis 05c) entstehen per Bildbearbeitung aus dem jeweiligen Master. Elefantenbilder mit dem Pro-Modell. Ein Kontaktbogen je Szene.

## Freigegebene Set- und Figuren-Entscheidungen

1. **Geografie:** Der Flur verläuft in gerader Achse auf Empfangshalle und Glasfront zu. CAM-A steht an der Flurmündung, CAM-C am Flurende mit Blick zurück, CAM-D ist der Gegenschuss von der Glasfront in den Flur. Im Flur, vom Empfang aus gesehen: links das Sprechzimmer, rechts hohe Fenster, Poster und Monitor. Tür 2 liegt in der Stirnwand am Flurende.
2. **Böden:** Halle und Wartebereich helles Eichenholz, Flur hellgrauer Linoleum.
3. **Jahreszeit:** Sommergrün vor den Fenstern, außer im Zeitraffer in Szene 3.
4. **Wanduhr:** rund, ohne Ziffern, hinter dem Tresen.
5. **Patientin statt Patient:** junge Frau, wach und genervt, nicht erschöpft. Die Einblendung in Szene 2 lautet „Dafür ist die Patientin noch nicht schwer genug.“
6. **Sprecher:** männlich, Naturdoku-Stil.

## Bekannte Abweichungen

- **R4a/01a:** 5 statt 6 Stühle; die Uhr zeigt 10:10 (laut Shot-Bible unkritisch).
- **04a:** Holzleisten an den Wänden, Rasterdecke, helle klinische Lichtstimmung.
- **04b:** gleicher Bildausschnitt wie 04a; der Push auf Hand und Schulter entsteht in Remotion.
- **08c:** Der Elefant steht nach dem Schritt links hinter dem Arzt, nicht im Vordergrund. Er ist kaum unscharf.
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
- `node scripts/contact-sheet.mjs <layout.json> <ausgabe.jpg>` baut einen Kontaktbogen.
- Shot-Definitionen: `data/shots/phase1.json`, `data/shots/phase2.json`, Clips `data/shots/phase2-clips.json`.
- `node scripts/gen-clip.mjs <clips.json> <ID>` erzeugt einen Veo-Clip (Limit und Protokoll wie bei Bildern).
- `node scripts/gen-voice.mjs <config.json> <voiceKey>` erzeugt eine Sprecherprobe; `node scripts/check-voice.mjs <mp3>` prüft sie per Gemini.
- Testrendering: `npx remotion render src/index.ts Preflight out/test.mp4 --scale=0.6666666666666666` (Browser ist in `remotion.config.ts` gesetzt)
