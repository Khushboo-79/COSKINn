const fs = require('fs');
fetch('https://www.dotandkey.com/collections/all')
  .then(res => res.text())
  .then(html => {
    const urls = html.match(/https:\/\/cdn\.shopify\.com\/s\/files\/[^\s\"'\?]+\.(?:jpg|jpeg|png|webp)/g);
    if (!urls) { console.log('No urls found'); return; }
    
    // filter for product images
    const productUrls = urls.filter(u => u.includes('/files/') || u.includes('/products/'));
    const uniqueUrls = [...new Set(productUrls)].filter(u => !u.includes('icon') && !u.includes('Group') && !u.includes('star-'));
    console.log(uniqueUrls.slice(0, 50).join('\n'));
  })
  .catch(console.error);
