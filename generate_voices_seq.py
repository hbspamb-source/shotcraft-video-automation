import json
import os
import sys
import subprocess

if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

script_path = r"D:\Short Scaft Video Automation\template\src\sample-script-news.json"
output_dir = r"D:\Short Scaft Video Automation\template\public\audio\voice"
os.makedirs(output_dir, exist_ok=True)

with open(script_path, "r", encoding="utf-8") as f:
    data = json.load(f)

default_voice = data.get("audio", {}).get("voiceName", "vi-VN-NamMinhNeural")

for i, scene in enumerate(data["scenes"], 1):
    text = scene["voiceText"]
    v_file = os.path.basename(scene["voiceFile"])
    out_path = os.path.join(output_dir, v_file)
    rate_val = scene.get("voiceRate", 1.15)
    
    pct = int(round((rate_val - 1.0) * 100))
    rate_str = f"+{pct}%" if pct >= 0 else f"{pct}%"
    
    print(f"[{i}/7] Generating {v_file} (Rate: {rate_str})...")
    cmd = [
        "edge-tts",
        "--voice", default_voice,
        "--rate", rate_str,
        "--text", text,
        "--write-media", out_path
    ]
    res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8")
    if res.returncode != 0:
        print(f"Error generating {v_file}: {res.stderr}")
    else:
        print(f"OK -> {out_path} ({os.path.getsize(out_path)} bytes)")

print("\nFinished generating all voiceovers!")
