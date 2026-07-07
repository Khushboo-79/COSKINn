import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`[BROWSER ${msg.type().toUpperCase()}] ${msg.text()}`);
    }
  });

  page.on('pageerror', error => {
    console.log(`[PAGE ERROR] ${error.message}`);
  });

  try {
    // Go to the page first so we can set localStorage
    try { await page.goto("http://localhost:5173/login", { waitUntil: "domcontentloaded" }); } catch(e){}
    
    // Inject mock auth state
    await page.evaluate(() => {
      localStorage.setItem('internal_panel_token', 'mock-token');
      localStorage.setItem('internal_panel_user', JSON.stringify({
        id: '123',
        email: 'admin@coskinn.com',
        roles: ['SUPER_ADMIN']
      }));
    });

    // Navigate to admin now that we are logged in
    await page.goto('http://localhost:5173/admin', { waitUntil: 'networkidle2', timeout: 15000 });
    console.log('Page loaded successfully.');
    console.log("Body: " + await page.evaluate(() => document.body.innerHTML));
    
  } catch (e) {
    console.log(`[NAVIGATION ERROR] ${e.message}`);
  }

  await browser.close();
})();
