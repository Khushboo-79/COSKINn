const fs = require('fs');
fetch('https://www.dotandkey.com/products/vitamin-c-e-super-bright-sunscreen-spf-50')
  .then(res => res.text())
  .then(html => {
    // Find all images in the HTML
    const urls = html.match(/https:\/\/cdn\.shopify\.com\/s\/files\/[^"'?]+\.(?:jpg|jpeg|png|webp)/g);
    const unique = [...new Set(urls)];
    console.log("Product 1:", unique.filter(u => u.includes('products') || u.includes('files')).slice(0, 5));
  });

fetch('https://www.dotandkey.com/products/watermelon-super-glow-matte-face-cream')
  .then(res => res.text())
  .then(html => {
    const urls = html.match(/https:\/\/cdn\.shopify\.com\/s\/files\/[^"'?]+\.(?:jpg|jpeg|png|webp)/g);
    const unique = [...new Set(urls)];
    console.log("Product 2:", unique.filter(u => u.includes('products') || u.includes('files')).slice(0, 5));
  });
