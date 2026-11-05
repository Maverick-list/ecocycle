import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Icon } from '../ui/Icon';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, signInWithGoogle } = useAuth();
  const location = useLocation();
  const [isInstantLoading, setIsInstantLoading] = useState(false);

  if (loading) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-8 space-y-4">
        <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-extrabold text-outline uppercase tracking-wider">
          Memverifikasi Kredensial Keamanan...
        </p>
      </div>
    );
  }

  // If user is authenticated, render the dashboard
  if (user) {
    return <>{children}</>;
  }

  // If not authenticated, render the Apple-style Gated Dashboard Experience
  return (
    <div className="w-full min-h-screen bg-surface dark:bg-[#03140d] text-on-surface dark:text-white py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors duration-300">
      <div className="max-w-lg w-full space-y-8 animate-fadeIn">
        
        {/* Brand Lock Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 rounded-3xl bg-secondary/15 text-secondary border border-secondary/30 shadow-lg">
            <Icon name="lock" size={28} />
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
            Autentikasi Dasbor Diperlukan
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant font-medium max-w-md mx-auto leading-relaxed">
            Untuk menjaga privasi data buku tabungan digital, mutasi rupiah, dan alamat penjemputan sampah, silakan masuk ke akun Anda.
          </p>
        </div>

        {/* Apple-style Frosted Glass Card */}
        <div className="glass-panel-elevated p-6 sm:p-8 rounded-4xl space-y-6 border border-outline-variant/25 shadow-2xl relative overflow-hidden">
          
          {/* Top Gradient Shimmer */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

          {/* Value Prop Features */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-2xl glass-panel border border-outline-variant/15 text-xs">
              <div className="w-8 h-8 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                <Icon name="account_balance" size={16} />
              </div>
              <div>
                <p className="font-bold text-primary">Buku Tabungan Sirkular & Tarik Saldo</p>
                <p className="text-[11px] text-on-surface-variant">Cairkan saldo rupiah ke GoPay, OVO, DANA, atau rekening bank.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl glass-panel border border-outline-variant/15 text-xs">
              <div className="w-8 h-8 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                <Icon name="eco" size={16} />
              </div>
              <div>
                <p className="font-bold text-primary">Sertifikat Resmi Reduksi Karbon</p>
                <p className="text-[11px] text-on-surface-variant">Klaim sertifikat audit dampak ekologis terverifikasi US EPA WARM.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl glass-panel border border-outline-variant/15 text-xs">
              <div className="w-8 h-8 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                <Icon name="phone" size={16} />
              </div>
              <div>
                <p className="font-bold text-primary">Verifikasi Kontak & Drop-Point Presisi</p>
                <p className="text-[11px] text-on-surface-variant">Sinkronisasi nomor telepon dan drop-point terdekat Anda.</p>
              </div>
            </div>
          </div>

          {/* Soft Gradient Separator */}
          <div className="w-full flex items-center justify-center my-2 pointer-events-none">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/masuk"
              state={{ from: location }}
              className="w-full h-12 rounded-2xl bg-secondary text-white font-extrabold text-xs hover:bg-secondary/90 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.98]"
            >
              <Icon name="login" size={16} />
              <span>Masuk (Google, Email, atau No. Telepon)</span>
            </Link>

            <button
              type="button"
              onClick={async () => {
                setIsInstantLoading(true);
                await signInWithGoogle('pratama.kusuma@ecocycle.id', 'Pratama Kusuma');
                setIsInstantLoading(false);
              }}
              disabled={isInstantLoading}
              className="w-full h-11 rounded-2xl glass-pill hover:bg-surface-container border border-outline-variant/30 text-xs font-bold text-primary flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {isInstantLoading ? (
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Icon name="sparkles" size={15} className="text-secondary" />
                  <span>Akses Cepat Mode Demonstrasi (1-Klik)</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
