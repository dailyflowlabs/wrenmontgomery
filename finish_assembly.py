import os
import json
import urllib.request
import subprocess

HEDRA_API_KEY = "k_live_5_lKSbDosqabX4y_:sk_NUy50_cHM9dT-0_NIZT--B4zrXJbF1m58wTwhEQpqlc"
HEDRA_BASE_URL = "https://api.hedra.com/v3"

KLING_API_KEY = "api-key-kling-ZBCskxkg6NOVQFbhMbvln6tZ274M-izFbnoRdE8j0kE"
KLING_BASE_URL = "https://api.klingai.com"

scratch_dir = "scratch/hybrid_build"
raw_clips_dir = "scratch/hybrid_build/raw_clips"
os.makedirs(raw_clips_dir, exist_ok=True)
os.makedirs("videos", exist_ok=True)

with open(f"{scratch_dir}/jobs_state.json") as f:
    state = json.load(f)

downloaded_clips = {}

# 1. Download Hedra clips
print("[*] Retrieving Hedra completed videos...")
for jid, seg in state["hedra"].items():
    req = urllib.request.Request(
        f"{HEDRA_BASE_URL}/jobs/{jid}",
        headers={'Authorization': f'Key {HEDRA_API_KEY}'}
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        v_url = data['outputs'][0]['url']
        out_path = f"{raw_clips_dir}/{seg['id']}.mp4"
        print(f"    [✓] Downloading Hedra {seg['id']} from {v_url[:60]}...")
        urllib.request.urlretrieve(v_url, out_path)
        downloaded_clips[seg['id']] = out_path

# 2. Download Kling clips
print("[*] Retrieving Kling completed videos...")
for tid, seg in state["kling"].items():
    req = urllib.request.Request(
        f"{KLING_BASE_URL}/v1/videos/image2video/{tid}",
        headers={"Authorization": f"Bearer {KLING_API_KEY}"}
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        v_url = data["data"]["task_result"]["videos"][0]["url"]
        out_path = f"{raw_clips_dir}/{seg['id']}.mp4"
        print(f"    [✓] Downloading Kling {seg['id']} from {v_url[:60]}...")
        urllib.request.urlretrieve(v_url, out_path)
        downloaded_clips[seg['id']] = out_path

# 3. Define the exact ordered segments for 30.0s timeline
segments = [
    {"id": "shot_01_kling_intro", "duration": 4.0},
    {"id": "shot_02_hedra_chorus1", "duration": 8.0},
    {"id": "shot_03_kling_side_laugh", "duration": 4.0},
    {"id": "shot_04_hedra_chorus2", "duration": 8.0},
    {"id": "shot_05_hedra_finale", "duration": 6.0}
]

print("\n[*] Standardizing clips to 1080x1920 @ 30fps...")
temp_seg_files = []
for i, seg in enumerate(segments):
    raw_path = downloaded_clips[seg["id"]]
    norm_path = f"{scratch_dir}/norm_{i:02d}_{seg['id']}.mp4"
    
    # Scale to 1080x1920, 30fps, trim exact duration
    cmd = [
        "ffmpeg", "-y",
        "-ss", "0.0",
        "-t", str(seg["duration"]),
        "-i", raw_path,
        "-vf", "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,fps=30",
        "-c:v", "libx264", "-preset", "fast", "-crf", "18",
        "-an",
        norm_path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    temp_seg_files.append(norm_path)
    print(f"    [✓] Standardized {seg['id']} ({seg['duration']}s)")

# Concat file list
concat_list_path = f"{scratch_dir}/concat_list.txt"
with open(concat_list_path, "w") as f:
    for tf in temp_seg_files:
        f.write(f"file '{os.path.abspath(tf)}'\n")

temp_video_only = f"{scratch_dir}/stitched_video_only.mp4"
subprocess.run([
    "ffmpeg", "-y",
    "-f", "concat", "-safe", "0",
    "-i", concat_list_path,
    "-c", "copy",
    temp_video_only
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

# Final Master with Studio Master Audio and smooth 1.0s fade-out
final_master = "videos/Wren_Montgomery_First_Rodeo_30s_Hybrid_Master.mp4"
subprocess.run([
    "ffmpeg", "-y",
    "-i", temp_video_only,
    "-i", "scratch/short_30s_master.mp3",
    "-c:v", "copy",
    "-c:a", "aac", "-b:a", "320k",
    "-af", "afade=t=out:st=28.8:d=1.2",
    "-shortest",
    final_master
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

# Generate thumbnail
thumb_path = "videos/Wren_Montgomery_Short_Thumbnail.jpg"
subprocess.run([
    "ffmpeg", "-y",
    "-ss", "00:00:06.000",
    "-i", final_master,
    "-vframes", "1",
    "-q:v", "2",
    thumb_path
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

print(f"\n[🏆] 30-SECOND HYBRID MASTER SUCCESSFULLY ASSEMBLED!")
print(f"    Video: {final_master}")
print(f"    Thumbnail: {thumb_path}")
