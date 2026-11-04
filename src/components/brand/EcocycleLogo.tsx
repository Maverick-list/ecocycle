import React from 'react';

interface EcocycleLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
  className?: string;
}

export const EcocycleLogo: React.FC<EcocycleLogoProps> = ({
  size = 'md',
  variant = 'auto',
  showTagline = false,
  className = '',
}) => {
  const iconDimensions = {
    sm: 24,
    md: 32,
    lg: 44,
    xl: 60,
  }[size];

  const textSizeClass = {
    sm: 'text-sm tracking-tight',
    md: 'text-lg tracking-tight font-extrabold',
    lg: 'text-2xl tracking-tighter font-extrabold',
    xl: 'text-4xl tracking-tighter font-black',
  }[size];

  const taglineSizeClass = {
    sm: 'text-[8px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm',
  }[size];

  const isDark = variant === 'dark';
  const isLight = variant === 'light';

  const textColor = isDark
    ? 'text-surface-bright'
    : isLight
    ? 'text-primary'
    : 'text-primary';

  const tagColor = isDark
    ? 'text-tertiary-fixed'
    : 'text-secondary';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Refined SVG Circular Leaf Mark */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={iconDimensions}
          height={iconDimensions}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:rotate-12"
        >
          <defs>
            <linearGradient id="ecoLeafGradPrimary" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#CBF075" />
              <stop offset="45%" stopColor="#006C48" />
              <stop offset="100%" stopColor="#002517" />
            </linearGradient>
            <linearGradient id="ecoLeafGradSecondary" x1="42" y1="42" x2="6" y2="6" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#CBF075" />
              <stop offset="60%" stopColor="#00734D" />
              <stop offset="100%" stopColor="#123B2A" />
            </linearGradient>
            <filter id="ecoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#006C48" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Background subtle circle guide */}
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Leaf 1 (Top-Left to Center Orbit) */}
          <path
            d="M24 6C15.163 6 8 13.163 8 22C8 28.5 13 34 19 35C19 30 18 25 21 21C24 17 29 16 34 16C33 10.5 29 6 24 6Z"
            fill="url(#ecoLeafGradPrimary)"
            filter="url(#ecoGlow)"
          />

          {/* Leaf 2 (Bottom-Right to Center Counter-Orbit) */}
          <path
            d="M24 42C32.837 42 40 34.837 40 26C40 19.5 35 14 29 13C29 18 30 23 27 27C24 31 19 32 14 32C15 37.5 19 42 24 42Z"
            fill="url(#ecoLeafGradSecondary)"
            opacity="0.92"
          />

          {/* Central Circular Core Spark */}
          <circle cx="24" cy="24" r="3.5" fill="#CBF075" />
          <circle cx="24" cy="24" r="1.5" fill="#002517" />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span className={`font-display font-extrabold ${textSizeClass} ${textColor} tracking-tight`}>
          ECO<span className="text-secondary font-black">CYCLE</span>
        </span>
        {showTagline && (
          <span className={`font-sans font-bold uppercase tracking-wider ${taglineSizeClass} ${tagColor} mt-0.5`}>
            Turning Waste Into Worth
          </span>
        )}
      </div>
    </div>
  );
};
