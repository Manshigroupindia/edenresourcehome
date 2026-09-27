import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  badgeIcon?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeIcon,
  title,
  description,
  align = 'left',
  className = '',
  light = false
}) => {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  };

  return (
    <div className={`flex flex-col space-y-3 ${alignClasses[align]} ${className}`}>
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-label-md font-label-md uppercase tracking-wider font-semibold ${
            light
              ? 'bg-secondary/30 text-secondary-fixed backdrop-blur-sm'
              : 'bg-secondary-fixed text-on-secondary-fixed'
          }`}
        >
          {badgeIcon && (
            <span translate="no" className="notranslate material-symbols-outlined text-[16px]">{badgeIcon}</span>
          )}
          <span>{badge}</span>
        </div>
      )}

      <h2
        className={`font-headline-lg text-headline-lg tracking-tight ${
          light ? 'text-white' : 'text-primary'
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`font-body-lg text-body-lg max-w-2xl leading-relaxed ${
            light ? 'text-surface-container-high/90' : 'text-on-surface-variant'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
