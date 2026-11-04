// scripts/capture-hero-screenshot.mjs
import { spawn } from 'child_process';
import fs from 'fs';

async function capture(outputFilename, width = 1440, height = 900) {
  const chromeProcess = spawn('google-chrome', [
    '--headless=new',
    '--remote-debugging-port=9226',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-extensions',
    `--window-size=${width},${height}`,
    'http://localhost:3000/'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9226/json/list');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page');

    if (!pageTab || !pageTab.webSocketDebuggerUrl) {
      throw new Error('No page tab found');
    }

    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
        resolve();
      };
      ws.onerror = reject;
    });

    // Skip intro by setting sessionStorage and navigate to clean home
    ws.send(JSON.stringify({
      id: 3,
      method: 'Runtime.evaluate',
      params: {
        expression: "sessionStorage.setItem('ecocycle_living_intro_v3', 'true'); window.location.href = 'http://localhost:3000/';"
      }
    }));

    // Wait 3.5s for page reload and animations
    await new Promise(r => setTimeout(r, 3500));

    // Capture screenshot
    const screenshotPromise = new Promise((resolve) => {
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 10) {
          ws.removeEventListener('message', handler);
          resolve(msg.result.data);
        }
      };
      ws.addEventListener('message', handler);
    });

    ws.send(JSON.stringify({
      id: 10,
      method: 'Page.captureScreenshot',
      params: { format: 'png' }
    }));

    const base64Data = await screenshotPromise;
    fs.writeFileSync(outputFilename, Buffer.from(base64Data, 'base64'));
    console.log(`Screenshot saved to ${outputFilename}`);

    ws.close();
  } finally {
    chromeProcess.kill();
  }
}

async function main() {
  await capture('hero-redesigned-desktop-1440.png', 1440, 950);
  await new Promise(r => setTimeout(r, 1000));
  await capture('hero-redesigned-mobile-390.png', 390, 844);
  await new Promise(r => setTimeout(r, 1000));
  await capture('hero-redesigned-mobile-360.png', 360, 740);
}

main().catch(console.error);
