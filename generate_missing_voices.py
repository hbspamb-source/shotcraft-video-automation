import json
import os
import sys
import urllib.parse
import urllib.request
import subprocess

if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

script_path = r"D:\Short Scaft Video Automation\template\src\sample-script-news.json"
output_dir = r"D:\Short Scaft Video Automation\template\public\audio\voice"
os.makedirs(output_dir, exist_ok=True)

with open(script_path, "r", encoding="utf-8") as f:
    data = json.load(f)

for i, scene in enumerate(data["scenes"], 1):
    v_file = os.path.basename(scene["voiceFile"])
    out_path = os.path.join(output_dir, v_file)
    
    # Check if already generated and valid
    if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
        print(f"[{i}/7] Already exists: {v_file} ({os.path.getsize(out_path)} bytes)")
        continue
    
    text = scene["voiceText"]
    print(f"[{i}/7] Downloading {v_file} via Google TTS...")
    
    # Google TTS supports up to ~100-200 chars per query, split if needed
    # Sentences are <= 150 chars, let's chunk by sentence if long
    sentences = [s.strip() for s in text.replace("—", ",").split(".") if s.strip()]
    
    temp_chunks = []
    for idx, sentence in enumerate(sentences):
        encoded = urllib.parse.quote(sentence)
        url = f"https://translate.google.com/translate_tts?ie=UTF-8&q={encoded}&tl=vi&client=tw-ob"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        chunk_file = os.path.join(output_dir, f"temp_{i}_{idx}.mp3")
        try:
            with urllib.request.urlopen(req, timeout=10) as resp, open(chunk_file, "wb") as f_out:
                f_out.write(resp.read())
            temp_chunks.append(chunk_file)
        except Exception as e:
            print(f"Failed sentence '{sentence}': {e}")
            
    if temp_chunks:
        # Merge chunks with ffmpeg or simple binary concat
        with open(out_path, "wb") as outfile:
            for c in temp_chunks:
                with open(c, "rb") as infile:
                    outfile.write(infile.read())
                os.remove(c)
        print(f"Successfully created {v_file} ({os.path.getsize(out_path)} bytes)")
    else:
        print(f"Failed to generate {v_file}")

print("\nCompleted checking and generating voiceovers!")
