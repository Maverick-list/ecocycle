// scripts/browser-console-audit.mjs
import { spawn } from 'child_process';

async function auditBrowser() {
  console.log('--- 5. BROWSER CONSOLE INSPECTION VIA HEADLESS CHROME CDP ---');
  
  // Launch Chrome targeting the dev server
  const chromeProcess = spawn('google-chrome', [
    '--headless=new',
    '--remote-debugging-port=9224',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-extensions',
    'http://localhost:3000/'
  ]);

  // Give Chrome a moment to boot
  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9224/json/list');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page');

    if (!pageTab || !pageTab.webSocketDebuggerUrl) {
      throw new Error('No page tab with WebSocket debugger URL found');
    }

    console.log(`Attached to page target: ${pageTab.title}`);
    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    const consoleLogs = [];
    const pageErrors = [];

    await new Promise((resolve, reject) => {
      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Console.enable' }));
        ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
        resolve();
      };
      ws.onerror = reject;
    });

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' ');
        consoleLogs.push({ type: msg.params.type, text });
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        const detail = msg.params.exceptionDetails;
        pageErrors.push(`${detail.text} ${detail.exception?.description || ''}`);
      }
    };

    // Navigate across pages to inspect console errors
    const pages = [
      '/',
      '/bank-sampah',
      '/pemilahan-pintar',
      '/dampak-ekologis',
      '/analitik',
      '/akademi',
      '/tantangan',
      '/faq',
      '/panduan',
      '/masuk',
      '/profil'
    ];

    let reqId = 10;
    for (const p of pages) {
      reqId++;
      console.log(`Navigating to: http://localhost:3000${p}`);
      ws.send(JSON.stringify({
        id: reqId,
        method: 'Page.navigate',
        params: { url: `http://localhost:3000${p}` }
      }));
      await new Promise(r => setTimeout(r, 1500));
    }

    ws.close();

    console.log('\n--- CONSOLE INSPECTION SUMMARY ---');
    console.log(`Total console entries: ${consoleLogs.length}`);
    if (pageErrors.length > 0) {
      console.log(`[FAIL] ${pageErrors.length} unhandled runtime exceptions found:`);
      pageErrors.forEach(err => console.error('  - ' + err));
    } else {
      console.log('  [PASS] 0 unhandled runtime exceptions detected across all inspected routes.');
    }

    const errorsInConsole = consoleLogs.filter(l => l.type === 'error');
    if (errorsInConsole.length > 0) {
      console.log(`[WARN] Console errors (${errorsInConsole.length}):`);
      errorsInConsole.forEach(e => console.log(`  - [${e.type}] ${e.text}`));
    } else {
      console.log('  [PASS] 0 console.error calls recorded.');
    }

  } catch (err) {
    console.error('CDP Audit error:', err);
  } finally {
    chromeProcess.kill();
  }
}

auditBrowser();
