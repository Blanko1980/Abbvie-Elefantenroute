# API-Log

Zählt alle kostenpflichtigen Aufrufe, auch fehlgeschlagene. Kostenlose Abfragen (Modell- und Stimmenlisten) sind nicht mitgezählt. Erzeugt aus `data/api-calls.json`.

**Summe:** 104 Bild, 67 Clip, 49 Sprache, 5 Text (Prüfaufrufe)

| Phase | Bild | Clip | Sprache | Text |
| --- | ---: | ---: | ---: | ---: |
| 0 | 1 | 0 | 1 | 0 |
| 1 | 22 | 0 | 0 | 0 |
| 2 | 12 | 7 | 17 | 3 |
| 3 | 69 | 4 | 0 | 0 |
| 4 | 0 | 0 | 31 | 2 |
| 6 | 0 | 56 | 0 | 0 |

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
| 2026-10-13 07:09 | 3 | Bild | gemini-3-pro-image | 06b | 3 | ok | 5504x3072 |
| 2026-10-13 07:11 | 3 | Clip | veo-3.1-generate-preview | V5 | 2 | ok | 8s 720p |
| 2026-10-13 07:51 | 4 | Sprache | eleven_multilingual_v2 | s1-1 | 1 | ok | 25 Zeichen |
| 2026-10-13 07:51 | 4 | Sprache | eleven_multilingual_v2 | s1-2 | 1 | ok | 45 Zeichen |
| 2026-10-13 07:51 | 4 | Sprache | eleven_multilingual_v2 | s1-3 | 1 | ok | 44 Zeichen |
| 2026-10-13 07:51 | 4 | Sprache | eleven_multilingual_v2 | s2-1 | 1 | ok | 27 Zeichen |
| 2026-10-13 07:51 | 4 | Sprache | eleven_multilingual_v2 | s2-2 | 1 | ok | 76 Zeichen |
| 2026-10-13 07:51 | 4 | Sprache | eleven_multilingual_v2 | s2-3 | 1 | ok | 20 Zeichen |
| 2026-10-13 07:51 | 4 | Sprache | eleven_multilingual_v2 | s3-1 | 1 | ok | 46 Zeichen |
| 2026-10-13 07:51 | 4 | Sprache | eleven_multilingual_v2 | s3-2 | 1 | ok | 30 Zeichen |
| 2026-10-13 07:51 | 4 | Sprache | eleven_multilingual_v2 | s4-1 | 1 | ok | 39 Zeichen |
| 2026-10-13 07:51 | 4 | Sprache | eleven_multilingual_v2 | s4-2 | 1 | ok | 66 Zeichen |
| 2026-10-13 07:51 | 4 | Sprache | eleven_multilingual_v2 | s5-1 | 1 | ok | 82 Zeichen |
| 2026-10-13 07:51 | 4 | Sprache | eleven_multilingual_v2 | s5-2 | 1 | ok | 10 Zeichen |
| 2026-10-13 07:51 | 4 | Sprache | eleven_multilingual_v2 | s5-3 | 1 | ok | 58 Zeichen |
| 2026-10-13 07:51 | 4 | Sprache | eleven_multilingual_v2 | s5-4 | 1 | ok | 40 Zeichen |
| 2026-10-13 07:51 | 4 | Sprache | eleven_multilingual_v2 | s7-1 | 1 | ok | 35 Zeichen |
| 2026-10-13 07:51 | 4 | Sprache | eleven_multilingual_v2 | s7-2 | 1 | ok | 34 Zeichen |
| 2026-10-13 07:51 | 4 | Sprache | eleven_multilingual_v2 | s7-3 | 1 | ok | 63 Zeichen |
| 2026-10-13 07:53 | 4 | Text (Prüfung) | gemini-3-flash-preview | check:review/voice/sprecher-timeline.mp3 | – | ok | Sprecherspur prüfen |
| 2026-10-13 20:59 | 4 | Sprache | eleven_multilingual_v2 | s1-1 | 2 | ok | 65 Zeichen |
| 2026-10-13 20:59 | 4 | Sprache | eleven_multilingual_v2 | s2-3 | 2 | ok | 48 Zeichen |
| 2026-10-13 20:59 | 4 | Sprache | eleven_multilingual_v2 | s3-1 | 2 | ok | 44 Zeichen |
| 2026-10-13 20:59 | 4 | Sprache | eleven_multilingual_v2 | s3-2 | 2 | ok | 45 Zeichen |
| 2026-10-13 20:59 | 4 | Sprache | eleven_multilingual_v2 | s4-1 | 2 | ok | 37 Zeichen |
| 2026-10-13 20:59 | 4 | Sprache | eleven_multilingual_v2 | s4-2 | 2 | ok | 71 Zeichen |
| 2026-10-13 20:59 | 4 | Sprache | eleven_multilingual_v2 | s5-2 | 2 | ok | 12 Zeichen |
| 2026-10-13 20:59 | 4 | Sprache | eleven_multilingual_v2 | s5-3 | 2 | ok | 46 Zeichen |
| 2026-10-13 20:59 | 4 | Sprache | eleven_multilingual_v2 | s5-4 | 2 | ok | 48 Zeichen |
| 2026-10-13 20:59 | 4 | Sprache | eleven_multilingual_v2 | s7-1 | 2 | ok | 25 Zeichen |
| 2026-10-13 20:59 | 4 | Sprache | eleven_multilingual_v2 | s7-2 | 2 | ok | 27 Zeichen |
| 2026-10-13 20:59 | 4 | Sprache | eleven_multilingual_v2 | s7-3 | 2 | ok | 10 Zeichen |
| 2026-10-13 20:59 | 4 | Sprache | eleven_multilingual_v2 | s8-1 | 1 | ok | 55 Zeichen |
| 2026-10-13 20:59 | 4 | Sprache | eleven_multilingual_v2 | s8-2 | 1 | ok | 27 Zeichen |
| 2026-10-13 21:00 | 4 | Text (Prüfung) | gemini-3-flash-preview | check:review/voice/sprecher-timeline.mp3 | – | ok | Sprecherspur prüfen |
| 2026-10-13 22:31 | 6 | Clip | veo-3.1-generate-preview | V03a | 1 | ok | 4s 720p |
| 2026-10-13 22:31 | 6 | Clip | veo-3.1-generate-preview | V02a | 1 | ok | 8s 720p |
| 2026-10-13 22:32 | 6 | Clip | veo-3.1-generate-preview | V02a | 1 | ok | Verlängerung +7s 720p |
| 2026-10-13 22:34 | 6 | Clip | veo-3.1-generate-preview | V07a | 1 | ok | 8s 720p |
| 2026-10-13 22:34 | 6 | Clip | veo-3.1-generate-preview | V04b | 1 | ok | 8s 720p |
| 2026-10-13 22:34 | 6 | Clip | veo-3.1-generate-preview | V01c | 1 | ok | 6s 720p |
| 2026-10-13 22:34 | 6 | Clip | veo-3.1-generate-preview | V01a | 1 | ok | 6s 720p |
| 2026-10-13 22:34 | 6 | Clip | veo-3.1-generate-preview | V04b | 1 | Fehler | Verlängerung: {"error":{"code":400,"message":"Input video must be a video that was generated by VEO that has been processed.","status":"INVALID_ARGUMENT"} |
| 2026-10-13 22:34 | 6 | Clip | veo-3.1-generate-preview | V01b1 | 1 | ok | 4s 720p |
| 2026-10-13 22:34 | 6 | Clip | veo-3.1-generate-preview | V01b2 | 1 | ok | 4s 720p |
| 2026-10-13 22:34 | 6 | Clip | veo-3.1-generate-preview | V02b | 1 | ok | 6s 720p |
| 2026-10-13 22:35 | 6 | Clip | veo-3.1-generate-preview | V07a | 1 | Fehler | Verlängerung: {"code":13,"message":"Video generation failed due to an internal server issue. Please try again in a few minutes. If the problem persists, please contact Gemini API support."} |
| 2026-10-13 22:35 | 6 | Clip | veo-3.1-generate-preview | V03b | 1 | ok | 4s 720p |
| 2026-10-13 22:35 | 6 | Clip | veo-3.1-generate-preview | V03f | 1 | ok | 4s 720p |
| 2026-10-13 22:35 | 6 | Clip | veo-3.1-generate-preview | V03c | 1 | ok | 4s 720p |
| 2026-10-13 22:36 | 6 | Clip | veo-3.1-generate-preview | V03g | 1 | ok | 4s 720p |
| 2026-10-13 22:36 | 6 | Clip | veo-3.1-generate-preview | V03h | 1 | ok | 4s 720p |
| 2026-10-13 22:36 | 6 | Clip | veo-3.1-generate-preview | V03d | 1 | ok | 4s 720p |
| 2026-10-13 22:36 | 6 | Clip | veo-3.1-generate-preview | V03e | 1 | ok | 4s 720p |
| 2026-10-13 22:37 | 6 | Clip | veo-3.1-generate-preview | V05c | 1 | ok | 4s 720p |
| 2026-10-13 22:37 | 6 | Clip | veo-3.1-generate-preview | V06c | 1 | ok | 4s 720p |
| 2026-10-13 22:37 | 6 | Clip | veo-3.1-generate-preview | V06a | 1 | ok | 4s 720p |
| 2026-10-13 22:37 | 6 | Clip | veo-3.1-generate-preview | V06d | 1 | ok | 4s 720p |
| 2026-10-13 22:38 | 6 | Clip | veo-3.1-generate-preview | V08d | 1 | Fehler | ["We encountered an issue with the audio for your prompt, which means we could not create your video. This can sometimes happen due to our safety filters or other processing issues. Please modify your |
| 2026-10-13 22:38 | 6 | Clip | veo-3.1-generate-preview | V08a | 1 | ok | 6s 720p |
| 2026-10-13 22:38 | 6 | Clip | veo-3.1-generate-preview | V02a | 2 | ok | 8s 720p |
| 2026-10-13 22:39 | 6 | Clip | veo-3.1-generate-preview | V02a | 2 | ok | Verlängerung +7s 720p |
| 2026-10-13 22:46 | 6 | Clip | veo-3.1-generate-preview | V03b | 2 | ok | 4s 720p |
| 2026-10-13 22:46 | 6 | Clip | veo-3.1-generate-preview | V07a | 2 | ok | 8s 720p |
| 2026-10-13 22:46 | 6 | Clip | veo-3.1-generate-preview | V04b | 2 | ok | 8s 720p |
| 2026-10-13 22:46 | 6 | Clip | veo-3.1-generate-preview | V02a | 3 | ok | 8s 720p |
| 2026-10-13 22:47 | 6 | Clip | veo-3.1-generate-preview | V03g | 2 | ok | 4s 720p |
| 2026-10-13 22:48 | 6 | Clip | veo-3.1-generate-preview | V03h | 2 | ok | 4s 720p |
| 2026-10-13 22:48 | 6 | Clip | veo-3.1-generate-preview | V04b | 2 | Fehler | Verlängerung: {"code":13,"message":"Video generation failed due to an internal server issue. Please try again in a few minutes. If the problem persists, please contact Gemini API support."} |
| 2026-10-13 22:48 | 6 | Clip | veo-3.1-generate-preview | V02a | 3 | Fehler | Verlängerung: {"code":13,"message":"Video generation failed due to an internal server issue. Please try again in a few minutes. If the problem persists, please contact Gemini API support."} |
| 2026-10-13 22:48 | 6 | Clip | veo-3.1-generate-preview | V07a | 2 | Fehler | Verlängerung: {"code":13,"message":"Video generation failed due to an internal server issue. Please try again in a few minutes. If the problem persists, please contact Gemini API support."} |
| 2026-10-13 22:48 | 6 | Clip | veo-3.1-generate-preview | V06c | 2 | ok | 4s 720p |
| 2026-10-13 22:49 | 6 | Clip | veo-3.1-generate-preview | V08a | 2 | ok | 6s 720p |
| 2026-10-13 22:50 | 6 | Clip | veo-3.1-generate-preview | V02a | 3 | Fehler | Verlängerung: {"code":13,"message":"Video generation failed due to an internal server issue. Please try again in a few minutes. If the problem persists, please contact Gemini API support."} |
| 2026-10-13 22:50 | 6 | Clip | veo-3.1-generate-preview | V04b | 2 | Fehler | Verlängerung: {"code":13,"message":"Video generation failed due to an internal server issue. Please try again in a few minutes. If the problem persists, please contact Gemini API support."} |
| 2026-10-13 22:50 | 6 | Clip | veo-3.1-generate-preview | V07a | 2 | Fehler | Verlängerung: {"code":13,"message":"Video generation failed due to an internal server issue. Please try again in a few minutes. If the problem persists, please contact Gemini API support."} |
| 2026-10-13 22:50 | 6 | Clip | veo-3.1-generate-preview | V08d | 2 | Fehler | ["We encountered an issue with the audio for your prompt, which means we could not create your video. This can sometimes happen due to our safety filters or other processing issues. Please modify your |
| 2026-10-13 22:53 | 6 | Clip | veo-3.1-generate-preview | V07a | 2 | Fehler | Verlängerung: {"code":13,"message":"Video generation failed due to an internal server issue. Please try again in a few minutes. If the problem persists, please contact Gemini API support."} |
| 2026-10-13 22:53 | 6 | Clip | veo-3.1-generate-preview | V04b | 2 | ok | Verlängerung +7s 720p |
| 2026-10-13 22:53 | 6 | Clip | veo-3.1-generate-preview | V02a | 3 | Fehler | Verlängerung: {"code":13,"message":"Video generation failed due to an internal server issue. Please try again in a few minutes. If the problem persists, please contact Gemini API support."} |
| 2026-10-13 22:57 | 6 | Clip | veo-3.1-generate-preview | V08d | 3 | ok | 6s 720p |
| 2026-10-13 22:57 | 6 | Clip | veo-3.1-generate-preview | V04b | 3 | Fehler | ["We encountered an issue with the audio for your prompt, which means we could not create your video. This can sometimes happen due to our safety filters or other processing issues. Please modify your |
| 2026-10-13 22:58 | 6 | Clip | veo-3.1-generate-preview | V07a | 2 | Fehler | Verlängerung: {"code":13,"message":"Video generation failed due to an internal server issue. Please try again in a few minutes. If the problem persists, p |
| 2026-10-13 23:00 | 6 | Clip | veo-3.1-generate-preview | V07a | 2 | Fehler | Verlängerung: {"code":13,"message":"Video generation failed due to an internal server issue. Please try again in a few minutes. If the problem persists, p |
| 2026-10-13 23:03 | 6 | Clip | veo-3.1-generate-preview | V07a | 2 | Fehler | Verlängerung: {"code":13,"message":"Video generation failed due to an internal server issue. Please try again in a few minutes. If the problem persists, p |
| 2026-10-13 23:07 | 6 | Clip | veo-3.1-generate-preview | V07a | 2 | Fehler | Verlängerung: {"code":13,"message":"Video generation failed due to an internal server issue. Please try again in a few minutes. If the problem persists, p |
| 2026-10-13 23:11 | 6 | Clip | veo-3.1-generate-preview | V07b | 1 | ok | 8s 720p |
| 2026-10-13 23:11 | 6 | Clip | veo-3.1-generate-preview | V04b | 4 | ok | 8s 720p |
| 2026-10-13 23:13 | 6 | Clip | veo-3.1-generate-preview | V04b | 4 | Fehler | Verlängerung: {"code":13,"message":"Video generation failed due to an internal server issue. Please try again in a few minutes. If the problem persists, please contact Gemini API support."} |
| 2026-10-13 23:15 | 6 | Clip | veo-3.1-generate-preview | V04b | 4 | ok | Verlängerung +7s 720p |
| 2026-10-13 23:15 | 6 | Clip | veo-3.1-generate-preview | V07b | 2 | Fehler | {"error":{"code":402,"message":"Your prepayment credits are depleted. Please go to AI Studio at https://ai.studio/projects to manage your project and  |
