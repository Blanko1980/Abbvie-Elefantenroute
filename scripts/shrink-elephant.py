"""Verkleinert den Elefanten in einem Bild, ohne den Raum zu verändern (lokal, ohne API).

Der Elefant wird über die Differenz zum leeren Raum (gleiche Kamera) freigestellt, inklusive seines Schattens,
um seinen Fußpunkt herum skaliert und in den leeren Raum gesetzt. Danach folgt eine Bildbearbeitung, die nur
Licht und Kontaktschatten angleicht.

python3 scripts/shrink-elephant.py <mit_elefant.jpg> <leerer_raum.jpg> <x0,y0,x1,y1> <faktor> <ausgabe.jpg> [schwelle]
x0..y1: grober Rahmen um Elefant und Schatten in Pixeln des Originals.
"""
import sys
import numpy as np
from PIL import Image, ImageFilter

src_p, plate_p, box_s, scale_s, out_p = sys.argv[1:6]
x0, y0, x1, y1 = map(int, box_s.split(","))
scale = float(scale_s)
thr = float(sys.argv[6]) if len(sys.argv) > 6 else 12

src = np.asarray(Image.open(src_p).convert("RGB")).astype(np.float32)
plate = np.asarray(Image.open(plate_p).convert("RGB")).astype(np.float32)
diff = np.abs(src - plate).max(axis=2)
roi = np.zeros_like(diff)
roi[y0:y1, x0:x1] = 1
diff *= roi

# Weiche Maske: kräftige Unterschiede = Tier, mittlere = Schatten
alpha = np.clip((diff - thr) / 40, 0, 1)
a_img = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.MinFilter(7)).filter(ImageFilter.GaussianBlur(1.5))
alpha = np.asarray(a_img).astype(np.float32) / 255

# Fußpunkt: unterster Rand des Tiers (kräftige Differenz), horizontal Mitte
strong = diff > 60
ys, xs = np.nonzero(strong)
foot_y = int(np.percentile(ys, 99.5))
foot_x = int(xs.mean())

# Freistellung als RGBA, um den Fußpunkt skalieren
rgba = np.dstack([src, alpha * 255]).astype(np.uint8)
cut = Image.fromarray(rgba, "RGBA").crop((x0, y0, x1, y1))
w, h = cut.size
cut = cut.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)
fx, fy = (foot_x - x0) * scale, (foot_y - y0) * scale
pos = (round(foot_x - fx), round(foot_y - fy))

out = Image.open(plate_p).convert("RGB")
out.paste(cut, pos, cut)
out.save(out_p, quality=95)
print(out_p, "Fußpunkt", (foot_x, foot_y), "Faktor", scale)
