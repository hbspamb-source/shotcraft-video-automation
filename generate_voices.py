import asyncio
import json
import os
import sys
import edge_tts

# Ensure utf-8 output on Windows console
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

script_path = r"D:\Short Scaft Video Automation\template\src\sample-script-news.json"
output_dir = r"D:\Short Scaft Video Automation\template\public\audio\voice"

with open(script_path, "r", encoding="utf-8") as f:
    data = json.load(f)

default_voice = data.get("audio", {}).get("voiceName", "vi-VN-NamMinhNeural")

async def generate_voice(text, voice, rate_str, outfile):
    print(f"Generating: {os.path.basename(outfile)} | Rate: {rate_str}")
    communicate = edge_tts.Communicate(text, voice, rate=rate_str)
    await communicate.save(outfile)
    print(f"Done: {os.path.basename(outfile)}")

async def main():
    tasks = []
    for scene in data["scenes"]:
        text = scene["voiceText"]
        v_file = os.path.basename(scene["voiceFile"])
        out_path = os.path.join(output_dir, v_file)
        rate_val = scene.get("voiceRate", 1.15)
        
        pct = int(round((rate_val - 1.0) * 100))
        rate_str = f"+{pct}%" if pct >= 0 else f"{pct}%"
        
        tasks.append(generate_voice(text, default_voice, rate_str, out_path))
    
    await asyncio.gather(*tasks)
    print("ALL VOICES GENERATED SUCCESSFULLY!")

if __name__ == "__main__":
    asyncio.run(main())
