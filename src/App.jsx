import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Code2,
  Terminal,
  Database,
  Globe,
  Cpu,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  User,
  FileText,
  Download,
  Sun,
  Moon,
} from "lucide-react";

// --- Data Configuration ---

const PERSONAL_INFO = {
  name: "Bathrinath",
  title: "Software Developer",
  bio: "Hi! 👋 I'm Bathrinath, a 20-year-old engineering student pursuing B.Tech in Information Technology. I am a passionate self-learner, exploring and building projects using various technologies.",
  location: "Chennai, Tamilnadu, India",
  email: "bathrivijay05@gmail.com",
  linkedin: "https://www.linkedin.com/in/bathrivijay05/",
  github: "https://github.com/bathrivijay05",
  leetcode: "https://leetcode.com/u/bathrivijay05/",
};

const EDUCATION = [
  {
    degree: "Bachelor Of Technology In Information Technology",
    institution: "Sri Sairam Institute of Technology",
    period: "2022-2026",
    status: "Pursuing",
  },
];

const SKILLS = [
  { name: "Java", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "Javascript", category: "Language" },
  { name: "C", category: "Language" },
  { name: "HTML", category: "Frontend" },
  { name: "CSS", category: "Frontend" },
  { name: "React.js", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "Flask", category: "Backend" },
  { name: "MySQL", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Pandas", category: "Data Science" },
  { name: "Git", category: "Tool" },
  { name: "Github", category: "Tool" },
  { name: "Postman", category: "Tool" },
  { name: "VSCode", category: "Tool" },
];

const PROJECTS = [
  {
    title: "Personal Portfolio Website",
    description:
      "Design of a beautiful and simple portfolio website that showcases a person's skills, education, and projects using HTML and CSS.",
    date: "March 2024",
    tags: ["HTML", "CSS", "Design"],
    github: "https://github.com/bathrivijay05",
    preview: "https://github.com/bathrivijay05",
    hasPreview: true,
  },
  {
    title: "Weather Dashboard",
    description:
      "Based on user-inputted location, it shows relevant weather information using OpenWeatherMap API.",
    date: "March 2024",
    tags: ["JavaScript", "API", "DOM"],
    github: "https://github.com/bathrivijay05",
    preview: "#",
    hasPreview: false, // API keys usually require backend proxy, disabling preview for safety
  },
  {
    title: "Tic-Tac-Toe Game",
    description:
      "A web application for the Tic-Tac-Toe game where users can play against each other or against the computer.",
    date: "March 2024",
    tags: ["JavaScript", "Game Logic"],
    github: "https://github.com/bathrivijay05",
    preview: "#",
    hasPreview: true,
  },
  {
    title: "Stopwatch Web App",
    description:
      "Responsive stopwatch application implemented using basic HTML, CSS, and JavaScript, including lap time functionality.",
    date: "March 2024",
    tags: ["JavaScript", "Timer"],
    github: "https://github.com/bathrivijay05",
    preview: "#",
    hasPreview: true,
  },
  {
    title: "Responsive Landing Page",
    description:
      "A responsive single-page landing page design that can be used by a Tech Startup.",
    date: "March 2024",
    tags: ["CSS", "Responsive", "UI"],
    github: "https://github.com/bathrivijay05",
    preview: "#",
    hasPreview: true,
  },
  {
    title: "Simple Pizza Billing",
    description:
      "GUI-based pizza billing system using Tkinter allowing users to select options and calculate total cost.",
    date: "May 2023",
    tags: ["Python", "Tkinter", "GUI"],
    github: "https://github.com/bathrivijay05",
    preview: null,
    hasPreview: false, // Desktop app
  },
];

// --- Components ---

const Section = ({ id, title, icon: Icon, children, className = "" }) => (
  <section
    id={id}
    className={`py-20 px-4 md:px-8 max-w-6xl mx-auto ${className}`}
  >
    <div className="flex items-center gap-3 mb-12">
      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-200 transition-colors">
        <Icon size={24} />
      </div>
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 transition-colors">
        {title}
      </h2>
    </div>
    {children}
  </section>
);

const NavLink = ({ href, label, onClick, active }) => (
  <a
    href={href}
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
      active
        ? "text-blue-600 dark:text-blue-400"
        : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
    }`}
  >
    {label}
  </a>
);

const ProjectCard = ({ project }) => {
  // Generate a placeholder image URL based on the title to keep it looking distinct
  const bgImage = `https://placehold.co/600x400/f1f5f9/475569?text=${encodeURIComponent(
    project.title
  )}`;

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative overflow-hidden h-48 bg-slate-100 dark:bg-slate-800">
        <img
          src={bgImage}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-slate-700">
          {project.date}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-grow transition-colors">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium border border-slate-200 dark:border-slate-700 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
          >
            <Github size={16} />
            Code
          </a>
          {project.hasPreview && (
            <a
              href={project.preview}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-900 transition-all"
            >
              <ExternalLink size={16} />
              Preview
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme;
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of the fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  // Handle scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "skills", "projects", "education"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (
          element &&
          element.offsetTop <= scrollPosition &&
          element.offsetTop + element.offsetHeight > scrollPosition
        ) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "home")}
              className="text-xl font-bold text-slate-900 dark:text-white tracking-tight"
            >
              Bathrinath
              <span className="text-blue-600 dark:text-blue-500">.</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  {...link}
                  onClick={(e) => scrollToSection(e, link.href.substring(1))}
                  active={activeSection === link.href.substring(1)}
                />
              ))}

              <div className="ml-4 flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-700">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-slate-900 dark:bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Download size={16} />
                  Resume
                </a>
              </div>
            </div>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 shadow-lg transition-colors">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href.substring(1))}
                  className="block px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 rounded-lg text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                Download Resume
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto min-h-[85vh] flex flex-col justify-center overflow-hidden"
      >
        {/* Decorative Background Blob */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none transition-colors duration-500"></div>
        <div className="absolute top-1/4 left-0 -translate-x-1/4 w-[300px] h-[300px] bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none transition-colors duration-500"></div>

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wide mb-6 border border-blue-100 dark:border-blue-800 transition-colors">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
            Engineering Student & Developer
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.1] transition-colors">
            Hello, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400">
              {PERSONAL_INFO.name}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl font-light transition-colors">
            {PERSONAL_INFO.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-xl hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm hover:shadow-md"
            >
              <Github size={20} />
              GitHub
            </a>
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "projects")}
              className="hidden sm:inline-flex items-center gap-2 px-6 py-3 text-slate-500 dark:text-slate-400 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors ml-2"
            >
              View Projects
              <ChevronDown size={20} className="animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <Section
        id="skills"
        title="My Skills"
        icon={Cpu}
        className="bg-white dark:bg-slate-900 rounded-3xl my-10 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SKILLS.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 hover:border-blue-200 dark:hover:border-blue-900 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 hover:shadow-md transition-all duration-300 group"
            >
              <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm group-hover:scale-110 transition-transform text-blue-600 dark:text-blue-400 border border-slate-100 dark:border-slate-700">
                {/* Dynamically assigning generic icons based on category for visual consistency */}
                {skill.category === "Language" && <Code2 size={20} />}
                {skill.category === "Frontend" && <Globe size={20} />}
                {skill.category === "Backend" && <Terminal size={20} />}
                {skill.category === "Database" && <Database size={20} />}
                {skill.category === "Tool" && <Cpu size={20} />}
                {skill.category === "Data Science" && <BookOpen size={20} />}
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Featured Projects" icon={Terminal}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </Section>

      {/* Education Section */}
      <Section
        id="education"
        title="Education"
        icon={BookOpen}
        className="bg-white dark:bg-slate-900 rounded-3xl my-10 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors"
      >
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-10 pl-8 py-4">
          {EDUCATION.map((edu, index) => (
            <div key={index} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white dark:border-slate-900 bg-blue-600 shadow-md"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {edu.degree}
                </h3>
                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-100 dark:border-blue-800">
                  {edu.period}
                </span>
              </div>

              <p className="text-lg text-slate-600 dark:text-slate-300 font-medium mb-1">
                {edu.institution}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                {edu.status}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800 dark:border-slate-900 py-16 transition-colors">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Bathrinath V</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Engineering student & software developer passionate about
                building innovative solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Socials</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Linkedin size={18} /> LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={PERSONAL_INFO.github}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Github size={18} /> GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={PERSONAL_INFO.leetcode}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Code2 size={18} /> LeetCode
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <div className="space-y-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Mail size={18} />
                  <span>{PERSONAL_INFO.email}</span>
                </a>

                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin size={18} />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 dark:border-slate-900 mt-12 pt-8 text-center text-sm text-slate-500">
            <p>
              © {new Date().getFullYear()} Bathrinath V. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
