import React from 'react';
import { SKILLS_DATA, EXPERIENCE } from '../constants';
import {
  Palette,
  Video,
  Megaphone,
  Briefcase,
  GraduationCap,
  ChevronRight,
  User,
  Award,
  Sparkles,
  Code2,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Target
} from 'lucide-react';
import { motion, animate, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * AnimatedCounter Component
 * Animates a number up to a target value when scrolled into view.
 */
const AnimatedCounter = ({ to, suffix, delay = 0 }: { to: number; suffix: string; delay?: number }) => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        delay,
        duration: 2,
        ease: 'easeOut',
        onUpdate(value) {
          setCount(Math.floor(value));
        },
      });
      return () => controls.stop();
    }
  }, [to, delay, isInView]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

/**
 * About Component
 * Separated into clean, distinct, well-organized sections:
 * 1. Overview & Bio (Header, story, and animated key metrics)
 * 2. Core Pillars & Disciplines (Software, Branding, Video, Marketing)
 * 3. Technical Proficiency & Toolsets (Skill progress bars & tech stack)
 * 4. Work Experience & Career Journey (Structured vertical timeline)
 * 5. Education & Certifications (Academic background & certified credentials)
 * 6. Workflow & Methodology (4-step proven process from discovery to launch)
 * 7. Call To Action (Project inquiry prompt)
 */
import { useSiteData } from '../src/context/SiteDataContext';

