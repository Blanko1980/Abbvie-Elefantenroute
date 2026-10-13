# Phase 3: Alle Standbilder

Stand: 12.10.2026

Alle **26 Standbilder** liegen in `public/stills/`. Pro Szene gibt es einen Kontaktbogen in `review/phase3/`: Szene 1, 2, 3, 4, 5, 6 und 7 gemeinsam, 8. Szene 7 nutzt 06b mit einem Push.

## Was gut lief

- **Licht und Integration:** Der Elefant sitzt mit Gegenlicht, Kontaktschatten und staubiger Haut in allen Bildern glaubhaft im Raum.
- **Figuren:** Arzt und Patientin bleiben über alle Szenen erkennbar dieselben Personen. Die Patientin trägt überall Jeans und den grauen Pullover.
- **Szene 3:** Die Varianten 03b bis 03e (Bildbearbeitung aus 03a) halten Kamera und Raum exakt.
  - Die Jahreszeiten wechseln, die Spur wird breiter und dunkler, der Elefant wächst.
  - Die Patientin sitzt in jedem Bild unverändert hinten.
- **Szene 5:** Auch 05a bis 05c sind konsistent. Die Wartenden verschwinden, die Patientin sackt zusammen, das Licht geht in den Abend.
- **04b:** Als Neuaufbau des V2-Bilds bei 5,15 Sekunden in 4K liegt der Rüssel wie im Clip auf der rechten Schulter. Der Übergang vom Clip ins Standbild wird damit unsichtbar.
- **Lebendige Details:** Pflanzen, Stehleuchte, Jacke, Becher und Wartende ziehen sich durch die Szenen 1, 5, 6 und 8.

## Was nicht ganz gelungen ist

| Bild | Problem | Vorschlag |
| --- | --- | --- |
| 03f | Der Elefant steht neben dem Poster statt davor (nach 3 Versuchen) | So lassen (2 s im Zeitraffer) oder eine Zusatzrunde mit anderer Kamera |
| 03g | Die Flanke steht neben dem Monitor statt davor (nach 3 Versuchen) | wie 03f |
| 03d | Die Frühlingsbäume sind hinter den hellen Fenstern kaum zu sehen | Farbe/Kontrast der Fenster in Remotion leicht anheben oder so lassen |
| 03e | Der Elefant füllt den Flur nicht ganz von Wand zu Wand, links bleibt eine Lücke | So lassen; er ist trotzdem das Größte im Flur |
| 01c | Der Ausschnitt ist kaum weiter als 01a | So lassen; der Inhalt unterscheidet sich (Wartende, MFA am Tresen) |
| 01b1/01b2 | Gleicher Ausschnitt wie 01a statt Halbtotale | Halbtotale per Ausschnitt in Remotion (2K reicht dafür) |
| 08d | Eher halbtotal als halbnah | Halbnah per Ausschnitt in Remotion |
| 02b | Die Rüsselspitze ist sehr nah am Kopf des Arztes, berührt ihn aber nicht | So lassen |
| Arzt | Hosenfarbe schwankt zwischen beige, grau und dunkel (03h) | Fällt bei kurzen Einstellungen kaum auf |

## Lokale Korrekturen ohne API (im Manifest vermerkt)

- **01a:**
  - Farbstich korrigiert (Kanalabgleich mit dem bisherigen 01a).
  - Ein Phantom-Arm mit Hand zwischen den Elefantenbeinen war ein Bildfehler des Modells. Ich habe ihn mit dem bisherigen 01a überdeckt.
- **01b1, 01b2:** Farbstich korrigiert.
- **06c:** Farbe an das Abendbild 06b angeglichen.
- **05c:** Die Wanduhr hatte Ziffern und zeigte 10:30 statt etwa 17:40. Ich habe sie entfernt und den Bereich aus der umgebenden Wand aufgefüllt. Die Uhr ist laut Shot-Bible unkritisch.

## Kosten Phase 3

34 Bildaufrufe, davon 26 angenommen. Die übrigen sind Fehlversuche oder abgelöste Zwischenstände. Alle mit `gemini-3-pro-image`, außer 06a und 06d (`gemini-3.1-flash-image`). Clips und Sprache wurden in Phase 3 nicht erzeugt.

## Runde 2 (Feedback vom 12.10.2026)

