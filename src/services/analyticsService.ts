import { ImpactService } from './impactService';
import { trackEvent, AnalyticsEvent } from '../lib/analytics';
import { WasteTransaction } from '../types';

export const analyticsService = {
  track(event: AnalyticsEvent, params: Record<string, any> = {}) {
    trackEvent(event, params);
  },

  calculateAggregateMetrics(transactions: WasteTransaction[]) {
    return ImpactService.calculateAggregateMetrics(transactions);
  },

  getMonthlyTrends(transactions: WasteTransaction[]) {
    return ImpactService.getMonthlyTrends(transactions);
  },

  getCategoryBreakdown(transactions: WasteTransaction[]) {
    return ImpactService.getCategoryBreakdown(transactions);
  }
};
