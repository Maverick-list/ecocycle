// scripts/capture-faq-audit.mjs
import { spawn } from 'child_process';
import fs from 'fs';

async function captureViewport(url, outputFilename, evalCode = null, width = 1440, height = 950) {
  const chromeProcess = spawn('google-chrome', [
    '--headless=new',
    '--remote-debugging-port=9240',
    '--no-sandbox',
    '--disable-gpu',
    `--window-size=${width},${height}`,
    url
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9240/json/list');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page');
    if (!pageTab) throw new Error('No page tab');

    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

    await new Promise((resolve) => {
      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
        resolve();
      };
    });

    const evalPromise = (expr) => new Promise((resolve) => {
      const id = Math.floor(Math.random() * 100000);
      const handler = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === id) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method: 'Runtime.evaluate', params: { expression: expr, returnByValue: true } }));
    });

    // Skip intro
    await evalPromise("sessionStorage.setItem('ecocycle_living_intro_v3', 'true');");
    await new Promise(r => setTimeout(r, 1000));

    if (evalCode) {
      await evalPromise(evalCode);
      await new Promise(r => setTimeout(r, 1200));
    }

    const screenshotPromise = new Promise((resolve) => {
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 99) {
          ws.removeEventListener('message', handler);
          resolve(msg.result.data);
        }
      };
      ws.addEventListener('message', handler);
    });

    ws.send(JSON.stringify({
      id: 99,
      method: 'Page.captureScreenshot',
      params: { format: 'png' }
    }));

    const base64Data = await screenshotPromise;
    fs.writeFileSync(outputFilename, Buffer.from(base64Data, 'base64'));
    console.log(`Saved screenshot: ${outputFilename}`);

    ws.close();
  } finally {
    chromeProcess.kill();
  }
}

async function run() {
  // 1. FAQ in Light Mode
  await captureViewport(
    'http://localhost:3000/',
    'faq-audit-light.png',
    `(() => {
      const h2 = Array.from(document.querySelectorAll('h2')).find(el => el.textContent.includes('Pertanyaan Umum'));
      if (h2) {
        h2.scrollIntoView({ block: 'center' });
      }
    })()`
  );

  await new Promise(r => setTimeout(r, 1000));

  // 2. FAQ in Dark Mode
  await captureViewport(
    'http://localhost:3000/',
    'faq-audit-dark.png',
    `(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      const h2 = Array.from(document.querySelectorAll('h2')).find(el => el.textContent.includes('Pertanyaan Umum'));
      if (h2) {
        h2.scrollIntoView({ block: 'center' });
      }
    })()`
  );

  await new Promise(r => setTimeout(r, 1000));

  // 3. Bento section in Light Mode
  await captureViewport(
    'http://localhost:3000/',
    'bento-audit-light.png',
    `(() => {
      const h2 = Array.from(document.querySelectorAll('h2')).find(el => el.textContent.includes('Pilar Layanan Digital'));
      if (h2) {
        h2.scrollIntoView({ block: 'start' });
      }
    })()`
  );
}

run().catch(console.error);
