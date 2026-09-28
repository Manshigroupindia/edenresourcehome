export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  cloudinaryPublicId?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export const DEFAULT_TEAM_MEMBERS: Array<Omit<TeamMember, 'id'>> = [
  {
    name: "Academic Supervisor",
    designation: "Education & Tuition Head",
    role: "ACADEMIC SUPERVISOR",
    bio: "Overseeing schooling enrollment, evening study tutoring, textbook provisions, and cognitive skill mentorship.",
    imageUrl: "/images/04-professional-caring-female-education-sup.jpg",
    cloudinaryPublicId: "",
    displayOrder: 1,
    isActive: true,
  },
  {
    name: "Campus Warden",
    designation: "Residential Life & Wellbeing",
    role: "CAMPUS WARDEN",
    bio: "Ensuring comfortable dormitories, punctual balanced meals, hygienic amenities, and round-the-clock physical security.",
    imageUrl: "/images/05-dedicated-residential-warden-in-traditio.jpg",
    cloudinaryPublicId: "",
    displayOrder: 2,
    isActive: true,
  },
  {
    name: "Health Coordinator",
    designation: "Medical & Nutrition Custodian",
    role: "HEALTH COORDINATOR",
    bio: "Managing seasonal immunizations, health assessments, emergency care liaison with district hospitals, and wholesome dietary regimens.",
    imageUrl: "/images/06-compassionate-community-health-nurse-con.jpg",
    cloudinaryPublicId: "",
    displayOrder: 3,
    isActive: true,
  },
];
