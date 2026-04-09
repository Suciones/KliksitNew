/**
 * Prerender script for Kliksit SPA
 * Generates static HTML for each route so search engine crawlers
 * can index the site without executing JavaScript.
 *
 * Usage:
 *   npm run build:prerender
 *
 * Prerequisites:
 *   npm install --save-dev puppeteer
 */

import { execSync, spawn } from 'child_process';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '..', 'dist');
const PORT = 4173;
const BASE = `http://localhost:${PORT}`;

const ROUTES = [
  '/',
  '/about',
  '/services',
  '/blog',
  '/blog/ai-agents-vs-rule-based-automation-business-growth-2026',
  '/contact',
];

async function prerender() {
  console.log('Building project...');
  execSync('npm run build', { stdio: 'inherit', cwd: resolve(__dirname, '..') });

  console.log('Starting preview server...');
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
    cwd: resolve(__dirname, '..'),
    stdio: 'pipe',
    shell: true,
  });

  // Wait for server to start
  await new Promise((r) => setTimeout(r, 3000));

  let puppeteer;
  try {
    puppeteer = await import('puppeteer');
  } catch {
    console.error('puppeteer not installed. Run: npm install --save-dev puppeteer');
    server.kill();
    process.exit(1);
  }

  const browser = await puppeteer.default.launch({ headless: true });

  for (const route of ROUTES) {
    console.log(`Prerendering: ${route}`);
    const page = await browser.newPage();
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for React to finish rendering
    await page.waitForSelector('#root > *', { timeout: 10000 });
    await new Promise((r) => setTimeout(r, 1000));

    const html = await page.content();

    // Write to dist folder
    const filePath = route === '/'
      ? resolve(DIST, 'index.html')
      : resolve(DIST, route.slice(1), 'index.html');

    const dir = dirname(filePath);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(filePath, html, 'utf-8');

    console.log(`  -> ${filePath}`);
    await page.close();
  }

  await browser.close();
  server.kill();
  console.log('Prerendering complete!');
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
