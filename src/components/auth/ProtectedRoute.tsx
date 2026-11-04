import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Icon } from '../ui/Icon';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, isConfigured } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
        <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-outline uppercase tracking-wider">
          Memverifikasi Sesi Keamanan...
        </p>
      </div>
    );
  }

  // If Supabase is configured and user is not authenticated, redirect to Sign In
  if (isConfigured && !user) {
    return <Navigate to="/masuk" state={{ from: location }} replace />;
  }

  // If Supabase is unconfigured, display a helpful educational notice banner atop the children
  return (
    <div>
      {!isConfigured && (
        <div className="bg-secondary-fixed/30 border-b border-secondary/20 py-2.5 px-4">
          <div className="max-w-[1380px] mx-auto flex items-center justify-between text-xs text-secondary font-medium gap-3">
            <div className="flex items-center gap-2">
              <Icon name="info" size={16} />
              <span>
                <strong>Mode Demonstrasi Pengembang:</strong> Kredensial Supabase belum terisi di <code>.env</code>. Halaman ini saat ini menggunakan basis data lokal persisten.
              </span>
            </div>
            <a
              href="/masuk"
              className="text-[11px] font-bold text-primary hover:underline shrink-0"
            >
              Lihat Konfigurasi Masuk →
            </a>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};
