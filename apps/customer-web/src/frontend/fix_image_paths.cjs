const fs = require('fs');
const path = require('path');

const filesToFix = [
  path.join(__dirname, 'src', 'pages', 'BestSellersPage.jsx'),
  path.join(__dirname, 'src', 'pages', 'AwardWinnersPage.jsx')
];

filesToFix.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const regex = /image:\s*['"]\/src\/assets\/images\/(.*?)['"]/g;
    const newContent = content.replace(regex, "image: new URL('../assets/images/$1', import.meta.url).href");
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Fixed paths in ${path.basename(file)}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
