const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'assets', 'images');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 

  const pngFiles = files.filter(file => file.endsWith('.png'));

  console.log(`Found ${pngFiles.length} PNG files. Converting to WebP...`);

  pngFiles.forEach(function (file) {
    const inputPath = path.join(directoryPath, file);
    const outputPath = path.join(directoryPath, file.replace('.png', '.webp'));

    sharp(inputPath)
      .webp({ quality: 95, lossless: false })
      .toFile(outputPath, (err, info) => {
        if (err) {
          console.error(`Error converting ${file}:`, err);
        } else {
          console.log(`Converted ${file} to WebP -> size: ${(info.size / 1024).toFixed(2)} KB`);
        }
      });
  });
});
