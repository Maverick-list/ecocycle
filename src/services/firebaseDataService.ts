import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { WasteTransaction, UserProfile } from '../types';

export const FirebaseDataService = {
  isConfigured: isFirebaseConfigured,

  /**
   * Fetch authenticated user's private profile from Firestore
   */
  async fetchUserProfile(uid: string): Promise<{ profile: Partial<UserProfile> | null; error: Error | null }> {
    if (!isFirebaseConfigured || !db) {
      return { profile: null, error: new Error('Firebase Firestore belum dikonfigurasi.') };
    }

    try {
      const docRef = doc(db, 'users', uid);
      const snap = await getDoc(docRef);
      if (!snap.exists()) {
        return { profile: null, error: null };
      }

      const data = snap.data();
      const profile: Partial<UserProfile> = {
        id: uid,
        name: data.displayName || data.name || 'Pengguna ECOCYCLE',
        email: data.email || '',
        phone: data.phone || '',
        role: data.role || 'Warga Sirkular',
        avatar: data.photoURL || data.avatar || '/assets/images/avatar_user.jpg',
        location: data.address || data.location || 'Indonesia',
        ecoLevel: data.ecoLevel || 'Warga Sirkular',
        currentStreakDays: data.currentStreakDays || 1,
        preferences: {
          monthlyGoalKg: data.monthlyGoalKg || 15,
          notificationsEnabled: data.notificationsEnabled ?? true,
          emailDigestWeekly: data.emailDigestWeekly ?? true,
          publicLeaderboard: data.publicLeaderboard ?? true,
          preferredDropPoint: data.preferredDropPoint || 'Hub Sentral'
        }
      };

      return { profile, error: null };
    } catch (err: any) {
      return { profile: null, error: err };
    }
  },

  /**
   * Update authenticated user's profile in Firestore
   */
  async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<{ error: Error | null }> {
    if (!isFirebaseConfigured || !db) {
      return { error: new Error('Firebase Firestore belum dikonfigurasi.') };
    }

    try {
      const docRef = doc(db, 'users', uid);
      await updateDoc(docRef, {
        displayName: updates.name,
        phone: updates.phone,
        address: updates.location,
        bio: updates.bio,
        photoURL: updates.avatar,
        'preferences.monthlyGoalKg': updates.preferences?.monthlyGoalKg,
        'preferences.notificationsEnabled': updates.preferences?.notificationsEnabled,
        'preferences.emailDigestWeekly': updates.preferences?.emailDigestWeekly,
        'preferences.preferredDropPoint': updates.preferences?.preferredDropPoint,
        updatedAt: serverTimestamp()
      });
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  },

  /**
   * Fetch user's private waste deposits from Firestore
   */
  async fetchUserDeposits(userId: string): Promise<{ deposits: WasteTransaction[]; error: Error | null }> {
    if (!isFirebaseConfigured || !db) {
      return { deposits: [], error: new Error('Firebase Firestore belum dikonfigurasi.') };
    }

    try {
      const colRef = collection(db, 'wasteDeposits');
      const q = query(
        colRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);

      const deposits: WasteTransaction[] = snap.docs.map(d => {
        const row = d.data();
        const dateObj = row.createdAt instanceof Timestamp ? row.createdAt.toDate() : new Date();
        return {
          id: row.manifestCode || d.id,
          date: dateObj.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }),
          timestamp: dateObj.getTime(),
          wasteType: row.wasteCategory || row.materialName || 'Plastik PET',
          weightKg: Number(row.weight || row.weightKg || 0),
          points: Number(row.pointsEarned || 0),
          valueIdr: Number(row.estimatedValue || 0),
          dropPoint: row.dropPointName || 'Hub Sentral',
          status: row.status || 'Terverifikasi',
          co2OffsetKg: Number(row.co2ReducedKg || 0),
          waterSavedLiters: Number(row.waterSavedLiters || 0),
          photoUrl: row.proofPhotoUrl || row.photoUrl || undefined,
          notes: `Manifest: ${row.manifestCode || d.id}`
        };
      });

      return { deposits, error: null };
    } catch (err: any) {
      return { deposits: [], error: err };
    }
  },

  /**
   * Submit a new waste deposit to Firestore
   */
  async submitDeposit(userId: string, trx: WasteTransaction): Promise<{ id: string | null; error: Error | null }> {
    if (!isFirebaseConfigured || !db) {
      return { id: null, error: new Error('Firebase Firestore belum dikonfigurasi.') };
    }

    try {
      const manifestCode = `MAN-${Math.floor(100000 + Math.random() * 900000)}`;
      const hash = `0x${Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

      const colRef = collection(db, 'wasteDeposits');
      const docRef = await addDoc(colRef, {
        userId,
        wasteCategory: trx.wasteType,
        weight: trx.weightKg,
        ratePerKg: trx.weightKg > 0 ? Math.round(trx.valueIdr / trx.weightKg) : 0,
        estimatedValue: trx.valueIdr,
        pointsEarned: trx.points,
        co2ReducedKg: trx.co2OffsetKg,
        waterSavedLiters: trx.waterSavedLiters,
        dropPointName: trx.dropPoint,
        proofPhotoUrl: trx.photoUrl || null,
        status: 'Diajukan', // Initial status enforced by security rules
        manifestCode,
        chainOfCustodyHash: hash,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      return { id: docRef.id, error: null };
    } catch (err: any) {
      return { id: null, error: err };
    }
  }
};
