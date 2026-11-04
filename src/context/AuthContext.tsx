import React, { createContext, useContext, useEffect, useState } from 'react';
import { updatePassword as fbUpdatePassword, User as FirebaseUser } from 'firebase/auth';
import { authService } from '../services/authService';
import { firebaseAuth } from '../lib/firebaseAuth';
import { isFirebaseConfigured, auth } from '../lib/firebase';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import { trackEvent } from '../lib/analytics';

export interface AppUser {
  id: string;
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
  emailVerified?: boolean;
}

export interface AuthContextType {
  user: AppUser | null;
  session: any | null;
  loading: boolean;
  isConfigured: boolean;
  provider: 'firebase' | 'supabase' | 'none';
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mapFirebaseUser = (fbUser: FirebaseUser): AppUser => ({
  id: fbUser.uid,
  uid: fbUser.uid,
  email: fbUser.email,
  displayName: fbUser.displayName,
  photoURL: fbUser.photoURL,
  user_metadata: {
    full_name: fbUser.displayName || undefined,
    avatar_url: fbUser.photoURL || undefined
  },
  emailVerified: fbUser.emailVerified
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Active provider: Prioritize Firebase, fallback to Supabase
  const activeProvider: 'firebase' | 'supabase' | 'none' = isFirebaseConfigured
    ? 'firebase'
    : isSupabaseConfigured
    ? 'supabase'
    : 'none';

  const isConfigured = activeProvider !== 'none';

  useEffect(() => {
    if (activeProvider === 'firebase') {
      // 1. Firebase Auth listener
      const unsubscribe = firebaseAuth.onAuthStateChange((fbUser) => {
        if (fbUser) {
          const mapped = mapFirebaseUser(fbUser);
          setUser(mapped);
          setSession({ user: mapped, provider: 'firebase' });
        } else {
          setUser(null);
          setSession(null);
        }
        setLoading(false);
      });

      return () => {
        unsubscribe();
      };
    } else if (activeProvider === 'supabase') {
      // 2. Supabase Auth fallback
      supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
        setSession(initialSession);
        if (initialSession?.user) {
          setUser({
            id: initialSession.user.id,
            uid: initialSession.user.id,
            email: initialSession.user.email ?? null,
            displayName: initialSession.user.user_metadata?.full_name ?? null,
            photoURL: initialSession.user.user_metadata?.avatar_url ?? null,
            user_metadata: initialSession.user.user_metadata,
            emailVerified: Boolean(initialSession.user.email_confirmed_at)
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
        setSession(currentSession);
        if (currentSession?.user) {
          setUser({
            id: currentSession.user.id,
            uid: currentSession.user.id,
            email: currentSession.user.email ?? null,
            displayName: currentSession.user.user_metadata?.full_name ?? null,
            photoURL: currentSession.user.user_metadata?.avatar_url ?? null,
            user_metadata: currentSession.user.user_metadata,
            emailVerified: Boolean(currentSession.user.email_confirmed_at)
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Neither configured
      setLoading(false);
    }
  }, [activeProvider]);

  const signInWithEmail = async (email: string, password: string) => {
    if (activeProvider === 'firebase') {
      const res = await authService.login(email, password);
      return { error: res.error };
    } else if (activeProvider === 'supabase') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    }
    return {
      error: new Error(
        'Layanan autentikasi cloud belum dikonfigurasi. Harap lengkapi variabel Firebase atau Supabase pada berkas .env Anda.'
      )
    };
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    if (activeProvider === 'firebase') {
      const res = await authService.register(email, password, fullName);
      return { error: res.error };
    } else if (activeProvider === 'supabase') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      return { error };
    }
    return {
      error: new Error(
        'Layanan autentikasi cloud belum dikonfigurasi. Harap lengkapi variabel Firebase atau Supabase pada berkas .env Anda.'
      )
    };
  };

  const signInWithGoogle = async () => {
    if (activeProvider === 'firebase') {
      const res = await authService.loginWithGoogle();
      return { error: res.error };
    } else if (activeProvider === 'supabase') {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      return { error };
    }
    return {
      error: new Error(
        'Google OAuth belum dikonfigurasi. Harap aktifkan Google Provider di konsol Firebase atau Supabase Anda.'
      )
    };
  };

  const signOut = async () => {
    if (activeProvider === 'firebase') {
      await authService.logout();
    } else if (activeProvider === 'supabase') {
      await supabase.auth.signOut();
    }
    trackEvent('logout');
    setUser(null);
    setSession(null);
  };

  const resetPassword = async (email: string) => {
    if (activeProvider === 'firebase') {
      return await authService.resetPassword(email);
    } else if (activeProvider === 'supabase') {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`
      });
      return { error };
    }
    return {
      error: new Error(
        'Layanan pemulihan kata sandi belum aktif. Hubungkan kredensial cloud di berkas .env.'
      )
    };
  };

  const updatePassword = async (newPassword: string) => {
    if (activeProvider === 'firebase') {
      if (auth && auth.currentUser) {
        try {
          await fbUpdatePassword(auth.currentUser, newPassword);
          return { error: null };
        } catch (err: any) {
          return { error: err };
        }
      }
      return { error: new Error('Tidak ada sesi pengguna aktif untuk memperbarui sandi.') };
    } else if (activeProvider === 'supabase') {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      return { error };
    }
    return { error: new Error('Layanan autentikasi belum dikonfigurasi.') };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isConfigured,
        provider: activeProvider,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        resetPassword,
        updatePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
