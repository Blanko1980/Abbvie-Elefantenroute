# Misst Sprechbeginn und -ende je Sprecherdatei (Stille unter -40 dB): python3 scripts/speech-bounds.py
import json, subprocess, re, glob, os
out = {}
for f in sorted(glob.glob('public/voice/*.mp3')):
    total = float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True).stdout)
    log = subprocess.run(['ffmpeg','-i',f,'-af','silencedetect=noise=-40dB:d=0.08','-f','null','-'],capture_output=True,text=True).stderr
    starts = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', log)]
    ends = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', log)]
    lead = ends[0] if starts and starts[0] < 0.01 and ends else 0.0
    # Stille bis zum Dateiende: ffmpeg meldet entweder kein Ende oder ein Ende genau am Dateiende
    trail_start = starts[-1] if starts and (not ends or starts[-1] > ends[-1] or abs(ends[-1] - total) < 0.06) else total
    if trail_start <= lead: trail_start = total
    out[os.path.basename(f)[:-4]] = {"file": f, "total": round(total,3), "speechStart": round(lead,3), "speechEnd": round(trail_start,3)}
json.dump(out, open('data/voice/bounds.json','w'), indent=2)
for k,v in out.items(): print(k, v)
