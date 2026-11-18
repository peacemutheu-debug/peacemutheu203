import { FormEvent, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ProjectModal } from './components/ProjectModal';
import { ResilientImage } from './components/ResilientImage';
import { ResumeModal } from './components/ResumeModal';
import {
  BIOGRAPHY_PARAGRAPHS,
  EDUCATION,
  HERO_HIGHLIGHTS,
  PROFILE,
  PROJECTS,
  ProjectCategory,
  ProjectItem,
  SKILL_GROUPS,
} from './data/portfolio';

const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All',
  'Community Systems',
  'Web & Utilities',
  'Campus Initiatives',
];

const MARQUEE_ITEMS = [
  'Problem Solving',
  'Systems Design',
  'Community Impact',
  'University of Embu',
  'Kitui Roots',
  'Travel & Discovery',
  'Student Tech Leadership',
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Contact form state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'error' | 'submitted'>('idle');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PROJECTS;
    return PROJECTS.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

  const handleCopy = async (value: string, fieldKey: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldKey);
      window.setTimeout(() => {
        setCopiedField((prev) => (prev === fieldKey ? null : prev));
      }, 2000);
    } catch {
      setCopiedField(null);
    }
  };

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !messageText.trim()) {
      setFormStatus('error');
      return;
    }

    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${senderName.trim()}`
    );
    const body = encodeURIComponent(
      `Name: ${senderName.trim()}\nEmail: ${senderEmail.trim()}\n\n${messageText.trim()}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setFormStatus('submitted');
  };

  const handleResetForm = () => {
    setSenderName('');
    setSenderEmail('');
    setMessageText('');
    setFormStatus('idle');
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#F8F9FA] text-zinc-950">
      <Navbar />

      <main className="flex-1">
        {/* Hero Split */}
        <section className="max-w-6xl mx-auto px-6 sm:px-8 pt-10 pb-14 lg:pt-14 lg:pb-16">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between py-2">
              <div>
                <p className="text-xs sm:text-sm font-medium text-zinc-500 tracking-normal">
                  {PROFILE.kicker}
                </p>

                <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-[3.35rem] font-semibold tracking-tight leading-[1.08] text-zinc-950 text-balance max-w-2xl">
                  {PROFILE.headline}
                </h1>

                <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-[60ch]">
                  {PROFILE.lead}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                  >
                    <span>Explore Projects</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setResumeOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-zinc-800 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                  >
                    <FileText className="w-4 h-4 text-zinc-600" />
                    <span>View CV Summary</span>
                  </button>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-zinc-200 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-500">
                <span>
                  <strong className="font-semibold text-zinc-800">Career Focus:</strong>{' '}
                  {PROFILE.careerObjective}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-80 sm:h-96 lg:h-full lg:min-h-[460px] rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100">
                <ResilientImage
                  src={PROFILE.portraitImage}
                  alt={PROFILE.portraitAlt}
                  fallbackTitle={PROFILE.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/35 to-transparent p-5 sm:p-6">
                  <p className="text-sm font-medium text-white">
                    {PROFILE.name}
                  </p>
                  <p className="text-xs text-zinc-200 mt-0.5">
                    BSc Information Technology · University of Embu
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width 4-column Highlights Strip below Hero Split */}
          <div className="mt-12 pt-8 border-t border-zinc-200 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {HERO_HIGHLIGHTS.map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950 tabular-nums">
                  {item.value}
                </p>
                <p className="text-sm font-medium text-zinc-800">{item.label}</p>
                <p className="text-xs text-zinc-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Subtle Editorial Marquee Divider */}
        <div
          aria-hidden="true"
          className="border-y border-zinc-200 bg-white py-3.5 overflow-hidden select-none"
        >
          <div className="flex w-max animate-marquee">
            {[0, 1].map((dup) => (
              <div
                key={dup}
                className="flex items-center gap-6 px-3 text-xs font-medium text-zinc-500 whitespace-nowrap"
              >
                {MARQUEE_ITEMS.map((item) => (
                  <span key={`${dup}-${item}`} className="flex items-center gap-6">
                    <span>{item}</span>
                    <span className="text-zinc-300">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Biography & Travel/Leadership Section */}
        <section
          id="biography"
          className="max-w-6xl mx-auto px-6 sm:px-8 py-16 lg:py-24"
        >
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div>
                <p className="text-xs font-medium text-blue-600">Biography</p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 text-balance">
                  From Kitui to Embu, building with purpose.
                </h2>
              </div>

              <div className="rounded-2xl overflow-hidden border border-zinc-200 bg-white">
                <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                  <ResilientImage
                    src={PROFILE.travelImage}
                    alt={PROFILE.travelAlt}
                    fallbackTitle="Traveling across Kenya"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 sm:p-5 border-t border-zinc-200 flex items-center justify-between gap-4 text-xs text-zinc-600">
                  <span>Hobby · Traveling across Kenyan counties</span>
                  <span className="font-mono tabular-nums text-zinc-500">
                    Age {PROFILE.age}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4 text-base text-zinc-700 leading-[1.7] max-w-[68ch]">
                {BIOGRAPHY_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-zinc-200 grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-950">
                    Campus Club Ambition
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-600 leading-relaxed">
                    Eager to take active leadership roles within University of Embu student technology clubs—organizing peer workshops, beginner coding circles, and collaborative hackathons.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-950">
                    Community Projects
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-600 leading-relaxed">
                    Committed to applying practical IT skills toward local community challenges—from water-point status tracking in Kitui to digital literacy mentorship for secondary students.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Showcase */}
        <section
          id="projects"
          className="bg-white border-y border-zinc-200 py-16 lg:py-24"
        >
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200">
              <div className="max-w-2xl">
                <p className="text-xs font-medium text-blue-600">
                  Projects Showcase
                </p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 text-balance">
                  Systems designed around real everyday needs.
                </h2>
                <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
                  Selected prototypes and system concepts exploring community utilities, campus collaboration, and travel logistics. Click any project to inspect the problem statement and design notes.
                </p>
              </div>

              {/* Interactive Segmented Filter Controls */}
              <div
                role="tablist"
                aria-label="Filter projects by category"
                className="inline-flex flex-wrap items-center gap-1 p-1 bg-zinc-100 rounded-xl border border-zinc-200/80 self-start md:self-auto"
              >
                {PROJECT_CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                        isActive
                          ? 'bg-white text-zinc-950 shadow-sm'
                          : 'text-zinc-600 hover:text-zinc-950'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => {
                const isFeatured =
                  project.featured && selectedCategory === 'All';
                return (
                  <article
                    key={project.id}
                    className={`group flex flex-col bg-[#F8F9FA] rounded-2xl border border-zinc-200 overflow-hidden transition-colors duration-150 hover:border-zinc-300 ${
                      isFeatured ? 'md:col-span-2' : ''
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="flex-1 flex flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600"
                    >
                      <div
                        className={`w-full overflow-hidden bg-zinc-200 ${
                          isFeatured ? 'aspect-[16/9]' : 'aspect-[4/3]'
                        }`}
                      >
                        <ResilientImage
                          src={project.image}
                          alt={project.imageAlt}
                          fallbackTitle={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                        />
                      </div>

                      <div className="flex-1 p-6 flex flex-col justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <span>{project.category}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums">
                              {project.year}
                            </span>
                          </div>

                          <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-zinc-950 group-hover:text-blue-600 transition-colors">
                            {project.title}
                          </h3>

                          <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                            {project.summary}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-zinc-200/80 flex items-center justify-between gap-4 text-xs">
                          <span className="text-zinc-500 truncate">
                            {project.tools.slice(0, 3).join(' · ')}
                          </span>
                          <span className="inline-flex items-center gap-1 font-semibold text-blue-600 whitespace-nowrap shrink-0">
                            <span>Case Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Skills & Capabilities */}
        <section
          id="skills"
          className="max-w-6xl mx-auto px-6 sm:px-8 py-16 lg:py-24"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-blue-600">
              Skills & Capabilities
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 text-balance">
              Foundations built for continuous growth.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
              Combining technical computing skills with structured problem-solving and collaborative leadership.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-8 pt-8 border-t border-zinc-200">
            {SKILL_GROUPS.map((group) => (
              <div key={group.index} className="space-y-4">
                <div>
                  <span className="font-mono text-xs text-zinc-400 tabular-nums">
                    {group.index}.
                  </span>
                  <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-zinc-950">
                    {group.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                    {group.description}
                  </p>
                </div>

                <ul className="pt-4 border-t border-zinc-200 space-y-2.5 text-sm text-zinc-800">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center justify-between gap-2 py-0.5"
                    >
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education Timeline */}
        <section
          id="education"
          className="bg-white border-y border-zinc-200 py-16 lg:py-24"
        >
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
              <div className="lg:col-span-4">
                <p className="text-xs font-medium text-blue-600">Education</p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 text-balance">
                  Academic path across Kenya.
                </h2>
                <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                  From primary foundations in Kitui County to pursuing a Bachelor of Science in Information Technology at the University of Embu.
                </p>
              </div>

              <div className="lg:col-span-8 divide-y divide-zinc-200 border-t border-b border-zinc-200">
                {EDUCATION.map((entry) => (
                  <div
                    key={entry.institution}
                    className="py-6 sm:py-7 grid sm:grid-cols-12 gap-3 sm:gap-6 items-start"
                  >
                    <div className="sm:col-span-3">
                      <p className="font-mono text-xs sm:text-sm font-medium text-zinc-500 tabular-nums">
                        {entry.period}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">{entry.location}</p>
                    </div>
                    <div className="sm:col-span-9 space-y-1.5">
                      <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-zinc-950">
                        {entry.institution}
                      </h3>
                      <p className="text-sm font-medium text-blue-600">
                        {entry.qualification}
                      </p>
                      <p className="text-sm text-zinc-600 leading-relaxed pt-1">
                        {entry.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact, Profiles & Referee */}
        <section
          id="contact"
          className="max-w-6xl mx-auto px-6 sm:px-8 py-16 lg:py-24"
        >
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Direct Details, Profiles & Referee */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <p className="text-xs font-medium text-blue-600">
                  Contact & Profiles
                </p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 text-balance">
                  Let’s connect on IT projects and club initiatives.
                </h2>
                <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
                  Open to student tech club collaborations, community IT projects, internships, and mentorship opportunities.
                </p>
              </div>

              {/* Direct Contact Rows */}
              <div className="divide-y divide-zinc-200 border-y border-zinc-200">
                <div className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="w-4 h-4 text-zinc-500 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-zinc-500">Email</p>
                      <a
                        href={`mailto:${PROFILE.email}`}
                        className="text-sm font-medium text-zinc-950 hover:text-blue-600 transition-colors truncate block"
                      >
                        {PROFILE.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE.email, 'email')}
                    aria-label="Copy email address"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <Phone className="w-4 h-4 text-zinc-500 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-zinc-500">Phone</p>
                      <a
                        href={`tel:${PROFILE.phone}`}
                        className="text-sm font-mono font-medium text-zinc-950 hover:text-blue-600 transition-colors tabular-nums"
                      >
                        {PROFILE.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE.phone, 'phone')}
                    aria-label="Copy phone number"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="py-4 flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-zinc-500 shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500">Base</p>
                    <p className="text-sm font-medium text-zinc-950">
                      Kitui &amp; University of Embu, Kenya
                    </p>
                  </div>
                </div>
              </div>

              {/* Professional Profiles */}
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 mb-3">
                  Professional Profiles
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center justify-between gap-3 p-4 bg-white rounded-xl border border-zinc-200 hover:border-zinc-400 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Github className="w-4 h-4 text-zinc-900 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-zinc-950">
                          GitHub
                        </p>
                        <p className="text-xs text-zinc-500 truncate">
                          Code &amp; repositories
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 shrink-0" />
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center justify-between gap-3 p-4 bg-white rounded-xl border border-zinc-200 hover:border-zinc-400 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Linkedin className="w-4 h-4 text-blue-600 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-zinc-950">
                          LinkedIn
                        </p>
                        <p className="text-xs text-zinc-500 truncate">
                          Academic &amp; IT network
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 shrink-0" />
                  </a>
                </div>
              </div>

              {/* Referee Block */}
              <div className="p-5 sm:p-6 bg-white rounded-2xl border border-zinc-200">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-zinc-500">
                      Academic Referee
                    </p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-zinc-950">
                      {PROFILE.referee.name}
                    </h3>
                    <p className="text-sm text-zinc-600 mt-0.5">
                      {PROFILE.referee.role} · {PROFILE.referee.institution}
                    </p>
                    <a
                      href={`mailto:${PROFILE.referee.email}`}
                      className="inline-block mt-2 text-sm font-medium text-blue-600 hover:underline"
                    >
                      {PROFILE.referee.email}
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(PROFILE.referee.email, 'referee-email')
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-[#F8F9FA] hover:bg-zinc-100 border border-zinc-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    {copiedField === 'referee-email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Message Composer */}
            <div className="lg:col-span-6">
              <form
                onSubmit={handleContactSubmit}
                noValidate
                className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-5"
              >
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-zinc-950">
                    Send a Direct Message
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600">
                    Compose an inquiry below to open a pre-filled email draft directly to{' '}
                    <span className="font-medium text-zinc-800">
                      {PROFILE.email}
                    </span>
                    .
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-zinc-700 mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={senderName}
                      onChange={(e) => {
                        setSenderName(e.target.value);
                        if (formStatus !== 'idle') setFormStatus('idle');
                      }}
                      placeholder="e.g., Grace Wanjiku"
                      className="w-full px-3.5 py-2.5 text-sm text-zinc-950 bg-[#F8F9FA] border border-zinc-200 rounded-xl placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-zinc-700 mb-1.5"
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={senderEmail}
                      onChange={(e) => {
                        setSenderEmail(e.target.value);
                        if (formStatus !== 'idle') setFormStatus('idle');
                      }}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 text-sm text-zinc-950 bg-[#F8F9FA] border border-zinc-200 rounded-xl placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-zinc-700 mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={messageText}
                      onChange={(e) => {
                        setMessageText(e.target.value);
                        if (formStatus !== 'idle') setFormStatus('idle');
                      }}
                      placeholder="Share details about a project, University of Embu tech club initiative, or opportunity..."
                      className="w-full px-3.5 py-2.5 text-sm text-zinc-950 bg-[#F8F9FA] border border-zinc-200 rounded-xl placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors resize-y"
                    />
                  </div>
                </div>

                {formStatus === 'error' && (
                  <p
                    role="alert"
                    className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5"
                  >
                    Please fill in your name, email address, and message before continuing.
                  </p>
                )}

                {formStatus === 'submitted' && (
                  <div
                    role="status"
                    className="flex items-center justify-between gap-3 text-xs font-medium text-zinc-800 bg-blue-50 border border-blue-200 rounded-lg px-3.5 py-2.5"
                  >
                    <span>
                      Your email client has been prompted with your message to{' '}
                      {PROFILE.email}.
                    </span>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="text-blue-700 hover:underline whitespace-nowrap shrink-0"
                    >
                      Clear
                    </button>
                  </div>
                )}

                <div className="pt-1 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open Email Draft</span>
                  </button>

                  <span className="text-xs text-zinc-500">
                    Or call{' '}
                    <a
                      href={`tel:${PROFILE.phone}`}
                      className="font-mono text-zinc-700 hover:text-zinc-950 tabular-nums"
                    >
                      {PROFILE.phone}
                    </a>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="no-print border-t border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} {PROFILE.name} · Kitui &amp; Embu, Kenya
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#biography" className="hover:text-zinc-950 transition-colors whitespace-nowrap">
              Biography
            </a>
            <a href="#projects" className="hover:text-zinc-950 transition-colors whitespace-nowrap">
              Projects
            </a>
            <a href="#skills" className="hover:text-zinc-950 transition-colors whitespace-nowrap">
              Skills
            </a>
            <a href="#education" className="hover:text-zinc-950 transition-colors whitespace-nowrap">
              Education
            </a>
            <a href="#contact" className="hover:text-zinc-950 transition-colors whitespace-nowrap">
              Contact
            </a>
          </div>
        </div>
      </footer>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
