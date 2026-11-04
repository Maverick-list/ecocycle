import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile as firebaseUpdateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
  NextOrObserver
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebase';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const firebaseAuth = {
  isConfigured: isFirebaseConfigured,

  /**
   * Subscribe to auth state changes
   */
  onAuthStateChange(callback: NextOrObserver<FirebaseUser | null>) {
    if (!auth) {
      if (typeof callback === 'function') callback(null);
      return () => {};
    }
    return onAuthStateChanged(auth, callback);
  },

  /**
   * Register with email and password
   */
  async register(email: string, pass: string, displayName?: string) {
    if (!auth) throw new Error('Firebase Auth belum dikonfigurasi. Periksa kredensial .env.');
    const userCred = await createUserWithEmailAndPassword(auth, email, pass);
    if (displayName && userCred.user) {
      await firebaseUpdateProfile(userCred.user, { displayName });
    }
    // Automatically trigger verification email
    try {
      await sendEmailVerification(userCred.user);
    } catch (verifErr) {
      console.warn('[Firebase Auth] Verification email could not be sent immediately:', verifErr);
    }
    return userCred;
  },

  /**
   * Sign in with email and password
   */
  async login(email: string, pass: string) {
    if (!auth) throw new Error('Firebase Auth belum dikonfigurasi. Periksa kredensial .env.');
    return await signInWithEmailAndPassword(auth, email, pass);
  },

  /**
   * Sign in with official Google OAuth provider
   */
  async loginWithGoogle() {
    if (!auth) throw new Error('Firebase Auth belum dikonfigurasi. Aktifkan Google Provider di konsol Firebase.');
    return await signInWithPopup(auth, googleProvider);
  },

  /**
   * Logout current session
   */
  async logout() {
    if (!auth) return;
    await firebaseSignOut(auth);
  },

  /**
   * Send password recovery email
   */
  async resetPassword(email: string) {
    if (!auth) throw new Error('Firebase Auth belum dikonfigurasi.');
    await sendPasswordResetEmail(auth, email);
  },

  /**
   * Send verification email to currently authenticated user
   */
  async sendVerification() {
    if (!auth || !auth.currentUser) throw new Error('Pengguna tidak aktif.');
    await sendEmailVerification(auth.currentUser);
  },

  /**
   * Get current auth user
   */
  getCurrentUser(): FirebaseUser | null {
    return auth ? auth.currentUser : null;
  }
};
