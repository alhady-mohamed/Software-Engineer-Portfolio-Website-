import React, { useState, useRef } from 'react';
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
  Target,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  X,
  Check,
  RotateCcw,
  Link as LinkIcon,
  Camera,
  UploadCloud,
  Image as ImageIcon,
} from 'lucide-react';
import { motion, animate, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CertificationItem } from '../types';
const defaultHeroPortrait = '/assets/aistudio/black_875c126c.png';

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
import { useLanguage } from '../src/context/LanguageContext';
import { useAdminAuth } from '../src/context/AdminAuthContext';

const DEFAULT_CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services • Cloud Infrastructure',
    dateOrValidity: 'Valid 2026',
    badgeText: 'Valid 2026',
    verificationUrl: 'https://aws.amazon.com/verification',
    iconType: 'award',
  },
  {
    id: 'cert-2',
    title: 'Frontend Developer Professional',
    issuer: 'Meta / Coursera • React & Modern Web',
    dateOrValidity: '2022',
    badgeText: 'Verified',
    verificationUrl: 'https://coursera.org/verify',
    iconType: 'code',
  },
  {
    id: 'cert-3',
    title: '1st Place Winner - Best Innovation',
    issuer: 'TechHackathon 2021 • Real-Time Web Platform',
    dateOrValidity: 'Winner',
    badgeText: 'Winner',
    verificationUrl: '',
    iconType: 'sparkles',
  },
];

const CERT_PRESETS = [
  {
    name: 'AWS Solutions Architect',
    title: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services (AWS)',
    dateOrValidity: 'Valid 2027',
    badgeText: 'AWS Certified',
    verificationUrl: 'https://aws.amazon.com/verification',
    iconType: 'award' as const,
  },
  {
    name: 'Google Cloud Engineer',
    title: 'Google Cloud Certified Professional Cloud Architect',
    issuer: 'Google Cloud Platform (GCP)',
    dateOrValidity: 'Valid 2026',
    badgeText: 'GCP Certified',
    verificationUrl: 'https://cloud.google.com/certification',
    iconType: 'award' as const,
  },
  {
    name: 'Meta Frontend Professional',
    title: 'Meta Frontend Developer Professional Certificate',
    issuer: 'Meta / Coursera • React & Modern Web',
    dateOrValidity: '2024',
    badgeText: 'Verified',
    verificationUrl: 'https://coursera.org/verify',
    iconType: 'code' as const,
  },
  {
    name: 'Hackathon 1st Place',
    title: '1st Place Winner - Best Technical Innovation',
    issuer: 'Global TechHackathon • Real-Time Web Platform',
    dateOrValidity: 'Winner',
    badgeText: 'Winner',
    verificationUrl: '',
    iconType: 'sparkles' as const,
  },
  {
    name: 'CompTIA Security+',
    title: 'CompTIA Security+ Certified Systems Engineer',
    issuer: 'CompTIA • Cybersecurity Infrastructure',
    dateOrValidity: 'Valid 2026',
    badgeText: 'Sec+ Certified',
    verificationUrl: 'https://www.comptia.org/certifications/security',
    iconType: 'shield' as const,
  },
];

const OFFICIAL_PORTRAIT_DARK = '/assets/aistudio/black_875c126c.png';
const OFFICIAL_PORTRAIT_GOLD = '/assets/aistudio/white__43ddcbfb.png';

