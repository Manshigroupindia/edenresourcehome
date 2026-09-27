import React from 'react';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  badge?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = "Help Create a Brighter Future for Every Child",
  description = "Your support can help provide children with shelter, balanced meals, schooling supplies, and continuous healthcare in Ukhrul. Every contribution directly impacts a young life.",
  primaryButtonText = "Donate Now",
  primaryButtonLink = "/donate",
  secondaryButtonText = "Visit or Contact Us",
  secondaryButtonLink = "/contact",
  badge = "Every Child Deserves A Family & An Education"
}) => {
  return (
    <section className="w-full bg-primary-container text-on-primary relative overflow-hidden py-16 lg:py-24">
      {/* Ambient background glows */}
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-secondary/25 blur-3xl pointer-events-none" />
      <div className="absolute left-10 -bottom-20 w-80 h-80 rounded-full bg-tertiary-fixed-dim/10 blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center space-y-6 relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-fixed/20 text-secondary-fixed mb-2">
          <span translate="no" className="notranslate material-symbols-outlined text-[32px]">favorite</span>
        </div>

        {badge && (
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-secondary text-surface-bright font-label-md text-label-md tracking-wider uppercase">
              {badge}
            </span>
          </div>
        )}

        <h2 className="font-headline-lg text-headline-lg lg:text-display text-white tracking-tight max-w-3xl mx-auto">
          {title}
        </h2>

        <p className="font-body-lg text-body-lg text-surface-container-high/90 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={primaryButtonLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-secondary-container text-on-secondary-container font-bold font-label-lg text-label-lg shadow-lg hover:bg-secondary-fixed transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span translate="no" className="notranslate material-symbols-outlined text-[20px]">volunteer_activism</span>
            <span>{primaryButtonText}</span>
          </Link>

          <Link
            to={secondaryButtonLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-surface-container-highest/20 text-white backdrop-blur-sm hover:bg-surface-container-highest/30 transition-all font-label-lg text-label-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <span translate="no" className="notranslate material-symbols-outlined text-[20px]">location_on</span>
            <span>{secondaryButtonText}</span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-surface-container-high/80 font-body-sm text-body-sm">
          <span className="flex items-center gap-1.5">
            <span translate="no" className="notranslate material-symbols-outlined text-[16px] text-secondary-fixed">check_circle</span>
            100% Directed to Children's Welfare
          </span>
          <span className="flex items-center gap-1.5">
            <span translate="no" className="notranslate material-symbols-outlined text-[16px] text-secondary-fixed">check_circle</span>
            Transparent NGO Stewardship
          </span>
          <span className="flex items-center gap-1.5">
            <span translate="no" className="notranslate material-symbols-outlined text-[16px] text-secondary-fixed">check_circle</span>
            Registered Under JJ Act
          </span>
        </div>
      </div>
    </section>
  );
};
