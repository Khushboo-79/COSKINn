const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, 'src', 'assets', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const products = [
  'sunscreen_spf50',
  'body_sunscreen',
  'tinted_sunscreen',
  'gentle_cleanser',
  'cleansing_balm',
  'lip_balm',
  'hand_cream',
  'pocket_perfume',
  'face_mist',
  'overnight_mask',
  'under_eye_patches',
  'daily_moisturiser',
  'setting_spray',
  'niacinamide_serum'
];

const variants = ['', '_side', '_back', '_lifestyle'];

async function generateImages() {
  console.log('Generating WebP images...');
  for (const product of products) {
    for (const variant of variants) {
      const fileName = `${product}${variant}.webp`;
      const filePath = path.join(targetDir, fileName);

      // Create a premium looking SVG placeholder
      const title = product.replace(/_/g, ' ').toUpperCase();
      const subtitle = variant === '' ? 'FRONT VIEW' : variant.replace('_', '').toUpperCase();
      
      const svg = `
        <svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FFD498;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#FF0069;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#f8f9fa;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#e9ecef;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad2)" />
          <rect x="25%" y="20%" width="50%" height="60%" rx="40" fill="url(#grad1)" opacity="0.9"/>
          
          <text x="50%" y="45%" font-family="sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">
            COSKINn
          </text>
          
          <text x="50%" y="52%" font-family="sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">
            ${title}
          </text>
          
          <text x="50%" y="60%" font-family="sans-serif" font-size="16" fill="rgba(255,255,255,0.8)" text-anchor="middle" dominant-baseline="middle">
            ${subtitle}
          </text>
        </svg>
      `;

      await sharp(Buffer.from(svg))
        .webp({ quality: 90 })
        .toFile(filePath);
    }
  }
  console.log('All images generated successfully!');
}

generateImages().catch(console.error);