const About: React.FC = () => {
  const { timelines, settings, updateSettings } = useSiteData();
  const { t, language } = useLanguage();
  const { isAuthenticated } = useAdminAuth();
  const isSomali = language === 'so';

  const aboutSettings = settings.about || {
    imageUrl: OFFICIAL_PORTRAIT_DARK,
    imageAlt: 'Mohamed Alhady - Senior Full-Stack & Creative Technologist',
    badgeBioTitle: 'SENIOR FULL-STACK & CREATIVE TECHNOLOGIST',
    availabilityStatus: 'Available for Select Projects',
    introBadge: 'Get to know me',
    headingTitle: 'Mohamed Alhady',
    leadText: 'Creative Strategist & Full-Stack Developer bridging engineering precision with cinematic storytelling and digital growth.',
    paragraph1: 'I help modern brands, startups, and enterprises translate ambitious ideas into scalable software, distinctive visual identities, and high-impact digital experiences.',
    paragraph2: 'With over five years at the intersection of technology and creative media, my work spans end-to-end web engineering, visual branding systems, high-production video direction, and data-backed digital marketing.',
    paragraph3: "I believe high-performing software should feel as refined as handcrafted art. When I'm not designing architectures or deploying code, I immerse myself in creative direction, motion design, and exploring cutting-edge web technologies.",
    metrics: [
      { id: 'm1', label: 'Years Experience', value: 5, suffix: '+' },
      { id: 'm2', label: 'Shipped Projects', value: 40, suffix: '+' },
      { id: 'm3', label: 'Client Partners', value: 15, suffix: '+' },
      { id: 'm4', label: 'Lines of Code', value: 1, suffix: 'M+' },
    ],
    skills: [
      { id: 's1', name: 'Software Development', percentage: 95 },
      { id: 's2', name: 'Branding & Visual Identity', percentage: 95 },
      { id: 's3', name: 'Video Production', percentage: 90 },
      { id: 's4', name: 'Social Media Marketing', percentage: 85 },
      { id: 's5', name: 'UI/UX Design', percentage: 90 },
      { id: 's6', name: 'Digital Strategy', percentage: 80 },
    ],
    techStack: [
      'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js',
      'PostgreSQL', 'Python', 'Framer Motion', 'Figma', 'Premiere Pro',
      'After Effects', 'Docker', 'GraphQL', 'Git'
    ],
    certifications: DEFAULT_CERTIFICATIONS,
    standardsTitle: 'Architecture Standards',
    standardsDescription: 'All projects adhere to WCAG accessibility, strict TypeScript validation, responsive design patterns, and SEO best practices.',
  };

  const currentImageUrl = aboutSettings.imageUrl || OFFICIAL_PORTRAIT_DARK;
  const isOfficialArtwork =
    currentImageUrl.includes('black_875c126c') ||
    currentImageUrl.includes('white__43ddcbfb') ||
    currentImageUrl.includes('about_portrait_custom') ||
    currentImageUrl.includes('about_portrait_gold');

  // Photo Upload Modal state for authenticated admins
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photoFormUrl, setPhotoFormUrl] = useState('');
  const [photoFormAlt, setPhotoFormAlt] = useState('');
  const [photoFormTitle, setPhotoFormTitle] = useState('');
  const [photoFormStatus, setPhotoFormStatus] = useState('');
  const [isSavingPhoto, setIsSavingPhoto] = useState(false);
  const [isCompressingPhoto, setIsCompressingPhoto] = useState(false);
  const photoFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenPhotoModal = () => {
    setPhotoFormUrl(aboutSettings.imageUrl || OFFICIAL_PORTRAIT_DARK);
    setPhotoFormAlt(aboutSettings.imageAlt || 'Mohamed Alhady - Senior Full-Stack & Creative Technologist');
    setPhotoFormTitle(aboutSettings.badgeBioTitle || 'SENIOR FULL-STACK & CREATIVE TECHNOLOGIST');
    setPhotoFormStatus(aboutSettings.availabilityStatus || 'Available for Select Projects');
    setIsPhotoModalOpen(true);
  };

  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressingPhoto(true);
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxWidth = 960;
          const maxHeight = 1200;

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          canvas.width = Math.max(1, width);
          canvas.height = Math.max(1, height);
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/jpeg', 0.82);
            setPhotoFormUrl(compressed);
          }
          setIsCompressingPhoto(false);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    } catch {
      setIsCompressingPhoto(false);
    }
  };

  const handleSavePhotoModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingPhoto(true);
    await updateSettings({
      about: {
        ...aboutSettings,
        imageUrl: photoFormUrl.trim() || aboutSettings.imageUrl || defaultHeroPortrait,
        imageAlt: photoFormAlt.trim() || aboutSettings.imageAlt || 'Mohamed Alhady - Professional Portrait',
        badgeBioTitle: photoFormTitle.trim() || aboutSettings.badgeBioTitle || 'Senior Full-Stack & Creative Technologist',
        availabilityStatus: photoFormStatus.trim() || aboutSettings.availabilityStatus || 'Available for Select Projects',
      },
    });
    setIsSavingPhoto(false);
    setIsPhotoModalOpen(false);
    showToast(isSomali ? 'Sawirka shakhsiga ah ee About page waa la keydiyay!' : 'Profile portrait successfully saved!');
  };

  // Certifications dynamic data and modal state
  const dynamicCertifications: CertificationItem[] =
    aboutSettings.certifications && aboutSettings.certifications.length > 0
      ? aboutSettings.certifications
      : DEFAULT_CERTIFICATIONS;

  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [isSavingCert, setIsSavingCert] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [certForm, setCertForm] = useState<{
    title: string;
    issuer: string;
    dateOrValidity: string;
    badgeText: string;
    verificationUrl: string;
    iconType: 'award' | 'code' | 'sparkles' | 'shield' | 'check';
  }>({
    title: '',
    issuer: '',
    dateOrValidity: 'Valid 2026',
    badgeText: 'Verified',
    verificationUrl: '',
    iconType: 'award',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAddCert = () => {
    setEditingCert(null);
    setCertForm({
      title: '',
      issuer: '',
      dateOrValidity: 'Valid ' + (new Date().getFullYear() + 2),
      badgeText: 'Verified',
      verificationUrl: '',
      iconType: 'award',
    });
    setIsCertModalOpen(true);
  };

  const handleOpenEditCert = (cert: CertificationItem) => {
    setEditingCert(cert);
    setCertForm({
      title: cert.title,
      issuer: cert.issuer,
      dateOrValidity: cert.dateOrValidity,
      badgeText: cert.badgeText || '',
      verificationUrl: cert.verificationUrl || '',
      iconType: cert.iconType || 'award',
    });
    setIsCertModalOpen(true);
  };

  const handleDeleteCert = async (certId: string, certTitle: string) => {
    if (!window.confirm(`Ma hubtaa inaad tirtirto shahaadada "${certTitle}"?`)) return;
    const currentList = aboutSettings.certifications && aboutSettings.certifications.length > 0
      ? aboutSettings.certifications
      : DEFAULT_CERTIFICATIONS;
    const updated = currentList.filter((c) => c.id !== certId);

    await updateSettings({
      about: {
        ...aboutSettings,
        certifications: updated,
      },
    });
    showToast(`Shahaadadii "${certTitle}" waa la tirtiray`);
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.title.trim()) return;

    setIsSavingCert(true);
    const currentList = aboutSettings.certifications && aboutSettings.certifications.length > 0
      ? aboutSettings.certifications
      : DEFAULT_CERTIFICATIONS;

    let updatedList: CertificationItem[];
    if (editingCert) {
      updatedList = currentList.map((c) =>
        c.id === editingCert.id
          ? { ...c, ...certForm, id: editingCert.id }
          : c
      );
    } else {
      const newCert: CertificationItem = {
        id: 'cert-' + Date.now(),
        ...certForm,
      };
      updatedList = [...currentList, newCert];
    }

    await updateSettings({
      about: {
        ...aboutSettings,
        certifications: updatedList,
      },
    });

    setIsSavingCert(false);
    setIsCertModalOpen(false);
    showToast(editingCert ? 'Shahaadada si guul leh ayaa loo cusbooneysiiyay!' : 'Shahaado cusub ayaa si guul leh loogu daray!');
  };

  const handleApplyPreset = (preset: typeof CERT_PRESETS[0]) => {
    setCertForm({
      title: preset.title,
      issuer: preset.issuer,
      dateOrValidity: preset.dateOrValidity,
      badgeText: preset.badgeText,
      verificationUrl: preset.verificationUrl,
      iconType: preset.iconType,
    });
  };

  const dynamicMetrics = aboutSettings.metrics && aboutSettings.metrics.length > 0 ? aboutSettings.metrics : [
    { id: 'm1', label: 'Years Experience', value: 5, suffix: '+' },
    { id: 'm2', label: 'Shipped Projects', value: 40, suffix: '+' },
    { id: 'm3', label: 'Client Partners', value: 15, suffix: '+' },
    { id: 'm4', label: 'Lines of Code', value: 1, suffix: 'M+' },
  ];

  const dynamicSkills = aboutSettings.skills && aboutSettings.skills.length > 0 ? aboutSettings.skills : SKILLS_DATA.map((s, idx) => ({
    id: `s_${idx}`,
    name: s.subject,
    percentage: s.A,
  }));

  const dynamicTechStack = aboutSettings.techStack && aboutSettings.techStack.length > 0 ? aboutSettings.techStack : [
    'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js',
    'PostgreSQL', 'Python', 'Framer Motion', 'Figma', 'Premiere Pro',
    'After Effects', 'Docker', 'GraphQL', 'Git'
  ];

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

  return (
    <div className="pt-28 pb-24 min-h-screen bg-dark text-slate-200">
      
      {/* SECTION 1: Page Header, Professional Portrait & Bio Overview */}
      <section id="about-intro" className="py-12 border-b border-white/5 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* COLUMN 1: Frameless Portrait Photo with Sculpted Signature Shape */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative flex flex-col items-center justify-center"
            >
              <div className="relative w-full max-w-[420px] sm:max-w-[460px] mx-auto flex flex-col items-center group">
                {/* Background Ambient Warm Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-tr from-amber-500/25 via-primary/20 to-yellow-500/15 rounded-full blur-[90px] opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

                {/* Cyber Dot Matrix Decorative Accent */}
                <div className="absolute -top-4 -right-4 w-28 h-28 bg-[radial-gradient(#facc15_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-30 pointer-events-none -z-10" />
                <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-[radial-gradient(#22c55e_1.5px,transparent_1.5px)] [background-size:14px_14px] opacity-25 pointer-events-none -z-10" />

                {/* Sculpted Signature Backdrop (Rendered for custom uploads to provide the exact iconic golden shield shape) */}
                {!isOfficialArtwork && (
                  <div className="absolute inset-x-2 sm:inset-x-4 top-6 bottom-12 rounded-[3.2rem] bg-gradient-to-br from-amber-500/25 via-slate-900/90 to-black/95 border-2 border-amber-500/60 -rotate-3 pointer-events-none -z-10 shadow-[0_0_50px_rgba(217,119,6,0.3)]">
                    {/* Watermark Shield inside the backdrop shape */}
                    <div className="absolute top-12 left-10 text-amber-500/15 pointer-events-none">
                      <ShieldCheck size={120} strokeWidth={1.2} />
                    </div>
                  </div>
                )}

                {/* Frameless Photo Presentation - No Rigid Box Frame! */}
                <div className="relative w-full flex items-center justify-center">
                  <img
                    src={currentImageUrl}
                    alt={aboutSettings.imageAlt || aboutSettings.headingTitle || 'Mohamed Alhady - Senior Full-Stack & Creative Technologist'}
                    style={{ marginTop: '0px', height: '600px', width: '408.663px', paddingLeft: '11px' }}
                    className={`max-h-none object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.85)] filter select-none transition-transform duration-700 ease-out group-hover:scale-[1.02] mt-0 pl-[11px] h-[600px] w-[408.663px] max-w-full ${
                      !isOfficialArtwork ? 'rounded-[2.8rem] p-2.5' : ''
                    }`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = OFFICIAL_PORTRAIT_DARK;
                    }}
                  />

                  {/* Top-Right Action: Beddel Sawirka for Logged-In Admin (Floats neatly without obstructing face) */}
                  {isAuthenticated && (
                    <button
                      type="button"
                      onClick={handleOpenPhotoModal}
                      className="absolute top-2 right-2 sm:right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/85 hover:bg-amber-500 text-amber-300 hover:text-slate-950 text-xs font-bold border border-amber-500/40 backdrop-blur-md shadow-2xl transition-all cursor-pointer group/btn"
                      title="Guji si aad sawirkaaga u beddesho ama cusub u soo galiso"
                    >
                      <Camera size={13} className="text-amber-400 group-hover/btn:text-slate-950 transition-colors" />
                      <span>{isSomali ? 'Beddel Sawirka' : 'Change Photo'}</span>
                    </button>
                  )}

                  {/* For custom uploaded photos, render the signature floating status pill at the bottom */}
                  {!isOfficialArtwork && (
                    <div
                      style={{ borderRadius: '40px', borderStyle: 'dotted' }}
                      className="absolute bottom-2 inset-x-3 sm:inset-x-5 p-3 rounded-[40px] border-dotted bg-gradient-to-r from-amber-600/90 via-slate-950/95 to-slate-950/95 backdrop-blur-md border border-amber-500/50 shadow-2xl flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-full border border-amber-400/60 overflow-hidden flex-shrink-0 bg-slate-900">
                        <img src={currentImageUrl} alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <p className="text-xs font-bold text-white tracking-wide truncate">
                            {aboutSettings.availabilityStatus || (isSomali ? 'Diyaar u ah Mashaariic Cusub' : 'Available for Select Projects')}
                          </p>
                        </div>
                        <p className="text-[10px] text-amber-200/90 font-semibold tracking-wider uppercase truncate">
                          {aboutSettings.badgeBioTitle || (isSomali ? 'Senior Full-Stack & Creative Technologist' : 'Creative Strategist & Full-Stack Developer')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sub-card: Fast Admin Shortcut */}
              {isAuthenticated && (
                <div className="mt-4 w-full max-w-[420px] flex items-center justify-between px-4 py-2 rounded-xl bg-slate-900/60 border border-white/5 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={13} className="text-amber-400" />
                    <span>Maamul sawirka & muuqaalka</span>
                  </span>
                  <Link
                    to="/admin/appearance?tab=about"
                    className="text-amber-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Admin Hub</span>
                    <ExternalLink size={11} />
                  </Link>
                </div>
              )}
            </motion.div>

            {/* COLUMN 2: Bio Narrative, Headings & Key Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Intro Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase">
                <User size={14} />
                <span>{aboutSettings.introBadge || (isSomali ? 'Is barasho & Hordhac' : 'Get to know me')}</span>
              </div>

              {/* Page Title & Main Heading */}
              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-3">
                  {isSomali ? 'Kusaabsan' : 'About'}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-secondary">
                    {aboutSettings.headingTitle || 'Mohamed Alhady'}
                  </span>
                </h1>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                  {aboutSettings.leadText || 'Creative Strategist & Full-Stack Developer bridging engineering precision with cinematic storytelling and digital growth.'}
                </p>
              </div>

              {/* Bio Narrative Paragraphs */}
              <div className="space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed pt-2 border-t border-white/5">
                <p className="text-white font-medium leading-relaxed">
                  {aboutSettings.paragraph1 || 'I help modern brands, startups, and enterprises translate ambitious ideas into scalable software, distinctive visual identities, and high-impact digital experiences.'}
                </p>
                <p>
                  {aboutSettings.paragraph2 || 'With over five years at the intersection of technology and creative media, my work spans end-to-end web engineering, visual branding systems, high-production video direction, and data-backed digital marketing.'}
                </p>
                <p>
                  {aboutSettings.paragraph3 || "I believe high-performing software should feel as refined as handcrafted art. When I'm not designing architectures or deploying code, I immerse myself in creative direction, motion design, and exploring cutting-edge web technologies."}
                </p>
              </div>

              {/* Key Performance Metrics Grid */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
                    {isSomali ? 'Guulaha & Tirakoobka Muhiimka ah' : 'Key Performance Metrics'}
                  </span>
                  <span className="text-[11px] text-gray-500 font-mono">Live Milestones</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {dynamicMetrics.map((m, idx) => (
                    <div
                      key={m.id || idx}
                      className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 text-center hover:border-primary/40 transition-colors shadow-lg group/metric"
                    >
                      <div className="text-2xl sm:text-3xl font-extrabold text-primary mb-1">
                        <AnimatedCounter to={Number(m.value) || 0} suffix={m.suffix || '+'} delay={0.2 + idx * 0.1} />
                      </div>
                      <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">{m.label}</div>
                    </div>
                  ))}
                </div>
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
              {dynamicSkills.map((skill, index) => (
                <div key={skill.id || skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-200 font-medium text-sm">{skill.name}</span>
                    <span className="text-primary font-bold text-sm tracking-widest">{skill.percentage}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/5 relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(100, Math.max(0, skill.percentage))}%` }}
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
                  {dynamicTechStack.map((tech) => (
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
                    <h4 className="text-white font-bold text-base mb-1">
                      {aboutSettings.standardsTitle || 'Architecture Standards'}
                    </h4>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {aboutSettings.standardsDescription || 'All projects adhere to WCAG accessibility, strict TypeScript validation, responsive design patterns, and SEO best practices.'}
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
              <span>{isSomali ? 'Waayo-aragnimo Shaqo' : 'Career Track'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isSomali ? 'Waayo-aragnimada Shaqada & Khibradda' : 'Work Experience & Roles'}
            </h2>
            <p className="text-gray-400 text-base">
              {isSomali
                ? 'Taariikh taxan oo ku saabsan hoggaaminta farsamada, shirkadaha la shaqeeyay, iyo mashaariicda la fuliyay.'
                : 'A chronological overview of impactful technical leadership, agency collaboration, and engineering delivery.'}
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
              <span>{isSomali ? 'Shahaadooyin & Aqoonsiyo' : 'Credentials'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isSomali ? 'Waxbarashada & Shahaadooyinka' : 'Education & Certifications'}
            </h2>
            <p className="text-gray-400 text-base">
              {isSomali
                ? 'Aqoonta heer jaamacadeed oo ay weheliyaan shahaadooyin caalami ah iyo aqoonsiyo la xaqiijiyay.'
                : 'Formal foundation in computer science paired with verified industry credentials and hackathon accolades.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 bg-slate-900/50 p-8 rounded-3xl border border-white/10 shadow-xl space-y-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-secondary/10 text-secondary rounded-xl border border-secondary/20">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {isSomali ? 'Shahaado Jaamacadeed' : 'Academic Degree'}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {isSomali ? 'Waxbarashada Sare ee Rasmiga ah' : 'Formal Higher Education'}
                  </span>
                </div>
              </div>

              {timelines.filter((t) => t.type === 'education').length > 0 ? (
                timelines
                  .filter((t) => t.type === 'education')
                  .map((edu) => (
                    <div key={edu.id} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                      <div className="flex justify-between items-start gap-3">
                        <h4 className="text-lg font-bold text-white">{edu.title}</h4>
                        <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20 shrink-0">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 font-medium">{edu.institution}</p>
                      <p className="text-xs text-gray-400 leading-relaxed">{edu.description}</p>
                      {edu.skills && edu.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {edu.skills.map((s, idx) => (
                            <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
              ) : (
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                  <div className="flex justify-between items-start gap-3">
                    <h4 className="text-lg font-bold text-white">B.S. in Software Engineering</h4>
                    <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">
                      2022 - 2026
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 font-medium">
                    University of Technology • Graduated with Honors
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Focus on Data Structures, Algorithms, Distributed Computing, Software Engineering, and Human-Computer Interaction (HCI).
                  </p>
                </div>
              )}
            </motion.div>

            {/* Certifications & Awards List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-7 bg-slate-900/50 p-8 rounded-3xl border border-white/10 shadow-xl space-y-5 relative"
            >
              {/* Toast Notification */}
              {toastMessage && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-xl bg-primary text-slate-950 font-bold text-xs shadow-xl flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 size={16} />
                  <span>{toastMessage}</span>
                </div>
              )}

              {/* Header with Title and Add Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl border border-primary/20">
                    <Award size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">
                        {isSomali ? 'Shahaadooyinka & Aqoonsiyada' : 'Certifications & Honors'}
                      </h3>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25">
                        {dynamicCertifications.length} {isSomali ? 'La Xaqiijiyay' : 'Verified'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {isSomali
                        ? 'Aqoonsiyo rasmi ah, liisanno la hubiyay & aqoonsi caalami ah'
                        : 'Accreditations, Verified Licenses & Industry Recognition'}
                    </span>
                  </div>
                </div>

                {isAuthenticated && (
                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <button
                      type="button"
                      onClick={handleOpenAddCert}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-slate-950 font-bold text-xs shadow-md shadow-primary/20 transition-all cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>{isSomali ? 'Ku dar Shahaado' : 'Add Certification'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Dynamic Certifications List */}
              <div className="space-y-3.5">
                {dynamicCertifications.map((cert) => {
                  const getIconComponent = (icon?: string) => {
                    switch (icon) {
                      case 'code':
                        return <Code2 size={20} />;
                      case 'sparkles':
                        return <Sparkles size={20} />;
                      case 'shield':
                        return <ShieldCheck size={20} />;
                      case 'check':
                        return <CheckCircle2 size={20} />;
                      case 'award':
                      default:
                        return <Award size={20} />;
                    }
                  };

                  const getIconColor = (icon?: string) => {
                    switch (icon) {
                      case 'code':
                        return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
                      case 'sparkles':
                        return 'bg-secondary/10 text-secondary border border-secondary/20';
                      case 'shield':
                        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
                      case 'check':
                        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
                      case 'award':
                      default:
                        return 'bg-primary/10 text-primary border border-primary/20';
                    }
                  };

                  const getBadgeColor = (icon?: string) => {
                    switch (icon) {
                      case 'code':
                        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20';
                      case 'sparkles':
                        return 'bg-secondary/10 text-secondary border-secondary/20';
                      case 'shield':
                        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                      case 'check':
                        return 'bg-blue-500/10 text-blue-300 border-blue-500/20';
                      case 'award':
                      default:
                        return 'bg-primary/10 text-primary border border-primary/20';
                    }
                  };

                  return (
                    <div
                      key={cert.id}
                      className="p-4 rounded-2xl border border-white/5 bg-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/30 hover:bg-white/[0.08] transition-all group"
                    >
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${getIconColor(cert.iconType)}`}>
                          {getIconComponent(cert.iconType)}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm group-hover:text-primary transition-colors">
                            {cert.title}
                          </h4>
                          <p className="text-xs text-gray-400">
                            {cert.issuer}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        {cert.badgeText && (
                          <span className={`text-xs font-bold px-3 py-1 rounded-full border shrink-0 ${getBadgeColor(cert.iconType)}`}>
                            {cert.badgeText}
                          </span>
                        )}

                        {cert.verificationUrl && (
                          <a
                            href={cert.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-primary/20 text-gray-300 hover:text-primary border border-white/10 hover:border-primary/30 text-xs font-medium transition-all"
                            title={isSomali ? 'Xaqiiji Shahaadada (Verify Credential)' : 'Verify Credential'}
                          >
                            <ExternalLink size={12} />
                            <span className="hidden sm:inline">{isSomali ? 'Xaqiiji' : 'Verify'}</span>
                          </a>
                        )}

                        {isAuthenticated && (
                          <div className="flex items-center gap-1 pl-1 border-l border-white/10">
                            <button
                              type="button"
                              onClick={() => handleOpenEditCert(cert)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                              title="Wax ka bedel shahaadadan"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCert(cert.id, cert.title)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                              title="Tirtir shahaadadan"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {dynamicCertifications.length === 0 && (
                  <div className="text-center py-10 px-4 rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
                    <Award size={32} className="mx-auto text-gray-500 mb-2 opacity-50" />
                    <p className="text-sm font-medium text-gray-300">
                      {isSomali ? 'Weli wax shahaadooyin ah kuma jiraan' : 'No credentials yet'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 mb-4">
                      {isSomali
                        ? 'Shahaadooyinka iyo aqoonsiyada rasmiga ah halkan ayay ka soo muuqanayaan.'
                        : 'Official certifications and verified licenses will appear here.'}
                    </p>
                    {isAuthenticated && (
                      <button
                        type="button"
                        onClick={handleOpenAddCert}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-slate-950 font-bold text-xs cursor-pointer"
                      >
                        <Plus size={14} />
                        <span>{isSomali ? 'Ku dar Shahaado' : 'Add Certification'}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Interactive Modal for Adding / Editing Certification */}
              <AnimatePresence>
                {isCertModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
                    >
                      {/* Modal Header */}
                      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                            <Award size={20} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">
                              {editingCert ? 'Wax ka bedel Shahaadada' : 'Ku dar Shahaado Cusub'}
                            </h3>
                            <p className="text-xs text-slate-400">
                              Geli macluumaadka shahaadada iyo xiriirka xaqiijinta (Verification URL)
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsCertModalOpen(false)}
                          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      {/* Quick Presets Selection */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                          Tusaalayaal Diyaar ah (Quick Presets):
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {CERT_PRESETS.map((preset) => (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => handleApplyPreset(preset)}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-primary/40 transition-all cursor-pointer flex items-center gap-1"
                            >
                              <Plus size={11} className="text-primary" />
                              <span>{preset.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Form inputs */}
                      <form onSubmit={handleSaveCert} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            Magaca Shahaadada (Title) *
                          </label>
                          <input
                            type="text"
                            required
                            value={certForm.title}
                            onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                            placeholder="e.g. AWS Certified Solutions Architect"
                            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:border-primary focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            Hay'adda Bixisay (Issuer & Category) *
                          </label>
                          <input
                            type="text"
                            required
                            value={certForm.issuer}
                            onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                            placeholder="e.g. Amazon Web Services • Cloud Infrastructure"
                            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:border-primary focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                              Xilliga / Taariikhda (Validity)
                            </label>
                            <input
                              type="text"
                              value={certForm.dateOrValidity}
                              onChange={(e) => setCertForm({ ...certForm, dateOrValidity: e.target.value })}
                              placeholder="e.g. Valid 2026 ama 2024"
                              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:border-primary focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                              Qoraalka Badge-ka (Badge Text)
                            </label>
                            <input
                              type="text"
                              value={certForm.badgeText}
                              onChange={(e) => setCertForm({ ...certForm, badgeText: e.target.value })}
                              placeholder="e.g. Valid 2026, Verified, Winner"
                              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:border-primary focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            Link-ga Xaqiijinta Shahaadada (Verification URL / Certificate Link)
                          </label>
                          <div className="relative">
                            <input
                              type="url"
                              value={certForm.verificationUrl}
                              onChange={(e) => setCertForm({ ...certForm, verificationUrl: e.target.value })}
                              placeholder="https://www.credly.com/badges/... ama link-ga shahaadada"
                              className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:border-primary focus:outline-none"
                            />
                            <LinkIcon size={14} className="absolute left-3 top-3 text-slate-500" />
                          </div>
                        </div>

                        {/* Icon Type Selection */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            Dooro Astaanta (Icon Style):
                          </label>
                          <div className="grid grid-cols-5 gap-2">
                            {[
                              { id: 'award', label: 'Award', icon: <Award size={18} /> },
                              { id: 'code', label: 'Code', icon: <Code2 size={18} /> },
                              { id: 'sparkles', label: 'Trophy', icon: <Sparkles size={18} /> },
                              { id: 'shield', label: 'Security', icon: <ShieldCheck size={18} /> },
                              { id: 'check', label: 'Verified', icon: <CheckCircle2 size={18} /> },
                            ].map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setCertForm({ ...certForm, iconType: item.id as any })}
                                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                                  certForm.iconType === item.id
                                    ? 'bg-primary/20 border-primary text-primary shadow-md'
                                    : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white'
                                }`}
                              >
                                {item.icon}
                                <span className="text-[10px] font-medium">{item.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Live Preview Box */}
                        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                            Horudhaca (Live Preview):
                          </span>
                          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                <Award size={18} />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-white">
                                  {certForm.title || 'Magaca Shahaadada'}
                                </p>
                                <p className="text-[11px] text-gray-400">
                                  {certForm.issuer || "Hay'adda ama Machadka"}
                                </p>
                              </div>
                            </div>
                            <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                              {certForm.badgeText || 'Verified'}
                            </span>
                          </div>
                        </div>

                        {/* Modal Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                          <button
                            type="button"
                            onClick={() => setIsCertModalOpen(false)}
                            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-750 transition-all cursor-pointer"
                          >
                            Ka noqo
                          </button>
                          <button
                            type="submit"
                            disabled={isSavingCert}
                            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-slate-950 shadow-lg shadow-primary/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                          >
                            <Check size={14} />
                            <span>{isSavingCert ? 'Waa la keydinayaa...' : 'Kaydi Shahaadada'}</span>
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
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

      {/* PHOTO UPLOAD & CUSTOMIZATION MODAL (Admin Only) */}
      <AnimatePresence>
        {isPhotoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Camera size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {isSomali ? 'Beddel Sawirkaaga (About Profile Photo)' : 'Customize About Profile Photo'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isSomali
                        ? 'Soo gali sawir cusub, dooro sawir diyaar ah, ama geli link-ga sawirkaaga'
                        : 'Upload a new headshot, paste an image link, or apply curated presets'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Live Preview & Image Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                {/* Photo Thumbnail Preview (Sculpted Frameless Presentation) */}
                <div className="sm:col-span-5 flex flex-col items-center">
                  <div className="relative w-36 h-48 flex items-center justify-center p-2 rounded-2xl bg-slate-950/90 border border-amber-500/30 shadow-xl group overflow-hidden">
                    {/* Background glow in preview */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-primary/10 to-transparent pointer-events-none" />

                    <img
                      src={photoFormUrl || OFFICIAL_PORTRAIT_DARK}
                      alt="Preview"
                      className="w-full h-full object-contain filter drop-shadow-md select-none"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = OFFICIAL_PORTRAIT_DARK;
                      }}
                    />
                    <span className="absolute bottom-1.5 inset-x-2 text-center text-[9px] font-bold text-amber-300 bg-slate-950/85 px-2 py-0.5 rounded-full border border-amber-500/30">
                      Live Preview (Sculpted)
                    </span>
                  </div>
                </div>

                {/* Upload & Quick Presets */}
                <div className="sm:col-span-7 space-y-2.5">
                  <input
                    type="file"
                    ref={photoFileInputRef}
                    onChange={handlePhotoFileUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => photoFileInputRef.current?.click()}
                    disabled={isCompressingPhoto}
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <UploadCloud size={16} />
                    <span>
                      {isCompressingPhoto
                        ? (isSomali ? 'Sawirka waa la habeeyaa...' : 'Optimizing photo...')
                        : (isSomali ? 'Ka soo xulo Kumbuyuutarka / Mobile-ka' : 'Upload from Device')}
                    </span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPhotoFormUrl(OFFICIAL_PORTRAIT_DARK)}
                      className="py-1.5 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-amber-500/30 text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Sawirka Rasmiga ah ee Sculpted (Dark Background)"
                    >
                      <Sparkles size={12} className="text-amber-400" />
                      <span>{isSomali ? 'Sawirka (Dark)' : 'Official (Dark)'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoFormUrl(OFFICIAL_PORTRAIT_GOLD)}
                      className="py-1.5 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-amber-500/30 text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Sawirka Rasmiga ah ee Sculpted (Gold Accent)"
                    >
                      <Sparkles size={12} className="text-yellow-400" />
                      <span>{isSomali ? 'Sawirka (Gold)' : 'Official (Gold)'}</span>
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPhotoFormUrl(settings.hero?.imageUrl || OFFICIAL_PORTRAIT_DARK)}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[10px] font-medium transition-all flex items-center justify-center gap-1 cursor-pointer"
                      title="Isticmaal sawirka ku jira qaybta Hero-ga"
                    >
                      <span>{isSomali ? 'Sawirka Hero' : 'Hero Photo'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoFormUrl(OFFICIAL_PORTRAIT_DARK)}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[10px] font-medium transition-all flex items-center justify-center gap-1 cursor-pointer"
                      title="Ku celi sawirka rasmiga ah"
                    >
                      <RotateCcw size={11} />
                      <span>{isSomali ? 'Asalka' : 'Reset'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleSavePhotoModal} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {isSomali ? 'Link-ga Sawirka (Direct Image URL)' : 'Direct Image URL'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={photoFormUrl}
                      onChange={(e) => setPhotoFormUrl(e.target.value)}
                      placeholder="https://... ama soo upload garee kor"
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:border-primary focus:outline-none"
                    />
                    <LinkIcon size={14} className="absolute left-3 top-3 text-slate-500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {isSomali ? 'Cinwaanka Xirfadlaha (Badge Subtitle)' : 'Professional Title'}
                    </label>
                    <input
                      type="text"
                      value={photoFormTitle}
                      onChange={(e) => setPhotoFormTitle(e.target.value)}
                      placeholder="Senior Full-Stack & Creative Technologist"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {isSomali ? 'Xaaladda Shaqada (Availability Status)' : 'Availability Status'}
                    </label>
                    <input
                      type="text"
                      value={photoFormStatus}
                      onChange={(e) => setPhotoFormStatus(e.target.value)}
                      placeholder="Available for Select Projects"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Alt Text (SEO & Accessibility)
                  </label>
                  <input
                    type="text"
                    value={photoFormAlt}
                    onChange={(e) => setPhotoFormAlt(e.target.value)}
                    placeholder="Mohamed Alhady - Creative Strategist & Full-Stack Developer"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Modal Footer */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <Link
                    to="/admin/appearance?tab=about"
                    onClick={() => setIsPhotoModalOpen(false)}
                    className="text-xs text-slate-400 hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <ExternalLink size={13} />
                    <span>{isSomali ? 'Tag Bogga Maamulka (Admin)' : 'Open Full Admin Hub'}</span>
                  </Link>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPhotoModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
                    >
                      {isSomali ? 'Ka noqo' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingPhoto}
                      className="px-6 py-2.5 rounded-xl bg-primary hover:opacity-90 text-slate-950 text-xs font-bold transition-all shadow-md shadow-primary/20 disabled:opacity-50 cursor-pointer flex items-center gap-2"
                    >
                      {isSavingPhoto ? (
                        <>
                          <RotateCcw size={14} className="animate-spin" />
                          <span>{isSomali ? 'Waa la badbaadinayaa...' : 'Saving...'}</span>
                        </>
                      ) : (
                        <>
                          <Check size={14} />
                          <span>{isSomali ? 'Badbaadi Sawirka' : 'Save Photo'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl shadow-emerald-500/30"
          >
            <CheckCircle2 size={16} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default About;