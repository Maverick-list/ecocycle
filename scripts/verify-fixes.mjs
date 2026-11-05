import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const artifactDir = '/home/firza-ilmi/.gemini/antigravity/brain/89c3e5c2-58b5-4fa3-8e9a-9c5da538f0b5';

function cdpSend(ws, id, method, params = {}) {
  return new Promise((resolve, reject) => {
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function runVerification() {
  const chromeProcess = spawn('google-chrome', [
    '--headless=new',
    '--remote-debugging-port=9227',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-extensions',
    '--window-size=1440,900',
    'http://localhost:3000/'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9227/json/list');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page');

    if (!pageTab || !pageTab.webSocketDebuggerUrl) {
      throw new Error('No page tab found');
    }

    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let msgId = 1;
    await cdpSend(ws, msgId++, 'Page.enable');
    await cdpSend(ws, msgId++, 'Runtime.enable');

    // Skip intro and stay in dark mode or auto mode
    await cdpSend(ws, msgId++, 'Runtime.evaluate', {
      expression: "sessionStorage.setItem('ecocycle_living_intro_v3', 'true'); window.location.href = 'http://localhost:3000/';"
    });
    await new Promise(r => setTimeout(r, 3000));

    // 1. Capture Hero Section
    console.log('1. Capturing Hero Section...');
    let res = await cdpSend(ws, msgId++, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'verify-01-hero-gradient.png'), Buffer.from(res.data, 'base64'));

    // 2. Click Explore ECOCYCLE button and verify navigation to /masuk
    console.log('2. Clicking Explore ECOCYCLE button...');
    await cdpSend(ws, msgId++, 'Runtime.evaluate', {
      expression: `
        (() => {
          const btns = Array.from(document.querySelectorAll('button'));
          const btn = btns.find(b => b.textContent && b.textContent.includes('Explore ECOCYCLE'));
          if (btn) { btn.click(); return 'CLICKED'; }
          return 'NOT_FOUND';
        })()
      `
    });
    await new Promise(r => setTimeout(r, 2000));

    // Check location
    const urlRes = await cdpSend(ws, msgId++, 'Runtime.evaluate', { expression: 'window.location.pathname' });
    console.log('Navigated to:', urlRes.result.value);

    res = await cdpSend(ws, msgId++, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'verify-02-auth-after-explore.png'), Buffer.from(res.data, 'base64'));

    // 3. Capture Full /masuk page
    console.log('3. Capturing /masuk page...');
    await cdpSend(ws, msgId++, 'Runtime.evaluate', { expression: "window.location.href = 'http://localhost:3000/masuk';" });
    await new Promise(r => setTimeout(r, 2500));
    res = await cdpSend(ws, msgId++, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'verify-03-signin-hooks.png'), Buffer.from(res.data, 'base64'));

    // 4. Capture /daftar page
    console.log('4. Capturing /daftar page...');
    await cdpSend(ws, msgId++, 'Runtime.evaluate', { expression: "window.location.href = 'http://localhost:3000/daftar';" });
    await new Promise(r => setTimeout(r, 2500));
    res = await cdpSend(ws, msgId++, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'verify-04-signup-hooks.png'), Buffer.from(res.data, 'base64'));

    // 5. Capture /setor-sampah page
    console.log('5. Capturing /setor-sampah page...');
    await cdpSend(ws, msgId++, 'Runtime.evaluate', { expression: "window.location.href = 'http://localhost:3000/setor-sampah';" });
    await new Promise(r => setTimeout(r, 2500));
    res = await cdpSend(ws, msgId++, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'verify-05-setor-sampah-spacious.png'), Buffer.from(res.data, 'base64'));

    // 6. Test Waste Deposit Modal
    console.log('6. Opening Waste Deposit Modal from navbar...');
    await cdpSend(ws, msgId++, 'Runtime.evaluate', {
      expression: `
        (() => {
          const btns = Array.from(document.querySelectorAll('button'));
          const btn = btns.find(b => b.textContent && b.textContent.includes('Setor Sampah'));
          if (btn) { btn.click(); return 'CLICKED'; }
          return 'NOT_FOUND';
        })()
      `
    });
    await new Promise(r => setTimeout(r, 1500));
    res = await cdpSend(ws, msgId++, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'verify-06-modal-spacious.png'), Buffer.from(res.data, 'base64'));

    console.log('All verification captures saved successfully!');
    ws.close();
  } finally {
    chromeProcess.kill();
  }
}

runVerification().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
