import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PageTransition } from '../../components/ui/PageTransition';
import { Icon } from '../../components/ui/Icon';
import { EcocycleLogo } from '../../components/brand/EcocycleLogo';
import { SEOHead } from '../../components/seo/SEOHead';

export const EmailVerificationPage: React.FC = () => {
  const location = useLocation();
  const email = (location.state as any)?.email || 'alamat surel Anda';

  return (
    <PageTransition className="w-full bg-surface text-on-surface py-16 sm:py-24">
      <SEOHead title="Verifikasi Surel Terkirim" canonical="/verifikasi-email" noindex={true} />
      <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          
          <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
            <EcocycleLogo size="lg" showTagline={true} />
          </Link>

          <div className="glass-panel-elevated p-8 sm:p-12 rounded-3xl space-y-6 border border-outline-variant/25 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center shadow-inner">
              <Icon name="mail" size={32} />
            </div>

            <div className="space-y-3">
              <h1 className="font-display font-extrabold text-2xl text-primary tracking-tight">
                Verifikasi Surel Terkirim
              </h1>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Kami telah mengirimkan tautan konfirmasi pendaftaran ke:
              </p>
              <div className="p-3 rounded-xl glass-panel font-mono text-xs font-bold text-primary border border-outline-variant/20 truncate">
                {email}
              </div>
              <p className="text-[11px] text-outline leading-relaxed pt-2">
                Silakan klik tautan di dalam surel tersebut untuk mengaktifkan akun Anda dan menikmati seluruh fitur pencatatan buku tabungan digital.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link
                to="/masuk"
                className="flex-1 h-11 rounded-xl bg-secondary text-white text-xs font-bold hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Masuk ke Akun</span>
                <Icon name="arrow_forward" size={14} />
              </Link>
              <Link
                to="/"
                className="h-11 px-5 rounded-xl glass-pill hover:bg-surface-container text-xs font-bold text-on-surface transition-colors flex items-center justify-center"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};
