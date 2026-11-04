import { firebaseAuth } from '../lib/firebaseAuth';
import { trackEvent } from '../lib/analytics';

export interface AuthResponse {
  user: any | null;
  error: Error | null;
}

export const authService = {
  isConfigured: firebaseAuth.isConfigured,

  /**
   * Register with email and password
   */
  async register(email: string, pass: string, fullName: string): Promise<AuthResponse> {
    try {
      const cred = await firebaseAuth.register(email, pass, fullName);
      trackEvent('sign_up', { method: 'email' });
      return { user: cred.user, error: null };
    } catch (err: any) {
      return { user: null, error: err };
    }
  },

  /**
   * Log in with email and password
   */
  async login(email: string, pass: string): Promise<AuthResponse> {
    try {
      const cred = await firebaseAuth.login(email, pass);
      trackEvent('login', { method: 'email' });
      return { user: cred.user, error: null };
    } catch (err: any) {
      return { user: null, error: err };
    }
  },

  /**
   * Official Google OAuth Sign In
   */
  async loginWithGoogle(): Promise<AuthResponse> {
    try {
      const cred = await firebaseAuth.loginWithGoogle();
      trackEvent('login', { method: 'google' });
      trackEvent('google_sign_in');
      return { user: cred.user, error: null };
    } catch (err: any) {
      return { user: null, error: err };
    }
  },

  /**
   * Send password reset email
   */
  async resetPassword(email: string): Promise<{ error: Error | null }> {
    try {
      await firebaseAuth.resetPassword(email);
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  },

  /**
   * Sign out current user
   */
  async logout(): Promise<void> {
    await firebaseAuth.logout();
  },

  /**
   * Subscribe to auth state changes
   */
  onAuthStateChange(callback: (user: any | null) => void) {
    return firebaseAuth.onAuthStateChange(callback);
  }
};
