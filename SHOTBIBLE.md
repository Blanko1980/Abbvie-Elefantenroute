# Shot-Bible „Elefanten-Route“

Ergänzt SCRIPT.md. Hier steht, wie aus dem Script Bilder werden: feste Prompt-Bausteine, Referenzblätter, Kamerastandpunkte, die komplette Shotliste mit Technik je Einstellung. Die Prompt-Bausteine sind englisch, weil die Bildmodelle damit am zuverlässigsten arbeiten. Alles andere ist deutsch.

## 1. Grundprinzip

Der Film besteht aus generierten Standbildern mit sehr langsamer Kamerabewegung (Remotion), wenigen kurzen Video-Clips für die zwei Momente, in denen sich der Elefant bewegt, und Typografie komplett in Code. Standbilder sind hier eine Stärke: Die Regie verlangt feste Kamera und lange Einstellungen.

Zwei Tricks, die das tragen:

- **Seitliche Kamerafahrt = Schwenk über ein breites Bild.** Solche Einstellungen werden im Format 21:9 generiert und in 16:9 ausgeschnitten und verschoben.
- **Zoom ohne Qualitätsverlust.** Schlüsselbilder in 2K, bei Push-ins in 4K generieren, damit der Ausschnitt nicht hochskaliert werden muss.

## 2. Prompt-Bausteine

Jeder Bild-Prompt wird zusammengesetzt aus: `STYLE_LOCK` + `SET_BLOCK` (falls Raum sichtbar) + `ELEPHANT_BLOCK` (+ Größenstufe) + Figuren-Bausteine + Bildinhalt der Shotliste + Licht-Token. Die Bausteine werden unverändert wiederverwendet, nicht umformuliert.

**STYLE_LOCK**

> Photorealistic documentary photograph, shot on a 200mm telephoto lens, shallow depth of field, locked-off tripod composition, natural daylight through large windows, muted natural color grading with warm whites and light oak wood, calm and observational mood, high resolution, fine film grain. No text, no logos, no signage, no watermark, no captions, no readable writing anywhere in the image.

**SET_BLOCK**

> Interior of a modern dermatology clinic: a bright reception hall with a long white reception counter with light oak details; a waiting area along a floor-to-ceiling glass front with a row of six simple upholstered chairs; a long corridor with light grey linoleum flooring; on the left wall of the corridor the door to the doctor's consulting room; at the far end of the corridor on the right a second plain white door with a small unreadable sign; on the corridor wall a generic framed guideline-style poster (unreadable, no logo, no text) and a wall monitor showing an abstract line chart (no numbers, no text).

**ELEPHANT_BLOCK**

> One adult African savanna elephant, realistic wrinkled grey skin, large ears, both tusks, calm and healthy, anatomically correct with four legs, standing indoors on the floor, casting a soft shadow. Not a cartoon, no human expression.

Größenstufen (an den Elephant-Block anhängen):

- **E1:** natural size, shoulder height about 3 meters, fits the room with space to walk around it.
- **E2:** appears larger in relation to the room, its flank takes up about half of the corridor width, back almost touching the ceiling.
- **E3:** looks enormous, its body fills the corridor from wall to wall and nearly to the ceiling, only a narrow gap left.

**DOCTOR_BLOCK**

> A man in his mid-50s, short grey-brown hair, kind calm face, white doctor's coat over a light blue shirt, holding a tablet. Same person as in the reference image.

**PATIENT_BLOCK** (Patientin, geändert am 12.10.2026)

> A young woman in her mid-20s, shoulder-length dark brown hair loosely tied back, natural everyday look with little makeup, slightly oversized dark grey long-sleeve knit sweater with sleeves pulled over her hands, upright posture, alert and composed expression with a hint of everyday annoyance, not sad, not exhausted, very subtle redness at the neck, never dramatic. Same person and same clothes as in the reference image.

**Licht-Token**

- **MORNING:** soft bright morning light through the glass front, clean and warm.
- **SEASON_SUMMER / AUTUMN / WINTER / SPRING:** same room and framing, visible through the windows: summer greenery / autumn leaves / snow / fresh spring leaves.
- **EARLY_AFTERNOON:** neutral bright daylight, slightly flatter.
- **LATE_AFTERNOON:** lower warmer sun, long soft shadows.
- **EVENING_COOL:** dusk outside, cool blue light mixed with cold fluorescent ceiling lights inside, lower contrast.
- **GOLDEN_LAST_SUN:** the last warm sunlight low through the windows, golden rim light, warm and gentle.

