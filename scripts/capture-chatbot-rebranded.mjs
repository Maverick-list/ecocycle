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

async function captureChatbot() {
  const chromeProcess = spawn('google-chrome', [
    '--headless=new',
    '--remote-debugging-port=9228',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-extensions',
    '--window-size=1440,900',
    'http://localhost:3000/'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9228/json/list');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page');

    if (!pageTab || !pageTab.webSocketDebuggerUrl) throw new Error('No tab');

    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let msgId = 1;
    await cdpSend(ws, msgId++, 'Page.enable');
    await cdpSend(ws, msgId++, 'Runtime.enable');

    // Skip intro
    await cdpSend(ws, msgId++, 'Runtime.evaluate', {
      expression: "sessionStorage.setItem('ecocycle_living_intro_v3', 'true'); window.location.href = 'http://localhost:3000/';"
    });
    await new Promise(r => setTimeout(r, 3000));

    // Open chat
    console.log('Opening chat...');
    await cdpSend(ws, msgId++, 'Runtime.evaluate', {
      expression: "document.getElementById('ecocycle-ai-trigger').click();"
    });
    await new Promise(r => setTimeout(r, 1500));

    const res = await cdpSend(ws, msgId++, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'verify-chatbot-rebranded.png'), Buffer.from(res.data, 'base64'));
    console.log('Saved verify-chatbot-rebranded.png');

    ws.close();
  } finally {
    chromeProcess.kill();
  }
}

captureChatbot().catch(console.error);
