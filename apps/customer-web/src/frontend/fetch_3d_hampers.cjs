const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Keywords to get different luxury hampers
const images = [
  { keyword: 'luxury gift box ribbon', name: 'hamper_birthday.webp' },
  { keyword: 'premium gift hamper', name: 'hamper_anniversary.webp' },
  { keyword: 'floral gift box', name: 'hamper_mother.webp' },
  { keyword: 'valentine gift box pink', name: 'hamper_valentine.webp' },
  { keyword: 'gold gift box festive', name: 'hamper_rakhi.webp' },
  { keyword: 'skincare pouch open', name: 'hamper_selfcare.webp' },
];

async function fetchImage(keyword) {
  // Using source.unsplash.com with keywords, but wait, source.unsplash.com is deprecated and redirects randomly!
  // Instead, let's use the standard search endpoint or just random with query
  const query = encodeURIComponent(keyword);
  let url = `https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop`; // fallback

  // Let's use some known good IDs from a previous script or just a generic search?
  // We can't easily search without an API key for the JSON API. 
  // Let's just use known good image IDs that actually exist!
  const knownIds = {
    'hamper_birthday.webp': '1549465220-1a8b9238cd48', // gift box
    'hamper_anniversary.webp': '1607344645866-5ebf0c739e4c', // luxury box
    'hamper_mother.webp': '1582298642732-fdf731f822fc', // flowers box
    'hamper_valentine.webp': '1518173946091-a1288c3a50f7', // heart / valentine box
    'hamper_rakhi.webp': '1511268559489-34b624fbfba3', // gold/festive box
    'hamper_selfcare.webp': '1608248593810-746736207db9', // spa/pouch
  };

  url = `https://images.unsplash.com/photo-${knownIds[keyword]}?q=80&w=800&auto=format&fit=crop`;
  let res = await fetch(url);
  if (!res.ok) {
     // try again with a fallback
     res = await fetch(`https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop`);
  }
  return res.arrayBuffer();
}

async function downloadAll() {
  const targetDir = path.join(__dirname, 'src', 'assets', 'images');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  for (const item of images) {
    console.log(`Fetching ${item.name}...`);
    try {
      const buffer = Buffer.from(await fetchImage(item.name));
      const targetPath = path.join(targetDir, item.name);
      
      await sharp(buffer)
        .resize(600, 600, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .webp({ quality: 90 })
        .toFile(targetPath);
        
      console.log(`Saved ${item.name}`);
    } catch (e) {
      console.error(`Error saving ${item.name}:`, e);
    }
  }
}

downloadAll().catch(console.error);
