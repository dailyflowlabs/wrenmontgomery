import os
import sys
import time
import json
import uuid
import base64
import urllib.request
import urllib.error
import subprocess

HEDRA_API_KEY = "k_live_5_lKSbDosqabX4y_:sk_NUy50_cHM9dT-0_NIZT--B4zrXJbF1m58wTwhEQpqlc"
HEDRA_BASE_URL = "https://api.hedra.com/v3"

KLING_API_KEY = "api-key-kling-ZBCskxkg6NOVQFbhMbvln6tZ274M-izFbnoRdE8j0kE"
KLING_BASE_URL = "https://api.klingai.com"

scratch_dir = "scratch/precision_concert_build"
audio_dir = "scratch/precision_concert_build/audio"
clips_dir = "scratch/precision_concert_build/clips"
os.makedirs(audio_dir, exist_ok=True)
os.makedirs(clips_dir, exist_ok=True)
os.makedirs("videos", exist_ok=True)

# -------------------------------------------------------------------------
# STEP 1: PREPARE VOCAL STEM SLICES MATCHING EXACT MUSICAL BARS (122 BPM)
# -------------------------------------------------------------------------
print("[*] STEP 1: Extracting precision vocal phrases...", flush=True)

slices_def = [
    # Cut 3: Side Profile (54.8s to 58.8s / 4.0s)
    {"name": "vocal_cut3_side_heart", "start": "54.800", "duration": "4.0"},
    # Cut 4: Front Stage (58.8s to 62.8s / 4.0s)
    {"name": "vocal_cut4_front_buckle", "start": "58.800", "duration": "4.0"},
    # Cut 6: Side Profile (66.8s to 70.4s / 3.6s)
    {"name": "vocal_cut6_side_circus", "start": "66.800", "duration": "3.6"},
    # Cut 7: Front Finale (70.4s to 77.0s / 6.6s)
    {"name": "vocal_cut7_front_finale", "start": "70.400", "duration": "6.6"}
]

