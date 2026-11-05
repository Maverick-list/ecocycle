import { spawn } from 'child_process';
import WebSocket from 'ws';

const BASE = process.argv[2] || 'http://localhost:3000';
const routes = (process.argv[3]||'/akademi,/akademi,/').split(',');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const port = 9333;
const chrome = spawn('google-chrome', ['--headless=new', `--remote-debugging-port=${port}`, '--no-sandbox', '--disable-gpu', '--window-size=1440,900']);
let ws;
try {
  let url;
  for (let i = 0; i < 40; i++) { try { const l = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); url = l.find(t => t.type === 'page')?.webSocketDebuggerUrl; if (url) break; } catch {} await sleep(250); }
  ws = new WebSocket(url);
  await new Promise((r) => ws.on('open', r));
  let id = 1; const cbs = new Map(); let current = null; const report = {};
  const add = (k) => (report[current] ||= []).push(k);
  ws.on('message', (d) => {
    const m = JSON.parse(d);
    if (m.id && cbs.has(m.id)) { cbs.get(m.id)(m.result); cbs.delete(m.id); return; }
    if (!current) return;
    if (m.method === 'Runtime.exceptionThrown') add('EXCEPTION: ' + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text).slice(0, 300));
    if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type)) add(m.params.type.toUpperCase() + ': ' + m.params.args.map(a => a.value ?? a.description ?? '').join(' ').slice(0, 300));
    if (m.method === 'Network.responseReceived' && m.params.response.status >= 400) add(`HTTP ${m.params.response.status}: ${m.params.response.url}`);
    if (m.method === 'Network.loadingFailed' && !m.params.canceled) add(`NETFAIL: ${m.params.errorText} ${m.params.requestId}`);
    if (m.method === 'Log.entryAdded' && ['error', 'warning'].includes(m.params.entry.level)) add('LOG ' + m.params.entry.level + ': ' + m.params.entry.text.slice(0, 200) + ' ' + (m.params.entry.url || ''));
  });
  const send = (method, params = {}) => new Promise((r) => { const i = id++; cbs.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  for (const d of ['Page', 'Runtime', 'Network', 'Log']) await send(d + '.enable');
  for (const r of routes) {
    current = r;
    await send('Page.navigate', { url: BASE + r });
    await sleep(3500);
    const res = await send('Runtime.evaluate', { expression: `JSON.stringify({len: document.body.innerText.length, h1: document.querySelector('h1')?.innerText?.slice(0,60), overflowX: document.documentElement.scrollWidth > innerWidth, imgsBroken: [...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src.slice(-60)), path: location.pathname})`, returnByValue: true });
    const info = JSON.parse(res.result.value);
    if (info.len < 200) add('BLANK/NEAR-EMPTY PAGE len=' + info.len);
    if (info.overflowX) add('HORIZONTAL OVERFLOW');
    if (info.imgsBroken.length) add('BROKEN IMAGES: ' + info.imgsBroken.join(', '));
    (report[r] ||= []);
    report[r].unshift(`-> landed ${info.path} h1="${info.h1}"`);
  }
  for (const [r, v] of Object.entries(report)) { console.log('\n## ' + r); [...new Set(v)].forEach(x => console.log('  ' + x)); }
} finally { ws?.close(); chrome.kill('SIGKILL'); }
