const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'common', 'Footer.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

content = content.replace(/text-\[\#2B5968\]/g, "text-theme-dark");
content = content.replace(/border-\[\#2B5968\]/g, "border-theme-dark");
content = content.replace(/bg-\[\#2B5968\]/g, "bg-theme-dark");
content = content.replace(/text-\[\#FF2D7A\]/g, "text-theme-primary");
content = content.replace(/bg-\[\#FF2D7A\]/g, "bg-theme-primary");
content = content.replace(/focus:border-\[\#FF2D7A\]/g, "focus:border-theme-primary");
content = content.replace(/focus:ring-\[\#FF2D7A\]/g, "focus:ring-theme-primary");
content = content.replace(/hover:bg-\[\#E01E63\]/g, "hover:bg-theme-secondary");
content = content.replace(/hover:text-\[\#FF2D7A\]/g, "hover:text-theme-primary");
content = content.replace(/text-\[\#FF0069\]/g, "text-theme-primary");
content = content.replace(/bg-\[\#FFF3F7\]/g, "bg-theme-background");
content = content.replace(/bg-\[\#FFE8F1\]/g, "bg-theme-surface");
content = content.replace(/bg-\[\#FFDCEB\]/g, "bg-theme-surface");

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Replaced colors successfully.');
