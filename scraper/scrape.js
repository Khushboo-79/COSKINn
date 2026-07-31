const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.setDefaultNavigationTimeout(30000);
  page.setDefaultTimeout(30000);

  console.log("Navigating...");
  try {
      await page.goto('https://beauty-duo-design.preview.emergentagent.com/', {waitUntil: 'networkidle2'});
  } catch (e) {
      console.log("Navigation timeout, proceeding anyway...");
  }
  
  console.log("Waiting 5s for any transitions...");
  await new Promise(r => setTimeout(r, 5000));

  // Function to search all frames
  async function extractGlamSection() {
      for (const frame of page.frames()) {
          try {
              let content = await frame.content();
              if (content.includes('Painted like a Fairytale')) {
                  console.log("Found in frame:", frame.url());
                  const sectionHTML = await frame.evaluate(() => {
                      const allTextNodes = Array.from(document.querySelectorAll('*')).filter(el => {
                          return Array.from(el.childNodes).some(node => node.nodeType === 3 && node.textContent.includes('Painted'));
                      });
                      if (allTextNodes.length === 0) return "Not found";
                      
                      let node = allTextNodes[allTextNodes.length - 1];
                      let count = 0;
                      while (node && node.parentElement && count < 8) {
                          node = node.parentElement;
                          if (node.tagName.toLowerCase() === 'section' || node.className.includes('max-w-') || node.className.includes('flex-row') || node.className.includes('hero')) {
                              break;
                          }
                          count++;
                      }
                      return node ? node.outerHTML : "No section found";
                  });
                  return sectionHTML;
              }
          } catch (e) {
              // Ignore cross-origin frame errors if any
          }
      }
      return null;
  }

  let html = await extractGlamSection();
  if (!html) {
      console.log("Switching to Glam mode...");
      // Click any Glam toggle across all frames
      for (const frame of page.frames()) {
          try {
              await frame.evaluate(() => {
                  const buttons = Array.from(document.querySelectorAll('button, div, span'));
                  const toggle = buttons.find(b => b.textContent && (b.textContent.includes('Glam') || b.textContent.includes('GLAM')));
                  if (toggle) toggle.click();
              });
          } catch(e) {}
      }
      await new Promise(r => setTimeout(r, 3000));
      html = await extractGlamSection();
  }

  if (html) {
      fs.writeFileSync('C:/Users/lenovo/.gemini/antigravity-ide/brain/b91bd31f-c6b4-4a16-aae9-8e7d5fc22a7d/glam_section.html', html);
      console.log("Dumped glam_section.html, length:", html.length);
  } else {
      console.log("Could not find the section.");
  }
  await browser.close();
})();
