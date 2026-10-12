# Projekt: Elefanten-Route (interner Film)

Du baust einen ca. 2:07 Minuten langen Film plus 15 Sekunden Coda (16:9, 1920×1080, 24 fps, MP4) im Stil einer BBC-Naturdoku. Er ist ein **interner Erklärfilm** und wird keinem Arzt und keinem Patienten gezeigt. Sprache der Zusammenarbeit: Deutsch.

## Lies zuerst

- `SCRIPT.md`: das verbindliche Script mit Szenen, Zeiten, Sprechertexten und Regie-Details.
- `SHOTBIBLE.md`: Prompt-Bausteine, Referenzblätter, Kamerastandpunkte und die komplette Shotliste mit Technik je Einstellung.

Weiche davon nur nach Rücksprache ab. Wenn etwas im Script nicht umsetzbar ist, schreibe konkret, was nicht geht, und schlage eine Alternative vor, statt es stillschweigend zu ändern.

## Technik

- **Rendering:** Remotion (React), 1920×1080, 24 fps. Versionen festpinnen. Schrift über npm (`@fontsource/inter` oder eine vergleichbare serifenlose Schrift), keine Schrift von einem CDN.
- **Bilder:** Gemini-API mit dem SDK `@google/genai`. Standard für Standbilder ist `gemini-3.1-flash-image`, für besonders schwierige Bilder (Elefant berührt Arzt, Dreier-Konstellation) `gemini-3-pro-image`. Bis zu 14 Referenzbilder je Aufruf. Schlüsselbilder in 2K, die Push-in-Bilder 01a, 04b und 06b in 4K.
- **Clips:** Veo 3.1 über die Gemini-API (`veo-3.1-generate-preview`), Image-to-Video mit Start- und Endbild, 4 Sekunden. Veo liefert immer Ton, der im Film stumm geschaltet wird.
- **Sprecher:** ElevenLabs-API (deutsche Dokustimme).
- **Musik und Raumton:** vorerst nicht. Die Komposition bekommt dafür leere, benannte Audiospuren (`music`, `ambience`), damit sie später nur befüllt werden müssen.
- Modell-IDs und Parameter ändern sich: Prüfe vor dem ersten Einsatz die aktuelle Doku (ai.google.dev für Gemini und Veo, elevenlabs.io/docs für ElevenLabs) und nimm die dort genannten IDs.

## Arbeitsweise in der Cloud

- Arbeite auf dem Branch `film/elefant-v1` und committe nach jedem abgeschlossenen Schritt.
- Ich sehe nur, was committet ist. Alles zum Prüfen kommt in den Ordner `review/` (Kontaktbögen als JPG, Audio-Proben als MP3, Proxy-Videos).
- Schreibe nach jeder Phase `STATUS.md`: was ist fertig, was ist offen, welche Entscheidungen sind gefallen. Eine neue Sitzung muss damit nahtlos weiterarbeiten können.
- Am Ende jeder Phase mit „STOP“ beendest du deine Arbeit mit einer kurzen Zusammenfassung und wartest auf meine Antwort.

## Schlüssel und Netzwerk

- Schlüssel nur aus Umgebungsvariablen: Gemini aus `GEMINI_API_KEY` oder `GOOGLE_API_KEY` (prüfe, welche gesetzt ist), ElevenLabs aus `ELEVENLABS_API_KEY`. Gib Werte niemals aus, logge sie nicht und committe sie nicht. `.env` gehört in `.gitignore`.
- Die Cloud-Umgebung erlaubt nur bestimmte Hosts. Gebraucht werden `generativelanguage.googleapis.com`, `api.elevenlabs.io` und die npm-Registry. Remotion lädt beim ersten Rendern außerdem einen Headless-Browser herunter. Wenn ein Host blockiert ist, versuche keine Umwege, sondern nenne mir die exakte Hostliste, die in den Umgebungseinstellungen freigegeben werden muss.

## Phasen

**Phase 0: Preflight.** Prüfe und berichte in `PREFLIGHT.md`: Node- und npm-Version, ob die Umgebungsvariablen gesetzt sind (nur ja oder nein), je ein minimaler Testaufruf an Gemini und ElevenLabs, ein 2-Sekunden-Testrendering in Remotion bei 720p mit Messung der Renderzeit. Wenn etwas scheitert: **STOP** mit genauer Anleitung, was ich ändern muss.

