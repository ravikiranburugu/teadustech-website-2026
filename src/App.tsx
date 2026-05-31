import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ChatAssistant from './components/ChatAssistant';
import InternshipProgramView from './components/InternshipProgramView';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Mail, 
  MapPin, 
  CheckCircle, 
  Database, 
  ShieldCheck, 
  Cloud, 
  BrainCircuit, 
  School, 
  Layout, 
  Settings, 
  Code, 
  ArrowUpRight, 
  Share, 
  Wrench, 
  Bot, 
  Laptop, 
  GitBranch, 
  RefreshCcw,
  Terminal,
  Quote,
  ChevronRight,
  TrendingUp,
  Cpu,
  Rocket,
  Users,
  Box,
  GraduationCap
} from 'lucide-react';

// Types
type Page = 'home' | 'solutions' | 'resources' | 'about' | 'insights' | 'contact';

// --- Components ---

const Logo = ({ className = "h-8", showTagline = false }: { className?: string, showTagline?: boolean }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="relative w-10 h-10 flex items-center justify-center cursor-pointer"
    >
      {/* Hexagonal / Cube-like cluster approximation */}
      <motion.div 
        animate={{ rotate: [12, 10, 14, 12] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-primary/10 rounded-lg rotate-12" 
      />
      <motion.div 
        animate={{ rotate: [-6, -4, -8, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 border-2 border-primary/20 rounded-md -rotate-6" 
      />
      <div className="relative z-10 flex flex-col items-center justify-center text-primary">
         <motion.div 
           animate={{ y: [0, -1, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           className="flex gap-0.5 -mb-1"
         >
           <Box size={14} strokeWidth={2.5} />
           <GraduationCap size={14} strokeWidth={2.5} />
         </motion.div>
         <motion.div 
           animate={{ y: [0, 1, 0] }}
           transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
           className="flex items-center gap-0.5"
         >
           <Code size={14} strokeWidth={2.5} />
           <span className="text-[10px] font-bold leading-none">A</span>
         </motion.div>
      </div>
    </motion.div>
    <div className="flex flex-col">
      <span className="text-xl font-bold tracking-tighter text-primary leading-none">TEADUSTECH</span>
      {showTagline && (
        <span className="text-[9px] font-bold tracking-[0.15em] text-primary/70 uppercase mt-0.5">
          We Provide Solutions
        </span>
      )}
    </div>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sync scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
        <div className="max-w-[1280px] mx-auto h-16 px-margin flex items-center justify-between">
          <div 
            className="cursor-pointer group"
            onClick={() => navigate('home')}
          >
            <Logo showTagline />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 font-label-md">
            {[
              { id: 'solutions', label: 'Business Solutions' },
              { id: 'resources', label: 'Skill Hub' },
              { id: 'contact', label: 'About Us' }, // Mapping "About Us" to Contact for this demo
              { id: 'insights', label: 'Insights' },
              { id: 'consultants', label: 'Consultants', href: 'https://consultantspace.com/' }
            ].map((item) => (
              item.href ? (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-primary relative py-1 text-secondary font-medium"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id as Page)}
                  className={`transition-colors duration-200 hover:text-primary relative py-1 ${
                    currentPage === item.id 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-secondary font-medium'
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}
          </div>

          <div className="hidden md:block">
            <button 
              onClick={() => navigate('contact')}
              className="bg-brand-light text-on-brand-light px-4 py-2 rounded-default font-label-md hover:bg-primary hover:text-on-primary transition-all"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-0 w-full bg-background shadow-xl border-b border-outline-variant p-6 flex flex-col space-y-4 md:hidden"
            >
              <button onClick={() => navigate('solutions')} className="text-left py-2 font-medium">Business Solutions</button>
              <button onClick={() => navigate('resources')} className="text-left py-2 font-medium">Skill Hub</button>
              <button onClick={() => navigate('contact')} className="text-left py-2 font-medium">About Us</button>
              <button onClick={() => navigate('insights')} className="text-left py-2 font-medium">Insights</button>
              <a href="https://consultantspace.com/" target="_blank" rel="noopener noreferrer" className="text-left py-2 font-medium">Consultants</a>
              <button onClick={() => navigate('contact')} className="w-full bg-brand-light text-on-brand-light hover:bg-primary hover:text-on-primary transition-all py-3 rounded-lg font-medium">Get Started</button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-16 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <HomeView navigate={navigate} />
            </motion.div>
          )}
          {currentPage === 'solutions' && (
            <motion.div 
              key="solutions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <SolutionsView navigate={navigate} />
            </motion.div>
          )}
          {currentPage === 'resources' && (
            <motion.div 
              key="resources"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <SkillHubView navigate={navigate} />
            </motion.div>
          )}
          {currentPage === 'contact' && (
            <motion.div 
              key="contact"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
            >
              <ContactView />
            </motion.div>
          )}
          {['insights', 'about'].includes(currentPage) && (
             <motion.div 
               key="placeholder"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="max-w-[1280px] mx-auto px-margin py-xl"
             >
               <h1 className="font-headline-lg">Coming Soon</h1>
               <p className="font-body-lg text-on-surface-variant mt-4">We are currently curating high-level insights for you.</p>
               <button onClick={() => navigate('home')} className="mt-8 text-primary font-label-md flex items-center gap-2 group">
                 <ArrowRight size={16} className="rotate-180 transition-transform group-hover:-translate-x-1" /> Back to Home
               </button>
             </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-outline-variant/30 bg-surface-container-lowest py-16">
        <div className="max-w-[1280px] mx-auto px-margin flex flex-col md:flex-row justify-between items-center md:items-start space-y-12 md:space-y-0">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Logo className="mb-4" showTagline />
            <p className="text-label-sm text-secondary">© 2024 TEADUSTECH. All rights reserved.</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-8 text-label-sm text-secondary">
            <a href="#" className="hover:text-primary underline transition-all">Privacy Policy</a>
            <a href="#" className="hover:text-primary underline transition-all">Terms of Service</a>
            <a href="#" className="hover:text-primary underline transition-all">Contact Support</a>
            <a href="#" className="hover:text-primary underline transition-all">Careers</a>
          </nav>
        </div>
      </footer>
      <ChatAssistant />
    </div>
  );
}

// --- Views ---

function HomeView({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <section className="max-w-[1280px] mx-auto px-margin py-xl flex flex-col lg:flex-row items-center gap-lg">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 space-y-md"
        >
          <h1 className="font-headline-lg text-on-background">TEADUSTECH</h1>
          <p className="font-body-lg text-on-surface-variant max-w-xl">
            <b>We Provide Solutions.</b> Empowering sophisticated enterprises and aspiring experts with high-level architectural frameworks, robust automations, and targeted educational resources. Elevate your digital strategy today.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('solutions')}
            className="mt-4 bg-brand-light text-on-brand-light px-8 py-4 rounded-lg font-label-md flex items-center gap-2 hover:bg-primary hover:text-on-primary transition-all shadow-sm"
          >
            Explore Our Services <ArrowRight size={18} />
          </motion.button>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 w-full aspect-video lg:aspect-square rounded-xl overflow-hidden bg-surface-container border border-outline-variant relative group"
        >
          <motion.img 
            animate={{ 
              y: [0, -10, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxepaamEn7iqsoQ-T2fRMWA8FVml-vkeyO2CTjvhBRZh4-YTpEz11_WSJTFPgXK5b4r9gbj3-3AESkytXw284W9sifLGjWqCZohj33erQd_nAeugb0LZcAwxha6_ENPqfLQwYvzu6df7ejZpMl58smyWKyvtPXzmDZ9IPpyIiY_kE-ZS4knXkdRiHpYZOKhE0NrT4DwdDGt6Rt8T15Oj61wqTiXMk9MOE7YLVZ5zC7mU95yTacZEC_yt1pea_g-4R2HLOyXLNqguzB" 
            alt="Corporate Interface"
            className="w-full h-full object-cover opacity-90 transition-transform group-hover:scale-110 duration-700"
          />
        </motion.div>
      </section>

      {/* Solutions Bento Grid Preview */}
      <section className="max-w-[1280px] mx-auto px-margin py-xl bg-surface-container-low/50 rounded-xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-lg text-center"
        >
          <h2 className="font-headline-md">Business Solutions</h2>
          <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">Scalable infrastructure for the modern enterprise.</p>
        </motion.div>
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-gutter auto-rows-[240px]"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            className="md:col-span-2 bg-white rounded-xl border border-outline-variant p-8 flex flex-col items-center text-center justify-center group cursor-pointer hover:border-primary transition-all relative"
          >
            <div className="absolute top-6 right-6">
              <ArrowUpRight size={20} className="text-secondary group-hover:text-primary transition-colors" />
            </div>
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, 0] }}
              className="bg-tertiary-fixed w-14 h-14 rounded-lg flex items-center justify-center text-primary mb-4"
            >
              <Layout size={28} />
            </motion.div>
            <div>
              <h3 className="font-headline-sm mb-2">Web Building</h3>
              <p className="font-body-md text-on-surface-variant max-w-md">Architecting performant, accessible, and scalable digital storefronts and applications.</p>
            </div>
          </motion.div>
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl border border-outline-variant p-8 flex flex-col items-center text-center justify-center group cursor-pointer hover:border-primary transition-all"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="bg-tertiary-fixed w-14 h-14 rounded-lg flex items-center justify-center text-primary mb-4"
            >
              <Settings size={28} />
            </motion.div>
            <div>
              <h3 className="font-label-md font-bold mb-1">Maintenance</h3>
              <p className="text-sm text-on-surface-variant">Ongoing optimization and security patching for elite platforms.</p>
            </div>
          </motion.div>
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl border border-outline-variant p-8 flex flex-col items-center text-center justify-center group cursor-pointer hover:border-primary transition-all"
          >
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="bg-tertiary-fixed w-14 h-14 rounded-lg flex items-center justify-center text-primary mb-4"
            >
              <Bot size={28} />
            </motion.div>
            <div>
              <h3 className="font-label-md font-bold mb-1">Automations</h3>
              <p className="text-sm text-on-surface-variant">Streamlining workflows for maximum efficiency and reduced overhead.</p>
            </div>
          </motion.div>
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-white rounded-xl border border-outline-variant p-8 flex flex-col items-center text-center justify-center group cursor-pointer hover:border-primary transition-all relative overflow-hidden"
          >
            <div className="absolute top-6 right-6">
              <ArrowUpRight size={20} className="text-secondary group-hover:text-primary transition-colors" />
            </div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="bg-tertiary-fixed w-14 h-14 rounded-lg flex items-center justify-center text-primary mb-4"
            >
              <Code size={28} />
            </motion.div>
            <div>
              <h3 className="font-headline-sm mb-2">Product Design</h3>
              <p className="font-body-md text-on-surface-variant max-w-md">User-centric UI/UX methodologies that build trust and drive high-value conversions.</p>
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl" 
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Skill Hub CTA */}
      <section className="max-w-[1280px] mx-auto px-margin py-xl flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
        >
          <h2 className="font-headline-md mb-4">Skill Hub</h2>
          <p className="font-body-md text-on-surface-variant max-w-2xl mb-8">Bridging the gap between academic theory and practical, industry-grade expertise.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter w-full">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-surface-container rounded-xl p-lg flex flex-col items-center group cursor-pointer hover:bg-surface-container-high transition-all shadow-sm"
          >
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="bg-primary-container p-4 rounded-full text-white mb-4"
            >
              <School size={32} />
            </motion.div>
            <h3 className="font-headline-sm mb-3">Digital Learning</h3>
            <p className="font-body-md text-on-surface-variant mb-6">Access our library of masterclasses and certification tracks.</p>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('resources')} 
              className="w-full py-3 bg-brand-light text-on-brand-light rounded-lg font-label-md hover:bg-primary hover:text-on-primary transition-all"
            >
              Browse Curriculum
            </motion.button>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-surface-container rounded-xl p-lg flex flex-col items-center group cursor-pointer hover:bg-surface-container-high transition-all shadow-sm"
          >
            <motion.div 
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-tertiary-container p-4 rounded-full text-white mb-4"
            >
              <TrendingUp size={32} />
            </motion.div>
            <h3 className="font-headline-sm mb-3">Skill Gap Analysis</h3>
            <p className="font-body-md text-on-surface-variant mb-6">AI-driven assessment tools to identify precision knowledge deficiencies.</p>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('resources')} 
              className="w-full py-3 bg-brand-light text-on-brand-light rounded-lg font-label-md border-none hover:bg-primary hover:text-on-primary transition-all"
            >
              Start Assessment
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

function SolutionsView({ navigate }: { navigate: (p: Page) => void }) {
  const solutions = [
    { 
      icon: <Bot size={24} />, 
      title: "AI-Driven Workflow Automations", 
      description: "Deploy intelligent systems that learn and adapt. We integrate advanced AI models directly into your operational pipelines to eliminate redundant tasks, forecast trends, and accelerate decision-making.",
      tags: ["Predictive Analytics", "Process Automation"],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnuUkwcYUa5geU99eIRSMRH4HfvBk0ICYoFWkhY_bX3tfEQ4gCrfUTZOOjL_2M-z5KZQmLTQtAK_vZGIEcWF5aI3IiPXArffXXoxMdoO32WfSMYOrx0AG8mhLOOnACwkTbuF_FWByqS0TA9f3c-NXGVJAFlBggJZxWygmhnIcbsjpU9m1isJgLvfWmbkWnORLGOPD690pqDxz5WqSpJu7YMH6n6JsujBpRRwV_pKpbUMo10D8zcz-gUfLOywPonO5pXNoqoTCtU_xq",
      large: true
    },
    {
      icon: <Laptop size={24} />,
      title: "Custom Web & Mobile Development",
      description: "High-performance applications tailored to your specific ecosystem. We construct robust, cross-platform solutions focusing on seamless user experience and scalable backend architecture.",
      features: ["React & React Native", "Microservices Architecture"]
    },
    {
      icon: <GitBranch size={24} />,
      title: "GitHub Source Handling & Maintenance",
      description: "Maintain total control over your intellectual property. We provide expert repository management, implementing strict CI/CD pipelines and secure access controls.",
      tags: ["CI/CD Pipelines", "Code Audits"]
    },
    {
      icon: <RefreshCcw size={24} />,
      title: "Cloud Migration Services",
      description: "Transition smoothly to modern infrastructure. Our consultants orchestrate secure, zero-downtime migrations to AWS, Azure, or GCP. We optimize systems for high availability.",
      tags: ["AWS / Azure / GCP", "Zero-Downtime"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-[1280px] mx-auto px-margin py-xl"
    >
      <header className="text-center mb-xl">
        <h1 className="font-headline-lg mb-4">Enterprise Technology Solutions</h1>
        <p className="font-body-lg text-secondary max-w-3xl mx-auto">Empowering modern businesses with scalable, secure, and intelligent technical architecture designed by elite consultants.</p>
      </header>

      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-12 gap-gutter"
      >
        {solutions.map((s, idx) => (
          <motion.div 
            key={idx}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -5 }}
            className={`bg-white border border-outline-variant rounded-xl p-margin flex flex-col transition-all hover:shadow-lg ${s.large ? 'md:col-span-8 flex-col md:flex-row gap-8' : (idx === 1 ? 'md:col-span-4' : 'md:col-span-6')}`}
          >
            <div className="flex-1 space-y-4">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="w-12 h-12 bg-tertiary-fixed rounded-lg flex items-center justify-center text-primary"
              >
                {s.icon}
              </motion.div>
              <h2 className="font-headline-sm">{s.title}</h2>
              <p className="font-body-md text-secondary">{s.description}</p>
              
              {s.tags && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {s.tags.map(t => (
                    <motion.span 
                      whileHover={{ scale: 1.1 }}
                      key={t} 
                      className="bg-tertiary-fixed text-primary px-3 py-1.5 rounded-full font-label-sm"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              )}
              
              {s.features && (
                <ul className="space-y-2 pt-4 border-t border-outline-variant/30">
                  {s.features.map(f => (
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      key={f} 
                      className="flex items-center gap-2 font-label-md text-secondary"
                    >
                      <CheckCircle size={16} className="text-primary" /> {f}
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
            
            {s.large && (
              <div className="flex-1 aspect-video md:aspect-auto rounded-lg overflow-hidden bg-surface-container relative group">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={s.image} 
                  alt={s.title} 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      <section className="mt-xl bg-surface-container border border-outline-variant/50 rounded-xl p-lg text-center">
        <h3 className="font-headline-md mb-2">Ready to Modernize Your Operations?</h3>
        <p className="font-body-md text-secondary mb-8">Connect with our enterprise consulting team to architect a solution that aligns precisely with your strategic objectives.</p>
        <button 
          onClick={() => navigate('contact')}
          className="bg-brand-light text-on-brand-light px-8 py-3 rounded-lg font-label-md flex items-center gap-2 mx-auto hover:bg-primary hover:text-on-primary transition-all"
        >
          Schedule a Consultation <ArrowRight size={18} />
        </button>
      </section>
    </motion.div>
  );
}

function SkillHubView({ navigate }: { navigate: (p: Page) => void }) {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'internship'>('overview');

  const programs = [
    { 
      icon: <School size={32} />, 
      title: "Children Skill Development Program", 
      acronym: "CSDP",
      target: "High School Students",
      text: "Empowering high school students with essential IT skills to secure a leading position in the competitive digital world.",
      support: "Support via Slack, Email, and WhatsApp groups",
      skills: ["Scratch", "Computer Operations", "Basic Programming", "Problem Solving Skills"]
    },
    { 
      icon: <GraduationCap size={32} />, 
      title: "Student Skill Development Program", 
      acronym: "SSDP",
      target: "Graduates & Postgraduates",
      text: "Rigorous preparation for graduates to bridge the gap between academic theory and industry reality. This is our core Software Development Internship Readiness Program.",
      support: "Support via Slack, Email, and WhatsApp groups",
      skills: ["Computational Thinking", "DS & Algorithms", "System Design", "JS / Python / Java", "React / Node / Spring Boot", "MySQL & MongoDB", "Cloud: AWS/GCP"],
      actionLabel: "Explore Syllabus & Practice SOP"
    },
    { 
      icon: <Cpu size={32} />, 
      title: "Working Professionals", 
      target: "Industry Experts",
      text: "Precision skill gap analysis for professionals. We provide targeted training to keep you updated with the latest AI and emerging technologies.",
      skills: ["AI Strategy", "Tech Stack Modernization", "Advanced Architecture"]
    },
    { 
      icon: <Rocket size={32} />, 
      title: "Global Bootcamps", 
      target: "Everyone",
      text: "Immersive workshops designed to introduce participants to practical skills and techniques they can immediately apply to their daily work and lives.",
      skills: ["Team Building", "Collaborative Learning", "Personalized Mentoring"]
    }
  ];

  if (activeSubTab === 'internship') {
    return (
      <div className="max-w-[1280px] mx-auto px-margin py-6">
        <InternshipProgramView onBackToOverview={() => setActiveSubTab('overview')} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-[1280px] mx-auto px-margin py-xl"
    >
      {/* Dynamic Recruitment Banner */}
      <div className="mb-8 p-6 bg-gradient-to-r from-primary/5 to-brand-light/10 border border-[#14b8a5]/30 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-sm">
        <div>
          <span className="bg-[#14b8a5] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-sm">
            Admissions Active
          </span>
          <h4 className="font-headline-sm text-base mt-2.5 font-bold text-on-surface">
            16-Week Mentored Software Development Internship Readiness Program
          </h4>
          <p className="text-xs text-secondary font-body-sm mt-1">
            Unpaid learning sandbox program designed for final-year students and graduates with 1-on-1 expert checkpoints review.
          </p>
        </div>
        <button 
          onClick={() => setActiveSubTab('internship')}
          className="bg-brand-light text-on-brand-light font-label-md hover:bg-primary hover:text-on-primary px-5 py-2.5 rounded-lg flex items-center gap-1.5 shrink-0 transition-colors shadow-sm font-bold scale-100 active:scale-95 duration-150"
        >
          Review SOP & Register <ArrowRight size={16} />
        </button>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center mb-xl">
        <div className="lg:col-span-6 space-y-md">
          <div className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-full font-label-sm uppercase tracking-wider">
            <School size={14} /> Educational Excellence
          </div>
          <h1 className="font-headline-lg text-on-background">Empowering Next-Gen Technical Experts</h1>
          <p className="font-body-lg text-on-surface-variant max-w-xl">
            From foundational school-age learning to advanced professional mastery, TEADUSTECH Skill Hub provides the architectural framework for your career growth.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button 
              onClick={() => setActiveSubTab('internship')}
              className="bg-brand-light text-on-brand-light px-6 py-3 rounded-lg font-label-md flex items-center gap-2 hover:bg-primary hover:text-on-primary transition-all shadow-sm font-bold"
            >
              View Detailed Curriculum <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('programs-list');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white border border-outline px-6 py-3 rounded-lg font-label-md hover:bg-brand-light transition-colors"
            >
              Explore Tracks
            </button>
          </div>
        </div>
        <div className="lg:col-span-6 rounded-xl overflow-hidden shadow-lg border border-outline-variant/30 aspect-video relative group">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvl-sLk4LltT8Dk_59m9ayzVgjtvrsjx0A3qePGlLUZ8iNHvN7vUAx2_80oua4fzpaFLStXxCJlV1pSyyeO8c2hKZm1CCskfyOItyB7lf2cNGzgOkAuAq4fshD6YPX9Nkxf8OiNm67e6CQKpglgeXT2-t4yqI-5uNcvY9SWvLTOCdKjA6FvlXI7SIKNMmdG-SHZ9fpBade_GtDrCOD_Uq_KitSwAY7-EC0SeMn9eJ4QhIhH-DTgcr2U18DeyWKeUPuau-uLXHAYW7X" 
            alt="Collaborative Workspace"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
        </div>
      </section>

      {/* Skill Gap Analysis Dashboard */}
      <section className="mb-xl bg-surface-container-low rounded-xl p-margin lg:p-lg border border-outline-variant/50 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-center relative z-10">
          <div className="lg:col-span-5 space-y-md">
            <h2 className="font-headline-md text-primary">Skill Gap Diagnostic</h2>
            <p className="font-body-md text-on-surface-variant">
              Precisely identify deficiencies and calibrate your learning path against industry-grade standards.
            </p>
            <ul className="space-y-4 pt-4">
              {["Industry-calibrated benchmarks", "Automated curriculum mapping", "Real-time competency tracking"].map((l) => (
                <li key={l} className="flex items-center gap-3 text-on-surface font-body-md">
                  <CheckCircle size={20} className="text-secondary" /> {l}
                </li>
              ))}
            </ul>
            <div className="pt-8">
              <button 
                onClick={() => {
                  const element = document.getElementById('programs-list');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-brand-light text-on-brand-light px-10 py-4 rounded-lg font-label-md hover:bg-primary hover:text-on-primary transition-all shadow-md"
              >
                Start Global Diagnostic
              </button>
            </div>
          </div>
          <div className="lg:col-span-7 bg-white border border-outline-variant/30 rounded-xl p-margin shadow-xl">
             <div className="flex justify-between items-center mb-8 pb-4 border-b border-outline-variant/30">
               <span className="font-label-md text-secondary">Diagnostic: SSDP Level Analysis</span>
               <span className="bg-primary/5 text-primary px-3 py-1 rounded-sm text-label-sm font-bold">Standard: Senior Associate</span>
             </div>
             <div className="space-y-6">
               {[
                 { label: "Systems Design", sub: "Priority Fix", val: "38%", col: "bg-red-400" },
                 { label: "JavaScript / React Hub", sub: "Proficient", val: "82%", col: "bg-primary" },
                 { label: "Cloud: AWS/GCP", sub: "Foundation Stage", val: "55%", col: "bg-secondary" }
               ].map((bar) => (
                 <div key={bar.label}>
                   <div className="flex justify-between font-label-sm mb-2">
                     <span className="text-on-surface font-medium">{bar.label}</span>
                     <span className={bar.val.startsWith('3') || bar.val.startsWith('4') ? 'text-red-500 font-bold' : 'text-on-surface-variant'}>{bar.sub}</span>
                   </div>
                   <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: bar.val }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full ${bar.col} rounded-full`} 
                     />
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section id="programs-list" className="mb-xl">
        <div className="flex justify-between items-end mb-10">
           <div>
             <h2 className="font-headline-md">Skill Hub Programs</h2>
             <p className="font-body-md text-on-surface-variant mt-2">Specialized development tracks for every stage of your technical journey.</p>
           </div>
           <button 
             onClick={() => setActiveSubTab('internship')}
             className="text-primary font-label-md hover:underline flex items-center gap-1 hidden md:flex font-bold"
           >
             Full Track Details <ChevronRight size={16} />
           </button>
        </div>
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-gutter"
        >
           {programs.map((p, idx) => (
             <motion.div 
               variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
               whileHover={{ y: -10 }}
               key={idx} 
               onClick={() => {
                 if (p.acronym === 'SSDP') {
                   setActiveSubTab('internship');
                 }
               }}
               className={`bg-white border p-lg rounded-2xl shadow-sm hover:border-primary/50 transition-all cursor-pointer group flex flex-col items-center text-center hover:shadow-2xl ${
                 p.acronym === 'SSDP' ? 'border-[#14b8a5] ring-2 ring-[#14b8a5]/10' : 'border-outline-variant/30'
               }`}
             >
                <div className="flex flex-col items-center mb-6 w-full">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="p-4 bg-primary/5 text-primary rounded-xl mb-4"
                  >
                    {p.icon}
                  </motion.div>
                  <div className="flex flex-col items-center">
                    {p.acronym && <span className="text-2xl font-black text-primary/10 mb-1 leading-none">{p.acronym}</span>}
                    <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-sm text-[10px] uppercase font-bold tracking-tighter">{p.target}</span>
                  </div>
                </div>
                
                <h3 className="font-headline-sm mb-4 group-hover:text-primary transition-colors underline decoration-primary/20 underline-offset-4">{p.title}</h3>
                <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed flex-grow">{p.text}</p>
                
                {p.support && (
                  <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-surface-container-lowest rounded-lg border border-primary/5 w-full">
                    <Users size={16} className="text-primary" />
                    <span className="text-xs font-bold text-primary/80 uppercase tracking-widest">{p.support}</span>
                  </div>
                )}

                {p.actionLabel && (
                  <div className="w-full mb-6 py-2 px-4 bg-[#eaf8f7] text-primary border border-[#14b8a5]/30 rounded-lg text-xs font-bold uppercase tracking-wider group-hover:bg-[#14b8a5] group-hover:text-white transition-all">
                    {p.actionLabel} &rarr;
                  </div>
                )}

                <div className="space-y-3 w-full">
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-2">Curriculum Highlights</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {p.skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-surface-container text-secondary text-xs rounded-lg font-medium border border-outline-variant/20 hover:border-primary/30 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
             </motion.div>
           ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-xl border-t border-outline-variant/30">
        <h2 className="font-headline-md text-center mb-xl">Participant Outcomes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
           {[
             { name: "Sarah J.", role: "Senior Solutions Architect", text: "The Skill Gap Analysis tool pinpointed exact deficiencies in my system design logic. The subsequent learning path was brutally efficient—no fluff, just high-density technical knowledge." },
             { name: "Marcus T.", role: "Principal Data Engineer", text: "TEADUSTECH resources maintain a standard of academic rigor rarely found in corporate training. Highly recommended for senior individual contributors." }
           ].map((t, idx) => (
             <div key={idx} className="bg-white p-margin rounded-xl border border-outline-variant/30 shadow-sm space-y-6">
               <Quote size={32} className="text-outline-variant fill-current opacity-20" />
               <p className="font-body-md italic text-on-surface">"{t.text}"</p>
               <div className="flex items-center gap-4 pt-4">
                 <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center font-headline-sm text-on-secondary-container uppercase">{t.name[0]}</div>
                 <div>
                   <div className="font-label-md">{t.name}</div>
                   <div className="text-label-sm text-on-surface-variant">{t.role}</div>
                 </div>
               </div>
             </div>
           ))}
        </div>
      </section>
    </motion.div>
  );
}

function ContactView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-[1280px] mx-auto px-margin py-xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
        {/* Left Col */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, x: -20 },
            show: { 
              opacity: 1, 
              x: 0,
              transition: { staggerChildren: 0.1 }
            }
          }}
          initial="hidden"
          animate="show"
          className="lg:col-span-5 space-y-margin h-full flex flex-col justify-center"
        >
          <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} className="space-y-4">
            <h1 className="font-headline-lg">Let's Build</h1>
            <p className="font-body-lg text-on-surface-variant">
              Whether you are exploring enterprise-grade Business Solutions or seeking comprehensive Skill Hub pathways, our advisory team is positioned to collaborate and elevate your operational strategy.
            </p>
          </motion.div>
          
          <div className="space-y-8">
            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary"><Mail size={24} /></div>
              <div>
                <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Direct Inquiry</p>
                <a href="mailto:contact@teadustech.com" className="font-body-md font-medium hover:text-primary transition-colors">contact@teadustech.com</a>
              </div>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary"><MapPin size={24} /></div>
              <div>
                <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Headquarters</p>
                <p className="font-body-md font-medium">Global Operations Center</p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}
            className="w-full aspect-video rounded-xl overflow-hidden bg-surface-container border border-outline-variant shadow-sm relative mt-4"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSROTO6CyDVhGkpqPMqqMOsZQIdgER9kby6GtGpOt0jnHuPET6Y29HE3HkaWAQxCK2vij85BE8xTM1MLSK1hSwoNQK_sD4H3Qovz5E6k-Wl7ToiOI2_hokVeCE6GSDaS_2b32jJ9UUD7rOwOmbPM5Q_ix1nM3XMR70jLucbCVzTBPwfwRs96NLCfNCKXdb1Fs555D3U22_ioUbVsgcWYX1Nqy7p1Hr9i1qfbSs-D9rxIQdf_pu0xWFoJoFvbCGJyvSG1nHOgnqNHF0" 
              alt="Installation" 
              className="w-full h-full object-cover grayscale opacity-60 transition-all duration-700 hover:grayscale-0 hover:opacity-100"
            />
          </motion.div>
        </motion.div>

        {/* Right Col - Inquiry Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-7 bg-white rounded-xl border border-outline-variant/30 shadow-2xl p-margin lg:p-lg space-y-8"
        >
           <h2 className="font-headline-sm">Professional Inquiry</h2>
           <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant" htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant" htmlFor="email">Corporate Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline/50"
                  />
                </div>
             </div>
             
             <div className="space-y-2">
               <label className="font-label-md text-on-surface-variant" htmlFor="service">Primary Interest</label>
               <select 
                 id="service" 
                 defaultValue=""
                 className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none bg-no-repeat bg-right bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik02IDlsNiA2IDYtNiIvPjwvc3ZnPg==')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center]"
               >
                 <option value="" disabled>Select an area of interest</option>
                 <option value="business">Business Solutions</option>
                 <option value="student">Skill Hub</option>
                 <option value="general">General Advisory</option>
               </select>
             </div>

             <div className="space-y-2">
               <label className="font-label-md text-on-surface-variant" htmlFor="details">Inquiry Details</label>
               <textarea 
                 id="details" 
                 rows={5}
                 placeholder="Provide context regarding your operational goals..."
                 className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-outline/50"
               />
             </div>

             <div className="flex justify-end pt-4">
               <button type="submit" className="bg-brand-light text-on-brand-light px-10 py-3 rounded-lg font-label-md flex items-center gap-2 hover:bg-primary hover:text-on-primary transition-all shadow-sm">
                 Submit Inquiry <ArrowRight size={18} />
               </button>
             </div>
           </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
