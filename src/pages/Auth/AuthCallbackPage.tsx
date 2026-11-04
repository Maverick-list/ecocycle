import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { PageTransition } from '../../components/ui/PageTransition';
import { Icon } from '../../components/ui/Icon';

export const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setErrorMsg(error.message);
      } else if (session) {
        navigate('/profil', { replace: true });
      } else {
        // If query parameters indicate a recovery token or password update
        const hash = window.location.hash;
        if (hash.includes('type=recovery')) {
          navigate('/profil?tab=pengaturan&action=reset_password', { replace: true });
        } else {
          navigate('/profil', { replace: true });
        }
      }
    }).catch((err) => {
      setErrorMsg(err.message || 'Gagal memproses sesi autentikasi.');
    });
  }, [navigate]);

  return (
    <PageTransition>
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-8 space-y-4 text-center">
        {errorMsg ? (
          <div className="p-6 rounded-2xl bg-error-container text-on-error-container max-w-md space-y-3">
            <Icon name="alert" size={32} className="text-error mx-auto" />
            <h3 className="text-sm font-bold">Autentikasi Terkendala</h3>
            <p className="text-xs">{errorMsg}</p>
            <a
              href="/masuk"
              className="inline-block px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold"
            >
              Kembali ke Halaman Masuk
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto" />
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider">
              Mengautentikasi Sesi Anda...
            </h2>
            <p className="text-xs text-on-surface-variant">
              Mohon tunggu sejenak sementara kami mengalihkan Anda ke dasbor sirkular.
            </p>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
