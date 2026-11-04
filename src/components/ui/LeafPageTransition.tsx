import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Organic stylized SVG leaf component with gradient fill
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
    className={`filter drop-shadow-[0_4px_16px_rgba(16,185,129,0.35)] ${className}`}
    style={{
      transform: `rotate(${rotation}deg) ${flip ? 'scaleX(-1)' : ''}`,
    }}
  >
    <defs>
      <linearGradient id="leafGrad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#C8F0A5" />
        <stop offset="40%" stopColor="#34D399" />
        <stop offset="85%" stopColor="#059669" />
        <stop offset="100%" stopColor="#064E3B" />
      </linearGradient>
      <linearGradient id="veinGrad" x1="32" y1="8" x2="32" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
        <stop offset="100%" stopColor="rgba(200,240,165,0.3)" />
      </linearGradient>
    </defs>
    {/* Main organic leaf shape */}
    <path
      d="M32 6C18 6 8 18 8 32C8 42 16 50 26 54C26 46 25 38 29 32C33 26 40 24 48 24C46 14 40 6 32 6Z"
      fill="url(#leafGrad)"
    />
    <path
      d="M32 58C46 58 56 46 56 32C56 22 48 14 38 10C38 18 39 26 35 32C31 38 24 40 16 40C18 50 24 58 32 58Z"
      fill="url(#leafGrad)"
      opacity="0.9"
    />
    {/* Delicate leaf stem & central vein */}
    <path
      d="M12 52Q32 32 44 14"
      stroke="url(#veinGrad)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M26 38Q34 35 38 30"
      stroke="url(#veinGrad)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M20 44Q26 41 30 36"
      stroke="url(#veinGrad)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

export const LeafPageTransition: React.FC = () => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [prevPath, setPrevPath] = useState<string>(location.pathname);

  useEffect(() => {
    // If the path hasn't changed, do nothing
    if (location.pathname === prevPath) return;

    setPrevPath(location.pathname);

    if (shouldReduceMotion) return;

    // Trigger the organic leaf transition
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600); // 600ms total smooth transition

    return () => clearTimeout(timer);
  }, [location.pathname, prevPath, shouldReduceMotion]);

  if (shouldReduceMotion || !isTransitioning) return null;

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key={`leaf-curtain-${location.pathname}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9990] pointer-events-none select-none flex items-center justify-center overflow-hidden"
        >
          {/* Layer 1: Lush botanical ambient blur wash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[#02150e]/60 backdrop-blur-md"
          />

          {/* Layer 2: Organic Curved Green Wave Sweeping Across */}
          <motion.div
            initial={{ y: '100%', opacity: 0.85 }}
            animate={{ y: '-100%', opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-[200vh] bg-gradient-to-b from-transparent via-[#063321]/90 to-transparent pointer-events-none"
          />

          {/* Layer 3: Floating Cascading Botanical Leaves */}
          <div className="relative z-10 w-full max-w-4xl h-full flex items-center justify-around pointer-events-none px-6">
            
            {/* Leaf 1: Left Floater */}
            <motion.div
              initial={{ y: 80, x: -40, rotate: -35, opacity: 0, scale: 0.6 }}
              animate={{
                y: -100,
                x: 20,
                rotate: 25,
                opacity: [0, 1, 1, 0],
                scale: 1,
              }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="absolute left-[15%] top-[45%]"
            >
              <StylizedLeaf size={84} rotation={15} />
            </motion.div>

            {/* Leaf 2: Center Primary Hero Leaf */}
            <motion.div
              initial={{ y: 60, scale: 0.5, rotate: -15, opacity: 0 }}
              animate={{
                y: -80,
                scale: [0.5, 1.25, 1],
                rotate: 45,
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-3"
            >
              <div className="p-4 rounded-3xl bg-[#062c1d]/85 border border-[#C8F0A5]/30 shadow-2xl backdrop-blur-xl">
                <StylizedLeaf size={96} rotation={-10} />
              </div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 0], y: -5 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-[11px] font-sans font-extrabold uppercase tracking-[0.25em] text-[#C8F0A5] drop-shadow-md"
              >
                ECOCYCLE
              </motion.span>
            </motion.div>

            {/* Leaf 3: Right Floater */}
            <motion.div
              initial={{ y: 100, x: 40, rotate: 45, opacity: 0, scale: 0.7 }}
              animate={{
                y: -70,
                x: -30,
                rotate: -20,
                opacity: [0, 1, 1, 0],
                scale: 1.05,
              }}
              transition={{ duration: 0.56, ease: 'easeOut', delay: 0.02 }}
              className="absolute right-[18%] top-[50%]"
            >
              <StylizedLeaf size={76} rotation={-30} flip={true} />
            </motion.div>

            {/* Leaf 4: Mini accent leaf top right */}
            <motion.div
              initial={{ y: 50, x: 20, rotate: 10, opacity: 0 }}
              animate={{
                y: -120,
                x: -20,
                rotate: 90,
                opacity: [0, 0.9, 0],
              }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
              className="absolute right-[32%] top-[30%]"
            >
              <StylizedLeaf size={48} rotation={60} />
            </motion.div>

            {/* Leaf 5: Mini accent leaf bottom left */}
            <motion.div
              initial={{ y: 70, x: -10, rotate: -45, opacity: 0 }}
              animate={{
                y: -90,
                x: 30,
                rotate: 15,
                opacity: [0, 0.85, 0],
              }}
              transition={{ duration: 0.52, ease: 'easeOut', delay: 0.04 }}
              className="absolute left-[30%] top-[60%]"
            >
              <StylizedLeaf size={52} rotation={-15} />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
