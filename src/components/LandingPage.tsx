import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANIES_DATA } from '../data/companies';
import { CareerGoal, CompanyProfile } from '../types';
import { CompanyDirectory } from './CompanyDirectory';
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Brain,
  Code2,
  Database,
  Lock,
  Layers,
  Cloud,
  Cpu,
  Menu,
  X,
  Target,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const {
    setActiveTab,
    setIsCustomizingProfile,
    updateUserProfile,
    setTargetCompany,
    setIsAuthModalOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGraphNode, setActiveGraphNode] = useState<string>('dsa');

  // Career path definitions for Section A
  const careerPaths: {
    title: string;
    role: CareerGoal;
    description: string;
    icon: React.ReactNode;
    keySkills: string[];
  }[] = [
    {
      title: 'Artificial Intelligence & Machine Learning',
      role: 'AI/ML Engineer',
      description: 'Model training, neural networks, PyTorch, and ML system architectures.',
      icon: <Brain className="h-5 w-5 text-purple-400" />,
      keySkills: ['Python', 'NumPy/Pandas', 'Deep Learning', 'PyTorch'],
    },
    {
      title: 'Software Engineering',
      role: 'Software Engineer',
      description: 'Algorithmic efficiency, clean object-oriented design, and scalable systems.',
      icon: <Code2 className="h-5 w-5 text-purple-400" />,
      keySkills: ['DSA', 'System Design', 'OOP', 'C++/Java/Python'],
    },
    {
      title: 'Data Science',
      role: 'Data Scientist',
      description: 'Statistical inference, exploratory data analysis, and predictive models.',
      icon: <Database className="h-5 w-5 text-purple-400" />,
      keySkills: ['SQL', 'Probability/Stats', 'Scikit-Learn', 'Tableau'],
    },
    {
      title: 'Cybersecurity',
      role: 'Cybersecurity Analyst or Engineer',
      description: 'Threat modeling, network forensics, vulnerability analysis, and cryptography.',
      icon: <Lock className="h-5 w-5 text-purple-400" />,
      keySkills: ['Network Security', 'Cryptography', 'Linux', 'Ethical Hacking'],
    },
    {
      title: 'Full-Stack Development',
      role: 'Full-Stack Developer',
      description: 'Modern frontend interfaces, reactive backends, APIs, and persistent databases.',
      icon: <Layers className="h-5 w-5 text-purple-400" />,
      keySkills: ['React', 'Node.js', 'PostgreSQL', 'REST/GraphQL'],
    },
    {
      title: 'Cloud & DevOps',
      role: 'Cloud Engineer',
      description: 'Infrastructure as code, CI/CD pipelines, container orchestration, and AWS/Azure.',
      icon: <Cloud className="h-5 w-5 text-purple-400" />,
      keySkills: ['Docker/K8s', 'Terraform', 'CI/CD', 'AWS/Azure'],
    },
  ];

  // Featured target companies for Section B
  const featuredCompanyIds = ['google', 'microsoft', 'amazon', 'apple', 'nvidia', 'adobe', 'tcs', 'infosys', 'wipro'];
  const featuredCompanies: CompanyProfile[] = featuredCompanyIds
    .map((id) => COMPANIES_DATA.find((c) => c.id === id))
    .filter((c): c is CompanyProfile => c !== undefined);

  const handleSelectCareer = (role: CareerGoal) => {
    updateUserProfile({ careerGoal: role });
    setActiveTab('roadmap');
  };

  const handleSelectCompany = (companyId: string) => {
    setTargetCompany(companyId);
    setActiveTab('dashboard');
  };

  // Connected Skill Graph Nodes for Section C
  const skillNodes = [
    { id: 'math', label: 'Mathematics & Logic', category: 'Foundation', status: 'Demonstrated' },
    { id: 'python', label: 'Python & Modern Languages', category: 'Language', status: 'Demonstrated' },
    { id: 'dsa', label: 'Data Structures & Algorithms', category: 'Core Benchmark', status: 'In Progress' },
    { id: 'ml', label: 'Machine Learning Foundations', category: 'Specialization', status: 'In Progress' },
    { id: 'dl', label: 'Deep Learning & Neural Nets', category: 'Advanced', status: 'Target Gap' },
    { id: 'projects', label: 'Verifiable Projects', category: 'Portfolio', status: 'Demonstrated' },
    { id: 'interview', label: 'Interview Preparation', category: 'Placement', status: 'Target Gap' },
  ];

  return (
    <div className="min-h-screen bg-[#07070B] text-[#F8F8FC] selection:bg-purple-600/30 selection:text-purple-200">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO VIEWPORT (Recreating the Reference Composition)
          Outer cool-toned dark frame (#07070B) enclosing a centered,
          large, nearly black hero panel (#09090F) with rounded corners
          and a dramatic ultraviolet glowing orbital ring.
         ───────────────────────────────────────────────────────────── */}
      <section className="w-full pt-4 sm:pt-6 pb-12 sm:pb-16 px-3 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-[1440px] rounded-2xl sm:rounded-[36px] bg-[#09090F] border border-white/[0.08] p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl">
          {/* Ambient Lighting & Glow Spill */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Top-center ultraviolet atmospheric diffusion */}
            <div className="absolute left-1/2 top-1/4 h-[420px] w-[640px] sm:w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#8B5CF6]/30 via-[#7C3AED]/15 to-transparent blur-[90px] animate-light-drift" />
            <div className="absolute left-1/2 top-1/3 h-[280px] w-[400px] sm:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#24105A]/40 blur-[75px]" />
          </div>

          {/* Glowing Ultraviolet Orbital Ring (CSS/SVG Vector) */}
          <div className="pointer-events-none absolute left-1/2 top-[46%] sm:top-[44%] -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[680px] md:w-[840px] lg:w-[1020px] h-[220px] sm:h-[420px] md:h-[500px] lg:h-[580px] z-0">
            <svg
              viewBox="0 0 1000 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full animate-orbital opacity-90"
            >
              <defs>
                {/* Ultraviolet gradients */}
                <linearGradient id="orbitalGradient" x1="100" y1="100" x2="900" y2="500" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#C084FC" stopOpacity="0.95" />
                  <stop offset="35%" stopColor="#8B5CF6" stopOpacity="0.85" />
                  <stop offset="70%" stopColor="#6D28D9" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#24105A" stopOpacity="0.1" />
                </linearGradient>

                <linearGradient id="innerGlow" x1="500" y1="50" x2="500" y2="550" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#E9D5FF" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#09090F" stopOpacity="0" />
                </linearGradient>

                <filter id="ultraGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="24" result="blur1" />
                  <feGaussianBlur stdDeviation="10" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur1" />
                    <feMergeNode in="blur2" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Back outer glow halo */}
              <ellipse
                cx="500"
                cy="300"
                rx="440"
                ry="210"
                transform="rotate(-8 500 300)"
                stroke="#8B5CF6"
                strokeWidth="18"
                opacity="0.3"
                filter="url(#ultraGlow)"
              />

              {/* Main crisp radiant torus ring */}
              <ellipse
                cx="500"
                cy="300"
                rx="430"
                ry="195"
                transform="rotate(-8 500 300)"
                stroke="url(#orbitalGradient)"
                strokeWidth="3.5"
                filter="url(#ultraGlow)"
              />

              {/* Front subtle inner rim for 3D depth */}
              <ellipse
                cx="500"
                cy="300"
                rx="418"
                ry="185"
                transform="rotate(-8 500 300)"
                stroke="url(#innerGlow)"
                strokeWidth="1"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Slim Navigation Bar inside Hero Panel */}
          <nav className="relative z-20 flex items-center justify-between border-b border-white/[0.06] pb-5 sm:pb-6">
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                {/* Minimal abstract connected skill graph / orbital glyph */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M3 12a9 9 0 0 1 15-6.7L19 4" />
                  <path d="M21 12a9 9 0 0 1-15 6.7L5 20" />
                </svg>
              </div>
              <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white">
                SkillPath<span className="text-purple-400 font-medium ml-1">AI</span>
              </span>
            </div>

            {/* Center / Nav Links (Desktop) */}
            <div className="hidden md:flex items-center gap-8 text-xs font-medium text-[#A5A5B8]">
              <a href="#careers" className="hover:text-white transition-colors">
                Explore Careers
              </a>
              <a href="#companies" className="hover:text-white transition-colors">
                Company Roadmaps
              </a>
              <a href="#adaptive" className="hover:text-white transition-colors">
                Learning Hub
              </a>
              <a href="#how-it-works" className="hover:text-white transition-colors">
                How It Works
              </a>
            </div>

            {/* Right: Functional Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-xs font-medium text-[#A5A5B8] hover:text-white px-3 py-1.5 transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => setIsCustomizingProfile(true)}
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#09090F] hover:bg-slate-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-slate-300 hover:text-white"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>

          {/* Mobile Drawer Menu */}
          {mobileMenuOpen && (
            <div className="relative z-30 md:hidden mt-3 rounded-xl border border-white/10 bg-[#0B0B14] p-4 space-y-3">
              <a
                href="#careers"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-300 hover:text-white py-1"
              >
                Explore Careers
              </a>
              <a
                href="#companies"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-300 hover:text-white py-1"
              >
                Company Roadmaps
              </a>
              <a
                href="#adaptive"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-300 hover:text-white py-1"
              >
                Learning Hub
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-300 hover:text-white py-1"
              >
                How It Works
              </a>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-medium text-slate-300"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setIsCustomizingProfile(true);
                    setMobileMenuOpen(false);
                  }}
                  className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}

          {/* Hero Content Area */}
          <div className="relative z-10 pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-20 text-center max-w-4xl mx-auto flex flex-col items-center">
            {/* Main Hero Headline (Exact text requested, Space Grotesk, tight tracking, all caps) */}
            <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[84px] tracking-tight text-white uppercase leading-[1.04] max-w-4xl">
              YOUR FUTURE.
              <br />
              YOUR SKILLS.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-purple-200">
                YOUR ROADMAP.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-6 sm:mt-8 text-sm sm:text-base text-[#A5A5B8] max-w-2xl leading-relaxed">
              Turn your career goals into a personalized learning journey. Discover your skill gaps, master the right technologies, and prepare for the companies you want to join.
            </p>

            {/* Primary Call-to-Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              {/* Primary Button */}
              <button
                onClick={() => setIsCustomizingProfile(true)}
                className="w-full sm:w-auto rounded-full bg-[#F8F8FC] px-8 py-3.5 text-xs sm:text-sm font-semibold text-[#09090F] hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all cursor-pointer"
              >
                Build My Roadmap
              </button>

              {/* Secondary Button */}
              <a
                href="#companies"
                className="w-full sm:w-auto rounded-full bg-purple-950/20 border border-[#8B5CF6]/50 px-8 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-purple-900/30 hover:border-[#8B5CF6] hover:shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all text-center cursor-pointer"
              >
                Explore Companies
              </a>
            </div>

            {/* Subtle Product Descriptor */}
            <div className="mt-16 sm:mt-24 pt-6 border-t border-white/[0.04] w-full text-center">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#A5A5B8]/80 font-medium">
                SKILLS INTELLIGENCE • CAREER ROADMAPS • COMPANY PREPARATION
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION A — CHOOSE YOUR DIRECTION
          "ONE GOAL. A THOUSAND POSSIBILITIES."
         ───────────────────────────────────────────────────────────── */}
      <section id="careers" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#8B5CF6]">
            Specialized Career Paths
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white mt-2 uppercase">
            ONE GOAL. A THOUSAND POSSIBILITIES.
          </h2>
          <p className="text-xs sm:text-sm text-[#A5A5B8] mt-3">
            Select your target engineering discipline to explore market-aligned competency requirements, curated modules, and interview standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {careerPaths.map((cp) => (
            <div
              key={cp.role}
              onClick={() => handleSelectCareer(cp.role)}
              className="group relative rounded-2xl border border-white/[0.08] bg-[#09090F] p-6 hover:border-[#8B5CF6]/60 hover:bg-[#0E0E18] transition-all cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/40 border border-purple-500/20 group-hover:scale-105 transition-transform">
                    {cp.icon}
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors">
                  {cp.title}
                </h3>
                <p className="text-xs text-[#A5A5B8] mt-2 leading-relaxed">
                  {cp.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {cp.keySkills.slice(0, 3).map((s, i) => (
                    <span key={i} className="text-[11px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-purple-400 group-hover:underline">
                  Launch →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION B — YOUR TARGET COMPANY
          "YOUR AMBITION. YOUR TARGET COMPANY."
         ───────────────────────────────────────────────────────────── */}
      <section id="companies" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#08080D]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#8B5CF6]">
              Verified Company Preparation Directory
            </span>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2 uppercase">
              YOUR AMBITION. YOUR TARGET COMPANY.
            </h2>
            <p className="text-xs sm:text-sm text-[#A5A5B8] mt-3 leading-relaxed">
              Explore leading companies, discover the roles they offer, and build a personalized roadmap to prepare for your next opportunity.
            </p>
          </div>

          {/* Full searchable, filterable company directory with authentic vector logos */}
          <CompanyDirectory />

          <div className="mt-12 text-center">
            <button
              onClick={() => setActiveTab('compare')}
              className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/20 px-6 py-2.5 text-xs font-semibold text-purple-200 hover:bg-purple-900/30 hover:border-purple-500/60 transition-all cursor-pointer"
            >
              <span>Compare Multiple Target Companies Side-by-Side</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION C — ADAPTIVE LEARNING & SKILL GRAPH
          "YOUR ROADMAP. YOUR PACE."
         ───────────────────────────────────────────────────────────── */}
      <section id="adaptive" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#8B5CF6]">
            Intelligent Competency Modeling
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white mt-2 uppercase">
            YOUR ROADMAP. YOUR PACE.
          </h2>
          <p className="text-xs sm:text-sm text-[#A5A5B8] mt-3">
            Every coding submission and diagnostic quiz updates your personal skill graph in real time, automatically unlocking higher-level practice modules.
          </p>
        </div>

        {/* Interactive Connected Skill Graph Visualization */}
        <div className="rounded-3xl border border-white/[0.08] bg-[#09090F] p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Graph Representation */}
            <div className="lg:col-span-7 bg-[#07070B] rounded-2xl border border-white/[0.06] p-6 sm:p-8">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/[0.06] pb-3 mb-6">
                <span className="font-mono uppercase tracking-wider text-purple-400 font-semibold">
                  Dynamic Competency Node Network
                </span>
                <span className="text-[11px]">Click nodes to inspect</span>
              </div>

              {/* Node cards connected by visual vectors */}
              <div className="space-y-3">
                {skillNodes.map((node, index) => {
                  const isSelected = activeGraphNode === node.id;
                  const isDemonstrated = node.status === 'Demonstrated';
                  const isGap = node.status === 'Target Gap';

                  return (
                    <div
                      key={node.id}
                      onClick={() => setActiveGraphNode(node.id)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-purple-500 bg-purple-950/20 shadow-md'
                          : 'border-white/[0.06] bg-[#09090F] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            isDemonstrated
                              ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                              : isGap
                              ? 'bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]'
                              : 'bg-amber-400'
                          }`}
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{node.label}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{node.category}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                            isDemonstrated
                              ? 'text-emerald-300 bg-emerald-950/40'
                              : isGap
                              ? 'text-purple-300 bg-purple-950/40'
                              : 'text-amber-300 bg-amber-950/40'
                          }`}
                        >
                          {node.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Explanatory Narrative Column */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/30 px-3 py-1 text-xs text-purple-300 font-mono">
                <Sparkles className="h-3 w-3" />
                <span>Continuous Mastery Calibration</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                No Generic Assumptions. Just Direct Evidence.
              </h3>

              <p className="text-xs sm:text-sm text-[#A5A5B8] leading-relaxed">
                When you score poorly in a specific topic like Graph Algorithms or Quantitative Aptitude, SkillPath AI doesn’t force you to repeat what you already know.
              </p>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Reusable skills (Python, OOP, SQL) remain mastered when switching target companies.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>8-stage remedial pathways address prerequisite gaps without time-wasting fluff.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Timed coding and aptitude tests simulate actual corporate screening environments.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('competencies')}
                  className="rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-[#09090F] hover:bg-slate-100 transition-colors shadow-sm"
                >
                  View Live Competency Matrix →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION D — HOW IT WORKS
          3 Concise Steps
         ───────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#08080D]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#8B5CF6]">
              Engineered for Student Success
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white mt-2 uppercase">
              HOW IT WORKS
            </h2>
            <p className="text-xs sm:text-sm text-[#A5A5B8] mt-3">
              A systematic, three-phase framework bridging college coursework with rigorous technical placement requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#09090F] p-8 space-y-4 hover:border-purple-500/40 transition-all">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#8B5CF6]">
                01 — ASSESS
              </span>
              <h3 className="text-lg font-bold text-white">
                Discover Strengths & Skill Gaps
              </h3>
              <p className="text-xs text-[#A5A5B8] leading-relaxed">
                Take timed diagnostic assessments in data structures, cognitive aptitude, and core computer science to establish a transparent baseline.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#09090F] p-8 space-y-4 hover:border-purple-500/40 transition-all">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#8B5CF6]">
                02 — LEARN
              </span>
              <h3 className="text-lg font-bold text-white">
                Follow Personalized Roadmaps
              </h3>
              <p className="text-xs text-[#A5A5B8] leading-relaxed">
                Study guided notes, solve topic-wise coding challenges, and review detailed mathematical explanations calibrated to your daily study hours.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#09090F] p-8 space-y-4 hover:border-purple-500/40 transition-all">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#8B5CF6]">
                03 — PREPARE
              </span>
              <h3 className="text-lg font-bold text-white">
                Simulate Real Interviews
              </h3>
              <p className="text-xs text-[#A5A5B8] leading-relaxed">
                Run AI mock technical whiteboard interviews and behavioral rounds graded against official rubrics like Amazon Leadership Principles and Googleyness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION E — FINAL CALL TO ACTION
          "YOUR NEXT CHAPTER STARTS HERE."
         ───────────────────────────────────────────────────────────── */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle purple orbital ambient lighting */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#8B5CF6]/20 via-[#7C3AED]/20 to-[#24105A]/30 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
            YOUR NEXT CHAPTER STARTS HERE.
          </h2>

          <p className="text-sm sm:text-base text-[#A5A5B8] max-w-xl mx-auto">
            Build the skills. Close the gaps. Prepare for your future.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsCustomizingProfile(true)}
              className="w-full sm:w-auto rounded-full bg-white px-8 py-3.5 text-xs sm:text-sm font-semibold text-[#09090F] hover:bg-slate-100 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all cursor-pointer"
            >
              Create My Roadmap
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="w-full sm:w-auto rounded-full border border-white/20 bg-transparent px-8 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              Explore Placement Workspace
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MINIMAL FOOTER
         ───────────────────────────────────────────────────────────── */}
      <footer className="w-full border-t border-white/[0.06] bg-[#07070B] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A5A5B8]">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white">SkillPath AI</span>
            <span>·</span>
            <span>Next-Generation Career Intelligence for Engineering Students</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#careers" className="hover:text-white transition-colors">
              Careers
            </a>
            <a href="#companies" className="hover:text-white transition-colors">
              Companies
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <button
              onClick={() => setActiveTab('tracker')}
              className="hover:text-white transition-colors"
            >
              Interview Tracker
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
