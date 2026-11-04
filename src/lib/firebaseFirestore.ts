import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

export interface FirestoreUserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string | null;
  phone?: string | null;
  address?: string | null;
  role: string;
  ecoLevel: string;
  points: number;
  currentStreakDays: number;
  monthlyGoalKg: number;
  createdAt: Timestamp | any;
  updatedAt: Timestamp | any;
}

export interface FirestoreWasteDeposit {
  id?: string;
  userId: string;
  wasteCategory: string;
  weight: number;
  ratePerKg: number;
  estimatedValue: number;
  pointsEarned: number;
  co2ReducedKg: number;
  waterSavedLiters: number;
  dropPointName: string;
  photoUrl?: string | null;
  notes?: string;
  status: 'Diajukan' | 'Diterima' | 'Terverifikasi' | 'Ditolak';
  manifestCode: string;
  chainOfCustodyHash: string;
  createdAt: Timestamp | any;
  updatedAt?: Timestamp | any;
}

export interface FirestoreTransaction {
  id?: string;
  userId: string;
  depositId?: string;
  transactionType: 'DEPOSIT_CREDIT' | 'REWARD_REDEMPTION' | 'BONUS_CHALLENGE';
  amountRupiah: number;
  points: number;
  status: 'COMPLETED' | 'PENDING' | 'REJECTED';
  description: string;
  createdAt: Timestamp | any;
}

export interface FirestoreEcoPoints {
  userId: string;
  totalPoints: number;
  earnedPoints: number;
  redeemedPoints: number;
  updatedAt: Timestamp | any;
}

export interface FirestoreChallenge {
  id?: string;
  title: string;
  description: string;
  category: string;
  points: number;
  duration: string;
  badgeName: string;
  badgeIcon: string;
  status: 'ACTIVE' | 'ARCHIVED';
  startDate?: Timestamp | any;
  endDate?: Timestamp | any;
}

export interface FirestoreChallengeParticipant {
  id?: string;
  challengeId: string;
  userId: string;
  progressPercent: number;
  completed: boolean;
  completedAt?: Timestamp | any | null;
  tasksState: Array<{ id: string; text: string; done: boolean }>;
  updatedAt: Timestamp | any;
}

export interface FirestoreLeaderboardEntry {
  userId: string;
  displayName: string;
  photoURL?: string | null;
  ecoLevel: string;
  points: number;
  weightKg: number;
  badgesCount: number;
  rank?: number;
  updatedAt: Timestamp | any;
}

export const COLLECTIONS = {
  USERS: 'users',
  WASTE_DEPOSITS: 'wasteDeposits',
  TRANSACTIONS: 'transactions',
  ECO_POINTS: 'ecoPoints',
  CHALLENGES: 'challenges',
  CHALLENGE_PARTICIPANTS: 'challengeParticipants',
  WASTE_CATEGORIES: 'wasteCategories',
  EDUCATIONAL_CONTENT: 'educationalContent',
  NOTIFICATIONS: 'notifications',
  LEADERBOARD: 'leaderboard'
} as const;

export const firestoreService = {
  isConfigured: isFirebaseConfigured,

  // --- USER PROFILES ---
  async getUserProfile(uid: string): Promise<FirestoreUserProfile | null> {
    if (!db) return null;
    const docRef = doc(db, COLLECTIONS.USERS, uid);
    const snap = await getDoc(docRef);
    return snap.exists() ? (snap.data() as FirestoreUserProfile) : null;
  },

  async setUserProfile(uid: string, profile: Partial<FirestoreUserProfile>): Promise<void> {
    if (!db) return;
    const docRef = doc(db, COLLECTIONS.USERS, uid);
    await setDoc(docRef, {
      ...profile,
      uid,
      updatedAt: serverTimestamp(),
      createdAt: profile.createdAt || serverTimestamp()
    }, { merge: true });
  },

  // --- WASTE DEPOSITS ---
  async getUserDeposits(userId: string): Promise<FirestoreWasteDeposit[]> {
    if (!db) return [];
    const colRef = collection(db, COLLECTIONS.WASTE_DEPOSITS);
    const q = query(
      colRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as FirestoreWasteDeposit));
  },

  async createDeposit(deposit: Omit<FirestoreWasteDeposit, 'id' | 'createdAt'>): Promise<string> {
    if (!db) throw new Error('Firestore belum terhubung.');
    const colRef = collection(db, COLLECTIONS.WASTE_DEPOSITS);
    const docRef = await addDoc(colRef, {
      ...deposit,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  },

  // --- ECOPOINTS & WALLET ---
  async getEcoPoints(userId: string): Promise<FirestoreEcoPoints | null> {
    if (!db) return null;
    const docRef = doc(db, COLLECTIONS.ECO_POINTS, userId);
    const snap = await getDoc(docRef);
    return snap.exists() ? (snap.data() as FirestoreEcoPoints) : null;
  },

  // --- LEADERBOARD (SANITIZED PUBLIC) ---
  async getPublicLeaderboard(limitCount = 20): Promise<FirestoreLeaderboardEntry[]> {
    if (!db) return [];
    const colRef = collection(db, COLLECTIONS.LEADERBOARD);
    const q = query(colRef, orderBy('points', 'desc'), limit(limitCount));
    const snap = await getDocs(q);
    return snap.docs.map((d, index) => ({
      ...d.data(),
      userId: d.id,
      rank: index + 1
    } as FirestoreLeaderboardEntry));
  }
};
