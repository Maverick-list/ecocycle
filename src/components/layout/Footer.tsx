import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWasteBank } from '../../context/WasteBankContext';
import { Icon } from '../ui/Icon';
import { EcocycleLogo } from '../brand/EcocycleLogo';
import { SocialLinks } from '../ui/SocialLinks';

export const Footer: React.FC = () => {
  const { showToast } = useWasteBank();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Harap masukkan alamat surel yang valid.', 'error');
      return;
    }
    showToast(`Terima kasih! Warta sirkular akan dikirimkan ke ${email}`, 'success');
    setEmail('');
  };

  return (
    <footer className="relative w-full bg-[#00170e] text-white overflow-hidden mt-auto">
      {/* 1. Seamless Organic Gradient Boundary Transition (No hard straight border lines) */}
      <div className="w-full h-16 sm:h-24 bg-gradient-to-b from-transparent via-[#00170e]/70 to-[#00170e] pointer-events-none" />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent pointer-events-none" />

      {/* 2. Spacious Editorial Footer Content */}
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column 1: Brand & Developer Profile (Spacious & Clean) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block focus:outline-none" title="ECOCYCLE Beranda">
              <EcocycleLogo size="lg" variant="dark" showTagline={true} />
            </Link>
            <p className="font-sans text-xs sm:text-sm text-emerald-100/75 max-w-sm leading-relaxed">
              Infrastruktur teknologi ekonomi sirkular terintegrasi. Mengubah aliran material terbuang menjadi neraca sumber daya terverifikasi bagi masyarakat dan institusi.
            </p>

            {/* Official Creator & Developer Social Integration */}
            <div className="pt-3 space-y-3">
              <span className="font-label-caps text-[11px] text-[#A7F3D0] block uppercase tracking-wider font-extrabold">
                Pengembang & Kreator Proyek:
              </span>
              <SocialLinks variant="dark" showLabels={true} />
            </div>
          </div>

          {/* Column 2: Platform Navigation */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="font-label-caps text-xs sm:text-sm text-[#A7F3D0] uppercase tracking-wider font-extrabold">
              Navigasi Platform
            </h3>
            <ul className="space-y-3 font-sans text-xs sm:text-sm text-emerald-100/80">
              <li>
                <Link to="/panduan" className="hover:text-white transition-colors flex items-center gap-2 font-bold text-[#A7F3D0]">
                  <Icon name="sparkles" size={14} className="text-[#A7F3D0]" />
                  <span>Pusat Panduan & Video Tutorial</span>
                </Link>
              </li>
              <li>
                <Link to="/pemilahan-pintar" className="hover:text-white transition-colors flex items-center gap-2">
                  <Icon name="recycle" size={14} className="text-emerald-400" />
                  <span>Pemilahan Pintar (Sort Guide)</span>
                </Link>
              </li>
              <li>
                <Link to="/bank-sampah" className="hover:text-white transition-colors flex items-center gap-2">
                  <Icon name="wallet" size={14} className="text-emerald-400" />
                  <span>Bank Sampah Digital</span>
                </Link>
              </li>
              <li>
                <Link to="/analitik" className="hover:text-white transition-colors flex items-center gap-2">
                  <Icon name="bar_chart" size={14} className="text-emerald-400" />
                  <span>Pusat Analitik & Tren</span>
                </Link>
              </li>
              <li>
                <Link to="/dampak-ekologis" className="hover:text-white transition-colors flex items-center gap-2">
                  <Icon name="cloud" size={14} className="text-emerald-400" />
                  <span>Neraca Karbon & Kalkulator</span>
                </Link>
              </li>
              <li>
                <Link to="/akademi" className="hover:text-white transition-colors flex items-center gap-2">
                  <Icon name="book_open" size={14} className="text-emerald-400" />
                  <span>Akademi Sirkular & Mitos</span>
                </Link>
              </li>
              <li>
                <Link to="/tantangan" className="hover:text-white transition-colors flex items-center gap-2">
                  <Icon name="leaderboard" size={14} className="text-emerald-400" />
                  <span>Tantangan & Papan Peringkat</span>
                </Link>
              </li>
              <li>
                <Link to="/profil" className="hover:text-white transition-colors flex items-center gap-2">
                  <Icon name="user" size={14} className="text-emerald-400" />
                  <span>Dasbor Profil Pengguna</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Governance & Scientific Base */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="font-label-caps text-xs sm:text-sm text-[#A7F3D0] uppercase tracking-wider font-extrabold">
              Metodologi & Etika
            </h3>
            <ul className="space-y-3 font-sans text-xs sm:text-sm text-emerald-100/80">
              <li>
                <Link to="/analitik" className="hover:text-white transition-colors block">
                  Formula US EPA WARM v15
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:text-white transition-colors block">
                  Pedoman SNI 19-3983-1995
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:text-white transition-colors block">
                  Standar Audit Timbangan Hub
                </Link>
              </li>
              <li>
                <Link to="/masuk" className="hover:text-white transition-colors block">
                  Autentikasi Supabase RLS
                </Link>
              </li>
              <li>
                <Link to="/panduan" className="hover:text-white transition-colors block">
                  Tur Panduan Interaktif
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="font-label-caps text-xs sm:text-sm text-[#A7F3D0] uppercase tracking-wider font-extrabold">
              Warta Dampak Ekologis
            </h3>
            <p className="font-sans text-xs sm:text-sm text-emerald-100/75 leading-relaxed">
              Dapatkan ikhtisar berkala pemulihan material, riset daur ulang, dan indeks reduksi emisi karbon.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 pt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Alamat surel Anda..."
                className="h-11 px-4 rounded-xl bg-[#032317] border border-emerald-500/25 text-white placeholder:text-emerald-200/40 font-sans text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-400 w-full transition-all"
              />
              <button
                type="submit"
                className="h-11 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-[#10b981] text-white font-title-md text-xs sm:text-sm hover:from-emerald-400 hover:to-emerald-500 transition-all font-bold cursor-pointer flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <Icon name="mail" size={16} />
                <span>Berlangganan Warta</span>
              </button>
            </form>
          </div>
        </div>

        {/* Soft Organic Fading Gradient Divider (no hard straight border line) */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent my-12 sm:my-14" />

        {/* Legal & Compliance Bottom Bar (Spacious & Clean) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-emerald-200/70 font-sans text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span>Tata Kelola Bank Sampah Berbasis SNI 19-3983-1995 • Rantai Lacak Terbuka</span>
          </div>
          <div className="text-[11px] sm:text-xs text-emerald-300/60 text-center md:text-right">
            © 2026 ECOCYCLE Foundation. Seluruh hak cipta dilindungi. Mengubah aliran material menjadi neraca bernilai ekologis nyata.
          </div>
        </div>
      </div>
    </footer>
  );
};
