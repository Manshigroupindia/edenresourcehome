export interface TeamMember {
  id: string;
  role: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export const caregiverTeam: TeamMember[] = [
  {
    id: "academic-supervisor",
    role: "ACADEMIC SUPERVISOR",
    title: "Education & Tuition Head",
    description: "Overseeing schooling enrollment, evening study tutoring, textbook provisions, and cognitive skill mentorship.",
    image: "/images/04-professional-caring-female-education-sup.jpg",
    alt: "Professional caring female education supervisor in Manipur interacting with academic study materials"
  },
  {
    id: "campus-warden",
    role: "CAMPUS WARDEN",
    title: "Residential Life & Wellbeing",
    description: "Ensuring comfortable dormitories, punctual balanced meals, hygienic amenities, and round-the-clock physical security.",
    image: "/images/05-dedicated-residential-warden-in-traditio.jpg",
    alt: "Dedicated residential warden coordinating dining and dormitory hygiene routines for children in Manipur"
  },
  {
    id: "health-coordinator",
    role: "HEALTH COORDINATOR",
    title: "Medical & Nutrition Custodian",
    description: "Managing seasonal immunizations, health assessments, emergency care liaison with district hospitals, and wholesome dietary regimens.",
    image: "/images/06-compassionate-community-health-nurse-con.jpg",
    alt: "Compassionate community health nurse conducting a gentle health checkup for a child in Ukhrul clinic"
  }
];
