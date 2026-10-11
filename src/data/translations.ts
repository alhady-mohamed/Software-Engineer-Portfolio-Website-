export type Language = 'en' | 'so' | 'ar';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali', flag: '🇸🇴', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
];

export const translations = {
  // Navigation
  nav_home: {
    en: 'Home',
    so: 'Bogga Hore',
    ar: 'الرئيسية',
  },
  nav_about: {
    en: 'About',
    so: 'Igu Saabsan',
    ar: 'من أنا',
  },
  nav_projects: {
    en: 'Projects',
    so: 'Mashaariicda',
    ar: 'المشاريع',
  },
  nav_contact: {
    en: 'Contact',
    so: 'Xiriir',
    ar: 'اتصل بي',
  },
  nav_hire_me: {
    en: 'Hire Me',
    so: 'Ila Shaqee',
    ar: 'وظّفني',
  },
  nav_admin: {
    en: 'Admin CMS',
    so: 'Maamulka',
    ar: 'لوحة التحكم',
  },

  // Hero Section
  hero_available_badge: {
    en: 'Available for Hire',
    so: 'Diyaar u ah Shaqo',
    ar: 'متاح للعمل الحر',
  },
  hero_view_work: {
    en: 'View Work',
    so: 'Eeg Mashaariicda',
    ar: 'شاهد أعمالي',
  },
  hero_contact_me: {
    en: 'Contact Me',
    so: 'Ila Soo Xiriir',
    ar: 'تواصل معي',
  },
  hero_accepting_projects: {
    en: 'Accepting Projects',
    so: 'Qaadaya Mashaariic',
    ar: 'أستقبل مشاريع جديدة',
  },
  hero_status: {
    en: 'Status',
    so: 'Xaaladda',
    ar: 'الحالة',
  },
  hero_scan_connect: {
    en: 'SCAN TO CONNECT',
    so: 'ISKAAN GARAY SI AAD ULA XIRIIRTO',
    ar: 'امسح للتواصل السريع',
  },
  hero_lets_begin: {
    en: "LET'S BEGIN",
    so: 'AAN BILOWNO',
    ar: 'لنبدأ معاً',
  },

  // About Section
  about_badge: {
    en: 'ABOUT ME',
    so: 'IGU SAABSAN',
    ar: 'نبذة عني',
  },
  about_title: {
    en: 'Crafting the Future of Digital Presence',
    so: 'Dhisidda Mustaqbalka Joogitaanka Dijitaalka',
    ar: 'صناعة مستقبل الحضور الرقمي المتميز',
  },
  about_download_cv: {
    en: 'Download CV',
    so: 'Soo Dejiso CV',
    ar: 'تحميل السيرة الذاتية',
  },
  about_experience_title: {
    en: 'Career & Experience',
    so: 'Waayo-aragnimada Shaqada',
    ar: 'الخبرة المهنية',
  },
  about_education_title: {
    en: 'Education & Certifications',
    so: 'Waxbarashada & Shahaadooyinka',
    ar: 'التعليم والشهادات',
  },
  about_skills_title: {
    en: 'Skills & Technical Proficiencies',
    so: 'Xirfadaha & Aqoonta Farsamada',
    ar: 'المهارات والقدرات التقنية',
  },

  // Projects Section
  projects_badge: {
    en: 'PORTFOLIO',
    so: 'MASHAARIICDA',
    ar: 'معرض الأعمال',
  },
  projects_title: {
    en: 'Featured Case Studies & Works',
    so: 'Mashaariicda & Shaqooyinkii Ugu Dambeeyay',
    ar: 'أبرز المشاريع ودراسات الحالة',
  },
  projects_all: {
    en: 'All Projects',
    so: 'Dhammaan',
    ar: 'جميع المشاريع',
  },
  projects_view_live: {
    en: 'Live Demo',
    so: 'Toos u Eeg',
    ar: 'معاينة حية',
  },
  projects_github: {
    en: 'Source Code',
    so: 'Koodhka',
    ar: 'كود المصدر',
  },
  projects_details: {
    en: 'View Details',
    so: 'Faahfaahin',
    ar: 'عرض التفاصيل',
  },

  // Testimonials
  testimonials_badge: {
    en: 'TESTIMONIALS',
    so: 'MARAG-FURKA MACAAMIISHA',
    ar: 'شهادات العملاء',
  },
  testimonials_title: {
    en: 'What Clients & Partners Say',
    so: 'Waxay Macaamiishu Ka Yiraahdeen Shaqadayda',
    ar: 'ماذا يقول العملاء والشركاء عن أعمالي',
  },

  // Contact Section
  contact_badge: {
    en: 'GET IN TOUCH',
    so: 'ILA SOO XIRIIR',
    ar: 'تواصل معي',
  },
  contact_title: {
    en: "Let's Build Something Great Together",
    so: 'Aan Si Wadajir ah Wax Weyn u Dhisno',
    ar: 'دعنا نبني شيئاً رائعاً معاً',
  },
  contact_name: {
    en: 'Your Full Name',
    so: 'Magacaaga oo Buuxa',
    ar: 'الاسم الكامل',
  },
  contact_email: {
    en: 'Email Address',
    so: 'Cinwaanka Email-ka',
    ar: 'البريد الإلكتروني',
  },
  contact_subject: {
    en: 'Subject',
    so: 'Ujeeddada',
    ar: 'موضوع الرسالة',
  },
  contact_message: {
    en: 'Your Message',
    so: 'Farriintaada',
    ar: 'رسالتك',
  },
  contact_send: {
    en: 'Send Message',
    so: 'Dir Farriinta',
    ar: 'إرسال الرسالة',
  },
  contact_sending: {
    en: 'Sending message...',
    so: 'Farriinta waa la dirayaa...',
    ar: 'جارٍ الإرسال...',
  },
  contact_success_title: {
    en: 'Message Sent Successfully!',
    so: 'Farriintaadii Si Guul Leh Ayaa Loo Diray!',
    ar: 'تم إرسال رسالتك بنجاح!',
  },
  contact_success_desc: {
    en: 'Thank you for reaching out. I will respond to you shortly.',
    so: 'Waad ku mahadsan tahay xiriirkaaga. Dhowaan ayaan kula soo xiriiri doonaa.',
    ar: 'شكراً لتواصلك. سأرد عليك في أقرب فرصة ممكنة.',
  },

  // Footer
  footer_quick_links: {
    en: 'Quick Links',
    so: 'Xiriirrada Degdegga ah',
    ar: 'روابط سريعة',
  },
  footer_admin_access: {
    en: 'Admin Portal',
    so: 'Xarunta Maamulka',
    ar: 'بوابة الإدارة',
  },
  footer_rights: {
    en: 'All rights reserved.',
    so: 'Xuquuqda oo dhan way dhowran tahay.',
    ar: 'جميع الحقوق محفوظة.',
  },

  // Admin Dashboard
  admin_portal: {
    en: 'Admin Portal',
    so: 'Xarunta Maamulka',
    ar: 'لوحة تحكم الموقع',
  },
  admin_overview: {
    en: 'Dashboard Overview',
    so: 'Dulmarka Guud',
    ar: 'نظرة عامة',
  },
  admin_appearance: {
    en: 'Appearance & Hero',
    so: 'Muuqaalka & Hero-ga',
    ar: 'التصميم وواجهة البداية',
  },
  admin_projects: {
    en: 'Manage Projects',
    so: 'Mashaariicda (Projects)',
    ar: 'إدارة المشاريع',
  },
  admin_timeline: {
    en: 'Timeline & Career',
    so: 'Taariikhda & Shaqada',
    ar: 'المسار المهني والتعليم',
  },
  admin_testimonials: {
    en: 'Client Reviews',
    so: 'Marag-furka (Reviews)',
    ar: 'آراء وتقييمات العملاء',
  },
  admin_messages: {
    en: 'Inbox Messages',
    so: 'Farriimaha Soo Dhaca',
    ar: 'الرسائل الواردة',
  },
  admin_settings: {
    en: 'Database & Sync',
    so: 'Habeynta Supabase',
    ar: 'إعدادات قاعدة البيانات',
  },
  admin_live_site: {
    en: 'Live Site',
    so: 'Eeg Websaytka',
    ar: 'الموقع المباشر',
  },
  admin_logout: {
    en: 'Logout',
    so: 'Ka Bax',
    ar: 'تسجيل الخروج',
  },
  admin_modules: {
    en: 'Content Modules',
    so: 'Qaybaha Nuxurka',
    ar: 'أقسام المحتوى',
  },
  admin_system: {
    en: 'System & Tools',
    so: 'Nidaamka & Qalabka',
    ar: 'النظام والأدوات',
  },
  admin_welcome_title: {
    en: 'Welcome to your Portfolio CMS',
    so: 'Ku soo dhowaw Xarunta Maamulka (CMS)',
    ar: 'مرحباً بك في لوحة إدارة محتوى البورتفوليو',
  },
  admin_welcome_subtitle: {
    en: 'Easily update hero images, brand logos, colors, projects, reviews, and client inquiries.',
    so: 'Halkan waxaad si fudud uga maamuli kartaa sawirka hero-ga, logada, midabada, mashaariicda, iyo farriimaha.',
    ar: 'يمكنك هنا إدارة صور البداية، الشعار، الألوان، المشاريع، التقييمات، والرسائل الواردة بكل سهولة.',
  },
  admin_stats_projects: {
    en: 'Total Projects',
    so: 'Mashaariicda Guud',
    ar: 'إجمالي المشاريع',
  },
  admin_stats_timeline: {
    en: 'Career & Degree',
    so: 'Taariikhda & Degree',
    ar: 'المسار والشهادات',
  },
  admin_stats_reviews: {
    en: 'Client Reviews',
    so: 'Marag-furka Macaamiisha',
    ar: 'تقييمات العملاء',
  },
  admin_stats_messages: {
    en: 'Contact Messages',
    so: 'Farriimaha Contact-ka',
    ar: 'رسائل التواصل',
  },
  admin_recent_messages: {
    en: 'Recent Inquiries',
    so: 'Farriimihii ugu dambeeyay',
    ar: 'أحدث الرسائل الواردة',
  },
  admin_active_projects: {
    en: 'Featured Projects',
    so: 'Mashaariicda La Doortay',
    ar: 'المشاريع المميزة',
  },
  admin_quick_actions: {
    en: 'Quick Actions',
    so: 'Tallaabooyinka Degdegga ah',
    ar: 'إجراءات سريعة',
  },
  admin_new_project: {
    en: 'New Project',
    so: 'Mashruuc Cusub',
    ar: 'مشروع جديد',
  },
  admin_save_changes: {
    en: 'Save Changes',
    so: 'Kaydi Isbeddelka',
    ar: 'حفظ التغييرات',
  },
};
