const fs = require('fs');
fetch('https://www.dotandkey.com/collections/all')
  .then(res => res.text())
  .then(html => {
    // Extract high resolution product images
    const urls = html.match(/https:\/\/cdn\.shopify\.com\/s\/files\/[^\s\"'\?]+\.(?:jpg|jpeg|png|webp)/g);
    if (!urls) { console.log('No urls found'); return; }
    
    // filter for product images only (the ones inside /products/)
    const productUrls = urls.filter(u => u.includes('/products/'));
    const uniqueUrls = [...new Set(productUrls)];
    console.log(uniqueUrls.slice(0, 50).join('\n'));
  })
  .catch(console.error);