**Umgesetzt:**
- **Szene 3, Trampelpfad:** Statt des Streifens gibt es jetzt natürliche Abnutzung auf sauberem Linoleum, die von Bild zu Bild zunimmt:
  - 03a: einzelne, kaum sichtbare Schuhabdrücke
  - 03b: mehr Abdrücke
  - 03c: eine schmale, matte Laufbahn
  - 03d: eine breitere, deutlich ausgetretene Bahn mit flachen Vertiefungen
  - 03e: ein ausgetretener Weg über fast die ganze Flurbreite
  - Auch 03f, 03g und 03h sind angepasst.
  - Der Weg dorthin:
    1. Der erste Versuch ergab Schlamm- und Sandflecken.
    2. Die vorige Stufe als ganzes Referenzbild führte dazu, dass das Modell das falsche Bild nachbaute.
    3. Ein Bodenausschnitt als Referenz wurde fast unverändert kopiert, die Spur wuchs nicht.
    4. Deshalb habe ich bei 03c und 03d die Abnutzungsstruktur aus 03e lokal auf eine wachsende Laufbahn übertragen (`scripts/floor-detail.py`, im Manifest vermerkt).
- **Szene 5:** Zwei Zeitraffer-Clips. V3 (05a nach 05b): Wartende gehen, das Licht wird wärmer. V4 (05b nach 05c): Dämmerung, der letzte Wartende geht. In beiden bewegt sich der Elefant am Flurende natürlich (Ohren, Rüssel, Gewicht). Sie füllen zusammen die 16 Sekunden der Szene.
- **06a:** Der Stuhl in der Raummitte ist weg. Ihr Stuhl steht neben dem Stuhl mit der Jacke, wie in 07a.
- **06b neu und Clip V5:** Der Arzt kommt von vorn links herein, der Elefant tritt hinten links aus einer Öffnung um die Ecke und geht bis zwischen Arzt und Patientin. Das bisherige 06b heißt jetzt **07a** (Szene 7, Endbild von V5).
- **06c neu:** im Abendlicht wie 07a.
- **08a neu:** Der Arzt dreht sich von Kamera und Patientin weg und schaut in die Raumtiefe direkt auf den Elefanten, im warmen Licht.
- **Licht:**
  - Szenen 6 und 7 sind einheitlich kühl, Szene 8 einheitlich warm. Lokal angeglichen per Farbbalance an 07a: 06a, 06b, 06c, 06d; dazu 01c an 01a.
  - Clip V1 bekommt in Phase 5 eine warme Farbkorrektur, damit Szene 8 nicht zwischen Blau und Gold springt.

**Offen für den Schnitt:** V5 zeigt den ganzen Weg des Elefanten in 8 Sekunden, die Einstellung hat laut Script aber 3 Sekunden. Vorschlag: Ausschnitt 3,0 bis 6,0 s.

**Weiterhin bekannt:** In 03f und 03g steht der Elefant neben Poster bzw. Monitor statt davor.

**Kosten Runde 2:** 34 Bildaufrufe, davon 23 erfolgreich und 11 abgelehnt wegen fehlenden Guthabens (nicht berechnet); 3 Clips (V3, V4, V5, je 8 s).

## Runde 3 (Feedback vom 13.10.2026)

- **06b:** Den Arzt habe ich aus dem Startbild entfernt (Bildbearbeitung). Zu Beginn sind nur die Patientin, die MFA im Hintergrund und der Elefant an der Ecke zu sehen.
- **V5 neu:** Nach etwa 1 Sekunde läuft der Arzt von links aus dem Off ins Bild und bleibt an seinem Platz stehen. Gleichzeitig kommt der Elefant von hinten und steht nach etwa 6 Sekunden zwischen Arzt und Patientin.
- **Schnittvorschlag:**
  - Für die 3 Sekunden laut Script nehme ich 0,5 bis 3,5 Sekunden: Der Arzt kommt herein, der Elefant ist unterwegs.
  - Soll man sehen, wie der Elefant ganz zwischen die beiden tritt, bräuchte die Einstellung etwa 6 Sekunden. Das ginge zulasten der anderen Einstellungen in Szene 6 oder würde die Szene verlängern.
- **Kosten:** 1 Bild, 1 Clip.
