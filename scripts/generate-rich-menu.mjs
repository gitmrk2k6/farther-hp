import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 2500, height: 1686 });
await page.goto('file://' + path.join(__dirname, 'rich-menu.html'));
await page.screenshot({
  path: path.join(__dirname, '..', 'rich-menu.png'),
  fullPage: false,
});
await browser.close();
console.log('✅ リッチメニュー画像を生成しました: rich-menu.png');
