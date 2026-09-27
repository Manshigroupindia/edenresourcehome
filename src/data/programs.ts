export interface Program {
  id: string;
  pillarNumber: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: string;
  image: string;
  imageAlt: string;
  shortDescription: string;
  fullDescription: string;
  highlights: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  bulletSummary: string;
  ctaText?: string;
  ctaLink?: string;
}

export const programsData: Program[] = [
  {
    id: "education-and-learning",
    pillarNumber: "01",
    title: "Education & Learning",
    subtitle: "Academic Literacy & Computer Confidence",
    tag: "Schooling • Books • Academic Mentorship",
    icon: "school",
    image: "/images/41-vibrant-group-of-young-manipuri-school-c.jpg",
    imageAlt: "Vibrant group of young Manipuri school children in neat uniforms sitting together at wooden desks",
    shortDescription: "Enabling continuous formal education, provision of school supplies, uniforms, academic coaching, and scholarships to unlock every child's full scholastic capacity.",
    fullDescription: "Education is the ultimate equalizer and sovereign path toward generational transformation. We ensure every resident receives formal schooling at reputable local schools alongside dedicated evening remedial tutoring and modern computer literacy classes.",
    highlights: [
      {
        title: "Formal School Enrollment",
        description: "Tuition coverage, institutional registrations, and consistent coordination with school educators."
      },
      {
        title: "Study Materials & Uniforms",
        description: "Complete academic supplies, winter apparel, textbooks, and daily stationery provisions."
      },
      {
        title: "Evening Mentorship Hours",
        description: "Supervised study periods with resident educators addressing STEM and language challenges."
      },
      {
        title: "Computer Literacy",
        description: "Fundamental digital literacy, typing practice, and guided exploratory learning sessions."
      }
    ],
    bulletSummary: "Uniforms, notebooks, bags, stationery & tuition provided",
    ctaText: "Support Education",
    ctaLink: "/donate"
  },
  {
    id: "residential-care",
    pillarNumber: "02",
    title: "Residential Care",
    subtitle: "Dignity, Warmth & Protected Hill Shelter",
    tag: "Secure Living • Balanced Meals • Daily Guidance",
    icon: "cottage",
    image: "/images/42-eden-resource-home-campus-two-story-resi.jpg",
    imageAlt: "Eden Resource Home campus residential building surrounded by lush pine trees and flowers in Ukhrul Manipur",
    shortDescription: "Safe, secure, and warm dormitory accommodations where children grow up in an atmosphere of mutual respect, fraternal warmth, and dedicated round-the-clock wardens.",
    fullDescription: "Eden Resource Home is not merely a facility; it is a warm, secure family refuge in the tranquil hill station of Ukhrul. We provide comfortable, well-ventilated dormitories, balanced wholesome meals, winter woolens, and dedicated house-parents who offer continuous emotional warmth.",
    highlights: [
      {
        title: "Secure Hillside Dormitories",
        description: "Segregated, well-insulated living spaces with individual bedding, personal storage lockers, and quiet study nooks."
      },
      {
        title: "Nutritious Fresh Daily Meals",
        description: "Locally sourced grains, seasonal vegetables, pulses, and nourishing hot soups prepared clean in our community kitchen."
      },
      {
        title: "Parental Supervision & Emotional Safety",
        description: "Round-the-clock wardens and empathetic caregivers ensuring emotional stability, mutual respect, and family values."
      }
    ],
    bulletSummary: "Safe shelter, 3 warm meals daily & 24/7 adult supervision",
    ctaText: "Sponsor Daily Meals",
    ctaLink: "/donate"
  },
  {
    id: "healthcare-and-wellbeing",
    pillarNumber: "03",
    title: "Healthcare & Wellbeing",
    subtitle: "Preventive Care & Wholesome Growth",
    tag: "Medical Screenings • Hygiene • Nutrition",
    icon: "medical_services",
    image: "/images/43-a-caring-female-doctor-conducting-a-rout.jpg",
    imageAlt: "A caring doctor conducting a routine gentle health checkup for a child in a clean clinic setting",
    shortDescription: "Regular pediatric consultations, immunization oversight, personal hygiene training, balanced nutritional meal programs, and prompt medical treatment.",
    fullDescription: "Good health is the bedrock of vibrant childhood exploration. In collaboration with local medical volunteers and district health workers, we maintain active preventive health protocols, regular general wellness checkups, and routine dental screening.",
    highlights: [
      {
        title: "Periodic Health & Vision Check-ups",
        description: "Routine developmental assessments, seasonal vaccinations, eye screenings, and basic dental hygiene consultations."
      },
      {
        title: "Hygiene & Clean Habit Formation",
        description: "Structured education on personal cleanliness, sanitary sanitation practices, hand hygiene, and disease prevention."
      },
      {
        title: "Emotional & Mental Wellbeing",
        description: "Gentle peer circles, therapeutic counseling access, and a comforting environment free of punitive stress."
      }
    ],
    bulletSummary: "Regular doctor visits, nutritional diets & seasonal immunization",
    ctaText: "Support Child Healthcare",
    ctaLink: "/donate"
  },
  {
    id: "child-development",
    pillarNumber: "04",
    title: "Child Development",
    subtitle: "Cultural Heritage, Sports & Character Building",
    tag: "Sports • Cultural Heritage • Life Skills",
    icon: "sports_soccer",
    image: "/images/44-happy-young-boys-and-girls-in-ukhrul-pla.jpg",
    imageAlt: "Happy young boys and girls in Ukhrul playing football on a green grass field with pine trees and blue hill slopes",
    shortDescription: "Encouraging physical fitness through football, athletics, folk dances, vocal music, creative arts, and foundational life skills to build resilient characters.",
    fullDescription: "Every child has latent artistic talents and physical energy that deserve joyful expression. We preserve Tangkhul and Manipuri indigenous cultural traditions alongside physical sports, life skills, and speech training.",
    highlights: [
      {
        title: "Folk Music & Dance",
        description: "Preserving regional heritage through traditional songs, drumming, and indigenous choreography."
      },
      {
        title: "Football & Athletics",
        description: "Daily outdoor sports on the Ukhrul fields instilling teamwork, discipline, and stamina."
      },
      {
        title: "Public Speaking & Drama",
        description: "Debates, elocution, drama, and confidence-building workshops for future leadership."
      },
      {
        title: "Life Skills Coaching",
        description: "Financial literacy basics, teamwork, problem-solving, and conflict resolution."
      }
    ],
    bulletSummary: "Tangkhul folk arts, football, music & public speaking coaching",
    ctaText: "Support Youth Sports",
    ctaLink: "/donate"
  },
  {
    id: "community-and-volunteer",
    pillarNumber: "05",
    title: "Community & Volunteer Support",
    subtitle: "Interconnected Village Safety Nets",
    tag: "Local Outreach • Volunteer Tutoring • Civic Partnerships",
    icon: "diversity_1",
    image: "/images/25-volunteer-teachers-collaborating-with-lo.jpg",
    imageAlt: "Volunteer teachers collaborating with local caretakers and students over art craft materials",
    shortDescription: "Deeply integrated with the local community in Manipur, Eden Resource Home coordinates with local mentors, volunteer educators, medical practitioners, and well-wishers.",
    fullDescription: "Eden Resource Home functions as a shared community trust. We foster deep ties with Ukhrul village councils, visiting professionals, college mentors, and transparent global benefactors.",
    highlights: [
      {
        title: "Volunteer Educator Program",
        description: "Local and visiting scholars who offer guest tutoring, vocational mentorship, and arts coaching."
      },
      {
        title: "Village & Tribal Elder Liaison",
        description: "Collaborative family identification ensuring our admission process serves the most vulnerable children."
      },
      {
        title: "Benevolent Donor Stewardship",
        description: "100% transparent audits, annual reports, and direct letter correspondence with child sponsors."
      }
    ],
    bulletSummary: "Local mentors, visiting scholars & transparent community stewardship",
    ctaText: "Volunteer With Us",
    ctaLink: "/contact"
  }
];
