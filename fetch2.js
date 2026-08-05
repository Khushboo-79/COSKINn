const fs = require('fs');
fetch('https://www.dotandkey.com/collections/all')
  .then(res => res.text())
  .then(html => {
    // Look for window.ShopifyAnalytics.meta.products or similar JSON
    // Or just look for "src":"\/\/cdn.shopify.com\/s\/files\/..." in the HTML
    const regex = /"src":"\\\/\\\/cdn\.shopify\.com\\\/s\\\/files\\\/([^"]+\.(?:jpg|jpeg|png|webp))"/g;
    let match;
    const urls = [];
    while ((match = regex.exec(html)) !== null) {
      urls.push(`https://cdn.shopify.com/s/files/${match[1].replace(/\\\//g, '/')}`);
    }
    console.log([...new Set(urls)].slice(0, 30).join('\n'));
  })
  .catch(console.error);
