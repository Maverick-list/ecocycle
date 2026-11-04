import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Stylized organic SVG leaf with gradient fill
const StylizedLeaf: React.FC<{
  size?: number;
  rotation?: number;
  flip?: boolean;
  className?: string;
}> = ({ size = 64, rotation = 0, flip = false, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`filter drop-shadow-[0_4px_16px_rgba(16,185,129,0.4)] ${className}`}
    style={{
      transform: `rotate(${rotation}deg) ${flip ? 'scaleX(-1)' : ''}`,
    }}
  >
    <defs>
      <linearGradient id="leafGradTrans" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#C8F0A5" />
        <stop offset="40%" stopColor="#34D399" />
        <stop offset="85%" stopColor="#059669" />
        <stop offset="100%" stopColor="#064E3B" />
      </linearGradient>
      <linearGradient id="veinGradTrans" x1="32" y1="8" x2="32" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
        <stop offset="100%" stopColor="rgba(200,240,165,0.4)" />
      </linearGradient>
    </defs>
    <path
      d="M32 6C18 6 8 18 8 32C8 42 16 50 26 54C26 46 25 38 29 32C33 26 40 24 48 24C46 14 40 6 32 6Z"
      fill="url(#leafGradTrans)"
    />
    <path
      d="M32 58C46 58 56 46 56 32C56 22 48 14 38 10C38 18 39 26 35 32C31 38 24 40 16 40C18 50 24 58 32 58Z"
      fill="url(#leafGradTrans)"
      opacity="0.92"
    />
    <path
      d="M12 52Q32 32 44 14"
      stroke="url(#veinGradTrans)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M26 38Q34 35 38 30"
      stroke="url(#veinGradTrans)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M20 44Q26 41 30 36"
      stroke="url(#veinGradTrans)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

export const LeafPageTransition: React.FC = () => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionId, setTransitionId] = useState<number>(0);
  const prevPathRef = useRef<string>(location.pathname);
  const isFirstMount = useRef<boolean>(true);

  useEffect(() => {
    // Avoid triggering on initial mount
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    // Do nothing if navigating to the exact same path
    if (location.pathname === prevPathRef.current) return;
    prevPathRef.current = location.pathname;

    if (shouldReduceMotion) return;

    // Trigger graceful organic leaf transition
    setTransitionId((prev) => prev + 1);
    setIsTransitioning(true);

    // Auto-dismiss cleanly after 500ms
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname, shouldReduceMotion]);

  // NEVER return null before AnimatePresence to allow clean exit animations
  return (
    <AnimatePresence mode="wait">
      {isTransitioning && !shouldReduceMotion && (
        <motion.div
          key={`leaf-breeze-${transitionId}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9990] pointer-events-none select-none overflow-hidden flex items-center justify-center bg-transparent"
        >
          {/* Subtle soft luminous top emerald shimmer (Transparent, never blackouts the screen!) */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#86efac]/80 to-transparent shadow-[0_0_15px_rgba(134,239,172,0.8)]" />

          {/* Floating Organic Leaves Breeze (Purely decorative overlay, zero page obscuration) */}
          <div className="relative w-full h-full max-w-6xl mx-auto pointer-events-none">
            
            {/* Leaf 1: Swirling from bottom-left to upper-middle */}
            <motion.div
              initial={{ x: '-10vw', y: '60vh', rotate: -40, opacity: 0, scale: 0.6 }}
              animate={{
                x: ['-5vw', '15vw', '30vw'],
                y: ['50vh', '15vh', '-20vh'],
                rotate: [-40, 15, 60],
                opacity: [0, 0.9, 0],
                scale: [0.6, 1, 0.8],
              }}
              transition={{ duration: 0.48, ease: [0.25, 1, 0.5, 1] }}
              className="absolute left-0 bottom-0"
            >
              <StylizedLeaf size={72} rotation={-15} />
            </motion.div>

            {/* Leaf 2: Center Floating Elegance Badge */}
            <motion.div
              initial={{ y: 35, scale: 0.85, opacity: 0 }}
              animate={{
                y: [35, 0, -25],
                scale: [0.85, 1.05, 0.95],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#031c12]/80 border border-[#86efac]/40 shadow-2xl backdrop-blur-md"
            >
              <StylizedLeaf size={28} rotation={20} />
              <span className="font-display font-extrabold text-xs tracking-[0.25em] uppercase text-[#86efac]">
                ECOCYCLE
              </span>
            </motion.div>

            {/* Leaf 3: Swirling from mid-right toward top-left */}
            <motion.div
              initial={{ x: '90vw', y: '70vh', rotate: 50, opacity: 0, scale: 0.5 }}
              animate={{
                x: ['85vw', '60vw', '45vw'],
                y: ['60vh', '20vh', '-15vh'],
                rotate: [50, -10, -45],
                opacity: [0, 0.85, 0],
                scale: [0.5, 0.95, 0.75],
              }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1], delay: 0.02 }}
              className="absolute left-0 bottom-0"
            >
              <StylizedLeaf size={64} rotation={40} flip={true} />
            </motion.div>

            {/* Leaf 4: Mini accent leaf flutter */}
            <motion.div
              initial={{ x: '35vw', y: '80vh', rotate: 10, opacity: 0 }}
              animate={{
                x: ['35vw', '45vw', '55vw'],
                y: ['70vh', '30vh', '-10vh'],
                rotate: [10, 80, 160],
                opacity: [0, 0.75, 0],
              }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.04 }}
              className="absolute left-0 bottom-0"
            >
              <StylizedLeaf size={44} rotation={45} />
            </motion.div>

            {/* Leaf 5: Fast right sweep leaf */}
            <motion.div
              initial={{ x: '70vw', y: '50vh', rotate: -30, opacity: 0 }}
              animate={{
                x: ['70vw', '80vw', '95vw'],
                y: ['45vh', '15vh', '-25vh'],
                rotate: [-30, 30, 90],
                opacity: [0, 0.8, 0],
              }}
              transition={{ duration: 0.47, ease: 'easeOut', delay: 0.03 }}
              className="absolute left-0 bottom-0"
            >
              <StylizedLeaf size={52} rotation={-25} flip={true} />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
