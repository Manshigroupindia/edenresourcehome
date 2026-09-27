import React from 'react';
import { Link } from 'react-router-dom';
import { SeoMeta } from '../components/common/SeoMeta';
import { siteConfig } from '../data/siteConfig';

export const TermsPage: React.FC = () => {
  return (
    <>
      <SeoMeta
        title="Terms & Disclaimer | Eden Resource Home Manipur"
        description="Terms of use and disclaimer information for Eden Resource Home, Ukhrul, Manipur."
      />

      <div className="flex flex-col w-full">
        {/* Header */}
        <section className="w-full bg-surface-container-low py-12 px-6 lg:px-12 -mt-20 pt-32 border-b border-outline-variant/20">
          <div className="max-w-4xl mx-auto space-y-3">
            <nav className="flex items-center gap-2 text-label-md text-on-surface-variant mb-2">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary font-semibold">Terms &amp; Disclaimer</span>
            </nav>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
              Terms &amp; Disclaimer
            </h1>
            <p className="font-body-md text-on-surface-variant">
              Last updated: {new Date().getFullYear()} • Eden Resource Home, Ukhrul, Manipur
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="w-full py-12 lg:py-16 px-6 lg:px-12 bg-surface">
          <div className="max-w-4xl mx-auto bg-surface-container-lowest p-8 lg:p-12 rounded-3xl shadow-sm space-y-8 border border-outline-variant/20 font-body-md text-body-md text-on-surface-variant leading-relaxed">
            <div className="space-y-3">
              <h2 className="font-title-lg text-title-lg text-primary font-bold">1. Charitable Identity &amp; Website Use</h2>
              <p>
                Eden Resource Home is an accredited non-profit child care institution established in 2001 in Ukhrul, Manipur, recognized under the Juvenile Justice (Care and Protection of Children) statutory framework. This website serves informational, educational, and philanthropic purposes to connect well-wishers with our ongoing child welfare activities.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-title-lg text-title-lg text-primary font-bold">2. Accurate Representation &amp; Public Records</h2>
              <p>
                Historical milestones, government gazette notifications, awards, and media citations presented on this platform are drawn from archival physical documents and verified press publications. We make every reasonable effort to keep factual information updated and transparent.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-title-lg text-title-lg text-primary font-bold">3. Voluntary Support &amp; Contributions</h2>
              <p>
                All financial and in-kind contributions made to Eden Resource Home are voluntary. Funds received are allocated directly toward the welfare, housing, education, and healthcare of the children under our care.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-title-lg text-title-lg text-primary font-bold">4. Intellectual Property &amp; Image Reproduction</h2>
              <p>
                Photographs, logos, audio-visual materials, and written narratives on this website are the property of Eden Resource Home or used with proper community consent. Unauthorized reproduction, commercial distribution, or defamatory use of minor portraits is strictly prohibited.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-title-lg text-title-lg text-primary font-bold">5. Inquiries &amp; Legal Notices</h2>
              <div className="p-4 rounded-xl bg-surface-container-low text-body-sm space-y-1">
                <p><strong className="text-primary">{siteConfig.siteName}</strong></p>
                <p>{siteConfig.fullAddress}</p>
                <p>Email: <a href={`mailto:${siteConfig.email}`} className="text-secondary font-semibold underline">{siteConfig.email}</a></p>
                <p>Phone: <a href={`tel:${siteConfig.phoneRaw}`} className="text-secondary font-semibold underline">{siteConfig.phone}</a></p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
