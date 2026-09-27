# Eden Resource Home — Official Website

A production-ready, accessible, and responsive website for **Eden Resource Home**, a child welfare and residential care organization located at Tallui Junction, Ukhrul District, Manipur, India (Established 2001).

Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, and **React Router DOM v7**, faithfully implementing the complete design and aesthetics generated in Stitch.

---

## 🌟 Key Features

- **Pixel-Accurate Stitch UI Translation**: Preserves the forest green / warm amber color scheme, typography (`Playfair Display` serif headers + `Plus Jakarta Sans` body), cards, buttons, badges, and layout hierarchy.
- **Complete Route Architecture**:
  - `/` — Homepage with dynamic hero, impact counters, mission & pillars preview, historic story preview, awards archive preview, and gallery preview.
  - `/about` — Origin story, mission, vision, values, 2001–2011 archival journey timeline, and supervisory governance placeholders.
  - `/our-work` — Comprehensive breakdown of the 5 core programs: Education & Learning, Residential Care, Healthcare & Wellbeing, Child Development, and Community & Volunteer Support.
  - `/gallery` — Categorized media browser with interactive fullscreen lightbox (keyboard navigation with `ArrowLeft`, `ArrowRight`, `Escape`, and close controls).
  - `/awards` — Historical press and gazette archive with full document inspector modal (Manipur Government Gazette 2009, National Child Welfare Award 2010 coverage, Distinction Certification 2011, etc.).
  - `/donate` — **Strict Custom Amount Donor Form**: Strictly NO preset donation amount buttons (e.g. ₹500, ₹1000). Contains one custom input field (`₹ [ Enter amount ]`), form validation, and ready-to-wire state without fabricated payment credentials.
  - `/contact` — Interactive contact form, clickable `tel:+918974891082`, `mailto:support@edenresourcehome.org.in`, address details, and submission confirmation feedback.
  - `/privacy-policy` & `/terms` — Comprehensive legal and disclaimer policies.
  - `*` — Custom 404 "Page Not Found" with return to home navigation.
- **Fully Responsive**: Optimized for Mobile (320px–428px), Tablet (768px–1024px), Laptop (1280px), and Desktop (1440px–1920px).
- **Zero Broken Asset URLs**: Over 45 high-resolution local images stored in `/public/images/` and `/public/` ensuring full offline rendering and zero reliance on external image CDNs.
- **Modular Data Architecture**: Content separated into clean TypeScript data files in `src/data/` for future CMS or backend integration.

---

## 📁 Project Structure

```text
Eden Resource Home/
├── public/
│   ├── favicon.svg             # Custom SVG crest logo
│   ├── logo-emblem.png         # High-resolution Eden crest emblem
│   └── images/                 # 45+ local project photos and historical documents
├── src/
│   ├── components/
│   │   ├── awards/
│   │   │   └── DocumentLightbox.tsx # Archival document viewer modal
│   │   ├── common/
│   │   │   ├── Button.tsx           # Reusable styled buttons
│   │   │   ├── Container.tsx        # Responsive layout wrapper
│   │   │   ├── CTASection.tsx       # Reusable bottom call-to-action banner
│   │   │   ├── EdenLogo.tsx         # Vector SVG logo component
│   │   │   ├── EmptyState.tsx       # Graceful empty filter state
│   │   │   ├── ImageWithFallback.tsx# Image loader with skeleton & error handling
│   │   │   ├── LoadingState.tsx     # Loading spinner component
│   │   │   ├── SectionHeading.tsx   # Semantic headers with badges
│   │   │   └── SeoMeta.tsx          # Dynamic document title & meta tags
│   │   ├── forms/
│   │   │   ├── ContactForm.tsx      # Contact form with input validation
│   │   │   └── DonationForm.tsx     # Custom amount donation form
│   │   ├── gallery/
│   │   │   └── GalleryLightbox.tsx  # Fullscreen image viewer
│   │   └── layout/
│   │       ├── Footer.tsx           # Footer with links & non-profit disclosures
│   │       └── Navbar.tsx           # Sticky responsive navigation with mobile drawer
│   ├── data/
│   │   ├── awards.ts                # Historical documents & gazette citations
│   │   ├── gallery.ts               # Categorized media library
│   │   ├── navigation.ts            # Route paths & nav items
│   │   ├── programs.ts              # 5 program pillars & key features
│   │   ├── siteConfig.ts            # Master contact info, location, phone, email
│   │   └── team.ts                  # Founders & supervisory committee
│   ├── pages/
│   │   ├── AboutPage.tsx
│   │   ├── AwardsPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── DonatePage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── OurWorkPage.tsx
│   │   ├── PrivacyPolicyPage.tsx
│   │   └── TermsPage.tsx
│   ├── App.tsx                      # React Router configuration
│   ├── index.css                    # Tailwind directives & typography setup
│   └── main.tsx                     # React root mount
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Production Build & Verification
```bash
npm run build
```
Generates an optimized static build in the `dist/` folder with full TypeScript type checks (`tsc -b && vite build`).

### 4. Preview the Production Build Locally
```bash
npm run preview
```
Serves the `dist/` directory at `http://localhost:4173/`.

---

## 🛡️ Compliance & Integrity Notes

- **No Fabricated Payment Credentials**: As no payment gateway has been provided yet, the `/donate` form collects the donor's custom contribution intent without fake UPI IDs, QR codes, or bank accounts.
- **Strict Custom Donation Amount**: Consistent with organization policy, there are no preset buttons (e.g. ₹100, ₹500, ₹1000). Donors specify their desired amount directly.
- **Archival Document Integrity**: Newspaper scans and Manipur Government Gazette references are presented as photographic historical artifacts without fabricating OCR text or claiming unverified current accreditations.

---

## 📞 Organization Details

- **Organization**: Eden Resource Home
- **Location**: Tallui Junction, Ukhrul District, Manipur, India
- **Phone**: [+91 89748 91082](tel:+918974891082)
- **Email**: [support@edenresourcehome.org.in](mailto:support@edenresourcehome.org.in)
- **Established**: 2001
