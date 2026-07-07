const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const FALLBACK_ID = '1599305090598-fe179d501227';

const images = [
  { id: '1604169550756-3475dcefb0ea', name: 'occ_diwali.webp' }, // Diya/lights aesthetic
  { id: '1543589077-47d81606c1bc', name: 'occ_christmas.webp' }, // Christmas lights/gift
  { id: '1593356064718-d7486e11f72e', name: 'occ_raksha_bandhan.webp' }, // Festive Indian/floral
];

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
        .webp({ quality: 85 })
        .toFile(targetPath);
      console.log(`Saved ${item.name}`);
    } catch (e) {
      console.error(`Error saving ${item.name}:`, e);
    }
  }
}

downloadAll().catch(console.error);
