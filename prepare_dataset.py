import os
import zipfile
from PIL import Image

scratch_dir = "scratch/wren_dataset"
os.makedirs(scratch_dir, exist_ok=True)

# 1. Base Turnaround Images
base_images = {
    "images/BldRP.jpg": "01_wren_front_portrait.jpg",
    "images/AetsI.jpg": "02_wren_three_quarter.jpg",
    "images/jI0BH.jpg": "03_wren_side_profile.jpg",
    "images/musicvid.jpg": "04_wren_full_body.jpg"
}

for src, name in base_images.items():
    img = Image.open(src)
    dest = os.path.join(scratch_dir, name)
    img.save(dest, quality=95)
    print(f"[✓] Copied {src} -> {dest} ({img.size})")

# 2. Targeted Crops for LoRA Face & Detail Learning
# BldRP (1152 x 1728) - Tight Face / Hazel Eyes
img_bldrp = Image.open("images/BldRP.jpg")
crop_face = img_bldrp.crop((180, 100, 1000, 1050))
crop_face.save(os.path.join(scratch_dir, "05_wren_tight_face_hazel_eyes.jpg"), quality=95)

# AetsI (1264 x 1568) - 3/4 Smile & Cheekbones
img_aetsi = Image.open("images/AetsI.jpg")
crop_smile = img_aetsi.crop((320, 50, 1150, 980))
crop_smile.save(os.path.join(scratch_dir, "06_wren_three_quarter_face_smile.jpg"), quality=95)

# AetsI (1264 x 1568) - Forearm Wildflower Tattoo Detail
crop_arm = img_aetsi.crop((180, 500, 950, 1450))
crop_arm.save(os.path.join(scratch_dir, "07_wren_forearm_tattoo_detail.jpg"), quality=95)

# jI0BH (1152 x 1728) - Profile Jawline & Hair
img_jiobh = Image.open("images/jI0BH.jpg")
crop_profile = img_jiobh.crop((180, 120, 950, 1000))
crop_profile.save(os.path.join(scratch_dir, "08_wren_side_profile_tight.jpg"), quality=95)

# musicvid (784 x 1168) - Upper Body / Torso & Blouse
img_musicvid = Image.open("images/musicvid.jpg")
crop_torso = img_musicvid.crop((150, 40, 650, 680))
crop_torso.save(os.path.join(scratch_dir, "09_wren_upper_torso_styling.jpg"), quality=95)

# 3. Create Training Dataset ZIP
zip_path = "scratch/wren_montgomery_flux_dataset.zip"
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
    for fname in sorted(os.listdir(scratch_dir)):
        if fname.endswith(".jpg"):
            fpath = os.path.join(scratch_dir, fname)
            z.write(fpath, arcname=f"wren_dataset/{fname}")
            print(f"    Added to zip: {fname}")

zip_size_mb = os.path.getsize(zip_path) / (1024 * 1024)
print(f"\n[🎉] Successfully created {zip_path} ({zip_size_mb:.2f} MB with 9 targeted reference images)")
