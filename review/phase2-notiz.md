# Phase 2: Drei-Shot-Test

Stand: 12.10.2026

## Was zu prüfen ist

| Datei | Inhalt |
| --- | --- |
| `review/contact-sheet-phase2.jpg` | Alle fünf Bilder und die nutzbaren Ausschnitte beider Clips |
| `review/clips-schnittvorschlag.mp4` | V2 (3,5 bis 7,5 s) und V1 (3,0 bis 6,0 s) hintereinander, ohne Ton, so wie ich sie im Film einsetzen würde |
| `public/clips/V1.mp4`, `public/clips/V2.mp4` | Die vollständigen 8-Sekunden-Clips, mit Veo-Ton (wird im Film stumm geschaltet) |
| `review/voice/christian-plasa-warm.mp3` | **Empfohlene Stimme** |
| `review/voice/alexander-tv-narrator.mp3`, `review/voice/thomas-schendel-calm.mp3` | Alternativen, ebenfalls männlich |

## Was gut war

- **Integration des Elefanten:** Mit Pro-Modell, Gegenlicht und Kontaktschatten sitzt er in 01a, 06b und 08c glaubhaft im Raum.
- **Figuren:** Arzt und Patientin sind über alle Bilder hinweg klar dieselben Personen, auch mit dem Pro-Modell und bis zu 8 Referenzbildern.
- **Szene 4 (Rüssel auf der Schulter):** Der Moment wirkt ruhig und fürsorglich, nicht bedrohlich. Clip V2 setzt die Geste weich und glaubhaft um.
- **Szene 8 (V1):** Der Elefant tritt ohne Eile zur Seite, das Licht wechselt von kühl zu golden, Arzt und Patientin bleiben stehen.
- **Sprecher:** Alle drei Proben sind textgenau, ohne Aussprachefehler, ruhig, Satzenden gehen nach unten (geprüft per Transkription mit Gemini, siehe API-Log).

## Was schwierig war

- **Veo und 4-Sekunden-Clips:** Mit Start- und Endbild akzeptiert die API nur 8 Sekunden. Die 4-Sekunden-Anfragen lehnt sie mit „use case not supported“ ab; diese beiden Fehlversuche wurden nicht berechnet. Beide Clips sind daher 8 Sekunden lang, das kostet etwa das Doppelte. Im Film nutze ich je einen Ausschnitt.
- **Veo füllt 8 Sekunden mit mehr Bewegung als gewünscht:**
  - In V2 läuft der Elefant in den ersten 3 Sekunden nach vorn und wird kurz kleiner.
  - In V1 geht er erst auf die Kamera zu, bevor er nach links tritt, und dreht sich am Ende weg.
  - Die nutzbaren Ausschnitte (V2 3,5 bis 7,5 s, V1 3,0 bis 6,0 s) sind sauber.
- **Übergang 04a zu V2:** Im Clip ist der Elefant etwas kleiner als im Standbild 04a. Ein harter Schnitt vom Standbild in den Clip würde springen. **Vorschlag:** Für 0:50 bis 0:52 nehme ich statt 04a das Clip-Bild bei 3,5 Sekunden als Standbild. Dann läuft die Einstellung ohne Sprung in die Bewegung. Nachteil: Dieses Bild hat nur 720p statt 2K.
- **04b:** Das Modell hat den Bildausschnitt nicht verengt (gleicher Ausschnitt wie 04a). Den Push bis auf Hand und Schulter, den das Script verlangt, mache ich in Remotion über das 4K-Bild.
- **04a:** Der Raum weicht leicht vom Set ab: Holzleisten an den Wänden, Rasterdecke, helle klinische Lichtstimmung.
- **06b:** Erst im zweiten Versuch stimmte der Raum. Im ersten hatte das Modell eine andere Klinik mit Poster und Text erfunden. Hilfreich war, den Hintergrund genau zu benennen und nur eine Raumreferenz mitzugeben.
- **08c:** Der Elefant steht nach dem Schritt links hinter dem Arzt statt im Vordergrund am Bildrand. Der Arzt steht schon ganz links; ein Elefant im Vordergrund hätte ihn verdeckt. Der Elefant ist nur leicht unscharf.
- **Wanduhr:** Sie zeigt in 01a weiterhin 10:10 (laut Shot-Bible unkritisch).

## Sprecher

Empfehlung: **Christian Plasa (Warm Voice)**.

- **Tempo:** Er spricht am ruhigsten, rund 2,1 Wörter pro Sekunde. Das Script rechnet mit 2.
- **Stimmlage:** Er hat die tiefste und gleichmäßigste Stimmlage aller drei Proben (Grundton im Mittel etwa 83 Hz, wenig Melodiebewegung). Das passt zu „trocken, nie ironisch“.
- **Verfügbarkeit:** Die Stimme liegt fest im Konto. Die beiden Alternativen stammen aus der öffentlichen Stimmbibliothek und könnten dort zurückgezogen werden.

Einstellungen der Probe: `eleven_multilingual_v2`, Stabilität 0,55, Ähnlichkeit 0,8, Stil 0, Tempo 0,92. Erzeugt wurde satzweise mit Übergangskontext, die Pausen sind gesetzt. Das Format ist MP3 mit 128 kbit/s, mehr erlaubt das aktuelle ElevenLabs-Abo nicht. Für Sprache reicht das.

## Kosten Phase 2