## 3. Kamerastandpunkte

Feste Standpunkte, damit der Raum über alle Bilder stimmt. Im Zweifel gilt: Die Geografie aus SCRIPT.md (Abschnitt „Set“) hat Vorrang.

- **CAM-A (Empfang):** am Flureingang in die Empfangshalle, Blick auf Wartebereich und Glasfront. Tresen rechts, Elefant mittig, Patient auf Stuhl 1 ganz links hinten.
- **CAM-B (Flur seitlich):** seitliche Totale im Flur, Arzt geht Richtung Sprechzimmertür links.
- **CAM-C (Flurende):** am Flurende rechts, Blick zurück zum Empfang. Im Hintergrund durch die Einmündung ist der Wartebereich mit dem Patienten klein erkennbar.
- **CAM-D (Wartebereich):** vorn links aus dem Wartebereich in den Flur. Patient im Anschnitt vorn links, am Flurende Tür 2.
- **CAM-E (Flurbeginn):** seitliche Totale am Übergang zwischen Empfangshalle und Flur für die Dreier-Konstellation (Arzt links, Elefant Mitte, Patient rechts).
- **CAM-F (Tür 2):** Halbtotale auf das Flurende, Tür 2 mit Arzt davor.

## 4. Referenzblätter (Phase 1)

Zuerst entstehen diese Referenzbilder. Sie werden bei jeder weiteren Generierung als Referenzbilder angehängt (die Bildmodelle akzeptieren bis zu 14).

- **R1 Arzt:** neutral beleuchtetes Halbfigur-Porträt frontal und eines im Dreiviertelprofil.
- **R2 Patientin:** dasselbe zwei Mal, mit Ärmeln über den Händen, plus eine Detailaufnahme Hand und Unterarm mit sehr dezenter Rötung.
- **R3 Elefant:** Seitenansicht und Dreiviertelansicht im Raum, Größenstufe E1.
- **R4 Set:** je ein Bild von CAM-A, CAM-C und CAM-D, ohne Figuren und ohne Elefant, damit die Raumgeometrie fixiert ist.

Die Referenzen werden zu einem Kontaktbogen (`review/contact-sheet-refs.jpg`) zusammengestellt und von mir freigegeben, bevor Phase 2 beginnt.

## 5. Shotliste

Technik-Kürzel: **Push** = sehr langsame Skalierung, **Pan** = Schwenk über ein 21:9-Bild, **Stand** = statisch, **Clip** = Video-Clip (Veo) mit Start- und Endbild. Zeiten laut SCRIPT.md, Abweichungen von maximal 10 Prozent sind erlaubt, wenn der Sprecher es verlangt.

