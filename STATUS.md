# Status

Stand: 12.10.2026, Ende Phase 0 (Preflight). **Wartet auf Rückmeldung.**

## Fertig

- **Phase 0 Preflight**, Bericht in `PREFLIGHT.md`.
  - Gemini-API und ElevenLabs-API funktionieren (je ein Testaufruf).
  - Remotion-Projekt angelegt (`src/`, `remotion.config.ts`, `tsconfig.json`), alle Versionen fest gepinnt in `package.json`.
  - 2-Sekunden-Testrendering 720p erfolgreich, aber nur mit dem in der Umgebung vorinstallierten Chromium, weil `remotion.media` blockiert ist.
- Grundgerüst: `data/manifest.json` (leer), `review/api-log.md`, `.gitignore` (inkl. `.env`, `work/`, `*.png`).

## Offen, braucht Entscheidung

1. **Headless-Browser für Remotion:** `remotion.media` freigeben **oder** das vorinstallierte Chromium (`/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`) verwenden. Details in `PREFLIGHT.md`.
2. **Branch:** Die Sitzung ist auf den Branch `claude/elegant-faraday-8y87ce` festgelegt und darf nur dorthin pushen. CLAUDE.md nennt `film/elefant-v1`. Bis zur Klärung arbeite ich auf `claude/elegant-faraday-8y87ce`.
3. Optional: Doku-Hosts `ai.google.dev` und `elevenlabs.io` freigeben; ElevenLabs-Schlüssel um `user_read` und `models_read` ergänzen.

## Als Nächstes

Phase 1: Referenzblätter R1 bis R4 laut `SHOTBIBLE.md`, Kontaktbogen `review/contact-sheet-refs.jpg`, dann STOP. Für Phase 1 ist die Browser-Frage noch nicht nötig (kein Rendering), sie muss erst vor Phase 2/5 geklärt sein.

## Entscheidungen bisher

- Gemini-Schlüssel kommt aus `GEMINI_API_KEY` (`GOOGLE_API_KEY` ist nicht gesetzt).
- Modell-IDs bestätigt über die API: `gemini-3.1-flash-image`, `gemini-3-pro-image`, `veo-3.1-generate-preview`.
- Gemini liefert JPEG. Alle Standbilder werden trotzdem mit `sharp` einheitlich als JPG Qualität 92 gespeichert.
- Rohdaten der Generierung landen in `work/` (nicht committet).
- Schrift: Inter über `@fontsource/inter`.

## Hinweise für eine neue Sitzung

- `npm ci` installiert alles. Testrendering: `npx remotion render src/index.ts Preflight out/test.mp4 --scale=0.6666666666666666 --browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell` (die Option `--browser-executable` entfällt, sobald `remotion.media` freigegeben ist).
- Preflight-Tests erneut: `node scripts/preflight.mjs /tmp/preflight` (erzeugt 1 Bild- und 1 Sprach-Aufruf, ins API-Log eintragen).
