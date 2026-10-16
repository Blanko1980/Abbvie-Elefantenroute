"""Misst die Betonung je Wort: Tonhöhe (Spitze, Halbtöne über dem Satzmedian), Lautheit (dB über Satzmittel), Dauer je Buchstabe.
python3 scripts/stress-measure.py <audio.mp3> <wortgrenzen.json>
Ausgabe: Tabelle und Wort mit dem höchsten Betonungswert (1,5 × z-Wert Tonhöhe + z-Wert Lautheit + 0,5 × z-Wert Dauer)."""
import json, subprocess, sys
import numpy as np

audio, words_p = sys.argv[1:3]
sr = 16000
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", audio, "-ac", "1", "-ar", str(sr), "-f", "f32le", "-"], capture_output=True, check=True).stdout
x = np.frombuffer(raw, np.float32)
words = [w for w in json.load(open(words_p)) if w["text"].strip()]

hop, win = 160, 640
def f0(frame):
    frame = frame - frame.mean()
    if np.sqrt((frame ** 2).mean()) < 0.01: return np.nan
    ac = np.correlate(frame, frame, "full")[len(frame) - 1:]
    lo, hi = sr // 300, sr // 60
    k = lo + np.argmax(ac[lo:hi])
    return sr / k if ac[k] > 0.35 * ac[0] else np.nan

frames = [x[i:i + win] for i in range(0, len(x) - win, hop)]
pitch = np.array([f0(f) for f in frames])
rms = np.array([20 * np.log10(np.sqrt((f ** 2).mean()) + 1e-6) for f in frames])
t = np.arange(len(frames)) * hop / sr + win / 2 / sr
med = np.nanmedian(pitch)
rows = []
for w in words:
    m = (t >= w["start"]) & (t < w["end"])
    p = pitch[m]
    st = 12 * np.log2(np.nanpercentile(p, 90) / med) if np.any(~np.isnan(p)) else np.nan
    rows.append((w["text"], st, np.percentile(rms[m], 90) if m.any() else np.nan, (w["end"] - w["start"]) / max(1, len(w["text"]))))
a = np.array([[r[1], r[2], r[3]] for r in rows], float)
z = (a - np.nanmean(a, 0)) / (np.nanstd(a, 0) + 1e-6)
score = 1.5 * np.nan_to_num(z[:, 0]) + np.nan_to_num(z[:, 1]) + 0.5 * np.nan_to_num(z[:, 2])
for r, s in zip(rows, score):
    print(f"{r[0]:<26} Ton {r[1]:+5.1f} HT  Lautheit {r[2]:6.1f} dB  Dauer/Bst {r[3]*1000:5.0f} ms  Betonung {s:+5.2f}")
print("BETONT:", rows[int(np.argmax(score))][0])
