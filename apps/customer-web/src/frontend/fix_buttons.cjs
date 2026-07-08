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

      // Replace bg-black text-white with bg-theme-primary text-white
      content = content.replace(/bg-black text-white/g, 'bg-theme-primary text-white');
      
      // If the button now has bg-theme-primary, we should change hover:bg-theme-primary to hover:bg-theme-primary/90
      content = content.replace(/bg-theme-primary text-white(.*?)hover:bg-theme-primary/g, 'bg-theme-primary text-white$1hover:bg-pink-700');
      // Sometimes it's hover:bg-[#FF0069]
      content = content.replace(/bg-theme-primary text-white(.*?)hover:bg-\[#FF0069\]/g, 'bg-theme-primary text-white$1hover:bg-pink-700');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(srcDir);
console.log('Button colors updated!');
