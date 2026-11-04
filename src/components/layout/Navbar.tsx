import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWasteBank } from '../../context/WasteBankContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Icon } from '../ui/Icon';
import { UserService } from '../../services/userService';
import { EcocycleLogo } from '../brand/EcocycleLogo';

interface NavDropdownGroup {
  label: string;
  id: string;
  items: {
    title: string;
    description: string;
    path: string;
    icon: string;
  }[];
}

const NAV_GROUPS: NavDropdownGroup[] = [
  {
    label: 'Solusi Sirkular',
    id: 'solusi',
    items: [
      {
        title: 'Bank Sampah Digital',
        description: 'Buku tabungan digital, riwayat transaksi, dan konversi saldo rupiah.',
        path: '/bank-sampah',
        icon: 'account_balance',
      },
      {
        title: 'Pemilahan Pintar',
        description: 'Katalog 6 material bernilai tinggi dan protokol higienitas presisi.',
        path: '/pemilahan-pintar',
        icon: 'recycle',
      },
      {
        title: 'Setor Sampah Mandiri',
        description: 'Formulir pencatatan setoran cepat dengan kalkulasi tarif instan.',
        path: '/setor-sampah',
        icon: 'add_circle',
      },
    ],
  },
  {
    label: 'Sains & Dampak',
    id: 'dampak',
    items: [
      {
        title: 'Neraca Dampak Ekologis',
        description: 'Kalkulator ilmiah reduksi gas rumah kaca EPA WARM v15.',
        path: '/dampak-ekologis',
        icon: 'eco',
      },
      {
        title: 'Pusat Analitik Data',
        description: 'Visualisasi komparatif alur material dan ekspor dataset CSV/JSON.',
        path: '/analitik',
        icon: 'analytics',
      },
    ],
  },
  {
    label: 'Edukasi & Aksi',
    id: 'edukasi',
    items: [
      {
        title: 'Eco Academy',
        description: 'Kurikulum literasi ekonomi sirkular dan mitos vs fakta daur ulang.',
        path: '/akademi',
        icon: 'book',
      },
      {
        title: 'Tantangan Komunitas',
        description: 'Gamifikasi aksi ramah lingkungan dan penghargaan lencana digital.',
        path: '/tantangan',
        icon: 'trophy',
      },
      {
        title: 'Pusat Panduan & Video',
        description: 'Simulasi bab interaktif dan tur panduan layar operasional.',
        path: '/panduan',
        icon: 'play_circle',
      },
      {
        title: 'Tanya Jawab (FAQ)',
        description: 'Jawaban lengkap seputar akun, tarif, RLS, dan alur penimbangan.',
        path: '/faq',
        icon: 'help',
      },
    ],
  },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { openDepositModal } = useWasteBank();
  const { user, isConfigured } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const profile = UserService.getProfile();
  const navRef = useRef<HTMLElement>(null);

  const isHome = location.pathname === '/';
  const isHeroMode = isHome && !isScrolled;

  // Track window scroll position for seamless hero blending
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isCurrentGroupActive = (group: NavDropdownGroup) => {
    return group.items.some((item) => location.pathname === item.path);
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHeroMode
            ? 'bg-[#C8F0A5]/85 backdrop-blur-xl text-[#062B1D] shadow-sm'
            : 'glass-nav-bar'
        }`}
      >
        {/* Soft Organic Gradient Divider (no hard straight border line) */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[1.5px] pointer-events-none ${
            isHeroMode
              ? 'bg-gradient-to-r from-transparent via-[#0B482D]/25 to-transparent'
              : 'bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent'
          }`}
        />
        <div
          className={`absolute -bottom-4 left-0 right-0 h-4 pointer-events-none ${
            isHeroMode
              ? 'bg-gradient-to-b from-[#0B482D]/8 via-transparent to-transparent'
              : 'bg-gradient-to-b from-black/5 dark:from-emerald-950/20 via-transparent to-transparent'
          }`}
        />

        <div className="h-20 max-w-[1380px] mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between gap-6">
          
          {/* 1. Left: Brand Mark */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group focus:outline-none" title="ECOCYCLE Beranda">
            <EcocycleLogo size="md" showTagline={false} variant={isHeroMode ? 'light' : 'auto'} />
            <span
              className={`hidden md:inline-block text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border transition-colors ${
                isHeroMode
                  ? 'bg-[#0B482D]/10 text-[#062B1D] border-[#0B482D]/25'
                  : 'bg-secondary/10 text-secondary border-secondary/20'
              }`}
            >
              Living Economy
            </span>
          </Link>

          {/* 2. Center: Apple-style Desktop Dropdowns (Without redundant Beranda button) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_GROUPS.map((group) => {
              const isOpen = activeDropdown === group.id;
              const isGroupActive = isCurrentGroupActive(group);

              return (
                <div key={group.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(isOpen ? null : group.id)}
                    className={`px-4 py-2 rounded-xl text-sm xl:text-base font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                      isOpen || isGroupActive
                        ? isHeroMode
                          ? 'bg-[#0B482D]/15 text-[#062B1D] font-extrabold'
                          : 'bg-secondary/15 text-secondary font-extrabold'
                        : isHeroMode
                        ? 'text-[#0B482D] hover:text-[#062B1D] hover:bg-[#0B482D]/10'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/80'
                    }`}
                    aria-expanded={isOpen}
                  >
                    <span>{group.label}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={isHeroMode ? 'text-[#0B482D] text-xs' : 'text-outline text-xs'}
                    >
                      <Icon name="arrow_drop_down" size={16} />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 top-full mt-2 w-88 p-3 rounded-3xl glass-dropdown z-50 shadow-2xl"
                      >
                        <div className="space-y-1">
                          {group.items.map((item) => {
                            const isItemActive = location.pathname === item.path;
                            return (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setActiveDropdown(null)}
                                className={`p-3.5 rounded-2xl transition-all flex items-start gap-3.5 group/item active:scale-98 ${
                                  isItemActive
                                    ? 'bg-secondary/15 text-secondary font-bold'
                                    : 'hover:bg-surface-container/90 text-on-surface'
                                }`}
                              >
                                <div
                                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                    isItemActive
                                      ? 'bg-secondary text-white'
                                      : 'bg-surface-container text-secondary group-hover/item:bg-secondary group-hover/item:text-white'
                                  }`}
                                >
                                  <Icon name={item.icon} size={20} />
                                </div>
                                <div className="space-y-0.5">
                                  <div className="text-sm font-extrabold leading-snug group-hover/item:text-secondary transition-colors">
                                    {item.title}
                                  </div>
                                  <p className="text-xs text-on-surface-variant font-medium leading-relaxed line-clamp-2">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <Link
              to="/kontak"
              className={`px-4 py-2 rounded-xl text-sm xl:text-base font-bold transition-all cursor-pointer active:scale-95 ${
                location.pathname === '/kontak'
                  ? isHeroMode
                    ? 'bg-[#0B482D]/15 text-[#062B1D] font-extrabold'
                    : 'bg-secondary/15 text-secondary font-extrabold'
                  : isHeroMode
                  ? 'text-[#0B482D] hover:text-[#062B1D] hover:bg-[#0B482D]/10'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/80'
              }`}
            >
              Kontak & Hub
            </Link>
          </nav>

          {/* 3. Right: Theme Toggle, Quick CTA & Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 ${
                isHeroMode
                  ? 'bg-white/70 border border-[#0B482D]/20 text-[#062B1D] hover:bg-white'
                  : 'glass-pill text-on-surface hover:text-secondary'
              }`}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                <Icon name={isDark ? 'light_mode' : 'dark_mode'} size={20} />
              </motion.div>
            </button>

            {/* Quick Deposit Modal Button */}
            <button
              type="button"
              onClick={openDepositModal}
              className={`hidden sm:inline-flex items-center justify-center h-11 px-5 rounded-2xl font-sans text-sm transition-all shadow-md hover:scale-[1.02] active:scale-[0.96] font-extrabold cursor-pointer ${
                isHeroMode
                  ? 'bg-[#0B482D] text-white hover:bg-[#062B1D]'
                  : 'bg-secondary text-white hover:bg-secondary/90'
              }`}
            >
              <Icon name="add_circle" size={17} className="mr-1.5" />
              <span>Setor Sampah</span>
            </button>

            {/* User Profile Entry */}
            {isConfigured && !user ? (
              <Link
                to="/masuk"
                className={`h-10 px-4 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isHeroMode
                    ? 'bg-white/60 border border-[#0B482D]/15 text-[#062B1D] hover:bg-white'
                    : 'glass-pill hover:bg-surface-container text-on-surface'
                }`}
              >
                <Icon name="user" size={14} />
                <span>Masuk</span>
              </Link>
            ) : (
              <Link
                to="/profil"
                aria-label="Buka Dasbor Profil Pengguna"
                className={`flex items-center gap-2 p-1 pl-2 rounded-full transition-all ${
                  isHeroMode
                    ? 'bg-white/60 border border-[#0B482D]/15 text-[#062B1D] hover:bg-white'
                    : 'glass-pill hover:border-secondary/50'
                } ${location.pathname === '/profil' ? 'ring-2 ring-secondary/50' : ''}`}
              >
                <span className="hidden xl:inline text-xs font-bold truncate max-w-[100px]">
                  {profile.name.split(' ')[0]}
                </span>
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-secondary/30"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                isHeroMode
                  ? 'bg-white/60 border border-[#0B482D]/15 text-[#062B1D] hover:bg-white'
                  : 'glass-pill text-on-surface hover:text-secondary'
              }`}
              aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            >
              <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={20} />
            </button>
          </div>

        </div>
      </header>

      {/* 4. Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-md pt-20"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-20 bottom-0 w-full max-w-sm glass-dropdown border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-6">
                {NAV_GROUPS.map((group, idx) => (
                  <div key={group.id} className={`space-y-2 ${idx > 0 ? 'pt-4 border-t border-outline-variant/15' : 'pt-2'}`}>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-outline block">
                      {group.label}
                    </span>
                    <div className="space-y-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 p-2.5 rounded-xl text-sm font-semibold transition-colors ${
                            location.pathname === item.path
                              ? 'bg-secondary/15 text-secondary font-bold'
                              : 'text-on-surface hover:bg-surface-container'
                          }`}
                        >
                          <Icon name={item.icon} size={16} className="text-secondary" />
                          <span>{item.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="border-t border-outline-variant/15 pt-4 space-y-2">
                  <Link
                    to="/kontak"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container"
                  >
                    <Icon name="mail" size={16} className="text-secondary" />
                    <span>Kontak & Hub</span>
                  </Link>
                  <Link
                    to="/profil"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container"
                  >
                    <Icon name="user" size={16} className="text-secondary" />
                    <span>Dasbor Profil</span>
                  </Link>
                </div>
              </div>

              {/* Bottom Quick Action in Drawer */}
              <div className="pt-6 border-t border-outline-variant/20 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openDepositModal();
                  }}
                  className="w-full h-12 rounded-xl bg-secondary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Icon name="add_circle" size={16} />
                  <span>Catat Setoran Sampah</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
