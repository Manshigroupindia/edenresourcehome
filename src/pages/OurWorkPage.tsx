import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { programsData } from '../data/programs';
import { SeoMeta } from '../components/common/SeoMeta';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const OurWorkPage: React.FC = () => {
  return (
    <>
      <SeoMeta
        title="Our Work & Programs | Eden Resource Home Manipur"
        description="Explore the 5 core child welfare programs of Eden Resource Home in Ukhrul, Manipur: Education, Residential Care, Healthcare & Nutrition, Child Development, and Community Support."
      />

      <div className="flex flex-col w-full">
        {/* SUB-HEADER HERO */}
        <section className="relative w-full -mt-20 pt-32 pb-16 lg:pb-24 overflow-hidden bg-primary text-on-primary">
          <div
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-25 pointer-events-none"
            style={{ backgroundImage: `url('/images/45-background.jpg')` }}
          />
          <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-secondary/30 blur-3xl pointer-events-none" />
          <div className="absolute left-10 top-20 w-72 h-72 rounded-full bg-tertiary-fixed-dim/10 blur-2xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-6 font-label-md text-label-md text-on-primary-container tracking-wider uppercase">
              <Link to="/" className="hover:text-primary-fixed transition-colors">
                Home
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary-fixed font-bold">Our Work</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container-lowest/10 backdrop-blur-sm text-primary-fixed text-label-md font-label-md">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">eco</span>
                  <span>Comprehensive Holistic Care System</span>
                </div>

                <h1 className="font-headline-lg text-headline-lg lg:font-display lg:text-display text-on-primary tracking-tight">
                  Our Work &amp; Programs
                </h1>

                <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl leading-relaxed">
                  Supporting children through dignified residential shelter, quality school education, robust healthcare, and nurturing community pathways nestled in the Ukhrul hills.
                </p>
              </div>

              <div className="lg:col-span-4 flex lg:justify-end">
                <div className="p-6 rounded-2xl bg-surface-container-lowest/10 backdrop-blur-md space-y-3 w-full sm:w-auto border border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary-fixed-dim text-[28px]">verified</span>
                    <div>
                      <p className="font-title-md text-title-md text-on-primary font-bold">
                        {siteConfig.yearsOfService}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-primary-container">
                        Continuous Service in Manipur
                      </p>
                    </div>
                  </div>
                  <div className="h-px w-full bg-on-primary-container/20" />
                  <div className="flex items-center justify-between text-body-sm text-on-primary-container">
                    <span>Established {siteConfig.establishedYear}</span>
                    <span className="text-tertiary-fixed-dim font-bold">Ukhrul District</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT METRIC STRIP */}
        <section className="w-full bg-surface-container-low py-8 shadow-sm border-b border-outline-variant/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-secondary-fixed text-[24px]">school</span>
                </div>
                <div>
                  <div className="font-stat-display text-stat-display text-primary leading-none">100%</div>
                  <div className="font-label-md text-label-md text-on-surface-variant mt-1">School Enrollment</div>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-secondary-fixed text-[24px]">cottage</span>
                </div>
                <div>
                  <div className="font-stat-display text-stat-display text-primary leading-none">24/7</div>
                  <div className="font-label-md text-label-md text-on-surface-variant mt-1">Dignified Shelter &amp; Care</div>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-secondary-fixed text-[24px]">favorite</span>
                </div>
                <div>
                  <div className="font-stat-display text-stat-display text-primary leading-none">3 Meals</div>
                  <div className="font-label-md text-label-md text-on-surface-variant mt-1">Daily Warm Nutrition</div>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-secondary-fixed text-[24px]">diversity_1</span>
                </div>
                <div>
                  <div className="font-stat-display text-stat-display text-primary leading-none">50+</div>
                  <div className="font-label-md text-label-md text-on-surface-variant mt-1">Active Residents</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAM 1: Education & Learning */}
        <section className="w-full py-16 lg:py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container-high aspect-[4/3]">
                  <ImageWithFallback
                    src="/images/41-vibrant-group-of-young-manipuri-school-c.jpg"
                    alt="Vibrant group of young Manipuri school children in neat uniforms sitting together"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 text-on-primary">
                    <span className="font-label-md text-label-md text-tertiary-fixed-dim uppercase tracking-wider">
                      Foundation Pillar 01
                    </span>
                    <p className="font-title-lg text-title-lg text-on-primary font-bold">
                      Academic Literacy &amp; Computer Confidence
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-4 absolute -bottom-6 -right-6 bg-surface-container-lowest p-5 rounded-xl shadow-lg max-w-xs border border-outline-variant/20">
                  <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-secondary text-[24px]">menu_book</span>
                  </div>
                  <div>
                    <p className="font-title-md text-title-md text-primary font-bold">Full Kits Provided</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Uniforms, notebooks, bags, stationery</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-md font-label-md">
                  <span className="material-symbols-outlined text-[16px]">school</span>
                  <span>Core Program 01</span>
                </div>

                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                  Education &amp; Academic Learning
                </h2>

                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {programsData[0].fullDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {programsData[0].highlights.map((h, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-surface-container-low space-y-2 border border-outline-variant/15">
                      <div className="flex items-center gap-2 text-primary font-title-md text-title-md font-semibold">
                        <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                        <span>{h.title}</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {h.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAM 2: Residential Care */}
        <section className="w-full py-16 lg:py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-label-md font-label-md">
                  <span className="material-symbols-outlined text-[16px]">cottage</span>
                  <span>Core Program 02</span>
                </div>

                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                  Nurturing Residential Care &amp; Nutrition
                </h2>

                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {programsData[1].fullDescription}
                </p>

                <div className="space-y-3.5 pt-2">
                  {programsData[1].highlights.map((h, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-surface-container-lowest flex items-start gap-4 shadow-sm border border-outline-variant/15">
                      <div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">
                          {idx === 0 ? 'bed' : idx === 1 ? 'restaurant' : 'family_restroom'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-title-md text-title-md text-on-surface font-bold">
                          {h.title}
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                          {h.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 relative order-1 lg:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container-high aspect-[4/3]">
                  <ImageWithFallback
                    src="/images/42-eden-resource-home-campus-two-story-resi.jpg"
                    alt="Eden Resource Home campus residential building surrounded by pine trees"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 text-on-primary">
                    <span className="font-label-md text-label-md text-tertiary-fixed-dim uppercase tracking-wider">
                      Foundation Pillar 02
                    </span>
                    <p className="font-title-lg text-title-lg text-on-primary font-bold">
                      Dignity, Warmth &amp; Protected Hill Shelter
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-3 absolute -top-5 -left-5 bg-surface-container-lowest px-4 py-3 rounded-xl shadow-md border border-outline-variant/20">
                  <span className="material-symbols-outlined text-secondary text-[22px]">nest_protect</span>
                  <span className="font-title-md text-title-md text-primary font-bold">Safe Haven Since 2001</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAM 3: Healthcare & Wellbeing */}
        <section className="w-full py-16 lg:py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container-high aspect-[4/3]">
                  <ImageWithFallback
                    src="/images/43-a-caring-female-doctor-conducting-a-rout.jpg"
                    alt="A caring doctor conducting a routine gentle health checkup for a child"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 text-on-primary">
                    <span className="font-label-md text-label-md text-tertiary-fixed-dim uppercase tracking-wider">
                      Foundation Pillar 03
                    </span>
                    <p className="font-title-lg text-title-lg text-on-primary font-bold">
                      Preventive Care &amp; Wholesome Growth
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-md font-label-md">
                  <span className="material-symbols-outlined text-[16px]">health_and_safety</span>
                  <span>Core Program 03</span>
                </div>

                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                  Healthcare, Hygiene &amp; Child Wellbeing
                </h2>

                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {programsData[2].fullDescription}
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-secondary text-[20px]">medical_services</span>
                    </div>
                    <div>
                      <h4 className="font-title-md text-title-md text-primary font-bold">Periodic Health &amp; Vision Check-ups</h4>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">Routine developmental assessments, seasonal vaccinations, eye screenings, and basic dental hygiene consultations.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-secondary text-[20px]">wash</span>
                    </div>
                    <div>
                      <h4 className="font-title-md text-title-md text-primary font-bold">Hygiene &amp; Clean Habit Formation</h4>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">Structured education on personal cleanliness, sanitary sanitation practices, hand hygiene, and disease prevention.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-secondary text-[20px]">psychology</span>
                    </div>
                    <div>
                      <h4 className="font-title-md text-title-md text-primary font-bold">Emotional &amp; Mental Wellbeing</h4>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">Gentle peer circles, therapeutic counseling access, and a comforting environment free of punitive stress.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAMS 4 & 5: BENTO GRID */}
        <section className="w-full py-16 lg:py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-widest">
                Beyond the Classroom
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                Nurturing Potential &amp; Community Roots
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Empowerment requires cultural grounding, expressive outlets, and an interconnected fabric of community benefactors and passionate volunteers.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Program 4: Child Development & Extracurriculars */}
              <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-8 lg:p-10 shadow-sm flex flex-col justify-between space-y-8 border border-outline-variant/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-md font-label-md">
                      <span className="material-symbols-outlined text-[16px]">sports_soccer</span>
                      <span>Core Program 04</span>
                    </div>
                    <span className="font-label-md text-label-md text-on-surface-variant font-medium">Cultural &amp; Sports</span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-headline-md text-headline-md text-primary font-bold">
                      Child Development &amp; Extracurriculars
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Every child has latent artistic talents and physical energy that deserve joyful expression. We preserve Tangkhul and Manipuri indigenous cultural traditions alongside physical sports, life skills, and speech training.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-surface-container-low">
                      <div className="flex items-center gap-2 text-primary font-title-md text-title-md mb-1 font-bold">
                        <span className="material-symbols-outlined text-secondary text-[20px]">music_note</span>
                        <span>Folk Music &amp; Dance</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Preserving regional heritage through traditional songs, drumming, and indigenous choreography.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-low">
                      <div className="flex items-center gap-2 text-primary font-title-md text-title-md mb-1 font-bold">
                        <span className="material-symbols-outlined text-secondary text-[20px]">sports_volleyball</span>
                        <span>Football &amp; Athletics</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Daily outdoor sports on the Ukhrul fields instilling teamwork, discipline, and stamina.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-low">
                      <div className="flex items-center gap-2 text-primary font-title-md text-title-md mb-1 font-bold">
                        <span className="material-symbols-outlined text-secondary text-[20px]">mic</span>
                        <span>Public Speaking</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Debates, elocution, drama, and confidence-building workshops for future leadership.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-low">
                      <div className="flex items-center gap-2 text-primary font-title-md text-title-md mb-1 font-bold">
                        <span className="material-symbols-outlined text-secondary text-[20px]">handshake</span>
                        <span>Life Skills Coaching</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Financial literacy basics, teamwork, problem-solving, and conflict resolution.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden h-48 bg-surface-container-high relative">
                  <ImageWithFallback
                    src="/images/44-happy-young-boys-and-girls-in-ukhrul-pla.jpg"
                    alt="Happy young boys and girls in Ukhrul playing football on a green grass field"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-primary/20 pointer-events-none" />
                </div>
              </div>

              {/* Program 5: Community & Volunteer Support */}
              <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-8 lg:p-10 shadow-sm flex flex-col justify-between space-y-8 border border-outline-variant/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-md font-label-md">
                      <span className="material-symbols-outlined text-[16px]">groups</span>
                      <span>Core Program 05</span>
                    </div>
                    <span className="font-label-md text-label-md text-on-surface-variant font-medium">Community Alliance</span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-headline-md text-headline-md text-primary font-bold">
                      Community &amp; Volunteer Support
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Eden Resource Home functions as a shared community trust. We foster deep ties with Ukhrul village councils, visiting professionals, college mentors, and transparent global benefactors.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-surface-container-low flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">volunteer_activism</span>
                      <div>
                        <h4 className="font-title-md text-title-md text-primary font-bold">Volunteer Educator Program</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Local and visiting scholars who offer guest tutoring, vocational mentorship, and arts coaching.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-low flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">handshake</span>
                      <div>
                        <h4 className="font-title-md text-title-md text-primary font-bold">Village &amp; Tribal Elder Liaison</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Collaborative family identification ensuring our admission process serves the most vulnerable children.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-low flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">shield_person</span>
                      <div>
                        <h4 className="font-title-md text-title-md text-primary font-bold">Benevolent Donor Stewardship</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">100% transparent audits, annual reports, and direct letter correspondence with child sponsors.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-surface-container-high/60 flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-[28px]">handshake</span>
                  <div>
                    <p className="font-title-md text-title-md text-primary font-bold">Want to teach or visit?</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">We welcome guest mentors and workshops year-round.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT STORIES / TESTIMONIAL VIGNETTE */}
        <section className="w-full py-16 lg:py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="bg-primary-container text-on-primary rounded-3xl p-8 lg:p-14 relative overflow-hidden shadow-2xl">
              <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-2 text-tertiary-fixed-dim font-label-md text-label-md uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[18px]">format_quote</span>
                    <span>Our Guiding Philosophy</span>
                  </div>
                  <p className="font-headline-md text-headline-md lg:font-headline-lg lg:text-headline-lg text-on-primary italic leading-relaxed">
                    “Every child deserves not just survival, but an enduring foundation of warmth, dignity, and a clear horizon of dreams.”
                  </p>
                  <p className="font-body-md text-body-md text-on-primary-container">
                    — Founders {siteConfig.founders.names}, Eden Resource Home, Manipur
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end justify-center">
                  <div className="p-4 rounded-xl bg-surface-container-lowest/10 backdrop-blur-sm text-center lg:text-right w-full sm:w-auto border border-white/10">
                    <span className="font-stat-display text-stat-display text-tertiary-fixed-dim leading-none">200+</span>
                    <p className="font-body-sm text-body-sm text-on-primary-container mt-1">Alumni pursuing careers &amp; higher education across India</p>
                  </div>
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-surface-container-lowest text-primary font-label-lg text-label-lg shadow-sm hover:bg-surface-container-low transition-all"
                  >
                    <span>Read Our Full Story</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 ACTIONABLE PATHWAYS */}
        <section className="w-full py-16 lg:py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-widest">
                Get Involved Today
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                How You Can Help Make an Impact
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Your active compassion changes the trajectory of a child’s life. Explore three clear ways you can partner with Eden Resource Home.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pathway 1 */}
              <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow border border-outline-variant/20">
                <div className="space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                    <span className="material-symbols-outlined text-[28px]">volunteer_activism</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Make a Donation</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Fuel our daily meal program, educational school supplies, and winter bedding with transparent giving of any amount.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low space-y-2">
                    <p className="font-label-md text-label-md text-secondary font-bold uppercase">Flexible Support</p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-title-lg text-title-lg text-primary font-bold">Custom Amount</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">You decide your gift</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/donate"
                  className="w-full py-3.5 px-6 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg text-center hover:bg-secondary transition-colors inline-block shadow-sm"
                >
                  Donate Now
                </Link>
              </div>

              {/* Pathway 2 */}
              <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow border border-outline-variant/20">
                <div className="space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                    <span className="material-symbols-outlined text-[28px]">person_heart</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Become a Volunteer</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Lend your time as a remote tutor, on-campus sports coach, medical camp volunteer, or vocational mentor for our youth.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low space-y-2">
                    <p className="font-label-md text-label-md text-secondary font-bold uppercase">Open Opportunities</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">English tutoring, STEM workshops, creative arts, and medical visits in Ukhrul.</p>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="w-full py-3.5 px-6 rounded-lg bg-secondary text-on-secondary font-label-lg text-label-lg text-center hover:bg-primary transition-colors inline-block shadow-sm"
                >
                  Sign Up to Volunteer
                </Link>
              </div>

              {/* Pathway 3 */}
              <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow border border-outline-variant/20">
                <div className="space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                    <span className="material-symbols-outlined text-[28px]">contact_support</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Contact Our Team</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Have questions about corporate partnerships, direct sponsorship, or arranging a polite visit to our Ukhrul campus?
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low space-y-2">
                    <p className="font-label-md text-label-md text-secondary font-bold uppercase">Direct Support Line</p>
                    <p className="font-body-sm text-body-sm text-on-surface font-semibold">{siteConfig.phone}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant truncate">{siteConfig.email}</p>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="w-full py-3.5 px-6 rounded-lg bg-surface-container-high text-primary font-label-lg text-label-lg text-center hover:bg-secondary-fixed transition-colors inline-block"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
