import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { ContactForm } from '../components/forms/ContactForm';
import { SeoMeta } from '../components/common/SeoMeta';
import { useSiteSettings } from '../hooks/useSiteSettings';

export const ContactPage: React.FC = () => {
  const { settings } = useSiteSettings();

  const primaryPhone = settings.phones[0] || siteConfig.phone;
  const primaryEmail = settings.emails[0] || siteConfig.email;

  return (
    <>
      <SeoMeta
        title={`Contact Us | ${settings.siteName} Manipur`}
        description={`Get in touch with ${settings.siteName} in ${settings.locationText}. Call ${primaryPhone} or email ${primaryEmail}.`}
      />

      <div className="flex flex-col w-full">
        {/* EDITORIAL PAGE HEADER */}
        <section className="relative w-full bg-surface-container-low overflow-hidden py-12 lg:py-16 -mt-20 pt-32">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none" />
          <div className="absolute left-1/4 -bottom-32 w-80 h-80 rounded-full bg-secondary-container/30 blur-2xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant mb-4">
              <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <span translate="no" className="notranslate material-symbols-outlined text-[16px]">home</span>
                <span>Home</span>
              </Link>
              <span translate="no" className="notranslate material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
              <span className="text-secondary font-bold">Contact Us</span>
            </nav>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md tracking-wider uppercase font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span>Open Doors • Compassionate Dialogue</span>
              </div>

              <h1 className="font-headline-lg text-headline-lg lg:text-display text-primary tracking-tight">
                Get in Touch
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                We welcome visitors, volunteers, well-wishers, and community partners. Whether you wish to support our children, arrange a respectful visit, or explore collaborative educational projects in Manipur, we are here to connect.
              </p>
            </div>

            {/* Quick Trust Indicators Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-outline-variant/30">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-lowest/80 backdrop-blur-sm shadow-sm border border-outline-variant/15">
                <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[24px]">verified_user</span>
                <div>
                  <p className="font-title-md text-title-md text-primary leading-tight font-bold">Child-Safe</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">JJ Act &amp; Care Standards</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-lowest/80 backdrop-blur-sm shadow-sm border border-outline-variant/15">
                <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[24px]">schedule</span>
                <div>
                  <p className="font-title-md text-title-md text-primary leading-tight font-bold">Prompt Reply</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Within 24-48 working hours</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-lowest/80 backdrop-blur-sm shadow-sm border border-outline-variant/15">
                <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[24px]">pin_drop</span>
                <div>
                  <p className="font-title-md text-title-md text-primary leading-tight font-bold">Ukhrul Hills</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Manipur, Northeast India</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-lowest/80 backdrop-blur-sm shadow-sm border border-outline-variant/15">
                <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[24px]">volunteer_activism</span>
                <div>
                  <p className="font-title-md text-title-md text-primary leading-tight font-bold">Direct Impact</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Transparent Stewardship</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN TWO-COLUMN CONTENT */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Organization Directory, Visitor Protocol, Map */}
            <div className="lg:col-span-6 space-y-6">
              {/* Official Directory Card */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 border border-outline-variant/20">
                <div>
                  <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">
                    Direct Channels
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-primary mt-1 font-bold">
                    Official Contact Details
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Reach our administration and welfare coordinators directly through official hotlines.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Dynamic Phones */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {settings.phones.map((phone: string, idx: number) => {
                      const raw = phone.replace(/\s+/g, '');
                      return (
                        <a
                          key={idx}
                          href={`tel:${raw}`}
                          className="group flex items-start gap-3.5 p-4 rounded-xl bg-surface-container-low hover:bg-secondary-fixed transition-colors border border-outline-variant/15"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 text-on-primary group-hover:bg-secondary transition-colors">
                            <span translate="no" className="notranslate material-symbols-outlined text-[20px]">call</span>
                          </div>
                          <div className="min-w-0">
                            <span className="font-label-md text-label-md text-on-surface-variant block">
                              {idx === 0 ? 'Primary Phone' : `Alternate Phone ${idx + 1}`}
                            </span>
                            <span className="font-title-md text-title-md text-primary font-bold block truncate">
                              {phone}
                            </span>
                            <span className="font-body-sm text-body-sm text-secondary">Tap to Call Directly</span>
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  {/* Dynamic Emails */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {settings.emails.map((email: string, idx: number) => (
                      <a
                        key={idx}
                        href={`mailto:${email}`}
                        className="group flex items-start gap-3.5 p-4 rounded-xl bg-surface-container-low hover:bg-secondary-fixed transition-colors border border-outline-variant/15"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 text-on-primary group-hover:bg-secondary transition-colors">
                          <span translate="no" className="notranslate material-symbols-outlined text-[20px]">mail</span>
                        </div>
                        <div className="min-w-0">
                          <span className="font-label-md text-label-md text-on-surface-variant block">
                            {idx === 0 ? 'General Inquiries' : `Department Email ${idx + 1}`}
                          </span>
                          <span className="font-title-md text-title-md text-primary font-bold block truncate">
                            {email}
                          </span>
                          <span className="font-body-sm text-body-sm text-secondary">Inquiries &amp; Receipts</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Campus Address & Hours */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-surface-container border border-outline-variant/15">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0 text-on-secondary-container">
                      <span translate="no" className="notranslate material-symbols-outlined text-[20px]">location_on</span>
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-on-surface-variant block">Campus Location</span>
                      <p className="font-title-md text-title-md text-on-surface font-semibold">{settings.locationText}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {[settings.address.line1, settings.address.line2, settings.address.city, settings.address.state, settings.address.country, settings.address.postalCode].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-surface-container border border-outline-variant/15">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0 text-on-secondary-container">
                      <span translate="no" className="notranslate material-symbols-outlined text-[20px]">schedule</span>
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-on-surface-variant block">Administration Hours</span>
                      <p className="font-title-md text-title-md text-on-surface font-semibold">{siteConfig.officeHours.weekdays}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{siteConfig.officeHours.sundays}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Child Safeguarding & Visitor Protocol */}
              <div className="bg-primary-container text-on-primary rounded-2xl p-6 sm:p-8 shadow-sm space-y-4 relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-secondary/30 blur-2xl pointer-events-none" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-lowest/15 flex items-center justify-center text-on-primary shrink-0">
                    <span translate="no" className="notranslate material-symbols-outlined text-[22px]">shield_person</span>
                  </div>
                  <div>
                    <span className="font-label-md text-label-md uppercase tracking-wider text-secondary-fixed font-semibold">
                      Child Safeguarding
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-primary font-bold">
                      Visiting Eden Resource Home
                    </h3>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-primary-container leading-relaxed">
                  The safety, emotional comfort, and privacy of our residential children are our paramount responsibility. In alignment with statutory child welfare guidelines:
                </p>
                <ul className="space-y-3 font-body-sm text-body-sm text-on-primary-container">
                  <li className="flex items-start gap-2.5">
                    <span translate="no" className="notranslate material-symbols-outlined text-secondary-fixed text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span><strong>Prior Notice Mandatory:</strong> Visitors must notify our office at least 48 to 72 hours before arrival to ensure children’s school routines remain undisturbed.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span translate="no" className="notranslate material-symbols-outlined text-secondary-fixed text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span><strong>Government Identity:</strong> Please present valid government photo identification (Aadhaar, Passport, or Voter ID) upon arrival at reception.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span translate="no" className="notranslate material-symbols-outlined text-secondary-fixed text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span><strong>Dignity in Photography:</strong> Unconsented photography or recording of minor residents is strictly prohibited to safeguard their personal privacy.</span>
                  </li>
                </ul>
              </div>

              {/* Map Card */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm space-y-4 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">
                      Directions &amp; Geography
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                      Find Our Sanctuary
                    </h3>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Tallui+Junction+Ukhrul+Manipur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-surface-container-high text-primary hover:bg-secondary-fixed text-label-md font-label-md transition-colors"
                  >
                    <span translate="no" className="notranslate material-symbols-outlined text-[16px]">open_in_new</span>
                    <span>Google Maps</span>
                  </a>
                </div>

                <div className="relative w-full h-72 rounded-xl overflow-hidden shadow-inner bg-surface-container">
                  <img
                    src="/images/16-background.jpg"
                    alt="Scenic hills of Ukhrul Manipur where Eden Resource Home is situated"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />

                  {/* Map Pin Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/95 backdrop-blur-md p-3.5 rounded-xl shadow-md max-w-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                        <span translate="no" className="notranslate material-symbols-outlined text-[20px]">location_on</span>
                      </div>
                      <div>
                        <p className="font-title-md text-title-md text-primary font-bold">Eden Resource Home</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Tallui Junction, Ukhrul District, Manipur</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-secondary">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> ~82 km from Imphal Airport
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-body-sm font-body-sm text-on-surface-variant">
                  <div className="p-3 rounded-lg bg-surface-container-low flex items-center gap-2.5">
                    <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[18px]">directions_car</span>
                    <span>Approx. 3.5 hrs scenic drive from Imphal</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-container-low flex items-center gap-2.5">
                    <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[18px]">terrain</span>
                    <span>Elevated hill station climate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Send Us a Message Interactive Form */}
            <div className="lg:col-span-6 lg:sticky lg:top-28">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
