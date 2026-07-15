const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = 'C:/Users/Reshma Kushwaha/.gemini/antigravity-ide/brain/eb8c24d6-0120-4060-b6ad-b049dc457978';
const destDir = 'c:/Users/Reshma Kushwaha/OneDrive/Desktop/COSKINn/apps/customer-web/src/frontend/src/assets/images';

const filesToProcess = {
  'hydration_hero_1784052691594.png': 'hydration_hero.webp',
  'brightening_hero_1784052701091.png': 'brightening_hero.webp',
  'repair_hero_1784052711054.png': 'repair_hero.webp',
  'barrier_hero_1784052721091.png': 'barrier_hero.webp',
  'sun_hero_1784052735199.png': 'sun_hero.webp',
  'sensitive_hero_1784052747110.png': 'sensitive_hero.webp',
  'dry_hero_1784052756653.png': 'dry_hero.webp',
  'oily_hero_1784052769046.png': 'oily_hero.webp'
};

async function processImages() {
  for (const [source, target] of Object.entries(filesToProcess)) {
    const srcPath = path.join(sourceDir, source);
    const destPath = path.join(destDir, target);
    
    if (fs.existsSync(srcPath)) {
      await sharp(srcPath).webp().toFile(destPath);
      console.log(`Processed ${target}`);
    } else {
      console.error(`File not found: ${srcPath}`);
    }
  }
}

processImages();
