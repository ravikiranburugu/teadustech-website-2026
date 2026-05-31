import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Check, 
  Cpu, 
  Code, 
  Layers, 
  FileText, 
  BookOpen, 
  AlertCircle, 
  Users, 
  Terminal, 
  Play, 
  Lock, 
  Compass,
  ArrowUpRight,
  Shield,
  FileSpreadsheet
} from 'lucide-react';

interface InternshipProgramViewProps {
  onBackToOverview: () => void;
}

export default function InternshipProgramView({ onBackToOverview }: InternshipProgramViewProps) {
  const [activeProjectTab, setActiveProjectTab] = useState<'p1' | 'p2' | 'p3'>('p1');
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);
  const [rubricHover, setRubricHover] = useState<number | null>(null);

  const stats = [
    { label: "Duration", val: "16 Weeks", sub: "Pilot cohort", icon: <Calendar className="text-primary" size={20} /> },
    { label: "Financial Model", val: "Unpaid / Free", sub: "No fees, no stipend", icon: <Clock className="text-primary" size={20} /> },
    { label: "Planned Cohort", val: "10 - 20 Slots", sub: "Highly selective", icon: <Users className="text-primary" size={20} /> },
    { label: "Key Outcome", val: "Job Readiness", sub: "Projects & mock interviews", icon: <Award className="text-primary" size={20} /> }
  ];

  const timelinePhases = [
    {
      week: "Week 1",
      title: "Orientation & Individual Learning Plan",
      purpose: "Introduce program standards, set developmental goals & establish repo workflows.",
      output: "Signed terms, individualized technical plan, and environment setup.",
      details: [
        "SOP guidelines walking through workspace mechanics",
        "Personalized training goals assessment",
        "Git branch and pull-request standards briefing",
        "Setting up standard local developer setups"
      ]
    },
    {
      week: "Weeks 2-3",
      title: "Foundation Training & Code Quality Standards",
      purpose: "Bridge critical baseline technical gaps in syntax, formatting, semantic code, and structural layout.",
      output: "Foundation exercises scoring and readiness sign-off.",
      details: [
        "HTML5 semantic structures and accessibility guidelines",
        "Responsive styling workflows with modern CSS & Tailwind",
        "Asynchronous JavaScript and DOM manipulation",
         "Strict linting rules, variable scoping, and debugging using browser tools"
      ]
    },
    {
      week: "Weeks 4-5",
      title: "Project 1: Beginner-Level Static Website",
      purpose: "Assess foundational frontend layouts, grid systems, typography, and responsive accuracy.",
      output: "Responsive, semantic informational web page.",
      details: [
        "Applying grid/flex structures perfectly across media queries",
        "Web standard accessibility tags, inputs, and proper typography hierarchy",
        "Production deployment/demo and interactive code walkthrough with technical mentors"
      ]
    },
    {
      week: "Weeks 6-9",
      title: "Project 2: Intermediate Web Application",
      purpose: "Develop state handlers, authentication flows, inputs validation, and client-side page routing.",
      output: "Regulated user-dashboard with login & verification controls.",
      details: [
        "Simulating secure login/logout conditions",
        "Handling complex form states and loading, success, and error feedback",
        "Constructing multiple dynamic views (e.g. dashboards, profile forms, action histories)",
        "Secrets separation guidelines (preventing hardcoded credentials/keys)"
      ]
    },
    {
      week: "Weeks 10-14",
      title: "Project 3: Advanced Full-Stack Application",
      purpose: "Execute full-stack capabilities, API connections, database persistence, and clean backend schemas.",
      output: "Full-stack client-server app (E-Commerce learning layout).",
      details: [
        "Designing modular API routes with server-side validation",
        "Building safe local or cloud database collections (Firestore / local databases)",
        "Constructing end-to-end user-flow (registration, catalog, dynamic cart, order submission)",
        "Security practices including sanitization, passwords safety, and environment file variables"
      ]
    },
    {
      week: "Weeks 15-16",
      title: "Final Review & Intensive Interview Readiness",
      purpose: "Finetune structural verbal presentation, technical depth explanation, and logic problem-solving speed.",
      output: "Detailed Performance Report & at least 2 structured Mock Interview rounds.",
      details: [
        "Curating professional GitHub portfolios with verified code commits",
        "Explaining architectural decisions, tradeoffs, and limitations under mock evaluation",
        "Familiarization with entry-level system and algorithmic challenges",
        "Live resume reviews, feedback revisions, and professional behavioral coaching"
      ]
    }
  ];

  const projectBlueprints = {
    p1: {
      title: "Project 1: Standard Informational Resource Page",
      difficulty: "Beginner",
      primaryFocus: "Semantic HTML, CSS, Layout System, Accessibility, Presentation Mechanics",
      objective: "Confirm technical base. Can you design a clean desktop-mobile matching layout with strict semantic code, zero scroll-breaks, and complete keyboard-friendly controls?",
      highlights: [
        "Fully responsive layout utilizing fluid flexbox/grid structures",
        "Sufficient color contrast compliant with accessibility guidelines",
        "Strict semantic tags used exclusively (main, article, section, header, nav)",
        "Interactive form structure with full browser validity styling"
      ],
      advancementGate: "Must meet core layout guidelines and successfully present the responsive structure verbally to mentors."
    },
    p2: {
      title: "Project 2: Secure Multi-View Workspace",
      difficulty: "Intermediate",
      primaryFocus: "State Architecture, Route Protection, Forms Validation, Error Management",
      objective: "Develop active state applications. Can you create a clean single-page app containing private views, strict form control feedback, and mock authentication logic that doesn't leak secrets?",
      highlights: [
        "Simulated user sessions handling (token/session state storage)",
        "Protected client routing (unauthenticated users redirect to login)",
        "Intricate state arrays for editing, listing, and filtering content rows",
        "Handling network-disconnect simulations gracefully with micro-alerts"
      ],
      advancementGate: "Must show modular code execution, demonstrate flawless authentication error handling, and explain basic state lift concepts."
    },
    p3: {
      title: "Project 3: Full-Stack Domain Platform (e.g. E-Commerce Model)",
      difficulty: "Advanced Capability",
      primaryFocus: "API Architecture, Database Persistence, Server Security, Optimization",
      objective: "Demonstrate junior-professional delivery values. Can you plan, database, write, wrap, and deploy an end-to-end service maintaining data integrity and robust security layers?",
      highlights: [
        "Asynchronous API endpoints with structured JSON responses",
        "Dynamic backend database integration with search and filtering indexing",
        "Role segmentation flow (e.g., administrator panel to upload inventory vs client workspace)",
        "Robust error try-catch blocks and prevention of server-thread crashes"
      ],
      advancementGate: "Full execution of core API routes, passing code-integrity reviews, and structural explanation of data-model flows."
    }
  };

  const rubricAreas = [
    { area: "Functional Delivery", weight: 20, desc: "Satisfying all core acceptance requirements & user-flow reliability.", color: "bg-teal-500" },
    { area: "Technical Implementation", weight: 25, desc: "Proper language use, structural architecture, correct dependencies choice.", color: "bg-teal-600" },
    { area: "Code Quality & Sustainability", weight: 15, desc: "Clear naming rules, modularity, legibility, response to peer review feedback.", color: "bg-emerald-500" },
    { area: "Testing, Reliability & Security", weight: 15, desc: "Sufficient edge case coverage, environment secrets safety, proper parameter verification.", color: "bg-emerald-600" },
    { area: "Git Workflow & Development Habits", weight: 10, desc: "Granular commit logs, clean README documentation, structural task breakdown.", color: "bg-cyan-500" },
    { area: "Problem Solving & Revisions speed", weight: 10, desc: "Incorporation of advisor reviews and speed of bug corrections.", color: "bg-cyan-600" },
    { area: "Timeliness & Communication", weight: 5, desc: "Collaborative checks, active updates, adherence to sprint boundaries.", color: "bg-sky-500" }
  ];

  const ratingScale = [
    { score: "85 - 100", label: "Strong Outcome", class: "bg-teal-500/10 text-teal-700 font-bold", desc: "Meets criteria without manual oversight; structurally explains design tradeoffs and demonstrates high problem-solving autonomy." },
    { score: "70 - 84", label: "Competent / Steady", class: "bg-emerald-500/10 text-emerald-700 font-bold", desc: "Consistent functional execution with minimal, manageable gaps. Receives feedback openly and demonstrates solid software foundations." },
    { score: "55 - 69", label: "Developing Support", class: "bg-yellow-500/10 text-yellow-700 font-bold", desc: "Demonstrates core drive but requires frequent active guidance to complete advanced operations. Structured remediation exercises recommended." },
    { score: "Below 55", label: "Needs Intensive Support", class: "bg-red-500/10 text-red-700 font-bold", desc: "Key software capabilities not verified. Focuses on rebuilding concrete fundamental programming steps." }
  ];

  return (
    <div className="space-y-margin">
      {/* Back Button */}
      <div className="flex justify-between items-center bg-white/50 p-4 rounded-xl border border-outline-variant/30 backdrop-blur-sm">
        <button 
          onClick={onBackToOverview}
          className="text-primary hover:text-primary-container font-label-md flex items-center gap-2 group transition-all"
        >
          <motion.span 
            className="inline-block"
            whileHover={{ x: -3 }}
          >
            &larr;
          </motion.span> Back to Skill Hub Portal
        </button>
        <span className="text-xs font-mono text-secondary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-widest font-bold">
          SOP Pilot Phase 1
        </span>
      </div>

      {/* Program Hero Title banner */}
      <section className="bg-gradient-to-br from-primary/10 via-brand-light/20 to-transparent p-margin lg:p-xl rounded-2xl border border-outline-variant/30 text-left relative overflow-hidden">
        <div className="relative z-10 space-y-md max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#14b8a5]/10 text-[#14b8a5] px-3 py-1 rounded-full font-label-sm text-[11px] font-bold uppercase tracking-wider">
            <Code size={14} /> Student Skill Development Program (SSDP)
          </div>
          <h1 className="font-headline-lg text-on-background tracking-tight">
            Software Development Internship Readiness Program
          </h1>
          <p className="font-body-lg text-secondary leading-relaxed">
            A mentored, project-based intensive curriculum engineered for final-year students and recent graduates to bridge the gap between academic theory and real-world professional delivery. Acquire structured evidence of software construction and enter interviews with confidence.
          </p>
          <div className="flex gap-4 flex-wrap pt-2">
            <a 
              href="#enrollment"
              className="bg-brand-light text-on-brand-light font-label-md px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-primary hover:text-on-primary transition-all shadow-md font-bold"
            >
              Apply for Program <ArrowRight size={18} />
            </a>
            <a 
              href="#curriculum"
              className="bg-white border border-outline text-secondary font-label-md px-6 py-3 rounded-lg hover:bg-surface-container-low transition-all"
            >
              Examine SOP Guidelines
            </a>
          </div>
        </div>

        {/* Technical decoration background */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
          <Terminal size={320} className="text-[#14b8a5]" />
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {stats.map((s, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            key={idx}
            className="bg-white p-margin border border-outline-variant/30 rounded-xl shadow-sm hover:shadow-md transition-all flex items-start gap-4"
          >
            <div className="p-3 bg-primary/5 rounded-lg">
              {s.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-secondary uppercase tracking-wider">{s.label}</p>
              <p className="text-lg font-bold text-on-background mt-0.5">{s.val}</p>
              <p className="text-xs text-on-surface-variant">{s.sub}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Program Core Purpose & Principles */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        <div className="bg-white p-margin rounded-2xl border border-outline-variant/30 space-y-md">
          <h2 className="font-headline-md text-primary flex items-center gap-2">
            <Layers className="text-[#14b8a5]" /> 1. Program Blueprint & Principles
          </h2>
          <p className="font-body-md text-secondary leading-relaxed">
            Learning is the absolute cornerstone of this program. Our objective is to guide you step-by-step through standard developer pipelines. Through detailed checkpoint evaluations, participants receive concrete performance telemetry across every project.
          </p>
          <div className="space-y-3 pt-2">
            {[
              "Documented and transparent meritocratic review process.",
              "Progressively scaling task complexity (Beginner to Full-Stack).",
              "Detailed developmental critiques instead of basic pass-fail checks.",
              "Practical interface skills paired with architectural security habits."
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-[#14b8a5]/10 flex items-center justify-center text-[#14b8a5] shrink-0">
                  <Check size={12} className="stroke-[3]" />
                </div>
                <span className="font-body-md text-on-surface">{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-margin rounded-2xl border border-outline-variant/30 flex flex-col justify-between space-y-md">
          <div>
            <h2 className="font-headline-md text-primary flex items-center gap-2">
              <Shield className="text-[#14b8a5]" /> 2. Operating Safeguards
            </h2>
            <p className="font-body-md text-secondary leading-relaxed mb-4">
              Because this internship readiness framework operates on an <strong>unpaid model with no registration fee</strong>, we enforce modern safeguards as outlined in our Standard Operating Procedure (SOP):
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-[#eaf8f7] rounded-lg border border-[#14b8a5]/10 flex gap-3 text-sm">
                <AlertCircle className="text-[#14b8a5] shrink-0 mt-0.5" size={18} />
                <span className="font-body-sm text-secondary">
                  <strong>Learning Sandbox focus:</strong> All projects are custom learning sandboxes or mock prototypes designed primarily for skill diagnostic, preventing relying on unpaid talent for server critical operations.
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex gap-3 text-sm">
                <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={18} />
                <span className="font-body-sm text-secondary">
                  <strong>Intellectual Property:</strong> Participants retain permission to display self-authored code inside peer-reviewed personal GitHub profiles.
                </span>
              </div>
            </div>
          </div>
          <div className="text-[11px] font-mono text-secondary pt-2">
            * Fully compliant with international educational framework guidelines to protect standard vocational student scopes.
          </div>
        </div>
      </section>

      {/* Interactive Timeline Curriculm Section */}
      <section id="curriculum" className="bg-white p-margin lg:p-lg border border-outline-variant/30 rounded-2xl space-y-md">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-headline-md text-primary">16-Week Structured Syllabus Curriculum</h2>
          <p className="font-body-md text-secondary">
            Click on any timeline phase to expand its comprehensive learning objectives, activities, and required deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg pt-6">
          {/* Phase selection timeline navigation */}
          <div className="lg:col-span-5 space-y-3 border-l-2 border-[#14b8a5]/20 pl-3">
            {timelinePhases.map((phase, idx) => {
              const isActive = expandedPhase === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setExpandedPhase(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 relative ${
                    isActive 
                      ? 'bg-[#eaf8f7] border-[#14b8a5]/40 shadow-sm' 
                      : 'bg-white border-transparent hover:bg-slate-50'
                  }`}
                >
                  {/* Left indicator bubble */}
                  <div className={`absolute -left-[19px] top-6 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                    isActive ? 'bg-[#14b8a5] border-white scale-125' : 'bg-white border-slate-300'
                  }`} />
                  
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono font-bold text-primary tracking-widest block">
                      {phase.week}
                    </span>
                    <h3 className="font-headline-sm text-on-surface line-clamp-1">{phase.title}</h3>
                    <p className="text-xs text-on-surface-variant line-clamp-1 font-body-sm">{phase.purpose}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Expanded Phase details preview pane */}
          <div className="lg:col-span-7 bg-slate-50/70 border border-outline-variant/30 rounded-2xl p-margin flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {expandedPhase !== null ? (
                <motion.div
                  key={expandedPhase}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-margin"
                >
                  <div className="flex justify-between items-start border-b border-outline-variant/30 pb-4">
                    <div>
                      <span className="font-mono text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-sm uppercase tracking-wider">
                        {timelinePhases[expandedPhase].week} Detailed Blueprint
                      </span>
                      <h3 className="font-headline-md text-on-surface mt-2">{timelinePhases[expandedPhase].title}</h3>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-[11px] font-bold text-secondary uppercase tracking-widest">Phase Objective & Focus</p>
                      <p className="font-body-md text-on-surface mt-1 leading-relaxed">{timelinePhases[expandedPhase].purpose}</p>
                    </div>

                    <div className="p-4 bg-white border border-outline-variant/30 rounded-xl space-y-1">
                      <p className="text-[11px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                        <FileText size={12} /> Key Phase Submission Output
                      </p>
                      <p className="font-body-md font-bold text-on-surface">{timelinePhases[expandedPhase].output}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[11px] font-bold text-secondary uppercase tracking-widest">Concrete Core Activities Topics</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {timelinePhases[expandedPhase].details.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs font-body-sm text-on-surface-variant bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm">
                            <CheckCircle2 size={14} className="text-[#14b8a5] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-xl space-y-md">
                  <Compass size={40} className="text-secondary/40 animate-pulse" />
                  <p className="font-body-md text-secondary">Click any programmatic block to examine deliverables configuration.</p>
                </div>
              )}
            </AnimatePresence>

            <div className="border-t border-outline-variant/20 pt-4 mt-6 text-xs font-mono text-secondary flex items-center justify-between">
              <span>Exit condition: Mentoring scorecard sign-off</span>
              <span>100% Student Readiness Assurance</span>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Professional Projects Framework Tabs */}
      <section className="bg-white p-margin lg:p-lg border border-outline-variant/30 rounded-2xl space-y-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-margin pb-4 border-b border-outline-variant/30">
          <div>
            <h2 className="font-headline-md text-primary">Progressive Projects Curriculum</h2>
            <p className="font-body-md text-secondary mt-1">
              Interns demonstrate technical proficiency through three standalone developer milestones.
            </p>
          </div>

          <div className="flex gap-2 p-1 bg-surface-container rounded-lg border border-outline-variant/20 w-fit shrink-0">
            {(['p1', 'p2', 'p3'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveProjectTab(tab)}
                className={`px-4 py-2 rounded-md font-label-md transition-all ${
                  activeProjectTab === tab
                    ? 'bg-[#14b8a5] text-white shadow-sm'
                    : 'text-secondary hover:text-on-surface'
                }`}
              >
                Project {tab === 'p1' ? '1' : tab === 'p2' ? '2' : '3'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProjectTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-lg"
            >
              <div className="lg:col-span-7 space-y-margin">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-sm text-[10px] font-mono font-bold uppercase ${
                    activeProjectTab === 'p1' ? 'bg-emerald-100 text-emerald-800' :
                    activeProjectTab === 'p2' ? 'bg-cyan-100 text-cyan-800' :
                    'bg-indigo-100 text-indigo-800'
                  }`}>
                    {projectBlueprints[activeProjectTab].difficulty} Difficulty
                  </span>
                  <span className="text-xs text-secondary font-mono">
                    Major Focus: {projectBlueprints[activeProjectTab].primaryFocus}
                  </span>
                </div>

                <h3 className="font-headline-md text-on-background">{projectBlueprints[activeProjectTab].title}</h3>

                <div>
                  <p className="text-xs font-bold text-secondary uppercase tracking-widest">Brief Statement Objective</p>
                  <p className="font-body-md text-on-surface mt-1.5 leading-relaxed">{projectBlueprints[activeProjectTab].objective}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-secondary uppercase tracking-widest">Acceptance Standard highlights</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {projectBlueprints[activeProjectTab].highlights.map((h, i) => (
                      <div key={i} className="flex gap-2.5 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                        <Check size={14} className="text-[#14b8a5] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="font-body-sm text-secondary">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between p-margin bg-[#eaf8f7] border border-[#14b8a5]/10 rounded-2xl">
                <div className="space-y-4">
                  <p className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                    <Award size={14} /> Critical Advancement Gate
                  </p>
                  <p className="font-body-md text-secondary leading-relaxed">
                    "{projectBlueprints[activeProjectTab].advancementGate}"
                  </p>
                  <div className="p-3 bg-white/70 border border-[#14b8a5]/10 rounded-xl flex gap-3 text-xs">
                    <AlertCircle className="text-primary shrink-0 mt-0.5" size={16} />
                    <span className="font-body-sm text-secondary">
                      Advancement requires technical code check, repository history validation, and a brief oral presentation logic review.
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#14b8a5]/10 flex items-center justify-between text-xs font-mono text-primary font-bold">
                  <span>Mentorship Telemetry Included</span>
                  <Award size={16} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Numerical Rating Scales & Feedback Metrics */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Rubric metrics */}
        <div className="lg:col-span-7 bg-white p-margin border border-outline-variant/30 rounded-2xl space-y-md">
          <div>
            <h2 className="font-headline-md text-primary">How We Grade: 100-Point Project Rubric</h2>
            <p className="font-body-md text-secondary mt-1">
              Each project deliverables is subjected to a strict and transparent, weighted numerical telemetry assessment. Hover over an area to see audit focus.
            </p>
          </div>

          <div className="space-y-3 pt-3">
            {rubricAreas.map((item, index) => (
              <div 
                key={index}
                onMouseEnter={() => setRubricHover(index)}
                onMouseLeave={() => setRubricHover(null)}
                className={`p-3 rounded-xl border transition-all ${
                  rubricHover === index 
                    ? 'bg-slate-50 border-[#14b8a5]/30' 
                    : 'bg-white border-transparent'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-headline-sm text-sm text-on-surface">{item.area}</span>
                  <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    Weight: {item.weight}%
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-1.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.weight * 3}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className={`h-full ${item.color} rounded-full`}
                  />
                </div>
                <p className="text-xs text-on-surface-variant font-body-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scoring Interpretation map */}
        <div className="lg:col-span-5 bg-white p-margin border border-outline-variant/30 rounded-2xl flex flex-col justify-between space-y-md">
          <div>
            <h2 className="font-headline-md text-primary">Outcome Definition Matrix</h2>
            <p className="font-body-md text-secondary mt-1 mb-4">
              Cumulative project marks correlate to transparent readiness classifications.
            </p>

            <div className="space-y-3">
              {ratingScale.map((tier, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-headline-sm text-sm font-semibold text-on-surface">{tier.label}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs label-md ${tier.class}`}>
                      {tier.score}
                    </span>
                  </div>
                  <p className="text-xs font-body-sm text-secondary leading-relaxed">{tier.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-[#eaf8f7] rounded-xl border border-[#14b8a5]/10 text-xs text-secondary flex gap-2">
            <AlertCircle size={16} className="text-[#14b8a5] shrink-0 mt-0.5" />
            <span className="font-body-sm">
              We compile detailed strengths checklists and top 3 priority recovery targets for every participant after each phase check.
            </span>
          </div>
        </div>
      </section>

      {/* Program Operations Roles Checklist */}
      <section className="bg-white p-margin border border-outline-variant/30 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter justify-items-stretch">
          <div className="space-y-2 p-3">
            <div className="w-10 h-10 rounded-lg bg-[#14b8a5]/10 flex items-center justify-center text-[#14b8a5] mb-2">
              <Users size={18} />
            </div>
            <h4 className="font-headline-sm text-base text-on-surface">1. Selected Pool Focus</h4>
            <p className="text-xs font-body-sm text-secondary leading-relaxed">
              We admit between 10 to 20 committed participants to preserve mentoring and review feedback speeds. Technical mentors oversee direct peer batches, holding reviews weekly.
            </p>
          </div>

          <div className="space-y-2 p-3 border-y md:border-y-0 md:border-x border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-[#14b8a5]/10 flex items-center justify-center text-[#14b8a5] mb-2">
              <BookOpen size={18} />
            </div>
            <h4 className="font-headline-sm text-base text-on-surface">2. Structured Cadence</h4>
            <p className="text-xs font-body-sm text-secondary leading-relaxed">
              Expect high-intensity workflows including weekly cohort learning sessions, personal checkpoint assessments, branches PR reviews, and detailed oral demo defenses.
            </p>
          </div>

          <div className="space-y-2 p-3">
            <div className="w-10 h-10 rounded-lg bg-[#14b8a5]/10 flex items-center justify-center text-[#14b8a5] mb-2">
              <Award size={18} />
            </div>
            <h4 className="font-headline-sm text-base text-on-surface">3. Portfolio Readiness</h4>
            <p className="text-xs font-body-sm text-secondary leading-relaxed">
              Graduate with professional, structured projects, verifiable GitHub contribution histories, polished engineering documentation, and professional experience verbalizing technical tradeoffs.
            </p>
          </div>
        </div>
      </section>

      {/* Google Application Form Segment Embed */}
      <section id="enrollment" className="bg-gradient-to-br from-white to-slate-50 border border-[#14b8a5]/30 rounded-3xl p-margin lg:p-lg space-y-margin relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1 bg-[#14b8a5]/10 text-[#14b8a5] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <FileSpreadsheet size={12} strokeWidth={2.5} /> Phase 1 Pilot Admissions
          </div>
          <h2 className="font-headline-lg text-primary">Admission Form & Selection Request</h2>
          <p className="font-body-md text-secondary">
            Ensure you understand the program timeline, unpaid nature, self-commited hours and rigorous standards before submitting your application.
          </p>
        </div>

        {/* Embedded Iframe Container */}
        <div className="bg-white rounded-2xl border border-outline-variant/50 shadow-2xl overflow-hidden relative group max-w-4xl mx-auto">
          <div className="p-4 bg-slate-100 border-b border-outline-variant/30 flex justify-between items-center font-mono text-xs text-secondary">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              Secure Connection Activated
            </span>
            <div className="flex gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#14b8a5]/20"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-primary/20"></span>
            </div>
          </div>

          <div className="relative">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLScz-iMLVXEy5zvOV9JgH_P2HDp57rvKY-g69fgXSnOOew1KKw/viewform?embedded=true" 
              width="100%" 
              height="850" 
              className="w-full h-[850px] border-none block"
              title="Internship Application Form"
            >
              Loading application questionnaire form...
            </iframe>
          </div>

          {/* Fallback & Helper links under the form */}
          <div className="bg-slate-50 p-6 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-margin">
            <div className="space-y-1 text-center md:text-left">
              <p className="font-label-md text-on-surface">Experiencing display errors with the embedded form?</p>
              <p className="font-body-sm text-secondary">You can launch the registration form in a designated fullscreen portal browser.</p>
            </div>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScz-iMLVXEy5zvOV9JgH_P2HDp57rvKY-g69fgXSnOOew1KKw/viewform?usp=publish-editor" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-brand-light text-on-brand-light hover:bg-primary hover:text-on-primary font-label-md hover:shadow-lg transition-all px-5 py-3 rounded-lg flex items-center gap-2 shrink-0 font-bold"
            >
              Launch Form Fullscreen <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
