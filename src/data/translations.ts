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
    en: 'Quick Connect',
    so: 'Xiriir Degdeg Ah',
    ar: 'تواصل سريع',
  },
  hero_badge_fullstack: {
    en: 'Full-Stack Dev',
    so: 'Horumariye Web',
    ar: 'مطور برمجيات',
  },
  hero_badge_clean_code: {
    en: 'Clean Architecture',
    so: 'Barnaamij Nidaamsan',
    ar: 'بنية برمجية نظيفة',
  },
  hero_badge_ui_ux: {
    en: 'Creative Tech',
    so: 'Hal-abuur Dijitaal',
    ar: 'تقنيات إبداعية',
  },
  hero_badge_scalable_apps: {
    en: 'High Performance',
    so: 'Xawaare & Tayo Sare',
    ar: 'أداء عالي وسريع',
  },
  hero_badge_cloud_api: {
    en: 'Cloud & Systems',
    so: 'Nidaamyada Cloud',
    ar: 'أنظمة سحابية',
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
    en: 'Sign Out',
    so: 'Ka Bax (Sign Out)',
    ar: 'تسجيل الخروج',
  },
  admin_collapse_sidebar: {
    en: 'Collapse Sidebar',
    so: 'Laab Dhinaca (Collapse)',
    ar: 'طي الشريط الجانبي',
  },
  admin_expand_sidebar: {
    en: 'Expand Sidebar',
    so: 'Balaadhi Dhinaca (Expand)',
    ar: 'توسيع الشريط الجانبي',
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
  admin_no_messages: {
    en: 'No inquiries recorded yet.',
    so: 'Wali ma jiraan farriimo soo dhacay.',
    ar: 'لا توجد رسائل واردة حتى الآن.',
  },
  admin_manage: {
    en: 'Manage',
    so: 'Maamul',
    ar: 'إدارة',
  },
  admin_items: {
    en: 'items',
    so: 'qodob',
    ar: 'عنصر',
  },
  admin_featured: {
    en: 'featured',
    so: 'la doortay',
    ar: 'مميز',
  },
  admin_approved: {
    en: 'approved',
    so: 'la ansixiyay',
    ar: 'معتمد',
  },
  admin_aspect_ratio: {
    en: 'Image Scale & Ratio',
    so: 'Cabbirka & Auto-Scale',
    ar: 'أبعاد الصورة والتحجيم التلقائي',
  },
  admin_total: {
    en: 'total',
    so: 'wadarta',
    ar: 'الإجمالي',
  },
  admin_logo_mode_full: {
    en: 'Full Logo (Icon + Name)',
    so: 'Full Logo (Astaan + Magac)',
    ar: 'شعار كامل (أيقونة + اسم)',
  },
  admin_logo_mode_icon: {
    en: 'Logo Icon Only',
    so: 'Logo Icon Kaliya',
    ar: 'أيقونة الشعار فقط',
  },
  admin_logo_mode_text: {
    en: 'Initials & Text',
    so: 'Qoraal / Xuruuf (Initials)',
    ar: 'أحرف أولية ونص',
  },
  admin_logo_orientation: {
    en: 'Logo Shape & Orientation',
    so: 'Qaabka & Jiheynta Logada',
    ar: 'أبعاد واتجاه الشعار',
  },
  admin_logo_auto_fit: {
    en: 'Auto Fit (Adaptive)',
    so: 'Auto Fit (Isku Habeeya)',
    ar: 'تحجيم تلقائي متكيف',
  },
  admin_logo_landscape: {
    en: 'Landscape / Horizontal',
    so: 'Jiif (Landscape)',
    ar: 'أفقي (عريض)',
  },
  admin_logo_square: {
    en: 'Square (1:1)',
    so: 'Labajibbaar (1:1)',
    ar: 'مربع (1:1)',
  },
  admin_logo_vertical: {
    en: 'Vertical / Stacked',
    so: 'Taagan (Vertical)',
    ar: 'رأسي (مكدس)',
  },
  admin_logo_show_site_name: {
    en: 'Show Site Name beside Logo',
    so: 'Tus Magaca Websaytka Logada Dhinaceeda',
    ar: 'إظهار اسم الموقع بجانب الشعار',
  },
  admin_logo_full_tip: {
    en: 'When Full Logo is chosen, the separate text name is automatically hidden in Header and Footer to avoid repetition.',
    so: 'Marka Full Logo la doorto, magaca qoraalka ah si toos ah ayaa looga qarinayaa Header-ka iyo Footer-ka si looga fogaado is-ku-noqnoqosho.',
    ar: 'عند اختيار الشعار الكامل، يتم إخفاء الاسم النصي تلقائياً من الهيدر والفوتر لتجنب التكرار.',
  },
  hero_qr_modal_title: {
    en: 'Scan QR Code',
    so: 'Sawir QR Code-ka',
    ar: 'امسح رمز الاستجابة السريعة QR',
  },
  hero_qr_modal_desc: {
    en: 'Point your phone camera at this QR code to connect instantly or open the destination link.',
    so: 'Kamaradda taleefankaaga ku toosi QR Code-kan si aad toos ugu xidhiidho.',
    ar: 'وجّه كاميرا هاتفك إلى هذا الرمز للتواصل الفوري أو فتح الرابط.',
  },
  hero_qr_open_link: {
    en: 'Open Link Directly',
    so: 'Toos u fur Link-ga',
    ar: 'فتح الرابط مباشرة',
  },
  hero_qr_copy_link: {
    en: 'Copy Link',
    so: 'Nuqul ka qaad Link-ga',
    ar: 'نسخ الرابط',
  },
  hero_qr_copied: {
    en: 'Copied!',
    so: 'Waa la koobiyay!',
    ar: 'تم النسخ!',
  },
  admin_qr_section_title: {
    en: 'Hero QR Code Widget & Link',
    so: 'QR Code-ka Hero-ga & Link-giisa',
    ar: 'أداة ورابط رمز QR في واجهة Hero',
  },
  admin_qr_section_desc: {
    en: 'Configure the link encoded in the QR code widget on the hero section. Visitors can scan it with their phone camera or click to open.',
    so: 'Halkan ka geli link-ga uu furayo QR Code-ka Hero Section-ka. Dadku kamarad ayay ku sawiran karaan ama toos ayay u riixi karaan.',
    ar: 'اضبط الرابط المدمج في رمز QR على واجهة الهيرو. يمكن للزوار مسحه بكاميرا الهاتف أو النقر للفتح.',
  },
  admin_qr_link_label: {
    en: 'QR Code Destination Link (URL)',
    so: 'Link-ga QR Code-ku Furaayo (URL)',
    ar: 'رابط وجهة رمز QR (URL)',
  },
  admin_qr_title_label: {
    en: 'Widget Title Text',
    so: 'Qoraalka Badhanka QR-ka',
    ar: 'نص عنوان أداة QR',
  },
  admin_qr_subtitle_label: {
    en: 'Widget Subtitle / Badge',
    so: 'Qoraalka Sare ee Badhanka',
    ar: 'النص الفرعي / الشارة',
  },
  admin_qr_show_widget: {
    en: 'Show QR Code Widget in Hero Section',
    so: 'Muuji Badhanka QR Code-ka ee Hero-ga',
    ar: 'إظهار أداة رمز QR في واجهة الهيرو',
  },
};

