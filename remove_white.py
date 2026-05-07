from PIL import Image

def remove_bg(img_path):
    try:
        img = Image.open(img_path).convert("RGBA")
        data = img.getdata()
        
        new_data = []
        for item in data:
            # White-ish pixels
            if item[0] > 230 and item[1] > 230 and item[2] > 230:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(img_path, "PNG")
        print("Success")
    except Exception as e:
        print("Error:", e)

remove_bg("public/janmasethu.png")
