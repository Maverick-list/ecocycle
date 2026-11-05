import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PageTransition } from '../../components/ui/PageTransition';
import { Icon } from '../../components/ui/Icon';
import { EcocycleLogo } from '../../components/brand/EcocycleLogo';
import { SEOHead } from '../../components/seo/SEOHead';

type AuthTab = 'google' | 'facebook' | 'email' | 'phone';

export const SignInPage: React.FC = () => {
  const { signInWithEmail, signInWithGoogle, signInWithFacebook, sendPhoneOtp, verifyPhoneOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<AuthTab>('google');
  
  // Email form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Phone form state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [confirmationId, setConfirmationId] = useState('');
  const [simulatedOtpNotice, setSimulatedOtpNotice] = useState<string | null>(null);
  const [resendCountdown, setResendCountdown] = useState(0);

  // General state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const from = (location.state as any)?.from?.pathname || '/profil';

  // Resend OTP countdown timer
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setInterval(() => {
      setResendCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCountdown]);

  // Handle Email Submit
  const handleEmailSubmit = async (e: React.FormEvent) => {
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

  // Handle Google Submit
  const handleGoogleSubmit = async (customEmail?: string, customName?: string) => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle(customEmail, customName);
      if (error) {
        setErrorMessage(error.message);
      } else {
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memulai login Google.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Facebook Submit
  const handleFacebookSubmit = async (customEmail?: string, customName?: string) => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const { error } = await signInWithFacebook(customEmail, customName);
      if (error) {
        setErrorMessage(error.message);
      } else {
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memulai login Facebook.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Send Phone OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const formatted = phoneNumber.trim().startsWith('0')
        ? phoneNumber.trim()
        : `0${phoneNumber.trim()}`;

      const { confirmationId: confId, simulatedOtp, error } = await sendPhoneOtp(formatted);
      if (error) {
        setErrorMessage(error.message);
      } else {
        setConfirmationId(confId);
        setOtpSent(true);
        setSimulatedOtpNotice(simulatedOtp);
        setResendCountdown(60);
        setSuccessMessage(`Kode OTP berhasil dikirimkan ke nomor ${formatted}`);
        // Focus first OTP input
        setTimeout(() => {
          otpInputsRef.current[0]?.focus();
        }, 150);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal mengirim kode verifikasi SMS.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    // Auto-advance
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }

    // Auto-submit if all 6 digits filled
    if (newDigits.every(d => d !== '') && index === 5) {
      const fullOtp = newDigits.join('');
      submitOtpVerification(fullOtp);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // Verify Phone OTP
  const submitOtpVerification = async (otpCode: string) => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const { error } = await verifyPhoneOtp(confirmationId, otpCode, phoneNumber);
      if (error) {
        setErrorMessage(error.message);
      } else {
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memverifikasi OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition className="w-full min-h-screen bg-surface dark:bg-[#03140d] text-on-surface dark:text-white py-10 sm:py-16 transition-colors duration-300">
      <SEOHead
        title="Masuk ke Akun Sirkular Anda"
        canonical="/masuk"
        description="Masuk dengan Google, Email, atau Nomor Telepon untuk mengakses dasbor tabungan sirkular, reduksi emisi, dan penarikan saldo."
        noindex={true}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: HIGH-CONVERTING HOOKS & VALUE PROPOSITIONS */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Header & Logo */}
            <div className="space-y-4">
              <Link to="/" className="inline-block hover:opacity-90 transition-opacity" title="Kembali ke Beranda ECOCYCLE">
                <EcocycleLogo size="lg" showTagline={true} />
              </Link>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-black uppercase tracking-wider text-secondary">
                <Icon name="verified" size={15} />
                <span>Ekosistem Sirkular Terpercaya #1 Indonesia</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-white tracking-tight leading-tight">
                <span className="animate-title-flow">Ubah Sampah Jadi Saldo</span> & Lindungi Bumi
              </h1>

              <p className="font-sans text-base sm:text-lg text-on-surface-variant dark:text-emerald-100/80 leading-relaxed max-w-xl">
                Akses buku tabungan sirkular digital Anda. Setorkan material terpilah, pantau reduksi emisi karbon berstandar ilmiah, dan cairkan insentif rupiah langsung ke e-wallet favorit Anda.
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
                    Bonus +50 EcoPoints
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant dark:text-emerald-100/75 leading-relaxed">
                  Dapatkan reward instan pada setoran pertama untuk mempercepat pencairan saldo perdana Anda.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl glass-panel border border-secondary/20 hover:border-secondary/40 transition-all space-y-1.5 group">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-sm">
                    <Icon name="bolt" size={17} />
                  </div>
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-primary dark:text-white">
                    Pencairan 0% Biaya
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant dark:text-emerald-100/75 leading-relaxed">
                  Tarik saldo ke GoPay, OVO, DANA, ShopeePay, serta BCA/Mandiri tanpa potongan sepeserpun.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl glass-panel border border-secondary/20 hover:border-secondary/40 transition-all space-y-1.5 group">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-sm">
                    <Icon name="verified" size={17} />
                  </div>
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-primary dark:text-white">
                    Audit Karbon Resmi
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant dark:text-emerald-100/75 leading-relaxed">
                  Metodologi ilmiah US EPA WARM v15 menerbitkan sertifikat reduksi emisi terverifikasi.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl glass-panel border border-secondary/20 hover:border-secondary/40 transition-all space-y-1.5 group">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-sm">
                    <Icon name="security" size={17} />
                  </div>
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-primary dark:text-white">
                    Keamanan Row-Level (RLS)
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant dark:text-emerald-100/75 leading-relaxed">
                  Data nomor telepon, alamat, dan transaksi Anda terenkripsi penuh tanpa risiko kebocoran.
                </p>
              </div>
            </div>

            {/* Social Proof & Citizen Testimonial Strip */}
            <div className="p-4.5 rounded-2xl bg-gradient-to-r from-secondary/15 via-secondary/5 to-transparent border border-secondary/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
                  </span>
                  <span className="text-xs font-black text-secondary uppercase tracking-wider">Komunitas Aktif</span>
                </div>
                <p className="text-xs text-on-surface-variant dark:text-emerald-100/80">
                  <strong className="text-primary dark:text-white font-extrabold">1.482+ Warga</strong> telah mendaur ulang <strong className="text-primary dark:text-white font-extrabold">28.420 kg</strong> material.
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold shrink-0">
                <Icon name="check_circle" size={14} />
                <span>Terverifikasi SNI & EPA WARM</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: APPLE-STYLE FROSTED GLASS AUTH CARD */}
          <div className="lg:col-span-5 w-full">
            <div className="glass-panel-elevated p-6 sm:p-9 rounded-4xl space-y-6 border border-outline-variant/30 dark:border-emerald-500/25 shadow-2xl relative overflow-hidden">
              
              {/* Top Soft Gradient Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

              <div className="text-center space-y-1.5 pt-1">
                <h2 className="font-display font-black text-2xl sm:text-3xl text-primary dark:text-white tracking-tight">
                  Masuk ke Akun
                </h2>
                <p className="text-xs text-on-surface-variant dark:text-emerald-100/75">
                  Pilih metode autentikasi yang paling nyaman bagi Anda
                </p>
              </div>

              {/* Segmented Control Tabs */}
              <div className="relative flex p-1.5 rounded-2xl bg-surface-container/70 dark:bg-[#072418]/70 border border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => { setActiveTab('google'); setErrorMessage(null); }}
                  className={`flex-1 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === 'google'
                      ? 'bg-surface dark:bg-[#0b3323] text-primary dark:text-white shadow-sm font-extrabold ring-1 ring-emerald-500/30'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('facebook'); setErrorMessage(null); }}
                  className={`flex-1 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === 'facebook'
                      ? 'bg-surface dark:bg-[#0b3323] text-[#1877F2] dark:text-[#4294ff] shadow-sm font-extrabold ring-1 ring-[#1877F2]/40'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span>Facebook</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('email'); setErrorMessage(null); }}
                  className={`flex-1 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === 'email'
                      ? 'bg-surface dark:bg-[#0b3323] text-primary dark:text-white shadow-sm font-extrabold ring-1 ring-emerald-500/30'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span>Email</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('phone'); setErrorMessage(null); }}
                  className={`flex-1 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === 'phone'
                      ? 'bg-surface dark:bg-[#0b3323] text-primary dark:text-white shadow-sm font-extrabold ring-1 ring-emerald-500/30'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span>Telepon</span>
                </button>
              </div>

              {/* Error & Success Alerts */}
              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-error/15 text-error text-xs flex items-start gap-2.5 animate-fadeIn border border-error/20">
                  <Icon name="alert" size={16} className="text-error shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-3.5 rounded-2xl bg-secondary/15 text-secondary text-xs flex items-start gap-2.5 animate-fadeIn border border-secondary/20">
                  <Icon name="verified" size={16} className="text-secondary shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </div>
              )}

            {/* TAB 1: GOOGLE AUTH */}
            {activeTab === 'google' && (
              <div className="space-y-4 pt-1 animate-fadeIn">
                <p className="text-xs text-on-surface-variant text-center leading-relaxed">
                  Masuk instan menggunakan Akun Google Anda tanpa perlu mengingat kata sandi.
                </p>

                <button
                  type="button"
                  onClick={() => handleGoogleSubmit()}
                  disabled={isLoading}
                  className="w-full h-12 rounded-2xl glass-pill hover:bg-surface-container border border-outline-variant/30 text-xs font-extrabold text-primary flex items-center justify-center gap-3 cursor-pointer transition-all shadow-sm hover:scale-[1.01] active:scale-[0.98]"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
                  <span>Lanjutkan dengan Google</span>
                </button>

                {/* Soft Gradient Separator */}
                <div className="w-full flex items-center justify-center my-3 pointer-events-none">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />
                </div>

                {/* Quick Profile Selectors for Instant Evaluation */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-outline block text-center">
                    Pilih Profil Google Terdaftar
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      onClick={() => handleGoogleSubmit('pratama.kusuma@gmail.com', 'Pratama Kusuma')}
                      className="p-2.5 rounded-xl glass-panel hover:bg-secondary/10 border border-outline-variant/15 flex items-center justify-between text-left text-xs transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-xs shrink-0">
                          P
                        </div>
                        <div className="truncate">
                          <p className="font-bold text-primary truncate">Pratama Kusuma</p>
                          <p className="text-[10px] text-on-surface-variant truncate">pratama.kusuma@gmail.com</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-secondary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        Pilih →
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleGoogleSubmit('siti.rahmawati@gmail.com', 'Siti Rahmawati')}
                      className="p-2.5 rounded-xl glass-panel hover:bg-secondary/10 border border-outline-variant/15 flex items-center justify-between text-left text-xs transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-xs shrink-0">
                          S
                        </div>
                        <div className="truncate">
                          <p className="font-bold text-primary truncate">Siti Rahmawati</p>
                          <p className="text-[10px] text-on-surface-variant truncate">siti.rahmawati@gmail.com</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-secondary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        Pilih →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: FACEBOOK AUTH */}
            {activeTab === 'facebook' && (
              <div className="space-y-4 pt-1 animate-fadeIn">
                <p className="text-xs text-on-surface-variant text-center leading-relaxed">
                  Masuk aman & terhubung instan melalui akun Facebook Anda.
                </p>

                <button
                  type="button"
                  onClick={() => handleFacebookSubmit()}
                  disabled={isLoading}
                  className="w-full h-12 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-extrabold flex items-center justify-center gap-3 cursor-pointer transition-all shadow-md hover:scale-[1.01] active:scale-[0.98]"
                >
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Lanjutkan dengan Facebook</span>
                </button>

                {/* Soft Gradient Separator */}
                <div className="w-full flex items-center justify-center my-3 pointer-events-none">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />
                </div>

                {/* Quick Profile Selectors for Instant Evaluation */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-outline block text-center">
                    Pilih Profil Facebook Terdaftar
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      onClick={() => handleFacebookSubmit('rian.kusuma@facebook.com', 'Rian Pratama')}
                      className="p-2.5 rounded-xl glass-panel hover:bg-[#1877F2]/10 border border-outline-variant/15 flex items-center justify-between text-left text-xs transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-7 h-7 rounded-full bg-[#1877F2]/20 flex items-center justify-center text-[#1877F2] font-bold text-xs shrink-0">
                          R
                        </div>
                        <div className="truncate">
                          <p className="font-bold text-primary truncate">Rian Pratama (Facebook Connect)</p>
                          <p className="text-[10px] text-on-surface-variant truncate">rian.kusuma@facebook.com</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#1877F2] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        Pilih →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: EMAIL AUTH */}
            {activeTab === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-4 pt-1 animate-fadeIn">
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
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-outline uppercase tracking-wider">
                      Kata Sandi
                    </label>
                    <Link
                      to="/lupa-password"
                      className="text-xs font-bold text-secondary hover:underline"
                    >
                      Lupa sandi?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute left-3.5 top-3.5 text-outline">
                      <Icon name="lock" size={16} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Minimal 6 karakter"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-11 pl-10 pr-10 rounded-xl glass-panel text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary/50 border border-outline-variant/25 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-outline hover:text-on-surface transition-colors cursor-pointer"
                    >
                      <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={16} />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-xl bg-secondary text-white font-extrabold text-xs hover:bg-secondary/90 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 mt-4 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Masuk ke Akun</span>
                      <Icon name="arrow_forward" size={14} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 3: PHONE NUMBER AUTH (SMS OTP) */}
            {activeTab === 'phone' && (
              <div className="space-y-4 pt-1 animate-fadeIn">
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold text-outline uppercase tracking-wider">
                          Nomor Handphone / WhatsApp
                        </label>
                        <button
                          type="button"
                          onClick={() => setPhoneNumber('081234567890')}
                          className="text-[10px] font-bold text-secondary hover:underline cursor-pointer"
                        >
                          Gunakan Contoh: 081234567890
                        </button>
                      </div>
                      <div className="relative flex items-center">
                        <div className="absolute left-3.5 text-xs font-bold text-primary flex items-center gap-1.5 select-none pointer-events-none">
                          <span>🇮🇩</span>
                          <span>+62</span>
                        </div>
                        <input
                          type="tel"
                          required
                          placeholder="812-3456-7890"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full h-11 pl-16 pr-4 rounded-xl glass-panel text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary/50 border border-outline-variant/25 transition-all font-mono"
                        />
                      </div>
                      <p className="text-[11px] text-on-surface-variant mt-1.5">
                        Kami akan mengirimkan 6 digit kode OTP verifikasi melalui SMS / WhatsApp.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-11 rounded-xl bg-secondary text-white font-extrabold text-xs hover:bg-secondary/90 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Icon name="sms" size={15} />
                          <span>Kirim Kode OTP</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="text-center space-y-1">
                      <p className="text-xs font-bold text-primary">
                        Masukkan 6 Digit Kode OTP
                      </p>
                      <p className="text-[11px] text-on-surface-variant">
                        Terkirim ke <span className="font-mono font-bold text-primary">{phoneNumber}</span>
                      </p>
                    </div>

                    {/* Demonstration OTP Helper Banner with 1-Click AutoFill */}
                    {simulatedOtpNotice && (
                      <div className="p-3.5 rounded-2xl bg-secondary/10 border border-secondary/30 text-center space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                          <p className="text-[10px] uppercase tracking-wider font-extrabold text-secondary">
                            Kode OTP Verifikasi Anda:
                          </p>
                        </div>
                        <p className="font-mono font-black text-2xl tracking-[0.3em] text-secondary">
                          {simulatedOtpNotice}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            const digits = simulatedOtpNotice.split('');
                            setOtpDigits(digits);
                            submitOtpVerification(simulatedOtpNotice);
                          }}
                          className="px-3 py-1 rounded-full bg-secondary text-white font-extrabold text-[10px] hover:bg-secondary/90 transition-all shadow-sm active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <Icon name="bolt" size={12} />
                          <span>Isi Otomatis & Masuk ({simulatedOtpNotice})</span>
                        </button>
                      </div>
                    )}

                    {/* 6 Digit Input Boxes */}
                    <div className="flex items-center justify-between gap-2">
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => { otpInputsRef.current[idx] = el; }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className="w-12 h-14 text-center rounded-2xl glass-panel text-lg font-mono font-bold text-primary outline-none focus:ring-2 focus:ring-secondary/60 border border-outline-variant/30 transition-all"
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => submitOtpVerification(otpDigits.join(''))}
                      disabled={isLoading || otpDigits.some(d => !d)}
                      className="w-full h-11 rounded-xl bg-secondary text-white font-extrabold text-xs hover:bg-secondary/90 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span>Verifikasi & Buka Dasbor</span>
                      )}
                    </button>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <button
                        type="button"
                        onClick={() => { setOtpSent(false); setOtpDigits(['', '', '', '', '', '']); }}
                        className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-[11px]"
                      >
                        ← Ubah Nomor
                      </button>

                      {resendCountdown > 0 ? (
                        <span className="text-[11px] text-outline font-mono">
                          Kirim ulang ({resendCountdown}s)
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="text-[11px] font-bold text-secondary hover:underline cursor-pointer"
                        >
                          Kirim Ulang Kode
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Soft Gradient Separator */}
            <div className="w-full flex items-center justify-center my-4 pointer-events-none">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />
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

        </div>
      </div>
    </PageTransition>
  );
};
