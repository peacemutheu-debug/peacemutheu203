import portraitImage from '../assets/images/nasseryan_portrait_clean_1794655051768.jpg';
import waterSystemImage from '../assets/images/kitui_water_system_1794655035631.jpg';
import campusTechImage from '../assets/images/embu_campus_tech_1794655036576.jpg';
import travelJournalImage from '../assets/images/kenya_travel_journal_1794655037261.jpg';

export type ProjectCategory =
  | 'All'
  | 'Community Systems'
  | 'Web & Utilities'
  | 'Campus Initiatives';

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  year: string;
  scope: string;
  summary: string;
  problemStatement: string;
  systemApproach: string;
  highlights: string[];
  tools: string[];
  image: string;
  imageAlt: string;
  featured?: boolean;
}

export interface EducationEntry {
  period: string;
  institution: string;
  qualification: string;
  location: string;
  note: string;
}

export interface SkillGroup {
  index: string;
  title: string;
  description: string;
  items: string[];
}

export const PROFILE = {
  name: 'Nasseryan Mutheu',
  headline: 'Building practical IT systems that make everyday life easier.',
  kicker: 'Kitui & Embu, Kenya · BSc Information Technology',
  lead: 'I am a 19-year-old Kenyan Information Technology undergraduate at the University of Embu from Kitui, driven by thoughtful problem-solving, community-centered software, and campus tech leadership.',
  careerObjective:
    'To become a skilled IT professional who develops useful systems that make people’s lives easier.',
  age: 19,
  nationality: 'Kenyan',
  hometown: 'Kitui, Kenya',
  university: 'University of Embu',
  hobby: 'Traveling',
  phone: '0799358941',
  email: 'nasseryanmutheu@gmail.com',
  portraitImage,
  portraitAlt:
    'Portrait of Nasseryan Mutheu seated at a wooden study table with a laptop and notebook in natural light',
  travelImage: travelJournalImage,
  travelAlt:
    'Scenic Kenyan highlands road and morning hills seen behind a canvas travel backpack and open notebook',
  profiles: [
    {
      label: 'GitHub',
      handle: 'github.com/nasseryanmutheu',
      href: 'https://github.com',
      note: 'Repositories & system prototypes',
    },
    {
      label: 'LinkedIn',
      handle: 'linkedin.com/in/nasseryan-mutheu',
      href: 'https://linkedin.com',
      note: 'Academic & IT leadership network',
    },
    {
      label: 'Email',
      handle: 'nasseryanmutheu@gmail.com',
      href: 'mailto:nasseryanmutheu@gmail.com',
      note: 'Direct academic & project inquiries',
    },
  ],
  referee: {
    name: 'Magdalene Nzioki',
    role: 'Principal',
    institution: 'Mbitini Girls Secondary School',
    email: 'magdalenenzioki@gmail.com',
  },
};

export const HERO_HIGHLIGHTS = [
  {
    value: 'Aug 2025',
    label: 'University of Embu',
    detail: 'BSc Information Technology',
  },
  {
    value: 'Kitui, KE',
    label: 'Hometown & Roots',
    detail: 'Community-driven perspective',
  },
  {
    value: 'Tech Clubs',
    label: 'Campus Leadership',
    detail: 'Student mentorship & outreach',
  },
  {
    value: 'Traveling',
    label: 'Curiosity & Craft',
    detail: 'Exploring people & systems',
  },
];

export const BIOGRAPHY_PARAGRAPHS = [
  'Growing up in Kitui shaped how I think about technology: the best tools are never built for complexity’s sake—they solve real, everyday bottlenecks cleanly and reliably. At 19, entering the Bachelor of Science in Information Technology program at the University of Embu marks the next chapter in turning that conviction into engineering craft.',
  'My career objective is straightforward: to become a skilled IT professional who develops useful systems that make people’s lives easier. Whether organizing information for local communities, streamlining student workflows, or designing clear web interfaces, I focus on systems that feel intuitive to the people who depend on them.',
  'Beyond academics, I love traveling across Kenya—observing how different towns, transit routes, schools, and local enterprises operate. Seeing how people solve problems in new places fuels my passion for technology, and at the University of Embu I am eager to step into leadership roles within student tech clubs and apply IT skills to meaningful community projects.',
];

