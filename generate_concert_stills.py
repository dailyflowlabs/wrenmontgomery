import os
import sys
import json
import urllib.request
import fal_client

FAL_KEY = "347f2fd3-fdd2-4fdc-8ac8-f35f96b66d73:d60ae62cd8ed31b35eb00dc6cbcdbf4e"
os.environ["FAL_KEY"] = FAL_KEY

with open("scratch/wren_lora_result.json") as f:
    lora_data = json.load(f)

lora_url = lora_data["diffusers_lora_file"]["url"]
print(f"[*] Using Wren Montgomery FLUX LoRA: {lora_url[:60]}...")

out_dir = "scratch/concert_stills"
os.makedirs(out_dir, exist_ok=True)

# EXACT LOCKED CHARACTER, OUTFIT & STAGE SIGNATURE
WREN_SIGNATURE = "wren_montgomery, a gorgeous 22-year-old blonde country music singer, long sun-bleached golden-honey blonde hair in beachy waves blowing in the stage breeze, captivating hazel-green eyes"
OUTFIT_SIGNATURE = "wearing a fitted sleeveless ivory western corset crop top with silver western hardware, high-waisted distressed denim cutoff shorts with a large ornate silver rodeo trophy buckle, layered turquoise necklace, delicate fine-line wildflower botanical tattoo sleeve trailing down her right forearm, matching delicate ink on right collarbone"
FESTIVAL_SETTING = "massive outdoor summer country music festival stage at golden hour sunset, wooden stage floor, stage monitors, towering metal concert lighting trusses with warm amber floodlights and golden stage strobes, authentic 35mm concert documentary photography, 9:16 vertical"

shots = [
    {
        "name": "concert_01_front_singing.jpg",
        "prompt": f"A raw candid 35mm concert photograph of {WREN_SIGNATURE}. She is {OUTFIT_SIGNATURE}. Front medium shot from the waist up on an elevated festival stage, singing passionately with mouth open into a black wireless stage microphone held in her right tattooed hand. Behind her are warm golden stage lights and hazy summer sunset air. {FESTIVAL_SETTING}."
    },
    {
        "name": "concert_02_crowd_cowboys.jpg",
        "prompt": f"A dynamic 35mm vertical concert photography shot taken from the elevated festival stage looking slightly out toward the packed outdoor festival audience. In the foreground from behind/side is {WREN_SIGNATURE} in {OUTFIT_SIGNATURE} commanding the stage. Out in front in the festival field is a massive, cheering crowd of enthusiastic cowboys and cowgirls wearing authentic tan and brown Stetson cowboy hats, western shirts, cheering and clapping along to the beat with hands in the air, sunset dust and glowing amber festival lights. {FESTIVAL_SETTING}."
    },
    {
        "name": "concert_03_side_profile.jpg",
        "prompt": f"A dramatic 90-degree true side profile concert photograph of {WREN_SIGNATURE} singing passionately live on an outdoor festival stage. Close-up on her profile and upper torso, singing into a handheld stage microphone held right to her lips. She is {OUTFIT_SIGNATURE}. Stunning golden sunset rim light illuminating her sharp jawline, lips, and long blonde waves flowing down her back. {FESTIVAL_SETTING}."
    },
    {
        "name": "concert_04_crowd_to_stage_wide.jpg",
        "prompt": f"A breathtaking vertical 35mm concert broadcast photograph taken from inside the energetic festival crowd looking up toward the towering festival stage. In the lower-third foreground, dark silhouettes of cowboys and cowgirls wearing cowboy hats with arms raised cheering, holding plastic beer cups, and dancing. On stage in sharp center focus under blazing amber stadium floodlights, {WREN_SIGNATURE} in {OUTFIT_SIGNATURE} belts into her microphone with magnetic superstar charisma. {FESTIVAL_SETTING}."
    },
    {
        "name": "concert_05_climax_smile.jpg",
        "prompt": f"An intense 35mm concert photograph of {WREN_SIGNATURE} in three-quarter profile hitting the climactic punchline vocal note on an outdoor festival stage. Head tilted slightly back, radiant joyful country sweetheart smile, lips parted singing into the microphone. She is {OUTFIT_SIGNATURE}, sleeve tattoo visible, golden sunset flare glinting behind her hair, warm crowd glow in the distant background. {FESTIVAL_SETTING}."
    }
]

for s in shots:
    print(f"\n[*] Generating {s['name']} for Wren Montgomery Outdoor Concert...")
    res = fal_client.subscribe(
        "fal-ai/flux-lora",
        arguments={
            "prompt": s["prompt"],
            "loras": [{"path": lora_url, "scale": 0.88}],
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

print("\n[🎉] All 5 Wren Montgomery Outdoor Concert Stills generated successfully!")
