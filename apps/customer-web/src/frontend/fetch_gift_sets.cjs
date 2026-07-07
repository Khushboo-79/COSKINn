const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const FALLBACK_ID = '1599305090598-fe179d501227';

const giftImages = [
  { id: '1549465220-1a8b9238cd48', name: 'gift_hero.webp', isHero: true },
  { id: '1513201099705-a9746e1e201f', name: 'gift_glow_essentials.webp', isHero: false },
  { id: '1603899122325-1e3c3b0fce04', name: 'gift_hydration.webp', isHero: false },
  { id: '1512418490979-9ce792d5e137', name: 'gift_sun_protection.webp', isHero: false },
  { id: '1577234286642-fc512a5f8d11', name: 'gift_everyday.webp', isHero: false },
  { id: '1544453872-4638cbab8938', name: 'gift_luxury.webp', isHero: false },
  { id: '1592643501799-28c0d9a6c710', name: 'gift_travel.webp', isHero: false },
  { id: '1519782583569-70cc68a3562a', name: 'gift_glow_repair.webp', isHero: false },
  { id: '1511268559489-34b624ee0a78', name: 'gift_premium.webp', isHero: false },
];

async function fetchImage(imageId) {
  let url = `https://images.unsplash.com/photo-${imageId}?q=80&w=2000&auto=format&fit=crop`;
  let res = await fetch(url);
  if (!res.ok) {
    console.log(`Failed for ${imageId}, using fallback`);
    url = `https://images.unsplash.com/photo-${FALLBACK_ID}?q=80&w=2000&auto=format&fit=crop`;
    res = await fetch(url);
  }
  return res.arrayBuffer();
}

async function downloadAll() {
  const targetDir = path.join(__dirname, 'src', 'assets', 'images');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  for (const item of giftImages) {
    console.log(`Fetching ${item.name}...`);
    try {
      const buffer = Buffer.from(await fetchImage(item.id));
      const size = item.isHero ? { width: 2000, height: 1000 } : { width: 800, height: 800 };
      
      const targetPath = path.join(targetDir, item.name);
      await sharp(buffer)
        .resize(size.width, size.height, { fit: 'cover' })
        .webp({ quality: 85 })
        .toFile(targetPath);
      console.log(`Saved ${item.name}`);
    } catch (e) {
      console.error(`Error saving ${item.name}:`, e);
    }
  }
}

downloadAll().catch(console.error);
