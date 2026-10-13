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


## Rohschnitt, Fassung 2 (Sprechertext nach Feedback, 13.10.2026)

- **Neu gesprochen:** 14 Sätze laut `review/sprechertext-feedback-v1-rueckmeldung.docx`, darunter zwei neue Sätze in Szene 8. Die geltende Fassung steht in `SCRIPT.md` unter „Sprechertext, Fassung 2“.
- **Prüfung per Gemini:** Alle 19 Sätze sind wörtlich richtig und ohne Aussprachefehler.
- **Zeitleiste:**
  - Stille am Satzende wird jetzt genauer abgezogen (Schwelle −40 dB). Das strafft alle Szenen leicht.
  - Wird eine reine Standbild-Szene länger, verteile ich die Zusatzzeit gleichmäßig auf ihre Einstellungen.
- **Abweichung über 10 %:**
  - **Szene 1:** 17,2 s statt 14 s (+22,5 %), wegen des zusätzlichen Satzes „Genaugenommen ein Entscheidungselefant.“.
  - Die Einstellungen sind gleichmäßig gestreckt: 01a 5,1 s, 01b1 und 01b2 je 2,5 s, 01c 5,1 s.
- **Szene 5:** wieder genau 16 s. Die beiden zusammenhängenden Sätze folgen ohne lange Pause aufeinander.
- **Zum Ausfüllen:** `review/sprechertext-feedback-v2.docx` mit den neuen Zeiten, für weiteres Feedback.

| Szene | Dauer | Script | Abweichung |
| --- | --- | --- | --- |
| s1 Der Elefant | 17.2 s | 14 s | +22.5 % ⚠ |
| s2 Gedächtnis | 18.0 s | 18 s | 0 % |
| s3 Trampelpfad | 18.0 s | 18 s | 0 % |
| s4 Respekt | 14.9 s | 14 s | +6.7 % |
| s5 Warten | 16.0 s | 16 s | 0 % |
| s6 Die Patientin | 10.0 s | 10 s | 0 % |
| s7 Der Satz | 13.0 s | 13 s | 0 % |
| s8 Der Schritt | 12.0 s | 12 s | 0 % |
| end Endcard | 12.0 s | 12 s | 0 % |
| coda Coda | 14.0 s | 14 s | 0 % |

Gesamtlänge: 145.1 s.