| ID | Szene und Zeit | Bildinhalt | Technik | Standpunkt, Licht |
| --- | --- | --- | --- | --- |
| 00 | 0:00 bis 0:02 | Schwarz, nur Raumton (später) | Code | – |
| 01a | 1 · 0:02 bis 0:06 | Totale Empfangshalle, Elefant mittig, ruhig, atmet, leere Halle, nur wenige Personen weit hinten | Push 1.00 auf 1.04 | CAM-A, MORNING, E1 |
| 01b1 | 1 · 0:06 bis 0:08 | Halbtotale, MFA mit Akten geht links am Elefanten vorbei, ohne Blick | Stand | CAM-A näher, MORNING, E1 |
| 01b2 | 1 · 0:08 bis 0:10 | Gleiche Komposition, andere Passanten gehen rechts vorbei, ohne Blick | Stand | wie 01b1 |
| 01c | 1 · 0:10 bis 0:14 | Weitwinkel über den ganzen Raum. Elefant mittig, Patient klein auf Stuhl 1, Wanduhr zeigt ungefähr 9:10. Patient nicht hervorgehoben | Stand, kein Fokus auf ihn | CAM-A weit, MORNING, E1 |
| 02a | 2 · 0:14 bis 0:28 | Arzt geht durch den Flur, Elefant dicht dahinter, Rüssel nah am Ohr des Arztes. Breite 21:9-Komposition | Pan langsam von links nach rechts | CAM-B, MORNING, E1 |
| 02b | 2 · 0:28 bis 0:32 | Der Arzt verschwindet gerade in der Sprechzimmertür, der Elefant steht davor, Rüssel streift an der Tür | Stand | CAM-B, MORNING, E1 |
| 03a | 3 · 0:32 bis 0:34 | Flur von hinten, Arzt und Elefant gehen Richtung Empfang, dünne helle Spur im Linoleum | Stand | CAM-C, SUMMER, E1 |
| 03b | 3 · 0:34 bis 0:37 | Gleiche Komposition, Herbst, Spur deutlicher, Elefant etwas größer | Stand | CAM-C, AUTUMN, E1 bis E2 |
| 03f | 3 · 0:37 bis 0:39 | Elefant schiebt sich vor das Leitlinien-Poster, Poster halb verdeckt | Stand | CAM-C Nahaufnahme, E2 |
| 03c | 3 · 0:39 bis 0:41 | Gleiche Komposition, Winter, Spur breit und dunkel, Elefant E2 | Stand | CAM-C, WINTER, E2 |
| 03g | 3 · 0:41 bis 0:43 | Flanke des Elefanten verdeckt den Monitor mit der Datenkurve | Stand | CAM-C Nahaufnahme, E2 |
| 03d | 3 · 0:43 bis 0:46 | Gleiche Komposition, Frühling, Spur sehr breit | Stand | CAM-C, SPRING, E2 bis E3 |
| 03h | 3 · 0:46 bis 0:48 | Tür 2 am Flurende liegt halb im Schatten des Körpers, Arzt geht daran vorbei | Stand | CAM-C Nahaufnahme, E3 |
| 03e | 3 · 0:48 bis 0:50 | Gleiche Komposition, Sommer Jahre später, Elefant füllt den Flur von Wand zu Wand | Stand | CAM-C, SUMMER, E3 |
| 04a | (Startbild von V2) | Arzt geht im Schritt auf Tür 2 zu, zwei Schritte davor, Hand geht zur Klinke, Elefant folgt dicht hinter ihm, Rüssel hängt locker | Startbild | CAM-F, EARLY_AFTERNOON, E3 |
| V2 | 4 · 0:50 bis 0:56 | Clip: Arzt geht zur Tür und greift nach der Klinke, in diesem Moment legt sich der Rüssel auf seine rechte Schulter und bremst ihn. Startbild 04a, Endbild 04b | Clip, 8 Sekunden erzeugt, ca. 6 Sekunden genutzt | CAM-F |
| 04b | 4 · 0:56 bis 1:04 | Halbnah auf Hand an der Klinke, Schulter und Rüssel, Arzt schaut zur Tür | Push 1.00 auf 1.10 | CAM-F nah, EARLY_AFTERNOON, E3 |
| 05a | 5 · 1:04 bis 1:09 | Blick vom Wartebereich in den Flur, Elefant am Flurende vor Tür 2, Patient im Anschnitt vorn links, 3 andere Patienten im Raum | Stand | CAM-D, EARLY_AFTERNOON, E3 |
| 05b | 5 · 1:09 bis 1:14 | Gleiche Komposition, wärmeres Licht, 1 anderer Patient, Patient etwas zusammengesackt | Stand | CAM-D, LATE_AFTERNOON, E3 |
| 05c | 5 · 1:14 bis 1:20 | Gleiche Komposition, Abendlicht, Wartebereich leer bis auf den Patienten, Uhr ungefähr 17:40 | Stand | CAM-D, LATE_AFTERNOON bis EVENING_COOL, E3 |
| 06a | 6 · 1:20 bis 1:22 | Halbnah auf den Patienten, er steht gerade auf, Stuhl leicht verrückt | Stand | CAM-D nah, EVENING_COOL |
| 06b | 6 · 1:22 bis 1:25 und 7 · 1:30 bis 1:43 | Dreier-Totale: Arzt links, Elefant Mitte, Patientin rechts, ca. 3 m Abstand Arzt zu Patientin; lebendiges Set (Pflanzen, Jacke, Tasche, Becher, Stehleuchte, MFA macht im Hintergrund Feierabend), natürliche Haltung, unscharfes Blatt im Vordergrund | Stand (Szene 6), Push 1.00 auf 1.15 (Szene 7) | CAM-E, EVENING_COOL, E3 |
| 06c | 6 · 1:25 bis 1:27 | Nahe auf den Arzt, er will zum Patienten schauen, die Flanke des Elefanten schiebt sich ins Bild | Stand | CAM-E nah, EVENING_COOL |
| 06d | 6 · 1:27 bis 1:30 | Nahe auf den Patienten, Ärmel über der Hand, er kratzt am Unterarm, ruhiger Blick, kein Flehen | Stand | CAM-E nah, EVENING_COOL |
| 08a | 8 · 1:43 bis 1:47 | Nahe auf das Gesicht des Arztes, er sieht den Elefanten an. Am Bildrand ein Stück Elefant mit Ohr | Stand | CAM-E nah, EVENING_COOL |
| V1 | 8 · 1:47 bis 1:50 | Clip: Elefant hebt einen Vorderfuß und tritt ca. 1,5 m nach links aus der Sichtachse, ohne Eile. Startbild 06b, Endbild 08c | Clip, 4 Sekunden, auf ca. 3 Sekunden kürzen | CAM-E |
| 08c | (Endbild von V1) | Wie 06b, Elefant jetzt am linken Bildrand, leicht unscharf, Arzt und Patient stehen sich frei gegenüber | Stand | CAM-E, Übergang zu GOLDEN_LAST_SUN |
| 08d | 8 · 1:50 bis 1:55 | Halbnah: Arzt und Patient sehen sich an, hinter dem Patienten fällt warmes Sonnenlicht durch die Fenster, der Patient hebt den Blick | Stand | CAM-E nah, GOLDEN_LAST_SUN |
| End | 1:55 bis 2:07 | Endcard, reines Weiß, Typografie | Code | – |
| Coda | 2:07 bis ca. 2:22 | Textkarten, weiß auf Schwarz | Code | – |

