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
    <footer className="w-full bg-[#001f13] text-on-primary shadow-[0_-1px_16px_rgba(0,0,0,0.12)] border-t border-primary-container">
      <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin py-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter lg:gap-space-xl pb-space-xl border-b border-primary-container">
          
          {/* Column 1: Brand & Developer Profile */}
          <div className="lg:col-span-4 space-y-space-md">
            <Link to="/" className="inline-block">
              <EcocycleLogo size="lg" variant="dark" showTagline={true} />
            </Link>
            <p className="font-body-md text-xs sm:text-sm text-primary-fixed-dim max-w-sm leading-relaxed">
              Infrastruktur teknologi ekonomi sirkular terintegrasi. Mengubah aliran material terbuang menjadi neraca sumber daya terverifikasi bagi masyarakat dan kampus di Kabupaten Kuningan.
            </p>

            {/* Official Creator & Developer Social Integration */}
            <div className="pt-2 space-y-2">
              <span className="font-label-caps text-[10px] text-tertiary-fixed block uppercase tracking-wider font-bold">
                Pengembang & Kreator Proyek:
              </span>
              <SocialLinks variant="dark" showLabels={true} />
            </div>
          </div>

          {/* Column 2: Platform Navigation */}
          <div className="lg:col-span-3 space-y-space-md">
            <h3 className="font-label-caps text-xs text-secondary-fixed uppercase tracking-wider font-bold">
              Navigasi Platform
            </h3>
            <ul className="space-y-2 font-body-sm text-xs text-surface-variant">
              <li>
                <Link to="/panduan" className="hover:text-tertiary-fixed transition-colors flex items-center gap-1.5 font-bold text-tertiary-fixed">
                  <Icon name="sparkles" size={13} className="text-tertiary-fixed" />
                  <span>Pusat Panduan & Video Tutorial</span>
                </Link>
              </li>
              <li>
                <Link to="/pemilahan-pintar" className="hover:text-tertiary-fixed transition-colors flex items-center gap-1.5">
                  <Icon name="recycle" size={13} className="text-secondary" />
                  <span>Pemilahan Pintar (Sort Guide)</span>
                </Link>
              </li>
              <li>
                <Link to="/bank-sampah" className="hover:text-tertiary-fixed transition-colors flex items-center gap-1.5">
                  <Icon name="wallet" size={13} className="text-secondary" />
                  <span>Bank Sampah Digital</span>
                </Link>
              </li>
              <li>
                <Link to="/analitik" className="hover:text-tertiary-fixed transition-colors flex items-center gap-1.5">
                  <Icon name="bar_chart" size={13} className="text-secondary" />
                  <span>Pusat Analitik & Tren</span>
                </Link>
              </li>
              <li>
                <Link to="/dampak-ekologis" className="hover:text-tertiary-fixed transition-colors flex items-center gap-1.5">
                  <Icon name="cloud" size={13} className="text-secondary" />
                  <span>Neraca Karbon & Kalkulator</span>
                </Link>
              </li>
              <li>
                <Link to="/akademi" className="hover:text-tertiary-fixed transition-colors flex items-center gap-1.5">
                  <Icon name="book_open" size={13} className="text-secondary" />
                  <span>Akademi Sirkular & Mitos</span>
                </Link>
              </li>
              <li>
                <Link to="/tantangan" className="hover:text-tertiary-fixed transition-colors flex items-center gap-1.5">
                  <Icon name="leaderboard" size={13} className="text-secondary" />
                  <span>Tantangan & Papan Peringkat</span>
                </Link>
              </li>
              <li>
                <Link to="/profil" className="hover:text-tertiary-fixed transition-colors flex items-center gap-1.5">
                  <Icon name="user" size={13} className="text-secondary" />
                  <span>Dasbor Profil Pengguna</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Governance & Scientific Base */}
          <div className="lg:col-span-2 space-y-space-md">
            <h3 className="font-label-caps text-xs text-secondary-fixed uppercase tracking-wider font-bold">
              Metodologi & Etika
            </h3>
            <ul className="space-y-2 font-body-sm text-xs text-surface-variant">
              <li>
                <Link to="/analitik" className="hover:text-tertiary-fixed transition-colors">
                  Formula US EPA WARM v15
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:text-tertiary-fixed transition-colors">
                  Pedoman SNI 19-3983-1995
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:text-tertiary-fixed transition-colors">
                  Standar Audit Timbangan Hub
                </Link>
              </li>
              <li>
                <Link to="/masuk" className="hover:text-tertiary-fixed transition-colors">
                  Autentikasi Supabase RLS
                </Link>
              </li>
              <li>
                <Link to="/panduan" className="hover:text-tertiary-fixed transition-colors">
                  Tur Panduan Interaktif
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3 space-y-space-md">
            <h3 className="font-label-caps text-xs text-secondary-fixed uppercase tracking-wider font-bold">
              Warta Dampak Ekologis
            </h3>
            <p className="font-body-sm text-xs text-primary-fixed-dim leading-relaxed">
              Dapatkan ikhtisar berkala pemulihan material, riset daur ulang, dan indeks reduksi emisi karbon.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 pt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Alamat surel Anda..."
                className="h-10 px-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-xs outline-none focus:ring-2 focus:ring-secondary w-full"
              />
              <button
                type="submit"
                className="h-10 px-4 rounded-xl bg-secondary text-on-secondary font-title-md text-xs hover:bg-secondary/90 transition-colors font-bold cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Icon name="mail" size={14} />
                <span>Berlangganan Warta</span>
              </button>
            </form>
          </div>
        </div>

        {/* Legal & Compliance Bottom Bar */}
        <div className="pt-space-md flex flex-col md:flex-row items-center justify-between gap-2 text-surface-variant font-body-sm text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tertiary-fixed" />
            <span>Tata Kelola Bank Sampah Berbasis SNI 19-3983-1995 • Rantai Lacak Terbuka</span>
          </div>
          <div className="text-[11px] text-primary-fixed-dim text-center md:text-right">
            © 2026 ECOCYCLE. Diciptakan oleh <a href="https://github.com/Maverick-list" target="_blank" rel="noopener noreferrer" className="font-bold text-tertiary-fixed hover:underline">Firza Ilmi</a> untuk Web Design Competition Techno Versary Vol. II 2026 — HIMA TI FKOM UNIKU.
          </div>
        </div>
      </div>
    </footer>
  );
};
