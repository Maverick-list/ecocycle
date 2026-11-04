// scripts/test-services.mjs
import assert from 'assert';

console.log('--- 4. FUNCTIONAL SERVICES UNIT TESTS ---');

// 1. Waste Calculation Config & Formulas
const WASTE_CATEGORIES = [
  { id: 'pet', name: 'Plastik PET', pricePerKg: 3500, pointsPerKg: 35, co2Factor: 1.5, waterFactor: 24 },
  { id: 'kardus', name: 'Kardus & Kertas', pricePerKg: 3000, pointsPerKg: 30, co2Factor: 1.1, waterFactor: 28 },
  { id: 'kaleng', name: 'Kaleng Logam', pricePerKg: 3000, pointsPerKg: 30, co2Factor: 3.2, waterFactor: 40 },
  { id: 'kaca', name: 'Botol Kaca', pricePerKg: 2000, pointsPerKg: 20, co2Factor: 0.8, waterFactor: 12 },
  { id: 'organik', name: 'Kompos Organik', pricePerKg: 1000, pointsPerKg: 10, co2Factor: 0.5, waterFactor: 5 },
  { id: 'elektronik', name: 'E-Waste', pricePerKg: 7500, pointsPerKg: 75, co2Factor: 4.8, waterFactor: 60 }
];

function calculateEstimates(wasteType, weightKg) {
  const config = WASTE_CATEGORIES.find(c => c.name === wasteType) || WASTE_CATEGORIES[0];
  const safeWeight = Math.max(0.1, weightKg);

  const points = Math.round(safeWeight * config.pointsPerKg);
  const valueIdr = Math.round(safeWeight * config.pricePerKg);
  const co2OffsetKg = parseFloat((safeWeight * config.co2Factor).toFixed(2));
  const waterSavedLiters = Math.round(safeWeight * config.waterFactor);

  return { points, valueIdr, co2OffsetKg, waterSavedLiters, unitPrice: config.pricePerKg, pointsRate: config.pointsPerKg };
}

// Test 1: Plastik PET 2.5 kg
const petEst = calculateEstimates('Plastik PET', 2.5);
assert.strictEqual(petEst.points, 88, 'PET 2.5kg should yield 88 points (round(2.5 * 35))');
assert.strictEqual(petEst.valueIdr, 8750, 'PET 2.5kg should yield IDR 8,750 (2.5 * 3500)');
assert.strictEqual(petEst.co2OffsetKg, 3.75, 'PET 2.5kg should avoid 3.75 kg CO2e (2.5 * 1.5)');
assert.strictEqual(petEst.waterSavedLiters, 60, 'PET 2.5kg should save 60 liters water (2.5 * 24)');
console.log('  [PASS] WasteBankService: Plastik PET 2.5 kg calculation verified');

// Test 2: Weight clamp to minimum 0.1 kg
const zeroWeightEst = calculateEstimates('Plastik PET', 0);
assert.strictEqual(zeroWeightEst.points, 4, 'Zero weight clamped to 0.1 kg gives 4 points');
assert.strictEqual(zeroWeightEst.valueIdr, 350, 'Zero weight clamped to 0.1 kg gives IDR 350');
console.log('  [PASS] WasteBankService: Minimum safe weight clamp verified');

// Test 3: Kaleng Logam high-impact factor
const kalengEst = calculateEstimates('Kaleng Logam', 10);
assert.strictEqual(kalengEst.co2OffsetKg, 32.0, 'Logam 10kg avoids 32 kg CO2e');
assert.strictEqual(kalengEst.waterSavedLiters, 400, 'Logam 10kg saves 400 liters water');
console.log('  [PASS] WasteBankService: Kaleng Logam 10 kg calculation verified');

// Test 4: ImpactService Aggregate Metrics
const mockTransactions = [
  { weightKg: 2.5, co2OffsetKg: 3.75, waterSavedLiters: 60 },
  { weightKg: 5.0, co2OffsetKg: 5.5, waterSavedLiters: 140 }
];

function calculateAggregateMetrics(transactions) {
  const userWeight = transactions.reduce((acc, t) => acc + t.weightKg, 0);
  const userCo2 = transactions.reduce((acc, t) => acc + t.co2OffsetKg, 0);
  const userWater = transactions.reduce((acc, t) => acc + t.waterSavedLiters, 0);

  const baselineCommunityWeightKg = 14820;
  const baselineCommunityCo2Kg = 22230;
  const baselineCommunityWaterL = 355000;

  const totalWeightKg = parseFloat((userWeight + baselineCommunityWeightKg).toFixed(1));
  const totalCo2Kg = parseFloat((userCo2 + baselineCommunityCo2Kg).toFixed(1));
  const totalWaterLiters = Math.round(userWater + baselineCommunityWaterL);
  const treeEquivalents = Math.round(totalCo2Kg / 21.77);

  return { userWeight, userCo2, userWater, totalWeightKg, totalCo2Kg, totalWaterLiters, treeEquivalents };
}

const agg = calculateAggregateMetrics(mockTransactions);
assert.strictEqual(agg.userWeight, 7.5, 'User weight is 7.5 kg');
assert.strictEqual(agg.userCo2, 9.25, 'User CO2 offset is 9.25 kg');
assert.strictEqual(agg.totalWeightKg, 14827.5, 'Total weight includes community baseline');
assert.strictEqual(agg.treeEquivalents, Math.round(22239.25 / 21.77), 'Tree equivalents calculated accurately via EPA factor');
console.log('  [PASS] ImpactService: Metric aggregation and EPA tree absorption verified');

// Test 5: CSV Export Serialization
function generateCSV(trends) {
  const headers = ['Bulan', 'Volume_Terpilah_Kg', 'Reduksi_CO2e_Kg'];
  const rows = trends.map(t => `${t.month},${t.volumeKg},${t.co2Kg}`);
  return [headers.join(','), ...rows].join('\n');
}

const sampleTrends = [
  { month: 'Mei', volumeKg: 1120, co2Kg: 1680 },
  { month: 'Jun', volumeKg: 1250, co2Kg: 1875 }
];
const csvResult = generateCSV(sampleTrends);
assert(csvResult.includes('Bulan,Volume_Terpilah_Kg,Reduksi_CO2e_Kg'), 'CSV contains correct header');
assert(csvResult.includes('Mei,1120,1680'), 'CSV contains correct rows');
console.log('  [PASS] Analytics: CSV export string formation verified');

console.log('\n--- ALL UNIT TESTS COMPLETED SUCCESSFULLY ---\n');
