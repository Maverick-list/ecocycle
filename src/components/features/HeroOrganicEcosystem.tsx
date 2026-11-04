import React, { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HeroOrganicEcosystemProps {
  className?: string;
}

export const HeroOrganicEcosystem: React.FC<HeroOrganicEcosystemProps> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  // Parallax offsets
  const parallaxOrb1 = { x: mousePosition.x * 24, y: mousePosition.y * 24 };
  const parallaxOrb2 = { x: -mousePosition.x * 32, y: -mousePosition.y * 32 };
  const parallaxOrb3 = { x: mousePosition.x * 16, y: -mousePosition.y * 16 };
  const parallaxLeaves = { x: -mousePosition.x * 20, y: mousePosition.y * 20 };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. ATMOSPHERIC GREEN LIGHTING BLOBS */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[500px] rounded-full bg-[#C8F0A5]/25 blur-[120px] pointer-events-none" />
      <div className="absolute top-[35%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#45A65B]/25 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[15%] w-[650px] h-[450px] rounded-full bg-[#167A45]/30 blur-[150px] pointer-events-none" />

      {/* 2. CENTRAL CIRCULAR TRANSFORMATION RING (The Closed-Loop Circular Icon) */}
      <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] sm:w-[860px] sm:h-[860px] opacity-35">
        <svg
          viewBox="0 0 800 800"
          className="w-full h-full animate-[spin_60s_linear_infinite]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="orbitGrad1" x1="0" y1="0" x2="800" y2="800" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C8F0A5" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8CCF75" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#167A45" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="orbitGrad2" x1="800" y1="0" x2="0" y2="800" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F4FDF0" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#45A65B" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0B482D" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Outer Dashed Orbit */}
          <circle
            cx="400"
            cy="400"
            r="360"
            stroke="url(#orbitGrad1)"
            strokeWidth="1.5"
            strokeDasharray="8 14"
          />

          {/* Middle Continuous Ring */}
          <circle
            cx="400"
            cy="400"
            r="280"
            stroke="url(#orbitGrad2)"
            strokeWidth="1"
            strokeOpacity="0.6"
          />

          {/* Inner Dashed Ring */}
          <circle
            cx="400"
            cy="400"
            r="200"
            stroke="url(#orbitGrad1)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />

          {/* Orbiting Transformation Satellite Nodes */}
          <circle cx="400" cy="40" r="5" fill="#C8F0A5" className="filter drop-shadow-[0_0_8px_#C8F0A5]" />
          <circle cx="760" cy="400" r="4" fill="#8CCF75" className="filter drop-shadow-[0_0_6px_#8CCF75]" />
          <circle cx="400" cy="760" r="6" fill="#F4FDF0" className="filter drop-shadow-[0_0_10px_#FFFFFF]" />
          <circle cx="40" cy="400" r="4" fill="#C8F0A5" className="filter drop-shadow-[0_0_6px_#C8F0A5]" />

          <circle cx="202" cy="202" r="3.5" fill="#C8F0A5" />
          <circle cx="598" cy="598" r="3.5" fill="#8CCF75" />
        </svg>
      </div>

      {/* 3. APPLE visionOS TRANSLUCENT GLASS SPHERES */}
      
      {/* Orb 1: Upper Left Hero Glass Sphere (Floating & Luminous) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -18, 0],
                rotate: [0, 6, 0]
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          transform: `translate3d(${parallaxOrb1.x}px, ${parallaxOrb1.y}px, 0)`
        }}
        className="hidden md:block absolute left-[6%] top-[24%] w-32 h-32 lg:w-40 lg:h-40 rounded-full z-10"
      >
        <div className="w-full h-full rounded-full relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/35 via-[#C8F0A5]/20 to-[#167A45]/30 border border-white/50 shadow-[0_20px_50px_rgba(6,43,29,0.35),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-4px_12px_rgba(22,122,69,0.4)]">
          {/* Specular Highlight Glint */}
          <div className="absolute top-[18%] left-[22%] w-[45%] h-[35%] rounded-full bg-gradient-to-b from-white/80 to-transparent transform -rotate-30 filter blur-[0.5px]" />
          {/* Secondary Rim Caustic Glow */}
          <div className="absolute bottom-[10%] right-[15%] w-[35%] h-[25%] rounded-full bg-[#C8F0A5]/50 filter blur-[4px]" />
        </div>
      </motion.div>

      {/* Orb 2: Mid-Right Floating Glass Sphere */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, 22, 0],
                rotate: [0, -8, 0]
              }
        }
        transition={{
          duration: 8.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
        style={{
          transform: `translate3d(${parallaxOrb2.x}px, ${parallaxOrb2.y}px, 0)`
        }}
        className="hidden sm:block absolute right-[8%] top-[38%] w-24 h-24 lg:w-32 lg:h-32 rounded-full z-10"
      >
        <div className="w-full h-full rounded-full relative overflow-hidden backdrop-blur-lg bg-gradient-to-br from-white/30 via-[#8CCF75]/25 to-[#0B482D]/40 border border-white/45 shadow-[0_25px_45px_rgba(6,43,29,0.4),inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-4px_10px_rgba(11,72,45,0.5)]">
          <div className="absolute top-[16%] left-[20%] w-[40%] h-[30%] rounded-full bg-gradient-to-b from-white/75 to-transparent transform -rotate-25" />
          <div className="absolute bottom-[12%] right-[18%] w-[40%] h-[25%] rounded-full bg-[#8CCF75]/45 filter blur-[3px]" />
        </div>
      </motion.div>

      {/* Orb 3: Micro Sphere Lower Left */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -12, 0]
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
        style={{
          transform: `translate3d(${parallaxOrb3.x}px, ${parallaxOrb3.y}px, 0)`
        }}
        className="hidden lg:block absolute left-[18%] bottom-[16%] w-16 h-16 rounded-full z-10"
      >
        <div className="w-full h-full rounded-full relative overflow-hidden backdrop-blur-md bg-gradient-to-br from-white/25 via-[#C8F0A5]/15 to-[#0B482D]/30 border border-white/40 shadow-[0_15px_30px_rgba(6,43,29,0.3),inset_0_1px_3px_rgba(255,255,255,0.6)]">
          <div className="absolute top-[18%] left-[20%] w-[40%] h-[30%] rounded-full bg-white/70" />
        </div>
      </motion.div>

      {/* 4. ORGANIC TRANSLUCENT BOTANICAL LEAF FORMS */}
      
      {/* Leaf 1: Elegant Curved Laurel Leaf (Top Left) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotate: [-4, 6, -4],
                y: [0, -14, 0]
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          transform: `translate3d(${parallaxLeaves.x}px, ${parallaxLeaves.y}px, 0)`
        }}
        className="hidden md:block absolute left-[3%] top-[14%] w-44 h-44 lg:w-56 lg:h-56 opacity-60 z-0"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="leafGrad1" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C8F0A5" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#45A65B" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0B482D" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path
            d="M30 170 C40 100, 100 40, 180 30 C170 100, 110 160, 30 170 Z"
            fill="url(#leafGrad1)"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1"
          />
          {/* Central vein */}
          <path
            d="M30 170 Q105 105 180 30"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="1.2"
            strokeDasharray="2 4"
          />
          {/* Side veins */}
          <path d="M70 130 Q90 120 105 135" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" />
          <path d="M100 100 Q120 90 135 105" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" />
          <path d="M130 70 Q150 60 165 75" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" />
        </svg>
      </motion.div>

      {/* Leaf 2: Monstera / Palm Leaf (Right Margin) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotate: [4, -6, 4],
                y: [0, 16, 0]
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5
        }}
        style={{
          transform: `translate3d(${-parallaxLeaves.x}px, ${-parallaxLeaves.y}px, 0)`
        }}
        className="hidden sm:block absolute right-[2%] top-[20%] w-48 h-48 lg:w-64 lg:h-64 opacity-55 z-0"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="leafGrad2" x1="180" y1="30" x2="20" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F4FDF0" stopOpacity="0.8" />
              <stop offset="45%" stopColor="#8CCF75" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#167A45" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M170 30 C160 100, 100 160, 20 170 C30 100, 90 40, 170 30 Z"
            fill="url(#leafGrad2)"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1"
          />
          <path
            d="M170 30 Q95 105 20 170"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="1.2"
          />
          <path d="M130 70 Q110 80 95 65" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
          <path d="M100 100 Q80 110 65 95" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
          <path d="M70 130 Q50 140 35 125" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
        </svg>
      </motion.div>

      {/* 5. GENTLE UPWARD FLOATING ENVIRONMENTAL PARTICLES */}
      <div className="absolute inset-0">
        {[
          { left: '12%', top: '75%', size: 4, dur: 7, delay: 0 },
          { left: '28%', top: '82%', size: 3, dur: 9, delay: 2 },
          { left: '44%', top: '88%', size: 5, dur: 8, delay: 1 },
          { left: '62%', top: '80%', size: 3.5, dur: 10, delay: 3 },
          { left: '78%', top: '76%', size: 4.5, dur: 7.5, delay: 1.5 },
          { left: '88%', top: '85%', size: 3, dur: 8.5, delay: 2.5 },
          { left: '20%', top: '45%', size: 2.5, dur: 11, delay: 4 },
          { left: '72%', top: '50%', size: 3, dur: 9.5, delay: 3.5 }
        ].map((pt, i) => (
          <motion.div
            key={i}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -160, -320],
                    opacity: [0, 0.75, 0]
                  }
            }
            transition={{
              duration: pt.dur,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: pt.delay
            }}
            style={{
              left: pt.left,
              top: pt.top,
              width: pt.size,
              height: pt.size
            }}
            className="absolute rounded-full bg-[#C8F0A5] filter drop-shadow-[0_0_6px_#C8F0A5]"
          />
        ))}
      </div>
    </div>
  );
};
