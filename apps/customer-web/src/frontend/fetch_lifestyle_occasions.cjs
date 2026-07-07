const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Unsplash IDs for premium lifestyle skincare/beauty/gift images
const images = [
  { id: '1615397323604-585a2107409f', name: 'lifestyle_birthday.webp' }, // Luxury gift box flat lay
  { id: '1584305574647-05c00e1236fb', name: 'lifestyle_anniversary.webp' }, // Skincare & flowers
  { id: '1608248593810-746736207db9', name: 'lifestyle_mother.webp' }, // Elegant spa/skincare arrangement
  { id: '1518173946091-a1288c3a50f7', name: 'lifestyle_valentine.webp' }, // Romantic pink theme box/flowers
  { id: '1576019313904-7cd3b5ff23b2', name: 'lifestyle_rakhi.webp' }, // Festive luxury packaging
  { id: '1620916566398-39f1143ab7be', name: 'lifestyle_selfcare.webp' }, // Premium vanity table / skincare products
];

const FALLBACK_ID = '1599305090598-fe179d501227';

async function fetchImage(imageId) {
  let url = `https://images.unsplash.com/photo-${imageId}?q=80&w=800&auto=format&fit=crop`;
  let res = await fetch(url);
  if (!res.ok) {
    console.log(`Failed for ${imageId}, using fallback`);
    url = `https://images.unsplash.com/photo-${FALLBACK_ID}?q=80&w=800&auto=format&fit=crop`;
    res = await fetch(url);
  }
  return res.arrayBuffer();
}

async function downloadAll() {
  const targetDir = path.join(__dirname, 'src', 'assets', 'images');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  for (const item of images) {
    console.log(`Fetching ${item.name}...`);
    try {
      const buffer = Buffer.from(await fetchImage(item.id));
      const targetPath = path.join(targetDir, item.name);
      
      await sharp(buffer)
        .resize(800, 600, { fit: 'cover' })
        .webp({ quality: 90 })
        .toFile(targetPath);
        
      console.log(`Saved ${item.name}`);
    } catch (e) {
      console.error(`Error saving ${item.name}:`, e);
    }
  }
}

downloadAll().catch(console.error);
