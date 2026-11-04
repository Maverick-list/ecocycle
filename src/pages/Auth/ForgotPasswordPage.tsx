import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PageTransition } from '../../components/ui/PageTransition';
import { Icon } from '../../components/ui/Icon';
import { EcocycleLogo } from '../../components/brand/EcocycleLogo';

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
    <PageTransition>
      <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-md w-full space-y-6">
          
          <div className="text-center space-y-2">
            <Link to="/" className="inline-block">
              <EcocycleLogo size="lg" showTagline={true} />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight pt-2">
              Pemulihan Kata Sandi
            </h1>
            <p className="text-xs text-on-surface-variant">
              Masukkan alamat surel yang terdaftar untuk menerima tautan pembaruan kata sandi.
            </p>
          </div>

          <div className="glass-panel-elevated p-6 sm:p-8 rounded-3xl space-y-5 border border-outline-variant/30 shadow-xl">
            {isSubmitted ? (
              <div className="text-center space-y-4 py-3 animate-fadeIn">
                <div className="w-14 h-14 mx-auto rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                  <Icon name="mail" size={28} />
                </div>
                <h3 className="text-base font-bold text-primary">Tautan Terkirim!</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Kami telah mengirimkan instruksi pemulihan ke alamat surel <strong>{email}</strong>. Harap periksa folder kotak masuk atau spam Anda.
                </p>
                <Link
                  to="/masuk"
                  className="inline-flex items-center justify-center h-10 px-6 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-all"
                >
                  Kembali ke Halaman Masuk
                </Link>
              </div>
            ) : (
              <>
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-error-container text-on-error-container text-xs flex items-start gap-2 animate-fadeIn">
                    <Icon name="alert" size={16} className="text-error shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">
                      Alamat Surel Terdaftar
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

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-surface border-t-transparent rounded-full animate-spin" />
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
                    className="text-xs font-bold text-secondary hover:underline inline-flex items-center gap-1"
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