**Phase 1: Referenzblätter** R1 bis R4 laut `SHOTBIBLE.md`. Kontaktbogen in `review/contact-sheet-refs.jpg`. **STOP** zur Freigabe.

**Phase 2: Drei-Shot-Test.** Erzeuge (a) Bild 01a, (b) Bilder 04a und 04b plus Clip V2, (c) Bilder 06b und 08c plus Clip V1. Dazu eine Sprecherprobe: der Text aus Szene 2 und Szene 4 in drei verschiedenen deutschen Stimmen (ruhig, warm, trocken, nie ironisch), je als MP3 in `review/voice/`. Kontaktbogen und kurze Notiz, was gut und was schwierig war. **STOP.**

**Phase 3: Alle Standbilder.** Alle 26 Bilder der Shotliste, Varianten per Bildbearbeitung aus dem Master-Bild. Qualitätscheck aus `SHOTBIBLE.md`, Kontaktbogen je Szene in `review/`. **STOP.**

**Phase 4: Sprecher.** Mit der freigegebenen Stimme den Sprechertext satzweise erzeugen, Dauer messen (ffprobe), Pausen laut `SCRIPT.md` setzen. Daraus entsteht `data/timeline.json` mit den tatsächlichen Szenenzeiten. Weicht eine Szene um mehr als 10 Prozent vom Script ab, melde es.

**Phase 5: Schnitt in Remotion.**

- Komposition aus `data/timeline.json`, Bilder aus `public/stills/`, Clips aus `public/clips/`.
- Kamerabewegung: `KenBurns` (Skalierung von bis, langsam, sanfte Beschleunigung) und `Pan` (Verschiebung über ein 21:9-Bild). Beides laut Technik-Spalte der Shotliste.
- Harte Schnitte, nur Szene 5 mit 1 Sekunde Überblendung zwischen den drei Lichtstufen.
- Einblendungen (Szenen 2 und 4): weiße serifenlose Schrift in Anführungszeichen, unteres Drittel, zentriert, 0,3 Sekunden Ein- und Ausblenden, je 2,5 Sekunden sichtbar.
- Endcard: reines Weiß, schwarze serifenlose Schrift, Versalien-Zeile erscheint sofort, 2 Sekunden später die zweite Zeile klein, genaue Zeiten laut `SCRIPT.md`.
- Coda: die vier Textkarten weiß auf Schwarz, je ca. 3,5 Sekunden.
- Erst Proxy-Rendering `review/rohschnitt-720p.mp4` (CRF 28), danach nach Freigabe das finale `renders/elefant-v1-1080p.mp4` (H.264, CRF 20). Wenn die Datei größer als 95 MB wird, mit höherem CRF neu kodieren und mir das mitteilen, weil GitHub Dateien über 100 MB ablehnt. **STOP** nach dem Rohschnitt.

**Später, nicht jetzt:** Musik (vermutlich Suno), Raumton, Tiefenkarten-Parallax.

## Regeln

- **Keine Namen im Material.** Keine Kunden-, Marken-, Produkt- oder Wirkstoffnamen in Prompts, Dateinamen, Commit-Nachrichten oder im Bild. Der Film braucht sie nicht.
- **Keine Schrift aus Bildmodellen.** Jede Schrift im Film entsteht in Code.
- **Asset-Politik.** Bilder als JPG (Qualität 92) in `public/stills/<ID>.jpg`, Clips in `public/clips/<ID>.mp4`, keine PNG-Originale committen. Abgelehnte Bilder werden nicht committet.
- **Manifest.** `data/manifest.json` führt für jedes Asset: ID, vollständig zusammengesetzten Prompt, Modell-ID, Referenz-IDs, Versuchsnummer, Zeitstempel, Status (freigegeben oder abgelehnt).
- **Kostenkontrolle.** Maximal 3 Versuche pro Bild. Nicht mehr als die Clips V1 und V2 ohne meine Freigabe. Führe in `review/api-log.md` mit, wie viele Bild-, Clip- und Sprach-Aufrufe gelaufen sind.
- **Rückfragen.** Wenn eine Entscheidung nicht im Script oder in der Shot-Bible steht und das Ergebnis sichtbar beeinflusst, frage nach, statt zu raten.

## Fertig ist der Film, wenn

- `renders/elefant-v1-1080p.mp4` existiert und die Länge laut `data/timeline.json` stimmt,
- Script, Shotliste und Film übereinstimmen oder Abweichungen in `STATUS.md` begründet sind,
- `review/`, `STATUS.md` und `data/manifest.json` aktuell sind.
