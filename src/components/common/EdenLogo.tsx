import React, { useState } from 'react';
import defaultLogo from '../../assets/logo.png';

interface EdenLogoProps {
  showText?: boolean;
  className?: string;
  iconOnly?: boolean;
  invertText?: boolean;
  customLogoUrl?: string;
  siteName?: string;
}

export const EdenLogo: React.FC<EdenLogoProps> = ({
  showText = true,
  className = 'h-10 w-auto',
  iconOnly = false,
  invertText = false,
  customLogoUrl,
  siteName = 'Eden Resource Home',
}) => {
  const [imageError, setImageError] = useState(false);

  // Use custom CMS logo if provided and valid, otherwise fallback to official assets/logo.png
  const logoSrc = (!imageError && customLogoUrl && customLogoUrl.trim().length > 0)
    ? customLogoUrl
    : defaultLogo;

  const renderEmblem = (sizeClass = 'h-10 w-10 sm:h-11 sm:w-11') => (
    <img
      src={logoSrc}
      alt={siteName}
      data-brand-logo="true"
      translate="no"
      onError={() => setImageError(true)}
      className={`notranslate ${sizeClass} shrink-0 object-contain`}
      style={{ objectFit: 'contain' }}
    />
  );

  if (iconOnly || !showText) {
    return (
      <div
        translate="no"
        className={`notranslate inline-flex items-center justify-center shrink-0 ${className}`}
        aria-label={`${siteName} Logo`}
        data-brand-logo="true"
      >
        {renderEmblem('h-full w-full max-h-full max-w-full')}
      </div>
    );
  }

  return (
    <div
      translate="no"
      className={`notranslate flex items-center gap-2.5 sm:gap-3 shrink-0 ${className}`}
      data-brand-logo="true"
    >
      {renderEmblem('h-10 w-10 sm:h-11 sm:w-11')}

      {showText && (
        <div translate="no" className="notranslate flex flex-col min-w-0">
          <span
            className={`font-headline-sm text-[16px] xs:text-[18px] sm:text-[19px] lg:text-[20px] xl:text-[21px] tracking-tight leading-tight font-bold whitespace-nowrap ${
              invertText ? 'text-white' : 'text-primary'
            }`}
          >
            {siteName}
          </span>
          <span
            className={`font-label-md text-[10px] sm:text-[11px] lg:text-[11px] xl:text-[12px] font-medium tracking-normal whitespace-nowrap ${
              invertText ? 'text-primary-fixed' : 'text-on-surface-variant'
            }`}
          >
            Ukhrul, Manipur
          </span>
        </div>
      )}
    </div>
  );
};

export default EdenLogo;
