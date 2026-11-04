import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { FirestoreTransaction } from '../lib/firebaseFirestore';

export const transactionService = {
  isConfigured: isFirebaseConfigured,

  /**
   * Fetch official transaction ledger entries for a user
   */
  async getUserTransactions(userId: string): Promise<FirestoreTransaction[]> {
    if (!isFirebaseConfigured || !db) return [];

    try {
      const colRef = collection(db, 'transactions');
      const q = query(
        colRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as FirestoreTransaction));
    } catch (err) {
      console.warn('[TransactionService] Failed to fetch transactions:', err);
      return [];
    }
  }
};
