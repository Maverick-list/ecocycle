import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PageTransition } from '../../components/ui/PageTransition';
import { Icon } from '../../components/ui/Icon';
import { EcocycleLogo } from '../../components/brand/EcocycleLogo';

export const EmailVerificationPage: React.FC = () => {
  const location = useLocation();
  const email = (location.state as any)?.email || 'alamat surel Anda';

  return (
    <PageTransition>
      <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-md w-full space-y-6 text-center">
          
          <Link to="/" className="inline-block">
            <EcocycleLogo size="lg" showTagline={true} />
          </Link>

          <div className="glass-panel-elevated p-8 rounded-3xl space-y-5 border border-outline-variant/30 shadow-xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shadow-inner">
              <Icon name="mail" size={32} />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-primary tracking-tight">
                Verifikasi Surel Dikirimkan
              </h1>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Kami telah mengirimkan tautan konfirmasi pendaftaran ke:
              </p>
              <div className="p-2.5 rounded-xl bg-surface-container font-mono text-xs font-bold text-primary border border-outline-variant/20 truncate">
                {email}
              </div>
              <p className="text-[11px] text-outline leading-relaxed pt-2">
                Silakan klik tautan di dalam surel tersebut untuk mengaktifkan akun Anda dan menikmati seluruh fitur pencatatan bank sampah.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link
                to="/masuk"
                className="flex-1 h-11 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Masuk ke Akun</span>
                <Icon name="arrow_forward" size={14} />
              </Link>
              <Link
                to="/"
                className="h-11 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-primary transition-colors flex items-center justify-center"
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
