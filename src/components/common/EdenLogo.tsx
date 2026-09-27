import React from 'react';

interface EdenLogoProps {
  showText?: boolean;
  className?: string;
  iconOnly?: boolean;
  invertText?: boolean;
}

export const EdenLogo: React.FC<EdenLogoProps> = ({
  showText = true,
  className = 'h-10 w-auto',
  iconOnly = false,
  invertText = false,
}) => {
  if (iconOnly) {
    return (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Eden Resource Home Emblem"
      >
        <g transform="translate(0, 0)">
          {/* Sunburst behind roof */}
          <path d="M40 18 L40 8" stroke="#E9B872" strokeWidth="3" strokeLinecap="round" />
          <path d="M28 21 L22 13" stroke="#E9B872" strokeWidth="3" strokeLinecap="round" />
          <path d="M52 21 L58 13" stroke="#E9B872" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 30 L12 26" stroke="#E9B872" strokeWidth="3" strokeLinecap="round" />
          <path d="M60 30 L68 26" stroke="#E9B872" strokeWidth="3" strokeLinecap="round" />
          
          {/* Protective Gable Roof */}
          <path d="M14 38 L40 16 L66 38" stroke="#1B4332" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Caring Hands / Foliage */}
          <path d="M12 44 C 12 62, 24 74, 40 74 C 56 74, 68 62, 68 44 C 63 56, 50 64, 40 64 C 30 64, 17 56, 12 44 Z" fill="#2D6A4F" />
          
          {/* Children */}
          <circle cx="32" cy="36" r="5" fill="#143627" />
          <path d="M24 52 C 24 45, 29 42, 32 42 C 35 42, 40 45, 40 52 Z" fill="#143627" />
          
          <circle cx="47" cy="39" r="4.2" fill="#143627" />
          <path d="M40 53 C 40 47, 44 44, 47 44 C 50 44, 54 47, 54 53 Z" fill="#143627" />
          
          {/* Heart */}
          <path d="M40 30 C 38 27, 35 28, 35 30 C 35 33, 40 36, 40 36 C 40 36, 45 33, 45 30 C 45 28, 42 27, 40 30 Z" fill="#D4A373" />
        </g>
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      {/* Crisp SVG emblem icon */}
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 shrink-0"
        aria-hidden="true"
      >
        {/* Sunburst */}
        <path d="M40 18 L40 8" stroke="#E9B872" strokeWidth="3" strokeLinecap="round" />
        <path d="M28 21 L22 13" stroke="#E9B872" strokeWidth="3" strokeLinecap="round" />
        <path d="M52 21 L58 13" stroke="#E9B872" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 30 L12 26" stroke="#E9B872" strokeWidth="3" strokeLinecap="round" />
        <path d="M60 30 L68 26" stroke="#E9B872" strokeWidth="3" strokeLinecap="round" />
        
        {/* Protective Roof */}
        <path d="M14 38 L40 16 L66 38" stroke="#1B4332" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Foliage */}
        <path d="M12 44 C 12 62, 24 74, 40 74 C 56 74, 68 62, 68 44 C 63 56, 50 64, 40 64 C 30 64, 17 56, 12 44 Z" fill="#2D6A4F" />
        
        {/* Children */}
        <circle cx="32" cy="36" r="5" fill="#143627" />
        <path d="M24 52 C 24 45, 29 42, 32 42 C 35 42, 40 45, 40 52 Z" fill="#143627" />
        <circle cx="47" cy="39" r="4.2" fill="#143627" />
        <path d="M40 53 C 40 47, 44 44, 47 44 C 50 44, 54 47, 54 53 Z" fill="#143627" />
        
        {/* Heart */}
        <path d="M40 30 C 38 27, 35 28, 35 30 C 35 33, 40 36, 40 36 C 40 36, 45 33, 45 30 C 45 28, 42 27, 40 30 Z" fill="#D4A373" />
      </svg>

      {showText && (
        <div className="flex flex-col min-w-0">
          <span className={`font-headline-sm text-[16px] xs:text-[18px] sm:text-[19px] lg:text-[20px] xl:text-[21px] tracking-tight leading-tight font-bold whitespace-nowrap ${
            invertText ? 'text-white' : 'text-primary'
          }`}>
            Eden Resource Home
          </span>
          <span className={`font-label-md text-[10px] sm:text-[11px] lg:text-[11px] xl:text-[12px] font-medium tracking-normal whitespace-nowrap ${
            invertText ? 'text-primary-fixed' : 'text-on-surface-variant'
          }`}>
            Ukhrul, Manipur
          </span>
        </div>
      )}
    </div>
  );
};
