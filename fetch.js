const fs = require('fs');
fetch('https://www.dotandkey.com/collections/all')
  .then(res => res.text())
  .then(html => {
    // Extract high resolution product images
    const urls = html.match(/https:\/\/cdn\.shopify\.com\/s\/files\/[^\s\"'\?]+/g);
    if (!urls) { console.log('No urls found'); return; }
    
    // filter for product images only (the ones inside /products/)
    const productUrls = urls.filter(u => (u.includes('/products/') || u.includes('/files/')) && (u.endsWith('.jpg') || u.endsWith('.png') || u.endsWith('.webp')));
    const uniqueUrls = [...new Set(productUrls)].filter(u => !u.includes('icon') && !u.includes('Group') && !u.includes('image_9'));
    console.log(uniqueUrls.slice(0, 100).join('\n'));
  })
  .catch(console.error);
