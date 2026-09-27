import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronRight } from 'lucide-react';
import { EdenLogo } from '../common/EdenLogo';
import { navigationItems } from '../../data/navigation';
import { useSiteSettings } from '../../hooks/useSiteSettings';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { settings } = useSiteSettings();

  const primaryPhone = settings.phones[0] || '+91 89748 91082';
  const primaryPhoneRaw = primaryPhone.replace(/\s+/g, '');
  const primaryEmail = settings.emails[0] || 'support@edenresourcehome.org.in';

  // Close mobile menu on browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => setMobileMenuOpen(false);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile menu when window resizes to desktop breakpoint (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(20,54,39,0.06)] border-b border-outline-variant/15 transition-all">
        <div className="h-20 max-w-7xl mx-auto px-4 sm:px-5 lg:px-4 xl:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo Brand Link */}
          <Link
            to="/"
            className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-lg py-1 pr-1 sm:pr-2"
            aria-label={`${settings.siteName} Home`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <EdenLogo
              customLogoUrl={settings.logoUrl}
              siteName={settings.siteName}
            />
          </Link>

          {/* Desktop Navigation (>= 1024px) */}
          <nav
            className="desktop-nav hidden lg:flex items-center justify-center gap-1 xl:gap-2.5 2xl:gap-3.5"
            aria-label="Main Navigation"
          >
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-2 xl:px-2.5 2xl:px-3 py-2 font-medium text-[12.5px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] whitespace-nowrap transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                    isActive
                      ? 'text-primary font-bold'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container/50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="whitespace-nowrap">{item.label}</span>
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-2 right-2 xl:left-2.5 xl:right-2.5 h-[2.5px] bg-secondary rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Action CTAs (>= 1024px) */}
          <div className="desktop-ctas hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            {/* Direct Phone Call Link */}
            <a
              href={`tel:${primaryPhoneRaw}`}
              className="inline-flex items-center gap-1.5 xl:gap-2 px-2.5 xl:px-3 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[12px] xl:text-[13px] font-semibold hover:bg-secondary-container transition-colors shadow-xs whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              title={`Call ${settings.siteName}`}
              aria-label={`Call ${settings.siteName} at ${primaryPhone}`}
            >
              <Phone className="w-3.5 h-3.5 shrink-0 text-primary" aria-hidden="true" />
              <span className="whitespace-nowrap">{primaryPhone}</span>
            </a>

            {/* Donate CTA Button */}
            <Link
              to="/donate"
              className="inline-flex items-center justify-center px-3.5 xl:px-5 py-2.5 rounded-lg bg-primary text-on-primary font-semibold text-[13px] xl:text-[14px] shadow-sm hover:bg-secondary hover:shadow-md transition-all active:scale-[0.98] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile Header Controls (< 1024px) */}
          <div className="mobile-menu-button flex lg:hidden items-center shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:scale-95"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 shrink-0" strokeWidth={2.2} aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6 shrink-0" strokeWidth={2.2} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-overlay fixed inset-0 z-40 lg:hidden bg-primary/50 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-navigation-drawer"
        className={`mobile-drawer-panel fixed top-0 right-0 bottom-0 w-full max-w-[340px] sm:max-w-sm bg-surface shadow-2xl z-50 lg:hidden flex flex-col justify-between p-5 sm:p-6 overflow-y-auto transition-transform duration-300 ease-in-out border-l border-outline-variant/30 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div>
          {/* Drawer Top Header with Logo & Close Button */}
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-lg"
            >
              <EdenLogo
                customLogoUrl={settings.logoUrl}
                siteName={settings.siteName}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5 shrink-0" strokeWidth={2.2} />
            </button>
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col space-y-1.5 mt-5" aria-label="Mobile Navigation Links">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl font-medium text-[15px] transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-secondary-fixed text-primary font-bold shadow-xs'
                      : 'text-on-surface hover:bg-surface-container active:bg-surface-container-high'
                  }`
                }
              >
                <span className="whitespace-nowrap">{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50 shrink-0" aria-hidden="true" />
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Drawer Footer Contact Details & Primary CTA */}
        <div className="space-y-3.5 pt-6 mt-6 border-t border-outline-variant/30">
          <a
            href={`tel:${primaryPhoneRaw}`}
            className="flex items-center gap-3 p-3 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-semibold text-[13.5px] hover:bg-secondary-container transition-colors shadow-xs"
            title={`Call ${settings.siteName}`}
          >
            <Phone className="w-4 h-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="whitespace-nowrap">{primaryPhone}</span>
          </a>

          <a
            href={`mailto:${primaryEmail}`}
            className="flex items-center gap-3 p-3 rounded-xl bg-surface-container text-primary text-[13px] font-medium hover:bg-surface-container-high transition-colors"
            title={`Email ${settings.siteName}`}
          >
            <Mail className="w-4 h-4 shrink-0 text-secondary" aria-hidden="true" />
            <span className="truncate">{primaryEmail}</span>
          </a>

          <Link
            to="/donate"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-center block shadow-md hover:bg-secondary active:scale-[0.98] transition-all text-[15px]"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </>
  );
};
