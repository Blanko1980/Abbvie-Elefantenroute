# Phase 5: Rohschnitt

Stand: 13.10.2026

## Was zu prüfen ist

- `review/rohschnitt-720p.mp4`: Proxy in 1280×720, H.264, CRF 28, mit Sprecher; 3521 Bilder, 146,7 s, 15,5 MB, Sprecher bei −17,7 LUFS integriert, Renderzeit 130 s. Musik und Raumton fehlen noch (die Spuren `music` und `ambience` sind angelegt und leer).

## Aufbau

- **Komposition:** `Film` in `src/Film.tsx`, komplett gesteuert von `data/timeline.json`. Standbilder aus `public/stills/`, Clips aus `public/clips/`, Sprecher aus `public/voice/`.
- **Kamerabewegung** (`src/components/Still.tsx`):
  - **Push:** langsame Skalierung mit sanfter Beschleunigung. 01a 1,00 → 1,04; 04b 1,00 → 1,10 Richtung Hand und Schulter; 07a 1,00 → 1,15.
  - **Pan:** Schwenk von links nach rechts über das 21:9-Bild 02a.
  - **Ausschnitt:** 01b1 und 01b2 als Halbtotale (Faktor 1,25), 08d als Halbnah (Faktor 1,3).
  - Alle übrigen Einstellungen sind statisch.
- **Clips** (Veo-Ton immer stumm):

  | Clip | Ausschnitt | Hinweis |
  | --- | --- | --- |
  | V2 | 0,5 bis 5,2 s | endet vor dem Rüssel-Sprung, danach 04b |
  | V3, V4 | je volle 8 s | |
  | V5 | 0,5 bis 3,5 s | |
  | V1 | 3,0 bis 6,0 s | als warm gegradete Fassung `V1-warm.mp4` (lokal per ffmpeg), passend zu Szene 8 |

- **Schnitte:** durchgehend hart. Nur in Szene 5 liegt je 1 Sekunde Überblendung zwischen V3 und V4 und zwischen V4 und 05c. Die Lichtwechsel selbst tragen dort die Zeitraffer-Clips.
- **Einblendungen** (Szenen 2 und 4):
  - Inter, weiß, in Anführungszeichen, unteres Drittel, zentriert, 0,3 s ein, 2,5 s sichtbar, 0,3 s aus.
  - Für die Lesbarkeit auf hellem Boden liegt ein weicher dunkler Verlauf im unteren Bildbereich, der mit der Einblendung ein- und ausblendet. **Das steht nicht im Script, bitte prüfen.**
  - „Da habe ich Respekt vor.“ erscheint, wenn der Rüssel auf der Schulter landet.
- **Endcard:** reines Weiß, schwarze Inter. Die Versalien-Zeile erscheint sofort ohne Überblendung, „Welcher Elefant bestimmt Ihre Entscheidung?“ kleiner ab 6 s. Beide stehen bis zum Ende (12 s).
- **Coda:** vier Textkarten weiß auf Schwarz, je 3,5 s, mit 0,3 s Ein- und Ausblendung. Die Blenden habe ich gesetzt, weil das Script dazu nichts sagt; harte Schnitte wären auch möglich.

## Länge

Laut `data/timeline.json` dauert der Film 146,7 s (2:26,7), das sind 3521 Bilder bei 24 fps:
- Film bis Ende Endcard: 2:00,7
- Coda: 14 s

## Bekannte Punkte

- Szene 5 dauert 18 statt 16 Sekunden (freigegeben).
- In 03f und 03g steht der Elefant neben Poster bzw. Monitor statt davor.
- Musik und Raumton folgen später.
