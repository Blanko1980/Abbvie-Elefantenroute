# Animation aller Einstellungen

Stand: 13.10.2026

Du wolltest, dass auch die bisherigen Standbilder als Veo-Clips laufen. Jede Standbild-Einstellung ist jetzt ein eigener Clip ab ihrem freigegebenen Standbild.

## Was zu prüfen ist

- `review/rohschnitt-animiert-720p.mp4`: der komplette Film in 720p, alle Einstellungen animiert, ohne Einblendungen.
- `review/contact-sheet-animation.jpg`: je Clip drei Bilder (Anfang, Mitte, Ende des genutzten Ausschnitts).

## Wie die Clips gebaut sind

- **Modell und Format:** `veo-3.1-generate-preview`, 720p, nur Startbild, kein Endbild. Kurze Einstellungen bekommen 4-Sekunden-Clips, Einstellungen mit 4 bis 5 Sekunden 6-Sekunden-Clips. Im Film läuft jeweils der Anfang des Clips, so lang wie die Einstellung laut Zeitleiste.
- **Bildausschnitte:** Bei 01b1, 01b2 und 08d bekommt Veo den Ausschnitt, der vorher in Remotion entstand. Bei 02a bekommt Veo einen 16:9-Ausschnitt aus dem 21:9-Bild.
- **Kamerafahrten:**
  - 02a und 07a: Die Fahrt laut Shotliste macht Veo selbst.
  - 04b: Veo liefert eine feste Kamera, der Push auf Hand und Schulter (1,00 auf 1,10) liegt wie vorher in Remotion. Mit Fahrt drehte sich der Arzt in Veo zur Kamera.
- **Lange Einstellungen:**
  - 02a (14 s) und 04b (10,2 s): Clips mit 15 Sekunden über die Veo-Verlängerung (8 s plus 7 s).
  - 07a (13 s): Die Verlängerung scheiterte siebenmal mit einem internen Serverfehler. Ersatz ist ein zweiter Clip V07b, der am letzten Bild von V07a ansetzt.

## Nachtrag 14.10.2026

- **V07b erzeugt:** Der Clip setzt am letzten Bild von V07a an und hat eine feste Kamera. Die Fahrt aus V07a läuft in Remotion weiter (1,00 auf 1,06, setzt mit Tempo ein). Der Platzhalter ist entfernt.
- **06a neu (Vorschlag A, deine Entscheidung):**
  - Bisher stand die Patientin in 06a mitten im Raum an einem freien Stuhl. In V5 stand sie danach rechts vor dem Stuhl mit der Jacke.
  - Neues Standbild: Bildbearbeitung aus 06b, gleiche Kamera wie V5, näher dran. Sie sitzt auf dem Stuhl mit der Jacke, wie in Szene 5.
  - Neuer Clip V06a: Sie steht auf. Genutzt werden 0 bis 2 s, danach läuft sie weiter, das liegt außerhalb des Schnitts.
- **Abweichungen bei 02a und 04b:** bleiben so (deine Entscheidung).

## Bekannte Abweichungen

- **02a:**
  - Bester von drei Versuchen.
  - Bei etwa 0:19,5 dreht der Arzt den Kopf kurz zum Elefanten zurück. Das Script sagt „ohne zum Elefanten zu schauen“.
  - Bei 0:20 wischt ein Wandpfeiler durchs Vorderbild.
  - Der Rüssel ist am Anfang und am Ende am Ohr, dazwischen hängt er.
  - Die anderen beiden Versuche waren schlechter: Kamera dreht sich, Rüssel hochgereckt, Arzt schaut in die Kamera.
- **04b:**
  - Der Rüssel liegt anfangs auf der Schulter, nimmt sich bei etwa 4 s kurz zurück und legt sich bei etwa 9 s wieder auf.
  - Laut Script bleibt er liegen.
  - Das ist der dritte gültige Versuch. In den beiden ersten sprach der Arzt sichtbar oder drehte sich zur Kamera.
- **03g:** Der Elefant geht langsam weiter und gibt den Monitor am Ende der 2 Sekunden etwas frei, statt ihn zuzudecken. Er läuft mit dem Kopf nach rechts; ein Zudecken hieße Rückwärtsgehen.
- **03b:** Vereinzelt treibt ein Blatt am oberen Bildrand.
- **08a:** Der Elefant kommt einen Schritt näher, statt nur kaum merklich zu nicken.
- **08d:** Die Kamera wandert leicht, der Arzt macht einen Schritt auf die Patientin zu. Das passt zur Szene „Der Schritt“, steht aber so nicht im Script.
- **Allgemein:**
  - Veo hält die Kamera nicht immer ganz ruhig, manche „Stativ“-Einstellungen driften leicht.
  - Die Clips haben 720p und werden auf 1080p hochskaliert, wie schon V1 bis V5.

## Aufwand

- **Aufrufe:** 56 Clip-Aufrufe, davon 37 mit Ergebnis.
- **Erzeugte Videolänge:** 208 Sekunden.
- **Ohne Ergebnis:** 19 Aufrufe (Serverfehler, Tonfilter, Guthaben). Nach meinem Kenntnisstand berechnet Google sie nicht.
- **Kosten:** Bei einem Listenpreis von etwa 0,40 USD pro Sekunde für Veo 3.1 wären das rund 80 USD. Den genauen Betrag zeigt AI Studio.

| ID | Einstellung | Clip | genutzt |
| --- | --- | --- | --- |
| V01a | 01a | 6 s | 0 bis 5,05 s |
| V01b1, V01b2 | 01b1, 01b2 | je 4 s | 0 bis 2,5 s |
| V01c | 01c | 6 s | 0 bis 5,05 s |
| V02a | 02a | 15 s (verlängert) | 0 bis 14 s |
| V02b | 02b | 6 s | 0 bis 4 s |
| V03a bis V03h | 03a bis 03h | je 4 s | 0 bis 2 oder 3 s |
| V04b | 04b | 15 s (verlängert) | 0 bis 10,2 s, plus Push in Remotion |
| V05c | 05c | 4 s | 0 bis 2 s (mit 1 s Überblendung aus V4) |
| V06a | 06a (neu) | 4 s | 0 bis 2 s |
| V06c, V06d | 06c, 06d | je 4 s | 0 bis 2 oder 3 s |
| V07a | 07a, Teil 1 | 8 s | 0 bis 8 s |
| V07b | 07a, Teil 2 | 8 s | 0,04 bis 5,04 s, plus Push in Remotion |
| V08a | 08a | 6 s | 0 bis 4 s |
| V08d | 08d | 6 s | 0 bis 5 s |
