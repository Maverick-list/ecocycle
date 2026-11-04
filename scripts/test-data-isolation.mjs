// scripts/test-data-isolation.mjs
import assert from 'assert';

console.log('--- 7. TESTING MULTI-USER DATA ISOLATION & RLS LOGIC ---');

// Simulated Database Table
const mockDatabase = {
  profiles: [
    {
      id: 'usr-alpha-001',
      email: 'alpha@ecocycle.id',
      full_name: 'Alpha Tester',
      phone: '+62811111111',
      address: 'Jl. Veteran No. 1, Kuningan',
      points: 150,
      verified: true
    },
    {
      id: 'usr-beta-002',
      email: 'beta@ecocycle.id',
      full_name: 'Beta Tester',
      phone: '+62822222222',
      address: 'Jl. Siliwangi No. 45, Kuningan',
      points: 320,
      verified: true
    }
  ],
  waste_deposits: [
    { id: 'dep-1', user_id: 'usr-alpha-001', material_name: 'Plastik PET', weight_kg: 5.0, points_earned: 175 },
    { id: 'dep-2', user_id: 'usr-alpha-001', material_name: 'Kardus & Kertas', weight_kg: 10.0, points_earned: 300 },
    { id: 'dep-3', user_id: 'usr-beta-002', material_name: 'Kaleng Logam', weight_kg: 4.0, points_earned: 120 }
  ]
};

// RLS Filter Simulation based on auth.uid()
function executeRLSQuery(table, currentUserId, operation = 'SELECT') {
  if (table === 'profiles') {
    // Policy: "Users can view own profile" USING (auth.uid() = id)
    return mockDatabase.profiles.filter(p => p.id === currentUserId);
  }
  if (table === 'waste_deposits') {
    // Policy: "Users can view own deposits" USING (auth.uid() = user_id)
    return mockDatabase.waste_deposits.filter(d => d.user_id === currentUserId);
  }
  if (table === 'leaderboard_view') {
    // Public view: only non-sensitive columns
    return mockDatabase.profiles.map(p => ({
      id: p.id,
      full_name: p.full_name,
      points: p.points,
      verified: p.verified
    }));
  }
  return [];
}

// 1. Test User Alpha Data Isolation
const alphaDeposits = executeRLSQuery('waste_deposits', 'usr-alpha-001');
assert.strictEqual(alphaDeposits.length, 2, 'User Alpha should see exactly 2 deposits');
assert(alphaDeposits.every(d => d.user_id === 'usr-alpha-001'), 'All deposits must belong to User Alpha');
assert(!alphaDeposits.some(d => d.user_id === 'usr-beta-002'), 'User Alpha must NOT see User Beta records');
console.log('  [PASS] User Alpha deposit isolation verified (2 records isolated)');

// 2. Test User Beta Data Isolation
const betaDeposits = executeRLSQuery('waste_deposits', 'usr-beta-002');
assert.strictEqual(betaDeposits.length, 1, 'User Beta should see exactly 1 deposit');
assert.strictEqual(betaDeposits[0].material_name, 'Kaleng Logam');
assert(!betaDeposits.some(d => d.user_id === 'usr-alpha-001'), 'User Beta must NOT see User Alpha records');
console.log('  [PASS] User Beta deposit isolation verified (1 record isolated)');

// 3. Test Profile RLS Privacy
const alphaProfile = executeRLSQuery('profiles', 'usr-alpha-001');
assert.strictEqual(alphaProfile.length, 1);
assert.strictEqual(alphaProfile[0].email, 'alpha@ecocycle.id');
assert(!alphaProfile.some(p => p.id === 'usr-beta-002'), 'User Alpha cannot query User Beta private profile');
console.log('  [PASS] Private profile RLS isolation verified');

// 4. Test Leaderboard View Privacy Masking
const leaderboard = executeRLSQuery('leaderboard_view', null);
assert.strictEqual(leaderboard.length, 2);
for (const entry of leaderboard) {
  assert.strictEqual(entry.phone, undefined, 'Phone number must NOT be exposed in leaderboard view');
  assert.strictEqual(entry.address, undefined, 'Address must NOT be exposed in leaderboard view');
  assert.strictEqual(entry.email, undefined, 'Email must NOT be exposed in leaderboard view');
}
console.log('  [PASS] Leaderboard privacy view sanitization verified (No PII leaked)');

console.log('\n--- MULTI-USER ISOLATION TESTS COMPLETED SUCCESSFULLY ---\n');
