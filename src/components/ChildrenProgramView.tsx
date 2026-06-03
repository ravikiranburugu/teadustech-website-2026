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
  Laptop, 
  Play, 
  Users, 
  BookOpen, 
  Sparkles, 
  Gamepad2, 
  Compass, 
  BrainCircuit, 
  CheckCircle, 
  ArrowLeft,
  School,
  Terminal,
  Calculator,
  Smile,
  Zap,
  Target
} from 'lucide-react';

interface ChildrenProgramViewProps {
  onBackToOverview: () => void;
}

export default function ChildrenProgramView({ onBackToOverview }: ChildrenProgramViewProps) {
  const [activeMonth, setActiveMonth] = useState<1 | 2 | 3>(1);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [gradeInput, setGradeInput] = useState<string>('');
  const [checkResult, setCheckResult] = useState<{
    status: 'eligible' | 'warning' | 'ineligible' | null;
    message: string;
  }>({ status: null, message: '' });

  // Quick stats
  const stats = [
    { label: "Program Length", val: "12 Weeks", sub: "3-Month Intensive", icon: <Calendar className="text-secondary" size={20} /> },
    { label: "Weekly Commitment", val: "3 Sessions", sub: "2 Hours per session", icon: <Clock className="text-secondary" size={20} /> },
    { label: "Grade Range", val: "Grades 6–10", sub: "Ages 11–16 years old", icon: <School className="text-secondary" size={20} /> },
    { label: "Total Training", val: "72 Hours", sub: "Hands-on & project-heavy", icon: <Cpu className="text-secondary" size={20} /> }
  ];

  // Grade/Eligibility Calculator logic
  const handleCheckEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    const grade = parseInt(gradeInput, 10);
    if (isNaN(grade)) {
      setCheckResult({
        status: 'warning',
        message: 'Please enter a valid school grade number (e.g., 7).'
      });
      return;
    }

    if (grade >= 6 && grade <= 10) {
      setCheckResult({
        status: 'eligible',
        message: `Awesome! Students in Grade ${grade} are perfectly suited for this program. They will gain foundational logic, Scratch animations, and basic Python/Blockly automation.`
      });
    } else if (grade === 11 || grade === 12) {
      setCheckResult({
        status: 'warning',
        message: `Grade ${grade} student detected. While eligible, they may find some early fundamentals simple. We recommend also reviewing our Student Skill Development Program (SSDP).`
      });
    } else if (grade > 0 && grade < 6) {
      setCheckResult({
        status: 'ineligible',
        message: `Grade ${grade} is slightly younger than our optimal age range (Grades 6-10). Reach out to admissions to discuss conditional placement or preparatory tracks!`
      });
    } else {
      setCheckResult({
        status: 'warning',
        message: 'Please enter a school grade between 1 and 12.'
      });
    }
  };

  // 12 Weeks Syllabus Breakdown
  const monthsData = {
    1: {
      title: "Month 1: Computer Fundamentals & Digital Literacy",
      description: "Laying down absolute basics of computer anatomy, file control, software structures, productivity essentials, and online safety protocols.",
      weeks: [
        {
          num: 1,
          title: "Introduction to Computers",
          topics: [
            "Understanding Computer Systems (CPU, RAM, Storage)",
            "Hardware vs Software distinctions",
            "Input, Output, and Peripheral Devices",
            "Operating Systems Basics (Windows, macOS, Linux)",
            "Computer Safety and Web Safety Best Practices"
          ],
          activity: "Brilliant Hands-on Challenge: Identifying real physical computer parts and basic operating system exploration tasks."
        },
        {
          num: 2,
          title: "Computer Operations",
          topics: [
            "File & Folder Management (Create, Rename, Delete, Move)",
            "Creating and saving structured documents safely",
            "Core keyboard typing habits and time-saving shortcuts",
            "Internet Basics and Google search optimizations",
            "Safe browsing and recognizing online risks (Phishing, scam warning signs)"
          ],
          activity: "Exciting Quest: Digital Organizing Race and deep internet scavenger search challenge."
        },
        {
          num: 3,
          title: "Productivity Tools",
          topics: [
            "Introduction to Word Processing (Formatting, layout, printing)",
            "Basic digital document design and styling",
            "Presentation Fundamentals (Creating slides, adding imagery, structure)",
            "Basic spreadsheets concept (Rows, columns, typing items)"
          ],
          activity: "Syllabus Project: Creating a Personal Portfolio profile document and designing a beautiful interactive presentation."
        },
        {
          num: 4,
          title: "Digital Skills Project",
          topics: [
            "Effective research techniques on safety portals",
            "Evaluation of fact-based resources / digital citizenship",
            "Collaborative work patterns and peer reviews",
            "Wrapping up Month 1 capstones"
          ],
          project: "Month 1 Major Milestone: Design & present slides on 'My Future Career' showcasing digital alignment!"
        }
      ]
    },
    2: {
      title: "Month 2: Problem Solving & Scratch Programming",
      description: "Developing computational thinking logic. Students move away from passive media consumption to active creative code logic using block interfaces.",
      weeks: [
        {
          num: 5,
          title: "Computational Thinking",
          topics: [
            "What is Problem Solving: Finding smart pathways",
            "Deconstructing problems: Breaking large challenges into smaller steps",
            "Introduction to Algorithms (Step-by-step recipes)",
            "Reading and drawing simple visual flowcharts"
          ],
          activity: "Brain Gym: Real-life algorithmic thinking puzzles and custom whiteboard drafting."
        },
        {
          num: 6,
          title: "Introduction to Scratch",
          topics: [
            "Familiarizing with Scratch Stage, Assets, Sprite, and Coordinate systems",
            "Applying Sprites and custom background graphics",
            "Harnessing Motion Blocks for physical object translation",
            "Triggering actions with foundational Event Blocks"
          ],
          project: "Scratch Project Milestone: Design and release an animated, themed story."
        },
        {
          num: 7,
          title: "Scratch Programming Fundamentals",
          topics: [
            "Storing variables (Scores, timer states, and user responses)",
            "Repeating actions with basic and nested Loops",
            "Building logic switches using Conditional Statements (If-Then)",
            "Harnessing User Inputs to control objects"
          ],
          project: "Interactive App: Code an multi-choice interactive educational quiz application."
        },
        {
          num: 8,
          title: "Scratch Game Development",
          topics: [
            "Fundamentals of immersive video game design",
            "Setting up dynamic scoring mechanisms and progress tracking",
            "Creating fine Character Movement controls using keys",
            "Harnessing Collision and game state Win/Loss limits"
          ],
          project: "First Video Game: Design and engineer a classic, responsive Maze Escape game!"
        }
      ]
    },
    3: {
      title: "Month 3: Basic Programming & Innovation",
      description: "Taking analytical logic to the absolute next level. Students explore textual code frameworks, design custom calculations, and finalize their master showpieces.",
      weeks: [
        {
          num: 9,
          title: "Programming Concepts",
          topics: [
            "Transitioning into structural textual code concepts",
            "Variables, string values, and numeric data types",
            "Iterative loop loops and boolean logic conditions",
            "The magic of reusable Functions (Inputs and Outputs)"
          ],
          activity: "Interactive Exercise: Code simulation games and solving spatial puzzle arrays."
        },
        {
          num: 10,
          title: "Beginner Programming",
          topics: [
            "Writing basic scripts using Blockly or high-level environments",
            "Solving visual logic problems by chaining code actions",
            "Debugging techniques: Finding, reading, and correcting code issues"
          ],
          project: "Application Build: Engineer a functional mathematical Desktop Calculator application."
        },
        {
          num: 11,
          title: "Creativity & Innovation",
          topics: [
            "Human-centric Design Thinking (Sympathize, Define, Create)",
            "Collaborative planning workflows and feature sizing",
            "Spotting campus problems and building innovative ideas"
          ],
          activity: "Innovation Huddle: Designing and proposing clever software solutions for school challenges."
        },
        {
          num: 12,
          title: "Final Capstone Project & Demo Day",
          topics: [
            "Polishing unique individual custom programs",
            "Debugging and reviewing codebase rules with peers",
            "Structuring a professional product slide elevator speech"
          ],
          project: "DEMO DAY EVENT: Present an interactive game, structured app, interactive quiz, or futuristic smart classroom prototype."
        }
      ]
    }
  };

  const scheduleDays = [
    { day: "Saturday", time: "10:00 AM - 12:00 PM", type: "Theory & Interactive Demo", desc: "Discovering core concepts through colorful, collaborative, and interactive lectures that introduce the week's key topics." },
    { day: "Sunday", time: "10:00 AM - 12:00 PM", type: "Hands-on Sandbox Practice", desc: "Diving straight into the IDE or Scratch terminal with real-time feedback, guided checklists, and peer coding sessions." },
    { day: "Monday", time: "6:00 PM - 8:00 PM", type: "Project Lab & Tech Support", desc: "Receiving professional 1-on-1 advisor assistance to resolve complex bugs, finish home exercises, or build portfolio capstones." }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Back Button */}
      <div className="flex justify-between items-center bg-white/50 p-4 rounded-xl border border-outline-variant/30 backdrop-blur-sm shadow-sm" id="csdp-top">
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
        <span className="text-xs font-mono text-[#0f766e] bg-[#eaf8f7] px-4 py-1.5 rounded-full uppercase tracking-wider font-bold border border-[#14b8a5]/20 flex items-center gap-1.5 animate-pulse">
          <Sparkles size={12} /> Now Accepting Enrollments
        </span>
      </div>

      {/* Hero Banner Area */}
      <section className="bg-gradient-to-br from-[#14b8a5]/10 via-[#0d9488]/5 to-transparent p-6 md:p-12 rounded-2xl border border-[#14b8a5]/20 text-left relative overflow-hidden shadow-sm">
        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#14b8a5]/10 text-primary px-3 py-1.5 rounded-full font-label-sm text-xs font-bold uppercase tracking-wider border border-[#14b8a5]/20">
            <School size={14} className="text-primary" /> Grades 6–10 / Ages 11–16
          </div>
          
          <h1 className="font-headline-lg text-on-background tracking-tight text-3xl md:text-5xl font-black">
            Children Skill Development Program <span className="text-primary">(CSDP)</span>
          </h1>
          
          <p className="font-body-lg text-secondary leading-relaxed text-base md:text-lg max-w-3xl">
            A thrilling 3-month physical and digital sandbox module designed to inspire school students with system knowledge, analytical thinking, dynamic flowcharting, and modern programming. Shift from visual gaming consumption to software engineering mastery!
          </p>

          <div className="flex gap-4 flex-wrap pt-4">
            <a 
              href="#enrollment"
              className="bg-brand-light text-on-brand-light font-label-md px-6 py-3.5 rounded-lg flex items-center gap-2 hover:bg-primary hover:text-on-primary transition-all shadow-md font-bold text-center"
            >
              Secure a Slot Now <ArrowRight size={18} />
            </a>
            <a 
              href="#curriculum"
              className="bg-white border border-outline text-secondary font-label-md px-6 py-3.5 rounded-lg hover:bg-surface-container-low transition-all text-center"
            >
              Explore Weekly Syllabus
            </a>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-8 translate-y-8 hidden md:block">
          <Gamepad2 size={280} className="text-[#14b8a5]" />
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
            className="bg-white p-5 border border-outline-variant/30 rounded-xl shadow-sm hover:shadow-md transition-all flex items-start gap-4"
          >
            <div className="p-3 bg-[#eaf8f7] text-[#0d9488] rounded-lg">
              {s.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-secondary uppercase tracking-wider">{s.label}</p>
              <p className="text-lg font-black text-on-background mt-0.5">{s.val}</p>
              <p className="text-xs text-on-surface-variant">{s.sub}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Program Objectives & Outcomes */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
        <div className="lg:col-span-12">
          <div className="bg-[#f0fdfa] border border-[#14b8a5]/30 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center">
            <div className="p-4 bg-white border border-[#14b8a5]/30 rounded-xl max-w-sm flex-shrink-0 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-[#eaf8f7] text-primary rounded-full flex items-center justify-center mb-4">
                <Target size={32} />
              </div>
              <h3 className="font-bold text-lg text-primary">Our Core Goal</h3>
              <p className="text-xs text-secondary mt-2 leading-relaxed">
                Empower younger students with foundational computer knowledge, logical thinking, problem-solving, and clean, modular coding models through playful mechanics and Capstones.
              </p>
            </div>
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold text-primary tracking-widest block">Ages 11-16 STEM Gateway</span>
              <h3 className="text-2xl font-black text-on-background">What makes CSDP different?</h3>
              <p className="text-sm text-secondary leading-relaxed">
                Rather than memorizing abstract syntax terms, CSDP takes high-school students on an adventure. We start with computational models and file mechanics, cross over to animated Scratch layouts, and wrap up with genuine, user-friendly programmatic interfaces. This builds concrete computational confidence.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="text-[#14b8a5] shrink-0 mt-0.5" size={16} />
                  <span className="text-xs font-medium text-secondary">Individual Computer Sandboxes</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="text-[#14b8a5] shrink-0 mt-0.5" size={16} />
                  <span className="text-xs font-medium text-secondary">80% Hands-on Coding vs 20% Theory</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section id="curriculum" className="space-y-6 pt-4">
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-on-background">Explore the 12-Week Journey</h2>
          <p className="text-sm text-secondary max-w-3xl">Select a curriculum phase below to view our specialized week-by-week layout, targets, and hands-on laboratory goals.</p>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-outline-variant/30">
          {([1, 2, 3] as const).map((mNum) => (
            <button
              key={mNum}
              onClick={() => {
                setActiveMonth(mNum);
                setExpandedWeek(mNum === 1 ? 1 : mNum === 2 ? 5 : 9);
              }}
              className={`flex-1 md:flex-none py-3.5 px-6 font-bold text-sm border-b-2 transition-all relative ${
                activeMonth === mNum 
                  ? 'border-primary text-primary bg-[#eaf8f7]/40' 
                  : 'border-transparent text-secondary hover:text-on-background hover:bg-surface-container-lowest'
              }`}
            >
              Month {mNum} {mNum === 1 ? '🖥️ Fundamentals' : mNum === 2 ? '🧩 Scratch Logic' : '⚡ Programming'}
            </button>
          ))}
        </div>

        {/* Selected Month Area */}
        <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="mb-8 space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#14b8a5]">Current Phase Highlights</span>
            <h3 className="text-xl md:text-2xl font-black text-on-background">{monthsData[activeMonth].title}</h3>
            <p className="text-sm text-secondary leading-relaxed max-w-4xl">{monthsData[activeMonth].description}</p>
          </div>

          <div className="space-y-4">
            {monthsData[activeMonth].weeks.map((wk) => (
              <div 
                key={wk.num}
                className={`border rounded-xl transition-all overflow-hidden ${
                  expandedWeek === wk.num 
                    ? 'border-[#14b8a5] bg-[#f0fdfa]/15 shadow-sm' 
                    : 'border-outline-variant/30 bg-white hover:border-[#14b8a5]/40'
                }`}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => setExpandedWeek(expandedWeek === wk.num ? null : wk.num)}
                  className="w-full text-left p-5 flex justify-between items-center gap-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-lg bg-[#eaf8f7] text-primary flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold uppercase leading-none opacity-80">Wk</span>
                      <strong className="text-lg font-black leading-none mt-1">{wk.num}</strong>
                    </span>
                    <div>
                      <h4 className="font-bold text-sm md:text-base text-on-background">{wk.title}</h4>
                      <p className="text-xs text-secondary mt-0.5">{wk.topics.length} core learning subtopics</p>
                    </div>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-secondary shrink-0 transition-transform duration-300 ${
                      expandedWeek === wk.num ? 'rotate-180 text-primary' : ''
                    }`} 
                  />
                </button>

                {/* Accordion Body */}
                <AnimatePresence initial={false}>
                  {expandedWeek === wk.num && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-outline-variant/30"
                    >
                      <div className="p-5 md:p-6 bg-surface-container-lowest/50 space-y-5">
                        <div className="space-y-2">
                          <h5 className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-1.5">
                            <BookOpen size={12} className="text-primary" /> Key Concepts Covered
                          </h5>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pl-1">
                            {wk.topics.map((tp, idx) => (
                              <li key={idx} className="text-xs md:text-sm text-on-surface flex items-start gap-2">
                                <span className="bg-[#14b8a5]/10 text-primary rounded-full p-0.5 shrink-0 mt-0.5">
                                  <Check size={10} strokeWidth={3} />
                                </span>
                                <span>{tp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {wk.activity && (
                          <div className="p-4 bg-[#eaf8f7] border border-[#14b8a5]/20 rounded-lg flex items-start gap-3.5">
                            <Smile className="text-[#0d9488] mt-0.5" size={18} />
                            <div>
                              <strong className="text-xs font-black text-[#0f766e] uppercase tracking-wide block">Interactive Workshop Activity</strong>
                              <p className="text-xs md:text-sm text-secondary mt-1">{wk.activity}</p>
                            </div>
                          </div>
                        )}

                        {wk.project && (
                          <div className="p-4 bg-[#fef3c7] border border-[#f59e0b]/30 rounded-lg flex items-start gap-3.5">
                            <Zap className="text-[#d97706] mt-0.5" size={18} />
                            <div>
                              <strong className="text-xs font-black text-[#b45309] uppercase tracking-wide block">Capstone Weekly Project</strong>
                              <p className="text-xs md:text-sm text-secondary mt-1 font-medium">{wk.project}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical outcomes list */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter pt-4">
        {/* Left Column: List of Learning Outcomes */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-on-background">Learning Outcomes</h2>
            <p className="text-sm text-secondary">By completing this 12-week program, young minds develop a full engineering repertoire:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Confident PC Operations", desc: "Understand operating systems, safe navigation, file trees, and keyboard shortcuts." },
              { title: "Productivity Expertise", desc: "Design word documents, spreadsheets models, and structured presentation materials." },
              { title: "Smart Digital Citizens", desc: "Develop safe browsing habits, evaluate resources, and establish online safety measures." },
              { title: "Flowchart & Problem Solving", desc: "Identify structural bottlenecks, design flowcharts, and compile precise instructions." },
              { title: "Scratch Game Architecture", desc: "Code complete loops, objects, events, character moves, and live parameters." },
              { title: "Foundational Scripting", desc: "Transition from GUI blocks to script terminals using variables, loops, and conditions." },
              { title: "Application Crafting", desc: "Design practical calculators, multi-level story sequences, and quiz engines." },
              { title: "STEM Identity & Focus", desc: "Present projects before peers and build confidence in computing careers." }
            ].map((oc, index) => (
              <div key={index} className="bg-white p-5 border border-outline-variant/30 rounded-xl space-y-2 hover:border-[#14b8a5]/30 hover:shadow-sm transition-all">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-primary shrink-0" size={18} />
                  <h4 className="font-bold text-sm md:text-base text-on-background">{oc.title}</h4>
                </div>
                <p className="text-xs md:text-sm text-secondary leading-relaxed pl-6">{oc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Certification Criteria & Dynamic Eligibility Checker */}
        <div className="lg:col-span-5 space-y-6">
          {/* Eligibility Validator Form */}
          <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="text-[#14b8a5]" size={20} />
              <h3 className="font-extrabold text-base text-on-background">Grade Eligibility Check</h3>
            </div>
            <p className="text-xs text-secondary mb-4 leading-relaxed">
              Verify if your child is suited for the young innovator track. Enter their school grade below:
            </p>
            <form onSubmit={handleCheckEligibility} className="space-y-4">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  placeholder="E.g., 7"
                  className="flex-grow px-4 py-2.5 rounded-lg border border-outline text-sm text-on-background bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                />
                <button 
                  type="submit"
                  className="bg-brand-light text-on-brand-light hover:bg-primary hover:text-on-primary font-bold px-4 py-2 text-xs rounded-lg transition-colors shadow-sm shrink-0 uppercase tracking-wider"
                >
                  Verify Grade
                </button>
              </div>

              {/* Eligibility Message Output */}
              <AnimatePresence mode="wait">
                {checkResult.status && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-3.5 rounded-lg border text-xs leading-relaxed ${
                      checkResult.status === 'eligible' 
                        ? 'bg-teal-50 border-[#14b8a5]/30 text-teal-800' 
                        : checkResult.status === 'warning' 
                        ? 'bg-amber-50 border-[#f59e0b]/30 text-amber-800' 
                        : 'bg-red-50 border-red-200 text-red-800'
                    }`}
                  >
                    {checkResult.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Certificate Badge Block */}
          <div className="bg-gradient-to-br from-secondary-container to-[#e6f4f2] border border-[#14b8a5]/30 p-6 rounded-2xl space-y-4 shadow-sm relative overflow-hidden">
            <div className="z-10 relative">
              <span className="bg-[#14b8a5] text-white text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm block w-fit mb-3">
                Credential Issued
              </span>
              <h3 className="font-extrabold text-lg text-[#0f766e]">Young Digital Innovator</h3>
              <p className="text-xs text-[#0f766e]/90 leading-relaxed font-semibold">
                Level 1 Certificate &bull; Accredited by TEADUSTECH
              </p>
              
              <div className="py-4 border-t border-b border-[#14b8a5]/20 mt-4 space-y-2.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#065f46]">Passing Parameters</span>
                <div className="flex items-center gap-2 text-xs font-medium text-secondary">
                  <Check className="text-[#14b8a5]" size={14} strokeWidth={2.5} /> 80% Live Class Attendance
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-secondary">
                  <Check className="text-[#14b8a5]" size={14} strokeWidth={2.5} /> Weekly assignments completion
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-secondary">
                  <Check className="text-[#14b8a5]" size={14} strokeWidth={2.5} /> Capstone physical coding submit
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-secondary">
                  <Check className="text-[#14b8a5]" size={14} strokeWidth={2.5} /> Live demo pitch review
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <Award className="text-[#14b8a5]" size={36} />
                <span className="text-[11px] text-secondary leading-tight">
                  High-performing students receive certified badges uploadable to LinkedIn and school logs.
                </span>
              </div>
            </div>
            
            {/* Dec background icon */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-4 translate-y-4">
              <Award size={130} className="text-[#14b8a5]" />
            </div>
          </div>
        </div>
      </section>

      {/* Schedule block */}
      <section className="bg-white border border-outline-variant/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-outline-variant/35 pb-5">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-on-background">Live Weekly Schedule</h3>
            <p className="text-xs md:text-sm text-secondary mt-0.5">Balancing school schedules. Programs are held during optimal weekend hours.</p>
          </div>
          <span className="bg-[#14b8a5]/10 text-primary border border-[#14b8a5]/30 font-bold px-4 py-1.5 rounded-full text-xs font-mono w-fit">
            Academic Calendar Year: 2026
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {scheduleDays.map((sh, idx) => (
            <div key={idx} className="border border-outline-variant/20 rounded-xl p-5 hover:bg-surface-container-low/20 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider block w-fit">
                  {sh.day}
                </span>
                <span className="text-sm font-bold text-primary block">{sh.type}</span>
                <p className="text-xs text-secondary leading-relaxed pt-1">{sh.desc}</p>
              </div>
              
              <div className="pt-3 border-t border-outline-variant/25 flex items-center justify-between text-xs text-secondary font-semibold">
                <span>Class Hours:</span>
                <span className="font-mono text-primary bg-[#eaf8f7] px-2 py-0.5 rounded border border-[#14b8a5]/10 font-bold">{sh.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Registration / Admission Callout */}
      <section id="enrollment" className="bg-[#0f766e] text-white p-8 md:p-12 rounded-3xl text-center space-y-6 relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          <Smile className="mx-auto text-[#fff] animate-bounce" size={40} />
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">Become a Young Digital Innovator</h2>
          <p className="font-body-md text-emerald-100/90 text-sm md:text-base leading-relaxed">
            Reserve a placement slot in our upcoming weekend laboratory cohort. Our team will review eligibility and share a setup guide within 24 business hours.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3.5">
            <button
              onClick={() => {
                alert("Thank you for your interest! Applications are now active. Our onboarding team (admissions@teadustech.com) will connect with you via email.");
              }}
              className="px-8 py-3.5 bg-white text-[#0f766e] font-bold text-sm rounded-lg hover:bg-emerald-50 transition-all shadow-md focus:outline-none"
            >
              Apply Online &rarr;
            </button>
            <a
              href="mailto:admissions@teadustech.com?subject=Children%20Skill%20Development%20Program%20Inquiry"
              className="px-8 py-3.5 bg-[#0d9488] border border-emerald-400/20 text-white font-bold text-sm rounded-lg hover:bg-[#0c857a] transition-all"
            >
              Request Syllabus PDF
            </a>
          </div>

          <p className="text-[10px] text-emerald-200/75 pt-3">
            Questions? Contact admissions directly at <strong>admissions@teadustech.com</strong> or WhatsApp +1 (206) 555-0182
          </p>
        </div>
        
        {/* Abstract graphics */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl translate-x-12 translate-y-12"></div>
      </section>

      {/* Simple navigation feedback to go up */}
      <div className="text-center">
        <button 
          onClick={() => {
            const elm = document.getElementById('csdp-top');
            elm?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-xs text-secondary hover:text-primary transition-colors inline-flex items-center gap-1.5"
        >
          <Compass size={12} /> Back to top of program details
        </button>
      </div>
    </div>
  );
}
