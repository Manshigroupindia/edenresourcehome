import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { programsData } from '../data/programs';
import { SeoMeta } from '../components/common/SeoMeta';
import { CTASection } from '../components/common/CTASection';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const HomePage: React.FC = () => {
  return (
    <>
      <SeoMeta
        title="Eden Resource Home | Child Care & Education in Manipur"
        description="Providing safe shelter, formal education, healthcare, and loving residential care for vulnerable children in Ukhrul, Manipur since 2001."
      />

      <div className="flex flex-col w-full">
        {/* 1. HERO SECTION */}
        <section className="relative w-full overflow-hidden bg-primary-container text-on-primary">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero-manipuri-children.png"
              alt="Eden Resource Home Children smiling in Ukhrul hills"
              className="w-full h-full object-cover object-center opacity-30 filter brightness-90 mix-blend-luminosity scale-105 transition-transform duration-1000 ease-out hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-container/95 to-primary-container/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28 flex flex-col justify-center">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-secondary-container/20 text-secondary-fixed backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
                <span className="font-label-md text-label-md tracking-wider uppercase font-semibold">
                  Serving Ukhrul, Manipur Since {siteConfig.establishedYear}
                </span>
              </div>

              <h1 className="font-display text-display text-white tracking-tight leading-tight">
                Creating a Safe Home. <br className="hidden sm:inline" />
                <span className="italic font-normal text-secondary-fixed">Building Brighter</span> Futures.
              </h1>

              <p className="font-body-lg text-body-lg text-surface-container-high/90 max-w-xl leading-relaxed">
                Eden Resource Home is committed to providing shelter, education, care, and opportunities for children in need in Manipur. Nurturing independence, dignity, and enduring growth in the serene hills of Ukhrul.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-secondary text-on-secondary font-label-lg text-label-lg shadow-lg hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span translate="no" className="notranslate material-symbols-outlined text-[18px]">volunteer_activism</span>
                  <span>Support Our Children</span>
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-highest/20 text-white backdrop-blur-sm hover:bg-surface-container-highest/30 transition-all font-label-lg text-label-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Learn About Us</span>
                  <span translate="no" className="notranslate material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Quick Trust Indicators Bar */}
            <div className="pt-12 mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
              {siteConfig.trustIndicators.map((indicator, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-surface-container-highest/15 backdrop-blur-sm px-4 py-3 rounded-lg"
                >
                  <span translate="no" className="notranslate material-symbols-outlined text-secondary-fixed text-[22px]">
                    {indicator.icon}
                  </span>
                  <span className="font-label-md text-label-md text-surface-container-lowest font-medium">
                    {indicator.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. QUICK FACTS / IMPACT METRICS */}
        <section className="relative z-20 max-w-7xl mx-auto w-full px-6 lg:px-12 -mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-md flex items-center gap-4 hover:shadow-lg transition-all border border-outline-variant/20">
              <div className="w-14 h-14 rounded-xl bg-surface-container-low text-secondary flex items-center justify-center shrink-0">
                <span translate="no" className="notranslate material-symbols-outlined text-[28px]">calendar_month</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  Established
                </span>
                <span className="font-stat-display text-stat-display text-primary leading-none mt-1">
                  {siteConfig.establishedYear}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1 truncate">
                  Dedicated to Children
                </span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-md flex items-center gap-4 hover:shadow-lg transition-all border border-outline-variant/20">
              <div className="w-14 h-14 rounded-xl bg-surface-container-low text-secondary flex items-center justify-center shrink-0">
                <span translate="no" className="notranslate material-symbols-outlined text-[28px]">groups</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  Children Supported
                </span>
                <span className="font-stat-display text-stat-display text-primary leading-none mt-1">
                  {siteConfig.childrenSupported}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-[11px] leading-tight">
                  Historical figure • Ongoing
                </span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-md flex items-center gap-4 hover:shadow-lg transition-all border border-outline-variant/20">
              <div className="w-14 h-14 rounded-xl bg-surface-container-low text-secondary flex items-center justify-center shrink-0">
                <span translate="no" className="notranslate material-symbols-outlined text-[28px]">hourglass_bottom</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  Years of Service
                </span>
                <span className="font-stat-display text-stat-display text-primary leading-none mt-1">
                  {siteConfig.yearsOfService}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1 truncate">
                  Unbroken Stewardship
                </span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-md flex items-center gap-4 hover:shadow-lg transition-all border border-outline-variant/20">
              <div className="w-14 h-14 rounded-xl bg-surface-container-low text-secondary flex items-center justify-center shrink-0">
                <span translate="no" className="notranslate material-symbols-outlined text-[28px]">location_on</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  Location
                </span>
                <span className="font-headline-sm text-headline-sm text-primary leading-tight mt-1 font-bold">
                  Ukhrul
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 truncate">
                  Manipur, Northeast India
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. OUR MISSION */}
        <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container">
                <ImageWithFallback
                  src="/images/35-manipuri-children-studying-diligently-ar.jpg"
                  alt="Manipuri children studying diligently around wooden tables in a bright airy classroom in Ukhrul"
                  className="w-full h-[460px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
                      <span translate="no" className="notranslate material-symbols-outlined text-[20px]">auto_stories</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface font-medium leading-snug">
                      Every child is granted full access to textbooks, qualified teachers, nutritious dietary care, and individual mentoring.
                    </p>
                  </div>
                </div>
              </div>

              {/* Overlapping floating badge */}
              <div className="hidden sm:flex absolute -top-6 -right-6 bg-surface-container-lowest p-5 rounded-2xl shadow-xl flex-col items-center text-center max-w-[180px] border border-outline-variant/20">
                <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[36px] mb-1">cottage</span>
                <span className="font-headline-sm text-headline-sm text-primary leading-tight font-bold">100%</span>
                <span className="font-label-md text-label-md text-on-surface-variant">Safe Shelter &amp; Family Environment</span>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="font-label-lg text-label-lg font-bold text-secondary uppercase tracking-widest">
                  Our Guiding Purpose
                </span>
                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                  Nurturing Potential with Dignity, Education, and Enduring Love
                </h2>
              </div>

              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Eden Resource Home provides a safe haven and comprehensive support for orphaned, destitute, and vulnerable children in Ukhrul District, Manipur. We believe every child deserves not just survival, but the foundational tools to flourish into a confident, independent citizen.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low">
                  <span translate="no" className="notranslate material-symbols-outlined text-secondary shrink-0 text-[20px] mt-0.5">check_circle</span>
                  <div>
                    <h4 className="font-title-md text-title-md text-primary font-bold">Dignified Shelter</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Safe, affectionate residential care with wholesome daily living.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low">
                  <span translate="no" className="notranslate material-symbols-outlined text-secondary shrink-0 text-[20px] mt-0.5">check_circle</span>
                  <div>
                    <h4 className="font-title-md text-title-md text-primary font-bold">Academic Excellence</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Continuous schooling, books, tuition, and cognitive empowerment.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low">
                  <span translate="no" className="notranslate material-symbols-outlined text-secondary shrink-0 text-[20px] mt-0.5">check_circle</span>
                  <div>
                    <h4 className="font-title-md text-title-md text-primary font-bold">Health &amp; Nutrition</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Periodic health screenings, hygienic facilities, and balanced diets.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low">
                  <span translate="no" className="notranslate material-symbols-outlined text-secondary shrink-0 text-[20px] mt-0.5">check_circle</span>
                  <div>
                    <h4 className="font-title-md text-title-md text-primary font-bold">Life Skills &amp; Culture</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Fostering local heritage, recreational athletics, and creative arts.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-6">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-secondary transition-all"
                >
                  <span>Learn More About Our Mission</span>
                  <span translate="no" className="notranslate material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WHAT WE DO (5 Dedicated Service Cards) */}
        <section className="w-full bg-surface-container-low py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <span className="font-label-lg text-label-lg font-bold text-secondary uppercase tracking-widest">
                Our Holistic Framework
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                What We Do
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                We provide comprehensive child care and social support through five foundational pillars, ensuring sustained physical, mental, and spiritual well-being.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programsData.map((prog, idx) => (
                <div
                  key={prog.id}
                  className={`bg-surface-container-lowest p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-outline-variant/20 ${
                    idx === 4 ? 'lg:col-span-2' : ''
                  }`}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container text-secondary flex items-center justify-center">
                      <span translate="no" className="notranslate material-symbols-outlined text-[26px]">{prog.icon}</span>
                    </div>
                    <h3 className="font-title-lg text-title-lg text-primary font-bold">
                      {prog.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {prog.shortDescription}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 flex flex-wrap items-center justify-between gap-4 text-secondary font-label-md text-label-md">
                    <span>{prog.tag}</span>
                    <Link
                      to="/our-work"
                      className="inline-flex items-center gap-1 text-primary hover:text-secondary font-bold"
                    >
                      <span>Explore</span>
                      <span translate="no" className="notranslate material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. OUR STORY PREVIEW */}
        <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="font-label-lg text-label-lg font-bold text-secondary uppercase tracking-widest">
                Our Heritage &amp; Roots
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                Founded on Compassion in the Hills of Ukhrul
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                In 2001, moved by the silent struggles of orphaned and underprivileged children in the conflict-affected hill districts of Manipur, <strong>Mr. R.M. Sangreingam</strong> and his wife <strong>Mrs. R.M. Tanmila</strong> opened their doors. What began as a humble family initiative to feed and shelter a handful of young souls quickly matured into Eden Resource Home.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Over two decades of selfless dedication transformed this mountain haven into a beacon of stability. Here, children find more than meals and a bed — they discover a real family, unconditional encouragement, and the moral strength to overcome life’s harshest early obstacles.
              </p>

              <div className="p-6 rounded-xl bg-surface-container flex items-center gap-4 border-l-4 border-secondary">
                <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[32px] shrink-0">format_quote</span>
                <p className="font-title-md text-title-md text-primary italic leading-snug">
                  "To see a child smile with renewed self-respect and step boldly into the future is the highest reward of our collective service."
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:bg-secondary transition-all"
                >
                  <span>Read Our Full Story</span>
                  <span translate="no" className="notranslate material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-surface-container">
                <ImageWithFallback
                  src="/images/36-founders-mr-sangreingam-and-mrs-tanmila-.jpg"
                  alt="Founders Mr Sangreingam and Mrs Tanmila standing warmly in front of Eden Resource Home building"
                  className="w-full h-[420px]"
                />
              </div>
              <div className="mt-4 p-4 rounded-xl bg-surface-container-low text-center border border-outline-variant/20">
                <p className="font-label-md text-label-md text-on-surface font-semibold">
                  Founders: {siteConfig.founders.names}
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Guiding the home with love, humility, and steadfast vision since {siteConfig.establishedYear}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. GALLERY PREVIEW */}
        <section className="w-full bg-surface-container-low py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <span className="font-label-lg text-label-lg font-bold text-secondary uppercase tracking-widest">
                  Life at Eden Resource Home
                </span>
                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                  Moments of Joy &amp; Learning
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                  A glimpse into the daily rhythm of study, fellowship, recreational sports, and communal celebrations.
                </p>
              </div>

              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-container-lowest text-primary shadow-sm hover:bg-surface-container-high transition-all font-label-lg text-label-lg shrink-0 border border-outline-variant/20"
              >
                <span>View Full Gallery</span>
                <span translate="no" className="notranslate material-symbols-outlined text-[18px]">grid_view</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  tag: "School Mornings",
                  title: "Journey to School",
                  image: "/images/37-manipuri-children-in-clean-school-unifor.jpg",
                  alt: "Manipuri children in clean school uniforms walking happily down a mountain path"
                },
                {
                  tag: "Education",
                  title: "Reading & Library Hours",
                  image: "/images/38-children-in-classroom-reading-books-toge.jpg",
                  alt: "Children in classroom reading books together"
                },
                {
                  tag: "Culture & Heritage",
                  title: "Traditional Celebrations",
                  image: "/images/39-children-wearing-colorful-traditional-ma.jpg",
                  alt: "Children wearing colorful traditional Manipuri Tangkhul tribal attire"
                },
                {
                  tag: "Recreation",
                  title: "Evening Sports & Play",
                  image: "/images/40-children-playing-outdoors-on-the-green-c.jpg",
                  alt: "Children playing outdoors on the green campus field playing football"
                }
              ].map((item, idx) => (
                <Link
                  key={idx}
                  to="/gallery"
                  className="group relative rounded-2xl overflow-hidden shadow-sm aspect-[4/5] bg-surface-container block"
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-secondary-fixed">
                      {item.tag}
                    </span>
                    <p className="font-title-md text-title-md leading-tight mt-1 font-semibold">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 7. AWARDS & RECOGNITION PREVIEW */}
        <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-16 lg:py-24">
          <div className="bg-surface-container-lowest p-8 lg:p-12 rounded-3xl shadow-sm border border-outline-variant/20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">
                  <span translate="no" className="notranslate material-symbols-outlined text-[16px]">military_tech</span>
                  <span>Archival Records &amp; Institutional Milestones</span>
                </div>

                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                  Recognized for Unwavering Service &amp; Child Protection
                </h2>

                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  Our institutional integrity is rooted in transparent governance and verified service. In 2009, Eden Resource Home received official recognition by the <strong>Government of Manipur under the Juvenile Justice (Care and Protection of Children) Act</strong>, followed by prestigious national accolades in 2010 honoring exemplary rural child shelter administration.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    to="/awards"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:bg-secondary transition-all"
                  >
                    <span>View Awards &amp; Recognition</span>
                    <span translate="no" className="notranslate material-symbols-outlined text-[18px]">workspace_premium</span>
                  </Link>
                </div>
              </div>

              {/* Archival Badges Grid */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-surface-container-low flex flex-col justify-between space-y-3 border border-outline-variant/15">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary font-bold text-[14px]">
                      2009
                    </span>
                    <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[22px]">verified</span>
                  </div>
                  <div>
                    <h4 className="font-title-md text-title-md text-primary font-bold">
                      Govt. of Manipur Recognition
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Recognized under Juvenile Justice Act 2000 for child welfare and institutional protection.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-low flex flex-col justify-between space-y-3 border border-outline-variant/15">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary font-bold text-[14px]">
                      2010
                    </span>
                    <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[22px]">award_star</span>
                  </div>
                  <div>
                    <h4 className="font-title-md text-title-md text-primary font-bold">
                      National Recognition &amp; Award
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Commended for stellar grassroots service in hill tribal communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SUPPORT CALL TO ACTION */}
        <CTASection />
      </div>
    </>
  );
};
