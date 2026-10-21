import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, writeBatch } from 'firebase/firestore';
import { readFileSync } from 'fs';

const config = JSON.parse(readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = config.firestoreDatabaseId ? getFirestore(app, config.firestoreDatabaseId) : getFirestore(app);

const PROJECTS = [
  {
    id: '1',
    title: 'E-Commerce Dashboard',
    description: 'A comprehensive analytics dashboard for online retailers featuring real-time data visualization, inventory management, and revenue trends.',
    summary: 'A comprehensive analytics dashboard for online retailers featuring real-time data visualization...',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Recharts'],
    category: 'Web App',
    imageUrl: 'https://picsum.photos/id/1/800/600',
    galleryUrls: ['https://picsum.photos/id/1/800/600', 'https://picsum.photos/id/180/800/600'],
    link: '#',
    githubUrl: 'https://github.com/alhady-mohamed',
    featured: true,
    metrics: { 'Performance': '99/100', 'Uptime': '99.9%' },
    displayOrder: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Social Media App',
    description: 'A fully responsive social platform allowing users to share posts, like, comment, and connect in real-time with responsive mobile UI.',
    summary: 'A fully responsive social platform allowing users to share posts, like, comment, and connect in real-time...',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Socket.io'],
    category: 'Web App',
    imageUrl: 'https://picsum.photos/id/20/800/600',
    galleryUrls: ['https://picsum.photos/id/20/800/600'],
    link: '#',
    githubUrl: 'https://github.com/alhady-mohamed',
    featured: true,
    displayOrder: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'AI Image Generator',
    description: 'An interactive creative tool leveraging generative AI models to create stunning visuals from text prompts with instant preview.',
    summary: 'An interactive creative tool leveraging generative AI models to create stunning visuals from text...',
    technologies: ['Python', 'React', 'FastAPI', 'TensorFlow'],
    category: 'AI/ML',
    imageUrl: 'https://picsum.photos/id/26/800/600',
    galleryUrls: ['https://picsum.photos/id/26/800/600'],
    link: '#',
    githubUrl: 'https://github.com/alhady-mohamed',
    featured: true,
    displayOrder: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Finance Tracker',
    description: 'Personal finance management application with budget planning, expense tracking, and savings goals visualization.',
    summary: 'Personal finance management application with budget planning, expense tracking, and savings goals...',
    technologies: ['Vue.js', 'Firebase', 'Chart.js'],
    category: 'Web App',
    imageUrl: 'https://picsum.photos/id/48/800/600',
    galleryUrls: ['https://picsum.photos/id/48/800/600'],
    link: '#',
    githubUrl: 'https://github.com/alhady-mohamed',
    featured: false,
    displayOrder: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Health & Wellness',
    description: 'A mobile-first web app for tracking workouts, nutrition, and meditation sessions with habit streaks.',
    summary: 'A mobile-first web app for tracking workouts, nutrition, and meditation sessions with habit streaks...',
    technologies: ['React Native', 'Redux', 'Node.js'],
    category: 'Mobile',
    imageUrl: 'https://picsum.photos/id/60/800/600',
    galleryUrls: ['https://picsum.photos/id/60/800/600'],
    link: '#',
    githubUrl: 'https://github.com/alhady-mohamed',
    featured: false,
    displayOrder: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Portfolio V1',
    description: 'Previous portfolio site showcasing early web development journey, design systems, and responsive layouts.',
    summary: 'Previous portfolio site showcasing early web development journey, design systems, and responsive layouts...',
    technologies: ['HTML', 'SCSS', 'JavaScript'],
    category: 'Web App',
    imageUrl: 'https://picsum.photos/id/119/800/600',
    galleryUrls: ['https://picsum.photos/id/119/800/600'],
    link: '#',
    githubUrl: 'https://github.com/alhady-mohamed',
    featured: false,
    displayOrder: 5,
    createdAt: new Date().toISOString(),
  },
];

const TIMELINES = [
  {
    id: 'edu-1',
    type: 'education',
    title: 'B.S. in Software Engineering',
    institution: 'University of Technology',
    period: '2022 - 2026',
    description: 'Focus on Data Structures, Algorithms, Distributed Computing, Software Engineering, and Human-Computer Interaction (HCI). Graduated with Honors.',
    skills: ['Software Architecture', 'Data Structures', 'Cloud Systems', 'Algorithms'],
    displayOrder: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'exp-1',
    type: 'experience',
    title: 'Senior Frontend Engineer',
    institution: 'Tech Solutions Inc.',
    period: '2021 - Present',
    description: 'Leading a team of 5 developers to build scalable web applications using React and TypeScript. Improved site performance by 40%.',
    skills: ['React', 'TypeScript', 'Next.js', 'Performance Optimization'],
    displayOrder: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'exp-2',
    type: 'experience',
    title: 'Full Stack Developer',
    institution: 'Creative Agency',
    period: '2019 - 2021',
    description: 'Developed and maintained client websites using the MERN stack. Collaborated with designers to implement pixel-perfect UIs.',
    skills: ['Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    displayOrder: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'exp-3',
    type: 'experience',
    title: 'Junior Web Developer',
    institution: 'StartUp Hub',
    period: '2018 - 2019',
    description: 'Assisted in the development of the company main product. Wrote unit tests and fixed bugs to ensure software stability.',
    skills: ['JavaScript', 'HTML5', 'CSS3', 'Git'],
    displayOrder: 4,
    createdAt: new Date().toISOString(),
  },
];

const TESTIMONIALS = [
  {
    id: 'test-1',
    clientName: 'Ahmed Nur',
    clientRole: 'CEO & Founder',
    company: 'Somali Tech Innovations',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'Shaqo aad u heersareysa! Waxa uu noo dhisay nidaam websayt oo aad u dheereeya, casri ah, islamarkaana si buuxda u qanciyay macaamiisheena.',
    isApproved: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'test-2',
    clientName: 'Sarah Jenkins',
    clientRole: 'Product Director',
    company: 'Apex Cloud Solutions',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'Exceptional attention to design details, performance optimization, and clean architectural patterns. Highly recommended developer!',
    isApproved: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'test-3',
    clientName: 'Mahad Warsame',
    clientRole: 'Managing Director',
    company: 'Horyaal Digital Media',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'Xirfad sare iyo waqti ilaalin buuxda. Wax kasta oo aan u baahannay waxa loo fuliyay si ka wanaagsan sidii aan filaynay.',
    isApproved: true,
    createdAt: new Date().toISOString(),
  },
];

const SETTINGS = {
  firebaseProjectId: 'mohamed-kayga',
  siteTitle: 'Mohamed Alhady | Creative Strategist & Developer',
  adminEmail: 'admin@portfolio.local',
  whatsappNumber: 'https://wa.link/cs6dy4',
  hero: {
    badgeText: 'Available for Hire',
    isBadgeVisible: true,
    titleLine1: 'Building the',
    titleLine2: 'Digital Future',
    bio: "I'm Mohamed Alhady, a Creative Strategist & Developer specializing in Software Development, Branding, Video Production, and Social Media Marketing. I transform ideas into impactful digital experiences.",
    imageUrl: '/assets/aistudio/black_875c126c.png',
    imageAlt: 'Mohamed Alhady - Creative Strategist & Developer',
    primaryCtaText: 'View Work',
    primaryCtaLink: '/projects',
    secondaryCtaText: 'Contact Me',
    secondaryCtaLink: '/contact',
    verticalBadgeText: "LET'S BEGIN",
    featuredTech: ['React', 'TypeScript', 'Next.js', 'Node.js'],
    isTransparentImage: true,
    imageFit: 'contain',
    showOverlay: false,
    showWidgets: true,
    aspectRatio: 'auto',
    autoScale: true,
    qrCodeLink: 'https://wa.link/cs6dy4',
    qrCodeTitle: 'Scan to Connect',
    qrCodeSubtitle: 'Quick Connect',
    showQrCodeWidget: true,
  },
  branding: {
    siteName: 'Mohamed Alhady',
    logoType: 'text',
    logoText: 'M&A',
    logoImageUrl: '',
    logoOrientation: 'auto',
    showSiteName: true,
    logoHeight: 40,
    tagline: 'Creative Strategist & Developer',
    footerBio: 'Building high-performance web applications with a focus on exceptional user experiences, robust architecture, and clean code. Located in Hargeisa, Somaliland.',
    copyrightName: 'Mohamed Alhady',
  },
  theme: {
    bgPalette: 'emerald',
    primaryColor: '#facc15',
    secondaryColor: '#22c55e',
  },
};

async function seed() {
  console.log('--- STARTING FIRESTORE SEEDING TO PROJECT: mohamed-kayga ---');
  try {
    const batch = writeBatch(db);

    // 1. Projects
    for (const p of PROJECTS) {
      const ref = doc(db, 'projects', p.id);
      batch.set(ref, p);
    }
    console.log(`Prepared ${PROJECTS.length} projects.`);

    // 2. Timelines
    for (const t of TIMELINES) {
      const ref = doc(db, 'timelines', t.id);
      batch.set(ref, t);
    }
    console.log(`Prepared ${TIMELINES.length} timeline entries.`);

    // 3. Testimonials
    for (const tm of TESTIMONIALS) {
      const ref = doc(db, 'testimonials', tm.id);
      batch.set(ref, tm);
    }
    console.log(`Prepared ${TESTIMONIALS.length} testimonials.`);

    // 4. Site Settings
    const settingsRef = doc(db, 'site_settings', 'current');
    batch.set(settingsRef, SETTINGS);
    console.log('Prepared site_settings/current.');

    await batch.commit();
    console.log('SUCCESS! All documents committed to Firebase Firestore database!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed with error:', err);
    process.exit(1);
  }
}

seed();
