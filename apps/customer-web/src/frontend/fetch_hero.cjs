const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function downloadBestSellersHero() {
  // Using a highly premium nude/beige aesthetic 
  const url = "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2000&auto=format&fit=crop";
  console.log("Fetching...", url);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  
  const targetPath = path.join(__dirname, 'src', 'assets', 'images', 'best_sellers_hero.webp');
  await sharp(buffer)
    .resize(2000, 1000, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(targetPath);
  console.log("Saved to", targetPath);
}

downloadBestSellersHero().catch(console.error);
