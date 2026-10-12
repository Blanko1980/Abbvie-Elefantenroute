# API-Log

Zählt alle kostenpflichtigen Aufrufe, auch fehlgeschlagene. Kostenlose Abfragen (Modell- und Stimmenlisten) sind nicht mitgezählt. Erzeugt aus `data/api-calls.json`.

**Summe:** 103 Bild, 10 Clip, 18 Sprache, 3 Text (Prüfaufrufe)

| Phase | Bild | Clip | Sprache | Text |
| --- | ---: | ---: | ---: | ---: |
| 0 | 1 | 0 | 1 | 0 |
| 1 | 22 | 0 | 0 | 0 |
| 2 | 12 | 7 | 17 | 3 |
| 3 | 68 | 3 | 0 | 0 |

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
| 2026-10-12 17:55 | 2 | Sprache | eleven_multilingual_v2 | voice:alexander-tv-narrator:s2-1 | – | Fehler | HTTP 403 |
| 2026-10-12 17:55 | 2 | Sprache | eleven_multilingual_v2 | voice:alexander-tv-narrator:s2-1 | – | Fehler | HTTP 403 |
| 2026-10-12 17:55 | 2 | Sprache | eleven_multilingual_v2 | voice:alexander-tv-narrator:s2-1 | – | ok | 27 Zeichen |
| 2026-10-12 17:55 | 2 | Sprache | eleven_multilingual_v2 | voice:alexander-tv-narrator:s2-2 | – | ok | 76 Zeichen |
| 2026-10-12 17:55 | 2 | Sprache | eleven_multilingual_v2 | voice:alexander-tv-narrator:s2-3 | – | ok | 20 Zeichen |
| 2026-10-12 17:55 | 2 | Sprache | eleven_multilingual_v2 | voice:alexander-tv-narrator:s4-1 | – | ok | 39 Zeichen |
| 2026-10-12 17:55 | 2 | Sprache | eleven_multilingual_v2 | voice:alexander-tv-narrator:s4-2 | – | ok | 66 Zeichen |
| 2026-10-12 17:55 | 2 | Sprache | eleven_multilingual_v2 | voice:christian-plasa-warm:s2-1 | – | ok | 27 Zeichen |
| 2026-10-12 17:55 | 2 | Sprache | eleven_multilingual_v2 | voice:christian-plasa-warm:s2-2 | – | ok | 76 Zeichen |
| 2026-10-12 17:55 | 2 | Sprache | eleven_multilingual_v2 | voice:christian-plasa-warm:s2-3 | – | ok | 20 Zeichen |
| 2026-10-12 17:55 | 2 | Sprache | eleven_multilingual_v2 | voice:christian-plasa-warm:s4-1 | – | ok | 39 Zeichen |
| 2026-10-12 17:55 | 2 | Sprache | eleven_multilingual_v2 | voice:christian-plasa-warm:s4-2 | – | ok | 66 Zeichen |
| 2026-10-12 17:56 | 2 | Sprache | eleven_multilingual_v2 | voice:thomas-schendel-calm:s2-1 | – | ok | 27 Zeichen |
| 2026-10-12 17:56 | 2 | Sprache | eleven_multilingual_v2 | voice:thomas-schendel-calm:s2-2 | – | ok | 76 Zeichen |
| 2026-10-12 17:56 | 2 | Sprache | eleven_multilingual_v2 | voice:thomas-schendel-calm:s2-3 | – | ok | 20 Zeichen |
| 2026-10-12 17:56 | 2 | Sprache | eleven_multilingual_v2 | voice:thomas-schendel-calm:s4-1 | – | ok | 39 Zeichen |
| 2026-10-12 17:56 | 2 | Sprache | eleven_multilingual_v2 | voice:thomas-schendel-calm:s4-2 | – | ok | 66 Zeichen |
| 2026-10-12 17:56 | 2 | Text (Prüfung) | gemini-3-flash-preview | check:review/voice/alexander-tv-narrator.mp3 | – | ok | Sprecherprobe prüfen |
| 2026-10-12 17:56 | 2 | Text (Prüfung) | gemini-3-flash-preview | check:review/voice/christian-plasa-warm.mp3 | – | ok | Sprecherprobe prüfen |
| 2026-10-12 17:57 | 2 | Text (Prüfung) | gemini-3-flash-preview | check:review/voice/thomas-schendel-calm.mp3 | – | ok | Sprecherprobe prüfen |
| 2026-10-12 17:58 | 2 | Bild | gemini-3-pro-image | 04a | 1 | ok | 2752x1536 |
| 2026-10-12 17:58 | 2 | Bild | gemini-3-pro-image | 01a | 1 | ok | 5504x3072 |
| 2026-10-12 17:58 | 2 | Bild | gemini-3-pro-image | 06b | 1 | ok | 5504x3072 |
| 2026-10-12 17:59 | 2 | Bild | gemini-3-pro-image | 04a | 2 | ok | 2752x1536 |
| 2026-10-12 18:00 | 2 | Bild | gemini-3-pro-image | 06b | 2 | ok | 5504x3072 |
| 2026-10-12 18:01 | 2 | Bild | gemini-3-pro-image | 08c | 1 | ok | 2752x1536 |
| 2026-10-12 18:01 | 2 | Bild | gemini-3-pro-image | 04b | 1 | ok | 5504x3072 |
| 2026-10-12 18:02 | 2 | Clip | veo-3.1-generate-preview | V2 | 1 | Fehler | {"error":{"code":400,"message":"Your use case is currently not supported.  Please refer to Gemini API documentation for current model offering.","stat |
| 2026-10-12 18:02 | 2 | Clip | veo-3.1-generate-preview | V2 | 1 | Fehler | {"error":{"code":400,"message":"Your use case is currently not supported.  Please refer to Gemini API documentation for current model offering.","stat |
| 2026-10-12 18:03 | 2 | Clip | veo-3.1-generate-preview | V2 | 1 | ok | 8s 720p |
| 2026-10-12 18:05 | 2 | Clip | veo-3.1-generate-preview | V1 | 1 | ok | 8s 720p |
| 2026-10-12 18:25 | 2 | Bild | gemini-3-pro-image | 04a | 3 | ok | 2752x1536 |
| 2026-10-12 18:25 | 2 | Bild | gemini-3-pro-image | 06b | 3 | ok | 5504x3072 |
| 2026-10-12 18:26 | 2 | Bild | gemini-3-pro-image | 08c | 2 | ok | 2752x1536 |
| 2026-10-12 18:26 | 2 | Clip | veo-3.1-generate-preview | V2 | 2 | ok | 8s 720p |
| 2026-10-12 18:27 | 2 | Bild | gemini-3-pro-image | 04a | 4 | ok | 2752x1536 |
| 2026-10-12 18:29 | 2 | Clip | veo-3.1-generate-preview | V2 | 3 | ok | 8s 720p |
| 2026-10-12 18:46 | 2 | Bild | gemini-3-pro-image | 06b | 4 | ok | 5504x3072 |
| 2026-10-12 18:48 | 2 | Clip | veo-3.1-generate-preview | V1 | 2 | ok | 8s 720p |
| 2026-10-12 18:53 | 3 | Bild | gemini-3-pro-image | 03a | 1 | ok | 2752x1536 |
| 2026-10-12 18:53 | 3 | Bild | gemini-3-pro-image | 03h | 1 | ok | 2752x1536 |
| 2026-10-12 18:53 | 3 | Bild | gemini-3-pro-image | 03g | 1 | ok | 2752x1536 |
| 2026-10-12 18:53 | 3 | Bild | gemini-3-pro-image | 02a | 1 | ok | 3168x1344 |
| 2026-10-12 18:53 | 3 | Bild | gemini-3-pro-image | 01b1 | 1 | ok | 2752x1536 |
| 2026-10-12 18:53 | 3 | Bild | gemini-3-pro-image | 03f | 1 | ok | 2752x1536 |
| 2026-10-12 18:53 | 3 | Bild | gemini-3-pro-image | 01c | 1 | ok | 2752x1536 |
| 2026-10-12 18:53 | 3 | Bild | gemini-3-pro-image | 01a | 2 | ok | 5504x3072 |
| 2026-10-12 18:56 | 3 | Bild | gemini-3.1-flash-image | 06d | 1 | ok | 2752x1536 |
| 2026-10-12 18:56 | 3 | Bild | gemini-3.1-flash-image | 06a | 1 | ok | 2752x1536 |
| 2026-10-12 18:56 | 3 | Bild | gemini-3-pro-image | 08d | 1 | ok | 2752x1536 |
| 2026-10-12 18:56 | 3 | Bild | gemini-3-pro-image | 08a | 1 | ok | 2752x1536 |
| 2026-10-12 18:56 | 3 | Bild | gemini-3-pro-image | 03f | 2 | ok | 2752x1536 |
| 2026-10-12 18:56 | 3 | Bild | gemini-3-pro-image | 03g | 2 | ok | 2752x1536 |
| 2026-10-12 18:56 | 3 | Bild | gemini-3-pro-image | 02a | 2 | ok | 3168x1344 |
| 2026-10-12 18:56 | 3 | Bild | gemini-3-pro-image | 06c | 1 | ok | 2752x1536 |
| 2026-10-12 18:56 | 3 | Bild | gemini-3-pro-image | 03h | 2 | ok | 2752x1536 |
| 2026-10-12 18:56 | 3 | Bild | gemini-3-pro-image | 01c | 2 | ok | 2752x1536 |
| 2026-10-12 18:56 | 3 | Bild | gemini-3-pro-image | 05a | 1 | ok | 2752x1536 |
| 2026-10-12 18:56 | 3 | Bild | gemini-3-pro-image | 04b | 2 | ok | 5504x3072 |
| 2026-10-12 18:57 | 3 | Bild | gemini-3.1-flash-image | 06d | 2 | ok | 2752x1536 |
| 2026-10-12 18:57 | 3 | Bild | gemini-3-pro-image | 01b2 | 1 | ok | 2752x1536 |
| 2026-10-12 18:57 | 3 | Bild | gemini-3-pro-image | 03d | 1 | ok | 2752x1536 |
| 2026-10-12 18:57 | 3 | Bild | gemini-3-pro-image | 03c | 1 | ok | 2752x1536 |
| 2026-10-12 18:58 | 3 | Bild | gemini-3-pro-image | 02a | 3 | ok | 3168x1344 |
| 2026-10-12 18:58 | 3 | Bild | gemini-3-pro-image | 03b | 1 | ok | 2752x1536 |
| 2026-10-12 18:58 | 3 | Bild | gemini-3-pro-image | 03e | 1 | ok | 2752x1536 |
| 2026-10-12 18:58 | 3 | Bild | gemini-3-pro-image | 03g | 3 | ok | 2752x1536 |
| 2026-10-12 18:58 | 3 | Bild | gemini-3-pro-image | 05a | 2 | ok | 2752x1536 |
| 2026-10-12 18:58 | 3 | Bild | gemini-3-pro-image | 03f | 3 | ok | 2752x1536 |
| 2026-10-12 18:58 | 3 | Bild | gemini-3-pro-image | 02b | 1 | ok | 2752x1536 |
| 2026-10-12 18:59 | 3 | Bild | gemini-3-pro-image | 05b | 1 | ok | 2752x1536 |
| 2026-10-12 18:59 | 3 | Bild | gemini-3-pro-image | 05c | 1 | ok | 2752x1536 |
| 2026-10-12 18:59 | 3 | Bild | gemini-3-pro-image | 02b | 2 | ok | 2752x1536 |
| 2026-10-12 19:15 | 3 | Bild | gemini-3-pro-image | 03f | 4 | Fehler | {"error":{"code":402,"message":"Your prepayment credits are depleted. Please go to AI Studio at https://ai.studio/projec |
| 2026-10-12 19:15 | 3 | Bild | gemini-3-pro-image | 03c | 2 | Fehler | {"error":{"code":402,"message":"Your prepayment credits are depleted. Please go to AI Studio at https://ai.studio/projec |
| 2026-10-12 19:15 | 3 | Bild | gemini-3-pro-image | 03a | 2 | Fehler | {"error":{"code":402,"message":"Your prepayment credits are depleted. Please go to AI Studio at https://ai.studio/projec |
| 2026-10-12 19:15 | 3 | Bild | gemini-3-pro-image | 03e | 2 | Fehler | {"error":{"code":402,"message":"Your prepayment credits are depleted. Please go to AI Studio at https://ai.studio/projec |
| 2026-10-12 19:15 | 3 | Bild | gemini-3-pro-image | 03g | 4 | Fehler | {"error":{"code":402,"message":"Your prepayment credits are depleted. Please go to AI Studio at https://ai.studio/projec |
| 2026-10-12 19:15 | 3 | Bild | gemini-3-pro-image | 03d | 2 | Fehler | {"error":{"code":402,"message":"Your prepayment credits are depleted. Please go to AI Studio at https://ai.studio/projec |
| 2026-10-12 19:15 | 3 | Bild | gemini-3-pro-image | 03h | 3 | Fehler | {"error":{"code":402,"message":"Your prepayment credits are depleted. Please go to AI Studio at https://ai.studio/projec |
| 2026-10-12 19:15 | 3 | Bild | gemini-3-pro-image | 03b | 2 | Fehler | {"error":{"code":402,"message":"Your prepayment credits are depleted. Please go to AI Studio at https://ai.studio/projec |
| 2026-10-12 19:15 | 3 | Bild | gemini-3-pro-image | 08a | 2 | Fehler | {"error":{"code":402,"message":"Your prepayment credits are depleted. Please go to AI Studio at https://ai.studio/projec |
| 2026-10-12 19:15 | 3 | Bild | gemini-3-pro-image | 06a | 2 | Fehler | {"error":{"code":402,"message":"Your prepayment credits are depleted. Please go to AI Studio at https://ai.studio/projec |
| 2026-10-12 19:15 | 3 | Bild | gemini-3-pro-image | 06b | 1 | Fehler | {"error":{"code":402,"message":"Your prepayment credits are depleted. Please go to AI Studio at https://ai.studio/projec |
| 2026-10-12 19:24 | 3 | Bild | gemini-3-pro-image | 03d | 2 | ok | 2752x1536 |
| 2026-10-12 19:24 | 3 | Bild | gemini-3-pro-image | 03f | 4 | ok | 2752x1536 |
| 2026-10-12 19:24 | 3 | Bild | gemini-3-pro-image | 03a | 2 | ok | 2752x1536 |
| 2026-10-12 19:24 | 3 | Bild | gemini-3-pro-image | 03b | 2 | ok | 2752x1536 |
| 2026-10-12 19:24 | 3 | Bild | gemini-3-pro-image | 06a | 2 | ok | 2752x1536 |
| 2026-10-12 19:24 | 3 | Bild | gemini-3-pro-image | 08a | 2 | ok | 2752x1536 |
| 2026-10-12 19:24 | 3 | Bild | gemini-3-pro-image | 03c | 2 | ok | 2752x1536 |
| 2026-10-12 19:24 | 3 | Bild | gemini-3-pro-image | 03g | 4 | ok | 2752x1536 |
| 2026-10-12 19:24 | 3 | Bild | gemini-3-pro-image | 03h | 3 | ok | 2752x1536 |
| 2026-10-12 19:24 | 3 | Bild | gemini-3-pro-image | 06c | 2 | ok | 2752x1536 |
| 2026-10-12 19:24 | 3 | Bild | gemini-3-pro-image | 03e | 2 | ok | 2752x1536 |
| 2026-10-12 19:24 | 3 | Bild | gemini-3-pro-image | 06b | 1 | ok | 5504x3072 |
| 2026-10-12 19:26 | 3 | Bild | gemini-3-pro-image | 03b | 3 | ok | 2752x1536 |
| 2026-10-12 19:26 | 3 | Bild | gemini-3-pro-image | 06b | 2 | ok | 5504x3072 |
| 2026-10-12 19:26 | 3 | Bild | gemini-3-pro-image | 03f | 5 | ok | 2752x1536 |
| 2026-10-12 19:26 | 3 | Bild | gemini-3-pro-image | 03c | 3 | ok | 2752x1536 |
| 2026-10-12 19:27 | 3 | Bild | gemini-3-pro-image | 03f | 6 | ok | 2752x1536 |
| 2026-10-12 19:27 | 3 | Bild | gemini-3-pro-image | 03c | 4 | ok | 2752x1536 |
| 2026-10-12 19:28 | 3 | Bild | gemini-3-pro-image | 03g | 5 | ok | 2752x1536 |
| 2026-10-12 19:28 | 3 | Bild | gemini-3-pro-image | 03d | 3 | ok | 2752x1536 |
| 2026-10-12 19:29 | 3 | Bild | gemini-3-pro-image | 03h | 4 | ok | 2752x1536 |
| 2026-10-12 19:29 | 3 | Bild | gemini-3-pro-image | 03e | 3 | ok | 2752x1536 |
| 2026-10-12 19:29 | 3 | Bild | gemini-3-pro-image | 03d | 4 | ok | 2752x1536 |
| 2026-10-12 19:32 | 3 | Clip | veo-3.1-generate-preview | V3 | 1 | ok | 8s 720p |
| 2026-10-12 19:33 | 3 | Clip | veo-3.1-generate-preview | V4 | 1 | ok | 8s 720p |
| 2026-10-12 19:34 | 3 | Clip | veo-3.1-generate-preview | V5 | 1 | ok | 8s 720p |
