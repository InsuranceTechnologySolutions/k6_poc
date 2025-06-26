import { chromium } from 'playwright';
import { execSync } from 'child_process';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const profile = process.env.profile || 'smoke';
console.log(`\n🧪 Using test profile: "${profile}"`);

(async () => {
  // Launch a headless Chromium browser
  const browser = await chromium.launch({ headless: true });

  // Create a new browser context with specific settings
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 720 },
    locale: 'en-US',
  });

  // Open a new page in the browser context
  const page = await context.newPage();

  try {
    // Log in to Etuity Core
    await page.goto('https://test-norclub.etuity.no');
    await page.waitForSelector('a.btn-login_provider');
    await page.click('text=External Virtuoso');
    await page.fill('#username', 'core.counterparty@instechas.onmicrosoft.com');
    await page.fill('#password', process.env.LOGIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(5000);

    // Retrieve cookies from the context
    const cookies = await context.cookies();
    
    // Filter and format specific cookies for use in K6 tests
    const cookieHeader = cookies
      .filter(c =>
        ['__etuity-core-frontend-web', '.AspNetCore.Antiforgery.7tJ00O3BQpc'].includes(c.name)
      )
      .map(c => `${c.name}=${c.value}`)
      .join('; ');

    // Define the directory containing K6 test files
    const testDir = join(__dirname, 'tests');
    
    // Read all test files ending with .test.js in the specified directory
    const testFiles = readdirSync(testDir).filter(f => f.endsWith('.test.js'));
  
    // Loop through each test file and execute it
    for (const file of testFiles) {
      const fullPath = join(testDir, file);
      console.log(`\n🚀 Running: ${file}`);
      try {
        // Run the K6 test using execSync, passing the cookie header as an environment variable
        execSync(`k6 run "${fullPath}" --env ENVIRONMENT=test --env TEST=bff`, {
          stdio: 'inherit',
          env: {
            ...process.env,
            COOKIE_HEADER: cookieHeader, // Pass the cookie header to the test
          },
        });
      } catch (err) {
        // Log an error if the test fails to run
        console.error(`❌ Failed to run test: ${file}`);
      }
    }

  } catch (err) {
    // Log an error if any part of the process fails
    console.error('❌ Failed to run bff test:', err.message);
    process.exit(1); // Exit the process with an error code
  } finally {
    // Ensure the browser is closed after all tests are finished
    await browser.close();
  }
})();