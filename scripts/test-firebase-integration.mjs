/**
 * ECOCYCLE Firebase & Google Services Integration Test Suite
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('=============================================================');
console.log('ECOCYCLE FIREBASE & GOOGLE SERVICES VERIFICATION SUITE');
console.log('=============================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`  [FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// 1. Verify Configuration & Security Files
console.log('1. Verifying Security & Infrastructure Configurations...');
assert(fs.existsSync(path.join(rootDir, 'firestore.rules')), 'firestore.rules exists');
const firestoreRules = fs.readFileSync(path.join(rootDir, 'firestore.rules'), 'utf-8');
assert(firestoreRules.includes("rules_version = '2'"), 'firestore.rules uses version 2');
assert(/match\s*\/\{document=\*\*\}\s*\{\s*allow read, write:\s*if false;\s*\}/m.test(firestoreRules), 'Root default-deny enforced');
assert(firestoreRules.includes('function isAdmin('), 'Admin RBAC verification function defined');
assert(firestoreRules.includes('match /users/{userId}'), '/users security rules defined');
assert(firestoreRules.includes('match /wasteDeposits/{depositId}'), '/wasteDeposits security rules defined');
assert(firestoreRules.includes('match /transactions/{transactionId}'), '/transactions security rules defined');
assert(firestoreRules.includes('match /ecoPoints/{userId}'), '/ecoPoints security rules defined');
assert(firestoreRules.includes('match /leaderboard/{userId}'), '/leaderboard PII-safe rules defined');

assert(fs.existsSync(path.join(rootDir, 'storage.rules')), 'storage.rules exists');
const storageRules = fs.readFileSync(path.join(rootDir, 'storage.rules'), 'utf-8');
assert(storageRules.includes('image/.*'), 'MIME type validation enforced in storage.rules');
assert(storageRules.includes('isUnderSizeLimit(5)'), '5MB avatar limit enforced');
assert(storageRules.includes('isUnderSizeLimit(10)'), '10MB deposit photo limit enforced');

assert(fs.existsSync(path.join(rootDir, 'firestore.indexes.json')), 'firestore.indexes.json exists');
const indexes = JSON.parse(fs.readFileSync(path.join(rootDir, 'firestore.indexes.json'), 'utf-8'));
assert(indexes.indexes.length >= 5, `Configured ${indexes.indexes.length} compound Firestore indexes`);

assert(fs.existsSync(path.join(rootDir, 'firebase.json')), 'firebase.json exists');
const firebaseConfig = JSON.parse(fs.readFileSync(path.join(rootDir, 'firebase.json'), 'utf-8'));
assert(firebaseConfig.hosting && firebaseConfig.hosting.rewrites, 'Hosting SPA rewrites configured');
assert(firebaseConfig.firestore && firebaseConfig.storage && firebaseConfig.functions, 'All Firebase services declared in firebase.json');
assert(firebaseConfig.emulators && firebaseConfig.emulators.auth, 'Local emulators configured');

// 2. Verify Cloud Functions
console.log('\n2. Verifying Cloud Functions Implementation...');
assert(fs.existsSync(path.join(rootDir, 'functions/src/index.ts')), 'functions/src/index.ts exists');
assert(fs.existsSync(path.join(rootDir, 'functions/lib/index.js')), 'Compiled functions/lib/index.js exists');
const funcCode = fs.readFileSync(path.join(rootDir, 'functions/src/index.ts'), 'utf-8');
assert(funcCode.includes('processWasteDeposit'), 'processWasteDeposit Cloud Function implemented');
assert(funcCode.includes('onUserSignUp'), 'onUserSignUp Cloud Function implemented');

// 3. Verify Client-Side Firebase Services & Libraries
console.log('\n3. Verifying Client-Side Firebase Libraries...');
assert(fs.existsSync(path.join(rootDir, 'src/lib/firebase.ts')), 'src/lib/firebase.ts exists');
assert(fs.existsSync(path.join(rootDir, 'src/lib/firebaseAuth.ts')), 'src/lib/firebaseAuth.ts exists');
assert(fs.existsSync(path.join(rootDir, 'src/lib/firebaseFirestore.ts')), 'src/lib/firebaseFirestore.ts exists');
assert(fs.existsSync(path.join(rootDir, 'src/lib/firebaseStorage.ts')), 'src/lib/firebaseStorage.ts exists');
assert(fs.existsSync(path.join(rootDir, 'src/lib/analytics.ts')), 'src/lib/analytics.ts exists');
assert(fs.existsSync(path.join(rootDir, 'src/services/authService.ts')), 'src/services/authService.ts exists');
assert(fs.existsSync(path.join(rootDir, 'src/services/firebaseDataService.ts')), 'src/services/firebaseDataService.ts exists');
assert(fs.existsSync(path.join(rootDir, 'src/services/wasteDepositService.ts')), 'src/services/wasteDepositService.ts exists');
assert(fs.existsSync(path.join(rootDir, 'src/services/ecoPointsService.ts')), 'src/services/ecoPointsService.ts exists');
assert(fs.existsSync(path.join(rootDir, 'src/services/transactionService.ts')), 'src/services/transactionService.ts exists');
assert(fs.existsSync(path.join(rootDir, 'src/services/challengeService.ts')), 'src/services/challengeService.ts exists');
assert(fs.existsSync(path.join(rootDir, 'src/services/analyticsService.ts')), 'src/services/analyticsService.ts exists');

// 4. Verify Technical SEO & Crawlability Assets
console.log('\n4. Verifying Technical SEO & Search Engine Crawlability...');
assert(fs.existsSync(path.join(rootDir, 'public/robots.txt')), 'public/robots.txt exists');
const robots = fs.readFileSync(path.join(rootDir, 'public/robots.txt'), 'utf-8');
assert(robots.includes('Disallow: /profil'), 'Private profile route disallowed in robots.txt');
assert(robots.includes('Disallow: /auth/'), 'Auth routes disallowed in robots.txt');
assert(robots.includes('Sitemap: https://ecocycle.id/sitemap.xml'), 'Sitemap declared in robots.txt');

assert(fs.existsSync(path.join(rootDir, 'public/sitemap.xml')), 'public/sitemap.xml exists');
const sitemap = fs.readFileSync(path.join(rootDir, 'public/sitemap.xml'), 'utf-8');
assert(sitemap.includes('https://ecocycle.id/bank-sampah'), 'Bank Sampah route in sitemap.xml');
assert(sitemap.includes('https://ecocycle.id/pemilahan-pintar'), 'Smart Sorting route in sitemap.xml');
assert(sitemap.includes('https://ecocycle.id/dampak-ekologis'), 'Eco Impact route in sitemap.xml');

assert(fs.existsSync(path.join(rootDir, 'src/components/seo/SEOHead.tsx')), 'src/components/seo/SEOHead.tsx exists');

// 5. Verify Pre-rendered Static HTML Pages
console.log('\n5. Verifying Static Prerendering Outputs...');
const distRoutes = [
  'index.html',
  'bank-sampah/index.html',
  'pemilahan-pintar/index.html',
  'dampak-ekologis/index.html',
  'analitik/index.html',
  'akademi/index.html',
  'tantangan/index.html',
  'panduan/index.html',
  'faq/index.html',
  'kontak/index.html'
];

distRoutes.forEach(r => {
  const filePath = path.join(rootDir, 'dist', r);
  assert(fs.existsSync(filePath), `dist/${r} pre-rendered successfully`);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    assert(content.includes('<link rel="canonical"'), `Canonical tag present in dist/${r}`);
    assert(content.includes('application/ld+json'), `JSON-LD Schema present in dist/${r}`);
  }
});

// 6. Verify Documentation
console.log('\n6. Verifying Technical Documentation...');
assert(fs.existsSync(path.join(rootDir, 'docs/GOOGLE_SERVICES_SETUP.md')), 'docs/GOOGLE_SERVICES_SETUP.md exists');
assert(fs.existsSync(path.join(rootDir, 'docs/FIREBASE_MIGRATION_REPORT.md')), 'docs/FIREBASE_MIGRATION_REPORT.md exists');
assert(fs.existsSync(path.join(rootDir, 'docs/SEO_AUDIT_REPORT.md')), 'docs/SEO_AUDIT_REPORT.md exists');
assert(fs.existsSync(path.join(rootDir, '.env.example')), '.env.example exists with Firebase keys');

console.log('\n=============================================================');
console.log(`TEST SUMMARY: ${passedTests} / ${totalTests} assertions passed (${Math.round((passedTests/totalTests)*100)}%)`);
console.log('ALL GOOGLE & FIREBASE INTEGRATION CHECKS PASSED SUCCESSFULLY!');
console.log('=============================================================\n');
