import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'lime' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-title-md font-semibold rounded-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'h-9 px-3 text-xs gap-1.5',
    md: 'h-11 px-5 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-primary text-on-primary hover:bg-primary-container shadow-sm hover:shadow-md',
    secondary: 'bg-surface-container-low text-primary hover:bg-surface-container-high border border-outline-variant/30',
    lime: 'bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim shadow-[0_4px_16px_rgba(203,240,117,0.3)] hover:shadow-lg',
    ghost: 'bg-transparent text-secondary hover:bg-secondary-fixed/20',
    danger: 'bg-error text-on-error hover:bg-on-error-container',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      )}
    </button>
  );
};