Insgesamt 26 Standbilder (ohne 00, 08c als Endbild gezählt) und 2 Clips.

## 6. Varianten und Konsistenz

- **Varianten entstehen aus einem Master-Bild**, nicht aus neuen Prompts: Das Master einer Komposition (zum Beispiel 03a) wird per Bildbearbeitung mit klaren Änderungsanweisungen abgewandelt („same room, same camera, same framing, only change the season outside the windows and make the worn path in the floor wider“). So bleiben Perspektive und Raum identisch. Das gilt für 03a bis 03e, 05a bis 05c und 08c aus 06b.
- **Kleiderordnung:** Arzt immer weißer Kittel über hellblauem Hemd. Patientin immer dunkelgrauer Pullover, Ärmel über den Händen. Sitzplatz des Patienten immer Stuhl 1 links.
- **Größenstufen** des Elefanten laut Shotliste einhalten. Keine Stufe darf von Einstellung zu Einstellung kleiner werden.
- **Uhren:** Bildmodelle zeichnen keine exakten Uhrzeiten. Wanduhr nur zeigen, wenn die Zeiger plausibel stehen (ungefähr 9 Uhr, ungefähr 17:40). Die Zeit wird hauptsächlich über Licht erzählt, die Uhr ist nicht kritisch.
- **Keine Schrift aus dem Bildmodell.** Poster, Türschild und Monitor bleiben leer oder abstrakt. Jede Schrift im Film entsteht in Code.

## 7. Qualitätscheck je Bild

Bevor ein Bild akzeptiert wird, prüfen:

1. Keine Schrift, keine Logos, keine Marken, keine Wasserzeichen.
2. Elefant anatomisch korrekt (vier Beine, ein Rüssel, zwei Stoßzähne, keine verschmolzenen Körperteile) und in der richtigen Größenstufe.
3. Arzt und Patient erkennbar dieselben Personen wie in R1 und R2, gleiche Kleidung.
4. Raumgeometrie stimmt (Türen links und am Flurende rechts, Wartebereich an der Glasfront).
5. Licht passt zum Licht-Token der Shotliste.
6. Keine auffällige Bildstörung (zusätzliche Finger, doppelte Gliedmaßen, verformte Hände).

Maximal 3 Versuche pro Bild. Danach Prompt oder Referenzen anpassen und kurz melden, was nicht klappt.

## 8. Clips (Veo)

- **V1 (Pflicht)** in Szene 8: Elefant tritt zur Seite. Startbild 06b, Endbild 08c, 4 Sekunden, 720p reicht, weil der Clip nur 3 Sekunden läuft.
- **V2 (empfohlen)** in Szene 4: Rüssel legt sich auf die Schulter. Startbild 04a, Endbild 04b, 4 Sekunden.
- Veo erzeugt immer Ton. Dieser Ton wird im Schnitt stumm geschaltet.
- Kein weiterer Clip ohne Rücksprache. Wenn ein Clip nach 3 Versuchen nicht überzeugt, Fallback: Überblendung von Start- und Endbild mit leichter Kamerabewegung und kurze Rückmeldung.
