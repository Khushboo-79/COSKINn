const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const artifactsDir = 'C:\\Users\\Reshma Kushwaha\\.gemini\\antigravity-ide\\brain\\47d9f7c6-b046-4588-9ce6-769acc10b61d';
const targetDir = path.join(__dirname, 'src', 'assets', 'images');

const images = [
  { prefix: 'lifestyle_birthday', name: 'lifestyle_birthday.webp' },
  { prefix: 'lifestyle_anniversary', name: 'lifestyle_anniversary.webp' },
  { prefix: 'lifestyle_mother', name: 'lifestyle_mother.webp' },
  { prefix: 'lifestyle_valentine', name: 'lifestyle_valentine.webp' },
  { prefix: 'lifestyle_rakhi', name: 'lifestyle_rakhi.webp' },
  { prefix: 'lifestyle_selfcare', name: 'lifestyle_selfcare.webp' },
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
        .resize(800, 600, { fit: 'cover' })
        .webp({ quality: 90 })
        .toFile(targetPath);
      console.log(`Saved ${item.name}`);
    } else {
      console.error(`Could not find artifact for ${item.prefix}`);
    }
  }
}

processImages().catch(console.error);
