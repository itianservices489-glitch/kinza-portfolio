import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Code2,
  Brain,
  Database,
  Globe,
  ChevronDown,
  Menu,
  X,
  Award,
  BookOpen,
  Briefcase,
  User,
  Star,
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
} from "lucide-react";

/* ─────────────── DATA ─────────────── */

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = {
  "Programming Languages": {
    icon: <Code2 className="w-5 h-5" />,
    color: "from-violet-500 to-purple-600",
    items: [
      { name: "Python", level: 88 },
      { name: "Java", level: 82 },
      { name: "C++", level: 78 },
      { name: "OOP & Data Structures", level: 85 },
    ],
  },
  "Web Development": {
    icon: <Globe className="w-5 h-5" />,
    color: "from-cyan-500 to-blue-600",
    items: [
      { name: "React JS", level: 80 },
      { name: "Next JS", level: 75 },
      { name: "Node JS", level: 72 },
      { name: "PostgreSQL", level: 70 },
    ],
  },
  "Machine Learning & AI": {
    icon: <Brain className="w-5 h-5" />,
    color: "from-emerald-500 to-teal-600",
    items: [
      { name: "SVM / KNN", level: 83 },
      { name: "Random Forest", level: 80 },
      { name: "Deep Learning (RNN)", level: 75 },
      { name: "Azure ML Studio", level: 70 },
    ],
  },
  "Databases & Tools": {
    icon: <Database className="w-5 h-5" />,
    color: "from-orange-500 to-amber-600",
    items: [
      { name: "PostgreSQL", level: 72 },
      { name: "Git & GitHub", level: 80 },
      { name: "VS Code / IntelliJ", level: 88 },
      { name: "Unity (C#)", level: 68 },
    ],
  },
};

const SOFT_SKILLS = [
  "Problem-Solving",
  "Team Collaboration",
  "Leadership & Initiative",
  "Effective Communication",
  "Adaptability",
  "Time Management",
  "Client Relations",
  "Critical Thinking",
];

const PROJECTS = [
  {
    title: "Ink Identifier",
    category: "Machine Learning",
    year: "2024",
    org: "Organix-IT",
    description:
      "A deep learning system that identifies the writer of a document and measures similarity between two writing samples using SVM and RNN algorithms.",
    tech: ["Python", "SVM", "RNN", "Deep Learning", "NLP"],
    icon: "🖊️",
    color: "from-violet-600 to-purple-700",
    highlights: [
      "Trained models on handwriting datasets",
      "Achieved high accuracy in writer identification",
      "Similarity scoring between two documents",
    ],
  },
  {
    title: "Infinite Runner Game",
    category: "Game Development",
    year: "2023",
    org: "IT-DEP",
    description:
      "A Unity-based 2D infinite runner game where the player collects coins while dodging obstacles, featuring progressive difficulty scaling.",
    tech: ["C#", "Unity", "Game Physics", "2D Animation"],
    icon: "🎮",
    color: "from-cyan-600 to-blue-700",
    highlights: [
      "Implemented procedural level generation",
      "Designed coin & obstacle systems",
      "Smooth physics and animation pipeline",
    ],
  },
  {
    title: "Library Management System",
    category: "Software Engineering",
    year: "2024",
    org: "IT-DEP",
    description:
      "A full-featured library management application built with Java OOP principles for efficient book cataloguing, borrowing, and returns.",
    tech: ["Java", "OOP", "MySQL", "JDBC", "Swing UI"],
    icon: "📚",
    color: "from-emerald-600 to-teal-700",
    highlights: [
      "CRUD operations for books & members",
      "Borrow / return tracking system",
      "Reports and fine calculation module",
    ],
  },
  {
    title: "Car Acceptability Classifier",
    category: "Machine Learning",
    year: "2024",
    org: "IT-DEP",
    description:
      "Implemented and compared Random Forest, SVM, and Decision Tree algorithms to classify car acceptability based on various attributes.",
    tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
    icon: "🚗",
    color: "from-orange-600 to-amber-700",
    highlights: [
      "Comparative model analysis",
      "Feature importance visualisation",
      "Cross-validation & accuracy benchmarking",
    ],
  },
  {
    title: "Student Grade Portal",
    category: "Web Development",
    year: "2024",
    org: "Personal Project",
    description:
      "A full-stack web portal for managing student grades, attendance, and course materials, built with React and Node.js.",
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    icon: "🎓",
    color: "from-rose-600 to-pink-700",
    highlights: [
      "Role-based access (admin / teacher / student)",
      "Real-time grade updates",
      "Attendance analytics dashboard",
    ],
  },
  {
    title: "Text-Based Banking System",
    category: "Software Engineering",
    year: "2023",
    org: "Coursera Project",
    description:
      "A console-based banking system in Java featuring account creation, deposit/withdrawal, transfers, and transaction history.",
    tech: ["Java", "OOP", "File I/O", "Data Structures"],
    icon: "🏦",
    color: "from-indigo-600 to-blue-700",
    highlights: [
      "Secure PIN authentication",
      "Persistent data via file storage",
      "Multiple account type support",
    ],
  },
  {
    title: "Sentiment Analysis API",
    category: "Machine Learning",
    year: "2025",
    org: "Personal Project",
    description:
      "A REST API that performs real-time sentiment analysis on social media text using NLP techniques and a fine-tuned classifier.",
    tech: ["Python", "Flask", "NLTK", "scikit-learn", "REST API"],
    icon: "💬",
    color: "from-teal-600 to-emerald-700",
    highlights: [
      "Positive / Negative / Neutral classification",
      "Batch processing endpoint",
      "JSON REST interface with Swagger docs",
    ],
  },
  {
    title: "E-Learning Platform",
    category: "Web Development",
    year: "2025",
    org: "Personal Project",
    description:
      "A responsive e-learning platform with course management, video streaming integration, quiz engine, and progress tracking.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    icon: "🌐",
    color: "from-purple-600 to-violet-700",
    highlights: [
      "Course creation & management",
      "Interactive quiz engine",
      "Progress analytics for instructors",
    ],
  },
];