- **Bilder:** 7 Aufrufe (5 angenommen, 2 abgelehnt), alle mit `gemini-3-pro-image`.
- **Clips:** 2 erzeugt, je 8 s in 720p; dazu 2 abgelehnte Anfragen, die nicht berechnet wurden.
- **Sprache:** 15 Satzaufrufe (3 Stimmen × 5 Sätze); dazu 2 Fehlversuche wegen des Formats, die nicht berechnet wurden.
- **Prüfung:** 3 Textaufrufe zur Prüfung der Sprecherproben.

## Runde 2 (nach Feedback vom 12.10.2026)

**Entscheidungen:**
- **Sprecher:** Thomas Schendel. Script und Status sind angepasst.
- **Szene 4:** Der Arzt geht auf die Tür zu, der Rüssel bremst ihn. Script und Shot-Bible sind angepasst: V2 läuft jetzt von 0:50 bis 0:56, 04a ist nur noch Startbild.
- **Szenen 6 bis 8:** mehr Leben im Set.

**Neu erzeugt:**
- **04a:** Der Arzt geht mitten im Flur, drei Schritte vor der Tür. Im ersten Versuch war er zu nah an der Tür; im Clip hatte er dann sofort die Klinke und wartete, bis der Rüssel kam.
- **V2:** Der Arzt geht etwa 3 Sekunden zügig und greift zur Klinke. Der Rüssel ist schon unterwegs und legt sich bei etwa 4,5 Sekunden auf seine Schulter, der Arzt hält inne. Nutzbar ist der Ausschnitt von 0,5 bis 6,5 Sekunden, siehe `review/clips-schnittvorschlag.mp4`.
- **06b:**
  - Grünpflanzen, eine warme Stehleuchte, die Jacke über einer Stuhllehne, ein Kaffeebecher auf der Fensterbank.
  - Im Hintergrund zieht sich eine MFA für den Feierabend an.
  - Der Arzt steht locker mit gesenktem Tablet, die Patientin kratzt sich am Unterarm.
- **08c:** Der Elefant tritt nach links hinter den Arzt. Die beiden sehen sich an, goldenes Licht fällt über den Boden, die MFA ist gegangen.

**Bekannte Abweichungen:**
- **V2:** Die vom Modell ergänzte Stuhlreihe im Flur verschwindet, während der Arzt daran vorbeigeht, weil das Endbild 04b keine Stühle hat. Bei normaler Geschwindigkeit fällt es kaum auf.
- **06b:**
  - Die Patientin trägt Jeans; in 01a war die Hose dunkel.
  - Die Ärmel sind am Unterarm hochgeschoben statt über den Händen.
  - Die MFA trägt einen weißen Kittel über blauer Praxiskleidung und konkurriert dadurch etwas mit dem Arzt.
  - Das unscharfe Blatt im Vordergrund fehlt.
- **08c:** Der Elefant ist nicht unscharf.

**Noch offen:** Clip V1 erzeuge ich neu, sobald du das neue 06b freigibst. Der alte V1 passt nicht mehr zu den Bildern und ist nicht mehr im Repo.

**Kosten Runde 2:** 4 Bildaufrufe (alle angenommen bis auf das erste neue 04a), 2 Clips (V2 zweimal, der erste abgelehnt).

## Runde 3 (Abschluss Phase 2)

**Entscheidungen:**
- Der Look von 06b und 08c ist freigegeben.
- Die MFA trägt Straßenkleidung.
- Die Patientin trägt Jeans; im Patientinnen-Baustein steht jetzt „blue jeans and white sneakers“.
- Bewegung und Timing von V2 sind freigegeben.

**Neu:**
- **06b:** Bildbearbeitung, die MFA trägt jetzt Trenchcoat und Handtasche.
- **V1:** Der Elefant tritt ohne Eile nach links hinter den Arzt. Die MFA geht hinaus, die Patientin senkt den Arm und sieht auf, das Licht wird golden. Nutzbar ist der Ausschnitt von 3,0 bis 6,0 Sekunden. Die Einzelbildprüfung zeigt keine Sprünge.

**Rüssel-Fehler in V2 und Plan für den finalen Schnitt:**
- Der Rüssel legt sich bei etwa 4,75 Sekunden auf die rechte Schulter, also die von der Kamera abgewandte, wie es das Script verlangt.
- Zwischen 5,25 und 5,75 Sekunden springt er durch Kopf und Hals auf die linke Schulter.
- Im Film läuft V2 deshalb nur von 0,5 bis 5,2 Sekunden (0:50 bis etwa 0:54,7). Der Rüssel landet bei 0:54, passend zur Einblendung.
- Danach folgt ein **neues 04b** mit dem Rüssel auf der rechten Schulter, als Bildbearbeitung aus dem Clip-Bild bei 5 Sekunden in 4K (Phase 3).
- Der Schnittvorschlag `review/clips-schnittvorschlag.mp4` zeigt beide Ausschnitte.

**Weitere Aufgaben für Phase 3:**
- **01a:** Die Patientin trägt dort noch eine dunkle Hose und bekommt Jeans (Bildbearbeitung).

**Kosten Runde 3:** 1 Bild, 1 Clip.

**Phase 2 gesamt:** 12 Bildaufrufe, 5 erzeugte Clips (je 8 s; V2 dreimal, V1 zweimal; dazu 2 abgelehnte Anfragen, die nicht berechnet wurden), 15 Sprachaufrufe, 3 Prüfaufrufe (Text).
