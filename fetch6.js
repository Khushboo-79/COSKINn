const fs = require('fs');
fetch('https://www.dotandkey.com/')
  .then(res => res.text())
  .then(html => {
    const urls = html.match(/(?:https:)?\/\/www\.dotandkey\.com\/cdn\/shop\/files\/[^"'\?]+\.(?:jpg|jpeg|png|webp)/g) || [];
    const unique = [...new Set(urls)];
    console.log(unique.slice(0, 50).join('\n'));
  });
