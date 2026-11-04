import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

// Verified standard emission factors (kg CO2e per kg material)
const CO2_FACTORS: Record<string, number> = {
  'Plastik PET': 1.5,
  'Kardus & Kertas': 0.8,
  'Kaleng Logam': 2.1,
  'Minyak Jelantah': 2.8,
  'Kaca & Botol Beling': 0.3,
  'Elektronik Ringan (E-Waste)': 3.5,
};

// Configurable standard rates per kg (IDR)
const RATE_PER_KG: Record<string, number> = {
  'Plastik PET': 4500,
  'Kardus & Kertas': 2200,
  'Kaleng Logam': 14000,
  'Minyak Jelantah': 7500,
  'Kaca & Botol Beling': 800,
  'Elektronik Ringan (E-Waste)': 25000,
};

// Points multiplier: 10 points per 1,000 IDR of value
const POINTS_PER_KG: Record<string, number> = {
  'Plastik PET': 45,
  'Kardus & Kertas': 22,
  'Kaleng Logam': 140,
  'Minyak Jelantah': 75,
  'Kaca & Botol Beling': 8,
  'Elektronik Ringan (E-Waste)': 250,
};

/**
 * 1. Server-side validation and processing of waste deposits
 * Never trusts client-side value calculations or reward points.
 */
export const processWasteDeposit = functions.firestore
  .document('wasteDeposits/{depositId}')
  .onCreate(async (snap, context) => {
    const depositId = context.params.depositId;
    const data = snap.data();

    if (!data || !data.userId || !data.weight || data.weight <= 0) {
      console.warn(`[Functions] Invalid deposit ${depositId}: missing or invalid weight.`);
      return null;
    }

    const userId = data.userId;
    const category = data.wasteCategory || 'Plastik PET';
    const weight = Number(data.weight);

    // Compute trustworthy values server-side
    const standardRate = RATE_PER_KG[category] || 3000;
    const serverEstimatedValue = Math.round(weight * standardRate);
    const pointsFactor = POINTS_PER_KG[category] || 30;
    const serverPointsEarned = Math.round(weight * pointsFactor);
    const co2Factor = CO2_FACTORS[category] || 1.0;
    const serverCo2Reduced = parseFloat((weight * co2Factor).toFixed(2));
    const serverWaterSaved = Math.round(weight * 24);

    return db.runTransaction(async (transaction) => {
      // 1. Check idempotency: ensure transaction for this deposit doesn't already exist
      const existingTxQuery = await transaction.get(
        db.collection('transactions').where('depositId', '==', depositId).limit(1)
      );

      if (!existingTxQuery.empty) {
        console.warn(`[Functions] Duplicate transaction detected for deposit ${depositId}. Aborting.`);
        return;
      }

      // 2. Fetch User Profile
      const userRef = db.collection('users').doc(userId);
      const userSnap = await transaction.get(userRef);
      const userData = userSnap.data() || {};

      const currentPoints = Number(userData.points || 0);
      const newPoints = currentPoints + serverPointsEarned;

      // 3. Update Deposit with verified server calculation
      transaction.update(snap.ref, {
        ratePerKg: standardRate,
        estimatedValue: serverEstimatedValue,
        pointsEarned: serverPointsEarned,
        co2ReducedKg: serverCo2Reduced,
        waterSavedLiters: serverWaterSaved,
        status: 'Terverifikasi',
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // 4. Create Ledger Entry in transactions
      const txRef = db.collection('transactions').doc();
      transaction.set(txRef, {
        userId,
        depositId,
        transactionType: 'DEPOSIT_CREDIT',
        amountRupiah: serverEstimatedValue,
        points: serverPointsEarned,
        status: 'COMPLETED',
        description: `Setoran ${weight} kg ${category} terverifikasi`,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // 5. Update EcoPoints Wallet
      const pointsRef = db.collection('ecoPoints').doc(userId);
      const pointsSnap = await transaction.get(pointsRef);
      const pointsData = pointsSnap.data() || { earnedPoints: 0, redeemedPoints: 0 };

      transaction.set(
        pointsRef,
        {
          userId,
          totalPoints: newPoints,
          earnedPoints: (pointsData.earnedPoints || 0) + serverPointsEarned,
          redeemedPoints: pointsData.redeemedPoints || 0,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      // 6. Update User Profile
      transaction.update(userRef, {
        points: newPoints,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // 7. Update Sanitized Public Leaderboard Document
      const leaderboardRef = db.collection('leaderboard').doc(userId);
      transaction.set(
        leaderboardRef,
        {
          userId,
          displayName: userData.displayName || 'Pahlawan Sirkular',
          photoURL: userData.photoURL || null,
          ecoLevel: userData.ecoLevel || 'Warga Sirkular',
          points: newPoints,
          weightKg: admin.firestore.FieldValue.increment(weight),
          badgesCount: userData.badgesCount || 1,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      console.info(`[Functions] Deposit ${depositId} successfully verified for user ${userId}. Credited ${serverPointsEarned} points.`);
    });
  });

/**
 * 2. Automatic provisioning of user profile on Firebase Auth sign up
 */
export const onUserSignUp = functions.auth.user().onCreate(async (user) => {
  const userRef = db.collection('users').doc(user.uid);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    await userRef.set({
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || 'Warga Baru ECOCYCLE',
      photoURL: user.photoURL || null,
      role: 'Warga Sirkular',
      ecoLevel: 'Inisiator Hijau',
      points: 0,
      currentStreakDays: 1,
      monthlyGoalKg: 15,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Initialize ecoPoints wallet
    await db.collection('ecoPoints').doc(user.uid).set({
      userId: user.uid,
      totalPoints: 0,
      earnedPoints: 0,
      redeemedPoints: 0,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.info(`[Functions] Profile and wallet initialized for new user ${user.uid}`);
  }
});
