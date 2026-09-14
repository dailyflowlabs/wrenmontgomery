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

scratch_dir = "scratch/concert_build"
audio_slices_dir = "scratch/concert_build/audio_slices"
raw_clips_dir = "scratch/concert_build/raw_clips"
os.makedirs(audio_slices_dir, exist_ok=True)
os.makedirs(raw_clips_dir, exist_ok=True)
os.makedirs("videos", exist_ok=True)

START_OFFSET = 47.0

# 5 Shots for the Outdoor Festival Concert Cut (Total = 30.0s)
segments = [
    {
        "id": "shot_01_front_stage",
        "type": "hedra",
        "image": "images/concert_01_front_singing.jpg",
        "start": 0.0,
        "duration": 4.0,
        "prompt": "Country singer singing passionately into wireless stage microphone on outdoor festival stage, rhythmic head movement, glowing amber concert lighting, 9:16 vertical."
    },
    {
        "id": "shot_02_crowd_pan",
        "type": "kling",
        "image": "images/concert_02_crowd_cowboys.jpg",
        "start": 4.0,
        "duration": 6.0,
        "prompt": "Cinematic 9:16 vertical slow camera pan over an energized outdoor festival crowd of cheering cowboys and cowgirls in Stetson cowboy hats waving hands and dancing, golden hour sunset haze, dust motes drifting in amber spotlights, 24fps."
    },
    {
        "id": "shot_03_side_profile",
        "type": "hedra",
        "image": "images/concert_03_side_profile.jpg",
        "start": 10.0,
        "duration": 6.0,
        "prompt": "Dramatic 90-degree side profile of female country singer singing close to microphone with intense expression, rhythmic head bounce, golden sunset rim lighting on blonde hair, 9:16 vertical."
    },
    {
        "id": "shot_04_crowd_drift",
        "type": "kling",
        "image": "images/concert_02_crowd_cowboys.jpg",
        "start": 16.0,
        "duration": 6.0,
        "prompt": "Cinematic 9:16 vertical camera drift showing singer on stage commanding the cheering festival crowd, fans in cowboy hats raising hands and singing along, amber festival lights, 24fps."
    },
    {
        "id": "shot_05_climax_front",
        "type": "hedra",
        "image": "images/concert_01_front_singing.jpg",
        "start": 22.0,
        "duration": 8.0,
        "prompt": "Country singer belting climactic high note into microphone with radiant smile and playful wink to the festival crowd, stage wind blowing hair, golden lighting, 9:16 vertical."
    }
]

print("[*] Slicing isolated vocal audio for Hedra singing clips...", flush=True)
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
        print(f"    [✓] Audio slice for {seg['id']} ({seg['duration']}s)", flush=True)

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
        print(f"    [+] Hedra {seg['id']} submitted -> Job ID: {job_id}", flush=True)
        return job_id

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
        print(f"    [+] Kling {seg['id']} submitted -> Task ID: {task_id}", flush=True)
        return task_id

print("\n[*] Submitting all 5 outdoor concert video render jobs...", flush=True)
submitted_hedra = {}
submitted_kling = {}

for seg in segments:
    if seg["type"] == "hedra":
        jid = submit_hedra(seg)
        submitted_hedra[jid] = seg
    elif seg["type"] == "kling":
        tid = submit_kling(seg)
        submitted_kling[tid] = seg

with open(f"{scratch_dir}/jobs_state.json", "w") as f:
    json.dump({
        "hedra": submitted_hedra,
        "kling": submitted_kling
    }, f, indent=2)

print("\n[*] Polling video renders...", flush=True)
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
                status = str(data.get('status', '')).upper()
                print(f"[{elapsed}s] Hedra {seg['id']}: {status}", flush=True)
                if status == 'COMPLETED':
                    v_url = data['outputs'][0]['url']
                    out_clip = f"{raw_clips_dir}/{seg['id']}.mp4"
                    print(f"    [✓] Downloading Hedra {seg['id']}...", flush=True)
                    urllib.request.urlretrieve(v_url, out_clip)
                    downloaded_clips[seg['id']] = out_clip
                    del pending_hedra[jid]
                elif status in ['FAILED', 'CANCELED', 'EXPIRED']:
                    print(f"    [-] Hedra {seg['id']} failed: {data}", flush=True)
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
                    print(f"    [✓] Downloading Kling {seg['id']}...", flush=True)
                    urllib.request.urlretrieve(v_url, out_clip)
                    downloaded_clips[seg['id']] = out_clip
                    del pending_kling[tid]
                elif status in ["failed", "canceled"]:
                    print(f"    [-] Kling {seg['id']} failed: {data}", flush=True)
                    del pending_kling[tid]
        except Exception as e:
            print(f"    [!] Kling poll error: {e}", flush=True)
            
    if pending_hedra or pending_kling:
        time.sleep(15)

print("\n[*] Standardizing clips to 1080x1920 @ 30fps and assembling...", flush=True)
temp_seg_files = []
for i, seg in enumerate(segments):
    raw_path = downloaded_clips[seg["id"]]
    norm_path = f"{scratch_dir}/norm_{i:02d}_{seg['id']}.mp4"
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
    print(f"    [✓] Standardized {seg['id']} ({seg['duration']}s)", flush=True)

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

final_master = "videos/Wren_Montgomery_Outdoor_Concert_30s_Hybrid_Master.mp4"
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

thumb_path = "videos/Wren_Montgomery_Outdoor_Concert_Thumbnail.jpg"
subprocess.run([
    "ffmpeg", "-y",
    "-ss", "00:00:02.000",
    "-i", final_master,
    "-vframes", "1",
    "-q:v", "2",
    thumb_path
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

print(f"\n[🏆] OUTDOOR CONCERT HYBRID MASTER ASSEMBLED!")
print(f"    Video: {final_master}", flush=True)
print(f"    Thumbnail: {thumb_path}", flush=True)
