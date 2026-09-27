import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { caregiverTeam } from '../data/team';
import { archivalMilestones } from '../data/awards';
import { SeoMeta } from '../components/common/SeoMeta';
import { CTASection } from '../components/common/CTASection';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SeoMeta
        title="About Eden Resource Home | Our Story & Mission in Manipur"
        description="Learn about the 24+ year journey of Eden Resource Home in Ukhrul, Manipur. Founded by Mr. R.M. Sangreingam and Mrs. R.M. Tanmila to provide loving shelter, education, and dignity."
      />

      <div className="flex flex-col w-full">
        {/* SUB-HEADER HERO */}
        <section className="relative w-full -mt-20 overflow-hidden bg-primary text-on-primary">
          <div
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
            style={{ backgroundImage: `url('/images/10-background.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/80 to-surface" />
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-20 lg:pb-28 flex flex-col items-start">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-label-md font-label-md text-secondary-fixed">
              <Link to="/" className="hover:text-surface-bright transition-colors">
                Home
              </Link>
              <span translate="no" className="notranslate material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-surface-bright font-bold">About Us</span>
            </nav>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/30 backdrop-blur-sm text-secondary-fixed text-label-md font-label-md">
                <span translate="no" className="notranslate material-symbols-outlined text-[16px]">volunteer_activism</span>
                <span>Nurturing Lives Since {siteConfig.establishedYear} • Ukhrul, Manipur</span>
              </div>
              
              <h1 className="font-headline-lg text-headline-lg lg:text-display lg:font-display text-surface-bright tracking-tight">
                About Eden Resource Home
              </h1>
              
              <p className="font-body-lg text-body-lg text-surface-container-high max-w-2xl leading-relaxed">
                Our Story. Our Mission. Our Commitment to Children. Building a foundation of steadfast love, wholesome education, and lasting dignity across the hills of Manipur.
              </p>
            </div>

            {/* Key Quick Metrics Ribbon */}
            <div className="mt-12 w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-surface-container-lowest/10 backdrop-blur-md shadow-lg border border-white/10">
              <div className="flex flex-col">
                <span className="font-stat-display text-stat-display text-secondary-fixed">
                  {siteConfig.establishedYear}
                </span>
                <span className="font-label-md text-label-md text-surface-container-high">Year Established</span>
              </div>
              <div className="flex flex-col">
                <span className="font-stat-display text-stat-display text-secondary-fixed">
                  {siteConfig.yearsOfService}
                </span>
                <span className="font-label-md text-label-md text-surface-container-high">Years of Dedicated Service</span>
              </div>
              <div className="flex flex-col">
                <span className="font-stat-display text-stat-display text-secondary-fixed">
                  {siteConfig.schoolEnrollment}
                </span>
                <span className="font-label-md text-label-md text-surface-container-high">School Attendance</span>
              </div>
              <div className="flex flex-col">
                <span className="font-stat-display text-stat-display text-secondary-fixed">JJ Act</span>
                <span className="font-label-md text-label-md text-surface-container-high">State Recognized Child Home</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: OUR STORY */}
        <section className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-surface">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-secondary font-label-lg text-label-lg font-bold">
                <span translate="no" className="notranslate material-symbols-outlined text-[20px]">local_library</span>
                <span className="uppercase tracking-wider">The Genesis &amp; Sanctuary</span>
              </div>

              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                A Humble Sanctuary in the Heart of Ukhrul
              </h2>

              <div className="space-y-4 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                <p>
                  Eden Resource Home was established in 2001 in Ukhrul, Manipur, with a solemn commitment to provide a nurturing, protective environment for orphaned, destitute, and severely vulnerable children. Amidst the shifting socio-economic landscape of the northeastern frontier, innocent children often faced unprecedented hardships without reliable shelter or educational access.
                </p>
                <p>
                  What began as an urgent compassionate response by a devoted family in a modest residential quarter has blossomed over two decades into an accredited child-care sanctuary. The home delivers complete residential security, nourishing meals, comprehensive healthcare, psychological care, and enrollment into accredited partner schools.
                </p>
                <p>
                  Every child who walks through our doors is embraced not merely as a ward, but as an irreplaceable member of our extended household, empowered to reclaim childhood in safety and self-worth.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <div className="p-4 rounded-xl bg-surface-container flex items-center gap-3">
                  <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[28px]">cabin</span>
                  <div>
                    <p className="font-title-md text-title-md text-on-surface font-semibold">
                      Community-Rooted Care
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Embedded within local Ukhrul values &amp; familial trust
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Campus Imagery Collage */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container-high aspect-[4/3]">
                <ImageWithFallback
                  src="/images/02-eden-resource-home-residential-building-.jpg"
                  alt="Eden Resource Home residential building set gracefully against the lush forested hills of Ukhrul"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-on-primary">
                  <p className="font-title-md text-title-md text-secondary-fixed font-bold">
                    The Eden Residential Campus
                  </p>
                  <p className="font-body-sm text-body-sm text-surface-container-low opacity-90">
                    Tallui Junction, Ukhrul District • Overlooking the serene mountain ranges
                  </p>
                </div>
              </div>

              {/* Overlapping insight badge */}
              <div className="-mt-8 -ml-4 sm:-ml-6 relative z-10 inline-flex items-center gap-4 p-5 rounded-2xl bg-surface-container-lowest shadow-xl max-w-sm border border-outline-variant/20">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-primary shrink-0">
                  <span translate="no" className="notranslate material-symbols-outlined text-[26px]">home_pin</span>
                </div>
                <div>
                  <p className="font-title-md text-title-md text-primary font-bold">
                    Safe Shelter, Safe Future
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Continuously operating residential home for {siteConfig.yearsOfService} uninterrupted years
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: MISSION & VISION */}
        <section className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-surface-container-low">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="font-label-lg text-label-lg text-secondary uppercase tracking-widest font-bold">
                Guiding Foundations
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                Our Mission &amp; Vision
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                The dual compass guiding our daily programs, educational support, and long-term care strategy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <div className="p-8 lg:p-10 rounded-2xl bg-surface-container-lowest shadow-md flex flex-col justify-between space-y-6 hover:shadow-xl transition-shadow border border-outline-variant/20">
                <div className="space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-primary">
                    <span translate="no" className="notranslate material-symbols-outlined text-[32px]">favorite</span>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-surface-container text-primary font-label-md text-label-md font-bold">
                    OUR MISSION
                  </span>
                  <h3 className="font-headline-md text-headline-md text-primary font-bold">
                    Nurturing Today's Potential
                  </h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    "To provide a safe and loving home, quality education, proper healthcare and holistic development to children in need."
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-3 text-secondary font-title-md text-title-md">
                  <span translate="no" className="notranslate material-symbols-outlined text-[20px]">check_circle</span>
                  <span>Holistic physical, mental &amp; emotional care</span>
                </div>
              </div>

              {/* Vision Card */}
              <div className="p-8 lg:p-10 rounded-2xl bg-surface-container-lowest shadow-md flex flex-col justify-between space-y-6 hover:shadow-xl transition-shadow border border-outline-variant/20">
                <div className="space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
                    <span translate="no" className="notranslate material-symbols-outlined text-[32px]">wb_sunny</span>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-surface-container text-primary font-label-md text-label-md font-bold">
                    OUR VISION
                  </span>
                  <h3 className="font-headline-md text-headline-md text-primary font-bold">
                    Empowering Tomorrow's Dreams
                  </h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    "To build a society where every child has the opportunity to grow, learn and achieve their dreams with dignity."
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-3 text-secondary font-title-md text-title-md">
                  <span translate="no" className="notranslate material-symbols-outlined text-[20px]">verified</span>
                  <span>Self-reliant, confident community members</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CORE VALUES */}
        <section className="w-full py-16 lg:py-20 px-6 lg:px-12 bg-surface">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-label-lg text-label-lg text-secondary uppercase tracking-widest font-bold">
                  Ethos &amp; Conviction
                </span>
                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                  Our Core Values
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                These five enduring principles guide our interactions with the children, our staff ethics, and community relationships.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  icon: "favorite",
                  title: "Compassion",
                  desc: "Approaching every child with tender understanding, patience, and warmth without judgment."
                },
                {
                  icon: "gavel",
                  title: "Integrity",
                  desc: "Total honesty, rigorous financial accountability, and transparent non-profit stewardship."
                },
                {
                  icon: "school",
                  title: "Education",
                  desc: "Believing literacy, critical thinking, and vocational learning unlock generational freedom."
                },
                {
                  icon: "diversity_1",
                  title: "Dignity",
                  desc: "Preserving honor and self-worth; never reducing children to objects of pity or distress."
                },
                {
                  icon: "groups",
                  title: "Community",
                  desc: "Partnering closely with local village councils, elders, schools, and health custodians."
                }
              ].map((val, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-surface-container-low shadow-sm flex flex-col items-center text-center space-y-3 group hover:bg-primary hover:text-on-primary transition-all duration-200 border border-outline-variant/15"
                >
                  <div className="w-12 h-12 rounded-full bg-surface-container-lowest group-hover:bg-secondary flex items-center justify-center text-secondary group-hover:text-on-secondary transition-colors">
                    <span translate="no" className="notranslate material-symbols-outlined text-[24px]">{val.icon}</span>
                  </div>
                  <h4 className="font-title-lg text-title-lg text-primary group-hover:text-surface-bright font-bold">
                    {val.title}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-surface-container-high leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: TIMELINE */}
        <section className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-surface-container-low">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-label-lg text-label-lg text-secondary uppercase tracking-widest font-bold">
                  Historical Records &amp; Milestones
                </span>
                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                  Our Enduring Journey
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md">
                <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[16px]">history_edu</span>
                <span>Archival Record Registry (2001 - Present)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {archivalMilestones.map((milestone) => (
                <div
                  key={milestone.step}
                  className="p-6 rounded-2xl bg-surface-container-lowest shadow-md flex flex-col justify-between space-y-4 border border-outline-variant/20 hover:shadow-lg transition-all"
                >
                  <div className="space-y-2">
                    <span className="font-stat-display text-stat-display text-primary block leading-none">
                      {milestone.year}
                    </span>
                    <div className="w-8 h-1 bg-secondary rounded-full" />
                    <h4 className="font-title-lg text-title-lg text-primary font-bold">
                      {milestone.title}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                  <span className="inline-block text-label-md font-label-md text-secondary font-semibold">
                    Milestone {milestone.step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: LEADERSHIP & MANAGEMENT */}
        <section className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-surface">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="font-label-lg text-label-lg text-secondary uppercase tracking-widest font-bold">
                Devoted Leadership
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                Our Founders &amp; Management
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Guided by enduring faith, ethical vigilance, and maternal care for every ward.
              </p>
            </div>

            {/* Founders Highlight Card */}
            <div className="p-8 lg:p-12 rounded-3xl bg-surface-container-lowest shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-outline-variant/20">
              <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-[4/3] bg-surface-container shadow-md">
                <ImageWithFallback
                  src={siteConfig.founders.image}
                  alt={siteConfig.founders.names}
                  className="w-full h-full"
                />
              </div>

              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-primary font-label-md text-label-md font-bold">
                  {siteConfig.founders.title}
                </div>

                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  {siteConfig.founders.names}
                </h3>

                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {siteConfig.founders.bio}
                </p>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-surface-container-low flex items-start gap-3">
                    <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[24px]">verified_user</span>
                    <div>
                      <p className="font-title-md text-title-md text-primary font-bold">
                        {siteConfig.yearsOfService}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Continuous hands-on guardianship
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container-low flex items-start gap-3">
                    <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[24px]">handshake</span>
                    <div>
                      <p className="font-title-md text-title-md text-primary font-bold">Community Trust</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Revered across Ukhrul District
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Caregivers Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {caregiverTeam.map((member) => (
                <div
                  key={member.id}
                  className="p-6 rounded-2xl bg-surface-container-low shadow-sm flex flex-col space-y-4 border border-outline-variant/15 hover:shadow-md transition-shadow"
                >
                  <div className="w-full h-52 rounded-xl overflow-hidden bg-surface-container">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.alt}
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <span className="font-label-md text-label-md text-secondary block font-bold">
                      {member.role}
                    </span>
                    <h4 className="font-title-lg text-title-lg text-primary font-bold">
                      {member.title}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: GOVERNMENT & INSTITUTIONAL RECOGNITION */}
        <section className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-surface-container-low">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <span className="font-label-lg text-label-lg text-secondary uppercase tracking-widest font-bold">
                  Accreditation &amp; Governance
                </span>
                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                  Government &amp; Institutional Recognition
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Eden Resource Home is certified and officially recognized by the Government of Manipur under the Juvenile Justice (Care and Protection of Children) Act, 2000, as an authorized child care institution.
                </p>
              </div>

              <Link
                to="/awards"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:bg-secondary transition-all shrink-0"
              >
                <span>View Official Archive Documents</span>
                <span translate="no" className="notranslate material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>

            {/* Preview Cards of Scanned Documents */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-md flex flex-col space-y-4 border border-outline-variant/20">
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container relative">
                  <ImageWithFallback
                    src="/images/07-official-sealed-government-gazette-certi.jpg"
                    alt="Manipur JJ Act Order (2009)"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center">
                    <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 font-label-md text-label-md font-bold text-primary shadow-sm">
                      Gazette Certified
                    </span>
                  </div>
                </div>
                <div>
                  <span className="font-label-md text-label-md text-secondary font-bold">STATE RECOGNITION</span>
                  <h4 className="font-title-lg text-title-lg text-primary mt-1 font-bold">Manipur JJ Act Order (2009)</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Registered by Directorate of Social Welfare, Government of Manipur under Child Care &amp; Protection rules.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-md flex flex-col space-y-4 border border-outline-variant/20">
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container relative">
                  <ImageWithFallback
                    src="/images/08-prestigious-national-award-citation-cert.jpg"
                    alt="National Award Citation (2010)"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center">
                    <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 font-label-md text-label-md font-bold text-primary shadow-sm">
                      National Honor
                    </span>
                  </div>
                </div>
                <div>
                  <span className="font-label-md text-label-md text-secondary font-bold">NATIONAL RECOGNITION</span>
                  <h4 className="font-title-lg text-title-lg text-primary mt-1 font-bold">National Award Citation (2010)</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Honored for courageous rural humanitarian resilience and dedicated support for children in Ukhrul.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-md flex flex-col space-y-4 border border-outline-variant/20">
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container relative">
                  <ImageWithFallback
                    src="/images/09-distinction-certificate-of-appreciation-.jpg"
                    alt="Distinction Certificate (2011)"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center">
                    <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 font-label-md text-label-md font-bold text-primary shadow-sm">
                      Distinction Order
                    </span>
                  </div>
                </div>
                <div>
                  <span className="font-label-md text-label-md text-secondary font-bold">ANNUAL EXCELLENCE</span>
                  <h4 className="font-title-lg text-title-lg text-primary mt-1 font-bold">Distinction Certificate (2011)</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Attested commendation acknowledging transparent operational integrity, safety standards, and school metrics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <CTASection
          title="Partner With Us to Secure Their Tomorrow"
          description="Whether through educational sponsorship, essential nutrition supplies, or prayerful goodwill, your contribution directly empowers the children of Eden Resource Home."
          primaryButtonText="Support Our Children"
          secondaryButtonText="Visit Our Ukhrul Home"
        />
      </div>
    </>
  );
};
