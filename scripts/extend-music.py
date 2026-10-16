"""Verlängert ein Musikstück um ganze Takte: spielt bis zum Schnittpunkt P und springt dann um <länge> Sekunden zurück.
Für jeden Kandidaten P in [von, bis] wird die Überblendung simuliert; gewählt wird der Punkt mit dem kleinsten
spektralen Sprung (Fluss) an der Schnittstelle, gemessen relativ zur Musik davor und danach.
python3 scripts/extend-music.py <ein.mp3> <aus.mp3> <länge_s> <von_s> <bis_s> [überblendung_s]"""
import subprocess, sys
import numpy as np
src, out = sys.argv[1], sys.argv[2]
L, lo, hi = map(float, sys.argv[3:6])
XF = float(sys.argv[6]) if len(sys.argv) > 6 else 0.12
SR = 22050
def load(sr):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", src, "-ac", "2", "-ar", str(sr), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2)
x = load(SR); mono = x.mean(1)
hop, win = 220, 1024
def flux(sig):
    fr = np.lib.stride_tricks.sliding_window_view(sig, win)[::hop]
    s = np.log1p(np.abs(np.fft.rfft(fr * np.hanning(win), axis=1)))
    return np.maximum(0, np.diff(s, axis=0)).sum(1)
shift, xf, ctx = int(L * SR), int(XF * SR), int(0.4 * SR)
fade = np.linspace(0, 1, xf)
best = None
for P in range(int(lo * SR), int(hi * SR), int(0.005 * SR)):
    a = mono[P - ctx:P]; b = mono[P - shift:P - shift + ctx]
    j = np.concatenate([a[:-xf], a[-xf:] * (1 - fade) + b[:xf] * fade, b[xf:]])
    f = flux(j)
    mid = len(f) // 2
    jump = f[mid - 12: mid + 12].max() / (np.median(f) + 1e-6)
    if best is None or jump < best[0]: best = (jump, P)
jump, P = best
# Mit voller Abtastrate schneiden
SR2 = 44100; X = load(SR2); P2 = int(P / SR * SR2); sh2 = int(L * SR2); xf2 = int(XF * SR2)
f2 = np.linspace(0, 1, xf2)[:, None]
a, b = X[:P2], X[P2 - sh2:]
y = np.concatenate([a[:-xf2], a[-xf2:] * (1 - f2) + b[:xf2] * f2, b[xf2:]])
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR2), "-ac", "2", "-i", "-", "-b:a", "192k", out], input=y.astype(np.float32).tobytes(), check=True)
print(f"Schnitt bei {P/SR:.2f} s, Rücksprung auf {(P-shift)/SR:.2f} s, Sprung {jump:.2f} × Median, neue Länge {len(y)/SR2:.2f} s")
