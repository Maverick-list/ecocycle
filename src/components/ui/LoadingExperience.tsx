import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

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
    const hasSeenIntro = sessionStorage.getItem('ecocycle_living_intro_v4');
    return !hasSeenIntro;
  });

  const [progress, setProgress] = useState<number>(0);
  const [stage, setStage] = useState<number>(1); // 1: background, 2: leaf unfold, 3: orbit, 4: wordmark

  useEffect(() => {
    if (!isVisible) {
      if (onComplete) onComplete();
      return;
    }

    if (shouldReduceMotion) {
      sessionStorage.setItem('ecocycle_living_intro_v4', 'true');
      setIsVisible(false);
      if (onComplete) onComplete();
      return;
    }

    // Sequence stages
    const timerStage2 = setTimeout(() => setStage(2), 200);
    const timerStage3 = setTimeout(() => setStage(3), 600);
    const timerStage4 = setTimeout(() => setStage(4), 1000);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 6) + 4;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            sessionStorage.setItem('ecocycle_living_intro_v4', 'true');
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return next;
      });
    }, 45);

    return () => {
      clearInterval(interval);
      clearTimeout(timerStage2);
      clearTimeout(timerStage3);
      clearTimeout(timerStage4);
    };
  }, [isVisible, shouldReduceMotion, onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('ecocycle_living_intro_v4', 'true');
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="living-intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)',
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#02140d] text-white overflow-hidden select-none"
        >
          {/* 1. Deep Forest Ambient Lighting */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-[#006c48]/25 blur-[140px] animate-pulse-subtle" />
            <div className="absolute bottom-1/3 right-1/3 w-[450px] h-[450px] rounded-full bg-[#cbf075]/10 blur-[150px] animate-pulse-subtle" style={{ animationDelay: '2s' }} />
          </div>

          {/* 2. Unfolding Circular Ecological Rings */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-lg px-8">
            
            {/* Centerpiece SVG: Leaf & Circular Recycling Orbit */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              
              {/* Outer Circular Recycling Orbit developing */}
              <motion.svg
                width="144"
                height="144"
                viewBox="0 0 144 144"
                className="absolute inset-0"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              >
                <circle
                  cx="72"
                  cy="72"
                  r="66"
                  stroke="rgba(203, 240, 117, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="6 8"
                  fill="none"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="52"
                  stroke="rgba(0, 200, 120, 0.35)"
                  strokeWidth="1"
                  strokeDasharray="12 16"
                  fill="none"
                />
                <circle cx="72" cy="6" r="3.5" fill="#CBF075" />
                <circle cx="138" cy="72" r="3" fill="#34d399" />
                <circle cx="72" cy="138" r="3.5" fill="#CBF075" />
                <circle cx="6" cy="72" r="3" fill="#34d399" />
              </motion.svg>

              {/* Geometric Interlocking Leaves Unfolding */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
                animate={{
                  scale: stage >= 2 ? 1 : 0.6,
                  opacity: stage >= 2 ? 1 : 0,
                  rotate: stage >= 2 ? 0 : -20,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 rounded-3xl bg-[#032317]/80 border border-[#cbf075]/25 shadow-2xl backdrop-blur-xl"
              >
                <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
                  <defs>
                    <linearGradient id="introLeafGrad" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#CBF075" />
                      <stop offset="50%" stopColor="#00A86B" />
                      <stop offset="100%" stopColor="#002517" />
                    </linearGradient>
                    <linearGradient id="introLeafGrad2" x1="42" y1="42" x2="6" y2="6" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#CBF075" />
                      <stop offset="60%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#064e3b" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M24 6C15.163 6 8 13.163 8 22C8 28.5 13 34 19 35C19 30 18 25 21 21C24 17 29 16 34 16C33 10.5 29 6 24 6Z"
                    fill="url(#introLeafGrad)"
                  />
                  <path
                    d="M24 42C32.837 42 40 34.837 40 26C40 19.5 35 14 29 13C29 18 30 23 27 27C24 31 19 32 14 32C15 37.5 19 42 24 42Z"
                    fill="url(#introLeafGrad2)"
                    opacity="0.95"
                  />
                  <circle cx="24" cy="24" r="3.5" fill="#CBF075" />
                  <circle cx="24" cy="24" r="1.5" fill="#002517" />
                </svg>
              </motion.div>
            </div>

            {/* 3. Wordmark & Living Ecological Thesis */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: stage >= 4 ? 1 : 0,
                y: stage >= 4 ? 0 : 15,
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2"
            >
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tighter text-white">
                ECO<span className="text-[#cbf075]">CYCLE</span>
              </h2>
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#94f6c4] font-bold">
                A Living Circular Economy Experience
              </p>
            </motion.div>

            {/* 4. Minimal Progress Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-xs space-y-2.5 pt-2"
            >
              <div className="flex justify-between items-center text-[11px] font-mono text-white/60">
                <span>Inisialisasi Ekosistem Sirkular</span>
                <span className="text-[#cbf075] font-bold tabular-nums">{progress}%</span>
              </div>
              <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00A86B] via-[#cbf075] to-[#34d399]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>

            {/* Skip Option */}
            <button
              type="button"
              onClick={handleSkip}
              className="text-[11px] uppercase tracking-widest text-white/40 hover:text-[#cbf075] transition-colors cursor-pointer font-bold pt-2 flex items-center gap-1 focus:outline-none"
            >
              <span>Lewati Pengantar</span>
              <span>→</span>
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
