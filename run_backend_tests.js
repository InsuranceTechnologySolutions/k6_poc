import { readdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const testDir = join(__dirname, 'tests/backend');

const testFiles = readdirSync(testDir).filter(f => f.endsWith('.test.js'));

const profile = process.env.profile || 'smoke';
console.log(`\n🧪 Using test profile: "${profile}"`);

for (const file of testFiles) {
  const fullPath = join(testDir, file);
  console.log(`\n🚀 Running ${file}`);
  try {
    execSync(`k6 run "${fullPath}"`, {
      stdio: 'inherit',
      env: {
        ...process.env,
        profile,
      },
    });
  } catch (err) {
    console.error(`❌ Failed: ${file}`);
  }
}