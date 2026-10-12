# Status

Stand: 12.10.2026, Ende Phase 1 (Referenzblätter). **Wartet auf Freigabe.**

## Fertig

- **Phase 0 Preflight**, siehe `PREFLIGHT.md`.
- **Phase 1 Referenzblätter R1 bis R4**: 10 Bilder in `refs/`, Kontaktbogen `review/contact-sheet-refs.jpg`.
  - R1a/R1b Arzt frontal und Dreiviertelprofil
  - R2a/R2b Patient frontal und Dreiviertelprofil, R2c Hand und Unterarm
  - R3a/R3b Elefant seitlich und Dreiviertel in der Empfangshalle, Größenstufe E1
  - R4a (CAM-A Empfang), R4c (CAM-C Flurende), R4d (CAM-D Wartebereich), ohne Figuren
- 15 Bildaufrufe in Phase 1 (10 angenommen, 5 abgelehnt), alle mit `gemini-3.1-flash-image` in 2K. Kein Bild hat mehr als 3 Versuche gebraucht.

## Zur Freigabe: Entscheidungen, die ich getroffen habe

Script und Shot-Bible legen diese Punkte nicht fest, sie sind aber im Bild sichtbar. Sie gelten ab Phase 2 für alle Bilder, wenn du sie freigibst.

1. **Geografie:** Der Flur verläuft in gerader Achse auf Empfangshalle und Glasfront zu. CAM-A steht an der Flurmündung (der Flur liegt hinter der Kamera), CAM-C am Flurende schaut durch die ganze Achse bis zum Wartebereich, CAM-D ist der Gegenschuss von der Glasfront in den Flur.
   - Im Flur, vom Empfang aus gesehen: links das Sprechzimmer, rechts hohe Fenster, Poster und Monitor.
   - Tür 2 liegt in der Stirnwand am Flurende, leicht rechts der Mitte. Sie ist in R4d sichtbar und so liegt sie auch, wenn der Elefant sie in Szene 5 verdeckt.
2. **Böden:** Halle und Wartebereich helles Eichenholz, Flur hellgrauer Linoleum. Den Linoleum verlangt der SET_BLOCK nur für den Flur.
3. **Jahreszeit für die Grundbilder:** Sommergrün vor den Fenstern. Das passt zu 03a (Sommer) und 03e (Sommer Jahre später), Szenen 1, 2 und 4 bis 8 spielen damit ebenfalls im Sommer.
4. **Wanduhr:** rund, ohne Ziffern, nur Striche, an der Wand hinter dem Tresen. Sie ist von CAM-A und von CAM-D aus sichtbar.

## Bekannte Abweichungen in den Referenzen

- **R4a:** 5 statt 6 Stühle am Fenster. Die Uhr zeigt 10:10 statt 9:10 (laut Shot-Bible unkritisch). Das Bild ist eine Bildbearbeitung von Versuch 2. Die Bearbeitung hatte Ziffern aufs Zifferblatt gesetzt, deshalb habe ich die ziffernlose Uhr aus Versuch 2 lokal per Retusche eingesetzt, ohne API-Aufruf (`scripts/retouch-clock.mjs`, im Manifest vermerkt).
- **R1a/R1b:** Hintergrund ist ein unscharfer Klinikflur mit einer Person weit hinten statt eines neutralen grauen Hintergrunds. Für die Gesichtsreferenz unkritisch.
- **R2a/R2b:** Die Ärmel bedecken die Hände bis auf die Finger, nicht ganz bis zu den Fingerspitzen.
- **R2c:** Der Ärmel liegt am Handgelenk statt über dem Handrücken. Die Rötung ist klein und dezent.
- **R3a/R3b:** Der Schatten des Elefanten ist schwach. In R3a ist in reiner Seitenansicht nur ein Stoßzahn sichtbar, in R3b beide. Ab Phase 2 nehme ich „deutlicher Bodenschatten“ in den Bildinhalt auf.
- **R4c/R4d:** Das Poster hängt in R4c an der Seitenwand, in R4d an der Stirnwand. Ab Phase 2 gilt die Seitenwand (R4c).

## Offen

- Deine Freigabe der Referenzen und der Entscheidungen oben. Danach setze ich den Status im Manifest von „zur Freigabe“ auf „freigegeben“.
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
- Lehre aus Phase 1: Der SET_BLOCK zieht Poster und Monitor in jedes Bild. Bei Einstellungen in der Halle muss der Bildinhalt ausdrücklich „no poster, no monitor“ sagen. Ohne den Zusatz „all door signs blank“ schreibt das Modell lesbare Türschilder.

## Werkzeuge (für eine neue Sitzung)

- `npm ci` installiert alles.
- `node scripts/gen-image.mjs <shots.json> <ID> [...]` erzeugt je einen Versuch. Kandidaten landen in `work/candidates/<ID>_a<n>.jpg`, das Manifest bekommt einen Eintrag, das API-Log zählt mit. Mehr als 3 Versuche je ID verweigert das Skript. `--dry` zeigt nur den Prompt.
- `node scripts/review.mjs accept <ID> <Versuch> <refs|public/stills> [Notiz]` oder `node scripts/review.mjs reject <ID> <Versuch> <Grund>`.
- `node scripts/preview.mjs <datei>` erzeugt eine verkleinerte Ansicht in `work/preview/`.
- `node scripts/contact-sheet.mjs <layout.json> <ausgabe.jpg>` baut einen Kontaktbogen.
- Shot-Definitionen für Phase 1: `data/shots/phase1.json`.
- Testrendering: `npx remotion render src/index.ts Preflight out/test.mp4 --scale=0.6666666666666666` (Browser ist in `remotion.config.ts` gesetzt)
