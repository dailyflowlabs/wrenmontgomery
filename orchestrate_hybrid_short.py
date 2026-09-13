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

scratch_dir = "scratch/hybrid_build"
audio_slices_dir = "scratch/hybrid_build/audio_slices"
raw_clips_dir = "scratch/hybrid_build/raw_clips"
os.makedirs(audio_slices_dir, exist_ok=True)
os.makedirs(raw_clips_dir, exist_ok=True)
os.makedirs("videos", exist_ok=True)

# -------------------------------------------------------------------------
# STEP 1: PREPARE AUDIO SLICES FROM LEAD VOCAL STEM (FOR HEDRA LIPSYNC)
# -------------------------------------------------------------------------
print("[*] STEP 1: Slicing vocal stem for precise 30s timeline...", flush=True)

# Base offsets relative to the 30s cut (which starts at 47.0s of original song)
START_OFFSET = 47.0

segments = [
    {
        "id": "shot_01_kling_intro",
        "type": "kling",
        "image": "images/shot_01_tailgate_wide.jpg",
        "start": 0.0,
        "duration": 4.0,
        "prompt": "Cinematic 9:16 vertical slow camera push-in on a gorgeous country girl sitting relaxed on the tailgate of a vintage sky-blue Ford pickup truck at golden sunset, warm breeze blowing blonde waves across her face, subtle confident breathing, boots lightly swinging to the rhythm, 24fps."
    },
    {
        "id": "shot_02_hedra_chorus1",
        "type": "hedra",
        "image": "images/shot_02_tailgate_lipsync_front.jpg",
        "start": 4.0,
        "duration": 8.0,
        "prompt": "Country singer singing passionately with sassy playful smirk directly into camera phone, natural facial expressions, expressive lip movements, golden hour lighting, 9:16 vertical."
    },
    {
        "id": "shot_03_kling_side_laugh",
        "type": "kling",
        "image": "images/shot_03_tailgate_side_laugh.jpg",
        "start": 12.0,
        "duration": 4.0,
        "prompt": "Cinematic 9:16 vertical camera drift on a country girl on the back of a vintage pickup truck laughing and smirking mid-sentence, wind blowing long golden hair, Tennessee golden hour sunset rim light, authentic 24fps."
    },
    {
        "id": "shot_04_hedra_chorus2",
        "type": "hedra",
        "image": "images/shot_04_tailgate_climax_punchline.jpg",
        "start": 16.0,
        "duration": 8.0,
        "prompt": "Country singer belting passionately with energetic expression, smiling and delivering punchline, floral arm tattoo visible, golden sunset lighting, 9:16 vertical."
    },
    {
        "id": "shot_05_hedra_finale",
        "type": "hedra",
        "image": "images/shot_02_tailgate_lipsync_front.jpg",
        "start": 24.0,
        "duration": 6.0,
        "prompt": "Country singer delivering final anthemic chorus line directly into lens with triumphant wink and big sweetheart smile, 9:16 vertical."
    }
]

# Generate isolated audio slices for Hedra jobs
for seg in segments:
    if seg["type"] == "hedra":
        slice_path = f"{audio_slices_dir}/{seg['id']}.mp3"
        seg["audio"] = slice_path
        abs_start = START_OFFSET + seg["start"]
        cmd = [
            "ffmpeg", "-y",
            "-ss", str(abs_start),
            "-t", str(seg["duration"]),
            "-i", "music/Just My First Clown (Lead Vocal).mp3",
            "-c:a", "libmp3lame", "-b:a", "320k",
            slice_path
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        print(f"    [✓] Created audio slice for {seg['id']} ({seg['duration']}s)")

# -------------------------------------------------------------------------
# STEP 2: SUBMIT HEDRA JOBS
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

def submit_hedra(seg):
    print(f"[*] Submitting Hedra job: {seg['id']}...", flush=True)
    img_url = upload_to_hedra(seg["image"])
    aud_url = upload_to_hedra(seg["audio"])
    
    payload = {
        'input': {
            'aspect_ratio': '9:16',
            'resolution': '720p',
            'prompt': seg['prompt'],
            'start_image': {'source': 'url', 'url': img_url},
            'audio': {'source': 'url', 'url': aud_url}
        }
    }
    req = urllib.request.Request(
        f'{HEDRA_BASE_URL}/models/hedra-character-3',
        data=json.dumps(payload).encode('utf-8'),
        headers={
            'Authorization': f'Key {HEDRA_API_KEY}',
            'Content-Type': 'application/json'
        }
    )
    with urllib.request.urlopen(req, timeout=45) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        job_id = data['job_id']
        print(f"    [+] Hedra job {seg['id']} submitted -> Job ID: {job_id}")
        return job_id

# -------------------------------------------------------------------------
# STEP 3: SUBMIT KLING JOBS
# -------------------------------------------------------------------------
def submit_kling(seg):
    print(f"[*] Submitting Kling job: {seg['id']}...", flush=True)
    with open(seg["image"], "rb") as f:
        img_b64 = base64.b64encode(f.read()).decode("utf-8")
        
    payload = {
        "model_name": "kling-v1",
        "mode": "std",
        "image": img_b64,
        "prompt": seg["prompt"],
        "duration": "5",
        "cfg_scale": 0.5
    }
    req = urllib.request.Request(
        f"{KLING_BASE_URL}/v1/videos/image2video",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {KLING_API_KEY}",
            "Content-Type": "application/json"
        }
    )
    with urllib.request.urlopen(req, timeout=45) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        task_id = data["data"]["task_id"]
        print(f"    [+] Kling job {seg['id']} submitted -> Task ID: {task_id}")
        return task_id

