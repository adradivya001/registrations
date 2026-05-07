import re

file_path = "src/index.css"
with open(file_path, "r") as f:
    content = f.read()

# Replace hardcoded RGBA and hex colors that match the old theme

replacements = {
    # gold (200, 135, 63) -> (232, 153, 183)
    r"rgba\(\s*200\s*,\s*135\s*,\s*63\s*,": "rgba(232, 153, 183,",
    # deep (12, 43, 38) -> (74, 21, 43)
    r"rgba\(\s*12\s*,\s*43\s*,\s*38\s*,": "rgba(74, 21, 43,",
    # teal (20, 80, 74) -> (122, 43, 75)
    r"rgba\(\s*20\s*,\s*80\s*,\s*74\s*,": "rgba(122, 43, 75,",
    # cream (254, 250, 245) -> (255, 245, 248)
    r"rgba\(\s*254\s*,\s*250\s*,\s*245\s*,": "rgba(255, 245, 248,",
    # gold-washish (251, 246, 238) -> (254, 240, 245)
    r"rgba\(\s*251\s*,\s*246\s*,\s*238\s*,": "rgba(254, 240, 245,",
    
    # Hex colors
    r"#B5742E": "#c47a98", # old dark gold -> darker pink hover
    r"#FBF6EE": "#fef0f5", # old gold wash
}

for pattern, replacement in replacements.items():
    content = re.sub(pattern, replacement, content)

with open(file_path, "w") as f:
    f.write(content)

print("Replacement complete.")
