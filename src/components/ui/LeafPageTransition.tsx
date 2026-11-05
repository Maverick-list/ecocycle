import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Stylized botanical leaf with vivid gradient and visible glowing veins
const VividLeaf: React.FC<{
  size: number;
  rotation?: number;
  flip?: boolean;
}> = ({ size, rotation = 0, flip = false }) => {
  const gradId = `leaf-vivid-${size}-${Math.abs(rotation)}`;
  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg) ${flip ? 'scaleX(-1)' : ''}`,
        filter: 'drop-shadow(0 14px 28px rgba(16, 185, 129, 0.85)) drop-shadow(0 4px 12px rgba(74, 222, 128, 0.6))',
      }}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D9F99D" />
            <stop offset="25%" stopColor="#4ADE80" />
            <stop offset="65%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
        {/* Curving organic leaf silhouette */}
        <path
          d="M50 4 C20 14 5 44 14 74 C24 94 66 94 86 74 C95 44 80 14 50 4 Z"
          fill={`url(#${gradId})`}
        />
        {/* Central glowing white spine vein */}
        <path
          d="M50 10 Q50 55 18 82"
          stroke="#FFFFFF"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Branch veins */}
        <path d="M47 32 Q30 35 22 42" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.95" />
        <path d="M49 46 Q68 43 78 50" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.95" />
        <path d="M44 58 Q29 61 24 68" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.95" />
        <path d="M40 68 Q55 66 65 72" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.95" />
      </svg>
    </div>
  );
};

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

    // Trigger visual cinematic organic leaf transition
    setTransitionId((prev) => prev + 1);
    setIsTransitioning(true);

    // Auto-dismiss cleanly after 900ms
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 900);

    return () => clearTimeout(timer);
  }, [location.pathname, shouldReduceMotion]);

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && !shouldReduceMotion && (
        <motion.div
          key={`leaf-breeze-${transitionId}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9990] pointer-events-none select-none overflow-hidden flex items-center justify-center"
        >
          {/* 1. Atmospheric Botanical Breeze Shimmer (Soft translucent emerald haze) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.45, 0] }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-tr from-emerald-950/30 via-emerald-800/15 to-transparent backdrop-blur-[2px]"
          />

          {/* 2. Top Glowing Emerald Energy Stream */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-transparent via-[#4ade80] to-transparent shadow-[0_0_30px_rgba(74,222,128,1)]"
          />

          {/* 3. Center Apple visionOS Frosted Leaf Emblem */}
          <motion.div
            initial={{ scale: 0.75, y: 20, opacity: 0 }}
            animate={{
              scale: [0.75, 1.05, 1, 0.95],
              y: [20, 0, 0, -15],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 0.88,
              times: [0, 0.18, 0.82, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-30 flex items-center gap-4 px-8 py-4 rounded-full bg-[#05321f]/95 border-2 border-[#4ade80] shadow-[0_0_50px_rgba(74,222,128,0.55)] backdrop-blur-2xl ring-4 ring-emerald-400/30 text-white"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-400/25 border border-emerald-300 flex items-center justify-center p-1.5 shadow-[0_0_15px_#4ade80]">
              <VividLeaf size={32} rotation={15} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 font-display font-black text-xl tracking-[0.25em] uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                <span>ECO</span><span className="text-[#86efac]">CYCLE</span>
              </div>
              <span className="text-xs font-black tracking-[0.2em] uppercase text-[#a7f3d0] drop-shadow-sm">
                Transisi Sirkular
              </span>
            </div>
          </motion.div>

          {/* 4. Flock of Swirling Botanical Leaves - Anchored at top-left (left-0 top-0) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            
            {/* Leaf 1: Giant foreground hero leaf (130px) soaring from bottom-left up across to top-right */}
            <motion.div
              initial={{ x: '-15vw', y: '90vh', rotate: -60, scale: 0.7, opacity: 0 }}
              animate={{
                x: ['-10vw', '25vw', '65vw', '110vw'],
                y: ['90vh', '50vh', '20vh', '-25vh'],
                rotate: [-60, 10, 80, 150],
                scale: [0.7, 1.25, 1.15, 0.8],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 0.88,
                times: [0, 0.2, 0.8, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute left-0 top-0"
            >
              <VividLeaf size={130} rotation={-20} />
            </motion.div>

            {/* Leaf 2: High-speed counter-swirling leaf (110px) from bottom-right across center to top-left */}
            <motion.div
              initial={{ x: '105vw', y: '80vh', rotate: 70, scale: 0.6, opacity: 0 }}
              animate={{
                x: ['100vw', '65vw', '30vw', '-20vw'],
                y: ['80vh', '45vh', '15vh', '-30vh'],
                rotate: [70, -10, -80, -160],
                scale: [0.6, 1.15, 1.0, 0.7],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 0.86,
                times: [0, 0.2, 0.8, 1],
                ease: [0.25, 1, 0.5, 1],
                delay: 0.03,
              }}
              className="absolute left-0 top-0"
            >
              <VividLeaf size={110} rotation={35} flip={true} />
            </motion.div>

            {/* Leaf 3: Midground leaf (90px) rising vertically through center */}
            <motion.div
              initial={{ x: '45vw', y: '100vh', rotate: -15, scale: 0.6, opacity: 0 }}
              animate={{
                x: ['45vw', '52vw', '48vw', '56vw'],
                y: ['100vh', '55vh', '20vh', '-25vh'],
                rotate: [-15, 45, 110, 180],
                scale: [0.6, 1.1, 1.0, 0.8],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 0.84,
                times: [0, 0.2, 0.8, 1],
                ease: 'easeOut',
                delay: 0.05,
              }}
              className="absolute left-0 top-0"
            >
              <VividLeaf size={90} rotation={15} />
            </motion.div>

            {/* Leaf 4: Left curving flutter leaf (75px) */}
            <motion.div
              initial={{ x: '5vw', y: '85vh', rotate: 40, scale: 0.5, opacity: 0 }}
              animate={{
                x: ['5vw', '20vw', '35vw', '48vw'],
                y: ['85vh', '45vh', '12vh', '-20vh'],
                rotate: [40, 120, 200, 280],
                scale: [0.5, 1.0, 0.9, 0.7],
                opacity: [0, 0.95, 0.9, 0],
              }}
              transition={{
                duration: 0.82,
                times: [0, 0.2, 0.8, 1],
                ease: 'easeOut',
                delay: 0.06,
              }}
              className="absolute left-0 top-0"
            >
              <VividLeaf size={75} rotation={-10} />
            </motion.div>

            {/* Leaf 5: Right flutter accent leaf (70px) */}
            <motion.div
              initial={{ x: '85vw', y: '90vh', rotate: -45, scale: 0.5, opacity: 0 }}
              animate={{
                x: ['85vw', '90vw', '96vw'],
                y: ['90vh', '40vh', '-20vh'],
                rotate: [-45, 30, 110],
                scale: [0.5, 0.95, 0.75],
                opacity: [0, 0.9, 0.85, 0],
              }}
              transition={{
                duration: 0.8,
                times: [0, 0.2, 0.8, 1],
                ease: 'easeOut',
                delay: 0.08,
              }}
              className="absolute left-0 top-0"
            >
              <VividLeaf size={70} rotation={-30} flip={true} />
            </motion.div>

            {/* Leaf 6: Depth-blur accent leaf (55px) */}
            <motion.div
              initial={{ x: '25vw', y: '95vh', rotate: 10, scale: 0.4, opacity: 0 }}
              animate={{
                x: ['25vw', '35vw', '45vw'],
                y: ['95vh', '50vh', '-15vh'],
                rotate: [10, 90, 170],
                scale: [0.4, 0.8, 0.6],
                opacity: [0, 0.85, 0.8, 0],
              }}
              transition={{
                duration: 0.78,
                times: [0, 0.2, 0.8, 1],
                ease: 'easeOut',
                delay: 0.09,
              }}
              className="absolute left-0 top-0 blur-[1px]"
            >
              <VividLeaf size={55} rotation={25} />
            </motion.div>

            {/* 5. Floating Glowing Chlorophyll / Spore Sparkles */}
            {[
              { x: '18vw', y: '75vh', delay: 0.02 },
              { x: '38vw', y: '65vh', delay: 0.07 },
              { x: '58vw', y: '80vh', delay: 0.04 },
              { x: '72vw', y: '55vh', delay: 0.09 },
              { x: '32vw', y: '45vh', delay: 0.12 },
            ].map((spark, idx) => (
              <motion.div
                key={`spark-${idx}`}
                initial={{ opacity: 0, scale: 0, x: spark.x, y: spark.y }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 2, 1.5, 0],
                  y: [`${parseFloat(spark.y)}vh`, `${parseFloat(spark.y) - 40}vh`],
                }}
                transition={{ duration: 0.75, delay: spark.delay, ease: 'easeOut' }}
                className="absolute left-0 top-0 w-3 h-3 rounded-full bg-[#86efac] shadow-[0_0_20px_#4ade80]"
              />
            ))}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
