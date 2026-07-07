const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, 'src', 'assets', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Map products to specific Unsplash image IDs that look like premium skincare
const productImages = {
  'sunscreen_spf50': 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571',
  'body_sunscreen': 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e',
  'tinted_sunscreen': 'https://images.unsplash.com/photo-1608248593842-b02446f25102',
  'gentle_cleanser': 'https://images.unsplash.com/photo-1556228720-192a6af4e865',
  'cleansing_balm': 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b',
  'lip_balm': 'https://images.unsplash.com/photo-1615397323136-1e0f0653f5ff',
  'hand_cream': 'https://images.unsplash.com/photo-1574311054366-41712a32c66d',
  'pocket_perfume': 'https://images.unsplash.com/photo-1594035910387-fea47794261f',
  'face_mist': 'https://images.unsplash.com/photo-1614859324967-bdfdec6dce6d',
  'overnight_mask': 'https://images.unsplash.com/photo-1599305090598-fe179d501227',
  'under_eye_patches': 'https://images.unsplash.com/photo-1512496015851-a1cbfc3b8c57', 
  'daily_moisturiser': 'https://images.unsplash.com/photo-1617897903246-719242758050',
  'setting_spray': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be',
  'niacinamide_serum': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be'
};

const variants = ['', '_side', '_back', '_lifestyle'];

async function downloadImage(url) {
  const response = await fetch(`${url}?q=80&w=800&auto=format&fit=crop`);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function generateImages() {
  console.log('Downloading real images using fetch and applying COSKINn branding...');
  for (const [product, url] of Object.entries(productImages)) {
    try {
      console.log(`Processing ${product}...`);
      const imgBuffer = await downloadImage(url);
      
      for (const variant of variants) {
        const fileName = `${product}${variant}.webp`;
        const filePath = path.join(targetDir, fileName);

        const title = product.replace(/_/g, ' ').toUpperCase();
        const subtitle = variant === '' ? '' : variant.replace('_', '').toUpperCase();
        
        // Create a premium overlay that acts like a label covering the original brand
        const svgLabel = `
          <svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
            <rect x="200" y="300" width="400" height="200" fill="rgba(255,255,255,0.95)" rx="10" />
            <text x="400" y="380" font-family="sans-serif" font-size="42" font-weight="900" fill="#FF0069" text-anchor="middle" letter-spacing="4">
              COSKINn
            </text>
            <text x="400" y="440" font-family="sans-serif" font-size="20" font-weight="bold" fill="#333" text-anchor="middle" letter-spacing="2">
              ${title}
            </text>
            ${subtitle ? `<text x="400" y="475" font-family="sans-serif" font-size="14" font-weight="bold" fill="#666" text-anchor="middle" letter-spacing="4">${subtitle}</text>` : ''}
          </svg>
        `;

        await sharp(imgBuffer)
          .resize(800, 800, { fit: 'cover' })
          .composite([{
            input: Buffer.from(svgLabel),
            top: 0,
            left: 0
          }])
          .webp({ quality: 85 })
          .toFile(filePath);
      }
    } catch (err) {
      console.error(`Failed to process ${product}:`, err);
    }
  }
  console.log('All real images processed successfully!');
}

generateImages().catch(console.error);
