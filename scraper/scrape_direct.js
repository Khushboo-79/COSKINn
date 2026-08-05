const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.setDefaultNavigationTimeout(30000);
  page.setDefaultTimeout(30000);

  console.log("Navigating directly to static preview...");
  await page.goto('https://beauty-duo-design.preview.static.emergentagent.com/', {waitUntil: 'networkidle0'});
  
  console.log("Waiting 3s for any transitions...");
  await new Promise(r => setTimeout(r, 3000));

  let content = await page.content();
  if (!content.includes('Painted like a Fairytale')) {
      console.log("Switching to Glam mode...");
      await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button, div, span'));
          const toggle = buttons.find(b => b.textContent && (b.textContent.includes('Glam') || b.textContent.includes('GLAM') || b.textContent === 'Glam'));
          if (toggle) toggle.click();
      });
      await new Promise(r => setTimeout(r, 3000));
  }

  const sectionHTML = await page.evaluate(() => {
      const allTextNodes = Array.from(document.querySelectorAll('*')).filter(el => {
          return Array.from(el.childNodes).some(node => node.nodeType === 3 && node.textContent.includes('Painted'));
      });
      if (allTextNodes.length === 0) return "Not found";
      
      let node = allTextNodes[allTextNodes.length - 1];
      let count = 0;
      while (node && node.parentElement && count < 8) {
          node = node.parentElement;
          // find the main hero container
          if (node.tagName.toLowerCase() === 'section' || node.className.includes('max-w-') || node.className.includes('flex-row') || node.className.includes('hero')) {
              break;
          }
          count++;
      }
      return node ? node.outerHTML : "No section found";
  });

  fs.writeFileSync('C:/Users/lenovo/.gemini/antigravity-ide/brain/b91bd31f-c6b4-4a16-aae9-8e7d5fc22a7d/glam_section_direct.html', sectionHTML);
  console.log("Dumped glam_section_direct.html, length:", sectionHTML.length);
  await browser.close();
})();
