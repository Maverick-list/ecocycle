import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWasteBank } from '../../context/WasteBankContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { openDepositModal } = useWasteBank();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', path: '/' },
    { label: 'Pemilahan Pintar', path: '/pemilahan-pintar' },
    { label: 'Bank Sampah Digital', path: '/bank-sampah' },
    { label: 'Dampak Ekologis', path: '/dampak-ekologis' },
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
        <div className="h-20 max-w-[1380px] mx-auto px-margin-sm lg:px-margin flex items-center justify-between gap-space-lg">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-space-md shrink-0">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/assets/images/logo.png"
                alt="ECOCYCLE Brand Logo"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-headline-sm text-headline-sm tracking-tight text-primary font-bold">
                ECOCYCLE
              </span>
            </Link>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-widest">
              v2.4
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-space-md 2xl:gap-space-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-title-md text-title-md transition-colors px-2 py-1 rounded-md ${
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
          <div className="flex items-center gap-space-sm sm:gap-space-md shrink-0">
            <button
              type="button"
              onClick={openDepositModal}
              className="inline-flex items-center justify-center h-11 px-4 sm:px-space-lg rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-title-md text-sm sm:text-title-md hover:bg-tertiary-fixed-dim hover:text-on-tertiary-fixed transition-all shadow-[0_4px_16px_rgba(203,240,117,0.3)] hover:shadow-md cursor-pointer font-semibold"
            >
              <span className="material-symbols-outlined text-[18px] mr-1 sm:mr-1.5">add_circle</span>
              <span>Setor Sampah</span>
            </button>

            {/* Profile Avatar with Status Ring */}
            <div className="relative flex items-center">
              <img
                src="/assets/images/avatar_user.jpg"
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-surface-container-high"
                onError={(e) => {
                  // Fallback to initial circle if image not loaded
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-tertiary-fixed rounded-full ring-2 ring-surface" />
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-primary hover:bg-surface-container transition-colors"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[26px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-20 z-40 bg-surface/95 backdrop-blur-xl border-b border-outline-variant/30 flex flex-col p-6 animate-fadeIn">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-title-md py-2.5 px-4 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary text-on-primary font-bold'
                    : 'text-on-surface hover:bg-surface-container'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-outline-variant/30">
              <Link
                to="/setor-sampah"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-title-md font-bold shadow-md"
              >
                <span className="material-symbols-outlined">post_add</span>
                <span>Buka Formulir Setor Sampah</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
