const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, 'src', 'images', 'Logo', 'logo.webp');
const outputPath = path.join(__dirname, 'src', 'images', 'Logo', 'logo.png');

sharp(inputPath)
  .png()
  .toFile(outputPath)
  .then(() => {
    console.log('Conversion successful: logo.png created.');
  })
  .catch(err => {
    console.error('Error during conversion:', err);
  });
