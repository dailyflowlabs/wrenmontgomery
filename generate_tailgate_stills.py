import os
import sys
import json
import urllib.request
import fal_client

FAL_KEY = "347f2fd3-fdd2-4fdc-8ac8-f35f96b66d73:d60ae62cd8ed31b35eb00dc6cbcdbf4e"
os.environ["FAL_KEY"] = FAL_KEY

lora_result_file = "scratch/wren_lora_result.json"
if not os.path.exists(lora_result_file):
    print(f"[-] LoRA weights not found at {lora_result_file}. Waiting for training to complete...")
    sys.exit(1)

with open(lora_result_file) as f:
    lora_data = json.load(f)

lora_url = lora_data["diffusers_lora_file"]["url"]
print(f"[*] Loaded Wren Montgomery FLUX LoRA: {lora_url[:60]}...")

out_dir = "scratch/tailgate_stills"
os.makedirs(out_dir, exist_ok=True)

# CORE ANCHOR ATTRIBUTES
OUTFIT = "wearing a faded vintage distressed rodeo graphic tee cropped and tied at the waist, high-waisted frayed light-wash denim cutoff shorts, scuffed tan leather cowgirl boots, delicate wildflower floral tattoo sleeve trailing down her right forearm, matching delicate collarbone ink"
SETTING = "sitting on the lowered tailgate of a vintage 1978 dusty sky-blue Ford pickup truck parked on a gravel country lane, golden hour Tennessee sunset flare, photorealistic 35mm film documentary photography, 9:16 vertical"

shots = [
    {
        "name": "shot_01_tailgate_wide.jpg",
        "prompt": f"A candid 9:16 vertical photograph of wren_montgomery, a gorgeous 22-year-old blonde country singer, {SETTING}. Wren has long golden-honey blonde hair in beachy waves blowing in the evening breeze. She is {OUTFIT}. Medium shot sitting relaxed on the truck tailgate, holding a worn acoustic guitar on her knee, smiling warmly and teasingly straight at the camera. Warm golden sunlight rim lighting her hair, visible skin pores, natural beauty."
    },
    {
        "name": "shot_02_tailgate_lipsync_front.jpg",
        "prompt": f"A vibrant 9:16 vertical close-up photograph of wren_montgomery singing live directly into the camera phone. She is {OUTFIT}, {SETTING}. Leaning in close towards the camera with a sassy confident smirk, lips parted singing passionately, hazel-green eyes with golden flecks locked onto the lens. Forearm wildflower tattoo clearly visible. Warm sun flare halo around her head, authentic 35mm film grain."
    },
    {
        "name": "shot_03_tailgate_side_laugh.jpg",
        "prompt": f"A dynamic 9:16 vertical three-quarter side profile photograph of wren_montgomery sitting on the tailgate of a dusty blue vintage truck. Wren has long voluminous honey-blonde wavy hair blowing across her face. She is {OUTFIT}. Singing and laughing playfully while strumming her acoustic guitar, looking slightly off-camera with an amused, magnetic expression. Rich golden hour lighting, deep warm shadows, 35mm documentary realism."
    },
    {
        "name": "shot_04_tailgate_climax_punchline.jpg",
        "prompt": f"An intense 9:16 vertical portrait of wren_montgomery delivering the punchline of a country anthem. Close-up from the chest up, {OUTFIT}. Direct magnetic eye contact, beaming with radiant confidence, smiling broadly with a cheeky wink, golden sun flare glinting in the camera lens. Cinematic shallow depth of field, authentic country sweetheart charm, high-end editorial photography."
    }
]

for s in shots:
    print(f"\n[*] Generating {s['name']} using Wren Montgomery FLUX LoRA...")
    res = fal_client.subscribe(
        "fal-ai/flux-lora",
        arguments={
            "prompt": s["prompt"],
            "loras": [{"path": lora_url, "scale": 0.9}],
            "image_size": {
                "width": 896,
                "height": 1536
            },
            "num_inference_steps": 30,
            "guidance_scale": 3.0,
            "output_format": "jpeg"
        }
    )
    img_url = res["images"][0]["url"]
    dest_path = os.path.join(out_dir, s["name"])
    urllib.request.urlretrieve(img_url, dest_path)
    print(f"    [✓] Saved {s['name']} to {dest_path}")

print("\n[🎉] All 4 Wren Montgomery Tailgate Stills generated successfully!")
