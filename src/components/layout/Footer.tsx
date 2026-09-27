import React from 'react';
import { Link } from 'react-router-dom';
import { EdenLogo } from '../common/EdenLogo';
import { siteConfig } from '../../data/siteConfig';
import { footerQuickLinks, footerLegalLinks } from '../../data/navigation';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-low mt-space-xxl shadow-[0_-1px_6px_rgba(20,54,39,0.03)] border-t border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Organization Bio */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-block" aria-label="Eden Resource Home Home">
              <EdenLogo />
            </Link>
            <p className="font-title-md text-title-md text-secondary font-semibold">
              {siteConfig.tagline}
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md leading-relaxed">
              Dedicated to nurturing, sheltering, and educating vulnerable children in Ukhrul District, Manipur. Providing dignified residential care, comprehensive schooling, and a foundation of security for enduring personal growth.
            </p>
            
            {/* Community Engagement Indicators */}
            <div className="flex items-center gap-3 pt-2">
              <div
                className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                title="Community Updates"
                aria-label="Community Updates"
              >
                <span className="material-symbols-outlined text-[18px]">public</span>
              </div>
              <div
                className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                title="Photo Documentation"
                aria-label="Photo Stream"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </div>
              <div
                className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                title="Video Archival"
                aria-label="Video Documentation"
              >
                <span className="material-symbols-outlined text-[18px]">video_library</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-title-lg text-title-lg text-on-surface font-bold">
              Quick Links
            </h4>
            <ul className="space-y-3 font-body-md text-body-md">
              {footerQuickLinks.map((link) => (
                <li key={link.path} className="leading-none">
                  <Link
                    to={link.path}
                    className="text-on-surface-variant hover:text-primary transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-title-lg text-title-lg text-on-surface font-bold">
              Direct Contact
            </h4>
            <div className="space-y-3 font-body-md text-body-md text-on-surface-variant">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary shrink-0 text-[20px] mt-0.5">
                  location_on
                </span>
                <span>{siteConfig.fullAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary shrink-0 text-[20px]">
                  call
                </span>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="hover:text-primary transition-colors font-medium"
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary shrink-0 text-[20px]">
                  mail
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-primary transition-colors font-medium break-all"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            {/* Official Non-profit Verification Badge */}
            <div className="pt-2">
              <div className="p-4 rounded-xl bg-surface-container flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-[24px]">
                  verified
                </span>
                <div>
                  <p className="font-label-md text-label-md font-bold text-on-surface">
                    Registered Non-Profit NGO
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Serving children &amp; community with transparent stewardship
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant">
          <p>© {new Date().getFullYear()} Eden Resource Home. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {footerLegalLinks.map((link, idx) => (
              <React.Fragment key={link.path}>
                {idx > 0 && <span className="text-outline-variant">•</span>}
                <Link
                  to={link.path}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
