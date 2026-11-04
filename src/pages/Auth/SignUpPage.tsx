import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PageTransition } from '../../components/ui/PageTransition';
import { Icon } from '../../components/ui/Icon';
import { EcocycleLogo } from '../../components/brand/EcocycleLogo';

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
    <PageTransition>
      <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-md w-full space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-block">
              <EcocycleLogo size="lg" showTagline={true} />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight pt-2">
              Buat Akun Sirkular Baru
            </h1>
            <p className="text-xs text-on-surface-variant">
              Mulai perjalanan pilah sampah presisi dan kumpulkan EcoPoints berharga.
            </p>
          </div>

          {!isConfigured && (
            <div className="p-3.5 rounded-2xl bg-secondary-fixed/30 border border-secondary/30 text-xs text-secondary space-y-1">
              <span className="font-bold block">💡 Info Pengembang</span>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Supabase Auth belum diaktifkan via <code>.env</code>. Pengisian formulir ini akan memvalidasi alur dan mengarahkan ke halaman verifikasi email.
              </p>
            </div>
          )}

          {/* Form Panel */}
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
                  Nama Lengkap
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-outline">
                    <Icon name="user" size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Rina Mahasiswi UNIKU"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-surface-container text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/20"
                  />
                </div>
              </div>

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
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">
                  Kata Sandi (Min. 6 Karakter)
                </label>
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

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">
                  Ulangi Kata Sandi
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-outline">
                    <Icon name="verified" size={16} />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-surface-container text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/20"
                  />
                </div>
              </div>

              <label className="flex items-start gap-2 pt-1 cursor-pointer text-xs text-on-surface-variant">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded text-secondary focus:ring-secondary"
                />
                <span>
                  Saya setuju untuk mematuhi kaidah pemilahan bersih dan pedoman etika data ECOCYCLE.
                </span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-surface border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Daftar Akun Baru</span>
                    <Icon name="arrow_forward" size={14} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-center text-xs text-on-surface-variant">
            <span>Sudah memiliki akun? </span>
            <Link to="/masuk" className="font-bold text-secondary hover:underline">
              Masuk di Sini
            </Link>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};
