const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

const artifactsDir = 'C:\\Users\\Reshma Kushwaha\\.gemini\\antigravity-ide\\brain\\cfaf50e6-4c5e-4d88-a735-8579bcd32d45';
const targetDir = path.join(__dirname, 'src', 'assets', 'images');

const images = [
  { prefix: 'velvet_blush_raw', target: 'velvet_blush.png' },
  { prefix: 'makeup_brush_set_raw', target: 'makeup_brushes.png' },
  { prefix: 'brush_holder_raw', target: 'brush_holder.png' },
  { prefix: 'pocket_perfume_raw', target: 'pocket_perfume.png' },
];

async function removeWhiteBackground(imagePath, targetPath) {
  try {
    const image = await Jimp.read(imagePath);
    const targetColor = { r: 255, g: 255, b: 255 }; // White
    const tolerance = 15;

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];

      const rDiff = Math.abs(red - targetColor.r);
      const gDiff = Math.abs(green - targetColor.g);
      const bDiff = Math.abs(blue - targetColor.b);

      if (rDiff <= tolerance && gDiff <= tolerance && bDiff <= tolerance) {
        this.bitmap.data[idx + 3] = 0; // Alpha to 0
      }
    });

    await image.writeAsync(targetPath);
    console.log(`Processed and saved to: ${targetPath}`);
  } catch (error) {
    console.error(`Failed to process ${imagePath}:`, error);
  }
}

async function run() {
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const files = fs.readdirSync(artifactsDir).filter(f => f.endsWith('.png'));

  for (const img of images) {
    const rawFiles = files.filter(f => f.startsWith(img.prefix));
    if (rawFiles.length > 0) {
      rawFiles.sort((a, b) => {
        const timeA = fs.statSync(path.join(artifactsDir, a)).mtime.getTime();
        const timeB = fs.statSync(path.join(artifactsDir, b)).mtime.getTime();
        return timeB - timeA;
      });
      const latestRaw = rawFiles[0];
      const sourcePath = path.join(artifactsDir, latestRaw);
      const targetPath = path.join(targetDir, img.target);
      console.log(`Processing ${latestRaw}...`);
      await removeWhiteBackground(sourcePath, targetPath);
    } else {
      console.log(`No raw file found for prefix ${img.prefix}`);
    }
  }
}

run();
