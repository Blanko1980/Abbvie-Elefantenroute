# Lokale Retusche ohne API: überträgt die Abnutzungsstruktur (Hochpass) eines Bodens auf ein anderes Bild
# derselben Kameraposition. python3 scripts/floor-detail.mjs.py <ziel> <quelle> <ausgabe> <stärke> <y_start>
import sys, numpy as np
from PIL import Image, ImageFilter
dst, src, out, k, y0 = sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4]), int(sys.argv[5])
# optional: Bahnmitte x und Breite (Sigma in Pixeln) begrenzen die Übertragung seitlich
cx = float(sys.argv[6]) if len(sys.argv) > 6 else None; sx = float(sys.argv[7]) if len(sys.argv) > 7 else None
a = Image.open(dst).convert('RGB'); b = Image.open(src).convert('RGB').resize(a.size)
A = np.asarray(a).astype(np.float32); B = np.asarray(b).astype(np.float32)
Bl = np.asarray(b.filter(ImageFilter.GaussianBlur(14))).astype(np.float32)
D = (B - Bl).mean(axis=2, keepdims=True)  # nur Helligkeitsstruktur, keine Farbe
h = A.shape[0]; y = np.arange(h)[:, None, None]
mask = np.clip((y - y0) / 80.0, 0, 1)
if cx is not None:
    x = np.arange(A.shape[1])[None, :, None]
    mask = mask * np.exp(-0.5 * ((x - cx) / sx) ** 2)
O = A + k * D * mask
Image.fromarray(np.clip(O, 0, 255).astype(np.uint8)).save(out, quality=92)
print(out)
