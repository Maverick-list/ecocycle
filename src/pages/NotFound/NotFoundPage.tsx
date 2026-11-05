import React from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../../components/ui/PageTransition';
import { SEOHead } from '../../components/seo/SEOHead';
import { Icon } from '../../components/ui/Icon';
import { EcocycleLogo } from '../../components/brand/EcocycleLogo';

export const NotFoundPage: React.FC = () => {
  return (
    <PageTransition className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <SEOHead
        title="404 — Halaman Tidak Ditemukan"
        description="Halaman yang Anda tuju tidak ditemukan di platform sirkular ECOCYCLE."
        canonical="/404"
        noindex={true}
      />
      <div className="max-w-xl w-full text-center space-y-6 glass-panel-elevated p-8 sm:p-12 rounded-4xl border border-secondary/25 shadow-2xl relative overflow-hidden">
        {/* Soft background aura */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-center">
          <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
            <EcocycleLogo size="lg" showTagline={true} />
          </Link>
        </div>

        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-black uppercase tracking-wider text-secondary">
            <Icon name="alert" size={15} />
            <span>Kode Status: 404 Not Found</span>
          </span>

          <h1 className="font-display font-black text-4xl sm:text-5xl text-primary dark:text-white tracking-tight">
            Halaman Tidak <span className="animate-title-flow">Ditemukan</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-on-surface-variant dark:text-emerald-100/75 leading-relaxed">
            Rute yang Anda cari mungkin telah dipindahkan, diganti nama, atau belum terdaftar dalam ekosistem sirkular ECOCYCLE.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            to="/"
            className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-secondary text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Icon name="home" size={16} />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            to="/setor-sampah"
            className="w-full py-3 px-5 rounded-2xl glass-pill hover:bg-surface-container border border-secondary/30 text-primary dark:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Icon name="recycle" size={16} />
            <span>Setor Sampah</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-outline-variant/20 flex flex-wrap items-center justify-center gap-4 text-xs text-on-surface-variant dark:text-emerald-200/70">
          <Link to="/bank-sampah" className="hover:text-secondary underline underline-offset-4">Bank Sampah</Link>
          <span>•</span>
          <Link to="/pemilahan-pintar" className="hover:text-secondary underline underline-offset-4">Panduan Pilah</Link>
          <span>•</span>
          <Link to="/faq" className="hover:text-secondary underline underline-offset-4">Pusat Bantuan FAQ</Link>
        </div>
      </div>
    </PageTransition>
  );
};
