import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { EcocycleLogo } from '../brand/EcocycleLogo';

interface LoadingExperienceProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export const LoadingExperience: React.FC<LoadingExperienceProps> = ({
  onComplete,
  forceShow = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (forceShow) return true;
    if (typeof window === 'undefined') return false;
    const hasSeenIntro = sessionStorage.getItem('ecocycle_intro_completed');
    return !hasSeenIntro;
  });

  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('Menyiapkan Ekosistem Sirkular...');

  useEffect(() => {
    if (!isVisible) {
      if (onComplete) onComplete();
      return;
    }

    if (shouldReduceMotion) {
      sessionStorage.setItem('ecocycle_intro_completed', 'true');
      setIsVisible(false);
      if (onComplete) onComplete();
      return;
    }

    const statuses = [
      { at: 15, text: 'Menginisialisasi Hub Lingkungan...' },
      { at: 40, text: 'Memuat Model Audit Material EPA WARM...' },
      { at: 70, text: 'Menghubungkan Rantai Lacak SNI 19-3983...' },
      { at: 90, text: 'Menyiapkan Pengalaman Ekologis...' },
      { at: 100, text: 'Selamat Datang di ECOCYCLE' },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(interval);
          setStatusText('Selamat Datang di ECOCYCLE');
          setTimeout(() => {
            sessionStorage.setItem('ecocycle_intro_completed', 'true');
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 600);
          return 100;
        }

        const currentStatus = statuses.find((s) => next >= s.at && prev < s.at);
        if (currentStatus) {
          setStatusText(currentStatus.text);
        }
        return next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [isVisible, shouldReduceMotion, onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('ecocycle_intro_completed', 'true');
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#00170e] text-surface-bright overflow-hidden select-none"
        >
          {/* Ambient organic particle glow backgrounds */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-secondary/20 blur-[120px] animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-tertiary-fixed/15 blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
          </div>

          {/* Animated SVG Circular Orbits and Leaves in Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <svg width="600" height="600" viewBox="0 0 600 600" fill="none" className="animate-spin-slow">
              <circle cx="300" cy="300" r="260" stroke="#CBF075" strokeWidth="1" strokeDasharray="6 8" opacity="0.3" />
              <circle cx="300" cy="300" r="190" stroke="#006C48" strokeWidth="1.5" strokeDasharray="12 16" opacity="0.4" />
              <circle cx="300" cy="300" r="120" stroke="#CBF075" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
              
              {/* Orbital leaf nodes */}
              <circle cx="300" cy="40" r="5" fill="#CBF075" />
              <circle cx="490" cy="300" r="4" fill="#006C48" />
              <circle cx="110" cy="300" r="4" fill="#CBF075" />
              <circle cx="300" cy="560" r="5" fill="#006C48" />
            </svg>
          </div>

          {/* Central Reveal Stage */}
          <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center space-y-6">
            
            {/* Logo Mark Reveal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="p-4 rounded-3xl bg-primary/60 border border-tertiary-fixed/20 shadow-2xl backdrop-blur-md"
            >
              <EcocycleLogo size="xl" variant="dark" showTagline={true} />
            </motion.div>

            {/* Moving Gradient Slogan */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="space-y-1.5"
            >
              <h2 className="text-xl sm:text-2xl font-bold animated-eco-gradient tracking-tight">
                Teknologi Ekonomi Sirkular Berkelanjutan
              </h2>
              <p className="text-xs text-primary-fixed-dim/90 font-medium">
                Kuningan Green Initiative • Web Design Competition 2026
              </p>
            </motion.div>

            {/* Sophisticated Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="w-full max-w-xs space-y-2 pt-2"
            >
              <div className="flex justify-between items-center text-[11px] font-bold text-tertiary-fixed">
                <span className="truncate max-w-[200px] text-left text-surface-dim font-medium">{statusText}</span>
                <span className="tabular-nums font-mono">{progress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-primary-container border border-primary-fixed-variant/40 overflow-hidden relative">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-secondary via-tertiary-fixed to-secondary-fixed"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.15 }}
                />
              </div>
            </motion.div>

            {/* Skip Button */}
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              onClick={handleSkip}
              className="pt-4 text-[11px] uppercase tracking-widest text-outline-variant hover:text-tertiary-fixed cursor-pointer transition-colors flex items-center gap-1.5 font-bold"
            >
              <span>Lewati Pengantar</span>
              <span>→</span>
            </motion.button>
          </div>

          {/* Organic Leaf-Unfolding Aperture Masks (Reveal on exit) */}
          <motion.div
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformOrigin: 'top' }}
            className="absolute inset-x-0 top-0 h-1/2 bg-[#00170e] z-20 pointer-events-none"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformOrigin: 'bottom' }}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#00170e] z-20 pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