for s in slices_def:
    out_audio = f"{audio_dir}/{s['name']}.mp3"
    cmd = [
        "ffmpeg", "-y",
        "-ss", s["start"],
        "-t", s["duration"],
        "-i", "music/Just My First Clown (Lead Vocal).mp3",
        "-c:a", "libmp3lame", "-b:a", "320k",
        out_audio
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    print(f"    [✓] {s['name']} ({s['start']} -> dur {s['duration']}s)", flush=True)

# -------------------------------------------------------------------------
# STEP 2: SUBMIT HEDRA & KLING JOBS
# -------------------------------------------------------------------------
def upload_to_hedra(filepath):
    boundary = uuid.uuid4().hex
    filename = os.path.basename(filepath)
    mimetype = 'image/jpeg' if filename.endswith(('.jpg', '.jpeg')) else 'audio/mpeg'
    with open(filepath, 'rb') as f:
        file_bytes = f.read()
    body = (
        f'--{boundary}\r\n'
        f'Content-Disposition: form-data; name="file"; filename="{filename}"\r\n'
        f'Content-Type: {mimetype}\r\n\r\n'
    ).encode('utf-8') + file_bytes + f'\r\n--{boundary}--\r\n'.encode('utf-8')
    req = urllib.request.Request(
        f'{HEDRA_BASE_URL}/files',
        data=body,
        headers={
            'Authorization': f'Key {HEDRA_API_KEY}',
            'Content-Type': f'multipart/form-data; boundary={boundary}'
        }
    )
    with urllib.request.urlopen(req, timeout=45) as resp:
        return json.loads(resp.read().decode('utf-8'))['url']

def submit_hedra(job_name, image_path, audio_path, prompt):
    print(f"[*] Submitting Hedra {job_name}...", flush=True)
    img_url = upload_to_hedra(image_path)
    aud_url = upload_to_hedra(audio_path)
    payload = {
        'input': {
            'aspect_ratio': '9:16',
            'resolution': '720p',
            'prompt': prompt,
            'start_image': {'source': 'url', 'url': img_url},
            'audio': {'source': 'url', 'url': aud_url}
        }
    }
    req = urllib.request.Request(
        f'{HEDRA_BASE_URL}/models/hedra-character-3',
        data=json.dumps(payload).encode('utf-8'),
        headers={'Authorization': f'Key {HEDRA_API_KEY}', 'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(req, timeout=45) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        print(f"    [+] Hedra {job_name} submitted -> Job ID: {data['job_id']}", flush=True)
        return data['job_id']

def submit_kling_crowd():
    print(f"[*] Submitting Kling pure crowd pan...", flush=True)
    with open("images/pure_cowboy_crowd.jpg", "rb") as f:
        img_b64 = base64.b64encode(f.read()).decode("utf-8")
    payload = {
        "model_name": "kling-v1",
        "mode": "std",
        "image": img_b64,
        "prompt": "Cinematic 9:16 vertical slow camera pan across a packed outdoor country festival crowd of cowboys and cowgirls in Stetson hats cheering, jumping, and raising beers in sunset dust, glowing stage lights, 24fps.",
        "duration": "5",
        "cfg_scale": 0.5
    }
    req = urllib.request.Request(
        f"{KLING_BASE_URL}/v1/videos/image2video",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Authorization": f"Bearer {KLING_API_KEY}", "Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=45) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        print(f"    [+] Kling pure crowd submitted -> Task ID: {data['data']['task_id']}", flush=True)
        return data['data']['task_id']

hedra_jobs = {}
# Cut 3: Side Profile
hedra_jobs["cut3_side_heart"] = submit_hedra(
    "cut3_side_heart",
    "images/concert_03_side_profile.jpg",
    f"{audio_dir}/vocal_cut3_side_heart.mp3",
    "Dramatic side profile of female country singer singing close to microphone with intense emotion, rhythmic head bounce, golden sunset rim light, 9:16 vertical."
)
# Cut 4: Front Stage
hedra_jobs["cut4_front_buckle"] = submit_hedra(
    "cut4_front_buckle",
    "images/concert_01_front_singing.jpg",
    f"{audio_dir}/vocal_cut4_front_buckle.mp3",
    "Female country singer belting into microphone with sassy playful smirk, rhythmic bouncing to driving beat, festival stage lighting, 9:16 vertical."
)
# Cut 6: Side Profile
hedra_jobs["cut6_side_circus"] = submit_hedra(
    "cut6_side_circus",
    "images/concert_03_side_profile.jpg",
    f"{audio_dir}/vocal_cut6_side_circus.mp3",
    "Dramatic side profile close-up, country singer belting punchline line into microphone with amused smirk, golden festival rim light, 9:16 vertical."
)
# Cut 7: Front Finale
hedra_jobs["cut7_front_finale"] = submit_hedra(
    "cut7_front_finale",
    "images/concert_01_front_singing.jpg",
    f"{audio_dir}/vocal_cut7_front_finale.mp3",
    "Country singer delivering final chorus line directly into camera with radiant joyful smile and celebratory wink to the festival crowd, stage wind blowing hair, 9:16 vertical."
)

kling_task_id = submit_kling_crowd()

# -------------------------------------------------------------------------
# STEP 3: POLL ALL RENDERS
# -------------------------------------------------------------------------
print("\n[*] STEP 3: Polling Hedra and Kling jobs...", flush=True)
downloaded_clips = {}
pending_hedra = dict(hedra_jobs)
kling_pending = True
start_time = time.time()

# We already have cut 1 which the user confirmed is perfect
downloaded_clips["cut1_front_intro"] = "scratch/concert_build/raw_clips/shot_01_front_stage.mp4"
print("    [✓] Cut 1 pre-cached (perfect initial clip)")

while pending_hedra or kling_pending:
    elapsed = int(time.time() - start_time)
    
    # Poll Hedra
    for name, jid in list(pending_hedra.items()):
        req = urllib.request.Request(f"{HEDRA_BASE_URL}/jobs/{jid}", headers={'Authorization': f'Key {HEDRA_API_KEY}'})
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                status = str(data.get('status', '')).upper()
                print(f"[{elapsed}s] Hedra {name}: {status}", flush=True)
                if status == 'COMPLETED':
                    v_url = data['outputs'][0]['url']
                    dest = f"{clips_dir}/{name}.mp4"
                    print(f"    [✓] Downloading Hedra {name}...", flush=True)
                    urllib.request.urlretrieve(v_url, dest)
                    downloaded_clips[name] = dest
                    del pending_hedra[name]
                elif status in ['FAILED', 'CANCELED', 'EXPIRED']:
                    print(f"    [-] Hedra {name} failed: {data}", flush=True)
                    del pending_hedra[name]
        except Exception as e:
            print(f"    Notice polling Hedra {name}: {e}", flush=True)
            
    # Poll Kling
    if kling_pending:
        req = urllib.request.Request(f"{KLING_BASE_URL}/v1/videos/image2video/{kling_task_id}", headers={"Authorization": f"Bearer {KLING_API_KEY}"})
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                status = data.get("data", {}).get("task_status")
                print(f"[{elapsed}s] Kling pure_crowd: {status}", flush=True)
                if status == "succeed":
                    v_url = data["data"]["task_result"]["videos"][0]["url"]
                    dest = f"{clips_dir}/pure_crowd.mp4"
                    print(f"    [✓] Downloading Kling pure crowd from {v_url[:60]}...", flush=True)
                    urllib.request.urlretrieve(v_url, dest)
                    downloaded_clips["pure_crowd"] = dest
                    kling_pending = False
                elif status in ["failed", "canceled"]:
                    print(f"    [-] Kling pure crowd failed: {data}", flush=True)
                    kling_pending = False
        except Exception as e:
            print(f"    Notice polling Kling: {e}", flush=True)
            
    if pending_hedra or kling_pending:
        time.sleep(14)

print("\n[🎉] All video clips generated! Assembling 30.0s multi-camera master...", flush=True)

# -------------------------------------------------------------------------
# STEP 4: CONFORM & ASSEMBLE WITH LOCKED TIMECODE TO 30.0s MASTER TRACK
# -------------------------------------------------------------------------
# The 7 Cuts:
# 1. 0.0 - 3.8s  (3.8s) Front Stage ("Honey save your breath...")
# 2. 3.8 - 7.8s  (4.0s) Pure Crowd Pan (Cowboys & Cowgirls in Stetson hats)
# 3. 7.8 - 11.8s (4.0s) Side Profile ("Thought you'd take my little heart...")
# 4. 11.8 - 15.8s(4.0s) Front Stage Belting ("You're all buckle no belt...")
# 5. 15.8 - 19.8s(4.0s) Pure Crowd Drift (Fans dancing and raising beers)
# 6. 19.8 - 23.4s(3.6s) Side Profile Punchline ("So pack up your circus...")
# 7. 23.4 - 30.0s(6.6s) Front Stage Finale ("Yeah it ain't my first rodeo...")
# Total = 30.000s

cut_timeline = [
    {"source": downloaded_clips["cut1_front_intro"], "ss": 0.0, "t": 3.8, "name": "c01_front"},
    {"source": downloaded_clips["pure_crowd"],       "ss": 0.0, "t": 4.0, "name": "c02_crowd1"},
    {"source": downloaded_clips["cut3_side_heart"],  "ss": 0.0, "t": 4.0, "name": "c03_side"},
    {"source": downloaded_clips["cut4_front_buckle"], "ss": 0.0, "t": 4.0, "name": "c04_front"},
    {"source": downloaded_clips["pure_crowd"],       "ss": 0.5, "t": 4.0, "name": "c05_crowd2"},
    {"source": downloaded_clips["cut6_side_circus"], "ss": 0.0, "t": 3.6, "name": "c06_side"},
    {"source": downloaded_clips["cut7_front_finale"], "ss": 0.0, "t": 6.6, "name": "c07_front"}
]

conformed_files = []
for i, c in enumerate(cut_timeline):
    out_seg = f"{scratch_dir}/seg_{i:02d}_{c['name']}.mp4"
    cmd = [
        "ffmpeg", "-y",
        "-ss", str(c["ss"]),
        "-t", str(c["t"]),
        "-i", c["source"],
        "-vf", "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,fps=30",
        "-c:v", "libx264", "-preset", "fast", "-crf", "18",
        "-an",
        out_seg
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    conformed_files.append(out_seg)
    print(f"    [✓] Conformed {c['name']} ({c['t']}s)", flush=True)

concat_list = f"{scratch_dir}/concat_cuts.txt"
with open(concat_list, "w") as f:
    for cf in conformed_files:
        f.write(f"file '{os.path.abspath(cf)}'\n")

video_stitched = f"{scratch_dir}/video_stitched_30s.mp4"
subprocess.run([
    "ffmpeg", "-y",
    "-f", "concat", "-safe", "0",
    "-i", concat_list,
    "-c", "copy",
    video_stitched
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

# Final Master with Studio Master Track
final_master = "videos/Wren_Montgomery_Outdoor_Concert_30s_Hybrid_Master.mp4"
subprocess.run([
    "ffmpeg", "-y",
    "-i", video_stitched,
    "-i", "scratch/short_30s_master.mp3",
    "-c:v", "copy",
    "-c:a", "aac", "-b:a", "320k",
    "-af", "afade=t=out:st=28.8:d=1.2",
    "-shortest",
    final_master
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

thumb_path = "videos/Wren_Montgomery_Outdoor_Concert_Thumbnail.jpg"
subprocess.run([
    "ffmpeg", "-y",
    "-ss", "00:00:02.000",
    "-i", final_master,
    "-vframes", "1",
    "-q:v", "2",
    thumb_path
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

print(f"\n[🏆] PRECISION-SYNCED 30S CONCERT MASTER COMPLETED!")
print(f"    Video: {final_master}", flush=True)
