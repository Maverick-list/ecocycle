import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'live' | 'neutral' | 'accent' | 'warning' | 'primary';
  pulse?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  pulse = false,
  className,
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-caps text-label-caps uppercase tracking-wider';

  const variantStyles = {
    live: 'bg-surface-container-high text-secondary',
    neutral: 'bg-surface-container text-on-surface-variant',
    accent: 'bg-secondary-fixed text-on-secondary-fixed font-bold',
    warning: 'bg-error-container text-on-error-container',
    primary: 'bg-primary-container text-on-primary-container',
  };

  return (
    <span className={twMerge(clsx(baseStyles, variantStyles[variant], className))}>
      {pulse && (
        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
      )}
      {children}
    </span>
  );
};
