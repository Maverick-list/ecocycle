import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PageTransition } from '../../components/ui/PageTransition';
import { Icon } from '../../components/ui/Icon';
import { EcocycleLogo } from '../../components/brand/EcocycleLogo';
import { SEOHead } from '../../components/seo/SEOHead';

export const SignUpPage: React.FC = () => {
  const { signUpWithEmail, isConfigured } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
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
        navigate('/verifikasi-email', { state: { email } });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan sistem saat mendaftar.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition className="w-full bg-surface text-on-surface py-16 sm:py-24">
      <SEOHead title="Daftar Akun Baru" canonical="/daftar" noindex={true} />
      <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
              <EcocycleLogo size="lg" showTagline={true} />
            </Link>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-primary tracking-tight pt-2">
              Buat Akun Sirkular Baru
            </h1>
            <p className="text-xs text-on-surface-variant">
              Mulai perjalanan pilah sampah presisi dan kumpulkan EcoPoints berharga.
            </p>
          </div>

          {!isConfigured && (
            <div className="p-4 rounded-2xl glass-panel border border-secondary/30 text-xs text-secondary space-y-1">
              <span className="font-bold block">💡 Mode Demonstrasi Terbuka</span>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Arsitektur autentikasi Google Firebase dan Supabase terintegrasi secara modular. Anda dapat menguji alur verifikasi langsung atau menghubungkan kredensial di <code>.env</code>.
              </p>
            </div>
          )}

          {/* Form Panel */}
          <div className="glass-panel-elevated p-8 sm:p-10 rounded-3xl space-y-6 border border-outline-variant/25 shadow-2xl">
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-error/15 text-error text-xs flex items-start gap-2.5 animate-fadeIn border border-error/20">
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
                    placeholder="Contoh: Rina Safitri"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl glass-panel text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary/50 border border-outline-variant/25"
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
                    className="w-full h-11 pl-10 pr-4 rounded-xl glass-panel text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary/50 border border-outline-variant/25"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                  Kata Sandi
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-3.5 text-outline">
                    <Icon name="verified" size={16} />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="Minimal 6 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl glass-panel text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary/50 border border-outline-variant/25"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-3.5 text-outline">
                    <Icon name="verified" size={16} />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="Ulangi kata sandi Anda"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl glass-panel text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary/50 border border-outline-variant/25"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-on-surface-variant">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-secondary focus:ring-secondary accent-secondary cursor-pointer"
                  />
                  <span>
                    Saya menyetujui komitmen pemilahan material presisi dan etika privasi data ECOCYCLE.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-secondary text-white font-bold text-xs hover:bg-secondary/90 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 mt-4 hover:scale-[1.01] active:scale-[0.99]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Daftar Akun Sekarang</span>
                    <Icon name="arrow_forward" size={14} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-center text-xs text-on-surface-variant">
            <span>Sudah memiliki akun? </span>
            <Link to="/masuk" className="font-bold text-secondary hover:underline">
              Masuk di sini
            </Link>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};
