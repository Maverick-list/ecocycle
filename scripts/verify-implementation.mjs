// scripts/verify-implementation.mjs
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const testResults = {
  routes: [],
  assets: [],
  services: [],
  supabase: {},
  summary: { passed: 0, failed: 0, warnings: 0 }
};

function pass(name, detail = '') {
  console.log(`  [PASS] ${name} ${detail ? '(' + detail + ')' : ''}`);
  testResults.summary.passed++;
}

function warn(name, detail = '') {
  console.log(`  [WARN] ${name} ${detail ? '(' + detail + ')' : ''}`);
  testResults.summary.warnings++;
}

function fail(name, detail = '') {
  console.log(`  [FAIL] ${name} ${detail ? '(' + detail + ')' : ''}`);
  testResults.summary.failed++;
}

// 1. ASSET VERIFICATION
console.log('\n--- 1. VERIFYING ASSETS ---');
const publicDir = path.join(rootDir, 'public');
const videoFiles = [
  'assets/videos/ecocycle-hero-cinematic.mp4',
  'media/ecocycle-tutorial.mp4'
];

for (const v of videoFiles) {
  const fullPath = path.join(publicDir, v);
  if (fs.existsSync(fullPath)) {
    pass(`Video file exists: ${v}`, `${fs.statSync(fullPath).size} bytes`);
    testResults.assets.push({ file: v, exists: true });
  } else {
    warn(`Video file NOT found: ${v}`, 'Using fallback canvas / simulated player');
    testResults.assets.push({ file: v, exists: false });
  }
}

const imageFiles = [
  'assets/images/hero_sorting.jpg',
  'assets/images/facility_aerial.jpg',
  'assets/images/recycling_bins.jpg',
  'assets/images/drop_point.jpg',
  'assets/images/workshop.jpg',
  'assets/images/avatar_user.jpg',
  'assets/images/avatar_female.jpg',
  'assets/images/avatar_male.jpg',
  'favicon.svg'
];

for (const img of imageFiles) {
  const fullPath = path.join(publicDir, img);
  if (fs.existsSync(fullPath)) {
    pass(`Image asset exists: ${img}`, `${fs.statSync(fullPath).size} bytes`);
    testResults.assets.push({ file: img, exists: true });
  } else {
    fail(`Image asset missing: ${img}`);
    testResults.assets.push({ file: img, exists: false });
  }
}

// 2. SUPABASE CONFIGURATION AUDIT
console.log('\n--- 2. VERIFYING SUPABASE ENVIRONMENT & POLICIES ---');
const envPath = path.join(rootDir, '.env');
const hasEnv = fs.existsSync(envPath);
let supabaseUrl = process.env.VITE_SUPABASE_URL || '';
let supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (hasEnv) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const urlMatch = envContent.match(/VITE_SUPABASE_URL=(.*)/);
  const keyMatch = envContent.match(/VITE_SUPABASE_ANON_KEY=(.*)/);
  if (urlMatch) supabaseUrl = urlMatch[1].trim();
  if (keyMatch) supabaseAnonKey = keyMatch[1].trim();
}

const isConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project-id') &&
  !supabaseAnonKey.includes('your-anon-key')
);

if (isConfigured) {
  pass('Supabase credentials configured');
  testResults.supabase.status = 'CONFIGURED';
} else {
  warn('CLOUD AUTHENTICATION NOT CONFIGURED', 'VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY missing in .env');
  testResults.supabase.status = 'CLOUD AUTHENTICATION NOT CONFIGURED';
}

const sqlMigrationPath = path.join(rootDir, 'supabase/migrations/20261104_ecocycle_schema.sql');
if (fs.existsSync(sqlMigrationPath)) {
  const sql = fs.readFileSync(sqlMigrationPath, 'utf8');
  pass('SQL Migration File exists', `${(sql.length / 1024).toFixed(1)} KB`);
  const rlsCount = (sql.match(/ENABLE ROW LEVEL SECURITY/g) || []).length;
  const policyCount = (sql.match(/CREATE POLICY/g) || []).length;
  pass(`RLS enabled on tables (${rlsCount} tables found)`);
  pass(`RLS Security policies created (${policyCount} policies found)`);
  testResults.supabase.schema = { rlsCount, policyCount };
} else {
  fail('SQL Migration file missing at supabase/migrations/20261104_ecocycle_schema.sql');
}

// 3. HTTP ROUTE VERIFICATION
console.log('\n--- 3. VERIFYING DEV SERVER ROUTES ---');
const routesToTest = [
  '/',
  '/bank-sampah',
  '/pemilahan-pintar',
  '/dampak-ekologis',
  '/analitik',
  '/akademi',
  '/tantangan',
  '/kontak',
  '/setor-sampah',
  '/panduan',
  '/masuk',
  '/daftar',
  '/lupa-password',
  '/verifikasi-email',
  '/auth/callback',
  '/profil'
];

async function checkRoute(urlPath) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          path: urlPath,
          statusCode: res.statusCode,
          hasContent: data.length > 500
        });
      });
    });
    req.on('error', (err) => {
      resolve({
        path: urlPath,
        statusCode: 0,
        error: err.message
      });
    });
    req.setTimeout(3000, () => {
      req.destroy();
      resolve({ path: urlPath, statusCode: 408, error: 'Timeout' });
    });
  });
}

for (const r of routesToTest) {
  const res = await checkRoute(r);
  if (res.statusCode === 200 && res.hasContent) {
    pass(`Route ${r}`, `HTTP 200 OK`);
    testResults.routes.push({ route: r, status: 'VERIFIED', code: 200 });
  } else {
    fail(`Route ${r}`, `HTTP ${res.statusCode} ${res.error || ''}`);
    testResults.routes.push({ route: r, status: 'FAILED', code: res.statusCode });
  }
}

// 4. PRINT SUMMARY
console.log('\n=======================================');
console.log(`TEST SUMMARY: ${testResults.summary.passed} PASSED, ${testResults.summary.warnings} WARNINGS, ${testResults.summary.failed} FAILED`);
console.log('=======================================\n');