const EXPERIENCE = [
  {
    role: "Coordinator",
    company: "HCCS Educational System",
    period: "2025 – Present",
    type: "Administrative & Leadership",
    icon: "🏫",
    color: "border-violet-500",
    badge: "bg-violet-100 text-violet-700",
    duties: [
      "Managed academic and administrative activities across multiple departments",
      "Coordinated events, managed faculty schedules, and ensured compliance with curriculum standards",
      "Acted as a liaison between students, teachers, and management for smooth communication",
      "Maintained performance records and helped improve educational outcomes",
    ],
  },
  {
    role: "Computer Teacher",
    company: "Mehr Ali Public School System",
    period: "2023 – 2024",
    type: "Teaching",
    icon: "👩‍🏫",
    color: "border-cyan-500",
    badge: "bg-cyan-100 text-cyan-700",
    duties: [
      "Delivered computer science curriculum to secondary school students",
      "Designed engaging lesson plans covering programming fundamentals and MS Office",
      "Six years of cumulative teaching experience at Bright Tuition Centre",
      "Mentored students in project-based learning activities",
    ],
  },
  {
    role: "ML Research Intern",
    company: "Organix-IT",
    period: "2024",
    type: "Research & Development",
    icon: "🔬",
    color: "border-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
    duties: [
      "Developed the Ink Identifier system using SVM and RNN algorithms",
      "Collected and preprocessed handwriting datasets for model training",
      "Collaborated with senior engineers to optimise model accuracy",
      "Documented research findings and prepared technical reports",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Bachelors in Information Technology",
    institution: "Quaid-i-Azam University, Islamabad",
    period: "2020 – 2024",
    grade: "Graduate",
    icon: "🎓",
    color: "from-violet-600 to-purple-700",
  },
  {
    degree: "Intermediate (Pre-Engineering)",
    institution: "Harvard College of Commerce",
    period: "2018 – 2020",
    grade: "86% Marks",
    icon: "📘",
    color: "from-cyan-600 to-blue-700",
  },
  {
    degree: "Matriculation (Science)",
    institution: "Harvard College of Commerce",
    period: "2016 – 2018",
    grade: "96% Marks",
    icon: "📗",
    color: "from-emerald-600 to-teal-700",
  },
];

const CERTIFICATIONS = [
  {
    title: "Building a Text-Based Bank in Java",
    issuer: "Coursera",
    icon: "☕",
    color: "bg-amber-50 border-amber-200",
    badge: "text-amber-700 bg-amber-100",
  },
  {
    title: "Create Your First Python Program",
    issuer: "UST / Coursera",
    icon: "🐍",
    color: "bg-blue-50 border-blue-200",
    badge: "text-blue-700 bg-blue-100",
  },
  {
    title: "Machine Learning Pipelines with Azure ML Studio",
    issuer: "Coursera",
    icon: "☁️",
    color: "bg-indigo-50 border-indigo-200",
    badge: "text-indigo-700 bg-indigo-100",
  },
  {
    title: "Web Development Fundamentals",
    issuer: "IBM / Coursera",
    icon: "🌐",
    color: "bg-emerald-50 border-emerald-200",
    badge: "text-emerald-700 bg-emerald-100",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco NetAcad",
    icon: "🛡️",
    color: "bg-rose-50 border-rose-200",
    badge: "text-rose-700 bg-rose-100",
  },
  {
    title: "Data Analysis with Python",
    issuer: "Coursera",
    icon: "📊",
    color: "bg-violet-50 border-violet-200",
    badge: "text-violet-700 bg-violet-100",
  },
];

/* ─────────────── COMPONENTS ─────────────── */

function AnimatedCounter({ value, duration = 1500 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(value / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= value) { setCount(value); clearInterval(timer); }
            else setCount(start);
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{count}</span>;
}

function SkillBar({ name, level }: { name: string; level: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={barRef} className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-slate-700">{name}</span>
        <span className="text-sm text-slate-500">{level}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: animated ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

/* ─────────────── MAIN APP ─────────────── */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = NAV_LINKS.map((n) => n.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-inter text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#about" onClick={() => scrollTo("#about")} className="text-xl font-bold bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
            KM<span className="text-slate-400">.</span>
          </a>
          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((n) => (
              <li key={n.href}>
                <button
                  onClick={() => scrollTo(n.href)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === n.href.slice(1) ? "bg-violet-100 text-violet-700" : "text-slate-600 hover:text-violet-600 hover:bg-slate-100"}`}
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
          <a href="mailto:itianservices4@gmail.com" className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-violet-200 transition-all">
            <Mail className="w-4 h-4" /> Hire Me
          </a>
          {/* Mobile */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-1 shadow-lg">
            {NAV_LINKS.map((n) => (
              <button key={n.href} onClick={() => scrollTo(n.href)} className="block w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-violet-600">
                {n.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-violet-200 mb-6 border border-white/10">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> Available for opportunities
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-2">
              Kinza
              <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Mushtaq</span>
            </h1>
            <p className="text-xl text-violet-200 font-medium mb-4">Multidisciplinary Technology Expert</p>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg">
              Driven IT graduate from Quaid-i-Azam University with a passion for Machine Learning, Web Development, and building impactful software solutions.
            </p>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Projects", value: 8 },
                { label: "Certifications", value: 6 },
                { label: "GPA Score", value: 96, suffix: "%" },
              ].map((s) => (
                <div key={s.label} className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-white">
                    <AnimatedCounter value={s.value} />{s.suffix || "+"}
                  </div>
                  <div className="text-xs text-violet-200 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <button onClick={() => scrollTo("#projects")} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-violet-500/30 transition-all hover:-translate-y-0.5">
                View My Work <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => scrollTo("#contact")} className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-medium hover:bg-white/20 transition-all">
                <Mail className="w-4 h-4" /> Contact Me
              </button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl shadow-violet-900/50">
                <img src="/images/profile.jpg" alt="Kinza Mushtaq" className="w-full h-full object-cover" />
              </div>
              {/* Floating badges */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-2 flex items-center gap-2">
                <Brain className="w-5 h-5 text-violet-600" />
                <span className="text-sm font-semibold text-slate-800">ML Developer</span>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl px-4 py-2 flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-600" />
                <span className="text-sm font-semibold text-slate-800">Web Dev</span>
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-3 border-2 border-violet-400/30 rounded-3xl -z-10" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs">Scroll Down</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* ── CONTACT STRIP ── */}
      <section className="bg-white border-b border-slate-100 py-6">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-6 md:gap-12">
          {[
            { icon: <Phone className="w-4 h-4 text-violet-600" />, label: "+92 333 278 0073", href: "tel:+923332780073" },
            { icon: <Mail className="w-4 h-4 text-violet-600" />, label: "itianservices4@gmail.com", href: "mailto:itianservices4@gmail.com" },
            { icon: <MapPin className="w-4 h-4 text-violet-600" />, label: "Islamabad, Pakistan", href: "#" },
          ].map((c) => (
            <a key={c.label} href={c.href} className="flex items-center gap-2 text-sm text-slate-600 hover:text-violet-600 transition-colors">
              {c.icon} {c.label}
            </a>
          ))}
        </div>
      </section>

      {/* ── ABOUT ME ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader icon={<User className="w-6 h-6" />} title="About Me" subtitle="My Story" />
          <div className="grid md:grid-cols-5 gap-12 items-center mt-12">
            <div className="md:col-span-3 space-y-4 text-slate-600 leading-relaxed">
              <p className="text-lg">
                I'm a <span className="font-semibold text-violet-700">Multidisciplinary Technology Expert</span> and IT graduate from Quaid-i-Azam University, Islamabad. I combine strong technical skills with exceptional communication and leadership abilities.
              </p>
              <p>
                My expertise spans Machine Learning, Full-Stack Web Development, and Software Engineering. I've worked on projects ranging from deep learning-powered handwriting analysis to Unity game development and full-stack web applications.
              </p>
              <p>
                Beyond development, I have extensive teaching and coordination experience, enabling me to bridge the gap between technical teams and stakeholders effectively.
              </p>
              <p>
                I'm committed to continuous learning and excellence, always seeking to bring real value to dynamic workplaces while pursuing growth and innovation.
              </p>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              {[
                { icon: <Code2 />, label: "Clean Code", color: "bg-violet-50 text-violet-600 border-violet-100" },
                { icon: <Brain />, label: "AI & ML", color: "bg-cyan-50 text-cyan-600 border-cyan-100" },
                { icon: <Globe />, label: "Web Dev", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
                { icon: <Layers />, label: "Full Stack", color: "bg-orange-50 text-orange-600 border-orange-100" },
                { icon: <Terminal />, label: "DSA", color: "bg-rose-50 text-rose-600 border-rose-100" },
                { icon: <Cpu />, label: "Systems", color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
              ].map((t) => (
                <div key={t.label} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border ${t.color} aspect-square`}>
                  <div className="w-8 h-8">{t.icon}</div>
                  <span className="text-xs font-semibold">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader icon={<Star className="w-6 h-6" />} title="Skills & Expertise" subtitle="What I Bring" />
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {Object.entries(SKILLS).map(([cat, data]) => (
              <div key={cat} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${data.color} text-white`}>{data.icon}</div>
                  <h3 className="font-semibold text-slate-800">{cat}</h3>
                </div>
                {data.items.map((s) => <SkillBar key={s.name} name={s.name} level={s.level} />)}
              </div>
            ))}
          </div>

          {/* Soft Skills */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <span className="text-lg">🤝</span> Soft Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {SOFT_SKILLS.map((s) => (
                <span key={s} className="px-4 py-2 bg-gradient-to-r from-violet-50 to-cyan-50 border border-violet-100 rounded-full text-sm font-medium text-slate-700">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader icon={<Briefcase className="w-6 h-6" />} title="Professional Experience" subtitle="Career Journey" />
          <div className="mt-12 space-y-6">
            {EXPERIENCE.map((e, i) => (
              <div key={i} className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${e.color} border border-slate-100 hover:shadow-md transition-shadow`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl">{e.icon}</span>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">{e.role}</h3>
                        <p className="text-violet-600 font-medium">{e.company}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm text-slate-500 font-medium">{e.period}</span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${e.badge}`}>{e.type}</span>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {e.duties.map((d, di) => (
                    <li key={di} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader icon={<Code2 className="w-6 h-6" />} title="Projects" subtitle="My Work" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {PROJECTS.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                {/* Card Header */}
                <div className={`bg-gradient-to-br ${p.color} p-6 text-white`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{p.icon}</span>
                    <span className="text-xs px-2 py-1 bg-white/20 rounded-full">{p.year}</span>
                  </div>
                  <h3 className="font-bold text-lg leading-tight">{p.title}</h3>
                  <p className="text-white/70 text-xs mt-1">{p.org}</p>
                </div>
                {/* Card Body */}
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-violet-500 mb-2">{p.category}</span>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{p.description}</p>
                  {/* Highlights */}
                  <ul className="space-y-1 mb-4 flex-1">
                    {p.highlights.map((h, hi) => (
                      <li key={hi} className="flex items-start gap-2 text-xs text-slate-500">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" /> {h}
                      </li>
                    ))}
                  </ul>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-mono">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader icon={<BookOpen className="w-6 h-6" />} title="Education" subtitle="Academic Background" />
          <div className="mt-12 space-y-4">
            {EDUCATION.map((e, i) => (
              <div key={i} className="flex gap-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${e.color} flex items-center justify-center text-xl`}>
                  {e.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800">{e.degree}</h3>
                  <p className="text-violet-600 font-medium text-sm">{e.institution}</p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="text-xs text-slate-500">{e.period}</span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{e.grade}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader icon={<Award className="w-6 h-6" />} title="Certifications" subtitle="Continuous Learning" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {CERTIFICATIONS.map((c, i) => (
              <div key={i} className={`rounded-xl p-5 border ${c.color} hover:shadow-md transition-shadow flex items-start gap-4`}>
                <span className="text-2xl flex-shrink-0">{c.icon}</span>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm leading-snug">{c.title}</h3>
                  <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}>{c.issuer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-violet-500 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm text-violet-200 mb-6">
            <Mail className="w-4 h-4" /> Let's Connect
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Work Together?</h2>
          <p className="text-slate-300 text-lg mb-10 leading-relaxed">
            I'm open to full-time roles, freelance projects, and research collaborations in ML, Web Development, and Software Engineering.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+92 333 278 0073", href: "tel:+923332780073" },
              { icon: <Mail className="w-5 h-5" />, label: "Email", value: "itianservices4@gmail.com", href: "mailto:itianservices4@gmail.com" },
              { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "Islamabad, Pakistan", href: "#" },
            ].map((c) => (
              <a key={c.label} href={c.href} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/20 transition-all group">
                <div className="flex justify-center mb-2 text-violet-300 group-hover:text-white">{c.icon}</div>
                <div className="text-xs text-violet-300 mb-1">{c.label}</div>
                <div className="text-white text-sm font-medium">{c.value}</div>
              </a>
            ))}
          </div>
          <a href="mailto:itianservices4@gmail.com" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-violet-500/30 transition-all hover:-translate-y-1">
            <Mail className="w-5 h-5" /> Send Me an Email
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} <span className="text-white font-semibold">Kinza Mushtaq</span>. All rights reserved.</p>
          <p className="text-xs text-slate-500">Multidisciplinary Technology Expert · Islamabad, Pakistan</p>
        </div>
      </footer>
    </div>
  );
}

/* ─────────────── SECTION HEADER ─────────────── */
function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 border border-violet-100 rounded-full text-sm font-medium text-violet-600 mb-3">
        {icon} {subtitle}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
        {title}
      </h2>
      <div className="mt-3 flex justify-center gap-1">
        <div className="w-8 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full" />
        <div className="w-3 h-1 bg-violet-200 rounded-full" />
      </div>
    </div>
  );
}
