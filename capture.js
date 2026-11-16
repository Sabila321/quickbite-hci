const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function run() {
  console.log('Launching browser to capture screenshots and PDF...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 950 });

  const indexPath = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  console.log('Navigating to:', indexPath);
  await page.goto(indexPath, { waitUntil: 'networkidle0' });

  const screenshotsDir = path.resolve(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // Helper for taking full screen shots
  const takeScreenShot = async (screenId, setupFn, filename) => {
    console.log(`Capturing ${filename}...`);
    if (setupFn) {
      await page.evaluate(setupFn);
      await new Promise(r => setTimeout(r, 600));
    }
    await page.screenshot({
      path: path.join(screenshotsDir, filename),
      fullPage: false
    });
  };

  // 1. Screen 1: Home
  await takeScreenShot('screen-home', () => app.showScreen('screen-home'), 'screen1_home_discovery.png');

  // 2. Screen 2: Restaurant Menu
  await takeScreenShot('screen-menu', () => app.openRestaurantMenu('rest_1'), 'screen2_restaurant_menu.png');

  // 3. Screen 3: Cart Review
  await takeScreenShot('screen-cart', () => app.showScreen('screen-cart'), 'screen3_cart_review.png');

  // 4. Screen 4: Checkout
  await takeScreenShot('screen-checkout', () => app.showScreen('screen-checkout'), 'screen4_checkout_payment.png');

  // 5. Screen 5: Tracking
  await takeScreenShot('screen-tracking', () => {
    app.trackingStage = 2;
    app.updateTrackingUI();
    app.showScreen('screen-tracking');
  }, 'screen5_live_order_tracking.png');

  // 6. Screen 6: Profile & History
  await takeScreenShot('screen-profile', () => app.showScreen('screen-profile'), 'screen6_profile_history.png');

  // 7. Generate PDF Report from report.html
  console.log('Generating PDF report...');
  const reportPath = 'file:///' + path.resolve(__dirname, 'report.html').replace(/\\/g, '/');
  await page.goto(reportPath, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: path.resolve(__dirname, 'report.pdf'),
    format: 'A4',
    printBackground: true,
    margin: {
      top: '1cm',
      bottom: '1cm',
      left: '1.2cm',
      right: '1.2cm'
    }
  });

  console.log('All screenshots and report.pdf generated successfully!');
  await browser.close();
}

run().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
