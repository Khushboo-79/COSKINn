const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const imagesDir = path.join(srcDir, 'assets', 'images');

// Helper to get all files recursively
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

async function convertImages() {
  console.log('Finding PNG files...');
  if (!fs.existsSync(imagesDir)) {
      console.log('Images directory not found.');
      return;
  }
  
  const files = fs.readdirSync(imagesDir);
  const pngFiles = files.filter(file => file.endsWith('.png'));
  
  console.log(`Found ${pngFiles.length} PNG files. Converting to WebP...`);
  
  const conversionPromises = pngFiles.map(async (file) => {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(imagesDir, file.replace('.png', '.webp'));
    
    try {
      const info = await sharp(inputPath).webp({ quality: 90, lossless: false }).toFile(outputPath);
      console.log(`Converted ${file} to WebP -> size: ${(info.size / 1024).toFixed(2)} KB`);
      // Delete original png
      fs.unlinkSync(inputPath);
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  });
  
  await Promise.all(conversionPromises);
  console.log('Image conversion complete!');
}

function updateCodeReferences() {
  console.log('Updating code references...');
  const allFiles = getAllFiles(srcDir);
  const jsFiles = allFiles.filter(file => file.endsWith('.js') || file.endsWith('.jsx'));
  
  let modifiedCount = 0;
  
  jsFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('.png')) {
      // Replace all occurrences of .png with .webp
      content = content.replace(/\.png/g, '.webp');
      fs.writeFileSync(file, content, 'utf8');
      modifiedCount++;
      console.log(`Updated references in: ${path.basename(file)}`);
    }
  });
  
  console.log(`Updated references in ${modifiedCount} files.`);
}

async function run() {
  await convertImages();
  updateCodeReferences();
  console.log('All done!');
}

run();
