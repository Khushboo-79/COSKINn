const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      // Replace hover:bg-black hover:text-white with hover:bg-theme-primary hover:text-white
      content = content.replace(/hover:bg-black hover:text-white/g, 'hover:bg-theme-primary hover:text-white');
      
      // Replace bg-black/90 text-white with bg-theme-primary text-white (like for badges)
      content = content.replace(/bg-black\/90 backdrop-blur-md text-white/g, 'bg-theme-primary backdrop-blur-md text-white');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(srcDir);
console.log('Button colors updated!');
