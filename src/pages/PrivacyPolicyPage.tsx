import React from 'react';
import { Link } from 'react-router-dom';
import { SeoMeta } from '../components/common/SeoMeta';
import { siteConfig } from '../data/siteConfig';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <SeoMeta
        title="Privacy Policy | Eden Resource Home Manipur"
        description="Privacy policy and child dignity protection guidelines of Eden Resource Home, Ukhrul, Manipur."
      />

      <div className="flex flex-col w-full">
        {/* Header */}
        <section className="w-full bg-surface-container-low py-12 px-6 lg:px-12 -mt-20 pt-32 border-b border-outline-variant/20">
          <div className="max-w-4xl mx-auto space-y-3">
            <nav className="flex items-center gap-2 text-label-md text-on-surface-variant mb-2">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary font-semibold">Privacy Policy</span>
            </nav>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
              Privacy &amp; Child Protection Policy
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
              <h2 className="font-title-lg text-title-lg text-primary font-bold">1. Our Commitment to Child Dignity &amp; Protection</h2>
              <p>
                Eden Resource Home adheres strictly to the Juvenile Justice (Care and Protection of Children) Act and national child protection protocols. All information regarding minor residents is protected with the highest level of confidentiality. Photographic representations of children are documented purely for archival, educational, and institutional advocacy without compromising personal dignity or individual identifying records.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-title-lg text-title-lg text-primary font-bold">2. Information We Collect from Visitors &amp; Donors</h2>
              <p>
                When you interact with our website to make voluntary contributions or submit correspondence, we may collect:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Your name, email address, and phone number.</li>
                <li>Voluntary donation amounts and communication messages.</li>
                <li>Optional PAN number strictly for non-profit accounting records if requested.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-title-lg text-title-lg text-primary font-bold">3. How Your Information is Used</h2>
              <p>
                Information provided is utilized solely to:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Acknowledge and confirm donor support and issue official transaction receipts.</li>
                <li>Respond to correspondence, volunteer inquiries, and campus visit coordination.</li>
                <li>Maintain statutory compliance and transparent institutional records.</li>
              </ul>
              <p>
                Eden Resource Home never sells, rents, or commercializes personal contact details with third-party marketers.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-title-lg text-title-lg text-primary font-bold">4. Contacting Us Regarding Privacy</h2>
              <p>
                If you have questions regarding this policy or our data practices, please reach our administrative office at:
              </p>
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
