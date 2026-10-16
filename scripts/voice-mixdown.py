"""Reine Sprecherspur im Filmtiming aus data/timeline.json: python3 scripts/voice-mixdown.py <ausgabe.mp3>"""
import json, subprocess, sys
t = json.load(open("data/timeline.json"))
inputs, flt = [], []
for i, v in enumerate(t["voice"]):
    inputs += ["-i", "public/" + v["file"]]
    ms = int(round(v["start"] * 1000))
    flt.append(f"[{i}:a]adelay={ms}|{ms}[a{i}]")
n = len(t["voice"])
flt.append("".join(f"[a{i}]" for i in range(n)) + f"amix=inputs={n}:normalize=0,apad,atrim=0:{t['durationSeconds']}[out]")
subprocess.run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", ";".join(flt), "-map", "[out]", "-ac", "2", "-b:a", "128k", sys.argv[1]], check=True)
print(sys.argv[1], t["durationSeconds"], "s")
