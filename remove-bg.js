const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

async function removeWhiteBg(inputPath, outputPath1, outputPath2) {
  try {
    const image = await Jimp.read(inputPath);
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // If pixel is white or very light, make it transparent
      // Also apply a small alpha gradient for anti-aliasing if needed, but strict threshold is easier
      if (r > 240 && g > 240 && b > 240) {
        this.bitmap.data[idx + 3] = 0;
      }
    });

    await image.writeAsync(outputPath1);
    await image.writeAsync(outputPath2);
    console.log('Saved transparent image to', outputPath1, 'and', outputPath2);
  } catch (error) {
    console.error('Error processing', inputPath, error);
  }
}

async function run() {
  const inputFull = path.join(__dirname, 'apps/internal-panel/public/logo-full.png');
  const inputIcon = path.join(__dirname, 'apps/internal-panel/public/logo-icon.png');
  
  const outFull1 = path.join(__dirname, 'apps/New/apps/customer-web/public/fairenne-full.png');
  const outFull2 = path.join(__dirname, 'apps/customer-web/public/fairenne-full.png');
  
  const outIcon1 = path.join(__dirname, 'apps/New/apps/customer-web/public/fairenne-icon.png');
  const outIcon2 = path.join(__dirname, 'apps/customer-web/public/fairenne-icon.png');
  
  await removeWhiteBg(inputFull, outFull1, outFull2);
  await removeWhiteBg(inputIcon, outIcon1, outIcon2);
}

run();