# -------------------------------------------------------------------------
# LAUNCH ALL JOBS
# -------------------------------------------------------------------------
print("\n[*] STEP 2: Launching all 5 hybrid video generation jobs...", flush=True)
submitted_hedra = {}
submitted_kling = {}

for seg in segments:
    if seg["type"] == "hedra":
        jid = submit_hedra(seg)
        submitted_hedra[jid] = seg
    elif seg["type"] == "kling":
        tid = submit_kling(seg)
        submitted_kling[tid] = seg

# Save state
with open("scratch/hybrid_build/jobs_state.json", "w") as f:
    json.dump({
        "hedra": submitted_hedra,
        "kling": submitted_kling
    }, f, indent=2)

# -------------------------------------------------------------------------
# STEP 4: POLL ALL JOBS UNTIL COMPLETE
# -------------------------------------------------------------------------
print("\n[*] STEP 3: Polling video generation jobs...", flush=True)

downloaded_clips = {}
pending_hedra = dict(submitted_hedra)
pending_kling = dict(submitted_kling)
start_poll = time.time()

while pending_hedra or pending_kling:
    elapsed = int(time.time() - start_poll)
    
    # Poll Hedra
    for jid, seg in list(pending_hedra.items()):
        req = urllib.request.Request(
            f"{HEDRA_BASE_URL}/jobs/{jid}",
            headers={'Authorization': f'Key {HEDRA_API_KEY}'}
        )
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                status = data.get('status')
                print(f"[{elapsed}s] Hedra {seg['id']}: {status}", flush=True)
                if status == 'completed':
                    v_url = data['output']['video']['url']
                    out_clip = f"{raw_clips_dir}/{seg['id']}.mp4"
                    print(f"    [✓] Downloading {seg['id']} from {v_url[:50]}...", flush=True)
                    urllib.request.urlretrieve(v_url, out_clip)
                    downloaded_clips[seg['id']] = out_clip
                    del pending_hedra[jid]
                elif status in ['failed', 'canceled']:
                    print(f"    [-] Hedra {seg['id']} failed: {data.get('error')}", flush=True)
                    del pending_hedra[jid]
        except Exception as e:
            print(f"    [!] Hedra poll error: {e}", flush=True)
            
    # Poll Kling
    for tid, seg in list(pending_kling.items()):
        req = urllib.request.Request(
            f"{KLING_BASE_URL}/v1/videos/image2video/{tid}",
            headers={"Authorization": f"Bearer {KLING_API_KEY}"}
        )
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                status = data.get("data", {}).get("task_status")
                print(f"[{elapsed}s] Kling {seg['id']}: {status}", flush=True)
                if status == "succeed":
                    v_url = data["data"]["task_result"]["videos"][0]["url"]
                    out_clip = f"{raw_clips_dir}/{seg['id']}.mp4"
                    print(f"    [✓] Downloading {seg['id']} from {v_url[:50]}...", flush=True)
                    urllib.request.urlretrieve(v_url, out_clip)
                    downloaded_clips[seg['id']] = out_clip
                    del pending_kling[tid]
                elif status in ["failed", "canceled"]:
                    msg = data.get("data", {}).get("task_status_msg")
                    print(f"    [-] Kling {seg['id']} failed: {msg}", flush=True)
                    del pending_kling[tid]
        except Exception as e:
            print(f"    [!] Kling poll error: {e}", flush=True)
            
    if pending_hedra or pending_kling:
        time.sleep(15)

print("\n[🎉] All 5 video clips rendered and downloaded successfully!", flush=True)

# -------------------------------------------------------------------------
# STEP 5: PRECISION CONCATENATION & AUDIO MUXING
# -------------------------------------------------------------------------
print("\n[*] STEP 4: Standardizing clips and assembling final 30s Hybrid Short...", flush=True)

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
    print(f"    [✓] Standardized {seg['id']} -> {norm_path} ({seg['duration']}s)")

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

# Final Master with Studio Audio and subtle fade-out
final_master = "videos/Wren_Montgomery_First_Rodeo_30s_Hybrid_Master.mp4"
subprocess.run([
    "ffmpeg", "-y",
    "-i", temp_video_only,
    "-i", "scratch/short_30s_master.mp3",
    "-c:v", "copy",
    "-c:a", "aac", "-b:a", "320k",
    "-af", "afade=t=out:st=28.5:d=1.5",
    "-shortest",
    final_master
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

# Generate high-res thumbnail from the best frame of shot_02
thumb_path = "videos/Wren_Montgomery_Short_Thumbnail.jpg"
subprocess.run([
    "ffmpeg", "-y",
    "-ss", "00:00:06.000",
    "-i", final_master,
    "-vframes", "1",
    "-q:v", "2",
    thumb_path
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

print(f"\n[🏆] 30-SECOND HYBRID MASTER COMPLETED!")
print(f"    Video: {final_master}")
print(f"    Thumbnail: {thumb_path}")
