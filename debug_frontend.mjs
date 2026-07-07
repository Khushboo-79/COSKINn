import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`[BROWSER ERROR] ${msg.text()}`);
    }
  });

  page.on('pageerror', error => {
    console.log(`[PAGE ERROR] ${error.message}`);
  });

  try {
    await page.goto('http://localhost:5173/admin', { waitUntil: 'networkidle2', timeout: 15000 });
    console.log("Body: " + await page.evaluate(() => document.body.innerHTML));
  } catch (e) {
    console.log(`[NAVIGATION ERROR] ${e.message}`);
  }

  await browser.close();
})();
