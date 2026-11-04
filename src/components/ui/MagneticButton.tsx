import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  variant?: 'primary' | 'secondary' | 'glass' | 'accent' | 'outline';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 18,
  variant = 'primary',
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion || !buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) / (width / strength);
    const y = (e.clientY - (top + height / 2)) / (height / strength);
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-on-primary hover:bg-primary-container shadow-md hover:shadow-lg border border-primary-container';
      case 'secondary':
        return 'bg-secondary text-on-secondary hover:bg-secondary/90 shadow-sm hover:shadow-md border border-secondary';
      case 'accent':
        return 'bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim shadow-md hover:shadow-lg border border-tertiary-fixed font-bold';
      case 'glass':
        return 'glass-panel text-primary hover:glass-panel-elevated shadow-sm hover:shadow-md';
      case 'outline':
        return 'bg-transparent text-primary hover:bg-surface-container border border-outline-variant/40';
      default:
        return 'bg-primary text-on-primary';
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 180, mass: 0.1 }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center justify-center font-bold text-xs rounded-xl px-5 py-2.5 transition-colors cursor-pointer select-none overflow-hidden ${getVariantClasses()} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};
