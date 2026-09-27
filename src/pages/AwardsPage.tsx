import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { awardsData, archivalMilestones, type AwardItem } from '../data/awards';
import { DocumentLightbox } from '../components/awards/DocumentLightbox';
import { SeoMeta } from '../components/common/SeoMeta';
import { CTASection } from '../components/common/CTASection';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const AwardsPage: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<AwardItem | null>(null);

  return (
    <>
      <SeoMeta
        title="Awards & Recognition | Eden Resource Home Manipur"
        description="Public archives and verified historical recognition for Eden Resource Home, including Government of Manipur Gazette notifications, National Award citations, and distinction records."
      />

      <div className="flex flex-col w-full">
        {/* EDITORIAL BREADCRUMB BAR */}
        <section className="w-full bg-surface-container-low py-4 px-6 lg:px-12 border-b border-outline-variant/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
            <div className="flex items-center gap-2">
              <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">home</span>
                <span>Home</span>
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="text-primary font-semibold">Awards &amp; Recognition</span>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary" />
              <span className="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
                Public Archives • Verified Documentation
              </span>
            </div>
          </div>
        </section>

        {/* TITLE & NARRATIVE LEAD */}
        <section className="w-full bg-surface py-12 lg:py-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-md font-label-md">
                <span className="material-symbols-outlined text-[15px]">verified_user</span>
                <span>Archival Integrity • Since 2001</span>
              </div>

              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                Awards, Recognition &amp; Archival Records
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                A documented history of service, state recognition, and child welfare advocacy. Every record preserves the quiet dedication of founders, staff, and our community partners who build genuine security for children across Ukhrul District.
              </p>
            </div>

            <div className="lg:col-span-4 bg-surface-container-low p-6 rounded-2xl shadow-sm space-y-3 border border-outline-variant/20">
              <div className="flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined text-[20px]">policy</span>
                <span className="font-title-md text-title-md text-primary font-semibold">
                  Transparency Standard
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Eden Resource Home maintains verified physical and media archives. We refrain from displaying speculative credentials or synthetic claims, prioritizing authenticated public records and community testimony.
              </p>
            </div>
          </div>
        </section>

        {/* DOCUMENT SUMMARY METRICS STRIP */}
        <section className="w-full px-6 lg:px-12 -mt-4 mb-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/15">
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
                Archived Milestones
              </span>
              <span className="font-stat-display text-stat-display text-primary mt-2">24+</span>
              <span className="font-body-sm text-body-sm text-secondary">Years of continuous service</span>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/15">
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
                Gazette Record
              </span>
              <span className="font-stat-display text-stat-display text-primary mt-2">2009</span>
              <span className="font-body-sm text-body-sm text-secondary">State gazette notification</span>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/15">
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
                Press Citations
              </span>
              <span className="font-stat-display text-stat-display text-primary mt-2">18+</span>
              <span className="font-body-sm text-body-sm text-secondary">Regional &amp; national features</span>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/15">
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
                Primary Base
              </span>
              <span className="font-stat-display text-stat-display text-primary mt-2">Ukhrul</span>
              <span className="font-body-sm text-body-sm text-secondary">Tallui Junction, Manipur</span>
            </div>
          </div>
        </section>

        {/* MAIN ARCHIVAL CARDS GRID */}
        <section className="w-full py-8 lg:py-12 px-6 lg:px-12 bg-surface">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-label-lg text-label-lg text-secondary font-bold uppercase tracking-wider">
                  Primary Evidence
                </span>
                <h2 className="font-headline-md text-headline-md text-primary mt-1">
                  Official Documents &amp; Commemorative Records
                </h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                Select any archival record below to inspect scanned facsimiles, publication details, and verification context.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {awardsData.map((item) => (
                <article
                  key={item.id}
                  className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-md border border-outline-variant/20"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-md font-label-md font-semibold">
                        {item.badge}
                      </span>
                      <span className="font-label-md text-label-md text-on-surface-variant">
                        {item.year}
                      </span>
                    </div>

                    <div className="relative w-full h-56 bg-surface-container-low rounded-xl overflow-hidden shadow-inner flex items-center justify-center p-3">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-2 right-2 bg-primary/80 backdrop-blur-sm text-on-primary px-2.5 py-0.5 rounded text-label-md font-label-md flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">{item.badgeIcon}</span>
                        <span>{item.type.split(' ')[0]}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-headline-sm text-headline-sm text-primary leading-snug font-bold">
                        {item.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                        {item.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => setSelectedDocument(item)}
                      className="w-full py-2.5 px-4 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">zoom_in</span>
                      <span>Inspect Document</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ARCHIVAL CONTEXT TIMELINE */}
        <section className="w-full py-16 px-6 lg:px-12 bg-surface-container-low">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="font-label-lg text-label-lg text-secondary font-bold uppercase tracking-wider">
                  Chronicle of Stewardship
                </span>
                <h2 className="font-headline-md text-headline-md text-primary font-bold">
                  A Documented Legacy in Ukhrul
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Recognition is not an endpoint for Eden Resource Home; it stands as an enduring record of accountability. Each citation reflects dozens of children who found stable meals, quiet study desks, and compassionate mentorship.
                </p>
              </div>

              <div className="space-y-6 pt-4">
                {archivalMilestones.map((m) => (
                  <div key={m.step} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-title-md text-title-md font-bold shrink-0 shadow-sm">
                      {m.step}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-title-md text-title-md text-primary font-bold">
                        {m.year} • {m.title}
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Callout */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="p-8 rounded-3xl bg-surface-container-lowest shadow-md space-y-6 border border-outline-variant/20">
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[28px]">shield</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                  Institutional Integrity &amp; Transparency
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  As an accredited child care institution recognized under the Juvenile Justice system, Eden Resource Home submits regular operational reports to the relevant authorities, maintaining full compliance with statutory child safety standards.
                </p>
                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-secondary font-bold font-label-lg hover:underline"
                  >
                    <span>Arrange Official Inquiries</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection
          title="Support Transparent Child Welfare in Manipur"
          description="Help sustain our accredited residential care, education supplies, and medical checkups for children at Eden Resource Home."
        />

        {/* Document Lightbox Modal */}
        <DocumentLightbox
          isOpen={selectedDocument !== null}
          item={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      </div>
    </>
  );
};
