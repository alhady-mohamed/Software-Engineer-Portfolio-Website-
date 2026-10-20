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

  // Admin Dashboard & Navigation
  admin_portal: {
    en: 'Admin Portal',
    so: 'Xarunta Maamulka',
    ar: 'لوحة التحكم',
  },
  admin_overview: {
    en: 'Dashboard Overview',
    so: 'Dulmarka Guud',
    ar: 'نظرة عامة',
  },
  admin_appearance: {
    en: 'Appearance & Hero',
    so: 'Muuqaalka & Madaxa',
    ar: 'المظهر والواجهة',
  },
  admin_projects: {
    en: 'Manage Projects',
    so: 'Mashaariicda',
    ar: 'إدارة المشاريع',
  },
  admin_timeline: {
    en: 'Timeline & Career',
    so: 'Shaqada & Waxbarashada',
    ar: 'المسار المهني والتعليم',
  },
  admin_testimonials: {
    en: 'Client Reviews',
    so: 'Aragtiyada Macaamiisha',
    ar: 'آراء وتقييمات العملاء',
  },
  admin_messages: {
    en: 'Inbox Messages',
    so: 'Sanduuqa Farriimaha',
    ar: 'الرسائل الواردة',
  },
  admin_settings: {
    en: 'Database & Sync',
    so: 'Kaydka & Isku-xirka',
    ar: 'إعدادات قاعدة البيانات',
  },
  admin_live_site: {
    en: 'Live Site',
    so: 'Websaytka Tooska ah',
    ar: 'الموقع المباشر',
  },
  admin_logout: {
    en: 'Sign Out',
    so: 'Ka Bax',
    ar: 'تسجيل الخروج',
  },
  admin_collapse_sidebar: {
    en: 'Collapse Sidebar',
    so: 'Laab Dhinaca',
    ar: 'طي الشريط الجانبي',
  },
  admin_expand_sidebar: {
    en: 'Expand Sidebar',
    so: 'Balaadhi Dhinaca',
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
  admin_control_center: {
    en: 'Portfolio Control Center',
    so: 'Xarunta Maamulka Websaytka',
    ar: 'مركز إدارة البورتفوليو',
  },
  admin_welcome_title: {
    en: 'Welcome to your Portfolio CMS',
    so: 'Ku soo dhowaw Xarunta Maamulka',
    ar: 'مرحباً بك في لوحة تحكم الموقع',
  },
  admin_welcome_subtitle: {
    en: 'Easily update hero images, brand logos, colors, projects, reviews, and client inquiries.',
    so: 'Halkan waxaad si fudud uga maamuli kartaa sawirka madaxa, sumadda, midabbada, mashaariicda, aragtiyada, iyo farriimaha.',
    ar: 'يمكنك هنا إدارة صور الواجهة، الشعار، الألوان، المشاريع، التقييمات، والرسائل الواردة بكل سهولة.',
  },
  admin_stats_projects: {
    en: 'Total Projects',
    so: 'Wadarta Mashaariicda',
    ar: 'إجمالي المشاريع',
  },
  admin_stats_timeline: {
    en: 'Career & Degree',
    so: 'Shaqada & Shahaadooyinka',
    ar: 'المسار والشهادات',
  },
  admin_stats_reviews: {
    en: 'Client Reviews',
    so: 'Aragtiyada Macaamiisha',
    ar: 'تقييمات العملاء',
  },
  admin_stats_messages: {
    en: 'Contact Messages',
    so: 'Farriimaha Xiriirka',
    ar: 'رسائل التواصل',
  },
  admin_key_metrics: {
    en: 'Key Performance Metrics',
    so: 'Halbeegyada Waxqabadka Ugu Muhiimsan',
    ar: 'مؤشرات الأداء الرئيسية',
  },
  admin_metrics_realtime: {
    en: 'Real-time performance analytics',
    so: 'Falanqaynta tooska ah ee waxqabadka',
    ar: 'تحليلات الأداء المباشرة',
  },
  admin_metrics_visitors: {
    en: 'Visitor Count',
    so: 'Tirada Booqdayaasha',
    ar: 'عدد الزوار',
  },
  admin_metrics_total_projects: {
    en: 'Total Projects',
    so: 'Wadarta Mashaariicda',
    ar: 'إجمالي المشاريع',
  },
  admin_metrics_pending_messages: {
    en: 'Pending Messages',
    so: 'Farriimaha Sugaya',
    ar: 'الرسائل المعلقة',
  },
  admin_metrics_approval_rate: {
    en: 'Client Satisfaction',
    so: 'Qanacsanaanta Macaamiisha',
    ar: 'رضا العملاء',
  },
  admin_metric_today: {
    en: 'today',
    so: 'maanta',
    ar: 'اليوم',
  },
  admin_metric_per_day: {
    en: '/day',
    so: '/maalintii',
    ar: '/يوم',
  },
  admin_visitors_label: {
    en: 'visitors',
    so: 'booqde',
    ar: 'زائر',
  },
  admin_categories: {
    en: 'categories',
    so: 'qaybood',
    ar: 'تصنيفات',
  },
  admin_live_portfolio_label: {
    en: 'Live portfolio',
    so: 'Websaytka tooska ah',
    ar: 'معرض الأعمال المباشر',
  },
  admin_traffic_trends_30d: {
    en: 'Visitor Traffic Trends (Last 30 Days)',
    so: 'Dhaqdhaqaaqa Booqdayaasha (30-kii Maalmood)',
    ar: 'مؤشرات حركة الزوار (آخر 30 يوماً)',
  },
  admin_thirty_days_badge: {
    en: '30 Days',
    so: '30 Maalmood',
    ar: '30 يوماً',
  },
  admin_traffic_subtitle: {
    en: 'Daily engagement analysis of portfolio visits and page views',
    so: 'Falanqaynta maalinlaha ah ee booqashooyinka iyo daawashada bogagga',
    ar: 'تحليل يومي لحركة الزوار ومشاهدات صفحات البورتفوليو',
  },
  admin_visitors_unique: {
    en: 'Unique Visitors',
    so: 'Booqdayaasha Gaarka ah',
    ar: 'الزوار الفريدون',
  },
  admin_page_views: {
    en: 'Page Views',
    so: 'Daawashada Bogagga',
    ar: 'مشاهدات الصفحات',
  },
  admin_visitors_30d: {
    en: 'Visitors (30d)',
    so: 'Booqdayaasha (30 Maalmood)',
    ar: 'الزوار (30 يوماً)',
  },
  admin_page_views_30d: {
    en: 'Page Views (30d)',
    so: 'Daawashada Bogagga (30 Maalmood)',
    ar: 'مشاهدات الصفحات (30 يوماً)',
  },
  admin_per_visit: {
    en: '/ visit',
    so: '/ booqashadiiba',
    ar: '/ زيارة',
  },
  admin_peak_day: {
    en: 'Peak Traffic Day',
    so: 'Maalinta Ugu Mashquulka Badan',
    ar: 'أعلى يوم زيارات',
  },
  admin_daily_avg: {
    en: 'Daily Average',
    so: 'Celceliska Maalinlaha ah',
    ar: 'المعدل اليومي',
  },
  admin_visitors_per_day: {
    en: 'visitors/day',
    so: 'booqde/maalintii',
    ar: 'زائر/يوم',
  },
  admin_all_metrics: {
    en: 'Combined Overview',
    so: 'Dhammaan',
    ar: 'نظرة شاملة',
  },
  admin_growth_rate: {
    en: '30-Day Growth',
    so: 'Kobaca 30-ka Maalmood',
    ar: 'النمو خلال 30 يوماً',
  },
  admin_trend_label: {
    en: '30-Day Trend',
    so: 'Isbeddelka 30-ka Maalmood',
    ar: 'اتجاه 30 يوماً',
  },
  admin_telemetry_updated: {
    en: 'Updated with live visit telemetry',
    so: 'Waxaa lagu cusbooneysiiyay xogta tooska ah',
    ar: 'محدّث ببيانات الزوار الحية',
  },
  admin_needs_reply: {
    en: 'Awaiting Response',
    so: 'Jawaab Sugaya',
    ar: 'بانتظار الرد',
  },
  admin_all_replied: {
    en: 'All Replied',
    so: 'Waa La Wada Jawaabay',
    ar: 'تم الرد بالكامل',
  },
  admin_total_inquiries: {
    en: 'total client inquiries',
    so: 'wadarta codsiyada macaamiisha',
    ar: 'إجمالي استفسارات العملاء',
  },
  admin_inquiry_activity: {
    en: 'Inquiry activity',
    so: 'Dhaqdhaqaaqa farriimaha',
    ar: 'نشاط الاستفسارات',
  },
  admin_recent_messages: {
    en: 'Recent Inquiries',
    so: 'Farriimihii Ugu Dambeeyay',
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
  admin_reviews_count_label: {
    en: 'reviews',
    so: 'aragtiyood',
    ar: 'تقييمات',
  },
  admin_positive_feedback: {
    en: 'positive feedback',
    so: 'aragtiyo togan',
    ar: 'آراء إيجابية',
  },
  admin_rating_label: {
    en: 'Rating',
    so: 'Qiimeynta',
    ar: 'التقييم',
  },
  admin_aspect_ratio: {
    en: 'Image Scale & Ratio',
    so: 'Cabbirka & Saamiga Sawirka',
    ar: 'أبعاد الصورة والتحجيم التلقائي',
  },
  admin_total: {
    en: 'total',
    so: 'wadarta',
    ar: 'الإجمالي',
  },
  admin_logo_mode_full: {
    en: 'Full Logo (Icon + Name)',
    so: 'Astaan Buuxda (Astaanta + Magaca)',
    ar: 'شعار كامل (أيقونة + اسم)',
  },
  admin_logo_mode_icon: {
    en: 'Logo Icon Only',
    so: 'Astaanta Kaliya',
    ar: 'أيقونة الشعار فقط',
  },
  admin_logo_mode_text: {
    en: 'Initials & Text',
    so: 'Qoraal & Xuruuf',
    ar: 'أحرف أولية ونص',
  },
  admin_logo_orientation: {
    en: 'Logo Shape & Orientation',
    so: 'Qaabka & Jiheynta Astaanta',
    ar: 'أبعاد واتجاه الشعار',
  },
  admin_logo_auto_fit: {
    en: 'Auto Fit (Adaptive)',
    so: 'Isku-habeyn Toos ah',
    ar: 'تحجيم تلقائي متكيف',
  },
  admin_logo_landscape: {
    en: 'Landscape / Horizontal',
    so: 'Jiif (Toosan)',
    ar: 'أفقي (عريض)',
  },
  admin_logo_square: {
    en: 'Square (1:1)',
    so: 'Labajibbaar (1:1)',
    ar: 'مربع (1:1)',
  },
  admin_logo_vertical: {
    en: 'Vertical / Stacked',
    so: 'Taagan (Dabaqsan)',
    ar: 'رأسي (مكدس)',
  },
  admin_logo_show_site_name: {
    en: 'Show Site Name beside Logo',
    so: 'Tus Magaca Websaytka Astaanta Dhinaceeda',
    ar: 'إظهار اسم الموقع بجانب الشعار',
  },
  admin_logo_full_tip: {
    en: 'When Full Logo is chosen, the separate text name is automatically hidden in Header and Footer to avoid repetition.',
    so: 'Marka Astaanta Buuxda la doorto, magaca qoraalka ah si toos ah ayaa looga qarinayaa madaxa iyo salka si looga fogaado ku-noqnoqosho.',
    ar: 'عند اختيار الشعار الكامل، يتم إخفاء الاسم النصي تلقائياً من الهيدر والفوتر لتجنب التكرار.',
  },
  hero_qr_modal_title: {
    en: 'Scan QR Code',
    so: 'Sawir Koodhka QR',
    ar: 'امسح رمز الاستجابة السريعة QR',
  },
  hero_qr_modal_desc: {
    en: 'Point your phone camera at this QR code to connect instantly or open the destination link.',
    so: 'Kamaradda taleefankaaga ku toosi koodhkan QR si aad toos ugu xidhiidho.',
    ar: 'وجّه كاميرا هاتفك إلى هذا الرمز للتواصل الفوري أو فتح الرابط.',
  },
  hero_qr_open_link: {
    en: 'Open Link Directly',
    so: 'Toos u fur Xiriiriyaha',
    ar: 'فتح الرابط مباشرة',
  },
  hero_qr_copy_link: {
    en: 'Copy Link',
    so: 'Nuqul ka qaad Xiriiriyaha',
    ar: 'نسخ الرابط',
  },
  hero_qr_copied: {
    en: 'Copied!',
    so: 'Waa la koobiyay!',
    ar: 'تم النسخ!',
  },
  admin_qr_section_title: {
    en: 'Hero QR Code Widget & Link',
    so: 'Koodhka QR ee Bogga Hore & Xiriiriyaha',
    ar: 'أداة ورابط رمز QR في واجهة Hero',
  },
  admin_qr_section_desc: {
    en: 'Configure the link encoded in the QR code widget on the hero section. Visitors can scan it with their phone camera or click to open.',
    so: 'Halkan ka geli xiriiriyaha uu furayo koodhka QR ee bogga hore. Dadku kamarad ayay ku sawiri karaan ama toos ayay u riixi karaan.',
    ar: 'اضبط الرابط المدمج في رمز QR على واجهة الهيرو. يمكن للزوار مسحه بكاميرا الهاتف أو النقر للفتح.',
  },
  admin_qr_link_label: {
    en: 'QR Code Destination Link (URL)',
    so: 'Xiriiriyaha Koodhka QR Furaayo (URL)',
    ar: 'رابط وجهة رمز QR (URL)',
  },
  admin_qr_title_label: {
    en: 'Widget Title Text',
    so: 'Cinwaanka Koodhka QR',
    ar: 'نص عنوان أداة QR',
  },
  admin_qr_subtitle_label: {
    en: 'Widget Subtitle / Badge',
    so: 'Qoraalka Hoose / Calaamadda',
    ar: 'النص الفرعي / الشارة',
  },
  admin_qr_show_widget: {
    en: 'Show QR Code Widget in Hero Section',
    so: 'Muuji Koodhka QR ee Bogga Hore',
    ar: 'إظهار أداة رمز QR في واجهة الهيرو',
  },

  // Additional Admin Screens Clean Translations
  admin_messages_title: {
    en: 'Inquiries & Messages Inbox',
    so: 'Sanduuqa Farriimaha & Codsiyada',
    ar: 'صندوق الرسائل والاستفسارات',
  },
  admin_messages_subtitle: {
    en: 'All incoming messages and project proposals sent through the contact form.',
    so: 'Dhammaan farriimaha iyo codsiyada shaqo ee laga soo diray foomka xiriirka.',
    ar: 'جميع الرسائل الواردة وطلبات المشاريع المرسلة عبر نموذج التواصل.',
  },
  admin_unread: {
    en: 'Unread',
    so: 'Aan La Akhriyin',
    ar: 'غير مقروءة',
  },
  admin_read: {
    en: 'Read',
    so: 'La Akhriyay',
    ar: 'مقروءة',
  },
  admin_search_messages_ph: {
    en: 'Search by name, email, subject, or message...',
    so: 'Raadi magac, email, mawduuc, ama qoraal...',
    ar: 'ابحث بالاسم أو البريد أو الموضوع أو الرسالة...',
  },
  admin_projects_title: {
    en: 'Projects Portfolio Management',
    so: 'Maamulka Mashaariicda',
    ar: 'إدارة مشاريع البورتفوليو',
  },
  admin_projects_subtitle: {
    en: 'Add, update, or remove showcase projects appearing on your website.',
    so: 'Ku dar, wax ka beddel, ama tirtir mashaariicda ka muuqanaya websaytkaaga.',
    ar: 'إضافة وتعديل وحذف المشاريع المعروضة في موقعك.',
  },
  admin_add_project: {
    en: 'Add New Project',
    so: 'Ku Dar Mashruuc Cusub',
    ar: 'إضافة مشروع جديد',
  },
  admin_search_projects_ph: {
    en: 'Search project, description, or tech stack...',
    so: 'Raadi mashruuc, sharraxaad, ama qalabka la adeegsaday...',
    ar: 'ابحث عن مشروع بالعنوان أو الوصف أو التقنيات...',
  },
  admin_timeline_title: {
    en: 'Career & Education Timeline',
    so: 'Taariikhda Shaqada & Waxbarashada',
    ar: 'المسار المهني والتعليمي',
  },
  admin_timeline_subtitle: {
    en: 'Manage university degrees, professional work experience, and verified credentials displayed on your portfolio.',
    so: 'Maamul shahaadooyinka heer jaamacadeed, waayo-aragnimada shaqada, iyo aqoonsiyada la xaqiijiyay ee ka muuqanaya boggaaga.',
    ar: 'إدارة الشهادات الجامعية والخبرات المهنية والشهادات المعتمدة المعروضة في موقعك.',
  },
  admin_timeline_search_ph: {
    en: 'Search by role, institution, degree, certification or skill...',
    so: 'Raadi shaqo, jaamacad, shirkad, shahaado ama xirfad...',
    ar: 'ابحث عن وظيفة، جامعة، شركة، شهادة أو مهارة...',
  },
  admin_timeline_tab_all: {
    en: 'All Records',
    so: 'Dhammaan Xogta',
    ar: 'جميع السجلات',
  },
  admin_timeline_tab_education: {
    en: 'Education & Degrees',
    so: 'Waxbarashada & Jaamacadaha',
    ar: 'التعليم والشهادات الجامعية',
  },
  admin_timeline_tab_experience: {
    en: 'Work Experience',
    so: 'Waayo-aragnimada Shaqada',
    ar: 'الخبرة المهنية والوظائف',
  },
  admin_timeline_tab_certifications: {
    en: 'Certifications & Verifications',
    so: 'Shahaadooyinka & Xaqiijinta',
    ar: 'الشهادات والاعتمادات الموثقة',
  },
  admin_add_education: {
    en: 'Add Education',
    so: 'Ku Dar Waxbarasho',
    ar: 'إضافة مؤهل تعليمي',
  },
  admin_add_experience: {
    en: 'Add Experience',
    so: 'Ku Dar Shaqo',
    ar: 'إضافة خبرة عمل',
  },
  admin_add_certification: {
    en: 'Add Certification',
    so: 'Ku Dar Shahaado',
    ar: 'إضافة شهادة معتمدة',
  },
  admin_timeline_total_records: {
    en: 'Total Records',
    so: 'Wadarta Guud',
    ar: 'إجمالي السجلات',
  },
  admin_timeline_academic_degrees: {
    en: 'Degrees & Diplomas',
    so: 'Shahaadooyinka Jaamacadda',
    ar: 'الشهادات الجامعية',
  },
  admin_timeline_work_roles: {
    en: 'Career Roles',
    so: 'Boosaska Shaqo',
    ar: 'الوظائف والخبرات',
  },
  admin_timeline_verified_creds: {
    en: 'Verified Credentials',
    so: 'Aqoonsiyo La Xaqiijiyay',
    ar: 'شهادات موثقة',
  },
  admin_timeline_verify_link: {
    en: 'Verify Credential',
    so: 'Xaqiiji Shahaadada',
    ar: 'التحقق من الشهادة',
  },
  admin_timeline_empty_records: {
    en: 'No records found matching your filter or search query.',
    so: 'Wax xog ah lagama helin shaandhaynta ama raadintaada.',
    ar: 'لم يتم العثور على سجلات مطابقة للبحث أو التصفية.',
  },
  admin_testimonials_title: {
    en: 'Client Reviews & Testimonials',
    so: 'Aragtiyada Macaamiisha',
    ar: 'آراء وتقييمات العملاء',
  },
  admin_testimonials_subtitle: {
    en: 'Manage and approve client testimonials displayed on your portfolio.',
    so: 'Maamul oo ansixi aragtiyada macaamiisha ee ka muuqanaya websaytka.',
    ar: 'إدارة واعتماد تقييمات وآراء العملاء المعروضة على الموقع.',
  },
  admin_add_testimonial: {
    en: 'Add New Review',
    so: 'Ku Dar Aragti Cusub',
    ar: 'إضافة تقييم جديد',
  },
  admin_settings_title: {
    en: 'Database & System Settings',
    so: 'Kaydka Xogta & Habaynta Nidaamka',
    ar: 'إعدادات قاعدة البيانات والنظام',
  },
  admin_settings_subtitle: {
    en: 'Configure cloud database synchronization, SQL schema exports, and data backups.',
    so: 'Halkan ku habee kaydka xogta daruuriga ah, nuqul ka qaado SQL, ama qaado kayd buuxa.',
    ar: 'إعداد مزامنة قاعدة البيانات السحابية، تصدير SQL، والنسخ الاحتياطي.',
  },
  admin_appearance_title: {
    en: 'Design, Hero & Brand Identity',
    so: 'Muuqaalka, Madaxa & Sumadda',
    ar: 'التصميم والواجهة والهوية',
  },
  admin_appearance_desc: {
    en: 'Manage hero banner, website title, branding logo, and primary colors.',
    so: 'Halkan ka maamul sawirka madaxa, qoraallada, magaca websaytka, sumadda, iyo midabbada.',
    ar: 'إدارة صورة الواجهة، النصوص، اسم الموقع، الشعار، والألوان الرئيسية.',
  },
  admin_saving_btn: {
    en: 'Saving changes...',
    so: 'Waa la badbaadinayaa...',
    ar: 'جارٍ الحفظ...',
  },
  admin_saved_btn: {
    en: 'Changes Saved!',
    so: 'Waa la badbaadiyay!',
    ar: 'تم الحفظ بنجاح!',
  },
  admin_save_changes_btn: {
    en: 'Save Changes',
    so: 'Badbaadi Isbeddelka',
    ar: 'حفظ التغييرات',
  },
  admin_tab_hero: {
    en: '1. Hero Section & Media',
    so: '1. Qaybta Madaxa & Sawirka',
    ar: '1. واجهة البداية والصور',
  },
  admin_tab_branding: {
    en: '2. Branding & Site Logo',
    so: '2. Sumadda & Astaanta',
    ar: '2. الشعار وهوية الموقع',
  },
  admin_tab_marquee: {
    en: '3. Animated Logos & Partners',
    so: '3. Logooyinka Marquee-ga & Shirkadaha',
    ar: '3. الشعارات المتحركة والشركاء',
  },
  admin_marquee_nav: {
    en: 'Animated Logos & Marquee',
    so: 'Logada Marquee-ga & Shirkadaha',
    ar: 'الشعارات المتحركة والشركاء',
  },
  admin_tab_theme: {
    en: '4. Theme Colors & Styling',
    so: '4. Midabbada & Qaab-dhismeedka',
    ar: '4. ألوان المظهر والتنسيق',
  },
  admin_tab_about: {
    en: '5. About, Skills & Tech Stack',
    so: '5. Xirfadaha, Tech Stack & About-ka',
    ar: '5. المهارات والتقنيات ونبذة عني',
  },
  admin_about_nav: {
    en: 'About, Skills & Tech Stack',
    so: 'Xirfadaha & About-ka',
    ar: 'المهارات والتقنيات',
  },
  admin_marquee_title: {
    en: 'Animated Marquee & Brand Logos',
    so: 'Logooyinka Wareegaya ee Marquee-ga',
    ar: 'الشعارات المتحركة وهوية الشركاء',
  },
  admin_marquee_desc: {
    en: 'Upload, customize, and manage brand partner logos and tech stack items rotating on the homepage.',
    so: 'Halkan ka maamul, ku dar, ama ka upload-gareey logooyinka shirkadaha iyo tech stack-ka ka wareegaya bogga hore.',
    ar: 'إدارة ورفع شعارات الشركاء والتقنيات المتحركة في شريط الصفحة الرئيسية.',
  },
  admin_theme_emerald: {
    en: 'Emerald Green',
    so: 'Cagaarka Emerald',
    ar: 'أخضر زمردي',
  },
  admin_theme_midnight: {
    en: 'Midnight Dark',
    so: 'Midnight Madoow',
    ar: 'منتصف الليل الداكن',
  },
  admin_theme_toggle_tip: {
    en: 'Toggle between Emerald Green and High-Contrast Midnight dark mode',
    so: 'U kala beddel qaabka Cagaarka iyo Midnight Dark Mode',
    ar: 'التبديل بين الأخضر الزمردي ووضع منتصف الليل عالي التباين',
  },
  admin_website_icon_title: {
    en: 'Website Icon & Favicon',
    so: 'Astaanta Website-ka (Favicon & App Icon)',
    ar: 'أيقونة الموقع وشعار التبويب',
  },
  admin_website_icon_desc: {
    en: 'Upload your website browser tab favicon, bookmark icon, and mobile web app icon.',
    so: 'Halkan ka upload-gareey sawirka astaanta (Favicon) ee browser tab-ka, bookmarks-ka, iyo apps-ka mobilka.',
    ar: 'ارفع أيقونة الموقع للتبويب والإشارات المرجعية وتطبيقات الويب.',
  },
  admin_users_roles_nav: {
    en: 'Security & Access',
    so: 'Amniga & Awoodaha',
    ar: 'الأمان وإدارة الصلاحيات',
  },
  admin_users_roles_title: {
    en: 'Security & Access Governance',
    so: 'Maamulka Amniga & Awoodaha',
    ar: 'إدارة الصلاحيات والأمان المؤسسي',
  },
  admin_users_roles_subtitle: {
    en: 'Manage system users, fine-grained Role Presets, Capability Matrices (Role → Page → Tabs), and live audit logs.',
    so: 'Maamul isticmaaleyaasha nidaamka, noocyada doorarka (RBAC), awoodaha tab-yada, iyo raadraaca amniga.',
    ar: 'إدارة مستخدمي النظام ومصفوفة الصلاحيات وسجلات التدقيق والأمان المباشرة.',
  },

  // Login Page Translations
  login_return_to_site: {
    en: 'Return to Website',
    so: 'Ku noqo Websaytka',
    ar: 'العودة إلى الموقع',
  },
  login_rbac_governance_active: {
    en: 'RBAC Governance Active',
    so: 'Nidaamka RBAC Waa Firfircoon yahay',
    ar: 'نظام حوكمة الصلاحيات نشط',
  },
  login_cms_title: {
    en: 'Admin Portal',
    so: 'Albaabka Maamulka',
    ar: 'بوابة الإدارة',
  },
  login_cms_subtitle: {
    en: 'Sign in with your authorized credentials to access your administrative dashboard.',
    so: 'Geli xogtaada rasmiga ah si aad u gasho qaybta maamulka ee websaytka.',
    ar: 'سجّل الدخول ببياناتك المعتمدة للوصول إلى لوحة التحكم الإدارية.',
  },
  login_firestore_synced: {
    en: 'Firestore Synced',
    so: 'Xogtu Way Xiriirsan Tahay (Firestore)',
    ar: 'متزامن مع Firestore',
  },
  login_local_mode: {
    en: 'Local Storage Mode',
    so: 'Kaydka Gudaha (Local Mode)',
    ar: 'وضع التخزين المحلي',
  },
  login_password_auth: {
    en: 'Password Authenticated',
    so: 'Lagu Xaqiijiyay Furaha',
    ar: 'موثّق بكلمة مرور',
  },
  login_identity_label: {
    en: 'Email or Username',
    so: 'Email ama Username',
    ar: 'البريد الإلكتروني أو اسم المستخدم',
  },
  login_identity_placeholder: {
    en: 'Enter your email or username',
    so: 'Geli email-kaaga ama username-kaaga',
    ar: 'أدخل البريد الإلكتروني أو اسم المستخدم',
  },
  login_password_label: {
    en: 'Password',
    so: 'Furaha Sirta ah (Password)',
    ar: 'كلمة المرور',
  },
  login_password_key_hint: {
    en: 'RBAC Security Key',
    so: 'Furaha Amniga RBAC',
    ar: 'مفتاح الأمان RBAC',
  },
  login_password_placeholder: {
    en: 'Enter your password',
    so: 'Geli furahaaga sirta ah',
    ar: 'أدخل كلمة المرور الخاصة بك',
  },
  login_show_password: {
    en: 'Show password',
    so: 'Muuji furaha',
    ar: 'إظهار كلمة المرور',
  },
  login_hide_password: {
    en: 'Hide password',
    so: 'Qari furaha',
    ar: 'إخفاء كلمة المرور',
  },
  login_submit_btn: {
    en: 'Sign In',
    so: 'Gal Koontada',
    ar: 'تسجيل الدخول',
  },
  login_verifying: {
    en: 'Signing in...',
    so: 'Waa la gelayaa...',
    ar: 'جارٍ تسجيل الدخول...',
  },
  login_footer_note: {
    en: 'Authorized administrative access only. All authentication attempts and administrative actions are logged and protected.',
    so: 'Waxaa loogu talagalay maamulka oo keliya. Dhammaan galitaannada iyo falalka maamulka waa la diiwaangeliyaa waana la dhowraa.',
    ar: 'مخصص للمسؤولين المصرح لهم فقط. يتم توثيق وحماية جميع محاولات تسجيل الدخول والأنشطة الإدارية.',
  },
  login_error_failed: {
    en: 'Sign in failed. Please verify your credentials.',
    so: 'Gelitaanku ma guuleysan. Fadlan hubi xogtaada.',
    ar: 'فشل تسجيل الدخول. يرجى التحقق من صحة البيانات.',
  },
  login_error_general: {
    en: 'An error occurred during authentication.',
    so: 'Cilad ayaa dhacday intii lagu guda jiray gelitaanka.',
    ar: 'حدث خطأ غير متوقع أثناء محاولة تسجيل الدخول.',
  },
};

