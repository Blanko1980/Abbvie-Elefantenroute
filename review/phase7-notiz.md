# Pacing nach Feedback vom 16.10.2026

Grundlage: `Feedback_Elefantenvideo_16_Okt.docx` plus deine Antworten auf die drei Rückfragen.

## Ergebnis

`review/rohschnitt-animiert-720p.mp4`: 1:50,3 statt 2:25,1 (2647 Frames).

| Szene | vorher | jetzt | Änderung |
| --- | --- | --- | --- |
| 1 Der Elefant | 17,2 s | 17,2 s | Elefant klein: 01a und 01b1 etwa Hundegröße, 01b2 und 01c Ponygröße |
| 2 Gedächtnis | 18,0 s | 16,0 s | Elefant wächst beim Gehen von Pony- auf Arztgröße (zwei Clips, V02a und V02a2), V02b mit Elefant in Arztgröße |
| 3 Trampelpfad | 18,0 s | 15,0 s | V03d gestrichen |
| 4 Respekt | 14,9 s | 11,1 s | Gang zur Tür gekürzt (V2 erst ab 3,0 s, Arzt steht schon an der Tür) |
| 5 Warten | 16,0 s | 16,0 s | unverändert |
| 6 Die Patientin | 10,0 s | 10,0 s | unverändert |
| 7 Der Satz | 13,0 s | 13,0 s | Satz „Man muss den Entscheidungselefanten bewusst wahrnehmen.“ jetzt hier; alle vier Sätze neu gesprochen, sachlicher |
| 8 Der Schritt | 12,0 s | 8,0 s | 08a gestrichen; V1 ungegradet, V08d an die Lichtstimmung von V07a angeglichen |
| Endcard | 12,0 s | 4,0 s | nur „LASST UNS ÜBER ELEFANTEN REDEN.“, dann Ende |
| Coda | 14,0 s | – | entfällt |

## Tonspur

- **Kürzungen:** Beim Kürzen ist kein Problem entstanden. Kein Satz wird abgeschnitten, alle Pausen bleiben wie gehabt.
- **Szene 4:** Der erste Satz kommt jetzt 0,9 s nach dem Aufsetzen des Rüssels.
- **Szene 8:** „Dann öffnen sich neue Wege.“ fällt auf den Beginn von V08d, als die beiden sich ansehen.
- **Szene 7, Sprecher:**
  - **Einstellungen:** Stabilität 0,9 statt 0,55, Tempo 1,04 statt 0,92, als Übergangskontext die sachlichen Sätze aus Szene 5.
  - **Prüfung per Gemini:** sachlich 10 von 10 (vorher 2), meditativ 1 von 10 (vorher 10).
  - **Vergleich:** `review/voice/szene7-vorher-nachher.mp3`, zuerst die alte, dann die neue Fassung.

## Der kleine Elefant

- **Was nicht ging:** Das Bildmodell weigert sich, einen Elefanten „hundegroß“ zu machen. Es liefert bestenfalls Pferdegröße.
- **Weg in Szene 1:**
  1. Den Elefanten aus dem Bild entfernen lassen (leerer Raum).
  2. Neu einsetzen lassen.
  3. Bei 01a, 01b1 und 01b2 lokal verkleinern und in den leeren Raum setzen (`scripts/shrink-elephant.py`).
  4. Vom Modell nur noch Licht, Schatten und Kanten angleichen lassen.
- **Abweichung:** In 01b1 ist er etwas größer als ein Schäferhund, etwa hüfthoch zur MFA.
- **Szene 2, V02a:**
  - Veo fuhr in beiden Versuchen an einer Wandecke vorbei, die das Bild ein bis zwei Sekunden verdeckt.
  - Genutzt werden deshalb nur die sauberen 3,8 s ab 4,2 s.
  - Das Wachstum kommt aus V02a2. Der Clip setzt am letzten Bild an und endet auf dem Standbild 02b, mit dem V02b beginnt.

## Aufwand dieser Runde

