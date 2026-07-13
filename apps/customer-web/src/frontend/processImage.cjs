const Jimp = require('jimp');

async function processImage() {
  try {
    const image = await Jimp.read('C:\\Users\\Reshma Kushwaha\\OneDrive\\Desktop\\COSKINn\\apps\\customer-web\\src\\frontend\\src\\assets\\images\\premium_under_eye_model.png');
    
    console.log('Image loaded. Processing transparency and feathering...');
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red   = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue  = this.bitmap.data[idx + 2];
      
      // Convert near-white to transparent
      // We use a threshold of >235 to catch off-white edges and artifacts
      if (red > 235 && green > 235 && blue > 235) {
        this.bitmap.data[idx + 3] = 0; // Alpha
      } else {
        // Feather the edges of the non-white pixels
        // Let's feather the bottom 20%
        const height = image.bitmap.height;
        const fadeStart = height * 0.80;
        
        if (y > fadeStart) {
          const ratio = 1.0 - ((y - fadeStart) / (height - fadeStart));
          this.bitmap.data[idx + 3] = Math.round(this.bitmap.data[idx + 3] * ratio);
        }
      }
    });

    // Apply a slight blur to soften the jagged edges
    // image.blur(1);

    await image.writeAsync('C:\\Users\\Reshma Kushwaha\\OneDrive\\Desktop\\COSKINn\\apps\\customer-web\\src\\frontend\\src\\assets\\images\\premium_under_eye_model_transparent.png');
    console.log('Image processed and saved with true transparency.');
  } catch (err) {
    console.error('Error processing image:', err);
  }
}

processImage();
