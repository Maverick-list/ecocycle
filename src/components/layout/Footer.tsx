import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWasteBank } from '../../context/WasteBankContext';

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
    <footer className="w-full bg-primary text-on-primary shadow-[0_-1px_12px_rgba(0,0,0,0.06)] border-t border-primary-container">
      <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin py-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter lg:gap-space-xl pb-space-xl border-b border-primary-container">
          
          {/* Column 1: Brand & Operational Center */}
          <div className="lg:col-span-4 space-y-space-md">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-md text-headline-md font-bold tracking-tight text-surface-bright">
                ECOCYCLE
              </span>
              <span className="px-space-sm py-space-xs rounded-full bg-primary-container text-on-primary-container font-label-caps text-label-caps">
                SISTEM RESMI
              </span>
            </div>
            <p className="font-body-md text-body-md text-primary-fixed-dim max-w-sm">
              Infrastruktur tata kelola daur ulang digital terintegrasi. Mengubah aliran material terbuang menjadi neraca sumber daya terverifikasi.
            </p>
            <div className="pt-space-sm">
              <span className="font-label-caps text-label-caps text-secondary-fixed block mb-space-xs uppercase tracking-wider">
                Pusat Operasional
              </span>
              <p className="font-body-sm text-body-sm text-surface-variant">
                DKI Jakarta • Jawa Barat (Kuningan / Cirebon) • Bali Timur
              </p>
            </div>
          </div>

          {/* Column 2: Platform Navigation */}
          <div className="lg:col-span-2 space-y-space-md">
            <h3 className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider font-bold">
              Platform Navigasi
            </h3>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-surface-variant">
              <li>
                <Link to="/pemilahan-pintar" className="hover:text-tertiary-fixed transition-colors">
                  Pemilahan Pintar
                </Link>
              </li>
              <li>
                <Link to="/bank-sampah" className="hover:text-tertiary-fixed transition-colors">
                  Bank Sampah Terpadu
                </Link>
              </li>
              <li>
                <Link to="/dampak-ekologis" className="hover:text-tertiary-fixed transition-colors">
                  Neraca Karbon & Material
                </Link>
              </li>
              <li>
                <Link to="/akademi" className="hover:text-tertiary-fixed transition-colors">
                  Akademi Sirkular
                </Link>
              </li>
              <li>
                <Link to="/tantangan" className="hover:text-tertiary-fixed transition-colors">
                  Tantangan Komunitas
                </Link>
              </li>
              <li>
                <Link to="/setor-sampah" className="hover:text-tertiary-fixed transition-colors">
                  Jadwal Penjemputan
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Governance & Legal */}
          <div className="lg:col-span-2 space-y-space-md">
            <h3 className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider font-bold">
              Tata Kelola & Legal
            </h3>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-surface-variant">
              <li>
                <Link to="/kontak" className="hover:text-tertiary-fixed transition-colors">
                  Manifesto Ekologis
                </Link>
              </li>
              <li>
                <Link to="/dampak-ekologis" className="hover:text-tertiary-fixed transition-colors">
                  Verifikasi Audit Material
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:text-tertiary-fixed transition-colors">
                  Standar Kepatuhan EPR
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:text-tertiary-fixed transition-colors">
                  Kebijakan Privasi Data
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-4 space-y-space-md">
            <h3 className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider font-bold">
              Warta Dampak Ekologis
            </h3>
            <p className="font-body-sm text-body-sm text-primary-fixed-dim">
              Terima ikhtisar bulanan pemulihan material, inovasi regulasi EPR, dan indeks reduksi karbon nasional.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-space-sm pt-space-xs">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Alamat surel resmi..."
                className="h-12 px-space-md rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-secondary w-full"
              />
              <button
                type="submit"
                className="h-12 px-space-lg rounded-lg bg-secondary text-on-secondary font-title-md text-title-md hover:bg-on-secondary-container hover:text-on-secondary shrink-0 transition-colors font-bold cursor-pointer"
              >
                Daftar
              </button>
            </form>
          </div>
        </div>

        {/* Legal & Compliance Bottom Bar */}
        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md text-surface-variant font-body-sm text-body-sm">
          <div className="flex items-center gap-space-sm">
            <span className="w-2 h-2 rounded-full bg-tertiary-fixed" />
            <span>Integritas Sirkularitas Terjamin • SNI & ISO 14001:2015 Compliant</span>
          </div>
          <div>
            © 2026 ECOCYCLE Indonesia. Dikembangkan untuk Web Design Competition Techno Versary Vol. II 2026.
          </div>
        </div>
      </div>
    </footer>
  );
};