export const EDUCATION: EducationEntry[] = [
  {
    period: '2025 – Present',
    institution: 'University of Embu',
    qualification: 'Bachelor of Science in Information Technology',
    location: 'Embu, Kenya',
    note: 'Admitted August/September 2025. Focusing on software systems, databases, networking, and active participation in student technology clubs and community outreach.',
  },
  {
    period: '2021 – 2024',
    institution: 'Mbitini Girls Secondary School',
    qualification: 'Kenya Certificate of Secondary Education (KCSE)',
    location: 'Kitui County, Kenya',
    note: 'Completed secondary education with strong analytical grounding in mathematics, sciences, and computer literacy, building discipline and collaborative leadership.',
  },
  {
    period: '2020',
    institution: 'Kamavui Primary School',
    qualification: 'Kenya Certificate of Primary Education (KCPE)',
    location: 'Kitui County, Kenya',
    note: 'Laid the foundational academic curiosity and problem-solving habits that sparked an early interest in technology and public service.',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'kitui-water-point-tracker',
    title: 'Kitui Community Water Point Tracker',
    category: 'Community Systems',
    year: '2025',
    scope: 'System Design · Community Prototype',
    summary:
      'A lightweight status and maintenance reporting interface helping rural Kitui wards log borehole availability, pump uptime, and technician dispatch notes.',
    problemStatement:
      'Families in semi-arid wards often walk long distances without knowing whether a community borehole or solar water kiosk is operational or awaiting pump maintenance.',
    systemApproach:
      'Designed an offline-friendly web directory paired with structured SMS-style status codes so local caretakers can report functional, low-yield, or maintenance states in seconds.',
    highlights: [
      'Ward-by-ward status index with clear text labels for operational, low flow, and under repair states',
      'Maintenance ticket queue tracking caretaker contact logs and repair turnaround dates',
      'Low-bandwidth layout optimized for entry-level smartphones on 3G connections',
    ],
    tools: ['TypeScript', 'React', 'Tailwind CSS', 'Relational Data Modeling'],
    image: waterSystemImage,
    imageAlt:
      'Solar-powered community water station serving local residents in sunlit Kenyan highlands',
    featured: true,
  },
  {
    id: 'embu-tech-club-hub',
    title: 'Embu Student Tech Club Hub',
    category: 'Campus Initiatives',
    year: '2025',
    scope: 'Club Coordination · Web Portal',
    summary:
      'An organized schedule, peer study-group matcher, and project archive crafted to help incoming University of Embu IT students collaborate from week one.',
    problemStatement:
      'First-year computing students often miss club meetups, hackathon prep sessions, and peer tutoring because announcements scatter across informal chat threads.',
    systemApproach:
      'Structured a single-page calendar and track directory separating coding workshops, community outreach sprints, and beginner study circles with clear RSVP flows.',
    highlights: [
      'Weekly session timetable covering web foundations, Python logic, and hardware troubleshooting',
      'Community project board pairing first-year members with senior student mentors',
      'Accessible keyboard navigation and printable semester roadmap view',
    ],
    tools: ['React', 'HTML5', 'CSS3', 'Information Architecture'],
    image: campusTechImage,
    imageAlt:
      'University student working on geometric system diagrams on a laptop beside a study notebook',
    featured: false,
  },
  {
    id: 'kenya-transit-travel-log',
    title: 'Inter-County Travel & Route Notes',
    category: 'Web & Utilities',
    year: '2025',
    scope: 'Personal Utility · Travel Planner',
    summary:
      'A clean travel journal and inter-county route reference connecting Kitui, Nairobi, and Embu—documenting stages, travel windows, and packing checklists.',
    problemStatement:
      'Traveling between home in Kitui and university in Embu involves multiple matatu stages, seasonal road timing, and essential campus transit logistics.',
    systemApproach:
      'Built a structured route-card and trip-log utility combining personal travel notes, realistic stage durations, and reusable packing lists for weekend and semester trips.',
    highlights: [
      'Stage-by-stage corridor notes for Kitui–Thika–Embu and Kitui–Nairobi routes',
      'Interactive checklist state saving essential academic and travel items locally',
      'Clean tabular departure and duration formatting for quick mobile reference',
    ],
    tools: ['JavaScript', 'Local Storage', 'Responsive UI', 'Tabular Data'],
    image: travelJournalImage,
    imageAlt:
      'Canvas travel backpack and open field notebook overlooking a winding Kenyan highland road',
    featured: false,
  },
  {
    id: 'mbitini-peer-bridge',
    title: 'Mbitini-to-University Transition Guide',
    category: 'Community Systems',
    year: '2024',
    scope: 'Peer Mentorship · Resource Index',
    summary:
      'A curated digital handbook supporting secondary school graduates as they navigate university course selection, digital literacy basics, and career planning.',
    problemStatement:
      'Recent KCSE graduates transitioning into technology degrees frequently lack clear guidance on foundational computing tools, email etiquette, and self-paced study resources.',
    systemApproach:
      'Compiled a distraction-free checklist and resource guide organizing free introductory programming materials, scholarship timelines, and campus readiness steps.',
    highlights: [
      'Step-by-step pre-admission tech checklist covering GitHub setup and professional email setup',
      'Readable glossary demystifying IT degree pathways from systems analysis to software engineering',
      'Printable format suitable for school computer labs and alumni mentorship workshops',
    ],
    tools: ['Documentation', 'Semantic HTML', 'UI Design', 'Community Outreach'],
    image: campusTechImage,
    imageAlt:
      'Clean minimalist university study workspace with laptop and handwritten planning notes',
    featured: false,
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    index: '01',
    title: 'Systems & Web Development',
    description:
      'Building clean, accessible web interfaces and structured data models with clarity and reliability.',
    items: [
      'HTML5 & Semantic Markup',
      'CSS3 & Tailwind CSS',
      'JavaScript & TypeScript Foundations',
      'React Component Architecture',
      'Relational Database Concepts (SQL)',
    ],
  },
  {
    index: '02',
    title: 'IT Problem-Solving & Analysis',
    description:
      'Breaking everyday community and organizational challenges into clear requirements and practical workflows.',
    items: [
      'Systems Thinking & Requirement Gathering',
      'Python Scripting Foundations',
      'Git & Version Control Workflows',
      'Technical Documentation & User Guides',
      'Hardware & Desktop Troubleshooting',
    ],
  },
  {
    index: '03',
    title: 'Leadership & Community Impact',
    description:
      'Collaborating across teams, mentoring peers, and applying technology thoughtfully in local settings.',
    items: [
      'Student Tech Club Coordination',
      'Community Project Planning',
      'Peer Mentorship & Knowledge Sharing',
      'Cross-Regional Travel & Adaptability',
      'Clear Written & Spoken Communication',
    ],
  },
];
