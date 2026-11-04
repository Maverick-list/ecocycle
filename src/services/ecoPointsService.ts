import { doc, getDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { StorageService } from './storageService';

const LOCAL_STORAGE_BONUS_KEY = 'ecocycle_bonus_points_v2';

export const ecoPointsService = {
  isConfigured: isFirebaseConfigured,

  /**
   * Get user's current EcoPoints balance
   */
  async getUserPoints(userId?: string | null): Promise<number> {
    if (isFirebaseConfigured && db && userId) {
      try {
        const docRef = doc(db, 'ecoPoints', userId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          return snap.data().totalPoints || 0;
        }
      } catch (err) {
        console.warn('[EcoPointsService] Failed to fetch points from Firestore:', err);
      }
    }
    // Fallback to local points
    return StorageService.get<number>(LOCAL_STORAGE_BONUS_KEY, 0);
  },

  /**
   * Save bonus points locally with optional server logging
   */
  addLocalBonus(points: number): number {
    const current = StorageService.get<number>(LOCAL_STORAGE_BONUS_KEY, 0);
    const updated = current + points;
    StorageService.set(LOCAL_STORAGE_BONUS_KEY, updated);
    return updated;
  }
};
