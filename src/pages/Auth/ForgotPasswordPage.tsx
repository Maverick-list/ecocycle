import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PageTransition } from '../../components/ui/PageTransition';
import { Icon } from '../../components/ui/Icon';
import { EcocycleLogo } from '../../components/brand/EcocycleLogo';
import { SEOHead } from '../../components/seo/SEOHead';

export const ForgotPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const { error } = await resetPassword(email);
      if (error) {
        setErrorMessage(error.message || 'Gagal mengirim instruksi pemulihan kata sandi.');
      } else {
        setIsSubmitted(true);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition className="w-full bg-surface text-on-surface py-16 sm:py-24">
      <SEOHead title="Pemulihan Kata Sandi" canonical="/lupa-password" noindex={true} />
      <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          
          <div className="text-center space-y-3">
            <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
              <EcocycleLogo size="lg" showTagline={true} />
            </Link>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-primary tracking-tight pt-2">
              Pemulihan Kata Sandi
            </h1>
            <p className="text-xs text-on-surface-variant">
              Masukkan surel yang terdaftar untuk menerima tautan pembaruan kata sandi.
            </p>
          </div>

          <div className="glass-panel-elevated p-8 sm:p-10 rounded-3xl space-y-6 border border-outline-variant/25 shadow-2xl">
            {isSubmitted ? (
              <div className="text-center space-y-4 py-3 animate-fadeIn">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center">
                  <Icon name="mail" size={28} />
                </div>
                <h3 className="font-display font-bold text-lg text-primary">Tautan Terkirim!</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Kami telah mengirimkan instruksi pemulihan ke alamat surel <strong>{email}</strong>. Harap periksa folder kotak masuk atau spam Anda.
                </p>
                <div className="pt-2">
                  <Link
                    to="/masuk"
                    className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-secondary text-white text-xs font-bold hover:bg-secondary/90 transition-all shadow-md"
                  >
                    Kembali ke Halaman Masuk
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {errorMessage && (
                  <div className="p-4 rounded-2xl bg-error/15 text-error text-xs flex items-start gap-2.5 animate-fadeIn border border-error/20">
                    <Icon name="alert" size={16} className="text-error shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                      Alamat Surel Terdaftar
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

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 rounded-xl bg-secondary text-white font-bold text-xs hover:bg-secondary/90 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 mt-4 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Kirim Tautan Pemulihan</span>
                        <Icon name="arrow_forward" size={14} />
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center pt-2">
                  <Link
                    to="/masuk"
                    className="text-xs font-bold text-secondary hover:underline inline-flex items-center gap-1.5"
                  >
                    <Icon name="arrow_back" size={14} />
                    <span>Kembali ke Halaman Masuk</span>
                  </Link>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </PageTransition>
  );
};
