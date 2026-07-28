const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'common', 'ProductCard.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

content = content.replace(/text-\[\#FF2D7A\]/g, "text-theme-primary");
content = content.replace(/fill-\[\#FF2D7A\]/g, "fill-theme-primary");
content = content.replace(/bg-\[\#FF2D7A\]/g, "bg-theme-primary");
content = content.replace(/from-\[\#FF2D7A\]/g, "from-theme-primary");
content = content.replace(/to-\[\#FF5E95\]/g, "to-theme-accent");
content = content.replace(/text-\[\#1B1B1B\]/g, "text-theme-dark");

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Replaced colors in ProductCard successfully.');
