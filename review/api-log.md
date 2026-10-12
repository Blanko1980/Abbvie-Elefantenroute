# API-Log

Zählt alle kostenpflichtigen Aufrufe, auch fehlgeschlagene. Kostenlose Abfragen (Modell- und Stimmenlisten) sind nicht mitgezählt. Erzeugt aus `data/api-calls.json`.

**Summe:** 23 Bild, 0 Clip, 1 Sprache

| Phase | Bild | Clip | Sprache |
| --- | ---: | ---: | ---: |
| 0 | 1 | 0 | 1 |
| 1 | 22 | 0 | 0 |

## Einzelaufrufe

| Zeit (UTC) | Phase | Art | Modell | Asset | Versuch | Ergebnis | Notiz |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| 2026-10-12 16:40 | 0 | Bild | gemini-3.1-flash-image | – | – | ok | Testbild 1K, nicht Teil des Films, nicht committet |
| 2026-10-12 16:40 | 0 | Sprache | eleven_multilingual_v2 | – | – | ok | Test-TTS, 17 Zeichen |
| 2026-10-12 17:16 | 1 | Bild | gemini-3.1-flash-image | R1a | 1 | ok | 1856x2304 |
| 2026-10-12 17:16 | 1 | Bild | gemini-3.1-flash-image | R2a | 1 | ok | 1856x2304 |
| 2026-10-12 17:16 | 1 | Bild | gemini-3.1-flash-image | R4a | 1 | ok | 2752x1536 |
| 2026-10-12 17:17 | 1 | Bild | gemini-3.1-flash-image | R4a | 2 | ok | 2752x1536 |
| 2026-10-12 17:17 | 1 | Bild | gemini-3.1-flash-image | R2c | 1 | ok | 2400x1792 |
| 2026-10-12 17:17 | 1 | Bild | gemini-3.1-flash-image | R1b | 1 | ok | 1856x2304 |
| 2026-10-12 17:17 | 1 | Bild | gemini-3.1-flash-image | R2b | 1 | ok | 1856x2304 |
| 2026-10-12 17:18 | 1 | Bild | gemini-3.1-flash-image | R2b | 2 | ok | 1856x2304 |
| 2026-10-12 17:18 | 1 | Bild | gemini-3.1-flash-image | R4a | 3 | ok | 2752x1536 |
| 2026-10-12 17:19 | 1 | Bild | gemini-3.1-flash-image | R4c | 1 | ok | 2752x1536 |
| 2026-10-12 17:19 | 1 | Bild | gemini-3.1-flash-image | R3a | 1 | ok | 2752x1536 |
| 2026-10-12 17:19 | 1 | Bild | gemini-3.1-flash-image | R4d | 1 | ok | 2752x1536 |
| 2026-10-12 17:20 | 1 | Bild | gemini-3.1-flash-image | R3a | 2 | ok | 2752x1536 |
| 2026-10-12 17:20 | 1 | Bild | gemini-3.1-flash-image | R4d | 2 | ok | 2752x1536 |
| 2026-10-12 17:21 | 1 | Bild | gemini-3.1-flash-image | R3b | 1 | ok | 2752x1536 |
| 2026-10-12 17:42 | 1 | Bild | gemini-3.1-flash-image | R2a | 2 | ok | 1856x2304 |
| 2026-10-12 17:42 | 1 | Bild | gemini-3-pro-image | R3a | 3 | ok | 2752x1536 |
| 2026-10-12 17:43 | 1 | Bild | gemini-3.1-flash-image | R2b | 3 | ok | 1856x2304 |
| 2026-10-12 17:43 | 1 | Bild | gemini-3.1-flash-image | R2c | 2 | ok | 2400x1792 |
| 2026-10-12 17:43 | 1 | Bild | gemini-3-pro-image | R3a | 4 | ok | 2752x1536 |
| 2026-10-12 17:44 | 1 | Bild | gemini-3-pro-image | R3b | 2 | ok | 2752x1536 |
| 2026-10-12 17:45 | 1 | Bild | gemini-3-pro-image | R3b | 3 | ok | 2752x1536 |
