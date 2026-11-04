import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PageTransition } from '../../components/ui/PageTransition';
import { Icon } from '../../components/ui/Icon';
import { EcocycleLogo } from '../../components/brand/EcocycleLogo';

export const SignInPage: React.FC = () => {
  const { signInWithEmail, signInWithGoogle, isConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || '/profil';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const { error } = await signInWithEmail(email, password);
      if (error) {
        setErrorMessage(error.message || 'Gagal masuk. Periksa kembali email dan kata sandi Anda.');
      } else {
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan sistem saat proses masuk.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setErrorMessage(error.message);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memulai login Google OAuth.');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-md w-full space-y-6">
          
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-block">
              <EcocycleLogo size="lg" showTagline={true} />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight pt-2">
              Masuk ke Akun Anda
            </h1>
            <p className="text-xs text-on-surface-variant">
              Akses buku tabungan digital, portofolio reduksi emisi, dan lencana sirkular Anda.
            </p>
          </div>

          {/* Setup Notice if Supabase keys not set */}
          {!isConfigured && (
            <div className="p-4 rounded-2xl bg-secondary-fixed/30 border border-secondary/30 text-xs text-secondary space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <Icon name="info" size={16} />
                <span>Panduan Integrasi Supabase Auth</span>
              </div>
              <p className="text-[11px] leading-relaxed text-on-surface-variant">
                Fitur autentikasi riil menggunakan Supabase Auth telah siap. Untuk mengaktifkan sesi cloud riil, tambahkan variabel berikut pada berkas <code>.env</code> Anda:
              </p>
              <div className="p-2.5 rounded-lg bg-surface font-mono text-[10px] text-primary select-all overflow-x-auto border border-outline-variant/30">
                VITE_SUPABASE_URL=https://[YOUR_PROJECT].supabase.co<br />
                VITE_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
              </div>
            </div>
          )}

          {/* Glass Form Container */}
          <div className="glass-panel-elevated p-6 sm:p-8 rounded-3xl space-y-5 border border-outline-variant/30 shadow-xl">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-error-container text-on-error-container text-xs flex items-start gap-2 animate-fadeIn">
                <Icon name="alert" size={16} className="text-error shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">
                  Alamat Surel (Email)
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-outline">
                    <Icon name="mail" size={16} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-surface-container text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/20"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase">
                    Kata Sandi
                  </label>
                  <Link
                    to="/lupa-password"
                    className="text-[11px] font-bold text-secondary hover:underline"
                  >
                    Lupa sandi?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-outline">
                    <Icon name="verified" size={16} />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-surface-container text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-surface border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Masuk ke Akun</span>
                    <Icon name="arrow_forward" size={14} />
                  </>
                )}
              </button>
            </form>

            {/* Social Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-outline-variant/30 w-full" />
              <span className="bg-surface px-3 text-[10px] text-outline font-bold uppercase tracking-wider relative">
                atau
              </span>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full h-11 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-xs font-bold text-primary flex items-center justify-center gap-2.5 cursor-pointer transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Masuk dengan Google</span>
            </button>
          </div>

          {/* Switch to Sign Up */}
          <div className="text-center text-xs text-on-surface-variant">
            <span>Belum memiliki akun ECOCYCLE? </span>
            <Link to="/daftar" className="font-bold text-secondary hover:underline">
              Daftar Sekarang
            </Link>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};
