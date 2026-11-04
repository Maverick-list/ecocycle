import { WasteTransaction } from '../types';

export interface MonthlyTrendData {
  month: string;
  volumeKg: number;
  co2Kg: number;
}

export interface CategoryBreakdownData {
  name: string;
  value: number;
  color: string;
}

export const ImpactService = {
  /**
   * Aggregates total metrics dynamically from transactions + community baseline
   */
  calculateAggregateMetrics(transactions: WasteTransaction[]) {
    const userWeight = transactions.reduce((acc, t) => acc + t.weightKg, 0);
    const userCo2 = transactions.reduce((acc, t) => acc + t.co2OffsetKg, 0);
    const userWater = transactions.reduce((acc, t) => acc + t.waterSavedLiters, 0);

    const baselineCommunityWeightKg = 14820; // 14.82 tons verified community baseline
    const baselineCommunityCo2Kg = 22230; // 22.2 tons baseline
    const baselineCommunityWaterL = 355000;

    const totalWeightKg = parseFloat((userWeight + baselineCommunityWeightKg).toFixed(1));
    const totalCo2Kg = parseFloat((userCo2 + baselineCommunityCo2Kg).toFixed(1));
    const totalWaterLiters = Math.round(userWater + baselineCommunityWaterL);
    
    // 1 mature tree absorbs ~21.77 kg CO2 / year (US EPA standard)
    const treeEquivalents = Math.round(totalCo2Kg / 21.77);

    return {
      userWeight: parseFloat(userWeight.toFixed(1)),
      userCo2: parseFloat(userCo2.toFixed(1)),
      userWater,
      totalWeightKg,
      totalCo2Kg,
      totalWaterLiters,
      treeEquivalents
    };
  },

  /**
   * Generates monthly trend data for Recharts AreaChart
   */
  getMonthlyTrends(transactions: WasteTransaction[]): MonthlyTrendData[] {
    const baseMonths: { [key: string]: { volume: number; co2: number } } = {
      'Mei': { volume: 1120, co2: 1680 },
      'Jun': { volume: 1250, co2: 1875 },
      'Jul': { volume: 1410, co2: 2115 },
      'Agt': { volume: 1380, co2: 2070 },
      'Sep': { volume: 1520, co2: 2280 },
      'Okt': { volume: 1640, co2: 2460 },
    };

    // Add user transaction weights to current month (Okt)
    const currentMonthUserWeight = transactions.reduce((acc, t) => acc + t.weightKg, 0);
    const currentMonthUserCo2 = transactions.reduce((acc, t) => acc + t.co2OffsetKg, 0);

    baseMonths['Okt'].volume += Math.round(currentMonthUserWeight);
    baseMonths['Okt'].co2 += Math.round(currentMonthUserCo2);

    return Object.keys(baseMonths).map(month => ({
      month,
      volumeKg: baseMonths[month].volume,
      co2Kg: baseMonths[month].co2,
    }));
  },

  /**
   * Generates dynamic category breakdown for Recharts Donut / Bar chart
   */
  getCategoryBreakdown(transactions: WasteTransaction[]): CategoryBreakdownData[] {
    const counts: { [key: string]: number } = {
      'Plastik PET': 520,
      'Kardus & Kertas': 410,
      'Kaleng Logam': 230,
      'Minyak Jelantah': 160,
      'Botol Kaca': 120,
      'E-Waste': 80
    };

    transactions.forEach(t => {
      if (counts[t.wasteType] !== undefined) {
        counts[t.wasteType] += Math.round(t.weightKg);
      } else {
        counts[t.wasteType] = Math.round(t.weightKg);
      }
    });

    const colorMap: { [key: string]: string } = {
      'Plastik PET': '#006c48',
      'Kardus & Kertas': '#123b2a',
      'Kaleng Logam': '#cbf075',
      'Minyak Jelantah': '#94f6c4',
      'Botol Kaca': '#7ca68f',
      'E-Waste': '#e8e9e2'
    };

    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key],
      color: colorMap[key] || '#717973'
    }));
  }
};
