import { spawn } from 'child_process';
import WebSocket from 'ws';

const BASE = process.argv[2] || 'http://localhost:3000';
const viewports = [
  { name: 'Mobile (iPhone 375x812)', width: 375, height: 812, mobile: true },
  { name: 'Mobile (390x844)', width: 390, height: 844, mobile: true },
  { name: 'Tablet (iPad 768x1024)', width: 768, height: 1024, mobile: false },
  { name: 'Desktop (1440x900)', width: 1440, height: 900, mobile: false },
];

const routes = [
  '/',
  '/bank-sampah',
  '/setor-sampah',
  '/pemilahan-pintar',
  '/dampak-ekologis',
  '/akademi',
  '/tantangan',
  '/analitik',
  '/profil',
  '/masuk',
  '/daftar',
  '/faq',
  '/panduan',
  '/kontak',
  '/404',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const port = 9334;
const chrome = spawn('google-chrome', [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=1440,900',
]);

let ws;
try {
  let url;
  for (let i = 0; i < 40; i++) {
    try {
      const l = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      url = l.find((t) => t.type === 'page')?.webSocketDebuggerUrl;
      if (url) break;
    } catch {}
    await sleep(250);
  }
  ws = new WebSocket(url);
  await new Promise((r) => ws.on('open', r));

  let id = 1;
  const cbs = new Map();
  let currentKey = '';
  const report = {};
  const add = (k) => (report[currentKey] ||= []).push(k);

  ws.on('message', (d) => {
    const m = JSON.parse(d);
    if (m.id && cbs.has(m.id)) {
      cbs.get(m.id)(m.result);
      cbs.delete(m.id);
      return;
    }
    if (!currentKey) return;
    if (m.method === 'Runtime.exceptionThrown') {
      add('EXCEPTION: ' + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text).slice(0, 300));
    }
    if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type)) {
      add(m.params.type.toUpperCase() + ': ' + m.params.args.map((a) => a.value ?? a.description ?? '').join(' ').slice(0, 300));
    }
    if (m.method === 'Network.responseReceived' && m.params.response.status >= 400) {
      add(`HTTP ${m.params.response.status}: ${m.params.response.url}`);
    }
  });

  const send = (method, params = {}) =>
    new Promise((r) => {
      const i = id++;
      cbs.set(i, r);
      ws.send(JSON.stringify({ id: i, method, params }));
    });

  for (const d of ['Page', 'Runtime', 'Network', 'Log', 'Emulation']) await send(d + '.enable');

  for (const vp of viewports) {
    console.log(`\n========================================`);
    console.log(`TESTING VIEWPORT: ${vp.name}`);
    console.log(`========================================`);

    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      mobile: vp.mobile,
    });

    for (const r of routes) {
      currentKey = `[${vp.name}] ${r}`;
      await send('Page.navigate', { url: BASE + r });
      await sleep(1500);

      const checkScript = `
        (() => {
          const scrollW = document.documentElement.scrollWidth;
          const innerW = window.innerWidth;
          const overflowX = scrollW > innerW + 1; // 1px threshold for subpixels
          
          // Find any offending element overflowing the screen horizontally
          let overflowingElements = [];
          if (overflowX) {
            const all = document.querySelectorAll('*');
            for (const el of all) {
              const rect = el.getBoundingClientRect();
              if (rect.right > innerW + 2) {
                const tag = el.tagName.toLowerCase();
                const cls = (el.className && typeof el.className === 'string') ? el.className.split(' ').slice(0, 3).join('.') : '';
                const id = el.id ? '#' + el.id : '';
                overflowingElements.push(\`\${tag}\${id}.\${cls} (right=\${Math.round(rect.right)}, w=\${Math.round(rect.width)})\`);
                if (overflowingElements.length >= 3) break;
              }
            }
          }

          const h1 = document.querySelector('h1')?.innerText?.slice(0, 50);
          const imgsBroken = [...document.images]
            .filter(i => i.complete && i.naturalWidth === 0)
            .map(i => i.src.slice(-50));

          return {
            len: document.body.innerText.length,
            h1,
            overflowX,
            scrollW,
            innerW,
            overflowingElements,
            imgsBroken
          };
        })()
      `;

      const res = await send('Runtime.evaluate', { expression: checkScript, returnByValue: true });
      const info = res?.result?.value || {};

      if (info.len < 100) add(`BLANK PAGE (len=${info.len})`);
      if (info.overflowX) {
        add(`HORIZONTAL OVERFLOW: scrollWidth=${info.scrollW} > innerWidth=${info.innerW}`);
        if (info.overflowingElements?.length) {
          add(`  Offending elements: ${info.overflowingElements.join(' | ')}`);
        }
      }
      if (info.imgsBroken?.length) add(`BROKEN IMAGES: ${info.imgsBroken.join(', ')}`);

      const msgs = report[currentKey] || [];
      const cleanMsgs = [...new Set(msgs)].filter(m => !m.includes('Download the React DevTools'));
      if (cleanMsgs.length > 0) {
        console.log(`❌ ${currentKey}:`);
        cleanMsgs.forEach((m) => console.log(`   ${m}`));
      } else {
        console.log(`✅ ${currentKey} (h1: "${info.h1 || 'N/A'}")`);
      }
    }
  }
} finally {
  ws?.close();
  chrome.kill('SIGKILL');
}