- 19 Bildaufrufe (Pro-Modell): 5 leere Räume, 10 Elefanten-Bilder, 4 Angleichungen.
- 8 Clips mit zusammen 50 s.
- 8 Sprachaufrufe für zwei Varianten zu je 4 Sätzen.
- 1 Prüfaufruf (Text).

## Betonung nach Feedback (16.10.2026, Sprecherspur noch nicht im Video)

| Satz | Problem | Lösung |
| --- | --- | --- |
| s3-1 „Mit der Zeit wird aus Erinnerung Gewohnheit.“ | klang wie „derzeit“ | Komma nach „Zeit“ (nur im Text an ElevenLabs), kleine Zäsur |
| s4-1 „Neue Wege verunsichern den Elefanten.“ | Betonung auf „Elefanten“ | „VERUNSICHERN“ in Großbuchstaben |
| s5-1 „… des ausgewachsenen Entscheidungselefanten.“ | Betonung auf „Entscheidungselefanten“ | Vorkontext, in dem der Entscheidungselefant schon genannt ist („Junge Entscheidungselefanten …“), dadurch Betonung auf „ausgewachsenen“ |
| s7-2 „Er begleitet jeden von uns.“ | Betonung auf „von uns“ | „JEDEN“ plus Kontrast im Vorkontext |
| s8-1 „Man muss den Entscheidungselefanten bewusst wahrnehmen.“ | Betonung nicht auf „wahrnehmen“ | Vorkontext „… zu kennen, reicht nicht.“; Alternative am Ende der Hörprobe |

- **Prüfung:**
  - Wortgrenzen per Forced Alignment (`scripts/align-words.mjs`).
  - Je Wort Tonhöhenspitze, Lautheit und Dauer gemessen (`scripts/stress-measure.py`).
  - Dazu Gemini als zweites Ohr. Gemini allein war bei Betonung nicht zuverlässig, im Blindvergleich bevorzugte es oft einfach die zweite Aufnahme.
- **Hörprobe:** `review/voice/betonung-vorher-nachher.mp3`, je Satz erst alt, dann neu, am Ende die Alternative für s8-1.
- **Zeitleiste:** neu berechnet, 1:50,5 statt 1:50,3. `review/voice/sprecher-timeline.mp3` ist aktualisiert. Das Video ist noch nicht neu gerendert (deine Vorgabe).

## Musik (16.10.2026, noch nicht im Video)

- **Erzeugt:** ElevenLabs `music_v1` mit Kompositionsplan (`data/music/plan.json`, `scripts/gen-music.mjs`), instrumental. Die Abschnitte sind auf die Szenenlängen abgestimmt.
- **M1, Hauptstück (0:02 bis 1:15,5):**
  - Szene 1: Harfe und Flöte.
  - Szene 2: Pizzicato-Gehen, Klarinette antwortet.
  - Szene 3: Streicher-Ostinato, Hörner, Steigerung.
  - Szene 4: Cello, ruhiger, aber warm.
  - Szene 5: vollster Punkt.
  - Harter Abbruch, als Szene 6 beginnt.
- **M2, Szene 8 (ab 1:40,5):** kurze aufsteigende Flötenphrase mit Harfe, endet in einem warmen Dur-Akkord, der in die Endcard ausklingt.
- **Prüfung per Gemini:**
  - beide Stücke in Dur, „naturdokutypisch“ 10 von 10, „traurig“ 1 von 10, keine Haltetöne;
  - Sprecher in der Mischung 10 von 10 verständlich.
- **Mischung (`data/music/mix.json`, `scripts/music-mix.py`):**
  - Musik 4 dB unter dem Sprecher.
  - Unter jedem Satz 9 dB leiser, mit Rampen von 0,4 s.
  - Gesamtpegel −20 LUFS.
- **Hörprobe:** `review/music/mix-sprecher-musik.mp3` (Sprecher und Musik im Filmtiming).
- **Offen:** Der harte Abbruch bei 1:15 steht so im Script. Ohne Bild kann er wie ein Fehler wirken. Die Alternative wäre eine kurze Blende von 1 bis 1,5 s.
