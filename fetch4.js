const fs = require('fs');
fetch('https://www.dotandkey.com/products/vitamin-c-e-super-bright-sunscreen-spf-50')
  .then(res => res.text())
  .then(html => {
    // Find shopify product json
    const productMatch = html.match(/var meta = (\{.*\});/);
    if (productMatch) {
      console.log(productMatch[1].substring(0, 500));
    } else {
      console.log("No meta found");
      const imgMatch = html.match(/https:\/\/cdn\.shopify\.com\/s\/files\/[^\s"']+/g);
      const unique = [...new Set(imgMatch)].filter(u => u.includes('products') && !u.includes('100x') && !u.includes('small'));
      console.log("Images:");
      console.log(unique.join('\n'));
    }
  });
