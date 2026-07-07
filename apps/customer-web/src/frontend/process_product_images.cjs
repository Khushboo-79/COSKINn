const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const artifactsDir = 'C:\\Users\\Reshma Kushwaha\\.gemini\\antigravity-ide\\brain\\47d9f7c6-b046-4588-9ce6-769acc10b61d';
const targetDir = path.join(__dirname, 'src', 'assets', 'images');

const images = [
  { prefix: 'product_birthday', name: 'product_birthday.webp' },
  { prefix: 'product_anniversary', name: 'product_anniversary.webp' },
  { prefix: 'product_mother', name: 'product_mother.webp' },
  { prefix: 'product_valentine', name: 'product_valentine.webp' },
  { prefix: 'product_rakhi', name: 'product_rakhi.webp' },
  { prefix: 'product_selfcare', name: 'product_selfcare.webp' },
];

async function processImages() {
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const files = fs.readdirSync(artifactsDir);

  for (const item of images) {
    const pngFile = files.find(f => f.startsWith(item.prefix) && f.endsWith('.png'));
    if (pngFile) {
      const sourcePath = path.join(artifactsDir, pngFile);
      const targetPath = path.join(targetDir, item.name);
      
      console.log(`Processing ${pngFile} to ${item.name}...`);
      await sharp(sourcePath)
        .resize(800, 800, { fit: 'cover' })
        .webp({ quality: 90 })
        .toFile(targetPath);
      console.log(`Saved ${item.name}`);
    } else {
      console.error(`Could not find artifact for ${item.prefix}`);
    }
  }
}

processImages().catch(console.error);
