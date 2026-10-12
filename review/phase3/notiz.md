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
