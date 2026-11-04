import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWasteBank } from '../../context/WasteBankContext';
import { Icon } from '../ui/Icon';
import { UserService } from '../../services/userService';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { openDepositModal, totalPoints } = useWasteBank();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profile = UserService.getProfile();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Beranda', path: '/' },
    { label: 'Pemilahan Pintar', path: '/pemilahan-pintar' },
    { label: 'Bank Sampah Digital', path: '/bank-sampah' },
    { label: 'Dampak Ekologis', path: '/dampak-ekologis' },
    { label: 'Analitik', path: '/analitik' },
    { label: 'Akademi', path: '/akademi' },
    { label: 'Tantangan', path: '/tantangan' },
    { label: 'Kontak', path: '/kontak' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/20">
        <div className="h-20 max-w-[1380px] mx-auto px-margin-sm lg:px-margin flex items-center justify-between gap-space-md">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="/assets/images/logo.png"
                alt="ECOCYCLE Brand Logo"
                className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-headline-sm text-headline-sm tracking-tight text-primary font-bold">
                ECOCYCLE
              </span>
            </Link>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-widest">
              v2.5
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-2 2xl:gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-title-md text-xs 2xl:text-sm transition-colors px-2 py-1.5 rounded-md ${
                  isActive(link.path)
                    ? 'text-primary font-bold border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={openDepositModal}
              className="inline-flex items-center justify-center h-10 px-3.5 sm:px-4 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-title-md text-xs sm:text-sm hover:bg-tertiary-fixed-dim transition-all shadow-[0_4px_16px_rgba(203,240,117,0.3)] hover:shadow-md cursor-pointer font-bold"
            >
              <Icon name="add_circle" size={16} className="mr-1 sm:mr-1.5 text-on-tertiary-fixed" />
              <span>Setor Sampah</span>
            </button>

            {/* Profile Avatar Entry Link with EcoPoints Pill */}
            <Link
              to="/profil"
              className={`flex items-center gap-2 p-1 pl-2 rounded-full border transition-all cursor-pointer ${
                isActive('/profil')
                  ? 'bg-secondary-fixed/30 border-secondary'
                  : 'bg-surface-container border-outline-variant/30 hover:border-secondary'
              }`}
              title="Buka Dashboard Profil Pengguna"
            >
              <span className="hidden sm:inline-block font-mono text-[11px] font-bold text-primary tabular-nums">
                {totalPoints.toLocaleString('id-ID')} Pts
              </span>
              <div className="relative flex items-center">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-container-high"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-tertiary-fixed rounded-full ring-2 ring-surface" />
              </div>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-primary hover:bg-surface-container transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          className="xl:hidden fixed inset-0 top-20 z-40 bg-surface/95 backdrop-blur-xl border-b border-outline-variant/30 flex flex-col p-6 animate-fadeIn overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileMenuOpen(false);
          }}
        >
          <div className="flex flex-col space-y-2">
            <Link
              to="/profil"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 mb-2 rounded-xl bg-secondary-fixed/20 border border-secondary/30 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <img src={profile.avatar} alt={profile.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <span className="font-bold text-primary text-xs block">{profile.name}</span>
                  <span className="text-[11px] text-secondary font-semibold">{totalPoints} EcoPoints</span>
                </div>
              </div>
              <Icon name="arrow_forward" size={16} className="text-secondary" />
            </Link>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-title-md py-2.5 px-4 rounded-lg transition-colors flex items-center justify-between ${
                  isActive(link.path)
                    ? 'bg-primary text-on-primary font-bold'
                    : 'text-on-surface hover:bg-surface-container'
                }`}
              >
                <span>{link.label}</span>
                {isActive(link.path) && <Icon name="check" size={16} />}
              </Link>
            ))}

            <div className="pt-4 border-t border-outline-variant/30">
              <Link
                to="/setor-sampah"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-title-md font-bold shadow-md text-xs"
              >
                <Icon name="post_add" size={18} />
                <span>Buka Formulir Setor Sampah</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