const About: React.FC = () => {
  const { timelines } = useSiteData();
  const dynamicEducation = timelines.find((t) => t.type === 'education');
  const dynamicExperiences = timelines.filter((t) => t.type === 'experience');
  const experiencesToRender = dynamicExperiences.length > 0
    ? dynamicExperiences.map((e) => ({
        id: e.id,
        role: e.title,
        company: e.institution,
        period: e.period,
        description: e.description,
      }))
    : EXPERIENCE;

  const techStackList = [
    'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js',
    'PostgreSQL', 'Python', 'Framer Motion', 'Figma', 'Premiere Pro',
    'After Effects', 'Docker', 'GraphQL', 'Git'
  ];

  return (
    <div className="pt-28 pb-24 min-h-screen bg-dark text-slate-200">
      
      {/* SECTION 1: Page Header & Bio Overview */}
      <section id="about-intro" className="py-12 border-b border-white/5 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-4">
              <User size={14} />
              <span>Get to know me</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-secondary">Mohamed Alhady</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Creative Strategist & Full-Stack Developer bridging engineering precision with cinematic storytelling and digital growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Bio Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-7 space-y-5 text-gray-300 text-base leading-relaxed"
            >
              <p className="text-xl text-white font-medium leading-relaxed">
                I help modern brands, startups, and enterprises translate ambitious ideas into scalable software, distinctive visual identities, and high-impact digital experiences.
              </p>
              <p className="text-gray-400">
                With over five years at the intersection of technology and creative media, my work spans end-to-end web engineering, visual branding systems, high-production video direction, and data-backed digital marketing.
              </p>
              <p className="text-gray-400">
                I believe high-performing software should feel as refined as handcrafted art. When I'm not designing architectures or deploying code, I immerse myself in creative direction, motion design, and exploring cutting-edge web technologies.
              </p>
            </motion.div>

            {/* Key Performance Metrics Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5 grid grid-cols-2 gap-4"
            >
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 text-center hover:border-primary/40 transition-colors shadow-lg">
                <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">
                  <AnimatedCounter to={5} suffix="+" delay={0.2} />
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Years Experience</div>
              </div>
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 text-center hover:border-secondary/40 transition-colors shadow-lg">
                <div className="text-3xl md:text-4xl font-extrabold text-secondary mb-1">
                  <AnimatedCounter to={40} suffix="+" delay={0.3} />
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Shipped Projects</div>
              </div>
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 text-center hover:border-primary/40 transition-colors shadow-lg">
                <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">
                  <AnimatedCounter to={15} suffix="+" delay={0.4} />
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Client Partners</div>
              </div>
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 text-center hover:border-white/40 transition-colors shadow-lg">
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                  <AnimatedCounter to={1} suffix="M+" delay={0.5} />
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Lines of Code</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Core Pillars & Disciplines */}
      <section id="core-pillars" className="py-20 border-b border-white/5 bg-slate-900/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles size={14} />
              <span>Core Pillars</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Disciplines & Creative Philosophy
            </h2>
            <p className="text-gray-400 text-base">
              Four unified specializations engineered to build cohesive, high-impact digital presence from concept to code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Software Development */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-7 bg-slate-900/50 rounded-2xl border border-white/10 hover:border-primary/40 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Code2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">Software Engineering</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Type-safe frontends, scalable REST/GraphQL APIs, and resilient web architectures built with React, TypeScript, and Node.js.
                </p>
              </div>
              <ul className="space-y-2 border-t border-white/5 pt-4 text-xs text-gray-400 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Full-Stack Architecture
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Performance Optimization
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Responsive UI Systems
                </li>
              </ul>
            </motion.div>

            {/* Pillar 2: Branding */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-7 bg-slate-900/50 rounded-2xl border border-white/10 hover:border-secondary/40 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                  <Palette size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-secondary transition-colors">Branding & Identity</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Crafting memorable identities, design systems, and typographic guidelines that resonate with users and build brand authority.
                </p>
              </div>
              <ul className="space-y-2 border-t border-white/5 pt-4 text-xs text-gray-400 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Logo & Identity Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Brand Guidelines & Assets
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> UI/UX Design Systems
                </li>
              </ul>
            </motion.div>

            {/* Pillar 3: Video Production */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-7 bg-slate-900/50 rounded-2xl border border-white/10 hover:border-primary/40 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Video size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">Video Production</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  End-to-end cinematic narratives from scripting and storyboarding to advanced motion graphics, color grading, and final delivery.
                </p>
              </div>
              <ul className="space-y-2 border-t border-white/5 pt-4 text-xs text-gray-400 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Storyboarding & Direction
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Motion Graphics & VFX
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Post-Production Mastery
                </li>
              </ul>
            </motion.div>

            {/* Pillar 4: Social Media Marketing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-7 bg-slate-900/50 rounded-2xl border border-white/10 hover:border-secondary/40 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                  <Megaphone size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-secondary transition-colors">Digital Marketing</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Audience growth campaigns, social content frameworks, and analytical funnel strategies that amplify engagement and conversions.
                </p>
              </div>
              <ul className="space-y-2 border-t border-white/5 pt-4 text-xs text-gray-400 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Content & Growth Strategy
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Community Engagement
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Conversion Optimization
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Technical Proficiency & Toolsets */}
      <section id="skills-section" className="py-20 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-secondary/20 bg-secondary/10 text-secondary text-xs font-bold tracking-wider uppercase mb-3">
              <Cpu size={14} />
              <span>Technical Proficiency</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Skills, Frameworks & Toolsets
            </h2>
            <p className="text-gray-400 text-base">
              A balanced mastery of engineering fundamentals, design tools, and modern web infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Skill Bars */}
            <div className="lg:col-span-7 bg-slate-900/40 p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Target size={20} className="text-primary" />
                Core Competencies
              </h3>
              {SKILLS_DATA.map((skill, index) => (
                <div key={skill.subject}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-200 font-medium text-sm">{skill.subject}</span>
                    <span className="text-primary font-bold text-sm tracking-widest">{skill.A}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/5 relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.A}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-primary via-yellow-300 to-secondary rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stack Highlights & Badges */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/10 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Layers size={20} className="text-secondary" />
                  Technologies & Ecosystem
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {techStackList.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-white/5 text-gray-200 rounded-xl border border-white/10 hover:border-primary/40 hover:text-primary transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-xl text-primary shrink-0">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">Architecture Standards</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      All projects adhere to WCAG accessibility, strict TypeScript validation, responsive design patterns, and SEO best practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Work Experience & Career Journey */}
      <section id="work-experience" className="py-20 border-b border-white/5 bg-slate-900/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-3">
              <Briefcase size={14} />
              <span>Career Track</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Work Experience & Roles
            </h2>
            <p className="text-gray-400 text-base">
              A chronological overview of impactful technical leadership, agency collaboration, and engineering delivery.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 md:before:left-[23px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/60 before:via-secondary/40 before:to-transparent pl-12 md:pl-16">
              {experiencesToRender.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative group"
                >
                  {/* Timeline Badge Node */}
                  <div className="absolute -left-12 md:-left-16 mt-2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-dark bg-slate-900 text-primary group-hover:bg-primary group-hover:text-dark transition-colors shadow-lg z-10">
                    <Briefcase size={16} />
                  </div>

                  {/* Job Detail Card */}
                  <div className="p-7 rounded-2xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/90 hover:border-primary/30 transition-all duration-300 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                      <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                        {job.role}
                      </h4>
                      <span className="text-xs text-primary font-bold px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
                        {job.period}
                      </span>
                    </div>

                    <div className="text-sm text-gray-300 font-semibold mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary block" />
                      {job.company}
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Education & Certifications */}
      <section id="education-certifications" className="py-20 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-secondary/20 bg-secondary/10 text-secondary text-xs font-bold tracking-wider uppercase mb-3">
              <GraduationCap size={14} />
              <span>Credentials</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Education & Certifications
            </h2>
            <p className="text-gray-400 text-base">
              Formal foundation in computer science paired with verified industry credentials and hackathon accolades.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 bg-slate-900/50 p-8 rounded-3xl border border-white/10 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-secondary/10 text-secondary rounded-xl border border-secondary/20">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Academic Degree</h3>
                  <span className="text-xs text-gray-400">Formal Higher Education</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                <div className="flex justify-between items-start gap-3">
                  <h4 className="text-lg font-bold text-white">
                    {dynamicEducation?.title || "B.S. in Software Engineering"}
                  </h4>
                  <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">
                    {dynamicEducation?.period || "2022 - 2026"}
                  </span>
                </div>
                <p className="text-sm text-gray-300 font-medium">
                  {dynamicEducation?.institution
                    ? `${dynamicEducation.institution} • Graduated with Honors`
                    : "University of Technology • Graduated with Honors"}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {dynamicEducation?.description ||
                    "Focus on Data Structures, Algorithms, Distributed Computing, Software Engineering, and Human-Computer Interaction (HCI)."}
                </p>
              </div>
            </motion.div>

            {/* Certifications & Awards List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-7 bg-slate-900/50 p-8 rounded-3xl border border-white/10 shadow-xl space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 text-primary rounded-xl border border-primary/20">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Certifications & Honors</h3>
                  <span className="text-xs text-gray-400">Accreditations & Industry Recognition</span>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="p-4 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-between gap-4 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">AWS Certified Solutions Architect</h4>
                      <p className="text-xs text-gray-400">Amazon Web Services • Cloud Infrastructure</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 shrink-0">
                    Valid 2026
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-between gap-4 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Code2 size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Frontend Developer Professional</h4>
                      <p className="text-xs text-gray-400">Meta / Coursera • React & Modern Web</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-300 bg-white/5 px-3 py-1 rounded-full border border-white/10 shrink-0">
                    2022
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-between gap-4 hover:border-secondary/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">1st Place Winner - Best Innovation</h4>
                      <p className="text-xs text-gray-400">TechHackathon 2021 • Real-Time Web Platform</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20 shrink-0">
                    Winner
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Workflow & Strategic Methodology */}
      <section id="methodology-workflow" className="py-20 border-b border-white/5 bg-slate-900/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-3">
              <CheckCircle2 size={14} />
              <span>Proven Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Workflow & Delivery Methodology
            </h2>
            <p className="text-gray-400 text-base">
              A transparent, 4-step framework guaranteeing technical reliability, clear communication, and timely launch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-7 bg-slate-900/60 rounded-2xl border border-white/10 hover:border-primary/40 transition-all duration-300 relative group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl font-extrabold text-primary/40 group-hover:text-primary transition-colors">01</span>
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    STEP
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  Discovery & Strategy
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Clarifying project scope, target audiences, key performance metrics, and technological constraints before writing code.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-primary font-medium">
                <CheckCircle2 size={14} /> Scope & Roadmap
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-7 bg-slate-900/60 rounded-2xl border border-white/10 hover:border-secondary/40 transition-all duration-300 relative group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl font-extrabold text-secondary/40 group-hover:text-secondary transition-colors">02</span>
                  <div className="w-8 h-8 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary text-xs font-bold">
                    STEP
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-secondary transition-colors">
                  Architecture & Design
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Crafting interactive wireframes, component design systems, data schemas, and API contracts for seamless engineering.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-secondary font-medium">
                <CheckCircle2 size={14} /> Wireframes & Schemas
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-7 bg-slate-900/60 rounded-2xl border border-white/10 hover:border-primary/40 transition-all duration-300 relative group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl font-extrabold text-primary/40 group-hover:text-primary transition-colors">03</span>
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    STEP
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  Agile Development
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Iterative bi-weekly sprints, clean and type-safe codebase, continuous reviews, and responsive mobile-first implementations.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-primary font-medium">
                <CheckCircle2 size={14} /> Sprints & Clean Code
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-7 bg-slate-900/60 rounded-2xl border border-white/10 hover:border-secondary/40 transition-all duration-300 relative group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl font-extrabold text-secondary/40 group-hover:text-secondary transition-colors">04</span>
                  <div className="w-8 h-8 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary text-xs font-bold">
                    STEP
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-secondary transition-colors">
                  Testing & Delivery
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Comprehensive automated QA, performance audits, lighthouse optimization, smooth deployment, and ongoing post-launch support.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-secondary font-medium">
                <CheckCircle2 size={14} /> QA & Zero-Downtime Launch
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Collaboration CTA */}
      <section id="about-cta" className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-white/10 shadow-2xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 relative z-10">
              Ready to Collaborate on Your Next Project?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8 relative z-10">
              Whether you need end-to-end software engineering, high-production video, branding, or growth marketing, let's create something extraordinary.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-yellow-400 text-dark font-bold rounded-full transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Let's Talk <ArrowRight size={18} />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-full transition-all backdrop-blur-sm hover:border-white/20"
              >
                Explore Projects <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;