import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'white' | 'dark' | 'muted';
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className,
  variant = 'white',
}) => {
  const variantStyles = {
    white: 'bg-surface-container-lowest text-on-surface border border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_-4px_rgba(11,38,29,0.06)] transition-all',
    dark: 'bg-primary text-on-primary border border-primary-container shadow-xl',
    muted: 'bg-surface-container-low text-on-surface border border-outline-variant/20',
  };

  return (
    <div className={twMerge(clsx('rounded-xl p-space-lg relative overflow-hidden', variantStyles[variant], className))}>
      {children}
    </div>
  );
};
