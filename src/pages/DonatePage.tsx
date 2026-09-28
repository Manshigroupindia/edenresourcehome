import React from 'react';
import { Link } from 'react-router-dom';
import { DonationForm } from '../components/forms/DonationForm';
import { BankAccountDetailsCard } from '../components/donation/BankAccountDetailsCard';
import { SeoMeta } from '../components/common/SeoMeta';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { useSiteSettings } from '../hooks/useSiteSettings';

export const DonatePage: React.FC = () => {
  const { settings } = useSiteSettings();
  const primaryPhone = settings.phones[0] || '+91 89748 91082';
  const primaryPhoneRaw = primaryPhone.replace(/\s+/g, '');
  const primaryEmail = settings.emails[0] || 'support@edenresourcehome.org.in';

  return (
    <>
      <SeoMeta
        title={`Donate | ${settings.siteName} Manipur`}
        description={`Support vulnerable children in Ukhrul, Manipur through ${settings.siteName}. Contribute custom voluntary support for daily meals, school supplies, winter clothing, and healthcare.`}
      />

      <div className="flex flex-col w-full">
        {/* SUB-HEADER HERO BANNER */}
        <section className="relative w-full overflow-hidden bg-primary-container text-on-primary -mt-20 pt-32 pb-16 lg:pb-24 shadow-sm">
          <div
            className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#c5ebd5 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px'
            }}
          />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-label-md font-label-md text-on-primary-container mb-4">
              <Link to="/" className="hover:text-primary-fixed transition-colors">
                Home
              </Link>
              <span className="opacity-60 text-xs">/</span>
              <span className="text-primary-fixed font-semibold">Donate</span>
            </nav>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary text-primary-fixed text-label-md font-label-md uppercase tracking-wider mb-5 shadow-sm">
              <span translate="no" className="notranslate material-symbols-outlined text-[16px]">volunteer_activism</span>
              <span>Every Gift Transforms A Child's Future</span>
            </div>

            <h1 className="font-headline-lg text-headline-lg lg:text-display font-display text-white max-w-3xl leading-tight tracking-tight">
              Support Our Children
            </h1>

            <p className="mt-4 font-body-lg text-body-lg text-primary-fixed-dim/90 max-w-2xl text-balance leading-relaxed">
              Your voluntary contribution directly empowers children in Manipur with shelter, nutrition, education, and hope.
            </p>

            {/* Trust Bar Indicators */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-primary/40 backdrop-blur-sm text-left border border-white/10">
                <span translate="no" className="notranslate material-symbols-outlined text-secondary-fixed text-[26px]">verified</span>
                <div>
                  <p className="font-title-md text-title-md text-white font-bold leading-none">JJ Act</p>
                  <p className="font-body-sm text-body-sm text-on-primary-container mt-1">Recognized Non-Profit</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-primary/40 backdrop-blur-sm text-left border border-white/10">
                <span translate="no" className="notranslate material-symbols-outlined text-secondary-fixed text-[26px]">home_pin</span>
                <div>
                  <p className="font-title-md text-title-md text-white font-bold leading-none">Ukhrul Home</p>
                  <p className="font-body-sm text-body-sm text-on-primary-container mt-1">Direct Grassroots Reach</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-primary/40 backdrop-blur-sm text-left border border-white/10">
                <span translate="no" className="notranslate material-symbols-outlined text-secondary-fixed text-[26px]">receipt_long</span>
                <div>
                  <p className="font-title-md text-title-md text-white font-bold leading-none">Full Audit</p>
                  <p className="font-body-sm text-body-sm text-on-primary-container mt-1">Transparent Receipts</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-primary/40 backdrop-blur-sm text-left border border-white/10">
                <span translate="no" className="notranslate material-symbols-outlined text-secondary-fixed text-[26px]">favorite</span>
                <div>
                  <p className="font-title-md text-title-md text-white font-bold leading-none">50+ Children</p>
                  <p className="font-body-sm text-body-sm text-on-primary-container mt-1">Sheltered &amp; Educated</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN DONATION ENGINE & IMPACT SIDEBAR */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20 w-full -mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Primary Custom Amount Donation Form & Bank Account Details directly underneath (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <DonationForm />
              <BankAccountDetailsCard />
            </div>

            {/* Right Column: Visual Narrative & Transparency Impact (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Story / Impact Imagery Card */}
              <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20">
                <div className="relative h-64 w-full">
                  <ImageWithFallback
                    src="/images/17-group-of-smiling-children-and-students-i.jpg"
                    alt="Group of smiling children and students in school uniforms studying together"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex items-end p-6 pointer-events-none">
                    <p className="font-headline-sm text-headline-sm text-white font-semibold leading-snug">
                      “Every child deserves a safe haven to dream, learn, and grow.”
                    </p>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-secondary font-bold text-label-md font-label-md">
                    <span translate="no" className="notranslate material-symbols-outlined text-[18px]">cottage</span>
                    <span>RESIDENTIAL HOME • TALLUI JUNCTION, UKHRUL</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Eden Resource Home shelters orphan, abandoned, and destitute children in Manipur under full residential care, providing wholesome nutrition, schooling, and compassionate family life.
                  </p>
                </div>
              </div>

              {/* Fund Utilization Snapshot (SVG Donut Chart) */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm space-y-4 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <h3 className="font-title-lg text-title-lg text-primary font-bold">
                    Fund Allocation Model
                  </h3>
                  <span className="text-label-md font-label-md bg-secondary-fixed text-on-secondary-fixed px-2.5 py-1 rounded-full font-bold">
                    100% Direct
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Eden Resource Home prioritizes direct child welfare. Administration overhead is kept strictly modest.
                </p>

                <div className="flex items-center gap-6 pt-2">
                  <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-surface-container"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.8"
                      />
                      {/* Meals & Housing (45%) */}
                      <path
                        className="text-primary"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="45, 100"
                        strokeWidth="3.8"
                      />
                      {/* Education (35%) */}
                      <path
                        className="text-secondary"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="35, 100"
                        strokeDashoffset="-45"
                        strokeWidth="3.8"
                      />
                      {/* Health & Wellness (20%) */}
                      <path
                        className="text-on-primary-container"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="20, 100"
                        strokeDashoffset="-80"
                        strokeWidth="3.8"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-headline-sm text-headline-sm text-primary font-bold leading-none">100%</span>
                      <span className="font-label-md text-[10px] text-on-surface-variant font-medium">Child Focus</span>
                    </div>
                  </div>

                  <div className="space-y-2 font-body-sm text-body-sm w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-primary shrink-0" />
                        <span className="text-on-surface">Meals &amp; Residential Care</span>
                      </div>
                      <span className="font-semibold text-primary">45%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-secondary shrink-0" />
                        <span className="text-on-surface">Schooling &amp; Books</span>
                      </div>
                      <span className="font-semibold text-primary">35%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-on-primary-container shrink-0" />
                        <span className="text-on-surface">Health &amp; Wellness</span>
                      </div>
                      <span className="font-semibold text-primary">20%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Inquiries Callout */}
              <div className="p-6 rounded-2xl bg-surface-container-low space-y-3 border border-outline-variant/15">
                <div className="flex items-center gap-2.5 text-primary font-bold font-title-md">
                  <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[22px]">contact_support</span>
                  <span>Have questions regarding donations?</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  You are welcome to speak directly with our administrators regarding physical supply drops, book parcels, or child educational sponsorships.
                </p>
                <div className="pt-1 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`tel:${primaryPhoneRaw}`}
                    className="inline-flex items-center gap-2 text-secondary font-bold font-body-sm hover:underline"
                  >
                    <span translate="no" className="notranslate material-symbols-outlined text-[18px]">call</span>
                    <span>{primaryPhone}</span>
                  </a>
                  <a
                    href={`mailto:${primaryEmail}`}
                    className="inline-flex items-center gap-2 text-secondary font-bold font-body-sm hover:underline"
                  >
                    <span translate="no" className="notranslate material-symbols-outlined text-[18px]">mail</span>
                    <span>{primaryEmail}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
