const fs = require('fs');
fetch('https://www.dotandkey.com/collections/all')
  .then(res => res.text())
  .then(html => {
    const products = [];
    const regex = /<img[^>]+src="([^">]+cdn\.shopify\.com\/s\/files\/[^">]+)"[^>]*alt="([^">]+)"/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      if (match[2] && match[2].length > 5 && !match[2].toLowerCase().includes('icon')) {
        products.push({ url: match[1], alt: match[2] });
      }
    }
    const unique = [];
    const seen = new Set();
    for (let p of products) {
      if (!seen.has(p.url)) {
        seen.add(p.url);
        unique.push(p);
      }
    }
    console.log(JSON.stringify(unique.slice(0, 30), null, 2));
  })
  .catch(console.error);
