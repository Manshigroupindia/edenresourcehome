import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Lock,
  Users
} from 'lucide-react';
import { EdenLogo } from '../common/EdenLogo';
import { footerQuickLinks, footerLegalLinks } from '../../data/navigation';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { useVisitorCount } from '../../hooks/useVisitorCount';

const FacebookIcon: React.FC = () => (
  <span translate="no" className="notranslate inline-flex items-center">
    <svg className="w-4 h-4 fill-current notranslate" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </span>
);

const InstagramIcon: React.FC = () => (
  <span translate="no" className="notranslate inline-flex items-center">
    <svg className="w-4 h-4 fill-none stroke-current notranslate" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  </span>
);

const YoutubeIcon: React.FC = () => (
  <span translate="no" className="notranslate inline-flex items-center">
    <svg className="w-4 h-4 fill-current notranslate" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  </span>
);

const TwitterIcon: React.FC = () => (
  <span translate="no" className="notranslate inline-flex items-center">
    <svg className="w-4 h-4 fill-current notranslate" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  </span>
);

export const Footer: React.FC = () => {
  const { settings } = useSiteSettings();
  const { count: visitorCount, loading: visitorLoading } = useVisitorCount();

  const hasSocials = Boolean(
    settings.socialLinks?.facebook ||
    settings.socialLinks?.instagram ||
    settings.socialLinks?.youtube ||
    settings.socialLinks?.twitter
  );

  return (
    <footer className="w-full bg-surface-container-low mt-space-xxl shadow-[0_-1px_6px_rgba(20,54,39,0.03)] border-t border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Organization Bio */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-block" aria-label={`${settings.siteName} Home`}>
              <EdenLogo
                customLogoUrl={settings.logoUrl}
                siteName={settings.siteName}
              />
            </Link>

            <p className="font-title-md text-title-md text-secondary font-semibold">
              {settings.tagline || 'Care, Education & A Brighter Future'}
            </p>

            <p className="font-body-md text-body-md text-on-surface-variant max-w-md leading-relaxed">
              Dedicated to nurturing, sheltering, and educating vulnerable children in Ukhrul District, Manipur. Providing dignified residential care, comprehensive schooling, and a foundation of security for enduring personal growth.
            </p>

            {/* Social Media Channels (Rendered only if configured in CMS) */}
            {hasSocials && (
              <div className="flex items-center gap-2.5 pt-2">
                {settings.socialLinks?.facebook && (
                  <a
                    href={settings.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors"
                    aria-label="Facebook"
                  >
                    <FacebookIcon />
                  </a>
                )}
                {settings.socialLinks?.instagram && (
                  <a
                    href={settings.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                )}
                {settings.socialLinks?.youtube && (
                  <a
                    href={settings.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors"
                    aria-label="YouTube"
                  >
                    <YoutubeIcon />
                  </a>
                )}
                {settings.socialLinks?.twitter && (
                  <a
                    href={settings.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors"
                    aria-label="Twitter / X"
                  >
                    <TwitterIcon />
                  </a>
                )}
              </div>
            )}
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
              {/* Location */}
              <div className="flex items-start gap-3">
                <span translate="no" className="notranslate inline-flex items-center shrink-0 mt-0.5">
                  <MapPin className="text-secondary w-5 h-5" />
                </span>
                <span>{settings.locationText}</span>
              </div>

              {/* Phone list */}
              {settings.phones.map((phone: string, idx: number) => {
                const raw = phone.replace(/\s+/g, '');
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <span translate="no" className="notranslate inline-flex items-center shrink-0">
                      <Phone className="text-secondary w-4 h-4" />
                    </span>
                    <a
                      href={`tel:${raw}`}
                      className="hover:text-primary transition-colors font-medium"
                    >
                      {phone}
                    </a>
                  </div>
                );
              })}

              {/* Email list */}
              {settings.emails.map((email: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <span translate="no" className="notranslate inline-flex items-center shrink-0">
                    <Mail className="text-secondary w-4 h-4" />
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-primary transition-colors font-medium break-all"
                  >
                    {email}
                  </a>
                </div>
              ))}
            </div>

            {/* Official Non-profit Verification Badge */}
            <div className="pt-2">
              <div className="p-4 rounded-xl bg-surface-container flex items-center gap-3">
                <span translate="no" className="notranslate inline-flex items-center shrink-0">
                  <ShieldCheck className="text-secondary w-6 h-6" />
                </span>
                <div>
                  <p className="font-label-md text-label-md font-bold text-on-surface">
                    Registered Non-Profit NGO &bull; Est. {settings.establishedYear}
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
        <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-xs font-medium text-on-surface-variant border border-outline-variant/40 shadow-xs">
              <span translate="no" className="notranslate inline-flex items-center shrink-0">
                <Users className="w-3.5 h-3.5 text-secondary" />
              </span>
              <span>Visitors:</span>
              <span className="font-semibold text-on-surface">
                {visitorLoading ? '...' : (visitorCount ?? 0).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {footerLegalLinks.map((link, idx) => (
              <React.Fragment key={link.path}>
                {idx > 0 && <span className="text-outline-variant">&bull;</span>}
                <Link
                  to={link.path}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
            <span className="text-outline-variant">&bull;</span>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1 text-on-surface-variant/70 hover:text-primary transition-colors text-[12px]"
            >
              <span translate="no" className="notranslate inline-flex items-center">
                <Lock className="w-3 h-3" />
              </span>
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>

        {/* Manshi Group Credit */}
        <div className="pt-4 text-center text-xs text-on-surface-variant/80 border-t border-outline-variant/15 mt-4">
          Website Designed &amp; Developed by{' '}
          <a
            href="https://www.manshigroup.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-secondary hover:text-primary transition-colors underline decoration-secondary/40 hover:decoration-primary underline-offset-2"
          >
            Manshi Group Of Services.
          </a>
        </div>
      </div>
    </footer>
  );
};
