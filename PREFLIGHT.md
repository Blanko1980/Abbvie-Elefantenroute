# Preflight (Phase 0)

Stand: 12.10.2026

## Ergebnis auf einen Blick

| Prüfpunkt | Ergebnis |
| --- | --- |
| Node / npm | ✅ Node v22.22.0, npm 10.9.4 |
| ffmpeg / ffprobe | ✅ 6.1.1 (System) |
| `GEMINI_API_KEY` | ✅ gesetzt |
| `GOOGLE_API_KEY` | – nicht gesetzt (nicht nötig, `GEMINI_API_KEY` wird verwendet) |
| `ELEVENLABS_API_KEY` | ✅ gesetzt |
| Gemini-API (`generativelanguage.googleapis.com`) | ✅ erreichbar, Testbild erzeugt |
| ElevenLabs-API (`api.elevenlabs.io`) | ✅ erreichbar, Test-TTS erzeugt (Einschränkung siehe unten) |
| npm-Registry | ✅ erreichbar, alle Pakete installiert |
| Remotion-Headless-Browser (`remotion.media`) | ❌ **vom Proxy blockiert (403)** |
| Remotion-Testrendering 720p | ✅ mit dem in der Umgebung vorinstallierten Chromium (siehe unten) |
| Doku `ai.google.dev`, `elevenlabs.io` | ❌ blockiert (nur Doku, für den Betrieb nicht nötig) |

## Was du ändern musst

**1. Pflicht für den vorgesehenen Weg: Host freigeben.** In den Umgebungseinstellungen (Netzwerkzugriff) folgenden Host zur Allowlist hinzufügen:

```
remotion.media
```

Von dort lädt Remotion 4.0.535 beim ersten Rendern sein „Chrome Headless Shell“ herunter (`https://remotion.media/chromium-headless-shell-linux-x64-157.0.8080.0.zip`). Ich habe das nicht umgangen.

**Alternative ohne Freigabe:** Die Cloud-Umgebung bringt ein Chromium Headless Shell 141 mit (`/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`, vorinstalliert für Playwright). Damit habe ich das Testrendering gemacht, ohne etwas aus dem Netz zu laden. Es läuft fehlerfrei. Nachteil: Die Version ist nicht die von Remotion gepinnte, und sie hängt an der Umgebung. Für einen reinen Standbild-Film mit CSS-Transformationen sehe ich darin kein praktisches Risiko. **Bitte entscheide: Host freigeben oder vorinstalliertes Chromium verwenden.**

**2. Optional, empfohlen: Doku-Hosts freigeben.** CLAUDE.md verlangt, vor dem ersten Einsatz die aktuelle Doku zu prüfen. Das geht aus der Umgebung heraus nicht:

```
ai.google.dev
elevenlabs.io
```

Ersatzweise habe ich die Modell-IDs direkt über den API-Endpunkt `models` der Gemini-API bestätigt und die Parameternamen aus den Typdefinitionen des SDK `@google/genai` 2.28.0 gelesen. Für den Betrieb reicht das.

**3. Optional: Berechtigungen des ElevenLabs-Schlüssels.** Der Schlüssel darf Sprache erzeugen und Stimmen auflisten, aber nicht `user_read` (Zeichenkontingent abfragen) und nicht `models_read` (Modellliste). Ohne `user_read` kann ich dir den Verbrauch an Zeichen nicht aus dem Konto melden, nur selbst mitzählen. Wenn du das willst, im ElevenLabs-Dashboard beim API-Schlüssel diese beiden Leserechte ergänzen.

## Details

### Gemini

Verfügbare Modelle laut `GET /v1beta/models` (Auszug, relevant für den Film):

| Zweck | Modell-ID | Status |
| --- | --- | --- |
| Standbilder (Standard) | `gemini-3.1-flash-image` | ✅ vorhanden, getestet |
| Schwierige Bilder | `gemini-3-pro-image` | ✅ vorhanden |
| Clips | `veo-3.1-generate-preview` | ✅ vorhanden (bewusst nicht getestet, kostet einen Clip) |

Testaufruf: 1 Bild, 16:9, `imageSize: "1K"`, Antwort nach 8,9 s, 1376×768, JPEG. Das Modell liefert JPEG statt PNG. Für die Asset-Politik (JPG Qualität 92) wird trotzdem einmal mit `sharp` neu kodiert, damit alle Dateien einheitlich sind.

Parameter laut SDK-Typen (`@google/genai` 2.28.0):

- Bilder: `config.responseModalities: ["IMAGE"]`, `config.imageConfig.aspectRatio` (z. B. `"16:9"`, `"21:9"`), `config.imageConfig.imageSize` (`"1K"`, `"2K"`, `"4K"`).
- Veo: `generateVideos({ model, prompt, image, config: { lastFrame, durationSeconds, aspectRatio, resolution, personGeneration, negativePrompt } })`, danach Polling der Operation. Ob 4 Sekunden mit Start- und Endbild bei `veo-3.1-generate-preview` zulässig sind, prüfe ich beim ersten Clip-Aufruf in Phase 2 (die API meldet unzulässige Kombinationen als Fehler, ohne zu berechnen).

### ElevenLabs

- `POST /v1/text-to-speech/{voice}` mit `eleven_multilingual_v2`: ✅ 1,70 s MP3 in 2,9 s.
- `GET /v2/voices`: ✅ 32 Stimmen im Konto, davon deutsch: Laura (calm and smooth, weiblich), Leonard (male), Otto (male), Christian Plasa (warm voice, male), Daniel (geklont, male), Sissi (bairisch, scheidet aus).
- `GET /v1/shared-voices?language=de`: ✅ Zugriff auf die Stimmbibliothek möglich.
- `GET /v1/user/subscription`, `GET /v1/models`: ❌ 401, Berechtigung fehlt (siehe Punkt 3).

### Remotion

- Versionen: `remotion`, `@remotion/cli`, `@remotion/bundler`, `@remotion/renderer` 4.0.535, React 19.3.0, Schrift `@fontsource/inter` 5.3.0 (lokal, kein CDN).
- Testkomposition `Preflight` (1920×1080, 24 fps, 48 Frames) mit langsamem Push und Text in Inter, gerendert mit `--scale=2/3`: Ausgabe 1280×720, 24 fps, 48 Frames, 2,000 s, H.264, CRF 28.
- Renderzeit (4 CPU-Kerne, 15 GB RAM, vorinstalliertes Chromium):

| Messung | Zeit |
| --- | --- |
| CLI-Aufruf gesamt (Bundling + Rendering + Kodierung, 720p) | 22,6 s |
| nur Bundling | 2,1 s |
| nur Rendering + Kodierung, 720p | 2,9 s (ca. 1,5 s pro Filmsekunde) |
| nur Rendering + Kodierung, 1080p | 5,9 s (ca. 3 s pro Filmsekunde) |

Hochgerechnet auf ca. 2:22 Film: Proxy 720p etwa 4 bis 10 Minuten, finales 1080p etwa 8 bis 20 Minuten. Die Spanne nach oben, weil echte 2K/4K-Standbilder und Video-Clips mehr Last erzeugen als der Testverlauf.

### Speicher

Ca. 31 GB frei. Unkritisch.

## Kosten Phase 0

1 Bild-Aufruf (Testbild, nicht committet), 0 Clips, 1 Sprach-Aufruf (17 Zeichen). Siehe `review/api-log.md`.
