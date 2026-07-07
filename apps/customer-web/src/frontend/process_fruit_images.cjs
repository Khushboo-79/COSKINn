const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const artifactsDir = 'C:\\Users\\Reshma Kushwaha\\.gemini\\antigravity-ide\\brain\\47d9f7c6-b046-4588-9ce6-769acc10b61d';
const targetDir = path.join(__dirname, 'src', 'assets', 'images');

// Mapping logical name to the prefix of the newly generated fruit images
// If a fruit image failed to generate (Quota limit), we fallback to another valid fruit image.
const mappings = [
  // Lifestyles
  { target: 'lifestyle_birthday.webp', prefix: 'lifestyle_birthday' },
  { target: 'lifestyle_anniversary.webp', prefix: 'lifestyle_anniversary' },
  { target: 'lifestyle_mother.webp', prefix: 'lifestyle_mother' },
  { target: 'lifestyle_valentine.webp', prefix: 'lifestyle_valentine' }, // newly generated strawberry
  { target: 'lifestyle_rakhi.webp', prefix: 'lifestyle_rakhi' }, // newly generated orange
  { target: 'lifestyle_selfcare.webp', prefix: 'lifestyle_mother' }, // FAILED to generate green tea, fallback to blueberry

  // Products
  { target: 'product_birthday.webp', prefix: 'product_birthday' },
  { target: 'product_anniversary.webp', prefix: 'product_anniversary' },
  { target: 'product_mother.webp', prefix: 'product_mother' },
  { target: 'product_valentine.webp', prefix: 'product_birthday' }, // fallback to strawberry product
  { target: 'product_rakhi.webp', prefix: 'product_anniversary' }, // fallback to pomegranate product
  { target: 'product_selfcare.webp', prefix: 'product_mother' }, // fallback to blueberry product
];

async function processImages() {
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const files = fs.readdirSync(artifactsDir);
  // Sort files by modified time descending to pick the latest generation of each prefix
  const sortedFiles = files
    .filter(f => f.endsWith('.png'))
    .map(name => ({ name, time: fs.statSync(path.join(artifactsDir, name)).mtime.getTime() }))
    .sort((a, b) => b.time - a.time);

  for (const item of mappings) {
    const pngFile = sortedFiles.find(f => f.name.startsWith(item.prefix));
    if (pngFile) {
      const sourcePath = path.join(artifactsDir, pngFile.name);
      const targetPath = path.join(targetDir, item.target);
      
      console.log(`Processing ${pngFile.name} to ${item.target}...`);
      await sharp(sourcePath)
        .resize(800, 800, { fit: 'cover' })
        .webp({ quality: 90 })
        .toFile(targetPath);
      console.log(`Saved ${item.target}`);
    } else {
      console.error(`Could not find artifact for ${item.prefix}`);
    }
  }
}

processImages().catch(console.error);
