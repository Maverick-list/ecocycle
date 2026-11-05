import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PageTransition } from '../../components/ui/PageTransition';
import { Icon } from '../../components/ui/Icon';
import { EcocycleLogo } from '../../components/brand/EcocycleLogo';
import { SEOHead } from '../../components/seo/SEOHead';

export const SignUpPage: React.FC = () => {
  const { signUpWithEmail, signInWithGoogle, signInWithFacebook } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Kata sandi minimal 6 karakter.');
      return;
    }

    if (!agreed) {
      setErrorMessage('Harap setujui komitmen pemilahan dan etika data ECOCYCLE.');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUpWithEmail(email, password, fullName);
      if (error) {
        setErrorMessage(error.message || 'Pendaftaran gagal.');
      } else {
        navigate('/profil', { replace: true });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan sistem saat mendaftar.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setErrorMessage(error.message);
      } else {
        navigate('/profil', { replace: true });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal mendaftar dengan Google.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignUp = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const { error } = await signInWithFacebook();
      if (error) {
        setErrorMessage(error.message);
      } else {
        navigate('/profil', { replace: true });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal mendaftar dengan Facebook.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition className="w-full min-h-screen bg-surface dark:bg-[#03140d] text-on-surface dark:text-white py-10 sm:py-16 transition-colors duration-300">
      <SEOHead
        title="Daftar Akun Sirkular Baru"
        canonical="/daftar"
        description="Daftar akun ECOCYCLE untuk mulai menyetor sampah, menabung saldo rupiah, dan berkontribusi pada ekonomi sirkular Indonesia."
        noindex={true}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: COMPELLING VALUE PROPOSITIONS & HOOKS */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Header & Logo */}
            <div className="space-y-4">
              <Link to="/" className="inline-block hover:opacity-90 transition-opacity" title="Kembali ke Beranda ECOCYCLE">
                <EcocycleLogo size="lg" showTagline={true} />
              </Link>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-black uppercase tracking-wider text-secondary">
                <Icon name="verified" size={15} />
                <span>Pendaftaran Terbuka • Akses Instan ke Seluruh Fitur</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-white tracking-tight leading-tight">
                <span className="animate-title-flow">Mulai Dari Rumah</span>, Rasakan Berkahnya
              </h1>

              <p className="font-sans text-base sm:text-lg text-on-surface-variant dark:text-emerald-100/80 leading-relaxed max-w-xl">
                Bergabunglah bersama ribuan warga pelopor ekonomi sirkular Indonesia. Ubah tumpukan sampah anorganik rumah tangga menjadi tabungan rupiah nyata dan jejak kebaikan lingkungan.
              </p>
            </div>

            {/* 4 Compelling Hook Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4.5 rounded-2xl glass-panel border border-secondary/20 hover:border-secondary/40 transition-all space-y-1.5 group">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-sm">
                    <Icon name="card_giftcard" size={17} />
                  </div>
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-primary dark:text-white">
                    Bonus Sambutan +50 EcoPoints
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant dark:text-emerald-100/75 leading-relaxed">
                  Bonus langsung dikreditkan pada setoran mandiri perdana Anda di drop-point terdekat.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl glass-panel border border-secondary/20 hover:border-secondary/40 transition-all space-y-1.5 group">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-sm">
                    <Icon name="bolt" size={17} />
                  </div>
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-primary dark:text-white">
                    Pencairan 0% Biaya Admin
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant dark:text-emerald-100/75 leading-relaxed">
                  Konversi saldo ke GoPay, OVO, DANA, ShopeePay, serta transfer perbankan tanpa potongan.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl glass-panel border border-secondary/20 hover:border-secondary/40 transition-all space-y-1.5 group">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-sm">
                    <Icon name="verified" size={17} />
                  </div>
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-primary dark:text-white">
                    Sertifikat Audit Karbon
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant dark:text-emerald-100/75 leading-relaxed">
                  Dapatkan sertifikat resmi reduksi emisi CO₂e berbasis EPA WARM untuk portofolio hijau.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl glass-panel border border-secondary/20 hover:border-secondary/40 transition-all space-y-1.5 group">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-sm">
                    <Icon name="security" size={17} />
                  </div>
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-primary dark:text-white">
                    Privasi Mutlak Terlindungi
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant dark:text-emerald-100/75 leading-relaxed">
                  Data diri, nomor telepon, dan lokasi penjemputan aman dengan arsitektur Row Level Security.
                </p>
              </div>
            </div>

            {/* Social Proof Strip */}
            <div className="p-4.5 rounded-2xl bg-gradient-to-r from-secondary/15 via-secondary/5 to-transparent border border-secondary/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
                  </span>
                  <span className="text-xs font-black text-secondary uppercase tracking-wider">Bergabung Hari Ini</span>
                </div>
                <p className="text-xs text-on-surface-variant dark:text-emerald-100/80">
                  <strong className="text-primary dark:text-white font-extrabold">1.482+ Mitra Warga</strong> telah terhubung di 12 titik drop-point aktif.
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold shrink-0">
                <Icon name="check_circle" size={14} />
                <span>Verifikasi SNI & EPA WARM</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: APPLE-STYLE FROSTED GLASS SIGN UP CARD */}
          <div className="lg:col-span-5 w-full">
            <div className="glass-panel-elevated p-6 sm:p-9 rounded-4xl space-y-6 border border-outline-variant/30 dark:border-emerald-500/25 shadow-2xl relative overflow-hidden">
              
              {/* Top Soft Gradient Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

              <div className="text-center space-y-1.5 pt-1">
                <h2 className="font-display font-black text-2xl sm:text-3xl text-primary dark:text-white tracking-tight">
                  Daftar Akun Baru
                </h2>
                <p className="text-xs text-on-surface-variant dark:text-emerald-100/75">
                  Proses cepat, gratis, dan langsung aktif
                </p>
              </div>

              {/* Social Fast Sign Up Buttons: Google & Facebook */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  disabled={isLoading}
                  className="h-11 rounded-2xl glass-pill hover:bg-surface-container border border-outline-variant/30 text-xs font-extrabold text-primary flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm hover:scale-[1.01] active:scale-[0.98]"
                >
                  <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24">
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
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={handleFacebookSignUp}
                  disabled={isLoading}
                  className="h-11 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm hover:scale-[1.01] active:scale-[0.98]"
                >
                  <svg className="w-4.5 h-4.5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </button>
              </div>

              {/* Soft Gradient Separator */}
              <div className="w-full flex items-center justify-center my-3 pointer-events-none">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-error/15 text-error text-xs flex items-start gap-2.5 animate-fadeIn border border-error/20">
                  <Icon name="alert" size={16} className="text-error shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-3.5 text-outline">
                      <Icon name="user" size={16} />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Pratama Kusuma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 rounded-xl glass-panel text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary/50 border border-outline-variant/25 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                    Alamat Surel (Email)
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-3.5 text-outline">
                      <Icon name="mail" size={16} />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 rounded-xl glass-panel text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary/50 border border-outline-variant/25 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-3.5 text-outline">
                      <Icon name="lock" size={16} />
                    </div>
                    <input
                      type="password"
                      required
                      placeholder="Minimal 6 karakter"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 rounded-xl glass-panel text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary/50 border border-outline-variant/25 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                    Ulangi Kata Sandi
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-3.5 text-outline">
                      <Icon name="verified" size={16} />
                    </div>
                    <input
                      type="password"
                      required
                      placeholder="Masukkan ulang kata sandi"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 rounded-xl glass-panel text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary/50 border border-outline-variant/25 transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="agree-checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 rounded accent-secondary cursor-pointer"
                  />
                  <label htmlFor="agree-checkbox" className="text-[11px] text-on-surface-variant leading-relaxed cursor-pointer">
                    Saya berkomitmen untuk memilah sampah rumah tangga secara higienis dan mematuhi etika tata kelola sirkular ECOCYCLE.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-secondary text-white font-extrabold text-xs hover:bg-secondary/90 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 mt-4 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Daftar Akun Baru</span>
                      <Icon name="arrow_forward" size={15} />
                    </>
                  )}
                </button>
              </form>

              {/* Soft Gradient Separator */}
              <div className="w-full flex items-center justify-center my-3 pointer-events-none">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />
              </div>

              {/* Switch to Sign In */}
              <div className="text-center text-xs text-on-surface-variant">
                <span>Sudah memiliki akun? </span>
                <Link to="/masuk" className="font-bold text-secondary hover:underline">
                  Masuk di Sini
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};
