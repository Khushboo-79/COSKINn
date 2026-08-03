const fs = require('fs');
fetch('https://www.dotandkey.com/')
  .then(res => res.text())
  .then(html => {
    const urls = html.match(/(?:https:)?\/\/www\.dotandkey\.com\/cdn\/shop\/files\/[^"'\?]+\.(?:jpg|jpeg|png|webp)/g) || [];
    const unique = [...new Set(urls)];
    const slides = unique.filter(u => u.toLowerCase().includes('desk') || u.toLowerCase().includes('banner') || u.toLowerCase().includes('artboard'));
    console.log(slides.slice(0, 5).join('\n'));
  });
