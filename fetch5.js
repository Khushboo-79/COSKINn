const fs = require('fs');
fetch('https://www.dotandkey.com/sitemap_products_1.xml')
  .then(res => res.text())
  .then(xml => {
    const urls = xml.match(/<image:loc>(.*?)<\/image:loc>/g) || [];
    const images = urls.map(u => u.replace('<image:loc>', '').replace('</image:loc>', ''));
    console.log(images.slice(0, 30).join('\n'));
  })
  .catch(console.error);
