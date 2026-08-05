import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

  console.log('Navigating to localhost:5173...');
  await page.goto('http://localhost:5173');
  console.log('Waiting for load...');
  await page.waitForTimeout(2000);

  console.log('Clicking Shop...');
  await page.click('text=Shop');
  
  await page.waitForTimeout(2000);
  
  console.log('Current URL:', page.url());
  
  const content = await page.content();
  console.log('Content length:', content.length);
  
  await browser.close();
})();
