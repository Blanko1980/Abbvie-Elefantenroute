# Phase 4: Sprecher und Zeitleiste

Stand: 13.10.2026

## Ergebnis

- **Sprecher:** Thomas Schendel, `eleven_multilingual_v2`, Einstellungen wie in der Probe (Stabilität 0,55, Ähnlichkeit 0,8, Stil 0, Tempo 0,92).
- **Erzeugung:** 17 Sätze, satzweise mit Übergangskontext innerhalb der Szene, als Dateien in `public/voice/<Satz-ID>.mp3`.
- **Hörprobe des kompletten Sprechertexts auf der Zeitleiste:** `review/voice/sprecher-timeline.mp3` (2:27, mit allen Pausen, −18 LUFS integriert).
- **Prüfung per Gemini:** Alle 17 Sätze sind wörtlich richtig und ohne Aussprachefehler, auch „Entscheidungselefanten“ und „Evidenz“. Klang über alle Sätze einheitlich, kaum ironisch (2 von 10). Einziges Detail ist ein leises Lippengeräusch vor dem zweiten Satz (0:07).
- **Zeitleiste:** `data/timeline.json` enthält
  - Szenen mit tatsächlichen Zeiten
  - Einstellungen mit Dauer, Kamerabewegung und Clip-Ausschnitten
  - Sprecher-Einsätze
  - Einblendungen
  - Endcard und Coda
  - leere Spuren `music` und `ambience`

  Gesamtlänge: **146.7 s**, davon Film bis Ende Endcard 132.7 s, dazu die Coda.

## Regeln für die Zeitleiste

- Jeder Satz beginnt auf seiner Zielzeit laut Script, frühestens aber nach der Mindestpause hinter dem vorigen Satz.
- Eine Szene wird nur länger, wenn der Text es verlangt. Die zusätzliche Zeit bekommt die letzte Einstellung der Szene.
- Weil Szene 1 um gut eine Sekunde länger ist, verschieben sich alle späteren Einsätze entsprechend. Innerhalb jeder Szene stimmen die Abstände.

## Szenen

| Szene | Zeit | Dauer | Script | Abweichung |
| --- | --- | --- | --- | --- |
| s1 Der Elefant | 0:00.00 – 0:15.25 | 15.25 s | 14 s | +8.9 % |
| s2 Gedächtnis | 0:15.25 – 0:33.25 | 18.00 s | 18 s | 0 % |
| s3 Trampelpfad | 0:33.25 – 0:51.69 | 18.45 s | 18 s | +2.5 % |
| s4 Respekt | 0:51.69 – 1:06.68 | 14.98 s | 14 s | +7 % |
| s5 Warten | 1:06.68 – 1:24.68 | 18.00 s | 16 s | +12.5 % ⚠ |
| s6 Die Patientin | 1:24.68 – 1:34.68 | 10.00 s | 10 s | 0 % |
| s7 Der Satz | 1:34.68 – 1:48.71 | 14.03 s | 13 s | +7.9 % |
| s8 Der Schritt | 1:48.71 – 2:00.71 | 12.00 s | 12 s | 0 % |
| end Endcard | 2:00.71 – 2:12.71 | 12.00 s | 12 s | 0 % |
| coda Coda | 2:12.71 – 2:26.71 | 14.00 s | 14 s | 0 % |

## Abweichung über 10 Prozent: Szene 5 (+12,5 %)

Der Text braucht mit Pausen etwa 15 Sekunden (Einsatz 1 s nach Szenenbeginn, „Bis dahin wartet jemand anderes mit ihm.“ endet bei 16 s). Dazu kommt das Script-Detail „danach bleibt das Bild noch 2 Sekunden stehen“, zusammen 18 statt 16 Sekunden.

Optionen:
- **A (Empfehlung):** 18 Sekunden lassen. V3 und V4 füllen 16 Sekunden, danach steht 05c (Patientin allein im Abendlicht) 2 Sekunden still. Das stärkt den Moment vor dem Kippen in Szene 6.
- **B:** Standzeit auf 0,5 s kürzen, dann 16,5 s (+3 %). Das widerspricht dem Script-Detail mit den 2 Sekunden.
- **C:** Szene 5 schneller sprechen lassen (4 Sätze neu). Dann wäre das Tempo im Film uneinheitlich.

## Weitere Punkte

- **Szene 7:** Mit den vorgeschriebenen 1,5-Sekunden-Pausen und 0,5 s Nachlauf ist die Szene 14 statt 13 Sekunden lang (+7,9 %).
- **Szene 1:** +8,9 %, weil der dritte Satz nach dem Einsatz bei 0:08 nicht mehr bis 0:14 passt.

## Sprecher-Einsätze

| Satz | Sprechbeginn | Dateilänge | Text |
| --- | --- | --- | --- |
| s1-1 | 0:04.00 | 2.33 s | Das hier ist ein Elefant. |
| s1-2 | 0:08.00 | 3.11 s | Er lebt seit vielen Jahren in diesem Gebäude. |
| s1-3 | 0:11.61 | 2.64 s | Niemand erinnert sich, wann er gekommen ist. |
| s2-1 | 0:16.25 | 2.51 s | Elefanten vergessen nichts. |
| s2-2 | 0:19.25 | 4.78 s | Sie erinnern sich an jeden Weg, der sie einmal sicher ans Ziel gebracht hat. |
| s2-3 | 0:26.25 | 1.62 s | Das ist ihre Stärke. |
| s3-1 | 0:37.25 | 3.47 s | Mit den Jahren wird aus Erinnerung Gewohnheit. |
| s3-2 | 0:41.42 | 2.27 s | Und aus Gewohnheit wird Platz. |
| s4-1 | 0:57.69 | 2.74 s | Manchmal ist seine Vorsicht berechtigt. |
| s4-2 | 1:01.69 | 4.08 s | Und manchmal ist es nur Gewohnheit, die sich als Vorsicht ausgibt. |
| s5-1 | 1:07.68 | 4.83 s | Besonders interessant ist das Verhalten des ausgewachsenen Entscheidungselefanten. |
| s5-2 | 1:13.02 | 1.51 s | Er wartet. |
| s5-3 | 1:15.05 | 4.02 s | Meist auf das Zeichen, dass der alte Weg nicht mehr trägt. |
| s5-4 | 1:20.27 | 2.51 s | Bis dahin wartet jemand anderes mit ihm. |
| s7-1 | 1:35.68 | 2.95 s | Der Elefant ist nicht die Therapie. |
| s7-2 | 1:40.05 | 3.00 s | Der Elefant ist nicht die Evidenz. |
| s7-3 | 1:44.55 | 3.66 s | Der Elefant ist die Gewohnheit, mit der wir Evidenz betrachten. |
