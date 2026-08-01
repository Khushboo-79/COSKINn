const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
      args: [
          '--disable-web-security',
          '--disable-features=IsolateOrigins,site-per-process'
      ]
  });
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

  async function getFullHTML() {
      let full = "";
      for (const frame of page.frames()) {
          try {
              full += "\n<!-- FRAME " + frame.url() + " -->\n";
              full += await frame.content();
          } catch(e) {}
      }
      return full;
  }
  
  let html = await getFullHTML();
  
  if (!html.includes('Painted like a Fairytale')) {
      console.log("Switching to Glam mode...");
      for (const frame of page.frames()) {
          try {
              await frame.evaluate(() => {
                  const buttons = Array.from(document.querySelectorAll('button, div, span'));
                  const toggle = buttons.find(b => b.textContent && (b.textContent.includes('Glam') || b.textContent.includes('GLAM') || b.textContent === 'Glam'));
                  if (toggle) toggle.click();
              });
          } catch(e) {}
      }
      await new Promise(r => setTimeout(r, 3000));
      html = await getFullHTML();
  }

  fs.writeFileSync('C:/Users/lenovo/.gemini/antigravity-ide/brain/b91bd31f-c6b4-4a16-aae9-8e7d5fc22a7d/full_page.html', html);
  console.log("Dumped full_page.html, length:", html.length);
  await browser.close();
})();
