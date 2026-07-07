const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const FALLBACK_ID = '1599305090598-fe179d501227';

const images = [
  { id: '1513201099705-a9746e1e201f', name: 'occ_birthday.webp' },
  { id: '1583847268964-b28ce7f49583', name: 'occ_anniversary.webp' },
  { id: '1511285560929-80a456fea0bc', name: 'occ_wedding.webp' },
  { id: '1587314168485-69f1a04d86c0', name: 'occ_mother.webp' },
  { id: '1518199266791-5375a83164fa', name: 'occ_valentine.webp' },
  { id: '1544453872-4638cbab8938', name: 'occ_selfcare.webp' },
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
