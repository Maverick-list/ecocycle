import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = '/home/firza-ilmi/.gemini/antigravity/brain/89c3e5c2-58b5-4fa3-8e9a-9c5da538f0b5';
const PUBLIC_SS_DIR = '/home/firza-ilmi/.gemini/antigravity/scratch/ecocycle/public/screenshots';

if (!fs.existsSync(PUBLIC_SS_DIR)) {
  fs.mkdirSync(PUBLIC_SS_DIR, { recursive: true });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getWsUrl(port) {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      if (res.ok) {
        const list = await res.json();
        const page = list.find((t) => t.type === 'page') || list[0];
        if (page && page.webSocketDebuggerUrl) {
          return page.webSocketDebuggerUrl;
        }
      }
    } catch {
      await sleep(200);
    }
  }
  throw new Error('Chrome did not start in time');
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    const { default: WebSocket } = await import('ws');
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.on('open', resolve);
      this.ws.on('error', reject);
      this.ws.on('message', (data) => {
        const msg = JSON.parse(data.toString());
        if (msg.id && this.callbacks.has(msg.id)) {
          const cb = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) cb.reject(new Error(msg.error.message));
          else cb.resolve(msg.result);
        }
      });
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async close() {
    if (this.ws) this.ws.close();
  }
}

async function captureScreen(client, name, fullPage = false) {
  const result = await client.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: fullPage,
  });
  const buf = Buffer.from(result.data, 'base64');
  const artifactPath = path.join(ARTIFACT_DIR, `${name}.png`);
  const publicPath = path.join(PUBLIC_SS_DIR, `${name}.png`);
  fs.writeFileSync(artifactPath, buf);
  fs.writeFileSync(publicPath, buf);
  console.log(`Saved screenshot: ${name}.png (${buf.length} bytes)`);
}

async function main() {
  const port = 9229;
  const chrome = spawn('google-chrome', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,900',
  ]);

  try {
    const wsUrl = await getWsUrl(port);
    const client = new CDPClient(wsUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('DOM.enable');
    await client.send('Runtime.enable');

    // 1. SignInPage with Facebook Tab
    console.log('Navigating to /masuk ...');
    await client.send('Page.navigate', { url: 'http://localhost:3000/masuk' });
    await sleep(2500);

    // Click Facebook tab
    await client.send('Runtime.evaluate', {
      expression: `(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const fbBtn = buttons.find(b => b.innerText.includes('Facebook'));
        if (fbBtn) fbBtn.click();
      })()`
    });
    await sleep(800);
    await captureScreen(client, '01_auth_signin_facebook');

    // 2. SignUpPage with Google & Facebook
    console.log('Navigating to /daftar ...');
    await client.send('Page.navigate', { url: 'http://localhost:3000/daftar' });
    await sleep(2500);
    await captureScreen(client, '02_auth_signup_providers');

    // 3. HomePage
    console.log('Navigating to / ...');
    await client.send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(2500);
    await captureScreen(client, '03_hero_videotron_gradient');

    // 4. Test EcoAgent Chatbot: Trigger and click suggested prompt
    console.log('Testing EcoAgent Chatbot...');
    await client.send('Runtime.evaluate', {
      expression: `(() => {
        const trigger = document.getElementById('ecocycle-ai-trigger');
        if (trigger) trigger.click();
      })()`
    });
    await sleep(1000);

    // Click suggested prompt button: "Buatkan draf setoran 4 kg plastik di Menteng"
    await client.send('Runtime.evaluate', {
      expression: `(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const promptBtn = buttons.find(b => b.innerText && b.innerText.includes('Buatkan draf setoran 4 kg'));
        if (promptBtn) {
          promptBtn.click();
        }
      })()`
    });
    await sleep(3500);
    await captureScreen(client, '04_ecoagent_autonomous_action');

    // 5. Waste Deposit Page (Spacious)
    console.log('Navigating to /setor-sampah ...');
    await client.send('Page.navigate', { url: 'http://localhost:3000/setor-sampah' });
    await sleep(2500);
    await captureScreen(client, '05_setor_sampah_spacious');

    // 6. Bank Sampah Digital
    console.log('Navigating to /bank-sampah ...');
    await client.send('Page.navigate', { url: 'http://localhost:3000/bank-sampah' });
    await sleep(2500);
    await captureScreen(client, '06_bank_sampah_ledger');

    // 7. Neraca Karbon & Sains Dampak
    console.log('Navigating to /dampak-ekologis ...');
    await client.send('Page.navigate', { url: 'http://localhost:3000/dampak-ekologis' });
    await sleep(2500);
    await captureScreen(client, '07_neraca_karbon_science');

    await client.close();
    console.log('All verification captures completed successfully!');
  } finally {
    chrome.kill('SIGKILL');
  }
}

main().catch((err) => {
  console.error('Test run failed:', err);
  process.exit(1);
});
