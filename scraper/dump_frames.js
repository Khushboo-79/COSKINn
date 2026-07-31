const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
      args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
  });
  const page = await browser.newPage();
  
  await page.goto('https://beauty-duo-design.preview.emergentagent.com/', {waitUntil: 'networkidle2'});
  await new Promise(r => setTimeout(r, 5000));

  function printFrame(frame, indent) {
      console.log(indent + "Frame: " + frame.url());
      for (let child of frame.childFrames()) {
          printFrame(child, indent + "  ");
      }
  }
  printFrame(page.mainFrame(), "");

  await browser.close();
})();
