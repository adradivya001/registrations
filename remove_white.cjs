const Jimp = require('jimp');

async function removeWhiteBackground() {
    try {
        const image = await Jimp.read('public/hero_illustration.png');
        
        // Iterate through all pixels
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            
            // If the pixel is very close to white, make it transparent
            // Using a threshold to catch "almost white" pixels
            if (r > 240 && g > 240 && b > 240) {
                this.bitmap.data[idx + 3] = 0; // Set alpha to 0
            }
        });

        await image.writeAsync('public/hero_illustration.png');
        console.log('White background removed successfully.');
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

removeWhiteBackground();
