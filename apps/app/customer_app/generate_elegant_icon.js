const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, 'src', 'images', 'Logo', 'logo.webp');
const outputPath = path.join(__dirname, 'src', 'images', 'Logo', 'logo_padded.png');

// A standard high-res icon size is 1024x1024. 
// We'll resize the logo to be smaller (600x600) so it has plenty of padding around the edges
sharp(inputPath)
  .resize({
    width: 600,
    height: 600,
    fit: 'contain',
    background: { r: 255, g: 255, b: 255, alpha: 0 } 
  })
  .extend({
    top: 212,
    bottom: 212,
    left: 212,
    right: 212,
    background: { r: 255, g: 255, b: 255, alpha: 1 } // Solid white background for elegance
  })
  .toFile(outputPath)
  .then(() => {
    console.log('Elegant padded icon created successfully!');
  })
  .catch(err => {
    console.error('Error creating icon:', err);
  });
