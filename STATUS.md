# Status

Stand: 12.10.2026, Ende Phase 3 (alle Standbilder). **Wartet auf Freigabe.**

## Fertig

- **Phase 0 Preflight**, siehe `PREFLIGHT.md`.
- **Phase 1 Referenzblätter** R1 bis R4 in `refs/`, freigegeben.
- **Phase 2 Drei-Shot-Test**, abgeschlossen (`review/phase2-notiz.md`). Clips V1 und V2 liegen in `public/clips/`. Der Sprecher ist Thomas Schendel.
- **Phase 3 alle 26 Standbilder** in `public/stills/`, Notiz `review/phase3/notiz.md`, Kontaktbögen je Szene in `review/phase3/`.

## Offen, braucht Entscheidung

1. Freigabe der Standbilder.
2. 03f und 03g: Der Elefant steht neben Poster bzw. Monitor statt davor (3 Versuche ausgeschöpft). So lassen oder eine Zusatzrunde (bis 3 weitere Versuche je Bild)?

## Als Nächstes: Phase 4 (Sprecher)

Sprechertext satzweise mit Thomas Schendel erzeugen (Einstellungen wie in der Probe), Dauer messen, Pausen laut Script setzen, daraus `data/timeline.json`. Abweichungen über 10 Prozent je Szene melde ich.

## Schnittnotizen für Phase 5 (aus Phase 2 und 3)

- **V2:** von 0,5 bis 5,2 s nutzen (0:50 bis etwa 0:54,7), danach direkt 04b (Neuaufbau des Bilds bei 5,15 s), Push bis auf Hand und Schulter.
- **V1:** von 3,0 bis 6,0 s nutzen (1:47 bis 1:50).
- **01b1, 01b2:** als Halbtotale per Ausschnitt; **08d:** als Halbnah per Ausschnitt.
- **03d:** Fenster eventuell leicht anheben, damit der Frühling erkennbar wird.

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
