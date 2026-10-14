# Status

Stand: 14.10.2026, Nacharbeit „alle Einstellungen animiert“. **Rohschnitt `review/rohschnitt-animiert-720p.mp4` komplett (V07b erzeugt, 06a neu), wartet auf Freigabe.** `renders/elefant-v1-1080p.mp4` ist noch die Fassung mit Standbildern.

## Fertig

- Phasen 0 bis 3: freigegeben. 27 Standbilder, Clips V1 bis V5 (plus `V1-warm.mp4`, lokal gegradet).
- Phase 4: Sprecher Thomas Schendel, Sprechertext Fassung 2 (19 Sätze in `public/voice/`, siehe `SCRIPT.md`), Zeitleiste `data/timeline.json` (145.1 s). Szene 1 dauert 17,2 s statt 14 s (+22,5 %, wegen des zusätzlichen Satzes). Entscheidungen: Szene 5 dauert 18 s; Endcard-Zeile 2 ab 6 s; die 2-Sekunden-Einstellungen der Shotliste gelten.
- **Phase 5:**
  - Komposition `Film` in Remotion, komplett aus `data/timeline.json`.
  - Proxy `review/rohschnitt-720p.mp4` (CRF 28, Fassung 2 noch mit Einblendungen).
  - Sprechertext Fassung 2 freigegeben (13.10.2026).
  - **Finaler Film** `renders/elefant-v1-1080p.mp4` (H.264, CRF 20, 1920×1080, 24 fps, 3482 Frames = 145,1 s wie in `data/timeline.json`), **ohne Einblendungen** (deine Entscheidung vom 13.10.2026).
  - Notiz `review/phase5-notiz.md`.

## Offen, braucht Entscheidung

1. Freigabe des animierten Rohschnitts (Abweichungen bei 02a und 04b bleiben, deine Entscheidung). Danach finales 1080p neu rendern.
2. Coda-Karten mit 0,3 s Blende oder mit harten Schnitten? (derzeit Blende)

## Später, nicht jetzt

- Musik (vermutlich Suno) in die leere Spur `music`, Raumton in `ambience`.
- Tiefenkarten-Parallax.

## Rendern

- Proxy: `npx remotion render src/index.ts Film review/rohschnitt-720p.mp4 --scale=0.6666666666666666 --codec=h264 --crf=28`
- Final: `npx remotion render src/index.ts Film renders/elefant-v1-1080p.mp4 --codec=h264 --crf=20`
- Nach jeder Änderung an Sprecher oder Einstellungen: `python3 scripts/speech-bounds.py && node scripts/build-timeline.mjs`.

## Schnittnotizen für Phase 5

- **V2:** 0,5 bis 5,2 s (0:50 bis etwa 0:54,7), danach 04b mit Push auf Hand und Schulter.
- **V3 und V4:** je volle 8 s für Szene 5 (1:04 bis 1:20), harter Übergang, weil V3 auf 05b endet und V4 dort beginnt.
- **V5:** 0,5 bis 3,5 s (freigegeben).
- **V1:** 3,0 bis 6,0 s (1:47 bis 1:50), warm gegradet auf 08c.
- **01b1, 01b2:** als Halbtotale per Ausschnitt; **08d:** als Halbnah per Ausschnitt.
- **Szene 7:** 07a mit Push 1.00 auf 1.15.

## Freigegebene Set- und Figuren-Entscheidungen

1. **Geografie:** Der Flur verläuft in gerader Achse auf Empfangshalle und Glasfront zu. CAM-A steht an der Flurmündung, CAM-C am Flurende mit Blick zurück, CAM-D ist der Gegenschuss von der Glasfront in den Flur. Im Flur, vom Empfang aus gesehen: links das Sprechzimmer, rechts hohe Fenster, Poster und Monitor. Tür 2 liegt in der Stirnwand am Flurende.
2. **Böden:** Halle und Wartebereich helles Eichenholz, Flur hellgrauer Linoleum.
3. **Jahreszeit:** Sommergrün vor den Fenstern, außer im Zeitraffer in Szene 3.
4. **Wanduhr:** rund, ohne Ziffern, hinter dem Tresen.
5. **Patientin statt Patient:** junge Frau, wach und genervt, nicht erschöpft.
11. **Alle Einstellungen animiert** (13.10.2026): jede Einstellung ist ein Veo-Clip, Vorgaben in `data/shots/phase6-clips.json`, Notiz `review/phase6-notiz.md`.
10. **Keine Einblendungen:** Die Gedanken-Einblendungen in Szene 2 und Szene 4 entfallen im finalen Film. Die Komponente `Overlay` bleibt im Code; die Liste in `scripts/build-timeline.mjs` wird per Filter geleert und kann bei Bedarf wieder aktiviert werden.
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
- `node scripts/color-match.mjs <bild> <referenz> <ausgabe>` gleicht die Farbe lokal an (ohne API); `node scripts/color-balance.mjs <bild> <referenz> <ausgabe> [stärke]` überträgt nur die Farbbalance.
- `python3 scripts/floor-detail.py <ziel> <quelle> <ausgabe> <stärke> <y_start> [x_mitte sigma]` überträgt Bodenstruktur zwischen Bildern derselben Kamera.
- `node scripts/floor-crop.mjs <bild> <ausgabe>` schneidet einen Bodenausschnitt als Texturreferenz aus.
- Clip-Vorgaben Phase 3: `data/shots/phase3-clips.json`.
- Shot-Definitionen Phase 3: `data/shots/phase3.json`.
- Shot-Definitionen: `data/shots/phase1.json`, `data/shots/phase2.json`, Clips `data/shots/phase2-clips.json`.
- `node scripts/gen-clip.mjs <clips.json> <ID> [<ID> ...] [--parallel N]` erzeugt Veo-Clips in einem Prozess (Limit und Protokoll wie bei Bildern). Felder: `end` (Endbild, dann nur 8 s), `crop`/`region` (Ausschnitt des Startbilds), `startFile` (eigenes Startbild), `extend` (Verlängerung um 7 s). Aufrufe ohne Ergebnis zählen nicht als Versuch.
- `node scripts/extend-clip.mjs <clips.json> <ID> <Versuch>` verlängert einen Clip über die im Manifest gespeicherte Video-Referenz (gilt laut Veo nur rund 2 Tage).
- `node scripts/gen-narration.mjs [Satz-ID ...]` erzeugt den Sprechertext aus `data/voice/narration.json`; `python3 scripts/speech-bounds.py` misst die Sprechgrenzen; `node scripts/build-timeline.mjs` baut `data/timeline.json`; `node scripts/check-narration.mjs <mp3>` prüft die Sprecherspur per Gemini.
- `node scripts/gen-voice.mjs <config.json> <voiceKey>` erzeugt eine Sprecherprobe; `node scripts/check-voice.mjs <mp3>` prüft sie per Gemini.
- Testrendering: `npx remotion render src/index.ts Preflight out/test.mp4 --scale=0.6666666666666666` (Browser ist in `remotion.config.ts` gesetzt)
