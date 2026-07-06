const fs = require('fs');
const path = require('path');

const srcDirectory = path.join(__dirname, 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDirectory);
let replacedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('.png')) {
    // Only replace if we're sure it's an import or source
    const newContent = content.replace(/\.png/g, '.webp');
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${path.basename(file)}`);
    replacedCount++;
  }
});

console.log(`Updated ${replacedCount} files.`);
