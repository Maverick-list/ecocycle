import { FirebaseDataService } from './firebaseDataService';
import { WasteBankService } from './wasteBankService';
import { WasteTransaction, WasteStreamType } from '../types';
import { trackEvent } from '../lib/analytics';

export const wasteDepositService = {
  isConfigured: FirebaseDataService.isConfigured,

  /**
   * Get user deposits from Firebase (or LocalStorage fallback)
   */
  async getDeposits(userId?: string | null): Promise<WasteTransaction[]> {
    if (FirebaseDataService.isConfigured && userId) {
      const { deposits, error } = await FirebaseDataService.fetchUserDeposits(userId);
      if (!error && deposits.length > 0) {
        return deposits;
      }
    }
    // Fallback to local offline storage
    return WasteBankService.getTransactions();
  },

  /**
   * Submit new waste deposit
   */
  async submitDeposit(
    userId: string | null | undefined,
    data: {
      wasteType: WasteStreamType;
      weightKg: number;
      dropPoint: string;
      photoUrl?: string;
      notes?: string;
      date?: string;
    }
  ): Promise<WasteTransaction> {
    // 1. Calculate and record in local storage
    const newTrx = WasteBankService.createTransaction(data);

    // 2. Track analytics event
    trackEvent('deposit_submitted', {
      category: data.wasteType,
      weight: data.weightKg,
      dropPoint: data.dropPoint
    });

    // 3. Sync to Firebase Firestore if authenticated and configured
    if (FirebaseDataService.isConfigured && userId) {
      FirebaseDataService.submitDeposit(userId, newTrx).catch(err => {
        console.warn('[WasteDepositService] Firestore background sync warning:', err);
      });
    }

    return newTrx;
  }
};
